import { Aeon } from '@aeon-state-examples/aeon-utils';
import * as admin from 'firebase-admin';
import { spawn } from 'child_process';

admin.initializeApp({ projectId: 'aeons' });

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
  console.log('Seeding users...');
  const zack = await createUser('zack@derose.com');
  const beeman = await createUser('bram@beeman.com');
  console.log('Users seeded.');
  console.log('Seeding aeons...');
  const testAeon: Aeon = {
    name: 'test',
    types: ['fire', 'holy'],
    attack: 100,
    defense: 60,
    health: 200,
    ownerId: zack.uid,
  };
  await createAeon(testAeon);
  console.log('Aeons seeded.');
  console.log('');
  console.log('All set!!');
  console.log('Run `nx serve` in another terminal to serve the client.');
  console.log('Cancel this process at any time to stop emulators.');
}

function main() {
  console.log('Starting emulators...');
  const emulatorsStart = spawn('firebase', [
    'emulators:start',
    '--project=aeons',
  ]);
  emulatorsStart.stdout.on('data', (data) => {
    if (data.includes('Emulator Hub running at')) {
      console.log('Emulators running.');
      seed();
    }
  });
}

main();
