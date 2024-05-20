import {spawn} from "child_process";
import {moduleLog} from "./moduleLog.service.js";

export function runInModule(module:string, command:string):Promise<void>{
    moduleLog.start(module, command)
    const program:string = command.split(' ')[0]
    const args:string[] = command.split(' ').slice(1, Infinity)
    const task = spawn(program, args, {cwd: process.cwd()+`/${module}`})
    task.stdout.on('data', (data) => {
        moduleLog.stdout(module, command, data.toString())
    });
    task.stderr.on('data', (data) => {
        moduleLog.error(module, command, data.toString())
    });
    return new Promise((resolve, reject)=>{
        task.on('close', (code) => {
            if (code!==0) {
                moduleLog.error(module, command, `Error code ${code}`)
                return reject()
            }
            moduleLog.finish(module, command)
            resolve()
        });
    })
}