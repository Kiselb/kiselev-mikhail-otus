const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload'); //npm install --save express-fileupload
const store = require('./store.mssql');
const xlsx = require('./import.xlsx');
const config = require('./config.json');

const app = express();
const port = 3000; //80; //3000; //

app.use(express.static(path.join(__dirname + '/b2bx')))
app.use(fileUpload());

app.get('/orders/active/:userId', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    store.ordersActive(req.params.userId)
    .then(result => { res.status(200).send(`${JSON.stringify(result.recordset)}`);})
    .catch(error => { res.status(500).send(`{"error": ${error}}`); });
});
app.get('/orders/history/:userId', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    store.ordersHistory(req.params.userId, req.query.criteria)
    .then(result => { res.status(200).send(`${JSON.stringify(result.recordset)}`);})
    .catch(error => { res.status(500).send(`{"error": ${error}}`); });
});
app.get('/orders/:orderId/details', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    store.orderDetails(req.params.orderId)
    .then(result => { res.status(200).send(`${JSON.stringify(result.recordset)}`);})
    .catch(error => { res.status(500).send(`{"error": ${error}}`); });
});
app.get('/orders/:orderId/files', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    //console.log("Order Files: " + req.params.orderId);
    store.orderFiles(req.params.orderId)
    .then(result => { res.status(200).send(`${JSON.stringify(result.recordset)}`);})
    .catch(error => { res.status(500).send(`{"error": ${error}}`); });
});
app.get('/articles/search/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    store.articlesSearch(req.query.userid, req.query.criteria)
    .then(result => { res.status(200).send(`${JSON.stringify(result.recordset)}`);})
    .catch(error => { res.status(500).send(`{"error": ${error}}`); });
});
app.post('/orders/:orderId/addnew', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    console.log("Request body: ");
    //console.dir(req);
    console.log(req.body);
    console.log(req.orderId);
    return res.status(200).send('{"OK": "OK"}');
    //store.orderDetailsAddNew(req.params.orderId, req.query.materialid, req.query.quantity)
    //.then(result => { console.log(result); res.status(200).send(`${JSON.stringify(result.output.detailsid)}`);})
    //.catch(error => { res.status(500).send(`{"error": ${error}}`); });
});
app.post('/upload', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    console.log("Upload requested");
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded');
    }
    req.files.file.mv(config.development.dstpath + req.files.file.name, function(error) {
        if (error) {
            return res.status(500).send(`{ "error": ${error} }`);
        }
        if (!((req.body.orderid) && (req.body.sheetname) && (req.body.firstrow) && (req.body.lastrow) && (req.body.columnarticle) && (req.body.columnquantity))) {
            return res.status(400).send(`{ "error": "Не заданы обязательные параметры импорта файла" }`);
        }
        xlsx.registerFileEx(req.files.file.name, req.body.orderid, req.body.sheetname, req.body.firstrow, req.body.lastrow, req.body.columnarticle, req.body.columnquantity)
        .then(result => { console.log("File uploaded"); res.status(200).send(`{"value": ${JSON.stringify(result.value)}}`); })
        .catch(error => { res.status(500).send(`{"error": ${error}}`); });
    });
});

app.get('/', function(request, response) {
    console.log(request);
    response.sendFile(path.join(__dirname + '/b2bx/index.html'))
});

app.listen(port, () => console.log(`Listening port ${port}`))
