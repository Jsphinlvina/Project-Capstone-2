const Status = require('../model/Status')
const User = require('../model/Users')
const Periode = require("../model/Periode");
const JenisBeasiswa = require("../model/JenisBeasiswa");

const formatDateIndex = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
};

const index = (req, res) => {
    new Status().all((statuss) => {
        let statusData = [];
        let processed = 0;

        if (!statuss || statuss.length === 0) {
            return res.render('pengajuan/index', {
                statuss: statusData,
                success: req.session.success || '',
                error: req.session.error || ''
            })
        }

        // Filter hanya status yang aktif
        const activeStatuss = statuss.filter(status => status.status === true || status.status === 1);

        if (activeStatuss.length === 0) {
            return res.render('pengajuan/index', {
                statuss: statusData,
                success: req.session.success || '',
                error: req.session.error || ''
            })
        }

        activeStatuss.forEach(status => {
            new Status().jenis_beasiswa(status.jenis_beasiswa_id, (err, jenis_beasiswas) => {
                status.jenis_beasiswas = jenis_beasiswas;

                new Status().periode(status.periode_id, (err, periode) => {
                    status.periode = periode;

                    status.tanggal_mulai = formatDateIndex(status.tanggal_mulai);
                    status.tanggal_akhir = formatDateIndex(status.tanggal_akhir);

                    statusData.push(status);
                    processed++;

                    if (processed === activeStatuss.length) {
                        const success = req.session.success || '';
                        const error = req.session.error || '';
                        delete req.session.success;
                        delete req.session.error;

                        res.render('pengajuan/index', {
                            statuss: statusData,
                            success: success,
                            error: error
                        })
                    }
                })
            })
        })
    })
}

const pengajuanBeasiswa = (req, res) => {
    const id = req.params.id
    new Status().edit(id, (status) => {
        status.tanggal_mulai = formatDate(status.tanggal_mulai);
        status.tanggal_akhir = formatDate(status.tanggal_akhir);

        new Status().jenis_beasiswa(status.jenis_beasiswa_id, (err, jenisBeasiswas)=>{
            status.jenis_beasiswas = jenisBeasiswas

            new Status().periode(status.periode_id, (err, periode)=>{
                status.periode = periode

                new Periode().all((periodes) => {
                    new JenisBeasiswa().all((jenisBeasiswas) => {
                        res.render('pengajuan/pengajuanBeasiswa', {
                            status: status,
                            periodes: periodes,
                            jenisBeasiswas: jenisBeasiswas
                        })
                    })
                })
            })
        })
    })
};

module.exports = {index, pengajuanBeasiswa}