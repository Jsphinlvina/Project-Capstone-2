const Model = require('./Model')

class Users extends Model {
    constructor() {
        super('users');
        if (!Users.instance) {
            Users.instance = this
        }
        return Users.instance
    }

    role(id, callback) {
        this.belongsTo('role_id', 'role', 'id', id, callback)
    }

    program_studi(id, callback) {
        this.belongsTo('program_studi_id', 'program_studi', 'id', id, callback)
    }
}

module.exports = Users