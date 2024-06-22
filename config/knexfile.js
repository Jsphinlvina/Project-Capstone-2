const path = require('path');

module.exports = {
   development: {
      client: 'mysql',
      connection: {
         host: 'localhost',
         user: 'root',
         password: '',
         database: 'beasiswa',
      },
      migrations: {
         directory: 'C:\\Note\\Project-Capstone-2\\migrations'
      },
      seeds: {
         directory: path.join(__dirname, '../seeds')
      }
   },
};
