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
app.use(express.urlencoded({ extended: false }))


//Creating our own handlebar helper, if arg1 is equals to arg2, options.fn(this) will execute if not options.inverse(this) will execute
hbs.handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
})

// Add routes here
// How to grab the parameters 
app.get('/hello/:name', (req, res) => {
    let name = req.params.name;
    // res = response   
    res.send(`Hi, ${name}`)
})

// Lab 3 - HBS
app.get('/', (req, res) => {
    res.render('index.hbs')
})


// Render route for a form
app.get("/add-food", (req, res) => {
    res.render("add_food")
})

// When the form is submitted this app.post will fire
app.post("/add-food", (req, res) => {
    const { foodName, calories, tags } = req.body;
    res.render("display_food_summary", {
        foodName,
        calories,
        tags: tags.join(", ")
    })
})

// Hands On A (calculate_bmi)
app.get("/calculate-bmi", (req, res) => {
    res.render("calculate-bmi")
})

app.post("/calculate-bmi", (req, res) => {
    const weight = parseInt(req.body.weight)
    const height = parseFloat(req.body.height)
    function calculateBmi(weight, height) {
        heightInMeters = height / 100
        let calculatedBmi = weight / (heightInMeters * heightInMeters)
        return calculatedBmi
    }
    const calculatedBmi = calculateBmi(weight, height)
    res.send(`Your BMI is ${calculatedBmi.toFixed(2)}`)
})

// Hands On B (Getting data from checkboxes)
app.get("/fruits", (req, res) => {
    res.render("add_fruits")
})

app.post("/fruits", (req, res) => {
    const fruits = req.body.items
    let selectedFruits = []
    // there will be three possible cases
    // 1. undefined (empty array) None were seleceted
    // 2. one single string [only one was selected]
    // 3. an array [more than one was selected] 
    // our goal is to make them all an array

    // The code below ensure that if any fruits exist it will become an array of fruit
    if (fruits) {
        selectedFruits = Array.isArray(fruits) ? fruits : [fruits]
    }

    // we are going to reference this fruit pricing table
    let fruitPricing = {
        "apple": 3,
        "durain": 15,
        "orange": 6,
        "banana": 4
    }

    let total = 0;
    for (let each of selectedFruits) {
        if (fruitPricing[each]) {
            total += fruitPricing[each]
        }
    }
   
    res.send(`Total cost of ${selectedFruits.join(", ")} = $${total}`)
})


// Hands On C (Lost and Found)
app.get("/lost-and-found", (req, res)=>{
    res.render("lost_and_found")
})

app.post("/lost-and-found", (req,res)=> {
    const itemName = req.body.itemName
    const email = req.body.email
    const lastLocation = req.body.lastLocation
    const itemProperty = req.body.itemProperty 
    console.log(itemProperty.length)
    try{
        if (itemName.length < 3) {
            res.send(`Sorry ${itemName} is less than 3 character`)
        } else if (itemName.length > 199) {
            res.send(`Sorry your item name has more than 200 characters`)
        }  
        
        if (!email.includes("@")) {
            res.send(`Sorry your email needs a @`)
        } else if (!email.includes(".")) {
            res.send(`Sorry your email needs a .`)
        }
        
        let itemPropertyList = []
        
        if (itemProperty.length < 3) {
            res.send(`Sorry your item properties needs to be less than 3.`)
        } else if (itemProperty.length === undefined){
            res.send(`Sorry your item properties needs to be more than 1`) 
        }
        //
        
    } catch {

    }
    
    res.render("lost_found_report", {
        itemName, email, lastLocation, itemProperty
    })
    
})


// Server started
app.listen(4000, () => {
    console.log(`Server has started`)
})