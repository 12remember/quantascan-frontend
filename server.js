const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

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

// Security - Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Compression
app.use(compression());

// Parse Cookies
app.use(cookieParser());


// Trust Heroku Proxy
app.enable('trust proxy');


// **Force HTTPS & Redirect www → non-www **
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

app.use(
  serveStatic(path.join(__dirname, 'dist'), {
    etag: false, // Disable ETag so browsers don’t compare versions
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  })
);



if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`Serving: ${req.path}`);
    next();
  });
}
// Fallback for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
