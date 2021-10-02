const express = require('express')
const db = require('enmap')
const bodyParser = require('body-parser')
const port = 443
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

require('./src/routes')(app, {})
app.listen(port, () => console.log(`Listening on port ${port}`))