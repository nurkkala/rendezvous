<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Sign In</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form v-model="valid">
                        <v-text-field v-model="email"
                                      v-bind:rules="rules.email"
                                      prepend-icon="person"
                                      label="Email Address"
                                      type="text"></v-text-field>
                        <v-text-field v-model="password"
                                      v-bind:rules="rules.password"
                                      prepend-icon="lock"
                                      label="Password"
                                      type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-bind:disabled="!valid"
                           v-on:click="handleLogin"
                           color="primary">Login
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
    import axios from 'axios';
    import {mapMutations} from 'vuex';

    export default {
        name: "SignIn",
        data() {
            return {
                valid: false,
                email: '',
                password: '',

                status: '',

                rules: {
                    email: [
                        val => /^\w+@\w+\.\w{2,}$/.test(val) || 'Invalid email address'
                    ],
                    password: [
                        val => /[a-z]/.test(val) || 'Need lower-case letter',
                        val => /[A-Z]/.test(val) || 'Need upper-case letter',
                        val => /\d/.test(val) || 'Need digit',
                        val => val.length >= 6 || 'Minimum 6 characters'
                    ]
                }
            }
        },
        methods: {
            handleLogin() {
                axios.post('/api/members/signin', {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    this.setCurrentMember(response.data);
                    this.$router.push({name: 'member'})
                }).catch(err => {
                    this.status = err.response.data.message;
                });
            },
            ...mapMutations(['setCurrentMember'])
        }
    }
</script>

<style scoped>

</style>