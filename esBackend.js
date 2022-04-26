var util = require("util");


module.exports = {
	getAggregationByType: function (agg, config) {
		let obj = {};
		switch (agg.type) {
			case "terms":
				obj = {
					["terms_" + agg.field]: {
						terms: {
							field: config.getField(agg.field)
						}
					}
				};
				for (let prop of agg.props) {
					obj["terms_" + agg.field].terms[prop.field] = prop.value;
				}
				return obj;
			case "date_histogram":
				obj = {
					["date_histogram_" + agg.field]: {
						date_histogram: {
							field: config.getField(agg.field)
						}
					}
				};
				for (let prop of agg.props) {
					obj["date_histogram_" + agg.field].date_histogram[prop.field] = prop.value;
				}
				return obj;
		}
	},
	getAggregation: function (aggList, index, config) {
		let aggObj = this.getAggregationByType(aggList[index], config);
		if (index < aggList.length - 1) {
			let key = Object.keys(aggObj)[0]
			aggObj[key].aggs = this.getAggregation(aggList, index + 1, config)
			return aggObj
		} else {
			return aggObj;
		}
	},
	booleanExpr: function (node, config) {
		let value = node.value;
		let field = node.field;
		switch (node.operator) {
			case "or":
				return {
					bool: {
						should: [
							this.booleanExpr(node.value[0], config),
							this.booleanExpr(node.value[1], config)
						]
					}
				};
			case "and":
				return {
					bool: {
						must: [
							this.booleanExpr(node.value[0], config),
							this.booleanExpr(node.value[1], config)
						]
					}
				};
			case "not":
				return {
					bool: {
						must_not: [
							this.booleanExpr(node.value, config),
						]
					}
				};
			case "=":
				if (value.indexOf && value.indexOf("*") != -1) {
					return {
						wildcard: {
							[config.getField(field)]: {
								value
							}
						}
					};
				} else {
					return {
						match_phrase: {
							[config.getField(field)]: value
						}
					};
				}
			case "!=":
				return {
					bool: {
						must_not: {
							match_phrase: {
								[config.getField(field)]: value
							}
						}
					}
				};
			case ">":
				return {
					range: {
						[config.getField(field)]: {
							gt: value
						}
					}
				};
			case "<":
				return {
					range: {
						[config.getField(field)]: {
							lt: value
						}
					}
				};
			case "all":
				return {
					bool: {
						must: node.value.map(value => {
							return this.booleanExpr({
								node: 'boolean',
								field,
								operator: '=',
								value
							}, config)
						})
					}
				};
			case "any":
				return {
					bool: {
						should: node.value.map(value => {
							return this.booleanExpr({
								node: 'boolean',
								field,
								operator: '=',
								value
							}, config)
						})
					}
				};
			default:
				return "unsupported";
		}
	},
	tagFunction: function (node, config) {
		let value = node.value;
		let field = node.field;
		switch (node.operator) {
			case "or":
				return `(${this.tagFunction(node.value[0], config)}) || (${this.tagFunction(node.value[1], config)})`;
			case "and":
				return `(${this.tagFunction(node.value[0], config)}) && (${this.tagFunction(node.value[1], config)})`;
			case "not":
				return `!(${this.tagFunction(node.value, config)})`
			case "=":
				return `(event['${config.getField(field)}'] == '${value}')`
			case "!=":
				return `(event['${config.getField(field)}'] != '${value}')`
			case ">":
				return `(event['${config.getField(field)}'] > ${value})`
			case "<":
				return `(event['${config.getField(field)}'] < ${value})`
			case "all":
				return `(${JSON.stringify(value)}.every(v => event['${config.getField(field)}'].includes(v)))`
			case "any":
				return `(${JSON.stringify(value)}.some(v => event['${config.getField(field)}'].includes(v)))`
			default:
				return "unsupported";
		}
	},
	createSearchRequest: function (ast, orderby, config) {
		// console.log("search", util.inspect(ast.where, false, 15));

		let req = {
			track_total_hits: true,
			size: 10000,
			query: this.booleanExpr(ast.search.where, config)
		};
		if (orderby) {
			req.sort = {
				[config.getField(orderby)]: {
					order: "asc"
				}
			}
		}
		if (ast.selectedFields) {
			req._source = ast.selectedFields.map(field => config.getField(field));
		}
		if (ast.aggs && ast.aggs.length > 0) {
			req.aggs = this.getAggregation(ast.aggs, 0, config);
		}
		console.log("search", util.inspect(req, false, 15));
		return req
	},
	executeSearchRequest: async function (ast, orderby, config) {
		// console.log("search", util.inspect(ast.where, false, 15));

		let req = this.createSearchRequest(ast, orderby, config)
		let result = await config.client.search({
			body: req
		});
		return result
	},
	createTagFunction: function (ast, config) {
		let func = this.tagFunction(ast.where, config)
		console.log(func)
		return eval(`(event) => (${func}) ? ${JSON.stringify(ast.tags)} : undefined`)
	}
};
