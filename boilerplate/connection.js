const mysql = require("mysql");
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pass@123",
    database: "employees",
    port: "3306",
    multipleStatements: true,
    useConnectionPooling: true,
    schema: {
        tableName: 'session',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

mysqlConnection.connect((error) => {
    if (!error) {
        console.log("Connected");
    } else {
        console.log(error);
    }
});


module.exports = mysqlConnection;