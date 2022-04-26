import { Search } from "@elastic/elasticsearch/api/requestParams"
import { Node, NodeType, TimeUnit } from "./AST"
let rayql = require('../rayql')

type StringMap = {[key: string]: string}
type TagFunction = (event: object) => string[]
type Filter = {}

export class RayQuery {
    private savedSearches: StringMap
    private mappings: StringMap
    // private queryText: string

    constructor(savedSearches: StringMap, mappings: StringMap) {
        this.savedSearches = savedSearches
        this.mappings = mappings
        // this.queryText = query
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
        if (ast.node !== NodeType.ConditionalTag) {
            throw new Error('query is not tag query')
        }
        // convert esbackend
        return undefined as unknown as TagFunction
    }
}

let q = new RayQuery({}, {})
let ast = q.getAST(`
tag ['t1120', 'recon']
where [event_id = 1 and command_line any ['whoami', 'dir']]
`)
console.log(ast)