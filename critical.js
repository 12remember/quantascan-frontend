
const critical = require('critical');

critical.generate({
  base: 'dist/', // Adjusted for Vue CLI output
  src: 'index.html',
  target: {
    html: 'index.html',
  },
  css: ['src/theme/app.css'], // Update path to match Vue CLI's output
  inline: true,
  dimensions: [
    {
      height: 500,
      width: 300,
    },
    {
      height: 720,
      width: 1280,
    },
  ],
}, (err, output) => {
  if (err) {
    console.error('Critical CSS generation failed:', err);
  } else {
    console.log('Generated and inlined critical CSS successfully!');
  }
});
