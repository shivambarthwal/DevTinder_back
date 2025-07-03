 const express = require('express');


 const app = express();
 const Port = 4000;

 app.use("/user",(req,res)=>{
        res.send("Hello From DevTinder Backend User Route");
 })

 app.use("/test",(req,res)=>{
    res.send("Hello From DevTinder Backend Test Route");
 })

 app.listen(Port,() => { 
        console.log(`Server is running on port ${Port} `);
 }) 