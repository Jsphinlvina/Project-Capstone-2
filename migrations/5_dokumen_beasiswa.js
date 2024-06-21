/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('dokumen_beasiswa', function (table) {
        table.string('jenis_beasiswa_id', 5).notNullable()
        table.string('periode_id', 5).notNullable()
        table.string('mahasiswa_id', 7).notNullable()
        table.string('jenis_dokumen_id', 5).notNullable()
        table.string('path', ).notNullable()
        table.timestamp('create_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.fn.now())
        table.foreign('jenis_beasiswa_id').references('jenis_beasiswa_id').inTable('beasiswa_detail').onUpdate('CASCADE').onDelete('RESTRICT')
        table.foreign('periode_id').references('periode_id').inTable('beasiswa_detail').onUpdate('CASCADE').onDelete('RESTRICT')
        table.foreign('mahasiswa_id').references('mahasiswa_id').inTable('beasiswa_detail').onUpdate('CASCADE').onDelete('RESTRICT')
        table.foreign('jenis_dokumen_id').references('id').inTable('jenis_dokumen').onUpdate('CASCADE').onDelete('RESTRICT')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('dokumen_beasiswa')
};
