// server creation

// 1)Import Express

const express = require('express')

// import dataservices
const dataservices = require('./services/data.service')

// import cors
const cors = require('cors');
 

// 2)create a application using express

const app = express()

// Give command to share data via cors


// to parse json from request body
app.use(express.json())

app.use(cors({
    origin:'http://localhost:4200'
}))

// create a port number

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})


// API Request
// registration request
app.post('/registration',(req,res)=>{
    console.log(req.body);
    dataservices.registration(req.body.phone,req.body.username,req.body.password)//data
    .then(result=>{
    res.status(result.statusCode).json(result)
})
})


// login request
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataservices.login(req.body.phone,req.body.password)//data
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//API call to get all products

app.get('/all-products',(req,res)=>{
    dataservices.getProducts().then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
})







app.post('/showfood', (req, res) => {
    dataservices.showfood(req.body.id).then(
        result => {
            res.status(result.statusCode).json(result)
        }
    )
})

app.post('/order', (req, res) =>{
    dataservices.order(req.body.id, req.body.name, req.body.phone, req.body.email, req.body.address, req.body.pincode, req.body.location, req.body.item, req.body.price, req.body.image, req.body.origin).then(
        result => {
            res.status(result.statusCode).json(result)
        }
    )
})
app.post('/addtowishlist',(req,res)=>{
    dataservices.addtowishlist(req.body.id,req.body.item, req.body.price, req.body.image,req.body.description, req.body.origin).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
    })

    //Api call to getwishlist

app.get('/getwishlist',(req,res)=>{
    dataservices.getwishlist().then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
    })

app.post('/getfood',(req,res)=>{
    dataservices.getfood(req.body.id).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
    })
app.get('/myorders',(req,res)=>{
    dataservices.myorders(req.body.id).then(
        result=>{
            res.status(result.statusCode).json(result)
        }
    )
    })


































