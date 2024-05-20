import {fork} from 'node:child_process'
import prompts, {Choice} from 'prompts'
import chalk from 'chalk'
import {Dirent, readdirSync} from "node:fs"
import {readdir, readFile} from "node:fs/promises"
import {Block, parse, Spec} from 'comment-parser'

type Script = {
    shortName: string;
    description: string;
    path: string;
    order?: number;
}

function cap(s:string):string {
    return s[0].toUpperCase() + s.slice(1)
}

function getTag(tag: string, tags: Spec[]):string|undefined{
    return tags.find(({tag:stag})=>tag===stag)?.name
}

const em = chalk.bold.blue


const scripts:Script[] = await (async function getScripts():Promise<Script[]>{
    const files:Dirent[] = (await Promise.all([
        readdir('scripts/dist/shared/scripts',{withFileTypes: true}),
        readdir('scripts/dist/local/scripts', {withFileTypes: true})
    ])).flat().filter(({name})=>!name.includes('.map'))

    const scripts:Script[] = files.map(({parentPath, name:fileName}:Dirent)=>({
        path: `${parentPath}/${fileName}`,
        description: '',
        shortName: cap(fileName.replace('.script.js',''))
    }))

    return Promise.all(scripts.map(async ({path, shortName})=>{
        const file = await readFile(path).then(b=>b.toString())
        const {description, tags} = parse(file)[0]||{}
        return {
            path,
            shortName,
            description: description&&description.replace(/`(.+?)`/g,`${em('$1')}`),
            order: tags&&parseInt(getTag('order',tags)||'255')}
    }))
})()

console.log(scripts.map(({shortName})=>shortName))

const choices:Choice[] = scripts.map(({shortName: title, path: value, description})=>({
    title,
    value,
    description
}))

const {value: script} = await prompts({
    type: 'select',
    name: 'value',
    message: 'Select action',
    choices
})

if (!script) process.exit()

fork(script)


//
// type OrderedChoice = Choice & {order: number}
//
// const choices:OrderedChoice[] = await getChoices() as OrderedChoice[]
//
// const {value: action} = await prompts({
//     type: 'select',
//     name: 'value',
//     message: 'Select action',
//     choices
// })
//
// if (!action) process.exit()
//
// fork(`scripts/build/scripts/${action}.script.js`)
//
// function getTag(tag: string, tags: Spec[]):string|undefined{
//     return tags.find(({tag:stag})=>tag===stag)?.name
// }
//
// async function getChoices():Promise<Choice[]>{
//     const scripts:Dirent[] = (await Promise.all([
//         readdir('scripts/shared/scripts',{withFileTypes: true}),
//         readdir('scripts/local/scripts',{withFileTypes: true}),
//     ])).flat()
//     const choices:OrderedChoice[] = await Promise.all(scripts.map(async script=>{
//         const value = script.replace(/.script.ts/,'')
//         const title = cap(value)
//         const file = await readFile(`scripts/scripts/${script}`).then(b=>b.toString())
//         const {description: unstyledDescription, tags}:Block = parse(file)[0]
//         const description = unstyledDescription.replace(/`(.+?)`/g,`${em('$1')}`)
//         return {title, value, description, order: parseInt(getTag('order',tags)||'255')}
//     }))
//     return choices.sort(({order: order_a},{order:order_b})=>order_a-order_b)
// }