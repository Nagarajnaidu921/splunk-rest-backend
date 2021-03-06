'use strict';
const request = require('request');

module.exports = (url, token, qs) => {
    console.log(token, qs)
    qs.output_mode= 'json';
    console.log(token, qs)
    const options = {
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Splunk ${token}`
         },
        qs: {'output_mode': 'json'},
        rejectUnauthorized: false
    };
 console.log(options)
    return new Promise((resolve, reject) => {
     request(options, (error, response, body) => {
         if(error) {
             reject(error);
         } else {
             if(JSON.parse(body).entry) {
                 resolve(JSON.parse(body));
             } else {
                 reject(JSON.parse(body).messages[0]);
             }
         }
     })
    })
 
}