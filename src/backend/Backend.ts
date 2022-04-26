import { ConditionalTagNode, SearchNode, SequenceNode } from "../AST";


export abstract class Backend<SearchResponse, TagResponse, SequenceResponse> {
    public abstract search(search: SearchNode): SearchResponse
    public abstract tag(search: ConditionalTagNode): TagResponse
    public abstract sequence(search: SequenceNode): SequenceResponse

}