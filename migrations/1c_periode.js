/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('periode').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('periode', function (table) {
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
    return knex.schema.dropTableIfExists('periode')
};
