const fs = require('fs/promises');
const http = require('http');
const path = require('path');

const getPage = async (url) => {
  const filename = url === '' ? 'index.html' : url + '.html';

  return fs.readFile(path.join('pages', filename), 'utf-8');
};

const getJs = async (url) => fs.readFile(url, 'utf-8');

const server = http.createServer(async (req, res) => {
  console.log(req.url);
  const url = req.url.slice(1);

  if (url.endsWith('.js')) {
    res.setHeader('Content-Type', 'text/javascript');
    res.end(await getJs(url));
  } else {
    res.setHeader('Content-Type', 'text/html');

    let page;
    try {
      page = await getPage(url);
    } catch (error) {
      res.statusCode = 404;
      res.statusMessage = 'Not found';
      page = await getPage('404');
    }

    res.end(page);
  }
});

server.listen(8080, '127.0.0.1', () => {
  console.log('Server is listening to port 8080');
});
