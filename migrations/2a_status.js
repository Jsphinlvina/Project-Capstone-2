/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('status').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('status', function (table) {
                table.string('id', 5).notNullable().primary()
                table.string('jenis_beasiswa_id', 5).notNullable()
                table.string('periode_id', 5).notNullable()
                table.date('tanggal_mulai').notNullable()
                table.date('tanggal_akhir').notNullable()
                table.boolean('status').notNullable().defaultTo(false)
                table.foreign('jenis_beasiswa_id').references('id').inTable('jenis_beasiswa')
                table.foreign('periode_id').references('id').inTable('periode')
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('status')
};
