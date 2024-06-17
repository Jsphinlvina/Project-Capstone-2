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
                table.string('periode', 50).notNullable()
                table.date('tanggal_mulai').notNullable()
                table.date('tanggal_akhir').notNullable()
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
    return knex.schema.dropTableIfExists('jenis_beasiswa')
};
