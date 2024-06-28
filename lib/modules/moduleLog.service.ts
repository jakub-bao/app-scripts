import chalk from "chalk";

const {
    white,
    bold,
    bgBlack,
    red,
    blueBright,
    grey,
} = chalk

const strong = white.bold
const blue = blueBright
const code = bgBlack.white

declare global {
    interface String {
        format: ()=>string
    }
}

String.prototype.format = function (){
    return this
        .replace(/<i>(.+?)<\/i>/g, blue('$1'))
        .replace(/<b>(.+?)<\/b>/g, strong('$1'))
        .replace(/<code>(.+?)<\/code>/g, code('| ▶ $1 |'))
}

function log(...parts:string[]):void{
    console.log(...parts.map(p=>p.format()))
}

function formatCommand(module:string, command:string):string{
    const readableCommand = command.replace(/ --.+$/,'')
    return `<code>${readableCommand}</code> <i>in</i> <b>${module}</b>`
}

function start(module:string, command: string): void {
    log(`▶️ <i>Starting</i> ${formatCommand(module, command)}`)
}

function finish(module:string, command:string):void{
    log(`✅<i>Finished</i> ${formatCommand(module, command)}`)
}

let lastMessage:string

function stdout(module:string, command:string, message:string): void {
    if (!message || message.length===0) return
    if (lastMessage!==`${module}${command}`) log(`<b>stdio</b> ${formatCommand(module, command)}`)
    lastMessage = `${module}${command}`
    log(grey(message.trim()))
}

function error(module:string, command:string, message:string):void{
    if (!message || message.length===0) return
    if (message.startsWith('To github.com')) return stdout(module, command, message)
    if (lastMessage!==`error${module}${command}`) log('‼️',red('stderr'), formatCommand(module, command))
    lastMessage = `error${module}${command}`
    log(red(message.trim()))
}

export const moduleLog = {
    start,
    finish,
    error,
    stdout,
}
