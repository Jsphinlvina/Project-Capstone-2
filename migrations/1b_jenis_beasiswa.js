/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('jenis_beasiswa').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('jenis_beasiswa', function (table) {
                table.string('id', 5).primary()
                table.string('name', 50).unique()
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('jenis_beasiswa')
};
