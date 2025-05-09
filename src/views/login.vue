<template>
	<div class="container flex items-center justify-center h-screen mx-auto">
		<div class="p-6 border border-gray-500 w-96 rounded-xl">
			<h1 class="pb-4 text-5xl font-bold text-center uppercase">Login</h1>
			<Form v-on:submit="login" v-bind:validation-schema="validate" class="flex flex-col gap-8">
				<div class="flex flex-col gap-2">
					<label for="email">Email address</label>
					<Field v-model="email" name="email" type="email" class="p-2 border border-gray-400 rounded-lg"
						id="email" placeholder="Enter email" />
					<ErrorMessage class="text-red-700" name="email" />
				</div>
				<div class="flex flex-col gap-2">
					<label for="password">Password</label>
					<Field v-model="password" name="password" type="password"
						class="p-2 border border-gray-400 rounded-lg" id="password" placeholder="Enter password" />
					<ErrorMessage class="text-red-700" name="password" />
				</div>
				<div class="flex flex-col gap-2">
					<button type="submit" class="p-3 text-white bg-green-500 rounded-lg hover:opacity-75">Login</button>
					<RouterLink to="/register" class="text-right text-blue-700 underline hover:opacity-75">Register
					</RouterLink>
				</div>
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
				password: "",
				errorMessage: "",
			};
		},
		components: {
			Form,
			Field,
			ErrorMessage
		},
		computed: {
			validate() {
				return validator.login;
			}
		},
		methods: {
			async login() {
				await axios.post('http://laravel_1.test/api/login', {
					email: this.email,
					password: this.password
				}).then((res) => {
					if (res.data.code == 200) {
						localStorage.setItem('token', res.data.data.token);
						if (res.data.data.verified_at == null) {
							this.$router.push('/auth');
						} else {
							this.$router.push('/index');
						}
					} else {
						alert('Vui lòng kiểm tra lại thông tin!');
					}
				}).catch((e) => {
					console.log(e);
					alert('Không gọi được API');
				})
			}
		}
	}
</script>