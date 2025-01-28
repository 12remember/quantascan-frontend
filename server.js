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

// Force HTTPS
if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy'); // Enable proxy trust for Heroku
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

app.use(
  serveStatic(path.join(__dirname, 'dist'), {
    etag: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        // Prevent caching for index.html
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      } else if (/\.(js|css|json|png|jpg|svg|woff2?)$/.test(filePath)) {
        // Cache static assets with a long expiration for hashed files
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
