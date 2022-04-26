id                          [a-zA-Z\@][a-zA-Z0-9_\.]*
time_interval               [0-9]*[hymMdqy]
literal                     \'(\\.|[^'\\]|\*)*\'
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b    return 'NUMBER'
"tag"                   return 'tag'
"search"                return 'search'
"where"                 return 'where'
"match"                 return 'match'
"sequence"              return 'sequence'
"unordered"             return 'unordered'
"and"                   return 'and'
"or"                    return 'or'
"any"                   return 'any'
"all"                   return 'all'
"aggregate"             return 'aggregate'
"expand"                return 'expand'
"in"                    return 'in'
"select"                return 'select'
"filter"                return 'filter'
"primary"               return 'primary'
"by"                    return 'by'
"("                     return '('
")"                     return ')'
"["                     return '['
"]"                     return ']'
","                     return ','
"|"                     return '|'
"="                     return '='
"!="                    return '!='
"!"                     return '!'
"-"                     return '-'
">"                     return '>'
"<"                     return '<'
":"                     return ':'
","                     return ','

"Log"                   return 'Log'
"Process"               return 'Process'
"User"                  return 'User'


{literal}               return 'LITERAL';
{id}                    return 'ID';
{time_interval}         return 'time_interval';
<<EOF>>                 return 'EOF'
.                       return 'INVALID'

