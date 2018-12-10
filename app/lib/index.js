'use strict';
const splunkGet = require('./splunk-get-request-lib');
const splunkPost = require('./splunk-post-request-lib');
const splunkDelete = require('./splunk-delete-request-lib');
module.exports = {
    splunkGet,
    splunkPost,
    splunkDelete
}