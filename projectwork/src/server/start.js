const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload'); //npm install --save express-fileupload
const ExcelJS = require('exceljs'); //npm install exceljs

const mssql = require('mssql'); //npm install mssql
const mssql_config = { //'mssql://webuser:wup@ssw0rd@nacer/aspb'
    server: "nacer",
    authentication: { options: { userName: "webuser", password: "wup@ssw0rd" }},
    options: { database: "aspb", useUTC: false } 
};
const app = express()
const port = 3000; //80

async function loadSheet(xml) {
    try {
        const pool = await new mssql.ConnectionPool(mssql_config).connect();
        const request = await new mssql.Request(pool);

        request.input('xml', mssql.Xml, xml);
        request.output('fileid', mssql.Int, 0);
        const result = await request.execute('B2BX_FileRegister');
console.dir(result);
        return result.recordset;
    }
    catch(error) {
        console.log('Error: ' + error);
    }
}
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
    //console.dir(req);
    file.mv('I:\\USR\\MDB\\Misc\\TEST\\' + file.name, function(error) {
        if (error) {
            return res.status(500).send(`{ "error": ${error} }`);
        }
        console.log("Load workbook");
        var workbook = new ExcelJS.Workbook();
        var xml =`<?xml version="1.0" encoding="utf-16"?>
            <order>
                <header>
                    <orderid>0</orderid>
                    <userid>1</userid>
                    <filename>${file.name}</filename>
                    <sheetname>${req.body.sheetname}</sheetname>
                    <firstrow>${req.body.firstrow}</firstrow>
                    <lastrow>${req.body.lastrow}</lastrow>
                    <articlecolumn>${req.body.columnarticle}</articlecolumn>
                    <quantitycolumn>${req.body.columnquantity}</quantitycolumn>
                </header>
                <details>\n`;
        workbook.xlsx.readFile('I:\\USR\\MDB\\Misc\\TEST\\' + file.name)
            .then(function() {
                const worksheet = workbook.getWorksheet('Лист1');
                if (worksheet) {
                    worksheet.eachRow(function(row, rowNumber) {
                        let xml_row = `<rownumber>${rowNumber}</rownumber>`;
                        row.eachCell({includeEmpty: true}, function(cell, colNumber) {
                            if (colNumber === +req.body.columnarticle) {
                                xml_row = xml_row + `<partid>${cell.value}</partid>`;
                            }
                            if (colNumber === +req.body.columnquantity) {
                                xml_row = xml_row + `<quantity>${cell.value}</quantity>`;
                            }
                        })
                        // Library bug compensation. Method row.eachCell is not called for last in row empty cell. Option includeEmpty is set
                        if (xml_row.indexOf("<partid>") < 0) { xml_row = "<partid>null</partid>" + xml_row;  }
                        if (xml_row.indexOf("<quantity>") < 0) { xml_row = xml_row + "<quantity>null</quantity>";  }
                        xml = xml + "<row>" + xml_row + "</row>\n";
                    });
                } else {
                    return res.status(400).send(`{ "error": "Указанный лист отсутствует в файле" }`);
                }
                xml = xml + "</details>\n</order>"
                console.log(xml);
                loadSheet(xml);
                res.status(200).send('{ "status": "OK" }');
            },
            function(error) {
                return res.status(500).send(`{ "error": ${error} }`);
            })
    });
});

app.get('/', function(request, response) {
    console.log(request);
    response.sendFile(path.join(__dirname + '/b2bx/index.html'))
});

app.listen(port, () => console.log(`Listening port ${port}`))
