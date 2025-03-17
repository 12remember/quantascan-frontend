const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
// Removed rateLimit since it's causing issues
const cookieParser = require('cookie-parser');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Use package version (or timestamp as fallback) for cache busting
const version = process.env.npm_package_version || Date.now();

// Middleware
app.disable('x-powered-by');

app.use(cors());
// Security - Helmet without CSP
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP temporarily
    frameguard: { action: 'deny' },
    referrerPolicy: { policy: 'no-referrer' },
  })
);

// Removed rate limiting middleware

// Compression
app.use(compression());

// Parse Cookies
app.use(cookieParser());

// Trust Heroku Proxy
app.enable('trust proxy');

// Force HTTPS & Redirect www → non-www
app.use((req, res, next) => {
  const host = req.headers.host;
  const protocol = req.headers['x-forwarded-proto'];

  // Redirect HTTP → HTTPS
  if (protocol !== 'https') {
    return res.redirect(301, `https://${host}${req.url}`);
  }

  // Redirect www → non-www (change this if you want www as primary)
  if (host.startsWith('www.')) {
    return res.redirect(301, `https://${host.replace('www.', '')}${req.url}`);
  }

  next();
});

// Serve static files from the 'dist' directory
app.use(
  serveStatic(path.join(__dirname, 'dist'), {
    etag: false, // Disable ETag so browsers don’t compare versions
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        // Always serve a fresh index.html
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      } else if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
        // Cache static assets long-term
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  })
);

// Fallback for SPA with Version Query Parameter added for index.html
app.get('*', (req, res) => {
  // If the request URL doesn't include a version query parameter, redirect with one.
  if (!req.query.v) {
    const separator = req.originalUrl.includes('?') ? '&' : '?';
    return res.redirect(302, req.originalUrl + separator + 'v=' + version);
  }
  // Ensure no caching for index.html
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Log requests in non-production environments
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`Serving: ${req.path}`);
    next();
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
