const express = require('express');
const hbs = require('hbs')
const wax = require("wax-on")

const app = express()

//configure wax-on for template inheritance
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts"); // a layout is a template that other hbs can inherit from

app.set("view engine","hbs");

app.get("/", (req, res)=>{
    res.render('index.hbs')
})

app.get("/about-us", (req, res)=>{
    res.render('about-us.hbs')
})


app.listen(4000, function(){
    console.log("server has started")
})