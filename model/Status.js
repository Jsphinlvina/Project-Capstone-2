const Model = require('./Model')

class Status extends Model {
    constructor() {
        super('status');
        if (!Status.instance) {
            Status.instance = this
        }
        return Status.instance
    }

    jenis_beasiswa(id, callback){
        this.belongsTo('jenis_beasiswa_id', 'jenis_beasiswa', 'id', id, callback)
    }

    periode(id, callback){
        this.belongsTo('periode_id', 'periode', 'id', id, callback)
    }

}

module.exports = Status