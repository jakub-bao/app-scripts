/**
 * Runs `npm test` in all directories
 * @order 2
 */


import {log} from "../lib/log.service.js";
import {runInModulesParallel} from "../lib/modules/modules.service.js";

log.section(`NPM Test in all modules`)
await runInModulesParallel('npm run test:run --if-present')