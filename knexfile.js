module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/doggos.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  // knex migrate:latest --env testing
  // knex seed:run --env testing
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test_doggos.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  }

};
