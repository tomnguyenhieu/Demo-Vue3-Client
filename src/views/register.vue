<template>
	<div class="container mx-auto h-screen flex items-center justify-center">
		<div class="w-96 border-gray-500 border rounded-xl p-6">
			<h1 class="text-5xl font-bold text-center pb-4 uppercase">Register</h1>
			<Form v-on:submit="register" v-bind:validation-schema="validate" class="flex flex-col gap-8">
				<div class="flex flex-col gap-2">
					<label for="name">Name</label>
					<Field v-model="name" name="name" type="text" class="p-2 border border-gray-400 rounded-lg"
						id="name" placeholder="Enter name" />
					<ErrorMessage class="text-red-700" name="name" />
				</div>
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
					<label for="re_password">Re password</label>
					<Field v-model="re_password" name="re_password" type="password"
						class="p-2 border border-gray-400 rounded-lg" id="re_password"
						placeholder="Enter re password" />
					<ErrorMessage class="text-red-700" name="re_password" />
				</div>
				<div class="flex flex-col gap-2">
					<button type="submit" class="bg-green-500 p-3 hover:opacity-75 text-white rounded-lg">Login</button>
					<RouterLink to="/login" class="text-right text-blue-700 underline hover:opacity-75">Login
					</RouterLink>
				</div>
			</Form>
		</div>
	</div>
</template>

<script>
	import { Form, Field, ErrorMessage } from 'vee-validate';
	import validator from '@/validator/validator';
	import axios from 'axios';

	export default {
		data() {
			return {
				name: '',
				email: '',
				password: '',
				re_password: ''
			}
		},
		components: {
			Form,
			Field,
			ErrorMessage
		},
		computed: {
			validate() {
				return validator.register;
			}
		},
		methods: {
			async register() {
				try {
					await axios.post('http://laravel_1.test/api/register', {
						name: this.name,
						email: this.email,
						password: this.password
					}).then((res) => {
						if (res.data.code == 200) {
							this.$router.push('/login');
						} else {
							console.log(res.data);
							alert('Vui lòng kiểm tra lại thông tin!');
						}
					}).catch((e) => {
						console.log(e);
						alert('Không gọi được API');
					})
				} catch (error) {
					console.log(error);
				}
			}
		}
	}
</script>