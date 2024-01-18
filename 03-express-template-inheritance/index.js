const express = require('express')
// STEP 1: Adding Handlebars  
const hbs = require('hbs')
const app = express()
// Require in wax-on
const wax = require("wax-on")


// STEP 2: SETUP VIEW ENGINE, let express know to use hbs
app.set('view engine', 'hbs')

// Step 3: SETUP STATIC FOLDER
app.use(express.static('public'))

// STEP 4: SETUP WAX ON (FOR TEMPLATE INHERITANCE)
wax.on(hbs.handlebars)
wax.setLayoutPath("./views/layouts")

// Add routes here
// How to grab the parameters 
app.get('/hello/:name', (req, res)=>{
let name = req.params.name;
// res = response   
res.send(`Hi, ${name}`)

})

// Lab 3 - HBS
app.get('/', (req, res)=>{
    res.render('index.hbs')
})


// Server started
app.listen(3000, ()=>{
    console.log(`Server has started`)
})