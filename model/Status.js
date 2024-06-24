const Model = require('./Model')

class Status extends Model {
    constructor() {
        super('status');
        if (!Status.instance) {
            Status.instance = this
        }
        return Status.instance
    }

    jenis_beasiswa(id, callback) {
        this.belongsTo('jenis_beasiswa_id', 'jenis_beasiswa', 'id', id, callback)
    }

    periode(id, callback) {
        this.belongsTo('periode_id', 'periode', 'id', id, callback)
    }

    findByJenisBeasiswaAndPeriode(jenis_beasiswa_id, periode_id, callback) {
        const query = `
            SELECT *
            FROM ${this.table}
            WHERE jenis_beasiswa_id = ?
              AND periode_id = ?
        `;
        this.db.query(query, [jenis_beasiswa_id, periode_id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null,results[0]);
        });
    }

}

module.exports = Status