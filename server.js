const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const permissionsPolicy = require('permissions-policy')

const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const serveStatic = require('serve-static')
//const cors = require('cors')

const crypto = require("crypto");
const path = require('path')
const app = express()
//const critical = require('critical');


// Security Headers

// Security - disable powered by
app.disable('x-powered-by')

// Security - Header - CSP
if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'staging') {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", ],
        styleSrc: ["'self'", "'unsafe-inline'", ],
        scriptSrc: ["'self'", "https://www.googletagmanager.com", "'unsafe-eval'"],
        frameAncestors: ["'self'", ],
        objectSrc: ["'none'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "analytics.quantascan.io", "https://www.google-analytics.com", "https://api.coingecko.com"],
        manifestSrc: ["'self'"],
        prefetchSrc: ["'self'"],
        //upgradeInsecureRequests: true,
      },

    },
  }))
} else {

  app.use((req, res, next) => {
    res.locals.cspNonce = crypto.randomBytes(16).toString("hex");
    next();
  });

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'", ],
        styleSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
        frameAncestors: ["'self'", ],
        objectSrc: ["'none'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "analytics.quantascan.io", ],
        manifestSrc: ["'self'"],
        prefetchSrc: ["'self'"],

      },
      reportOnly: true,
    })
  );

}


// Security - Header - Permission Policy
app.use(permissionsPolicy({
  features: {
    accelerometer: ['none'],
    ambientLightSensor: ['none'],
    autoplay: ['none'],
    battery: ['none'],
    camera: ['none'],
    displayCapture: ['none'],
    documentDomain: ['none'],
    documentWrite: ['none'],
    encryptedMedia: ['none'],
    executionWhileNotRendered: ['none'],
    executionWhileOutOfViewport: ['none'],
    fontDisplayLateSwap: ['none'],
    fullscreen: ['self'],
    geolocation: ['none'],
    gyroscope: ['none'],
    layoutAnimations: ['none'],
    legacyImageFormats: ['none'],
    loadingFrameDefaultEager: ['none'],
    magnetometer: ['none'],
    microphone: ['none'],
    midi: ['none'],
    navigationOverride: ['none'],
    notifications: ['none'],
    oversizedImages: ['none'],
    payment: ['none'],
    pictureInPicture: ['none'],
    publickeyCredentials: ['none'],
    push: ['none'],
    serial: ['none'],
    speaker: ['none'],
    syncScript: ['none'],
    syncXhr: ['self'],
    unoptimizedImages: ['none'],
    unoptimizedLosslessImages: ['none'],
    unoptimizedLossyImages: ['none'],
    unsizedMedia: ['none'],
    usb: ['none'],
    verticalScroll: ['none'],
    vibrate: ['none'],
    vr: ['none'],
    wakeLock: ['none'],
    xr: ['none'],
    xrSpatialTracking: ['none'],
  }
}))


// Security - Header - CSRF
//const csrfProtection = csrf({
//  cookie: true
//});
//app.use(csrfProtection);
//app.use(function(req, res, next) {
//  res.cookie('XSRF-TOKEN', req.csrfToken());
//  res.locals._csrf = req.csrfToken();
//  next();
//});


//Optimization

//Optimization - Gzip Compress
app.use(compression())

// Optimization - set Cache
let setCache = function(req, res, next) {
  // here you can define period in second, this one is 5 minutes
  const period = 31556926

  // you only want to cache for GET requests
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${period}`)
  } else {
    // for the other requests set strict no caching parameters
    res.set('Cache-control', `no-store`)
  }
  next()
}
app.use(setCache)

// Parse Cookies
app.use(cookieParser());

// Redirect http > https
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers.host === 'qrlnetworkwebsite.herokuapp.com')
      return res.redirect(301, 'https://quantascan.io');
    if (req.headers.host === 'https://www.quantascan.io')
      return res.redirect(301, 'https://quantascan.io');
    if (req.headers['x-forwarded-proto'] !== 'https')
      return res.redirect('https://quantascan.io' + req.url);
    else
      return next();
  } else
    return next();
});

// Serve Static
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// below is important so refresh of page is not resulting in a 404 error
app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})




const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)