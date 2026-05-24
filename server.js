const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

// Serve static frontend files (will be built by Vite later)
app.use(express.static(path.join(__dirname, 'public')));

// API Route to fetch Salesforce orgs
app.get('/api/orgs', (req, res) => {
    // sf org list --all --json gets all orgs including expired ones
    exec('sf org list --all --json', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing sf org list: ${error.message}`);
            // Fallback for demo purposes if SF CLI is not installed
            return res.json({
                status: 0,
                result: {
                    nonScratchOrgs: [
                        { alias: 'Production', username: 'admin@prod.com' },
                        { alias: 'UAT Sandbox', username: 'dev@uat.com' }
                    ],
                    scratchOrgs: [
                        { alias: 'Dev-Scratch', username: 'test-wlkj@example.com' }
                    ]
                }
            });
        }
        
        try {
            const data = JSON.parse(stdout);
            res.json(data);
        } catch (e) {
            res.status(500).json({ error: 'Failed to parse SF CLI output' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Hyrule Express server running on port ${PORT}`);
    // Notify VS Code Extension Host that we are ready
    if (process.send) {
        process.send('SERVER_READY');
    }
});
