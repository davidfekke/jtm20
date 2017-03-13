const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const about = require('./routes/about');
const meetups = require('./routes/meetups');
const tokens = require('./routes/tokens');
const refresh = require('./services/refreshcache');
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

// Set a job to reset cache every 15 minutes
setImmediate(refresh);
setInterval(() => {
  console.log('Refreshing cache'); 
  refresh();
}, 60 * 60 * 1000);

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});