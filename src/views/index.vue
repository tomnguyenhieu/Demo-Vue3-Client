<template>
	<button type="button" v-on:click.prevent="logout()" class="p-6 text-2xl hover:opacity-75">Logout</button>
	<div class="container flex flex-col items-center justify-center h-screen gap-6 mx-auto">
		<button type="button" v-on:click.prevent="index()"
			class="px-16 py-4 text-3xl text-white bg-green-500 rounded-2xl hover:opacity-75">Get files</button>
		<ul v-if="files != null" class="flex flex-col gap-4">
			<li v-for="file in files" class="text-2xl cursor-pointer hover:opacity-75">{{ file.name }}</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				token: '',
				files: []
			}
		},
		mounted() {
			this.token = localStorage.getItem('token');
		},
		methods: {
			async logout() {
				await axios.get('http://laravel_1.test/api/logout', {
					'headers': {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then((res) => {
					if (res.data.code == 200) {
						localStorage.clear();
						this.$router.push('/login');
					}
				}).catch((e) => {
					console.log(e);
					alert(e);
				})
			},
			async index() {
				await axios.get('http://laravel_1.test/api/user/index', {
					'headers': {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + this.token
					}
				}).then((res) => {
					if (res.data.code == 200) {
						this.files = res.data.data.files;
					}
				}).catch((e) => {
					console.log(e);
					alert('Call API failed');
				})
			}
		}
	}
</script>