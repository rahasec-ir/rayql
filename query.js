
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
    exec: async function (text, optTimeWindow) {
        this.text = format(text, this.config.savedSearches)
        let ast = rayql.parse(this.text)
        if (ast.node === 'search') {
            console.log('searching', this.text)
            if (optTimeWindow) {
                ast = AST.search(ast.search, optTimeWindow, ast.selectedFields, ast.aggs, ast.expands)
            }
            let resp = await es.createSearchRequest(ast, undefined, this)
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
                        if(record.sequence == searches.length - 1) {
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
    }
}

module.exports = Rayql
