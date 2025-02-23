import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const TIMEOUT = 5000; // 5 seconds timeout

export async function runCode(code: string, language: string, input: string = ''): Promise<string> {
  const tempDir = path.join(__dirname, '../temp');
  const fileId = uuidv4();
  
  try {
    await fs.mkdir(tempDir, { recursive: true });

    switch (language) {
      case 'python':
        return await runPython(code, input, tempDir, fileId);
      case 'java':
        return await runJava(code, input, tempDir, fileId);
      case 'cpp':
        return await runCpp(code, input, tempDir, fileId);
      default:
        throw new Error('Unsupported language');
    }
  } finally {
    // Cleanup temp files
    try {
      const filesToDelete = [
        path.join(tempDir, `${fileId}.py`),
        path.join(tempDir, `${fileId}.java`),
        path.join(tempDir, `${fileId}.cpp`),
        path.join(tempDir, `${fileId}.exe`),
        path.join(tempDir, `${fileId}.class`)
      ];
      await Promise.all(filesToDelete.map(file => fs.unlink(file).catch(() => {})));
    } catch (error) {
      console.error('Error cleaning up temp files:', error);
    }
  }
}

async function runPython(code: string, input: string, tempDir: string, fileId: string): Promise<string> {
  const filePath = path.join(tempDir, `${fileId}.py`);
  await fs.writeFile(filePath, code);
  
  return new Promise((resolve, reject) => {
    const process = exec(`python "${filePath}"`, { timeout: TIMEOUT }, (error, stdout, stderr) => {
      if (error && !stderr.includes('ImportError')) {
        reject(new Error(stderr || error.message));
      } else {
        // Remove any trailing newlines and whitespace
        resolve(stdout.trim());
      }
    });

    if (input) {
      process.stdin?.write(input);
      process.stdin?.end();
    }
  });
}

async function runJava(code: string, input: string, tempDir: string, fileId: string): Promise<string> {
  const filePath = path.join(tempDir, `${fileId}.java`);
  // Make sure the class name matches 'Solution'
  const className = 'Solution';
  const classPattern = /public\s+class\s+\w+/;
  code = code.replace(classPattern, `public class ${className}`);
  
  await fs.writeFile(filePath, code);

  return new Promise((resolve, reject) => {
    exec(`javac "${filePath}"`, { timeout: TIMEOUT }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
        return;
      }

      const process = exec(`java -cp "${tempDir}" ${className}`, { timeout: TIMEOUT }, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr || error.message));
        } else {
          resolve(stdout.trim());
        }
      });

      if (input) {
        process.stdin?.write(input);
        process.stdin?.end();
      }
    });
  });
}

async function runCpp(code: string, input: string, tempDir: string, fileId: string): Promise<string> {
  const filePath = path.join(tempDir, `${fileId}.cpp`);
  const exePath = path.join(tempDir, `${fileId}.exe`);
  await fs.writeFile(filePath, code);

  return new Promise((resolve, reject) => {
    exec(`g++ "${filePath}" -o "${exePath}"`, { timeout: TIMEOUT }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
        return;
      }

      const process = exec(`"${exePath}"`, { timeout: TIMEOUT }, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(stderr || error.message));
        } else {
          resolve(stdout.trim());
        }
      });

      if (input) {
        process.stdin?.write(input);
        process.stdin?.end();
      }
    });
  });
} 