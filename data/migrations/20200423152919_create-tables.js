exports.up = function(knex, Promise) {
  return knex.schema.createTable('doggos', tbl => {
    tbl.increments();
    tbl.string('name', 255).notNullable().unique();
    tbl.string('breed', 255);
  });
};

exports.down = function(knex, Promise) {
  // undo the operation in up
  return knex.schema.dropTableIfExists('doggos');
};
