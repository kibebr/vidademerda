const fetch = require('node-fetch'

module.exports = fetch('http://localhost:3002/merdas').then(res => res.json())
