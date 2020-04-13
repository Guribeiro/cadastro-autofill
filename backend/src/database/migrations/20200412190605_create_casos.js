
exports.up = function(knex) {
  return knex.schema.createTable('casos', function(table){

    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('dev_id').notNullable();

    table.foreign('dev_id').references('id').inTable('devs');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('casos');
};
