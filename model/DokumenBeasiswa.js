const Model = require('./Model')

class DokumenBeasiswa extends Model {
    constructor() {
        super('dokumen_beasiswa');
        if (!DokumenBeasiswa.instance) {
            DokumenBeasiswa.instance = this
        }
        return DokumenBeasiswa.instance
    }
}

module.exports = DokumenBeasiswa