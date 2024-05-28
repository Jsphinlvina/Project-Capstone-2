const express = require('express')

const router = express.Router()
router.use(express.static('public'))

router.get('/home', (req, res) => {
    res.render('dashboard')
})

router.get('/page01', (req, res) => {
    res.render('beasiswa')
})

router.post('/page02', (req, res) => {

})

router.get('/', (req, res) => {
    res.render('dashboard')
})

module.exports = router