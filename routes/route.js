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
const pengajuanController = require('../controller/PengajuanController')

// Middleware untuk memeriksa peran
function checkRole(roles) {
    return (req, res, next) => {
        if (req.user && roles.includes(req.user.role_id)) {
            return next();
        } else {
            req.flash('error', 'Role tidak valid atau akses tidak diizinkan');
            res.redirect('/login');
        }
    };
}

// Role
router.get('/role/delete/:id', checkRole(['1']), roleController.destroy)
router.get('/role/edit/:id', checkRole(['1']), roleController.edit)
router.post('/role/update', checkRole(['1']), roleController.update)
router.post('/role/store', checkRole(['1']), roleController.store)
router.get('/role/create', checkRole(['1']), roleController.create)
router.get('/role', checkRole(['1']), roleController.index)

// User
router.get('/users/delete/:id', checkRole(['1']), userController.destroy)
router.get('/users/edit/:id', checkRole(['1']), userController.edit)
router.post('/users/update', checkRole(['1']), userController.update)
router.post('/users/store', checkRole(['1']), userController.store)
router.get('/users/create', checkRole(['1']), userController.create)
router.get('/users', checkRole(['1']), userController.index)


// Fakultas
router.get('/fakultas/delete/:id', checkRole(['1']), fakultasController.destroy)
router.get('/fakultas/edit/:id', checkRole(['1']), fakultasController.edit)
router.post('/fakultas/update', checkRole(['1']), fakultasController.update)
router.post('/fakultas/store', checkRole(['1']), fakultasController.store)
router.get('/fakultas/create', checkRole(['1']), fakultasController.create)
router.get('/fakultas', checkRole(['1']), fakultasController.index)

// Program Studi
router.get('/programStudi/delete/:id', checkRole(['1']), programStudiController.destroy)
router.get('/programStudi/edit/:id', checkRole(['1']), programStudiController.edit)
router.post('/programStudi/update', checkRole(['1']), programStudiController.update)
router.post('/programStudi/store', checkRole(['1']), programStudiController.store)
router.get('/programStudi/create', checkRole(['1']), programStudiController.create)
router.get('/programStudi', checkRole(['1']), programStudiController.index)

// Jenis Beasiswa
router.get('/jenisBeasiswa/delete/:id', checkRole(['1']), jenisBeasiswaController.destroy)
router.get('/jenisBeasiswa/edit/:id', checkRole(['1']), jenisBeasiswaController.edit)
router.post('/jenisBeasiswa/update', checkRole(['1']), jenisBeasiswaController.update)
router.post('/jenisBeasiswa/store', checkRole(['1']), jenisBeasiswaController.store)
router.get('/jenisBeasiswa/create', checkRole(['1']), jenisBeasiswaController.create)
router.get('/jenisBeasiswa', checkRole(['1']), jenisBeasiswaController.index)

// Jenis Dokumen
router.get('/jenisDokumen/delete/:id', checkRole(['1']), jenisDokumenController.destroy)
router.get('/jenisDokumen/edit/:id', checkRole(['1']), jenisDokumenController.edit)
router.post('/jenisDokumen/update', checkRole(['1']), jenisDokumenController.update)
router.post('/jenisDokumen/store', checkRole(['1']), jenisDokumenController.store)
router.get('/jenisDokumen/create', checkRole(['1']), jenisDokumenController.create)
router.get('/jenisDokumen', checkRole(['1']), jenisDokumenController.index)

// Periode
router.get('/periode/delete/:id', checkRole(['1']), periodeController.destroy)
router.get('/periode/edit/:id', checkRole(['1']), periodeController.edit)
router.post('/periode/update', checkRole(['1']), periodeController.update)
router.post('/periode/store', checkRole(['1']), periodeController.store)
router.get('/periode/create', checkRole(['1']), periodeController.create)
router.get('/periode', checkRole(['1']), periodeController.index)

// Status
router.get('/status/delete/:id', checkRole(['2', '3']), statusController.destroy)
router.get('/status/edit/:id', checkRole(['2', '3']), statusController.edit)
router.post('/status/update', checkRole(['2', '3']), statusController.update)
router.post('/status/store', checkRole(['2', '3']), statusController.store)
router.get('/status/create', checkRole(['2', '3']), statusController.create)
router.get('/status', checkRole(['2', '3']), statusController.index)

// Pengajuan
router.get('/pengajuan', checkRole(['2', '3']), pengajuanController.index)
router.get('/pengajuan/pengajuanBeasiswa', checkRole(['2', '3']), pengajuanController.pengajuanBeasiswa)

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