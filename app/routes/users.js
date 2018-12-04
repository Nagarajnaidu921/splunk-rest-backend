'use strict';
const request = require('../lib');
const express = require('express');
const config = require('config');
const router = express.Router();

router.route('/users')
.get((req, res) => {
    const token =  (req.headers.authorization || req.headers.Authorization || '').split('Bearer ').pop();
    // res.send(`${config.splunkd}${config.api.users} \n ${token}`);
    
    // request.splunkGet(`${config.splunkd}${config.api.users}`, token, {})
    // .then(result => {
    //     res.send(result)
    // })
    request.splunkGet(`${config.splunkd}${config.api.users}`, token, {})
    .then(result => {
        const userNames = result.entry.map( x => {
            return x.name;
        });
        userNames.push('nobody')
        res.send(userNames);
    })
    .catch(err => {
        res.send(err)
    })
    
})

module.exports = router;