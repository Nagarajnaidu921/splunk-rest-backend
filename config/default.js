'use strict';
const config = {
    splunkd: 'https://localhost:8089',
    api: {
        auth: '/services/auth/login',
        allUsers: '/services/authentication',
        users: '/services/authentication/users'
    }
}

module.exports = config;