const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const PACKAGED_DIR = path.join(ROOT_DIR, 'PackagedCopy');
const VSIX_BUILDS_DIR = path.join(ROOT_DIR, 'vsixBuilds');

function run() {
    console.log('Starting Build Process...');

    // Ensure vsixBuilds directory exists
    if (!fs.existsSync(VSIX_BUILDS_DIR)) {
        fs.mkdirSync(VSIX_BUILDS_DIR, { recursive: true });
    }

    // Run vsce package (assuming PackagedCopy is already prepared by upgrade.js)
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
