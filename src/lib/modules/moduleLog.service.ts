import chalk from "chalk";


function start(module:string, command: string): void {
    console.log('▶️', chalk.blueBright('Starting'), chalk.bgBlack(` ▶ ${command} `), chalk.blueBright('in'), chalk.bold(module))
}

function finish(module:string, command:string):void{
    console.log('✅ ', chalk.blueBright('Finished'), chalk.bgBlack(` ▶ ${command} `), chalk.blueBright('in'), chalk.bold(module))
}

function stdout(module:string, command:string, message:string): void {
    if (!message || message.length===0) return
    console.log('\tstdio', chalk.bold(module), chalk.grey(command),chalk.blue(message.trim()))
}

function error(module:string, command:string, message:string):void{
    console.log('\t','‼️',chalk.red('stderr'), chalk.bold(module),'>',chalk.blueBright(command), chalk.yellow(message.trim()))
}


export const moduleLog = {
    start,
    finish,
    error,
    stdout,
}