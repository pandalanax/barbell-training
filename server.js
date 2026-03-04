const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || __dirname;

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const HISTORY_FILE = path.join(DATA_DIR, 'history.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');

const DEFAULT_SETTINGS = {
  plates: [10, 5, 2.5, 2.5, 1.25],
  restTimer: 180,
  exercises: {
    squat: { startingWeight: 20, progression: 5 },
    press: { startingWeight: 10, progression: 2.5 },
    deadlift: { startingWeight: 30, progression: 5 }
  }
};

const DEFAULT_PROGRESS = {
  squat: { weight: 20 },
  press: { weight: 10 },
  deadlift: { weight: 30 }
};

// Ensure data files exist
if (!fs.existsSync(HISTORY_FILE)) {
  fs.writeFileSync(HISTORY_FILE, '[]');
}
if (!fs.existsSync(SETTINGS_FILE)) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
}
if (!fs.existsSync(PROGRESS_FILE)) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(DEFAULT_PROGRESS, null, 2));
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  // API endpoints
  if (req.url === '/api/history') {
    if (req.method === 'GET') {
      // Read history from file
      fs.readFile(HISTORY_FILE, 'utf8', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data || '[]');
      });
      return;
    }

    if (req.method === 'POST') {
      // Write history to file
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        fs.writeFile(HISTORY_FILE, body, err => {
          res.writeHead(err ? 500 : 200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: !err }));
        });
      });
      return;
    }
  }

  // Settings API
  if (req.url === '/api/settings') {
    if (req.method === 'GET') {
      fs.readFile(SETTINGS_FILE, 'utf8', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data || JSON.stringify(DEFAULT_SETTINGS));
      });
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        fs.writeFile(SETTINGS_FILE, body, err => {
          res.writeHead(err ? 500 : 200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: !err }));
        });
      });
      return;
    }
  }

  // Progress API
  if (req.url === '/api/progress') {
    if (req.method === 'GET') {
      fs.readFile(PROGRESS_FILE, 'utf8', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data || JSON.stringify(DEFAULT_PROGRESS));
      });
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        fs.writeFile(PROGRESS_FILE, body, err => {
          res.writeHead(err ? 500 : 200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: !err }));
        });
      });
      return;
    }
  }

  // Serve static files
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Barbell Training app running at http://localhost:${PORT}`);
});
