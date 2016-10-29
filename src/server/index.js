require('babel-register');
process.env = JSON.parse(JSON.stringify(process.env));
require('./app');
