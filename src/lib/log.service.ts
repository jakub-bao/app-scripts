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
    console.log(line)
    console.log(getIcon(sectionCount), chalk.bold.green(name))
    sectionCount++
}

function info(...messages:string[]):void{
    console.log('📢', chalk.bold.blue('info'), ...messages)
}

function success(...messages:string[]):void{
    console.log('🏁', chalk.bold.green('success'), ...messages)
}

export const log = {
    section,
    info,
    success
}