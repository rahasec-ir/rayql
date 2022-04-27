import { RequestParams } from "@elastic/elasticsearch";
import { SearchNode, ConditionalTagNode, SequenceNode, BooleanNode, AggregationNode, OperationNode, NodeType } from "../AST";
import { StringMap, TagFunction } from "../query";
import { Backend } from "./Backend";
import * as util from 'util'

export class EsBackend extends Backend<RequestParams.Search, any, RequestParams.Search[]> {
    public search(search: SearchNode): RequestParams.Search<any> {
        let req: RequestParams.Search<any> = {
            track_total_hits: true,
            size: 10000,
            body: {
                query: this.booleanExpr(search.search.where),
            },
        };
        // if (orderby) {
        // 	req.sort = {
        // 		[config.getField(orderby)]: {
        // 			order: "asc"
        // 		}
        // 	}
        // }
        if (search.selectedFields) {
            req._source = search.selectedFields.map((field) => this.getField(field));
        }
        if (search.aggs && search.aggs.length > 0) {
        	req.body.aggs = this.getAggregation(search.aggs, 0);
        }
        console.log("search", util.inspect(req, false, 15));
        return req;
    }
    private getAggregation(aggList: AggregationNode[], index: number): any {
        let aggObj = this.getAggregationByType(aggList[index]);
		if (index < aggList.length - 1) {
			let key = Object.keys(aggObj)[0]
			aggObj[key].aggs = this.getAggregation(aggList, index + 1)
			return aggObj
		} else {
			return aggObj;
		}
    }

    private getAggregationByType(agg: AggregationNode) {
		let obj: any = {};
		switch (agg.type) {
			case "terms":
				obj = {
					["terms_" + agg.field]: {
						terms: {
							field: this.getField(agg.field)
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
							field: this.getField(agg.field)
						}
					}
				};
				for (let prop of agg.props) {
					obj["date_histogram_" + agg.field].date_histogram[prop.field] = prop.value;
				}
				return obj;
		}
	}
    public tag(search: ConditionalTagNode) {
        throw new Error("Method not implemented.");
    }
    public sequence(search: SequenceNode): RequestParams.Search<any>[] {
        throw new Error("Method not implemented.");
    }

    private booleanExpr(node: BooleanNode | OperationNode): any {
        if (node.node === NodeType.Boolean) {
            switch (node.operator) {
                case "or":
                    return {
                        bool: {
                            should: [this.booleanExpr(node.subNodes[0]), this.booleanExpr(node.subNodes[1])],
                        },
                    };
                case "and":
                    return {
                        bool: {
                            must: [this.booleanExpr(node.subNodes[0]), this.booleanExpr(node.subNodes[1])],
                        },
                    };
                case "not":
                    return {
                        bool: {
                            must_not: [this.booleanExpr(node.subNodes[0])],
                        },
                    };
                default:
                    return "unsupported";
            }
        } else if (node.node === NodeType.Operation) {
            let field = node.field;
            const val = node.value[0];
            switch (node.operator) {
                case "=":
                    if (val.constructor === String && val.indexOf("*") != -1) {
                        return {
                            wildcard: {
                                [this.getField(field)]: {
                                    val,
                                },
                            },
                        };
                    } else {
                        return {
                            match_phrase: {
                                [this.getField(field)]: val,
                            },
                        };
                    }
                case "!=":
                    return {
                        bool: {
                            must_not: {
                                match_phrase: {
                                    [this.getField(field)]: val,
                                },
                            },
                        },
                    };
                case ">":
                    return {
                        range: {
                            [this.getField(field)]: {
                                gt: val,
                            },
                        },
                    };
                case "<":
                    return {
                        range: {
                            [this.getField(field)]: {
                                lt: val,
                            },
                        },
                    };
                case "all":
                    return {
                        bool: {
                            must: node.value.map((value) => {
                                return this.booleanExpr({
                                    node: NodeType.Operation,
                                    field,
                                    operator: "=",
                                    value: [value],
                                });
                            }),
                        },
                    };
                case "any":
                    return {
                        bool: {
                            should: node.value.map((value) => {
                                return this.booleanExpr({
                                    node: NodeType.Operation,
                                    field,
                                    operator: "=",
                                    value: [value],
                                });
                            }),
                        },
                    };
                default:
                    return "unsupported";
            }
        }
        return "unsupported";
    }
}
