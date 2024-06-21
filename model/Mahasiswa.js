const Model = require('./Model')

class Mahasiswa extends Model {
    constructor() {
        super('mahasiswa');
        if (!Mahasiswa.instance) {
            Mahasiswa.instance = this
        }
        return Mahasiswa.instance
    }
}

module.exports = Mahasiswa