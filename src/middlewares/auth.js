const adminAuth = (req, res, next) => {
    console.log("We are in admin auth middleware");
    const token = "xxx"
    const isAuthenticated = token === "xxx";
    if(!isAuthenticated){
          res.status(401).send("Unauthorized")
    }else{
          console.log("Into the Middleware");
         next()
    }
}

module.exports={
    adminAuth
}