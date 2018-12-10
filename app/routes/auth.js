'use strict';
const request = require('request');
const express = require('express');
const config = require('config');
const SplunkLogger = require("splunk-logging").Logger;
const router = express.Router();
// const logconfig = {
//     token: "c6a9ad13-b7d4-47d0-a7f4-0d6ed40c93e4",
//     url: "https://localhost:8100"
// };
// var Logger = new SplunkLogger(logconfig);
function splunkAuthServ( username, password ) {
    const uri = `${config.splunkd}${config.api.auth}`;
    console.log(uri)
   const options = {
       method: 'POST',
       url: uri,
       headers: {'Content-Type': 'application/x-www-form-urlencoded' },
       form: { username, password, output_mode: 'json' },
       rejectUnauthorized: false
   };

   return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
        if(error) {
            reject(error);
        } else {
            // resolve();   
            const result = JSON.parse(body)
            if (result.sessionKey) {
                 resolve(result);   
            } else {
                console.log(result)
                reject(result.messages[0])
            }
        }
    })
   })

}

router.route('/')
.post((req, res) => {
    // console.log(req.body)
    
    const { username, password } = req.body;
    splunkAuthServ(username, password)
    .then(token => {
        // const payload = {
        //     message: {
        //         status: 200,
        //         msg: 'successfully token generated'
        //     }
        // }
        // console.log("Sending payload", payload);
        // Logger.send(payload, function(err, resp, body) {
        //     // If successful, body will be { text: 'Success', code: 0 }
        //     console.log("Response from Splunk", body);
        // });
        res.send(token);

    })
    .catch(err => {
        const payload = {
            message: {
                status: 401,
                msg: 'failed to athenticate'
            }
        }
        console.log("Sending payload", payload);
        Logger.send(payload, function(error, resp, body) {
            // If successful, body will be { text: 'Success', code: 0 }
            console.log("Response from Splunk", body);
        });
        res.status(401).send(err);
    })
})


// var options = { method: 'POST',
//   url: 'https://localhost:8090/services/auth/login',
//   headers: 
//    {'Content-Type': 'application/x-www-form-urlencoded' },
//   form: { username: 'admin', password: 'Rxvch27!@', output_mode: 'json' } ,
//   rejectUnauthorized: false
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// }); 
 

module.exports = router;