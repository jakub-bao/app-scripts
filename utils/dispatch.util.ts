import {fork} from "node:child_process";
import {existsSync} from "node:fs";
import chalk from "chalk";
const action = process.argv[2]
let path:string=``
if (action==='menu') path = 'scripts/dist/shared/utils/menu.util.js'
path = `scripts/dist/shared/scripts/${action}.script.js`
if (!existsSync(path)) path = `scripts/dist/local/scripts/${action}.script.js`
if (!existsSync(path)) throw new Error(`${chalk.red('Cannot find a script named')} ${chalk.bold(action+'.script.js')}.\nChecked paths:\nscripts/dist/shared/scripts\nscripts/dist/local/scripts`)
fork(path)