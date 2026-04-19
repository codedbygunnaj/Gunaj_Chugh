const mysql=require('mysql2');
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:"Portfolio"
})

db.connect((err)=>{
    if(err){
        console.log("Encountered an error",err);
    }else{
        console.log("mySQL Connected!",);
    }
})

module.exports=db;