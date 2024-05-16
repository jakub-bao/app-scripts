import chalk from 'chalk'

const line = '-'.repeat(process.stdout.columns||20)

let sectionCount = 1

function getIcon(sectionCount:number):string{
    switch (sectionCount){
        case 1: return '❶'
        case 2: return '❷'
        case 3: return '❸'
        case 4: return '❹'
    }
    return sectionCount.toString()
}

function section(name:string){
    console.log('\n')
    console.log(line)
    console.log(getIcon(sectionCount), chalk.bold.green(name))
    sectionCount++
}

function starting(module:string, command: string): void {
    console.log('▶️ ', chalk.blueBright('Starting'),chalk.bold(module),'>',chalk.blueBright(command))
}

function stdout(module:string, command:string, message:string): void {
    if (!message || message.length===0) return
    console.log('\tstdio', chalk.bold(module), chalk.grey(command),chalk.blue(message.trim()))
}

function success(module:string, command:string):void{
    console.log('✅', chalk.blueBright('Finished'),chalk.bold(module),'>',chalk.blueBright(command))
}

function error(module:string, command:string, message:string):void{
    console.log('\t','‼️',chalk.red('stderr'), chalk.bold(module),'>',chalk.blueBright(command), chalk.yellow(message.trim()))
}

function info(message:string):void{
    console.log(message)
}

export const log = {
    starting,
    stdout,
    success,
    section,
    error,
    info
}