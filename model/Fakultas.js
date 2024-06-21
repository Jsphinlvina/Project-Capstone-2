const Model = require('./Model')

class Fakultas extends Model{
    constructor() {
        super('fakultas');
        if (!Fakultas.instance) {
            Fakultas.instance = this
        }
        return Fakultas.instance
    }
}

module.exports = Fakultas