const translate = require('@vitalets/google-translate-api');
const express = require('express');
const app = express();
const port = 3000;

const emojiFlags = require('emoji-flags');

let uri = '/';

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use((req, res, next) => {
  uri = req.originalUrl;
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('pages/index', { msg:'', result:'', lang:'en', uri, emojiFlags });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { uri });
});

app.post('/translate', async (req, res) => {
  const { msg, lang } = req.body;
  const result = await translation(msg, lang);
  res.render('pages/index', { msg, result, lang, uri, emojiFlags });
});

function translation(msg, lang) {
  return translate(msg, {to: lang})
    .then(res => {
      // console.log('Originating language is', res.from.language.iso);
      return res.text;
    })
    .catch(err => {
      console.error(err);
  });
}

app.listen(port, () => {
  console.log('Listening on port ', port)
});