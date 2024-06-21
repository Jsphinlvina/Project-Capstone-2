const Model = require('./Model')

class Status extends Model {
    constructor() {
        super('status');
        if (!Status.instance) {
            Status.instance = this
        }
        return Status.instance
    }
}

module.exports = Status