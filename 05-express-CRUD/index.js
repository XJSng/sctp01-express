const express = require('express')
const hbs = require("hbs")
const wax = require("wax-on")
const axios = require('axios')
const { connectToMongoDB } = require(`./db`)
const cors = require('cors')
const { ObjectId } = require('mongodb')

const app = express()

app.use(cors())
app.set('view engine',' hbs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));

wax.on(hbs.handlebars)
wax.setLayoutPath('./views/layouts')

//ROUTES HERE
async function main() {
    const db = await connectToMongoDB()
    
    // VIEW EQUIPMENT DATA
    app.get("/equipment", async(req, res)=>{
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
    
    app.post("/equipment/create", async (req, res)=>{
        let equipmentName  = req.body.equipmentName
             dateOfPurchase = req.body.dateOfPurchase
             equipmentType = req.body.equipmentType
             modelNumber = req.body.modelNumber
             generalRemarks = req.body.generalRemarks
             serviceStatus = req.body.serviceStatus
    
     let data = {
        "name": equipmentName,
        "date-of-purchase": dateOfPurchase,
        "equipment-type":equipmentType,
        "model-number": modelNumber,
        "general-remarks":generalRemarks,
        "service": serviceStatus 
     }
        let result = await db.collection('equipment_list').insertOne(data)
        res.status(201).json(result)
    })
    
    //UPDATE ROUTE
    app.get('/equipment/:equipment_id', async(req,res)=>{ 
        const _id = req.params.equipment_id
        const equipment = await db.collection('equipment_list').findOne({_id:_id})
        console.log(equipment)
        res.render('edit_equipment.hbs', {
           "all_equipment":equipment
        })
    })
    
    
    
    }

//ROUTES END

// APP PORTS
app.listen(5000, ()=>console.log('Server has started'))

main()





