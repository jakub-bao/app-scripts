/**
 * Run `npm install` & `npm run import` in all directories
 * @order 1
 */

import {runInModulesParallel, runInModulesSeries} from "../lib/runInModules.service.js";
import {log} from "../lib/log.service.js";

log.section(`NPM Install in all modules`)
await runInModulesParallel('npm i --force --loglevel=error --ignore-scripts')
log.section(`Import dependencies across modules`)
await runInModulesSeries('npm run import --if-present')
log.section(`NPM Install & Import successful`)