var util = require("util");
var fs = require("fs");


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
	createSearchRequest: async function (ast, orderby, config) {
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

		let result = await config.client.search({
			body: req
		});
		return result
	}
};
