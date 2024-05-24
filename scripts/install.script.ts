/**
 * Run `npm install` & `npm run import` in all directories
 * @order 1
 */

import {log} from "../lib/log.service.js";
import {runInModulesParallel, runInModulesSeries, setModules} from "../lib/modules/modules.service.js";

if (process.argv.slice(2).length>0) setModules(process.argv.slice(2))

log.section(`NPM Install in modules`)
await runInModulesParallel('npm i --force --loglevel=error --ignore-scripts')
log.section(`Import dependencies across modules`)
await runInModulesSeries('npm run import --if-present')
log.finished(`Build complete`)