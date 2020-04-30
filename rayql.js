/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var rayql = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[5,48,54,57,59,68,69,70,71],$V1=[5,24,29,31,48],$V2=[2,68],$V3=[1,19],$V4=[1,20],$V5=[1,21],$V6=[1,22],$V7=[1,25],$V8=[5,24],$V9=[2,18],$Va=[1,32],$Vb=[1,33],$Vc=[5,19,24,29,31,54,57,59],$Vd=[5,19,24,29,31,48,54,57,59],$Ve=[5,19,24,29,31,48,54,57,59,68],$Vf=[5,57,59],$Vg=[19,48],$Vh=[5,24,29,31,48,68,69,70,71],$Vi=[1,52],$Vj=[1,50],$Vk=[1,51],$Vl=[5,59],$Vm=[2,48],$Vn=[1,56],$Vo=[1,58],$Vp=[1,66],$Vq=[1,67],$Vr=[38,39,42,50],$Vs=[1,82],$Vt=[1,92],$Vu=[1,91],$Vv=[1,94],$Vw=[15,53],$Vx=[5,24,57,59],$Vy=[2,58],$Vz=[1,102],$VA=[5,16,24,38,39,42,50,57,59];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"start":3,"query":4,"EOF":5,"search_query":6,"match_query":7,"sequence_query":8,"join_query":9,"sequence":10,"in":11,"time_window":12,"object_selected_list":13,"optional_time_window":14,"NUMBER":15,"ID":16,"object_selected":17,"object":18,"by":19,"match_part":20,"match":21,"match_list":22,"relation_chain":23,",":24,"relation":25,"out_relation":26,"in_relation":27,"both_relation":28,"-":29,">":30,"<":31,"search":32,"select_search":33,"aggregations":34,"expand_part":35,"condition":36,"simple_condition":37,"or":38,"and":39,"!":40,"(":41,")":42,"field_operator":43,"literal":44,"all":45,"literal_array":46,"any":47,"[":48,"literals":49,"]":50,"=":51,"!=":52,"LITERAL":53,"select":54,"field_list":55,"aggregation":56,"aggregate":57,"aggregation_term":58,"expand":59,"aggregation_terms":60,"aggregation_type":61,"optional_key_values":62,"key_values":63,"key_value":64,"where_part":65,"object_def":66,"object_type":67,":":68,"Log":69,"Process":70,"User":71,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",9:"join_query",10:"sequence",11:"in",15:"NUMBER",16:"ID",19:"by",21:"match",24:",",29:"-",30:">",31:"<",32:"search",38:"or",39:"and",40:"!",41:"(",42:")",45:"all",47:"any",48:"[",50:"]",51:"=",52:"!=",53:"LITERAL",54:"select",57:"aggregate",59:"expand",68:":",69:"Log",70:"Process",71:"User"},
productions_: [0,[3,2],[4,1],[4,1],[4,1],[4,1],[8,4],[14,2],[14,0],[12,2],[13,2],[13,1],[17,3],[7,1],[20,2],[22,4],[22,2],[23,3],[23,0],[25,1],[25,1],[25,1],[26,4],[27,4],[28,3],[6,6],[36,1],[36,3],[36,3],[36,2],[36,3],[37,3],[37,3],[37,3],[46,3],[49,3],[49,1],[43,1],[43,1],[43,1],[43,1],[44,1],[44,1],[33,2],[33,0],[55,3],[55,1],[34,2],[34,0],[56,2],[35,2],[35,0],[60,3],[60,1],[58,4],[58,2],[61,1],[62,1],[62,0],[63,2],[63,1],[64,3],[65,3],[65,0],[18,2],[66,3],[66,1],[66,2],[66,0],[67,1],[67,1],[67,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 6:
 this.$ = AST.sequence($$[$0-1], $$[$0]) 
break;
case 7: case 14: case 43: case 49: case 50:
 this.$ = $$[$0] 
break;
case 9:
 this.$ = AST.timeWindow($$[$0-1], $$[$0]) 
break;
case 10: case 47: case 59:
 this.$ = $$[$0].concat($$[$0-1]) 
break;
case 11: case 36: case 46: case 53: case 60:
 this.$ = [$$[$0]] 
break;
case 12:
 this.$ = AST.objectSelected($$[$0-2], $$[$0]) 
break;
case 13:
 this.$ = AST.match($$[$0]) 
break;
case 15:
 this.$ = $$[$0].concat(AST.matchList($$[$0-3], $$[$0-2])) 
break;
case 16:
 this.$ = [AST.matchList($$[$0-1], $$[$0])] 
break;
case 17:
 this.$ = AST.relations($$[$0-2], $$[$0-1], $$[$0])
break;
case 22:
 this.$ = AST.relation($$[$0-2], 'out') 
break;
case 23:
 this.$ = AST.relation($$[$0-2], 'in') 
break;
case 24:
 this.$ = AST.relation($$[$0-1], 'both') 
break;
case 25:
 this.$ = AST.search($$[$0-3], $$[$0-4], $$[$0-2], $$[$0-1], $$[$0]) 
break;
case 27:
 this.$ = AST.or($$[$0-2], $$[$0]) 
break;
case 28:
 this.$ = AST.and($$[$0-2], $$[$0]) 
break;
case 29:
 this.$ = AST.not($$[$0]) 
break;
case 30: case 34: case 62:
 this.$ = $$[$0-1] 
break;
case 31:
 this.$ = AST.operation($$[$0-2], $$[$0-1], $$[$0]) 
break;
case 32:
 this.$ = AST.all($$[$0-2], $$[$0]) 
break;
case 33:
 this.$ = AST.any($$[$0-2], $$[$0]) 
break;
case 35: case 45: case 52:
 this.$ = $$[$0].concat($$[$0-2]) 
break;
case 48: case 58:
 this.$ = [] 
break;
case 54:
 this.$ = AST.aggregation($$[$0-3], $$[$0-1], $$[$0])
break;
case 55:
 this.$ = AST.aggregation($$[$0-1], undefined, $$[$0])
break;
case 61:
 this.$ = AST.keyValue($$[$0-2], $$[$0]) 
break;
case 64:
 this.$ = AST.object($$[$0-1], $$[$0]) 
break;
case 65:
 this.$ = AST.objectDef($$[$0-2], $$[$0])
break;
case 66:
 this.$ = AST.objectDef($$[$0])
break;
case 67:
 this.$ = AST.objectDef(undefined, $$[$0])
break;
case 68:
 this.$ = AST.objectDef()
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:[1,6],10:[1,9],20:8,21:[1,10],32:[1,7]},{1:[3]},{5:[1,11]},{5:[2,2]},{5:[2,3]},{5:[2,4]},{5:[2,5]},o($V0,[2,8],{14:12,11:[1,13]}),{5:[2,13]},{11:[1,14]},o($V1,$V2,{22:15,18:16,66:17,67:18,68:$V3,69:$V4,70:$V5,71:$V6}),{1:[2,1]},o([5,48,54,57,59],$V2,{66:17,67:18,18:23,68:$V3,69:$V4,70:$V5,71:$V6}),{12:24,15:$V7},{12:26,15:$V7},{5:[2,14]},o($V8,$V9,{23:27,25:28,26:29,27:30,28:31,29:$Va,31:$Vb}),o($Vc,[2,63],{65:34,48:[1,35]}),o($Vd,[2,66],{68:[1,36]}),{16:[1,37]},o($Ve,[2,69]),o($Ve,[2,70]),o($Ve,[2,71]),o($Vf,[2,44],{33:38,54:[1,39]}),o($V0,[2,7]),{16:[1,40]},o($Vg,$V2,{66:17,67:18,13:41,17:42,18:43,68:$V3,69:$V4,70:$V5,71:$V6}),{5:[2,16],24:[1,44]},o($V1,$V2,{66:17,67:18,18:45,68:$V3,69:$V4,70:$V5,71:$V6}),o($Vh,[2,19]),o($Vh,[2,20]),o($Vh,[2,21]),{16:[1,46]},{29:[1,47]},o($Vc,[2,64]),{16:$Vi,36:48,37:49,40:$Vj,41:$Vk},{16:[1,53]},o($Vd,[2,67]),o($Vl,$Vm,{34:54,56:55,57:$Vn}),{16:$Vo,55:57},o([5,19,48,54,57,59,68,69,70,71],[2,9]),{5:[2,6]},o($Vg,$V2,{66:17,67:18,17:42,18:43,13:59,5:[2,11],68:$V3,69:$V4,70:$V5,71:$V6}),{19:[1,60]},o($V1,$V2,{18:16,66:17,67:18,22:61,68:$V3,69:$V4,70:$V5,71:$V6}),o($V8,$V9,{25:28,26:29,27:30,28:31,23:62,29:$Va,31:$Vb}),{29:[1,63]},{16:[1,64]},{38:$Vp,39:$Vq,50:[1,65]},o($Vr,[2,26]),{16:$Vi,36:68,37:49,40:$Vj,41:$Vk},{16:$Vi,36:69,37:49,40:$Vj,41:$Vk},{30:[1,75],31:[1,76],43:70,45:[1,71],47:[1,72],51:[1,73],52:[1,74]},o($Vd,[2,65]),{5:[2,51],35:77,59:[1,78]},o($Vl,$Vm,{56:55,34:79,57:$Vn}),{16:$Vs,58:80,61:81},o($Vf,[2,43]),o($Vf,[2,46],{24:[1,83]}),{5:[2,10]},{16:[1,84]},{5:[2,15]},o($V8,[2,17]),o($Vh,[2,24],{30:[1,85]}),{29:[1,86]},o($Vc,[2,62]),{16:$Vi,36:87,37:49,40:$Vj,41:$Vk},{16:$Vi,36:88,37:49,40:$Vj,41:$Vk},o($Vr,[2,29]),{38:$Vp,39:$Vq,42:[1,89]},{15:$Vt,44:90,53:$Vu},{46:93,48:$Vv},{46:95,48:$Vv},o($Vw,[2,37]),o($Vw,[2,38]),o($Vw,[2,39]),o($Vw,[2,40]),{5:[2,25]},{16:$Vs,58:97,60:96,61:81},o($Vl,[2,47]),o($Vf,[2,49]),o($Vx,$Vy,{62:99,63:100,64:101,16:$Vz,19:[1,98]}),o([5,16,19,24,57,59],[2,56]),{16:$Vo,55:103},o([5,19,48,68,69,70,71],[2,12]),o($Vh,[2,22]),o($Vh,[2,23]),o([38,42,50],[2,27],{39:$Vq}),o($Vr,[2,28]),o($Vr,[2,30]),o($Vr,[2,31]),o($VA,[2,41]),o($VA,[2,42]),o($Vr,[2,32]),{15:$Vt,44:105,49:104,53:$Vu},o($Vr,[2,33]),{5:[2,50]},{5:[2,53],24:[1,106]},{16:[1,107]},o($Vx,[2,55]),o($Vx,[2,57]),o($Vx,[2,60],{64:101,63:108,16:$Vz}),{51:[1,109]},o($Vf,[2,45]),{50:[1,110]},{24:[1,111],50:[2,36]},{16:$Vs,58:97,60:112,61:81},o($Vx,$Vy,{63:100,64:101,62:113,16:$Vz}),o($Vx,[2,59]),{15:$Vt,44:114,53:$Vu},o($Vr,[2,34]),{15:$Vt,44:105,49:115,53:$Vu},{5:[2,52]},o($Vx,[2,54]),o([5,16,24,57,59],[2,61]),{50:[2,35]}],
defaultActions: {3:[2,2],4:[2,3],5:[2,4],6:[2,5],8:[2,13],11:[2,1],15:[2,14],41:[2,6],59:[2,10],61:[2,15],77:[2,25],96:[2,50],112:[2,52],115:[2,35]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return yyval.$
            return true;
        }
    }
    return true;
}};

var AST = require('./ast.js')

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 15
break;
case 2:return 32
break;
case 3:return 21
break;
case 4:return 10
break;
case 5:return 39
break;
case 6:return 40
break;
case 7:return 38
break;
case 8:return 47
break;
case 9:return 45
break;
case 10:return 57
break;
case 11:return 59
break;
case 12:return 11
break;
case 13:return 54
break;
case 14:return 'filter'
break;
case 15:return 'primary'
break;
case 16:return 19
break;
case 17:return 41
break;
case 18:return 42
break;
case 19:return 48
break;
case 20:return 50
break;
case 21:return 24
break;
case 22:return '|'
break;
case 23:return 51
break;
case 24:return 52
break;
case 25:return 29
break;
case 26:return 30
break;
case 27:return 31
break;
case 28:return 68
break;
case 29:return 24
break;
case 30:return 69
break;
case 31:return 70
break;
case 32:return 71
break;
case 33:return 53;
break;
case 34:return 16;
break;
case 35:return 'time_interval';
break;
case 36:return 5
break;
case 37:return 'INVALID'
break;
}
},
rules: [/^(?:\s+)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:search\b)/,/^(?:match\b)/,/^(?:sequence\b)/,/^(?:and\b)/,/^(?:!)/,/^(?:or\b)/,/^(?:any\b)/,/^(?:all\b)/,/^(?:aggregate\b)/,/^(?:expand\b)/,/^(?:in\b)/,/^(?:select\b)/,/^(?:filter\b)/,/^(?:primary\b)/,/^(?:by\b)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:\|)/,/^(?:=)/,/^(?:!=)/,/^(?:-)/,/^(?:>)/,/^(?:<)/,/^(?::)/,/^(?:,)/,/^(?:Log\b)/,/^(?:Process\b)/,/^(?:User\b)/,/^(?:('(\\.|[^'\\]|\*)*'))/,/^(?:([a-zA-Z\@][a-zA-Z0-9_\.]*))/,/^(?:([0-9]*[hymMdqy]))/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = rayql;
exports.Parser = rayql.Parser;
exports.parse = function () { return rayql.parse.apply(rayql, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}