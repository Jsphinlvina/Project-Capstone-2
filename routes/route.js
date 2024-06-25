const express = require('express')
const app = express()
const path = require('path')
const passport = require('passport');

const router = express.Router()
router.use(express.static('public'))

router.get('/login', (req, res) => {
    res.render('login')
})

// Controller
const loginController = require('../controller/loginController')
const roleController = require('../controller/RoleController')
const userController = require('../controller/UsersController')
const fakultasController = require('../controller/FakultasController')
const programStudiController = require('../controller/ProgramStudiController')
const jenisBeasiswaController = require('../controller/JenisBeasiswaController')
const jenisDokumenController = require('../controller/JenisDokumenController')
const periodeController = require('../controller/PeriodeController')
const statusController = require('../controller/StatusController')

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

// Jenis Dokumen
router.get('/jenisDokumen/delete/:id', jenisDokumenController.destroy)
router.get('/jenisDokumen/edit/:id', jenisDokumenController.edit)
router.post('/jenisDokumen/update', jenisDokumenController.update)
router.post('/jenisDokumen/store', jenisDokumenController.store)
router.get('/jenisDokumen/create', jenisDokumenController.create)
router.get('/jenisDokumen', jenisDokumenController.index)

// Periode
router.get('/periode/delete/:id', periodeController.destroy)
router.get('/periode/edit/:id', periodeController.edit)
router.post('/periode/update', periodeController.update)
router.post('/periode/store', periodeController.store)
router.get('/periode/create', periodeController.create)
router.get('/periode', periodeController.index)

// Status
router.get('/status/delete/:id', statusController.destroy)
router.get('/status/edit/:id', statusController.edit)
router.post('/status/update', statusController.update)
router.post('/status/store', statusController.store)
router.get('/status/create', statusController.create)
router.get('/status', statusController.index)

router.get('/login', loginController.login);
router.post('/login', loginController.authenticate);
router.get('/logout', loginController.logout);

// Middleware untuk memeriksa otentikasi
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Middleware untuk memeriksa peran
function checkRole(roles) {
    return (req, res, next) => {
        if (req.user && roles.includes(req.user.role_id)) {
            return next();
        } else {
            req.flash('error', 'Role tidak valid atau akses tidak diizinkan');
            res.redirect('/login')
        }
    }
}

// Protected routes, accessible only after authentication
router.use(isAuthenticated);

// Role-based routes
router.get('/administrator/dashboard', checkRole(['1']), (req, res) => {
    res.render('administrator/dashboard');
});
router.get('/jenisbeasiswa/index', checkRole(['1']), (req, res) => {
    res.render('jenisBeasiswa/index');
});
router.get('/programStudi/index', checkRole(['1']), (req, res) => {
    res.render('programStudi/index');
});
router.get('/fakultas/index', checkRole(['1']), (req, res) => {
    res.render('fakultas/index');
});
router.get('/users/index', checkRole(['1']), (req, res) => {
    res.render('users/index');
});

router.get('/mahasiswa/dashboard', checkRole(['4']), (req, res) => {
    res.render('mahasiswa/dashboard');
});
router.get('/pengajuan/index', checkRole(['4']), (req, res) => {
    res.render('pengajuan/index');
});
router.get('/pengajuan/riwayat', checkRole(['4']), (req, res) => {
    res.render('pengajuan/riwayat');
});

router.get('/fakultas/dashboard', checkRole(['2']), (req, res) => {
    res.render('fakultas/dashboard');
});
router.get('/fakultas/management', checkRole(['2']), (req, res) => {
    res.render('fakultas/management');
});
router.get('/fakultas/applicants', checkRole(['2']), (req, res) => {
    res.render('fakultas/applicants');
});
router.get('/fakultas/approval', checkRole(['2']), (req, res) => {
    res.render('fakultas/approval');
});

router.get('/programStudi/dashboard', checkRole(['3']), (req, res) => {
    res.render('programStudi/dashboard');
});
router.get('/programStudi/applicants', checkRole(['3']), (req, res) => {
    res.render('programStudi/applicants');
});
router.get('/programStudi/approval', checkRole(['3']), (req, res) => {
    res.render('programStudi/approval');
});

// Ensure the main route redirects to login if not authenticated
router.get('/', (req, res) => {
    res.redirect('/login');
});

module.exports = router;