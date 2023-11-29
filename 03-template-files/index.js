const express = require("express");
const hbs = require("hbs");
const prompt = require("prompt-sync")()

// hbs stands for Handlebars
// There are 3 version for Handlebars

let app = express()
app.set("view engine", "hbs");


// Configure Express to send back static files
// express.static is a function call to Express which will
// setup the static files and the string parameter is
// the name of the folder to find those files
app.use(express.static("public"))

app.get("/", function (req, res) {
    // const name = prompt("Please enter your name")
    const today = new Date();

    res.render('index.hbs', {
        "name": "Xu Jie",
        "today": today
    })
})

app.listen(3000, () => console.log("Server started"))