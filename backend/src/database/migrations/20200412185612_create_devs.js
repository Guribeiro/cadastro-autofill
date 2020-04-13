
exports.up = function(knex) {
  return knex.schema.createTable('devs', function(table){
      table.string('id').primary();
      table.string('nome').notNullable;
      table.string('email').notNullable;
      table.string('whatsapp').notNullable;
      table.string('github_username').notNullable;
      table.string('avatar_url').notNullable;
      table.string('bio').notNullable;
      table.string('cep').notNullable;
      table.string('logradouro').notNullable;
      table.string('bairro').notNullable;
      table.string('localidade').notNullable;
      table.string('uf', 2).notNullable;
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('devs')
};
