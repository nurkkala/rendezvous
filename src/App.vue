<template>
    <v-app id="app">
        <Toolbar></Toolbar>
        <v-content>
            <v-container>
                <router-view/>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
    import Toolbar from "./components/Toolbar";

    export default {
        components: {
            Toolbar
        }
    }
</script>