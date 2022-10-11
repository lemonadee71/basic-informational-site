const fs = require('fs/promises');
const http = require('http');
const path = require('path');

const getPage = async (url) => {
  const name = url.replace(/^\//, '');
  const filename = url === '/' ? 'index.html' : name + '.html';

  return await fs.readFile(path.join('pages', filename), 'utf-8');
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/html');

  let page;
  try {
    page = await getPage(req.url);
  } catch (error) {
    res.statusCode = 404;
    res.statusMessage = 'Not found';
    page = await getPage('404');
  }

  res.end(page);
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Server is listening to port 8080');
});
