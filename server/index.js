const cors = require('cors')
const express = require('express')
const { body, check, param, validationResult } = require('express-validator')
const mySqlProxy = require('./mySqlProxy')

const PORT = 8080
const app = express()
const corsOptions = { origin: ['http://localhost:3000'], optionsSuccessStatus: 200 }

// Middleware...
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Your endpoints here..

const promisePool = require('../PromisePool.js').promisePool

app.get('/person/:id', cors(corsOptions), async (req, res) => { 
    // const result = await mySqlProxy.<YOUR FUNCTION HERE>
    // const id = req.params['id']                  // Read parameters from URL.
    // const personType = req.query['personType']   // Read query parameters from URL.
    // const body = req.body                        // Read request body.
    // res.send(<YOUR OBJECT HERE>)
    res.send({message: 'Hey World'})
})

app.get('/message', cors(corsOptions), async(req, res) => {
    res.send({message: 'Hi my name is Nico Portalatin!!!'})
})

app.get('/persons/', cors(corsOptions), async (req,res) => {
    const persons = await mySqlProxy.selectPersons();
    res.send(persons);
})


// app.get('/cars/', cors(corsOptions), async (req,res) => {
//   const cars = await mySqlProxy.selectCars();
//   res.send(cars);
// })


// Car ID
app.get('/car/:id', cors(corsOptions), param('id').isNumeric(), async (req, res) => { 

  const errors = validationResult(req)

        if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() })  
        }
  const carId = req.params['id']
  const car = await mySqlProxy.selectCarById(carId)
  car ? res.send(car) : res.status(404).send({message: 'Not found.'})
  
  res.send(car)
})

//Car Make 
app.get('/cars', cors(corsOptions), async (req,res) => {

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })  
 }
  
  const make = req.query.make
  const cars = await mySqlProxy.selectCarByMake(make);
  cars ? res.send(cars) : res.status(404).send({message: 'Not found.'})
  res.send(cars);

})

//Car post (adding)
app.post('/cars/', cors(corsOptions), async (req, res) => { 

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })  
 }

  const car = req.body 
  const newCar = await mySqlProxy.insertCar(car)
  newCar ? res.send(newCar) : res.status(404).send({message: 'Not found.'})
  res.send(newCar)
})

//Car Put

app.put('/cars', cors(corsOptions), async (req, res) => { 

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })  
 }

  const car = req.body 
  const newCar = await mySqlProxy.updateCar(car)
  newCar ? res.send(newCar) : res.status(404).send({message: 'Not found.'})
  res.send(newCar);
})

app.delete('/cars/:id', cors(corsOptions), param('id').isNumeric(), async (req, res) => {

          // Validate...
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

    const carId = req.params['id']
    const results = await mySqlProxy.deleteCar(carId)
    results ? res.send(results) : res.status(404).send({message: 'Not found.'})
    res.send(results)
})



app.listen(PORT, () => {
    console.log(`Express web API running on port: ${PORT}.`)
})
