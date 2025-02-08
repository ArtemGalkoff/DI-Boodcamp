import { readFile, writeFile } from './fileManager.js';

async function run() {
  try {
   
    const helloWorldContent = await readFile('Hello World.txt');
    console.log('Content of file "Hello World.txt":', helloWorldContent);

    const writeMessage = await writeFile('Bye World.txt', 'Writing to the file');
    console.log(writeMessage);  

    const byeWorldContent = await readFile('Bye World.txt');
    console.log('Content of file "Bye World.txt" :', byeWorldContent);

  } catch (err) {
    console.error('Error:', err);
  }
}

run();