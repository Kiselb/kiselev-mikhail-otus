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
        }
    });
}
