import { Aeon } from '@aeon-state-examples/aeon-utils';
import * as admin from 'firebase-admin';
import { spawn } from 'child_process';

admin.initializeApp({ projectId: 'aeons' });
console.log(process.env);

async function createUser(email: string): Promise<admin.auth.UserRecord> {
  try {
    return await admin.auth().createUser({
      email,
      password: 'password1',
    });
  } catch (e) {
    console.log(e);
  }
}

async function createAeon(aeon: Aeon) {
  const aeonRef = await admin
    .firestore()
    .collection('aeons')
    .doc(aeon.name)
    .set(aeon);
}

async function seed() {
  console.log('in main');
  const zack = await createUser('zack@derose.com');
  console.log(zack);
  const beeman = await createUser('bram@beeman.com');
  const testAeon: Aeon = {
    name: 'test',
    types: ['fire', 'holy'],
    attack: 100,
    defense: 60,
    health: 200,
    ownerId: zack.uid,
  };
  await createAeon(testAeon);
}

function main() {
  const emulatorsStart = spawn('firebase', [
    'emulators:start',
    '--project=aeons',
  ]);
  emulatorsStart.stdout.on('data', (data) => {
    // console.log(`stdout: ${data}`);
    if (data.includes('Emulator Hub running at')) {
      seed();
    }
  });
}

main();
