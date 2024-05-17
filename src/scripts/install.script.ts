/**
 * Run `npm install` & `npm run import` in all directories
 * @order 1
 */

import {log} from "../lib/log.service.js";
import {runInModulesParallel, runInModulesSeries} from "../lib/modules.service.js";

log.section(`NPM Install in all modules`)
await runInModulesParallel('npm i --force --loglevel=error --ignore-scripts')
log.section(`Import dependencies across modules`)
await runInModulesSeries('npm run import --if-present')
log.info(`NPM Install & Import successful`)