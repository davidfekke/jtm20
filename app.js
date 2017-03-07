const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const about = require('./routes/about');
const meetups = require('./routes/meetups');
const tokens = require('./routes/tokens');
app.locals.moment = require('moment');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', meetups.events);
app.get('/groups', meetups.groups);
app.get('/about', about.index);
app.post('/token/iostoken', tokens.addiOSToken);

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});