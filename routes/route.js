const express = require('express')
const app = express()
const path = require('path')

const router = express.Router()
router.use(express.static('public'))

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/dashboard', function(req, res) {
    if (req.user.role === 'administrator') {
        res.render('administrator/dashboard');
    } else if (req.user.role === 'fakultas') {
        res.render('fakultas/dashboard');
    } else if (req.user.role === 'program_studi') {
        res.render('program_studi/dashboard');
    } else if (req.user.role === 'mahasiswa') {
        res.render('mahasiswa/dashboard');
    } else {
        res.redirect('/login');
    }
})

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

router.get('/applicants', (req, res) => {
    res.render('program_studi/applicants')
})

router.get('/management', (req, res) => {
    res.render('fakultas/management')
})

router.get('/applicants01', (req, res) => {
    res.render('fakultas/applicants')
})

router.get('/pengajuan', (req, res) => {
    res.render('pengajuan/index')
})

router.get('/riwayat', (req, res) => {
    res.render('pengajuan/riwayat')
})

router.get('/', (req, res) => {
    res.render('administrator/dashboard')
})

router.get('/jenisBeasiswa', (req, res) => {
    res.render('jenis_beasiswa/index')
})

router.get('/fakultas', (req, res) => {
    res.render('fakultas/index')
})

router.get('/programStudi', (req, res) => {
    res.render('program_studi/index')
})

router.get('/userManagement', (req, res) => {
    res.render('users/index')
})

router.get('/roleManagement', (req, res) => {
    res.render('role/index')
})

router.get('/mahasiswa', (req, res) => {
    res.render('mahasiswa/index')
})

router.get('/approvalFakultas', (req, res) => {
    res.render('fakultas/approval')
})

router.get('/approvalProgramStudi', (req, res) => {
    res.render('program_studi/approval')
})



module.exports = router