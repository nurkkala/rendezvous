/* eslint-disable no-unused-vars */
exports.up = async function (knex, Promise) {
    await knex.schema.createTable('members', table => {
        table.increments();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
    });

    await knex.schema.createTable('teams', table => {
        table.increments();
        table.string('name').notNullable();
    });

    await knex.schema.createTable('team_members', table => {
        table.integer('member_id').unsigned().notNullable().references('members.id');
        table.integer('team_id').unsigned().notNullable().references('teams.id');
        table.primary(['member_id', 'team_id']);
    });

    await knex.schema.createTable('commitments', table => {
        table.increments();
        table.string('title').notNullable();
        table.dateTime('start').notNullable();
        table.dateTime('stop').notNullable();
        table.integer('member_id').unsigned().notNullable().references('members.id');
    });

    await knex.schema.createTable('core_hours', table => {
        table.increments();
        table.date('date').notNullable();
        table.time('start').notNullable();
        table.time('stop').notNullable()
        table.integer('member_id').unsigned().notNullable().references('members.id');
    });

    await knex.schema.createTable('activity', table => {
        table.increments();
        table.string('title').notNullable();
        table.float('duration').notNullable();
    });

    await knex.schema.createTable('time_slot', table => {
        table.increments();
        table.dateTime('start').notNullable();
        table.dateTime('stop').notNullable();
        table.integer('activity_id').unsigned().notNullable().references('activity.id');
    });

    await knex.schema.createTable('member_vote', table => {
        table.integer('member_id').unsigned().notNullable().references('members.id');
        table.integer('time_slot_id').unsigned().notNullable().references('time_slot.id');
        table.boolean('accept');
    });
};

exports.down = async function (knex, Promise) {
    await knex.schema.dropTable('member_vote');
    await knex.schema.dropTable('time_slot');
    await knex.schema.dropTable('activity');
    await knex.schema.dropTable('core_hours');
    await knex.schema.dropTable('commitments');
    await knex.schema.dropTable('team_members');
    await knex.schema.dropTable('teams');
    await knex.schema.dropTable('members');
};
