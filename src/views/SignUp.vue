<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Sign Up</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form v-model="valid">
                        <v-text-field
                                v-model="newMember.firstName"
                                v-bind:rules="rules.required"
                                label="First name"
                        ></v-text-field>
                        <v-text-field
                                v-model="newMember.lastName"
                                v-bind:rules="rules.required"
                                label="Last name"
                        ></v-text-field>
                        <v-text-field
                                v-model="newMember.email"
                                v-bind:rules="rules.email"
                                error-count="10"
                                type="email"
                                label="Email address"
                        >
                        </v-text-field>
                        <v-text-field
                                v-model="newMember.password"
                                v-bind:rules="rules.password"
                                error-count="10"
                                type="password"
                                label="Password"
                                required
                        >
                        </v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" v-bind:disabled="!valid" v-on:click="handleSubmit">Sign Up</v-btn>
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
        name: "SignUpPage",
        data: function () {
            return {
                status: '',

                valid: false,

                newMember: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: ""
                },

                rules: {
                    required: [
                        val => val.length > 0 || 'Required'
                    ],
                    email: [
                        val => /^\w+@\w+\.\w{2,}$/.test(val) || "Invalid e-mail"
                    ],
                    password: [
                        val => /[A-Z]/.test(val) || "Need upper case letter",
                        val => /[a-z]/.test(val) || "Need lower case letter",
                        val => /\d/.test(val) || "Need digit",
                        val => val.length >= 8 || "Minimum 8 characters"
                    ]
                }
            };
        },
        methods: {
            handleSubmit: function () {
                axios.post("/api/members", {
                    firstName: this.newMember.firstName,
                    lastName: this.newMember.lastName,
                    email: this.newMember.email,
                    password: this.newMember.password,
                }).then(() => {
                    this.$router.push({name: 'sign-in'})
                }).catch(err => {
                    this.status = err.response.data.message;
                });
            }
        }
    }
</script>
