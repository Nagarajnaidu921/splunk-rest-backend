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
router.route('/:user/:app') // returns all configuration file of given user and app
.get((req, res)=>{
    const token =  (req.headers.authorization || req.headers.Authorization || '').split('Bearer ').pop();
    const { user, app } = req.params;
    request.splunkGet(`${config.splunkd}/servicesNS/${user}/${app}/properties`, token, {})
    .then(result => {
        const confNames = result.entry.map(x => {
            return x.name;
        })
        res.send(confNames)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})


router.route('/:user/:app/:filename') // returns all stanzas of give conf file
.get((req, res) => {
    const token =  (req.headers.authorization || req.headers.Authorization || '').split('Bearer ').pop();
    const { user, app, filename } = req.params;
    request.splunkGet(`${config.splunkd}/servicesNS/${user}/${app}/properties/${filename}`, token, {})
    .then(result => {
        const confNames = result.entry.map(x => {
            return x.name;
        })
        res.send(confNames)
    })
    .catch(err => {
        res.status(400).send(err)
    })

}) 

router.route('/:user/:app/:filename/stanza') //get key value pairs of the selected stanza
.get((req, res) => {
    const token =  (req.headers.authorization || req.headers.Authorization || '').split('Bearer ').pop();
    const { user, app, filename} = req.params;
    const stanza = encodeURIComponent(req.query.stanza.replace(/\\\\/gi, '\\'));
    request.splunkGet(`${config.splunkd}/servicesNS/${user}/${app}/properties/${filename}/${stanza}`, token, {})
    .then(result => {
        const stanzaValues = result.entry.map(x => {
            return {
                key: x.name,
                value: x.content
            }
        })
        res.send(stanzaValues)
    })
    .catch(err => {
        res.status(400).send(err)
    })

}) 
.post((req, res) => {
    const token =  (req.headers.authorization || req.headers.Authorization || '').split('Bearer ').pop();
    const { user, app, conf, stanza, data } = req.body;

    const uri = `${config.splunkd}/servicesNS/${user}/${app}/properties/${conf}/${stanza}`;
    console.log(`${config.splunkd}/servicesNS/${user}/${app}/properties/${conf}/${stanza}`)
    request.splunkPost(uri, token, data)
    .then( result => {
        res.send(result);
    })
    .catch(err => {
        res.status(400).send(err);
    })
    
})



module.exports = router;