const express = require('express');
const cors=require('cors');
const db=require('./db');

const App = express();
App.use(express.json()); //middleware added
App.use(cors());

App.listen(5000, () => {
    console.log("Server running on port 5000");
});

App.post("/api/contact",(req,res)=>{
    const {name,email,subject,message}=req.body;
    
    const sql=`insert into contacts (name,email,subject,message) values(?,?,?,?)`

    db.query(sql,[name,email,subject,message],(err,result)=>{
        if(err){
            console.log("Caught an error: ",err);
            return res.status(500).send("Error saving data");
        }else{
            console.log("Data inserted:", result);
            res.send("Data saved successfully");
        }
    }); 
});