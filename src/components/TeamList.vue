<template>
    <v-layout>
        <v-flex xs12 sm6 md4 lg4>
            <v-card>
                <v-card-title><h4>{{ title}}</h4></v-card-title>
                <v-divider></v-divider>
                <v-list dense v-if="teams.length">
                    <v-list-tile v-for="team in teams" v-bind:key="team.id">
                        <v-list-tile-content>
                            {{ team.name }} {{ memberCount(team) }}
                        </v-list-tile-content>
                        <v-list-tile-content class="align-end">
                            <v-btn small flat
                                   v-bind:color="buttonColor"
                                   v-on:click="$emit('team-action', team.id)">
                                {{ buttonLabel }}
                            </v-btn>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "TeamList",
        props: {
            title: {
                type: String,
                required: true
            },
            teams: {
                type: Array,
                required: true
            },
            buttonColor: {
                type: String,
                default: 'error'
            },
            buttonLabel: {
                type: String,
                default: 'Join'
            }
        },
        methods: {
            memberCount (team) {
                const count = team.members.length;
                return `(${count} member${count == 1 ? '' : 's'})`;
            }
        }
    }
</script>
