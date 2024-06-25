const Status = require('../model/Status')

const formatDateIndex = (date) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
};

const index = (req, res) => {
    new Status().all((statuss) => {
        let statusData = []
        let processed = 0

        if (!statuss || statuss.length === 0) {
            return res.render('pengajuan/index', {
                statuss: statusData,
                success: req.session.success || '',
                error: req.session.error || ''
            });
        }

        statuss.forEach(status => {
            new Status().jenis_beasiswa(status.jenis_beasiswa_id, (err, jenis_beasiswas) => {
                status.jenis_beasiswas = jenis_beasiswas

                new Status().periode(status.periode_id, (err, periode) => {
                    status.periode = periode


                    status.tanggal_mulai = formatDateIndex(status.tanggal_mulai);
                    status.tanggal_akhir = formatDateIndex(status.tanggal_akhir);

                    statusData.push(status)
                    processed++

                    if (processed === statuss.length) {
                        const success = req.session.success || ''
                        const error = req.session.error || ''
                        delete req.session.success
                        delete req.session.error

                        res.render('pengajuan/index', {
                            statuss: statuss,
                            success: success,
                            error: error
                        })
                    }
                })
            })
        })
    })
}

module.exports = {index}