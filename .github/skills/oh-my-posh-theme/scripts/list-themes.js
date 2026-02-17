const https = require('https');

const options = {
  hostname: 'api.github.com',
  path: '/repos/JanDeDobbeleer/oh-my-posh/contents/themes',
  headers: { 'User-Agent': 'copilot-skill' }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const files = JSON.parse(data);
    const themes = files
      .filter(f => f.name.endsWith('.omp.json'))
      .map(f => f.name.replace('.omp.json', ''));
    themes.forEach(t => console.log(t));
  });
}).on('error', console.error);