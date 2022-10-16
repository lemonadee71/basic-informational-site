const fs = require('fs/promises');
const http = require('http');
const path = require('path');
const express = require('express');

const app = express();
app.use(require('morgan')('dev'));
app.use(express.static('public'));

const getPage = async (url) => {
  const filename = url ? url + '.html' : 'index.html';

  return fs.readFile(path.join('pages', filename), 'utf-8');
};

app.get('/', async (req, res) => res.send(await getPage()));
app.get('/about', async (req, res) => res.send(await getPage('about')));
app.get('/contact', async (req, res) => res.send(await getPage('contact')));
app.use(async (req, res) => res.status(404).send(await getPage('404')));

app.listen(8080, () => console.log('Server is listening to port 8080'));
