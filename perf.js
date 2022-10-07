// @ts-nocheck
import autocannon from 'autocannon';
import { fileURLToPath } from 'node:url';
import { fork } from 'node:child_process';
import path from 'node:path';

const url = 'http://localhost:3000';
const server = process.argv[2] === 'unsafe' ? 'server-unsafe.js' : 'server.js';
console.log(`Running the server: ${server}`);

const child = fork(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), server), 
  { 
    // If you can't make this crash tune the --max-old-space-size down in MB
    // to a lower value eventually, it will crash when running the unsafe version
    env: {
      'NODE_OPTIONS': '--max-old-space-size=32'
    },
    silent: false 
  }
);

(async () => {
  await stress();
  child.kill();
  process.exit();
})();

function stress() {
  return new Promise((resolve, reject) => {
    const instance = autocannon(
      {
        url,
        connections: 400,
        pipelining: 10,
        duration: 30,
      },
      async (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      },
    );
    autocannon.track(instance, { renderProgressBar: true });
  });
}
