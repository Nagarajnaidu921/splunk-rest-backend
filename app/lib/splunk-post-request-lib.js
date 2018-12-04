const request = require('request');

module.exports = (url, token, data) => {
    // data.output_mode= 'json';
    const options = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Splunk ${token}`
         },
         qs: {'output_mode': 'json'},
        rejectUnauthorized: false,
        form: data
    };
 
    return new Promise((resolve, reject) => {
     request(options, (error, response, body) => {
         if(error) {
             reject(error);
         } else {
             resolve(JSON.parse(body));
         }
     })
    })
 
}