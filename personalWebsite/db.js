const knex = require('knex');

module.exports = knex({
    client: "postgres",
    connection: {
    host: "db",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'postgres',
    },
})