<template>
	<div class="container flex items-center justify-center h-screen mx-auto">
		<div class="p-6 border border-gray-500 w-96 rounded-xl">
			<h1 class="pb-4 text-5xl font-bold text-center uppercase">Auth</h1>
			<Form v-on:submit="auth" v-bind:validation-schema="validate" class="flex flex-col gap-8">
				<div class="flex flex-col gap-2">
					<label for="email">Email address</label>
					<Field v-model="email" name="email" type="email" class="p-2 border border-gray-400 rounded-lg"
						id="email" placeholder="Enter email" />
					<ErrorMessage class="text-red-700" name="email" />
				</div>
				<div class="flex flex-col gap-2">
					<label for="code">Code</label>
					<Field v-model="code" name="code" type="text" class="p-2 border border-gray-400 rounded-lg"
						id="password" placeholder="Enter code" />
					<ErrorMessage class="text-red-700" name="code" />
				</div>
				<div class="flex gap-2">
					<button type="submit"
						class="p-3 text-white bg-green-500 rounded-lg grow hover:opacity-75">Authenticate</button>
					<button type="button" v-on:click="sendCode()"
						class="px-4 py-3 text-white bg-orange-500 rounded-lg hover:opacity-75">Send
						code</button>
				</div>
				<RouterLink to="/login" class="text-right text-blue-700 underline hover:opacity-75">Login
				</RouterLink>
			</Form>
		</div>
	</div>
</template>

<script>
	import validator from '@/validator/validator';
	import { Form, Field, ErrorMessage } from 'vee-validate';
	import axios from 'axios';

	export default {
		data() {
			return {
				email: "",
				code: "",
				errorMessage: "",
				token: "",
				authCode: ""
			};
		},
		mounted() {
			this.token = localStorage.getItem('token');
		},
		components: {
			Form,
			Field,
			ErrorMessage
		},
		computed: {
			validate() {
				return validator.auth;
			}
		},
		methods: {
			async sendCode() {
				if (this.email != "") {
					await axios.get('http://laravel_1.test/api/send-code', {
						'params': {
							'email': this.email
						},
						'headers': {
							'Authorization': 'Bearer ' + this.token
						}
					}).then((res) => {
						if (res.data.code == 200) {
							this.authCode = res.data.data.code;
						}
					}).catch((e) => {
						console.log(e);
						alert('Không gọi được API');
					})
				} else {
					alert('Vui lòng nhập email của bạn');
				}
			},
			async auth() {
				await axios.post();
			}
		}
	}
</script>