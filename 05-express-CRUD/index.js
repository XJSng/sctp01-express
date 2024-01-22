const express = require('express')
const hbs = require("hbs")
const wax = require("wax-on")
const axios = require('axios')
const { connectToMongoDB } = require(`./db`)
const cors = require('cors')

const app = express()
app.set('view engine',' hbs')
app.use(express.static('public'))

wax.on(hbs.handlebars)
wax.setLayoutPath('./views/layouts')

//ROUTES HERE
const baseURL = "https://petstore.swagger.io/v2"

// VIEW EQUIPMENT DATA
app.get("/equipment", async(req, res)=>{
    const db = await connectToMongoDB()
    const equipments = await db.collection('equipment_list').find({}).toArray()

    res.render("all_equipment.hbs",{
        "all_equipment": equipments
    })
})

// READ VOLUNTEER DATA
app.get("/volunteers", async(req, res)=>{
    const db = await connectToMongoDB()
    const volunteers = await db.collection('volunteers').find({}).toArray()
        res.render("all_volunteers.hbs",{
        "all_volunteers": volunteers
    })
})

// READ LIVESTREAM SERVICE DATA
app.get("/livestream-service", async(req, res)=>{
    const db = await connectToMongoDB()
    const livestreamServices = await db.collection('livestream_service').find({}).toArray()
        res.render("all_livestreams.hbs",{
        "all_livestreams": livestreamServices
    })
})

// CREATE Equipement
app.get('/equipment/create',async(req,res)=>{
    res.render('create_equipment.hbs')
})


//ROUTES END

// APP PORTS
app.listen(5000, ()=>console.log('Server has started'))





