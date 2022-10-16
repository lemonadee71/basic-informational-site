const path = require('path');
const express = require('express');

const app = express();
app.use(require('morgan')('dev'));
app.use(express.static('public'));

const file = (filename) => path.join(__dirname, 'pages', filename);

app.get('/', (req, res) => res.sendFile(file('index.html')));
app.get('/about', (req, res) => res.sendFile(file('about.html')));
app.get('/contact', (req, res) => res.sendFile(file('contact.html')));
app.use((req, res) => res.status(404).sendFile(file('404.html')));

app.listen(8080, () => console.log('Server is listening to port 8080'));
