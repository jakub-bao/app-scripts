import { fork } from "node:child_process";
const action = process.argv[2];
fork(`${import.meta.dirname}/../scripts/${action}.script.js`);
