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

app.get("/fruits", function (req, res){
    res.render("fruits")
})

// fruits
app.post("/fruits", function(req, res){
 const fruits = req.body.items
 let selectedFruits = []
 if (Array.isArray(fruits)) {
    selectedFruits = fruits
 } else if (!fruits) {
    selectedFruits = []
 }else{ 
    selectedFruits = [ fruits ]
 }

 let total = 0

// map table
const fruitPricings = {
    "apple" : 3,
    "orange" : 6,
    "banana" : 4,
    "durian" : 15
}

for (let item of selectedFruits) {
    if (fruitPricings[item]) {
        total += fruitPricings[item]
    }
}

// for (let item of selectedFruits) {
//  if (item == "durian") {
//     total += 15;
//  } if (item == "apple") {
//     total += 3;
//  }if (item == "orange") {
//     total += 6;
//  }if (item == "banana") {
//     total += 4;
//  }
//  }

 res.send("Total Cost = $" + total)
})

// We want to add a route for POST /add-food
app.post("/add-food", function (req, res){
    // There is a shorter way of doing this form extraction
    const {foodName,calories, meal, cuisine, tags} = req.body;
    // check if radio button
    if (!meal) {
        res.send("No meal selected")
    return
    }
    let selectedTags = [];

// if (Array.isArray(tags)) {
//     selectedTags = tags;
// } else if (!tags) {
//     selectedTags = []
// } else{
//     selectedTags = [ tags ]
// }

//Another way of doing things
if (tags) {
    selectedTags = Array.isArray(tags) ? tags : [tags]
}

    res.render("food-summary", {
        foodName,
        calories,
        meal,
        cuisine,
        selectedTags
    })

    // const foodName = req.body.foodName
    // const calories = req.body.calories
    // res.render("food-summary", {
    //     foodName: foodName,
    //     calories: calories
    // })
    // When the form is sumbitted it is sent to "req" or request
// the name="foodName" field will be the key value pair

// for tags there can be one of three:
// 



})


app.listen(3000, function(req,res){
    console.log("Server has start");
})