'use strict';
const express = require('express');
const config = require('config');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// console.log(config.get('splunkRestApi'))
require('./app/routes')(app);
app.listen(3000, ()=>{console.log('running at 3000')})