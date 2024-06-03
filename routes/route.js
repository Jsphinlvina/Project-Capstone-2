const express = require('express')
const app = express()
const path = require('path')

const router = express.Router()
router.use(express.static('public'))

router.get('/home', (req, res) => {
    res.render('dashboard')
})

router.get('/pengajuan', (req, res) => {
    res.render('pengajuan/index')
})

router.post('/riwayat', (req, res) => {

})

router.get('/', (req, res) => {
    res.render('dashboard')
})

module.exports = router