'use strict';
const login = require('./auth');
const confs = require('./confs');
const apps = require('./apps');
const users = require('./users');

function sendErrorResposns(error, res) {
    const { message } = error;
    return res.status(403).json({
        message,
        success: false
    })
}
function isAuthorized(req, res, next) {
    const token =  (req.headers.authorization || req.headers.Authorization || '').split('Bearer ').pop(); 
    if (token) {
        return next();
    } else {
    	const error = new Error('Unauthorized Access');
    	return sendErrorResposns(error, res);
    }
}

module.exports = (app)=>{
    app.use('/auth/login', login)
    app.use('/api/*', isAuthorized)
    app.use('/api/apps', apps);
    app.use('/api/authentication', users);
    app.use('/api/confs', confs);
}