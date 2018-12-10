<template>
    <v-container fluid grid-list-md>
        <TeamList title="Teams You're On"
                  button-label="Leave" button-color="error"
                  v-bind:teams="myTeams"
                  v-on:team-action="leaveTeam"></TeamList>
        <TeamList title="Teams You Can Join"
                  button-label="Join" button-color="primary"
                  v-bind:teams="otherTeams"
                  v-on:team-action="joinTeam"></TeamList>
        <v-btn flat v-bind:to="{name: 'team'}">Add a Team</v-btn>
    </v-container>
</template>

<script>
    import axios from 'axios';
    import {mapState} from 'vuex';
    import TeamList from '../components/TeamList';

    function isOnTeam(member, team) {
        return team.members.find(m => m.id === member.id);
    }

    export default {
        name: "Teams",
        components: {
            TeamList
        },
        data() {
            return {
                allTeams: []
            }
        },
        mounted() {
            axios.get('/api/teams')
                .then(response => {
                    this.allTeams = response.data;
                });
        },
        computed: {
            myTeams() {
                if (!this.currentMember) {
                    return [];
                }
                return this.allTeams.filter(team => isOnTeam(this.currentMember, team));
            },
            otherTeams() {
                if (!this.currentMember) {
                    return [];
                }
                return this.allTeams.filter(team => !isOnTeam(this.currentMember, team));
            },

            ...mapState(['currentMember'])
        },
        methods: {
            joinTeam(teamId) {
                axios
                    .post('/api/team-members',
                        {
                            teamId: teamId,
                            memberId: this.currentMember.id
                        })
                    .then(response => this.allTeams = response.data);
            },
            leaveTeam(teamId) {
                axios
                    .delete('/api/team-members', {
                        params: {
                            teamId: teamId,
                            memberId: this.currentMember.id
                        }
                    })
                    .then(response => this.allTeams = response.data);
            }
        }
    }
</script>
