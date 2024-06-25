const Model = require('./Model');
const bcrypt = require('bcrypt');

class Users extends Model {
    constructor() {
        super('users');
        if (!Users.instance) {
            Users.instance = this;
        }
        return Users.instance;
    }

    role(id, callback) {
        this.belongsTo('role_id', 'roles', 'id', id, callback);  // pastikan 'roles' adalah nama tabel yang benar
    }

    program_studi(id, callback) {
        this.belongsTo('program_studi_id', 'program_studi', 'id', id, callback);
    }

    all(callback) {
        const query = `SELECT * FROM ${this.table}`;
        this.db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

}

module.exports = Users;
