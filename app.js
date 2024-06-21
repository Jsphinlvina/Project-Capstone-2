const express = require('express')
const session = require('express-session')
const router = require('./routes/route')

const app = express()

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(express.urlencoded({
    extended: false
}))

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}))

app.use(router)

app.listen(8000, () => {
    console.log('Server run at port 8000')
})