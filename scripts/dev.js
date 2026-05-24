const { spawn } = require('child_process');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const FRONTEND_DIR = path.join(ROOT_DIR, 'frontend');

console.log('Starting Hyrule Dev Environment...');

// Start Express Server
const serverProcess = spawn('node', ['server.js'], {
    cwd: ROOT_DIR,
    stdio: 'inherit',
    shell: true
});

// Start Vite Frontend
const viteProcess = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], {
    cwd: FRONTEND_DIR,
    stdio: 'inherit',
    shell: true
});

process.on('SIGINT', () => {
    serverProcess.kill();
    viteProcess.kill();
    process.exit();
});
