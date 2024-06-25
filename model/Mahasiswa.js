const Model = require('./Model')

class Mahasiswa extends Model {
    constructor() {
        super('mahasiswa');
        if (!Mahasiswa.instance) {
            Mahasiswa.instance = this
        }
        return Mahasiswa.instance
    }

    role(id, callback) {
        this.belongsTo('role_id', 'role', 'id', id, callback)
    }

    program_studi(id, callback) {
        this.belongsTo('program_studi_id', 'program_studi', 'id', id, callback)
    }
    all(callback) {
        const query = `SELECT *
                       FROM ${this.table}`
        this.db.query(query, (err, result) => {
            if (err) return callback(err, null)
            callback(result)
        })
    }
}

module.exports = Mahasiswa