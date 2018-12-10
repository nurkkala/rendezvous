<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>New Team</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form v-model="valid">
                        <v-text-field
                                v-model="name"
                                v-bind:rules="rules.required"
                                label="Name"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary"
                           v-bind:disabled="!valid"
                           v-on:click="handleSubmit">Create
                    </v-btn>
                </v-card-actions>
                <v-card-text v-show="status">
                    <v-alert v-bind:value="true" type="warning">
                        {{ status }}
                    </v-alert>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Team",
        data: function () {
            return {
                status: '',
                valid: false,

                name: '',
                rules: {
                    required: [
                        val => val.length > 0 || 'Required'
                    ]
                }
            };
        },
        methods: {
            handleSubmit: function () {
                axios.post("/api/teams", {
                    name: this.name,
                }).then(() => {
                    this.$router.push({name: 'member'})
                }).catch(err => {
                    this.status = err.response.data.message;
                });
            }
        }
    }
</script>
