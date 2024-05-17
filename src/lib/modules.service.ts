import {runInModule} from "./runInModule.service.js";
import {readdirSync} from "node:fs";
import {log} from "./log.service.js";

const modules:string[] = readdirSync('.', {withFileTypes: true})
    .filter(listing=>listing.isDirectory())
    .map(({name})=>name)
    .filter(name=>name!=='scripts')
    .filter((dir)=>{
        return readdirSync(dir).includes('package.json')
    })

log.info(`List of detected application modules:`, modules.join(', '));

export function runInModulesParallel(command:string):Promise<void[]>{
    const promises:Promise<void>[] = modules.map((module)=>runInModule(module, command))
    return Promise.all(promises)
}

export async function runInModulesSeries(command:string):Promise<void>{
    for (const module of modules){
        await runInModule(module, command)
    }
}