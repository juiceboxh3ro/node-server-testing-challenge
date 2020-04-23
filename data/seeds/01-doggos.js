exports.seed = function(knex, Promise) {
  return knex('doggos')
    .truncate()
    .then(function() {
      return knex('doggos').insert([
        {
          name: 'sam',
          breed: 'chihuahua'
        }
      ]);
    });
};
