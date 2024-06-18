/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('mahasiswa').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('mahasiswa', function (table) {
                table.increments('id').primary()
                table.string('user_nrp', 7).unique()
                table.string('user_name', 50).notNullable()
                table.string('fakultas_id', 5).notNullable()
                table.string('program_studi_id', 5).notNullable()
                table.float('ipk').notNullable()
                table.string('angkatan', 4).notNullable()
                table.string('no_tlp', 20).notNullable()
                table.string('alamat', 50).notNullable()
                table.boolean('status').notNullable().defaultTo(true)
                table.foreign('user_nrp').references('nrp').inTable('users').onUpdate('CASCADE').onDelete('RESTRICT')
                table.foreign('user_name').references('name').inTable('users').onUpdate('CASCADE').onDelete('RESTRICT')
                table.foreign('fakulas_id').references('id').inTable('fakultas').onUpdate('CASCADE').onDelete('RESTRICT')
                table.foreign('program_studi_id').references('id').inTable('program_studi').onUpdate('CASCADE').onDelete('RESTRICT')
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('mahasiswa')
};
