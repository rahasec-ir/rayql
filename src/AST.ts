import * as util from "util";

function debug(message: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
}

function getRealLiteral(value: string): Literal {
    if (value.startsWith('"')) {
        return value.substring(1, value.length - 1);
    } else if (value.startsWith("'")) {
        return value.substring(1, value.length - 1);
    } else {
        return Number(value);
    }
}

export enum NodeType {
    Relation = "relation",
    Boolean = "boolean",
    Operation = "operation",
    Object = "object",
    ObjectDefinition = "object",
    TimeWindow = "timeWindow",
    KeyValue = "keyValue",
    Aggregation = "aggregation",
    ConditionalTag = "tag",
    Search = "search",
    Sequence = "sequence",
}

export type TimeUnit = "s" | "m" | "h" | "d";
type Operator = "=" | "!=" | ">" | "<" | "all" | "any";
type BooleanOperator = "and" | "or" | "not";
type RelationDirection = "out" | "in" | "both";
type Literal = string | number;
export type NodeValue = Literal | Literal[];

interface TimeWindowNode extends Node {
    node: NodeType.TimeWindow;
    unit: TimeUnit;
    number: number;
}

export interface Node {
    node: NodeType;
}

// export interface BooleanNode extends Node {
//     node: NodeType.Boolean;
//     field?: string;
//     operator: Operator;
//     value?: NodeValue;
//     value2?: NodeValue;
//     subNodes?: BooleanNode[]
// }

export interface BooleanNode extends Node {
    node: NodeType.Boolean;
    operator: BooleanOperator;
    subNodes: (BooleanNode | OperationNode)[]
}

export interface OperationNode extends Node {
    node: NodeType.Operation;
    field: string
    operator: Operator;
    value: Literal[];

}

interface RelationNode extends Node {
    node: NodeType.Relation;
    type: string;
    direction: RelationDirection;
}

interface ObjectDefinitionNode {
    node: NodeType.ObjectDefinition;
    class_name: string;
    as: string;
}

interface ObjectNode extends Node {
    node: NodeType.Object;
    class_name: string;
    as: string;
    selectedField?: string;
    where: BooleanNode;
}

interface KeyValueNode extends Node {
    node: NodeType.KeyValue;
    field: string;
    value: Literal;
}

interface AggregationNode extends Node {
    node: NodeType.Aggregation;
    type: string;
    field: string;
    props: KeyValueNode[];
}

export interface ConditionalTagNode extends Node {
    node: NodeType.ConditionalTag;
    where: BooleanNode;
    tags: Literal[];
}

export interface SearchNode extends Node {
    node: NodeType.Search;
    search: ObjectNode
    timeWindow: TimeWindowNode
    selectedFields: string[]
    aggs: AggregationNode[]
    expands: AggregationNode[]
}

export interface SequenceNode extends Node {
    node: NodeType.Sequence;
    timeWindow: TimeWindowNode
    unordered: number,
    steps: ObjectNode[],
}

export class AST {
    public static relation(type: string, direction: RelationDirection): RelationNode {
        return {
            node: NodeType.Relation,
            type,
            direction,
        };
    }
    public static relations(relation: Node, dest: Node, rest: Node[]): Node[] {
        if (!rest) {
            return [relation, dest];
        } else {
            return [relation, dest].concat(rest);
        }
    }

    public static object(object_def: ObjectDefinitionNode, where: BooleanNode): ObjectNode {
        return {
            node: NodeType.Object,
            class_name: object_def.class_name,
            as: object_def.as,
            where,
        };
    }
    public static objectDef(class_name: string, as: string): ObjectDefinitionNode {
        // class_name = class_name || 'Log'
        // as = as || 'return_value'
        return {
            node: NodeType.ObjectDefinition,
            class_name,
            as,
        };
    }
    public static and(right: BooleanNode, left: BooleanNode): BooleanNode {
        return {
            node: NodeType.Boolean,
            operator: "and",
            subNodes: [right, left]
        };
    }
    public static or(right: BooleanNode, left: BooleanNode): BooleanNode {
        return {
            node: NodeType.Boolean,
            operator: "or",
            subNodes: [right, left]
        };
    }
    public static not(expr: BooleanNode): BooleanNode {
        return {
            node: NodeType.Boolean,
            operator: "not",
            subNodes: [expr]
        };
    }
    public static tag(tags: string[], where: BooleanNode): ConditionalTagNode {
        return {
            node: NodeType.ConditionalTag,
            where,
            tags: tags.map((value) => getRealLiteral(value)),
        };
    }
    public static all(field: string, values: string[]): OperationNode {
        // console.log('all', field, values)
        return {
            node: NodeType.Operation,
            field,
            operator: "all",
            value: values.map((value) => getRealLiteral(value)),
        };
    }
    public static any(field: string, values: string[]): OperationNode {
        return {
            node: NodeType.Operation,
            field,
            operator: "any",
            value: values.map((value) => getRealLiteral(value)),
        };
    }
    public static operation(field: string, operator: Operator, value: string): OperationNode {
        // console.log("simple", field, operator, value);
        return {
            node: NodeType.Operation,
            field,
            operator,
            value: [getRealLiteral(value)],
        };
    }
    public static search(
        search: ObjectNode,
        timeWindow: TimeWindowNode,
        selectedFields: string[],
        aggs: AggregationNode[],
        expands: AggregationNode[]
    ): SearchNode {
        // console.log('search', search, selectedFields, aggs, expands)
        if (selectedFields) {
            selectedFields = selectedFields.reverse();
        }
        if (aggs) {
            aggs = aggs.reverse();
        }

        if (timeWindow) {
            search.where = {
                node: NodeType.Boolean,
                operator: "and",
                subNodes: [
                    search.where,
                    {
                        node: NodeType.Operation,
                        field: "@timestamp",
                        operator: ">",
                        value: ["now-" + timeWindow.number + timeWindow.unit],
                    }
                ]
            };
        }
        
        return {
            node: NodeType.Search,
            search,
            timeWindow,
            selectedFields,
            aggs,
            expands,
        };
        // console.log("search", util.inspect(search, false, 15));

        // console.log("timeWindow", util.inspect(timeWindow, false, 15));
        // console.log("selectedFields", util.inspect(selectedFields, false, 15));
        // console.log("aggs", util.inspect(aggs, false, 15));
        // console.log(JSON.stringify(finalAst))
    }
    public static keyValue(field: string, value: string): KeyValueNode {
        return {
            node: NodeType.KeyValue,
            field,
            value: getRealLiteral(value),
        };
    }
    public static aggregation(type: string, field: string, props: KeyValueNode[]): AggregationNode {
        return {
            node: NodeType.Aggregation,
            type,
            field,
            props,
        };
    }
    /*
    public static matchList(from, relations) {
        return {
            node: "match_list",
            from,
            relations,
        };
    }
    public static match(patterns) {
        // console.log("patterns", util.inspect(patterns, false, 15));
        return {
            node: "match",
            patterns,
        };
    }
    */
    public static timeWindow(number: number, unit: TimeUnit): TimeWindowNode {
        return {
            node: NodeType.TimeWindow,
            number,
            unit,
        };
    }
    public static objectSelected(object: ObjectNode, selectedField: string): ObjectNode {
        return {
            selectedField,
            ...object,
        };
    }
    public static sequence(unordered: string, timeWindow: TimeWindowNode, objectSelectedList: ObjectNode[]): SequenceNode {
        console.log("timeWindow", util.inspect(timeWindow, false, 15));
        console.log("objectSelectedList", util.inspect(objectSelectedList, false, 15));
        objectSelectedList = objectSelectedList.reverse();
        return {
            node: NodeType.Sequence,
            unordered: unordered === "all" ? objectSelectedList.length : Number(unordered),
            timeWindow,
            steps: objectSelectedList,
        };
    }
}
