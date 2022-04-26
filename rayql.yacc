%{
var {AST} = require('./src/AST.js')

%}

%left 'or'
%left 'and'
%left 'aggregate' 
%left 'expand'
%left '|'
%left '^'
%right '!'
%right '%'

%start start

%%

start : 
    query EOF;

query : 
    search_query | match_query | sequence_query | join_query | tag_query;

tag_query:
    'tag' literal_array 'where' where_part { $$ = AST.tag($2, $4) }
    ;

// sequence_query
sequence_query:
    'sequence' optional_unordered 'in' time_window object_selected_list { $$ = AST.sequence($2, $4, $5) }
    ;

optional_time_window:
    'in' time_window { $$ = $2 }
    |

    ;

optional_unordered:
    'unordered' 'NUMBER' { $$ = $2 }
    |
    'unordered' { $$ = 'all' }
    |
      
    ;

time_window:
    'NUMBER' 'ID' { $$ = AST.timeWindow($1, $2) }
    ;

object_selected_list:
    object_selected object_selected_list { $$ = $2.concat($1) }
    |
    object_selected { $$ = [$1] }
    ;

object_selected:
    object 'by' 'ID' { $$ = AST.objectSelected($1, $3) }
    ;

// match in orient
match_query :
    match_part { $$ = AST.match($1) }
    ;

match_part :
    'match' match_list { $$ = $2 }
    ;

match_list :
    object relation_chain ',' match_list  { $$ = $4.concat(AST.matchList($1, $2)) }
    |
    object relation_chain  { $$ = [AST.matchList($1, $2)] }
    ;

relation_chain : 
    relation object relation_chain { $$ = AST.relations($1, $2, $3)}
    |

    ;

relation :
    out_relation
    |
    in_relation
    |
    both_relation
    ;

out_relation:
    '-' 'ID' '-' '>' { $$ = AST.relation($2, 'out') }
    ;

in_relation:
    '<' '-' 'ID' '-' { $$ = AST.relation($2, 'in') }
    ;


both_relation:
    '-' 'ID' '-' { $$ = AST.relation($2, 'both') }
    ;

// search in elasticsearch
search_query :
    'search' optional_time_window object select_search aggregations expand_part 
    { $$ = AST.search($3, $2, $4, $5, $6) };

condition: 
    simple_condition
    | 
    condition 'or' condition  { $$ = AST.or($1, $3) }
    | 
    condition 'and' condition  { $$ = AST.and($1, $3) }
    |
    '!' condition  { $$ = AST.not($2) }
    |
    '(' condition ')' { $$ = $2 };

simple_condition:
    'ID' field_operator literal { $$ = AST.operation($1, $2, $3) } 
    |
    'ID' 'all' literal_array { $$ = AST.all($1, $3) }
    |
    'ID' 'any' literal_array { $$ = AST.any($1, $3) }
    ;

literal_array:
    '[' literals ']' { $$ = $2 }
    ;

literals:
    literal ',' literals { $$ = $3.concat($1) }
    |
    literal { $$ = [$1] }
    ;

field_operator : '=' | '!=' | '>' | '<' ;

literal : 'LITERAL' | 'NUMBER';

select_search:
    'select' field_list { $$ = $2 }
    |

    ;

field_list:
    'ID' ',' field_list { $$ = $3.concat($1) }
    |
    'ID' { $$ = [$1] }
    ;

aggregations:
    aggregation aggregations  { $$ = $2.concat($1) }
    |
    { $$ = [] }
    ;

aggregation:
    'aggregate' aggregation_term { $$ = $2 }
    ;

expand_part:
    'expand' aggregation_terms { $$ = $2 }
    |

    ;

aggregation_terms:
    aggregation_term ',' aggregation_terms { $$ = $3.concat($1) }
    |
    aggregation_term { $$ = [$1] }
    ;

aggregation_term:
    aggregation_type 'by' 'ID' optional_key_values { $$ = AST.aggregation($1, $3, $4)}
    |
    aggregation_type optional_key_values { $$ = AST.aggregation($1, undefined, $2)}
    ;

// terms / date_histogram
aggregation_type:
    'ID'
    ;

optional_key_values:
    key_values
    |
    { $$ = [] }
    ;

key_values:
    key_value key_values { $$ = $2.concat($1) }
    |
    key_value { $$ = [$1] }
    ;

key_value:
    'ID' '=' literal { $$ = AST.keyValue($1, $3) }
    ;

// where part
where_part:
    '[' condition ']' { $$ = $2 }
    |

    ;


// object with class and alias
object :
    object_def where_part { $$ = AST.object($1, $2) }
    ;

object_def :
    object_type ':' 'ID' { $$ = AST.objectDef($1, $3)}
    |
    object_type { $$ = AST.objectDef($1)}
    |
    ':' 'ID' { $$ = AST.objectDef(undefined, $2)}
    |
      { $$ = AST.objectDef()}
    ;

object_type :
    'Log' | 'Process' | 'User' ;