const express = require('express')
const app = express()
const path = require('path')

const router = express.Router()
router.use(express.static('public'))

router.get('/login', (req, res) => {
    res.render('login')
})

// Controller
const roleController = require('../controller/RoleController')
const userController = require('../controller/UsersController')
const fakultasController = require('../controller/FakultasController')
const programStudiController = require('../controller/ProgramStudiController')
const jenisBeasiswaController = require('../controller/JenisBeasiswaController')
const periodeController = require('../controller/PeriodeController')

// Role
router.get('/role/delete/:id', roleController.destroy)
router.get('/role/edit/:id', roleController.edit)
router.post('/role/update', roleController.update)
router.post('/role/store', roleController.store)
router.get('/role/create', roleController.create)
router.get('/role', roleController.index)

// User
router.get('/user/delete/:id', userController.destroy)
router.get('/user/edit/:id', userController.edit)
router.post('/user/update', userController.update)
router.post('/user/store', userController.store)
router.get('/user/create', userController.create)
router.get('/user', userController.index)

// Fakultas
router.get('/fakultas/delete/:id', fakultasController.destroy)
router.get('/fakultas/edit/:id', fakultasController.edit)
router.post('/fakultas/update', fakultasController.update)
router.post('/fakultas/store', fakultasController.store)
router.get('/fakultas/create', fakultasController.create)
router.get('/fakultas', fakultasController.index)

// Program Studi
router.get('/programStudi/delete/:id', programStudiController.destroy)
router.get('/programStudi/edit/:id', programStudiController.edit)
router.post('/programStudi/update', programStudiController.update)
router.post('/programStudi/store', programStudiController.store)
router.get('/programStudi/create', programStudiController.create)
router.get('/programStudi', programStudiController.index)

// Jenis Beasiswa
router.get('/jenisBeasiswa/delete/:id', jenisBeasiswaController.destroy)
router.get('/jenisBeasiswa/edit/:id', jenisBeasiswaController.edit)
router.post('/jenisBeasiswa/update', jenisBeasiswaController.update)
router.post('/jenisBeasiswa/store', jenisBeasiswaController.store)
router.get('/jenisBeasiswa/create', jenisBeasiswaController.create)
router.get('/jenisBeasiswa', jenisBeasiswaController.index)

// Periode
router.get('/periode/delete/:id', periodeController.destroy)
router.get('/periode/edit/:id', periodeController.edit)
router.post('/periode/update', periodeController.update)
router.post('/periode/store', periodeController.store)
router.get('/periode/create', periodeController.create)
router.get('/periode', periodeController.index)




// router.get('/dashboard', function(req, res) {
//     if (req.user.role === 'administrator') {
//         res.render('administrator/dashboard');
//     } else if (req.user.role === 'fakultas') {
//         res.render('fakultas/dashboard');
//     } else if (req.user.role === 'program_studi') {
//         res.render('programStudi/dashboard');
//     } else if (req.user.role === 'mahasiswa') {
//         res.render('mahasiswa/dashboard');
//     } else {
//         res.redirect('/login');
//     }
// })

router.get('/home', (req, res) => {
    res.render('administrator/dashboard')
})

router.get('/home1', (req, res) => {
    res.render('fakultas/dashboard')
})

router.get('/home2', (req, res) => {
    res.render('programStudi/dashboard')
})

router.get('/home3', (req, res) => {
    res.render('mahasiswa/dashboard')
})

router.get('/applicants', (req, res) => {
    res.render('programStudi/applicants')
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

router.get('/programStudi', (req, res) => {
    res.render('programStudi/index')
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
    res.render('programStudi/approval')
})

router.get('/createPS', (req, res) => {
    res.render('mahasiswa/create')
})


module.exports = router