'use strict';
const request = require('../lib');
const express = require('express');
const config = require('config');
const router = express.Router();

function genRes(data) {
    return data.map( x => {
        return x.name;
    })
}
router.route('/list')
.get((req, res) => {
    const token =  (req.headers.authorization || req.headers.Authorization || '').split('Bearer ').pop();
    request.splunkGet('https://localhost:8089/services/apps/local', token, {})
    .then(result => {
        const appNames = genRes(result.entry);
        // console.log(result)
        res.send(appNames)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

router.route('/:user') // returns the list of apps for given user
.get((req, res) => {
    const token =  (req.headers.authorization || req.headers.Authorization || '').split('Bearer ').pop();
    const { user } = req.params; 
    request.splunkGet(`${config.splunkd}/servicesNS/${user}`, token, {})
    .then(result => {
        // consolelog(result)
        const appNames = genRes(result.entry);
        res.send(appNames);
    })
    .catch(err =>{
        console.log(err);
        res.send(err)
    })
})

router.route('/delete/:appName')
.delete((req, res) => {
    const token =  (req.headers.authorization || req.headers.Authorization || '').split('Bearer ').pop();
    const { appName } = req.params;
    request.splunkDelete(`${config.splunkd}/services/apps/local/${appName}`, token)
    .then(result => {
        console.log(result);
        res.send(result);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
})
module.exports = router;