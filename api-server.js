// Hapi and associated modules
const Hapi = require('hapi');
const Boom = require('boom');
const Joi = require('joi');

// Persistence
const Knex = require('knex');
const knex = Knex(require('./knexfile').development);

const {Model} = require('objection');
Model.knex(knex);

const Member = require('./models/Member');
const Team = require('./models/Team');

// Server configuration
const server = Hapi.server({
    host: 'localhost',
    port: 3000
});

server.route([
    {
        method: 'POST',
        path: '/api/members',
        config: {
            description: 'Sign UP a member',
            validate: {
                payload: {
                    firstName: Joi.string().min(2).description('First Name'),
                    lastName: Joi.string().min(2).description('Last Name'),
                    email: Joi.string().email().description('Email address'),
                    password: Joi.string().min(6).description('Password')
                }
            }
        },
        handler: async (request) => {
            const member = await Member.query().where('email', request.payload.email).first();
            if (member) {
                return Boom.preconditionFailed("Account already exists");
            }

            const response = await Member.query().insert({
                first_name: request.payload.firstName,
                last_name: request.payload.lastName,
                email: request.payload.email,
                password: request.payload.password
            }).then(result => {
                delete result.password;
                return result;
            }).catch(err => {
                return Boom.internal(err);
            });

            return response;
        }
    },
    {
        method: 'POST',
        path: '/api/members/signin',
        config: {
            description: 'Sign IN a member',
            validate: {
                payload: {
                    email: Joi.string().email().description('Member email address'),
                    password: Joi.string().min(6).description('Member password')
                }
            }
        },
        handler: async (request) => {
            const member = await Member.query().where('email', request.payload.email).first();
            if (!member || member.password != request.payload.password) {
                return Boom.unauthorized('Invalid email address or password');
            }
            return {
                id: member.id,
                first_name: member.first_name,
                last_name: member.last_name,
                email: member.email
            }
        }
    },
    {
        method: 'GET',
        path: '/api/members',
        config: {
            description: 'List all members'
        },
        handler: async () => {
            return await Member.query();
        }
    },
    {
        method: 'POST',
        path: '/api/teams',
        config: {
            description: 'Create a team',
            validate: {
                payload: {
                    name: Joi.string().min(6).description('Team Name')
                }
            }
        },
        handler: async (request) => {
            const response = await Team.query().insert({
                name: request.payload.name
            }).then(result => result,
                    err => Boom.internal(err));
            return response;
        }
    },
    {
        method: 'GET',
        path: '/api/teams',
        config: {
            description: 'List all teams'
        },
        handler: async () => {
            return await Team.query().eager('members');
        }
    },
    {
        method: 'POST',
        path: '/api/team-members',
        config: {
            description: 'Join a team',
            validate: {
                payload: {
                    teamId: Joi.number().min(1).description('Team ID'),
                    memberId: Joi.number().min(1).description('MemberID')
                }
            }
        },
        handler: async (request) => {
            const member = await Member.query()
                .findById(request.payload.memberId);
            await member
                .$relatedQuery('teams')
                .relate(request.payload.teamId);
            return await Team.query().eager('members');
        }
    },
    {
        method: 'DELETE',
        path: '/api/team-members',
        config: {
            description: 'Remove a member from a team',
            validate: {
                query: {
                    teamId: Joi.number().min(1).description('Team ID'),
                    memberId: Joi.number().min(1).description('MemberID')
                }
            }
        },
        handler: async (request) => {
            const member = await Member.query()
                .findById(request.query.memberId);
            await member
                .$relatedQuery('teams')
                .unrelate()
                .where('id', request.query.teamId);
            return await Team.query().eager('members');
        }
    }
]);

const start = async () => {
    await server.register([
        require('blipp'),       // Route listing
        require('inert'),       // Static files
        require('vision'),      // Templating
        require('lout')         // API visualization
    ]);

    await server.register({     // Logging
        plugin: require('hapi-pino'),
        options: {prettyPrint: true}
    });

    try {
        await server.start();
    } catch (err) {
        server.logger().error(err);
        process.exit(1);
    }

    server.logger().info(`Server running at ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    server.logger().error(err);
    process.exit(1);
});

start();
