const express = require('express')
const app = express()
const path = require('path')

const router = express.Router()
router.use(express.static('public'))

router.get('/home', (req, res) => {
    res.render('administrator/dashboard')
})

router.get('/home1', (req, res) => {
    res.render('fakultas/dashboard')
})

router.get('/home2', (req, res) => {
    res.render('program_studi/dashboard')
})

router.get('/home3', (req, res) => {
    res.render('mahasiswa/dashboard')
})


router.get('/pengajuan', (req, res) => {
    res.render('pengajuan/index')
})

router.post('/riwayat', (req, res) => {

})

router.get('/', (req, res) => {
    res.render('administrator/dashboard')
})

router.get('/jenisBeasiswa', (req, res) => {
    res.render('master_data/jenisBeasiswa')
})
module.exports = router