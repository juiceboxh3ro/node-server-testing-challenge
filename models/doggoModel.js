const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(doggo) {
  return db('doggos').insert(doggo, 'id')
}

async function update(id, changes) {
  return null;
}

async function remove(id) {
  return db('doggos').where({ id }).del()
}

function getAll() {
  return db('doggos');
}

function findById(id) {
  return db('doggos').where({ id }).first();
}
