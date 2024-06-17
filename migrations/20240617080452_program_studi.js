/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('program_studi').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('program_studi', function (table) {
                table.string('id', 5).primary()
                table.string('name', 50).unique()
                table.string('fakultas_id', 5).notNullable()
                table.foreign('fakultas_id').references('id').inTable('fakultas').onUpdate('CASCADE').onDelete('RESTRICT')
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('program_studi')
};
