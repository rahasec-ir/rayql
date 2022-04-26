
var es = require("./esBackend")
var rayql = require("./rayql")
const AST = require('./ast')
const arrayMerger = require('./arrayMerger')
const format = require('string-format')
var flatten = require('flat')
const { Client } = require("@elastic/elasticsearch");

function Rayql(config) {
    if (!config) {
        config = {}
    }
    if (!config.elastic) {
        config.elastic = {
            node: 'http://localhost:9200'
        }
    }
    if (!config.savedSearches) {
        config.savedSearches = {}
    }
    if (!config.mappings) {
        config.mappings = {}
    }
    this.config = config //
    this.client = new Client(config.elastic)
}

Rayql.prototype = {
    constructor: Rayql,
    query: function (text, filter) {
        this.text = format(text, this.config.savedSearches)
        let ast = rayql.parse(this.text)
        if (ast.node === 'search') {
            console.log('searching', this.text)
            if (filter) {
                ast.search.where = {
                    node: 'boolean',
                    operator: 'and',
                    value: [ast.search.where, filter]
                }
            }
            return es.createSearchRequest(ast, undefined, this)
            // console.log(resp)
        }
    }, 
    parse: function (text, filter) {
        this.text = format(text, this.config.savedSearches)
        let ast = rayql.parse(this.text)
        if (ast.node === 'search') {
            console.log('searching', this.text)
            if (filter) {
                ast.search.where = {
                    node: 'boolean',
                    operator: 'and',
                    value: [ast.search.where, filter]
                }
            }
            return ast
        }
        if (ast.node === 'sequence') {
            if (filter) {
                for (let step of ast.steps) {
                    step.where = {
                        node: 'boolean',
                        operator: 'and',
                        value: [step.where, filter]
                    }
                }
            }
        }
        return ast
    },
    createSearchRequest: function (ast, order) {
        return es.createSearchRequest(ast, order, this)
    },
    exec: async function (text, optTimeWindow) {
        this.text = format(text, this.config.savedSearches)
        let ast = rayql.parse(this.text)
        if (ast.node === 'search') {
            console.log('searching', this.text)
            if (optTimeWindow) {
                let filter = {
					node: 'boolean',
					field: '@timestamp',
					operator: '>',
					value: 'now-' + optTimeWindow.number + optTimeWindow.unit
				}
                ast = AST.search(ast.search, filter, ast.selectedFields, ast.aggs, ast.expands)
            }
            let resp = await es.executeSearchRequest(ast, undefined, this)
            return {
                total: resp.body.hits.total,
                hits: resp.body.hits.hits,
                aggregations: resp.body.aggregations
            }

            // console.log(resp)
        } else if (ast.node === 'match') {

        } else if (ast.node === 'sequence') {
            // search all seqs in timeWindow
            let states = {}
            let searches = []
            let index = 0
            for (let seq of ast.objectSelectedList) {
                let search = AST.search(seq, ast.timeWindow, [seq.selectedField, '@timestamp'])
                let resp = await es.createSearchRequest(search, '@timestamp', this)
                let retVal = ({
                    total: resp.body.hits.total,
                    hits: resp.body.hits.hits.map((value) => ({
                        t: new Date(value._source[this.getField('@timestamp')]),
                        key: flatten(value._source)[this.getField(seq.selectedField)],
                        id: value._index + ':' + value._id,
                        sequence: index
                    })),
                })
                searches.push(retVal.hits)
                console.log(retVal)
                index++
            }
            let final = arrayMerger.mergeKSorted(searches)
            for (const record of final) {
                if (record.sequence == 0) {
                    states[record.key] = {
                        0: [record.id]
                    }
                } else {
                    if (states[record.key] && states[record.key][record.sequence - 1]) {
                        states[record.key][record.sequence] = states[record.key][record.sequence - 1].concat([record.id])
                        // for (let i = 0; i < record.sequence; i++) {
                        //     states[record.key][record.sequence][i] = states[record.key][record.sequence - 1][i]
                        // }
                        delete states[record.key][record.sequence - 1]
                        if (record.sequence == searches.length - 1) {
                            console.log('seq', record.key, states[record.key])
                        }
                    }

                }
            }
            console.log(states)

        } else {
            // console.log(ast)
        }
    },
    execSince: async function (number, unit) {
        return await this.exec({
            node: 'timeWindow',
            number,
            unit
        })
    },
    getField: function (fieldname) {
        if (this.config.mappings[fieldname]) {
            return this.config.mappings[fieldname]
        }
        return fieldname
    },
    tag: function (text) {
        this.text = format(text, this.config.savedSearches)
        let ast = rayql.parse(this.text)
        let func = es.createTagFunction(ast, this)
        console.log(func)
    }
}

module.exports = Rayql
