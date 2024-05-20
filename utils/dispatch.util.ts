import {fork} from "node:child_process";
const action = process.argv[2]
let path:string=''
if (action==='menu') path = 'scripts/dist/shared/utils/menu.util.js'
fork(path)