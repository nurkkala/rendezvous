const {Model} = require('objection');

class Member extends Model {
    static get tableName() {
        return 'members';
    }

    static get relationMappings() {
        return {
            teams: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./Team'),
                join: {
                    from: 'members.id',
                    to: 'teams.id',
                    through: {
                        from: 'team_members.member_id',
                        to: 'team_members.team_id'
                    }
                }
            }
        }
    }
}

module.exports = Member;
