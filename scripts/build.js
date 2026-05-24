const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const PACKAGED_DIR = path.join(ROOT_DIR, 'PackagedCopy');
const VSIX_BUILDS_DIR = path.join(ROOT_DIR, 'vsixBuilds');

function run() {
    console.log('Starting Build Process...');

    // 1. Run the upgrade script to sync
    console.log('Syncing files to PackagedCopy...');
    execSync('node scripts/upgrade.js', { stdio: 'inherit', cwd: ROOT_DIR });

    // Ensure vsixBuilds directory exists
    if (!fs.existsSync(VSIX_BUILDS_DIR)) {
        fs.mkdirSync(VSIX_BUILDS_DIR, { recursive: true });
    }

    // 2. Install production dependencies in PackagedCopy
    console.log('Installing dependencies in PackagedCopy...');
    execSync('npm install --production', { stdio: 'inherit', cwd: PACKAGED_DIR });

    // 3. Run vsce package
    console.log('Packaging extension using vsce...');
    try {
        // use local vsce if global isn't available
        execSync('npx vsce package --no-dependencies', { stdio: 'inherit', cwd: PACKAGED_DIR });
        
        // Find the generated vsix file
        const files = fs.readdirSync(PACKAGED_DIR);
        const vsixFile = files.find(f => f.endsWith('.vsix'));
        
        if (vsixFile) {
            const oldPath = path.join(PACKAGED_DIR, vsixFile);
            const newPath = path.join(VSIX_BUILDS_DIR, vsixFile);
            fs.renameSync(oldPath, newPath);
            console.log(`\nSuccess! VSIX built and moved to: ${newPath}`);
        } else {
            console.error('Build failed: .vsix file not found in PackagedCopy.');
        }
    } catch (error) {
        console.error('Packaging failed.', error.message);
    }
}

run();
