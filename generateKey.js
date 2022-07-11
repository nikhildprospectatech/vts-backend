
// code snippet to generate secret keys
const crypto = require('crypto');
const CLIENT_SECRET = crypto.randomBytes(32).toString('hex')
const REFRESH_TOKEN = crypto.randomBytes(32).toString('hex')

console.table({CLIENT_SECRET, REFRESH_TOKEN})