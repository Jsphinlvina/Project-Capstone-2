const Model = require('./Model')

class ProgramStudi extends Model {
    constructor() {
        super('program_studi');
        if (!ProgramStudi.instance) {
            ProgramStudi.instance = this
        }
        return ProgramStudi.instance
    }

    fakultas(id, callback) {
        this.belongsTo('fakultas_id', 'fakultas', 'id', id, callback)
    }

}

module.exports = ProgramStudi