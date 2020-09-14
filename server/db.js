const mysql=require('mysql');
const config=require('./config');
const db=mysql.createConnection({
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.db,
});

db.connect((err)=>{
    if(err)
        throw err;
    else    
        console.log('Database is connected');
})

// let sql='SELECT * FROM patients where patientId=?';
// var id=27891
// let query=db.query(sql,[id],(err,results)=>{
//     if(err)
//         throw err;
//     console.log(results);
//     //console.log(results[0].login_id,results[0].password);
// });

module.exports=db;