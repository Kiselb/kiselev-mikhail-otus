const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload');
const app = express()
const port = 3000; //80

app.use(express.static(path.join(__dirname + '/b2bx')))
app.use(fileUpload());

app.get('/upload', function(req, res) {
    console.log('Get Upload')
    res.status(200).send('File uploaded');
});
app.post('/upload', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded');
    }
    let file = req.files.file;

    file.mv('I:\\USR\\MDB\\Misc\\' + file.name, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send('{ "Status": "OK" }');
    });
});

app.get('/', function(request, response) {
    console.log(request);
    response.sendFile(path.join(__dirname + '/b2bx/index.html'))
});

app.listen(port, () => console.log(`Listening port ${port}`))
