/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('beasiswa_detail').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('beasiswa_detail', function (table) {
                table.increments('id').primary()
                table.string('jenis_beasiswa_id', 5).notNullable()
                table.string('mahasiswa_nrp', 7).notNullable()
                table.boolean('approval').notNullable().defaultTo(false)
                table.timestamp('create_at').defaultTo(knex.fn.now())
                table.timestamp('update_at').defaultTo(knex.fn.now())
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('fakultas')
};
