/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('roles').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('roles', function (table) {
                table.string('id', 1).primary()
                table.string('name', 20).notNullable()
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('roles');
};
