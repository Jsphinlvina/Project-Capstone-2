const mysql = require('mysql')
const config = require('../config/db_config')
const e = require("express");

class Model {
    constructor(table) {
        if (new.target === Model) {
            throw new TypeError('Cannot construct Abstract instance directly')
        }

    }

    all(callback){
        const query = `SELECT * FROM {}`
    }
}