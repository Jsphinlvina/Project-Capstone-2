const Model = require('./Model')

class DokumenBeasiswa extends Model {
    constructor() {
        super('dokumen_beasiswa');
        if (!DokumenBeasiswa.instance) {
            DokumenBeasiswa.instance = this
        }
        return DokumenBeasiswa.instance
    }

    jenis_beasiswa(id, callback) {
        this.belongsTo('jenis_beasiswa_id', 'beasiswa_detail', 'jenis_beasiswa_id', id, callback)
    }

    periode(id, callback) {
        this.belongsTo('periode_id', 'beasiswa_detail', 'periode_id', id, callback)
    }

    mahasiswa(id, callback) {
        this.belongsTo('mahasiswa_id', 'beasiswa_detail', 'mahasiwa_id', id, callback)
    }

    jenis_dokumen(id, callback){
        this.belongsTo('jenis_dokumen_id', 'jenis_dokumen', 'id', id, callback)
    }

}

module.exports = DokumenBeasiswa