const vscode = require('vscode');
const { fork } = require('child_process');
const path = require('path');

let serverProcess = null;
let outputChannel = null;

function activate(context) {
    outputChannel = vscode.window.createOutputChannel('Hyrule');
    outputChannel.show(true);
    outputChannel.appendLine(`[${new Date().toISOString()}] Hyrule is activating...`);

    const launchCommand = vscode.commands.registerCommand('hyrule.launch', async () => {
        try {
            await launchHyrule(context);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to launch Hyrule: ${error.message}`);
        }
    });

    context.subscriptions.push(launchCommand);

    context.subscriptions.push({
        dispose: () => {
            if (serverProcess) {
                serverProcess.kill();
            }
        }
    });
}

async function launchHyrule(context) {
    if (serverProcess && !serverProcess.killed) {
        outputChannel.appendLine('Stopping existing Hyrule server process...');
        serverProcess.kill();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    const serverPath = path.join(context.extensionPath, 'server.js');
    outputChannel.appendLine(`Forking Node process for server at: ${serverPath}`);

    // fork uses the exact same Node.js executable that VS Code runs on.
    serverProcess = fork(serverPath, [], {
        cwd: context.extensionPath,
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    });

    serverProcess.stdout.on('data', (data) => {
        outputChannel.appendLine(`[SERVER]: ${data.toString().trim()}`);
    });

    serverProcess.stderr.on('data', (data) => {
        outputChannel.appendLine(`[SERVER ERROR]: ${data.toString().trim()}`);
    });

    serverProcess.on('message', (msg) => {
        if (msg === 'SERVER_READY') {
            vscode.window.showInformationMessage('Hyrule Server Started!');
            vscode.env.openExternal(vscode.Uri.parse('http://localhost:3030'));
        }
    });

    serverProcess.on('error', (err) => {
        outputChannel.appendLine(`[PROCESS ERROR]: ${err.message}`);
    });
}

function deactivate() {
    if (serverProcess) {
        serverProcess.kill();
    }
}

module.exports = {
    activate,
    deactivate
};
