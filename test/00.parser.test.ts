import {expect} from 'chai'
import { NodeType } from '../src/AST'
import { RayQuery } from '../src/query'

describe('query parser', () => {
    const query: RayQuery = new RayQuery({}, {})
    it('should parse search query', () => {
        let ast = query.getAST('search [event_id = 1]')
        expect(ast).to.have.property('node')
        expect(ast.node).to.be.eq(NodeType.Search)
    })

    it('should generate es search request properly')
    it('should generate simple search query on one field with value by all operators')
    it('should generate simple wildcard query on one field with value')
    it('should generate "and" query')
    it('should generate "or" query')
    it('should generate "not" query')
    it('should generate multiple boolean operations query')
    it('should generate aggregations properly')
    it('should set selected fields in response')
    it('should change fieldnames based on mappings')
    it('should replace savedSearches in query')
})

describe('sequence parser', () => {

})

describe('tag function parser', () => {
    
})