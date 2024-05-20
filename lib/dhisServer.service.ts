import {readFileSync} from "node:fs";

type Map<T> = {
    [key: string]: T
}

export type ServerInfo = {
    hostname: string;
    username: string;
    auth: string;
}

type EnvProp = 'VITE_DHIS_URL'|'VITE_DHIS_AUTH'

function parseServerInfo():ServerInfo{
    const serverInfo: Map<string> = {}
    readFileSync('.env.local').toString().trim().split('\n').forEach(line => {
        const property:EnvProp = line.replace(/=.*$/, '') as EnvProp
        const value = line.replace(/^.+?=/, '')
        switch (property){
            case 'VITE_DHIS_AUTH':
                serverInfo.auth = value
                serverInfo.username = atob(value).split(':')[0]
            break;
            case 'VITE_DHIS_URL':
                serverInfo.hostname = value
            break;
        }
    })
    return serverInfo as ServerInfo
}

export const dhisServer = parseServerInfo()