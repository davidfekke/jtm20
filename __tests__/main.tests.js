/* eslint-disable */
'use strict';
const request = require('supertest');
const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
const about = require('../routes/about');
const meetups = require('../routes/meetups');
const tokens = require('../routes/tokens');
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

test('check for meetup events', (done) => {
    request(app)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect('GET', done);
});

test('check for about page', (done) => {
    request(app)
        .get('/about')
        .expect('Content-Type', /text\/html/)
        .expect('GET', done);
});

test('check for groups page', (done) => {
    request(app)
        .get('/groups')
        .expect('Content-Type', /text\/html/)
        .expect('GET', done);
});

test('check for token post', (done) => {
    request(app)
        .post('/token/iostoken', { toke: 'dada9ujda90900a' })
        .expect('Content-Type', /application\/json/)
        .expect(200, done);
});
