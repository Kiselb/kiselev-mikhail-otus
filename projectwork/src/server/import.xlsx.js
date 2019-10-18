const ExcelJS = require('exceljs'); //npm install exceljs
const storeMSSQL = require('./store.mssql');
const config = require('./config.json');

function xls2xml(fileName, orderId, worksheet, sheetName, firstRow, lastRow, columnArticle, columnQuantity) {
    let xml =
    `<?xml version="1.0" encoding="utf-16"?>
        <order>
            <header>
                <orderid>${orderId}</orderid>
                <userid>1</userid>
                <filename>${fileName}</filename>
                <sheetname>${sheetName}</sheetname>
                <firstrow>${firstRow}</firstrow>
                <lastrow>${lastRow}</lastrow>
                <articlecolumn>${columnArticle}</articlecolumn>
                <quantitycolumn>${columnQuantity}</quantitycolumn>
            </header>
            <details>\n`;
    worksheet.eachRow(function(row, rowNumber) {
        xml = xml + `<row><rownumber>${rowNumber}</rownumber>`;
        row.eachCell({includeEmpty: true}, function(cell, colNumber) {
            if (colNumber === +columnArticle) {
                xml = xml + `<partid>${cell.value}</partid>`;
            }
            if (colNumber === +columnQuantity) {
                xml = xml + `<quantity>${cell.value}</quantity>`;
            }
        })
        xml = xml + "</row>\n";
    });
    xml = xml + "</details>\n</order>";
    return xml;
}
exports.registerFileEx = function(fileName, orderId, sheetName, firstRow, lastRow, columnArticle, columnQuantity) {
    return new Promise((resolve, reject) => {
        const workbook = new ExcelJS.Workbook();
        workbook.xlsx.readFile(config.development.dstpath + fileName) //'I:\\USR\\MDB\\Misc\\TEST\\' + fileName)
        .then(workbook => new Promise((resolve, reject) => {
            const worksheet = workbook.getWorksheet(sheetName);
            console.log(`Sheet params:${fileName}, ${orderId}, ${worksheet}, ${sheetName}, ${firstRow}, ${lastRow}, ${columnArticle}, ${columnQuantity}`);
            if (worksheet) {
                resolve(xls2xml(fileName, orderId, worksheet, sheetName, firstRow, lastRow, columnArticle, columnQuantity));
            } else {
                console.log(`Лист '${sheetName}' в файле '${fileName}' не найден`);
                reject(`Лист '${sheetName}' в файле '${fileName}' не найден`);
            }
        }))
        .then(xml => storeMSSQL.registerFile(xml, orderId))
        .then(result => resolve({value: result.value}))
        .catch(error => { console.log(`XLSX Error: ${error}`); return reject(error);});
    });
}
