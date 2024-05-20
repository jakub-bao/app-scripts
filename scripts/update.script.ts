/**
 * Runs `npm-check-updates` & `npm install` in all modules
 */


import ncu from 'npm-check-updates'
import chalk from "chalk";
import {Index} from "npm-check-updates/build/src/types/IndexType.js";
import {writeFileSync, writeSync} from "node:fs";
import {fork} from "node:child_process";
import {log} from "../lib/log.service.js";
import {modules, runInModulesParallel} from "../lib/modules/modules.service.js";

log.section(`Delete package-lock.json files`)
await runInModulesParallel('rm -f package-lock.json')

log.section('Update package.json in each module')
await updatePackageJsons()

log.section('Switching to install')
fork(`scripts/dist/shared/scripts/install.script.js`)


async function updatePackageJsons():Promise<void>{
    const updates:(string|undefined)[] = await Promise.all(modules.map(async module=>{
        const updated = await ncu.run({
            cwd: module,
            upgrade: true
        })
        const entries = Object.entries(updated as Index<string>)
        if (entries.length === 0) return
        const lines  = entries.map(([module,version])=>`${module} -> ${version}`)
        const output:string =  `
Updates in ${chalk.bold(module)}
${lines.join('\n')}    
`
        console.log(output)
        return output.replace(/\[[0-9]{1,2}m/g,'')
    }))
    const output:string = updates.filter(v=>!!v).join('\n')
    writeFileSync('ncu.log', output)
}