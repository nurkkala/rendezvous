const {Model} = require('objection');

const Member = require('../models/Member');
const Team = require('../models/Team');

exports.seed = async function (knex) {
    Model.knex(knex);

    await knex('team_members').del();
    await knex('teams').del();
    await knex('members').del();

    await Member.query().insertGraph([
        {
            first_name: 'Fred',
            last_name: 'Ziffle',
            email: 'fred@example.com',
            password: 'Password99',
            teams: [
                {
                    '#id': 'team-crosby',
                    name: "Crosby's Four Absolutes"
                },
                {
                    name: 'Everything is Awesome'
                }
            ]
        },
        {
            first_name: 'Zelda',
            last_name: 'Ziffle',
            email: 'zelda@example.com',
            password: 'Password99',
            teams: [
                {
                    '#ref': 'team-crosby'
                }
            ]
        }
    ]);

    await Team.query().insertGraph([
        {name: 'Nerds for Christ'},
        {name: 'Taylor Teapots'}
    ]);
};
