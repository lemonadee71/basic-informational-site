const fs = require('fs/promises');
const http = require('http');
const path = require('path');

const getPage = async (url) => {
  const name = url.replace(/^\//, '');
  const filename = url === '/' ? 'index.html' : name + '.html';

  try {
    return await fs.readFile(path.join('pages', filename), 'utf-8');
  } catch (err) {
    console.log(err);
    return await fs.readFile(path.join('pages', '404.html'), 'utf-8');
  }
};

const server = http.createServer(async (req, res) => {
  const page = await getPage(req.url);
  res.end(page);
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Server is listening to port 8080');
});
