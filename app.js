const express = require('express')
const dotenv = require('dotenv')
const dataBase = require('./config/database')
const userRoutes = require('./src/routes/users')
const bodyParser = require('body-parser')
const authRoutes = require('./src/routes/auth')
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


app.get('/', (req, res) => res.send('Hello World!, kartik is here'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))