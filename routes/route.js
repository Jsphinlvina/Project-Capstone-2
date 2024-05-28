const express = require('express')

const router = express.Router()
router.use(express.static('public'))

router.get('/home', (req, res) => {
    res.render('dashboard')
})

router.get('/fam-card', (req, res) => {

})

router.post('/citizen', (req, res) => {

})

router.get('/', (req, res) => {
    res.render('dashboard')
})

module.exports = router