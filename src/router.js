import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Member from './views/Member';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Team from './views/Team';
import Guest from './views/Guest';

export default new Router({
    mode: 'history',
    routes: [
        {path: '/', name: 'guest', component: Guest},
        {path: '/member', name: 'member', component: Member},
        {path: '/sign-up', name: 'sign-up', component: SignUp},
        {path: '/sign-in', name: 'sign-in', component: SignIn},
        {path: '/team', name: 'team', component: Team}
    ]
})
