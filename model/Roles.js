const Model = require('./Model')

class Roles extends Model {
    constructor() {
        super('roles');
        if (!Roles.instance) {
            Roles.instance = this
        }
        return Roles.instance
    }
}

module.exports = Roles