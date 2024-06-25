/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.hasTable('mahasiswa').then(function (exists) {
        if (!exists) {
            return knex.schema.createTable('mahasiswa', function (table) {
                table.string('id', 7).primary()
                table.string('name', 50).notNullable()
                table.string('email').notNullable()
                table.string('password').notNullable()
                table.string('program_studi_id', 5).notNullable()
                table.string('role_id', 1).notNullable()
                table.string('ipk').notNullable()
                table.string('angkatan', 4).notNullable()
                table.string('no_tlp', 20).notNullable()
                table.string('alamat', 50).notNullable()
                table.foreign('role_id').references('id').inTable('roles').onUpdate('CASCADE').onDelete('RESTRICT')
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
