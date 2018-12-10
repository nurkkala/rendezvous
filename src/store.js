import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentMember: null
    },
    mutations: {
        setCurrentMember(state, member) {
            state.currentMember = member;
        },
        clearCurrentMember(state) {
            state.currentMember = null;
        }
    },
    actions: {}
})
