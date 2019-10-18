const mssql = require('mssql'); //npm install mssql
const config = require('./config.json'); //'mssql://webuser:wup@ssw0rd@nacer/aspb'

exports.registerFile = function(xml, orderId) {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await new mssql.ConnectionPool(config.development.mssql_config).connect();
            const request = await new mssql.Request(pool);

            request.input('xml', mssql.Xml, xml);
            request.output('fileid', mssql.Int, 0);
            request.output('orderid', mssql.Int, 0);
            const result = await request.execute('B2BX_FileRegister');
            resolve({value: {orderId: result.output.orderid, fileId: result.output.fileid}});
        }
        catch(error) {
            reject(error);
            console.log(`Error: ${error}`)
        }
    });
}
exports.orderFiles = function(orderId) {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await new mssql.ConnectionPool(config.development.mssql_config).connect();
            const request = await new mssql.Request(pool);

            request.input('OrderID', mssql.Int, orderId);
            const result = await request.execute('B2BX_OrderFiles');

            //console.log("Order Files: " + orderId);
            //console.dir(result);
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
}
exports.orderDetails = function(orderId) {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await new mssql.ConnectionPool(config.development.mssql_config).connect();
            const request = await new mssql.Request(pool);

            request.input('UserID', mssql.Int, 1);
            request.input('OrderID', mssql.Int, orderId);
            const result = await request.execute('B2BX_OrderDetails');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
}
exports.orderDetailsAddNew = function(orderId, articleId, quantity) {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await new mssql.ConnectionPool(config.development.mssql_config).connect();
            const request = await new mssql.Request(pool);

            request.input('UserID', mssql.Int, 1);
            request.input('OrderID', mssql.Int, orderId);
            request.input('ArticleID', mssql.Int, articleId);
            request.input('Quantity', mssql.Int, quantity);
            request.output('OrderDetailsID', mssql.Int, 0);
            const result = await request.execute('B2BX_OrderDetailsAddNew');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
}
exports.ordersHistory = function(userId, criteria) {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await new mssql.ConnectionPool(config.development.mssql_config).connect();
            const request = await new mssql.Request(pool);

            request.input('UserID', mssql.Int, userId);
            if (criteria) {
                request.input('Criteria', mssql.NChar, criteria);
            }
            const result = await request.execute('B2BX_OrdersHistory');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
}
exports.ordersActive = function(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await new mssql.ConnectionPool(config.development.mssql_config).connect();
            const request = await new mssql.Request(pool);

            request.input('UserID', mssql.Int, userId);
            const result = await request.execute('B2BX_OrdersActive');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
}
exports.articlesSearch = function(userId, criteria) {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await new mssql.ConnectionPool(config.development.mssql_config).connect();
            const request = await new mssql.Request(pool);

            request.input('UserID', mssql.Int, userId);
            request.input('Criteria', mssql.NChar, criteria);
            const result = await request.execute('B2BX_ArticlesSearch');
            resolve(result);
        }
        catch(error) {
            reject(error);
        }
    });
}
