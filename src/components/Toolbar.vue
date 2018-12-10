<template>
    <v-toolbar app>
        <router-link v-bind:to="mainPage"
                     tag="v-toolbar-title"
                     class="headline text-uppercase">
            <span class="font-weight-bold">Redezvous</span>
            <span class="font-weight-light">COS 243</span>
        </router-link>
        <v-spacer></v-spacer>
        <template v-if="currentMember">
            <v-btn flat v-on:click="logOut">Log Out {{ fullName }}</v-btn>
        </template>
        <template v-else>
            <v-btn flat v-bind:to="{name: 'sign-up'}">Sign Up</v-btn>
            <v-btn flat v-bind:to="{name: 'sign-in'}">Sign In</v-btn>
        </template>
    </v-toolbar>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';

    export default {
        name: "Toolbar",
        computed: {
            fullName: function () {
                return `${this.currentMember.first_name} ${this.currentMember.last_name}`;
            },
            mainPage: function () {
                return {name: this.currentMember ? 'member' : 'guest'};
            },
            ...mapState(['currentMember'])
        },
        methods: {
            logOut() {
                this.clearCurrentMember();
                this.$router.push({name: 'guest'})
            },
            ...mapMutations(['clearCurrentMember'])
        }
    }
</script>
