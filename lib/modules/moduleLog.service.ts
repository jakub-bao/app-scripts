import chalk from "chalk";

const {
    bold,
    bgBlack,

    red,
    yellow,
    blue,
    blueBright,
    grey,

} = chalk

function formatCommand(module:string, command:string):string{
    return `${bgBlack(`| ▶ ${command.replace(/ --.+$/,'')} |`)} ${blueBright('in')} ${bold(module)}`
}

function start(module:string, command: string): void {
    console.log('▶️', blueBright('Starting'), formatCommand(module, command))
}

function finish(module:string, command:string):void{
    console.log('✅', blueBright('Finished'), formatCommand(module, command))
}

let lastMessage:string

function stdout(module:string, command:string, message:string): void {
    if (!message || message.length===0) return
    if (lastMessage!==`${module}${command}`) console.log(bold('stdio'), formatCommand(module, command))
    lastMessage = `${module}${command}`
    console.log(grey(message.trim()))
}

function error(module:string, command:string, message:string):void{
    if (!message || message.length===0) return
    if (lastMessage!==`error${module}${command}`) console.log('‼️',red('stderr'), formatCommand(module, command))
    lastMessage = `error${module}${command}`
    console.log(red(message.trim()))
}

export const moduleLog = {
    start,
    finish,
    error,
    stdout,
}
