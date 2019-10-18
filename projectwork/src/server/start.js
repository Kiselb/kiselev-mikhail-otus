const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload'); //npm install --save express-fileupload
const cors = require('cors'); // npm install cors
const store = require('./store.mssql');
const xlsx = require('./import.xlsx');
const config = require('./config.json');

const app = express();
const port = 80; //3000; //

app.use(express.static(path.join(__dirname + '/b2bx')));
app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

app.get('/orders/active/:userId', function(req, res) {
    store.ordersActive(req.params.userId)
    .then(result => { res.status(200).send(`${JSON.stringify(result.recordset)}`);})
    .catch(error => { res.status(500).send(`{"error": ${error}}`); });
});
app.get('/orders/history/:userId', function(req, res) {
    store.ordersHistory(req.params.userId, req.query.criteria)
    .then(result => { res.status(200).send(`${JSON.stringify(result.recordset)}`);})
    .catch(error => { res.status(500).send(`{"error": ${error}}`); });
});
app.get('/orders/:orderId/details', function(req, res) {
    store.orderDetails(req.params.orderId, req.query.mode)
    .then(result => { res.status(200).send(`${JSON.stringify(result.recordset)}`);})
    .catch(error => { res.status(500).send(`{"error": ${error}}`); });
});
app.get('/orders/:orderId/files', function(req, res) {
    //console.log("Order Files: " + req.params.orderId);
    store.orderFiles(req.params.orderId)
    .then(result => { res.status(200).send(`${JSON.stringify(result.recordset)}`);})
    .catch(error => { res.status(500).send(`{"error": ${error}}`); });
});
app.get('/articles/search/', function(req, res) {
    store.articlesSearch(req.query.userid, req.query.criteria)
    .then(result => { res.status(200).send(`${JSON.stringify(result.recordset)}`);})
    .catch(error => { res.status(500).send(`{"error": ${error}}`); });
});
app.post('/orders/:orderId/details/addnew', function(req, res) {
    store.orderDetailsAddNew(req.params.orderId, req.body.materialId, req.body.quantity)
    .then(result => { console.log(result); res.status(200).send(JSON.stringify(result.output.OrderDetailsID));})
    .catch(error => { res.status(500).send(`{"error": ${error}}`); });
});
app.post('/upload', function(req, res) {
    console.log("File Upload requested");
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
        .then(result => { console.log("File upload completed"); res.status(200).send(`{"value": ${JSON.stringify(result.value)}}`); })
        .catch(error => { res.status(500).send(`{"error": ${error}}`); });
    });
});

app.get('/', function(request, response) {
    console.log(request);
    response.sendFile(path.join(__dirname + '/b2bx/index.html'))
});

app.listen(port, () => console.log(`Listening port ${port}`))
