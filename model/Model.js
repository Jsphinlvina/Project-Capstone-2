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
            callback(null, result.affectedRows)
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
}

module.exports = Model