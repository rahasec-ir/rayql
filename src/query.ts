import { Search } from "@elastic/elasticsearch/api/requestParams"
import { ConditionalTagNode, Node, NodeType, TimeUnit } from "./AST"
import { JsBackend } from "./backend/JsBackend"
let rayql = require('../rayql')

export type StringMap = {[key: string]: string}
export type TagFunction = (event: object) => string[]
type Filter = {}

export class RayQuery {
    private savedSearches: StringMap
    private mappings: StringMap
    private jsBackend: JsBackend
    // private queryText: string

    constructor(savedSearches: StringMap, mappings: StringMap) {
        this.savedSearches = savedSearches
        this.mappings = mappings
        this.jsBackend = new JsBackend(this.savedSearches, this.mappings)
    }

    public getAST(text: string): Node {
        return rayql.parse(text) as Node
    }

    public getElasticQuery(text: string, filter?: Filter): Search {
        return undefined as unknown as Search
    }

    public getElasticQuerySince(text: string, timeDiff: number, timeUnit: TimeUnit): Search {
        return undefined as unknown as Search
    }

    public getSequenceQueries(text: string): Search {
        return undefined as unknown as Search
    }

    public getTagFunction(text: string): TagFunction {
        const ast = this.getAST(text)
        if (ast.node === NodeType.ConditionalTag) {
            return this.jsBackend.tag(ast as ConditionalTagNode)
        } else {
            throw new Error('query is not tag query')
        }
    }
}

let q = new RayQuery({}, {})
let ast = q.getTagFunction(`
tag ['t1120', 'recon']
where [event_id = 1 and command_line any ['whoami', 'dir']]
`)
console.log(ast)