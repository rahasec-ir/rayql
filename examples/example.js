var rayql = require("../rayql")
var Rayql = require("../query")
const rq = new Rayql({
    
    savedSearches: {
        
    },
    mappings: {

    },
})


let reverseShell = `
sequence in 1 hour
[event_id = 3 and ip_is_public = 'true'] by process_guid
[event_id = 1 and process_name = 'cmd.exe'] by process_parent_guid
`

let cb = `
sequence in 10 min
[event_id = 3 and ip_is_public = true and process_name != 'chrome.exe'] by process_guid
[event_id = 3 and dest_port = 3389] by process_guid
`

let unordered = `
sequence unordered in 10 min
[event_id = 7 and image_name = 'samlib.dll'] by process_guid
[event_id = 7 and image_name = 'vaultcl.dll'] by process_guid
`

let recon = `
sequence unordered 2 in 20 min
[event_id = 1 and command_line = 'whoami'] by session_guid
[event_id = 1 and command_line = 'net view'] by session_guid
[event_id = 1 and command_line = 'net user'] by session_guid
[event_id = 100 and scriptblock_text = 'get-computer'] by session_guid
`

let tag2 = `
tag ['t1120', 'recon']
where [event_id = 1 and command_line any ['whoami', 'dir']]
`

rq.tag(tag2)

let tagAst = rayql.parse(tag2)
let ast = rayql.parse(unordered)
let ast2 = rayql.parse(`search in 10 min [event_id = 11 and process_name = 'calc.exe']`)
console.log(ast, ast2)
[1, 2]