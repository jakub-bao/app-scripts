/**
 * Deploys `ERB-Processor.zip` to a DHIS2 instance specified in `.env.local`
 */

import {createReadStream} from 'node:fs'
import axios, {AxiosResponse} from 'axios'
import FormData from 'form-data'
import {log} from "../lib/log.service.js";
import {dhisServer} from "../lib/dhisServer.service.js";

const {hostname, auth, username} = dhisServer

async function upload(hostname: string, auth:string):Promise<void>{
    const form = new FormData();
    form.append('file', createReadStream('ERB-Processor.zip'));

    const response:AxiosResponse = await axios.post(`${hostname}api/apps`, form, {
        headers: {
            Authorization: `Basic ${auth}`
        }
    }).catch((err)=>{
        throw new Error(err)
    })
    log.info(`response status ${response.status}`)
}

log.section(`Reading server settings`)
log.info(`Deploying app to ${hostname} as ${username}`)

log.section(`Uploading to server`)
await upload(hostname, auth)
log.success(`Upload successful`)