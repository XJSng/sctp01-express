const express = require('express')
const hbs = require("hbs")
const wax = require("wax-on")
const axios = require('axios')

const app = express()
app.set('view engine',' hbs')
app.use(express.static('public'))

wax.on(hbs.handlebars)
wax.setLayoutPath('./views/layouts')

//ROUTES HERE
const baseURL = "https://petstore.swagger.io/v2"
app.get("/pets", async(req, res)=>{

    let response = await axios.get(baseURL + "/pet/findByStatus",{
        params: {
            'status': 'available'
        }
    })
    res.render("all_pets.hbs",{
        "all_pets": response.data
    })
})




//ROUTES END

// APP PORTS
app.listen(5000, ()=>console.log('Server has started'))




