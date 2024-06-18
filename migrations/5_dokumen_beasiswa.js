/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('dokumen_beasiswa', function (table) {
        table.string('jenis_beasiswa_id', 5).notNullable()
        table.string('periode_id', 5).notNullable()
        table.string('mahasiswa_id', 7).notNullable()
        table.boolean('approval').notNullable().defaultTo(false)
        table.timestamp('create_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.fn.now())
        table.foreign('jenis_beasiswa_id').references('id').inTable('jenis_beasiswa').onUpdate('CASCADE').onDelete('RESTRICT')
        table.foreign('periode_id').references('id').inTable('periode').onUpdate('CASCADE').onDelete('RESTRICT')
        table.foreign('mahasiswa_id').references('id').inTable('mahasiswa').onUpdate('CASCADE').onDelete('RESTRICT')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('dokumen_beasiswa')
};
