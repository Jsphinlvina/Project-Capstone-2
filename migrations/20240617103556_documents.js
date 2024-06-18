/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('documents').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('documents', function (table) {
                table.increments('id', 5).primary()
                table.integer('beasiswa_detail_id').unique()
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('documents')
};
