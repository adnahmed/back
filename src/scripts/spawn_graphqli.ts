import { config } from 'dotenv-flow'
config()
import env from '../env'
import spawnCommand from 'spawn-command'
const child = spawnCommand(`gq http://localhost:${env.GQL_PORT} -i`);

child.stdout.on('data', function (data) {
    console.log('data', data.toString());
});

child.on('exit', function (exitCode) {
    console.log('exit', exitCode);
});

child.stderr.on('data', function (error) {
    console.error('error', error.message)
});