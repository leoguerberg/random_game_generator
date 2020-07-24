const util = require('util')
const mysql = require('mysql')
const dbInitializer = require('./helpers/dbInitializer')


var pool = mysql.createPool({
    connectionLimit: 50,
    host:'localhost',
    user:'root',
    database:'psh_app_db'
})

pool.getConnection((err, connection) => {
    const init = new dbInitializer(pool);
    init.intializePlayers(10);

    if (err) {
        switch(err.code){
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('Database connection was closed.')
                throw err;
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('Database has too many connections.')
                throw err;
                break;
            case 'ECONNREFUSED':
                console.error('Database connection was refused.')
                throw err;
                break;
            default:
                console.error('Error connecting to database')
                throw err;
                break;
        }
        
    }
    if (connection) connection.release()
    return
})

pool.query = util.promisify(pool.query)
module.exports = pool
