 const express = require('express');
const ConnectDb = require('./config/database');
const User = require("./models/user")

 const app = express();
 const Port = 4000;

 app.use(express.json());

 
app.post('/signup', async (req,res)=>{

  console.log("REQUEST",req.body);
    const user = new User(req.body)
    // creating a new instance of the user model
    try {
        await user.save();
        console.log("User Created Successfully");
        res.status(201).send("User Created Successfully")
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
   
})

 ConnectDb().then(()=>{
    console.log("Connected to Database");
    app.listen(Port,() => { 
       console.log(`Server is running on port ${Port} `);
})  
}).catch((err)=>{
    console.log(err);
})

