const express = require('express');
const cors = require('cors');
const helmet = require('helmet')

const authenticate = require('../auth/authenticate-middleware.js');
const medCabRouter = require('../database/medcab/medcab-router.js');
const authRouter = require('../auth/auth-router.js');
const secureRouter = require('../database/secure/secure-router.js') //currently in here to test login/credential functionality
const strainsapiRouter = require('../strainsapi/strainsapi-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/',medCabRouter)
server.use('/api/auth', authRouter)
server.use('/api/auth/users', authenticate, secureRouter) //only for login/credential test
server.use('/api/auth/strains', strainsapiRouter)

module.exports = server;