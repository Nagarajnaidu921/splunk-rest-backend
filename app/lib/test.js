'use strict';
const request = require('request');
const options = {
    method: 'POST',
    url: url,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Splunk ${token}`
     },
     qs: {'output_mode': 'json'},
    rejectUnauthorized: false
};