const mysql = require('mysql2')
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin#123',
    database:'VRAS_PART_01'
})
connection.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Database connected sucessfully");
    }
})

module.exports = connection