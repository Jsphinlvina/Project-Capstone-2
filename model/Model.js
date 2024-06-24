const mysql = require('mysql')
const config = require('../config/db_config')

class Model {
    constructor(table) {
        if (new.target === Model) {
            throw new TypeError('Cannot construct Abstract instance directly')
        }
        this.table = table
        this.db = mysql.createConnection(config.db)
        this.db.connect((err) => {
            if (err) throw err
            console.log(`Mysql connect with ${this.table} table`)
        })
    }

    all(callback) {
        const query = `SELECT *
                       FROM ${this.table}`
        this.db.query(query, (err, result) => {
            if (err) return callback(err, null)
            callback(result)
        })
    }

    findID(id, callback) {
        const query = `SELECT *
                       FROM ${this.table}
                       WHERE id = ?`
        this.db.query(query, [id], (err, result) => {
            if (err) return callback(err, null)
            callback(result[0])
        })
    }

    findName(name, callback) {
        const query = `SELECT *
                       FROM ${this.table}
                       WHERE name = ?`
        this.db.query(query, [name], (err, result) => {
            if (err) return callback(err, null)
            callback(result[0])
        })
    }

    findBy(field, value, callback) {
        const query = `SELECT * FROM ${this.table} WHERE ${field} = ? LIMIT 1`;
        this.db.get(query, [value], (err, row) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, row);
        });
    }

    edit(id, callback) {
        const query = `SELECT *
                       FROM ${this.table}
                       WHERE id = ?`
        this.db.query(query, [id], (err, result) => {
            if (err) return callback(err, null)
            callback(result[0])
        })
    }

    save(data, callback) {
        const query = `INSERT INTO ${this.table}
                       SET ?`
        this.db.query(query, data, (err, result) => {
            if (err) return callback(err, null)
            callback(result.insertId)
        })
    }

    update(data, callback) {
        const id = data.id
        const query = `UPDATE ${this.table}
                       SET ?
                       WHERE id = ?`
        this.db.query(query, [data, id], (err, result) => {
            if (err) return callback(err, null)
            callback(result.affectedRows)
        })
    }

    delete(id, callback) {
        const query = `DELETE
                       FROM ${this.table}
                       WHERE id = ?`
        this.db.query(query, [id], (err, result) => {
            if (err) return callback(err, null)
            callback(result.affectedRows)
        })
    }

    belongsTo(foreignKey, foreignTable, localKey, id, callback) {
        const query = `SELECT ft.*
                       FROM ${foreignTable} ft
                                JOIN ${this.table} lt ON lt.${foreignKey} = ft.${localKey}
                       WHERE lt.${foreignKey} = ?`

        this.db.query(query, [id], (err, result) => {
            if (err) return callback(err, null)
            callback(null, result[0])
        })
    }

    hasMany(localTable, localKey, foreignKey, callback) {
        const query = `SELECT *
                       FROM ${localTable}
                       WHERE ${foreignKey} = ?`

        this.db.query(query, [localKey], (err, result) => {
            if (err) return callback(err, null)
            callback(result)
        })
    }
}

module.exports = Model