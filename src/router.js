import { createWebHistory, createRouter } from "vue-router";

import login from "./views/login.vue";
import register from "./views/register.vue";
import auth from "./views/auth.vue";
import index from "./views/index.vue";

const routes = [
	{
		path: '/login',
		name: 'loginnnnnnnn',
		component:  login
	},
	{
		path: '/register',
		component: register
	},
	{
		path: '/auth',
		component: auth
	},
	{
		path: '/index',
		component: index
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router