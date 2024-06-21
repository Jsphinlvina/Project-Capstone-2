const Model = require('./Model')

class ProgramStudi extends Model {
    constructor() {
        super('program_studi');
        if (!ProgramStudi.instance) {
            ProgramStudi.instance = this
        }
        return ProgramStudi.instance
    }
}

module.exports = ProgramStudi