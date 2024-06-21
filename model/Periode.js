const Model = require('./Model')

class Periode extends Model {
    constructor() {
        super('periode');
        if (!Periode.instance) {
            Periode.instance = this
        }
        return Periode.instance
    }
}

module.exports = Periode