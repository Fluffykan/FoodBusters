const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1Wannadie!',
    database: 'mydb'
});

con.connect((error) => {
    if (error) {
        console.error('error connecting to MySQL database', error);
    } else {
        console.log('connected to MySQL database');
    }
})

module.exports = con;