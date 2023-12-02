const express = require('express');
const wax = require('wax-on');
const hbs = require('hbs');
const app = express();

wax.setLayoutPath('./views/layouts');
wax.on(hbs.handlebars);

app.use(express.static("public"));

// set the default view eninge to 'hbs'
app.set('view engine', 'hbs');

//
app.use(express.urlencoded({
    extended: false // use basic forms not advanced form
}))

app.get('/', function(req,res){
    res.render('index');
})

//We want to add a route for GET /add-food
app.get("/add-food", function (req, res){
    res.render("add-food")
})

// We want to add a route for POST /add-food
app.post("/add-food", function (req, res){
    // There is a shorter way of doing this form extraction
    const {foodName,calories} = req.body;
    res.render("food-summary", {
        foodName,
        calories
    })

    // const foodName = req.body.foodName
    // const calories = req.body.calories
    // res.render("food-summary", {
    //     foodName: foodName,
    //     calories: calories
    // })
    // When the form is sumbitted it is sent to "req" or request
// the name="foodName" field will be the key value pair

    
})


app.listen(3000, function(req,res){
    console.log("Server has start");
})