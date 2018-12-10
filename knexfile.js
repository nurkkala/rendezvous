module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'tom',
            password: '',
            database: 'rendezvous'
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
