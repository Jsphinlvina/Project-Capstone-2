const Model = require('./Model')

class JenisBeasiswa extends Model {
    constructor() {
        super('jenis_beasiswa');
        if (!JenisBeasiswa.instance) {
            JenisBeasiswa.instance = this
        }
        return JenisBeasiswa.instance
    }
}

module.exports = JenisBeasiswa