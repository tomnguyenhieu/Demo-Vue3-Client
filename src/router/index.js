import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/views/auth.vue'
import login from '@/views/login.vue'
import register from '@/views/register.vue'
import index from "@/views/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
		path: '/login',
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
  ],
})

export default router
