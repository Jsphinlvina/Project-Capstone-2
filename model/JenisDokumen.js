const Model = require('./Model')

class JenisDokumen extends Model {
    constructor() {
        super('jenis_dokumen');
        if (!JenisDokumen.instance) {
            JenisDokumen.instance = this
        }
        return JenisDokumen.instance
    }
}

module.exports = JenisDokumen