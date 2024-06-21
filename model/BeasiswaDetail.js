const Model = require('./Model')

class BeasiswaDetail extends Model {
    constructor() {
        super('beasiswa_detail');
        if (!BeasiswaDetail.instance) {
            BeasiswaDetail.instance = this
        }
        return BeasiswaDetail.instance
    }
}

module.exports = BeasiswaDetail