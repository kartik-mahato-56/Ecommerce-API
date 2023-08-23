const express = require('express')
const dotenv = require('dotenv')
const dataBase = require('./config/database')
const userRoutes = require('./routes/users')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')
const app = express()
const port = process.env.PORT || 3000
dotenv.config()
dataBase.connectDb()
//body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//auth routes
app.use('/api', authRoutes)
//users routes
app.use('/api/users', userRoutes)

//product routes
app.use('/api/products', productRoutes)


app.get('/', (req, res) => res.send('Hello World!, kartik is here'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))