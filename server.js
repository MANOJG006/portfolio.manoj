/**
 * MANOJ G — PORTFOLIO LOCAL NODE.JS SERVER
 * Pure Node.js / MERN Stack HTTP Server
 * Serving on http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Parse URL & normalize path
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  } else if (reqPath === '/resume') {
    reqPath = '/resume.html';
  }

  // Prevent directory traversal attacks
  const safePath = path.normalize(path.join(ROOT_DIR, reqPath));
  if (!safePath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head><title>404 Not Found</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 4rem;">
          <h2>404 - File Not Found</h2>
          <p><a href="/" style="color: #0284c7;">Return to Portfolio Home</a></p>
        </body>
        </html>
      `);
      return;
    }

    let filePathToRead = safePath;
    if (stats.isDirectory()) {
      filePathToRead = path.join(safePath, 'index.html');
    }

    const ext = path.extname(filePathToRead).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePathToRead, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, must-revalidate'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Manoj G Portfolio — Local Node.js / MERN Server`);
  console.log(`📡 Status: Operational`);
  console.log(`🌐 Local URL:   http://localhost:${PORT}`);
  console.log(`📄 Resume URL:  http://localhost:${PORT}/resume.html`);
  console.log(`=======================================================`);
});
