import { SearchNode, ConditionalTagNode, SequenceNode, BooleanNode, NodeValue, OperationNode, NodeType } from "../AST";
import { StringMap, TagFunction } from "../query";
import { Backend } from "./Backend";

export class JsBackend extends Backend<any, TagFunction, any> {

    constructor(savedSearches: StringMap, mappings: StringMap) {
        super(savedSearches, mappings)
    }

    public search(search: SearchNode): Object {
        throw new Error("Method not implemented.");
    }
    public tag(search: ConditionalTagNode) {
        let func = this.tagFunction(search.where);
        console.log(func);
        return eval(`(event) => (${func}) ? ${JSON.stringify(search.tags)} : undefined`) as TagFunction;
    }
    public sequence(search: SequenceNode) {
        throw new Error("Method not implemented.");
    }

    private tagFunction(node: BooleanNode | OperationNode): string {
        if (node.node === NodeType.Boolean) {
            switch (node.operator) {
                case "or":
                    return node.subNodes?.map((sub) => "(" + this.tagFunction(sub) + ")").join(" || ");
                case "and":
                    return node.subNodes?.map((sub) => "(" + this.tagFunction(sub) + ")").join(" && ");
                case "not":
                    if (node.subNodes) {
                        return `!(${this.tagFunction(node.subNodes[0])})`;
                    }
                default:
                    return "unsupported";
            }
        } else if (node.node === NodeType.Operation) {
            let value = node.value;
            let field = node.field;
            const val = value[0].constructor === Number ? value[0].toString() : `'${value[0]}'`
            switch (node.operator) {
                case "=":
                    return `(event['${this.getField(field)}'] == ${val})`;
                case "!=":
                    return `(event['${this.getField(field)}'] != ${val})`;
                case ">":
                    return `(event['${this.getField(field)}'] > ${val})`;
                case "<":
                    return `(event['${this.getField(field)}'] < ${val})`;
                case "all":
                    return `(${JSON.stringify(value)}.every(v => event['${this.getField(field)}']?.includes(v)))`;
                case "any":
                    return `(${JSON.stringify(value)}.some(v => event['${this.getField(field)}']?.includes(v)))`;
                default:
                    return "unsupported";
            }
        }
        return "unsupported";
    }
}
