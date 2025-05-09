<template>
	<div class="container flex items-center justify-center h-screen mx-auto">
		<div class="p-6 border border-gray-500 w-96 rounded-xl">
			<h1 class="pb-4 text-5xl font-bold text-center uppercase">Register</h1>
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
					<button type="submit"
						class="p-3 text-white bg-green-500 rounded-lg hover:opacity-75">Submit</button>
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
							alert('Đăng ký thành công!')
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