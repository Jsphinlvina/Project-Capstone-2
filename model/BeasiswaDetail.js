const Model = require('./Model')

class BeasiswaDetail extends Model {
    constructor() {
        super('beasiswa_detail');
        if (!BeasiswaDetail.instance) {
            BeasiswaDetail.instance = this
        }
        return BeasiswaDetail.instance
    }

    jenis_beasiswa(id, callback) {
        this.belongsTo('jenis_beasiswa_id', 'jenis_beasiswa', 'id', id, callback)
    }

    periode(id, callback) {
        this.belongsTo('periode_id', 'periode', 'id', id, callback)
    }

    mahasiswa(id, callback){
        this.belongsTo('mahasiswa_id', 'mahasiswa', 'id', id, callback)
    }

}

module.exports = BeasiswaDetail