/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.hasTable('users').then(function (exists){
      if (!exists){
          return knex.schema.createTable('users', function (table){
              table.string('id', 7).primary()
              table.string('name', 50).notNullable()
              table.string('email').notNullable()
              table.string('password').notNullable()
              table.boolean('status').notNullable().defaultTo(false)
              table.string('program_studi_id', 5).notNullable()
              table.string('role_id', 1).notNullable()
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
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
