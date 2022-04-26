import { ConditionalTagNode, SearchNode, SequenceNode } from "../AST";
import { StringMap } from "../query";


export abstract class Backend<SearchResponse, TagResponse, SequenceResponse> {
    private savedSearches: StringMap
    private mappings: StringMap

    constructor(savedSearches: StringMap, mappings: StringMap) {
        this.savedSearches = savedSearches;
        this.mappings = mappings;
    }

    public abstract search(search: SearchNode): SearchResponse
    public abstract tag(search: ConditionalTagNode): TagResponse
    public abstract sequence(search: SequenceNode): SequenceResponse

    public getField(field: string): string {
        if (this.mappings[field]) {
            return this.mappings[field]
        }
        return field
    }
}