/**
 * Manoj G portfolio local server.
 * Provides a lightweight, secure file server for the portfolio app.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
};

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

function normalizeRequestPath(rawUrl) {
  const requestUrl = rawUrl || '/';
  const pathname = new URL(requestUrl, 'http://localhost').pathname;

  if (pathname === '/' || pathname === '') {
    return '/index.html';
  }

  if (pathname === '/resume') {
    return '/resume.html';
  }

  return pathname;
}

function resolveSafePath(requestPath) {
  const normalizedPath = requestPath.startsWith('/') ? requestPath.slice(1) : requestPath;
  const candidatePath = path.resolve(ROOT_DIR, normalizedPath);

  if (!candidatePath.startsWith(ROOT_DIR)) {
    throw new Error('Forbidden');
  }

  return candidatePath;
}

function sendHtml(res, statusCode, title, bodyText) {
  const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 4rem 1.5rem; background: #f8fafc; color: #0f172a; }
          .card { max-width: 560px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 2rem; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06); }
          a { color: #0284c7; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>${statusCode}</h1>
          <p>${bodyText}</p>
          <p><a href="/">Return to portfolio</a></p>
        </div>
      </body>
    </html>`;

  res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8', ...SECURITY_HEADERS });
  res.end(html);
}

async function serveFile(res, requestPath, method) {
  let resolvedPath;

  try {
    resolvedPath = resolveSafePath(requestPath);
  } catch (error) {
    sendHtml(res, 403, 'Forbidden', 'Access denied to the requested resource.');
    return;
  }

  let filePathToRead = resolvedPath;

  try {
    const stats = await fs.promises.stat(resolvedPath);
    if (stats.isDirectory()) {
      filePathToRead = path.join(resolvedPath, 'index.html');
    }
  } catch (error) {
    sendHtml(res, 404, 'Not Found', 'The page you requested could not be found.');
    return;
  }

  const ext = path.extname(filePathToRead).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const content = await fs.promises.readFile(filePathToRead);
    const headers = {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, must-revalidate',
      ...SECURITY_HEADERS
    };

    if (method && method.toUpperCase() === 'HEAD') {
      res.writeHead(200, headers);
      res.end();
      return;
    }

    res.writeHead(200, headers);
    res.end(content);
  } catch (error) {
    sendHtml(res, 500, 'Server Error', 'The file could not be loaded.');
  }
}

const server = http.createServer(async (req, res) => {
  const requestPath = normalizeRequestPath(req.url);
  await serveFile(res, requestPath, req.method);
});

server.listen(PORT, () => {
  console.log('=======================================================');
  console.log('🚀 Manoj G Portfolio — Local Node.js Server');
  console.log(`📡 Status: Operational`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`📄 Resume URL: http://localhost:${PORT}/resume.html`);
  console.log('=======================================================');
});
