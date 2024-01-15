const express = require('express')
const app = express()

// add routes here
app.get("/", (req, res)=> {
    res.send("<h1>Hello from Express</h1>")
})


// Run server here

app.listen(7000, ()=>{
    console.log("Server has started")
})