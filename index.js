const translate = require('@vitalets/google-translate-api');
const emojiFlags = require('emoji-flags');
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use((req, res, next) => {
  res.locals.uri = req.originalUrl;
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const { Languages } = require('./config.js');
const languages = new Languages(emojiFlags);

app.get('/', (req, res) => {
  res.render('pages/index', { 
    msg:'', 
    result:'', 
    lang:'en',
    uri: res.locals.uri,
    languages
  });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { uri: res.locals.uri });
});

app.post('/translate', async (req, res) => {
  const { msg, lang } = req.body;
  const result = await translation(msg, lang);
  res.render('pages/index', { 
    msg, 
    result, 
    lang, 
    uri: res.locals.uri,
    languages
  });
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