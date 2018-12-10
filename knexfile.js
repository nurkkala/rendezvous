module.exports = {
    development: {
        client: 'pg',
        connection: {
            database: 'rendezvous',
            user: 'tom',
            password: ''
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};
