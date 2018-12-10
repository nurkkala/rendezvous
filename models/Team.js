const {Model} = require('objection');

class Team extends Model {
    static get tableName() {
        return 'teams';
    }

    static get relationMappings() {
        return {
            members: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./Member'),
                join: {
                    from: 'teams.id',
                    to: 'members.id',
                    through: {
                        from: 'team_members.team_id',
                        to: 'team_members.member_id'
                    }
                }
            }
        }
    }
}

module.exports = Team;
