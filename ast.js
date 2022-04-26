var util = require("util");


function debug(message, ...optionalParams) {
    console.log(message, optionalParams)
}

function getRealLiteral(value) {
    if (value.startsWith('"')) {
        value = value.substring(1, value.length - 1);
    } else if (value.startsWith('\'')) {
        value = value.substring(1, value.length - 1);
    } else {
        value = Number(value);
    }
    return value
}

module.exports = {
    relation: (type, direction) => {
        // console.debug('relation', direction)
        return {
            node: 'relation',
            type,
            direction,
        }
    },
    relations: (relation, dest, rest) => {
        if (!rest) {
            return [relation, dest]
        } else {
            return [relation, dest].concat(rest)
        }
    },
    matchList: (from, relations) => {
        // console.debug('matchList', from, '|', relations)
        return {
            node: 'match_list',
            from,
            relations
        }
    },
    object: (object_def, where) => {
        return {
            node: 'object',
            class_name: object_def.class_name,
            as: object_def.as,
            where
        }
    },
    objectDef: (class_name, as) => {
        // class_name = class_name || 'Log'
		// as = as || 'return_value'
        return {
            node: 'object_definition',
            class_name,
            as,
        }
    },
    and: (right, left) => {
        return {
            node: 'boolean',
            operator: 'and',
            value: [right, left]
        }
    },
    or: (right, left) => {
        return {
            node: 'boolean',
            operator: 'or',
            value: [right, left]
        }
    },
    not: (expr) => {
        return {
            node: 'boolean',
            operator: 'not',
            value: expr
        }
    },
    tag: (tags, where) => {
        return {
            where,
            tags: tags.map(value => getRealLiteral(value)),
        }
    },
    all: (field, values) => {
        // console.log('all', field, values)
        return {
            node: 'boolean',
            field,
            operator: 'all',
            value: values.map(value => getRealLiteral(value)),
        }
    },
    any: (field, values) => {
        // console.log('any', field, values)
        return {
            node: 'boolean',
            field,
            operator: 'any',
            value: values.map(value => getRealLiteral(value)),
        }
    },
    operation: (field, operator, value) => {
        // console.log("simple", field, operator, value);
		value = getRealLiteral(value)
        return {
            node: 'boolean',
            field,
            operator,
            value,
        }
    },
    search: (search, timeWindow, selectedFields, aggs, expands) => {
        // console.log('search', search, selectedFields, aggs, expands)
        if (selectedFields) {
            selectedFields = selectedFields.reverse()
        }
        if(aggs) {
            aggs = aggs.reverse()
        }

        if(timeWindow) {
			search.where = {
				node: 'boolean',
				operator: 'and',
				value: [search.where, {
					node: 'boolean',
					field: '@timestamp',
					operator: '>',
					value: 'now-' + timeWindow.number + timeWindow.unit
				}]
			}
		}
        
        let finalAst = {
            node: 'search',
            search, timeWindow, selectedFields, aggs, expands
        }
        // console.log("search", util.inspect(search, false, 15));
        
		// console.log("timeWindow", util.inspect(timeWindow, false, 15));
		// console.log("selectedFields", util.inspect(selectedFields, false, 15));
        // console.log("aggs", util.inspect(aggs, false, 15));
        // console.log(JSON.stringify(finalAst))
        return finalAst

    },
    keyValue: (field, value) => {
        return {
            node: 'keyValue',
            field,
            value: getRealLiteral(value),
        }
    },
    aggregation: (type, field, props) => {
        return {
            node: 'aggregation',
            type,
            field,
            props,
        }
    },
    match: (patterns) => {
		// console.log("patterns", util.inspect(patterns, false, 15));
        return {
            node: 'match',
            patterns
        }
    },
    timeWindow: (number, unit) => {
        return {
            node: 'timeWindow',
            number,
            unit
        }
    },
    objectSelected: (object, selectedField) => {
        return {
            selectedField,
            ...object
        }
    },
    sequence: (unordered, timeWindow, objectSelectedList) => {
		console.log("timeWindow", util.inspect(timeWindow, false, 15));
        console.log("objectSelectedList", util.inspect(objectSelectedList, false, 15));
        objectSelectedList = objectSelectedList.reverse()
        return {
            node: 'sequence',
            unordered: unordered === 'all' ? objectSelectedList.length : unordered,
            timeWindow,
            steps: objectSelectedList,
        }
    },
    
}