import {runInModule} from "./runInModule.service.js";
import {readdirSync} from "node:fs";
import {log} from "../log.service.js";
import chalk from "chalk";

export let modules:string[] = readdirSync('.', {withFileTypes: true})
    .filter(listing=>listing.isDirectory())
    .map(({name})=>name)
    .filter(name=>name!=='scripts')
    .filter((dir)=>{
        return readdirSync('./'+dir).includes('package.json')
    })

log.info(`Detected app modules:`, modules.map((m)=>chalk.bold(m)).join(', '));

export function setModules(mdls:string[]) {
    modules = mdls
    log.info(`List of modules has been restricted to:`, modules.map((m)=>chalk.bold(m)).join(', '));
}

if (modules.length===0) throw new Error(`No modules detected or provided`)



export async function runInModulesParallel(command:string):Promise<void>{
    log.info(`🔀 Starting in parallel`)
    const promises:Promise<void>[] = modules.map((module)=>runInModule(module, command))
    await Promise.all(promises)
    log.info(`⏹️ Finishing parallel execution`)
}

export async function runInModulesSeries(command:string):Promise<void>{
    log.info(`⏬  Starting in series`);
    for (const module of modules){
        await runInModule(module, command)
    }
}