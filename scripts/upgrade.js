const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const PACKAGED_DIR = path.join(ROOT_DIR, 'PackagedCopy');
const IGNORE_FILE = path.join(ROOT_DIR, 'ignore_dnb');

function readIgnores() {
    if (!fs.existsSync(IGNORE_FILE)) return [];
    const content = fs.readFileSync(IGNORE_FILE, 'utf8');
    return content.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith('#'));
}

function copyRecursiveSync(src, dest, ignoreList) {
    const srcName = path.basename(src);
    if (ignoreList.includes(srcName)) {
        return;
    }

    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName), ignoreList);
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

function run() {
    console.log('Running Upgrade Script...');
    const ignoreList = readIgnores();
    
    // Always ignore the destination itself
    if (!ignoreList.includes('PackagedCopy')) {
        ignoreList.push('PackagedCopy');
    }

    if (fs.existsSync(PACKAGED_DIR)) {
        console.log('Clearing old PackagedCopy directory...');
        fs.rmSync(PACKAGED_DIR, { recursive: true, force: true });
    }
    
    fs.mkdirSync(PACKAGED_DIR, { recursive: true });

    console.log('Copying files from dev root to PackagedCopy...');
    fs.readdirSync(ROOT_DIR).forEach(item => {
        const itemPath = path.join(ROOT_DIR, item);
        copyRecursiveSync(itemPath, path.join(PACKAGED_DIR, item), ignoreList);
    });

    // Generate .vscodeignore in PackagedCopy to ignore _dnb files
    const vscodeIgnoreContent = `
*_dnb
.vscodeignore
    `;
    fs.writeFileSync(path.join(PACKAGED_DIR, '.vscodeignore'), vscodeIgnoreContent.trim());
    
    // Create a package.json copy that works
    // In a real scenario you might strip out devDependencies
    
    console.log('Upgrade complete!');
}

run();
