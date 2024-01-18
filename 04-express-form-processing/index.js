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

// Step 5: ENABLE FORMS
app.use(express.urlencoded({extended:false}))


//Creating our own handlebar helper, if arg1 is equals to arg2, options.fn(this) will execute if not options.inverse(this) will execute
hbs.handlebars.registerHelper("ifEquals", function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
})

// Add routes here
// How to grab the parameters 
app.get('/hello/:name', (req, res)=>{
let name = req.params.name;
// res = response   
res.send(`Hi, ${name}`)
})

// the fruits route to showcase handlebar helpers
app.get("/fruits", (req,res)=> {
    let favourite = "apples" // variable we can change to trigger the right response
        res.render("fruits", {
        "fruits": ["apples", "bananas", "oranges"],
        "favouriteFruit": favourite
    })
})

// Lab 3 - HBS
app.get('/', (req, res)=>{
    res.render('index.hbs')
})


// Render route for a form
app.get("/add-food", (req, res)=> {
    res.render("add_food")
})

// When the form is submitted this app.post will fire
app.post("/add-food", (req, res)=>{
    const {foodName, calories, tags} = req.body;
    res.render("display_food_summary", {
    foodName,
    calories,
    tags: tags.join(", ")

})


})




// Server started
app.listen(4000, ()=>{
    console.log(`Server has started`)
})