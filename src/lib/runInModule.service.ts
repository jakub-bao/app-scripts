import {spawn} from "child_process";
import {log} from "./log.service.js";

export function runInModule(module:string, command:string):Promise<void>{
    log.starting(module, command)
    const program:string = command.split(' ')[0]
    const args:string[] = command.split(' ').slice(1, Infinity)
    const task = spawn(program, args, {cwd: process.cwd()+`/${module}`})
    task.stdout.on('data', (data) => {
        log.stdout(module, command, data.toString());
    });
    task.stderr.on('data', (data) => {
        log.error(module, command, data.toString())
    });
    return new Promise((resolve, reject)=>{
        task.on('close', (code) => {
            if (code!==0) {
                log.error(module, command, `Error code ${code}`)
                return reject()
            }
            log.success(module, command)
            resolve()
        });
    })
}