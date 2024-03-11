const express = require ('express');
const bodyParser = require('body-parser');


const app= express();
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const routes = require('./routes/routes.js')(app, fs);

const mysql = require('mariadb');

// Thông tin kết nối đến MariaDB
const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'thuctap',
    connectionLimit: 5,
    port: 3309
});

// Kết nối đến cơ sở dữ liệu MariaDB
app.get('/db', async (req, res) => {
    const connection = await conn.getConnection();
    const results = await connection.query('SELECT * FROM tbl_product');
    res.send(results);
})


// app.get('/db',(req,res)=>{
//     connection.connect(function(err) {
//         if (err) {
//             console.error('Lỗi kết nối:', err.stack);
//             return;
//         }
//     });
//     connection.query('SELECT * FROM tbl_product', function (error, results, fields) {

//     });
// });



const server = app.listen(3001, ()=>{
    console.log('listening on port %s...', server.address().port);
});






