const express = require('express');
const cors=require('cors');

const App = express();
App.use(express.json()); //middleware added
App.use(cors());

App.listen(5000, () => {
    console.log("Server running on port 5000");
});

App.post("/api/contact",(req,res)=>{
    let data=req.body;
    console.log("Received Data: ",data);
    //pass to mysql2 and then send response or directly?
    res.send("Data received successfully");
})