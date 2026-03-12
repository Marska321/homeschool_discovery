const https = require('https');

https.get('https://unsplash.com/s/photos/ballroom-dance', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const matches = data.match(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g);
    if(matches) {
      console.log(Array.from(new Set(matches)).slice(0, 5).join('\n'));
    } else {
      console.log("No matches found");
    }
  });
});
