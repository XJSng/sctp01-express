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
app.use(express.json()); // use json

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
        let dateOfPurchase = req.body.dateOfPurchase
        let equipmentType = req.body.equipmentType
        let modelNumber = req.body.modelNumber
        let generalRemarks = req.body.generalRemarks
        let serviceStatus = [req.body.serviceStatus]
    
     let data = {
        "name": equipmentName,
        "dateOfPurchase": dateOfPurchase,
        "equipmentType":equipmentType,
        "modelNumber": modelNumber,
        "generalRemarks":generalRemarks,
        "service": serviceStatus 
     }
        let result = await db.collection('equipment_list').insertOne(data)
        
        res.redirect("/equipment")
    })
    
    //UPDATE ROUTE
    app.get('/equipment/:equipment_id/update', async(req,res)=>{ 
        const _id = new ObjectId(req.params.equipment_id)

        const equipment = await db.collection('equipment_list').findOne({_id:_id})
        console.log(equipment)
        res.render('edit_equipment.hbs', {
           "all_equipment":equipment
        })
    })
    
    // DELETE ROUTE
    app.get("/equipment/:equipmentId/delete", async(req, res)=>{
        const _id = req.params.equipmentId
        const equipment = await db.collection("equipment_list").findOne({
            "_id": new ObjectId(_id) })    
        res.render("delete_equipment.hbs", {
            "equipment":equipment
        })
    })
        
    app.post("/equipment/:equipment_id/delete", async(req, res)=>{
        const _id = req.params.equipmentId
        const results = await db.collection('equipment_list').deleteOne({"_id": new ObjectId(_id)})
            res.json({
                "message": "Equipment successfully deleted"
        })
        })
    }

//ROUTES END

// APP PORTS
app.listen(5000, ()=>console.log('Server has started'))

main()





