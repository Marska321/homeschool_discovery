const https = require('https');

https.get('https://unsplash.com/s/photos/ballroom-dance', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
    if(matches) {
      console.log(matches.slice(0, 5).join('\n'));
    }
  });
});
