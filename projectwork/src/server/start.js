const express = require('express')
const path = require('path')
const app = express()
const port = 80

app.use(express.static(path.join(__dirname + '/b2bx')))
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/b2bx/index.html'))
})

app.listen(port, () => console.log(`Listening port ${port}`))
