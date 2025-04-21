<style>
	#login-panel {
		margin: 0 auto;
	}

	#login-form {
		margin: 20% auto;
		border: 1px solid #00000057;
		padding: 25px;
		border-radius: 15px;
	}
</style>

<template>
	<div class="container" id="login-panel">
		<div class="col-md-3" id="login-form">
			<h1>LOGIN</h1>
			<vee-form v-on:submit="login" v-bind:validation-schema="validate">
				<div class="form-group mb-2">
					<label for="email">Email address</label>
					<vee-field v-model="email" name="email" type="email" class="form-control" id="email"
						placeholder="Enter email" />
					<vee-error-message class="error-message" name="email" />
				</div>
				<div class="form-group mb-2">
					<label for="password">Password</label>
					<vee-field v-model="password" name="password" type="password" class="form-control" id="password"
						placeholder="Enter password" />
					<vee-error-message class="error-message" name="password" />
				</div>
				<div class="d-flex justify-content-sm-between align-items-center">
					<button type="submit" class="btn btn-primary">Login</button>
					<RouterLink to="/register">Register</RouterLink>
				</div>
			</vee-form>
		</div>
	</div>
</template>

<script>
	import validator from '@/validator';
	import axios from 'axios';

	export default {
		data() {
			return {
				email: "",
				password: "",
				errorMessage: "",
				user: null
			};
		},
		computed: {
			validate: () => {
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
						this.user = res.data.data;
						if (this.user.status != 2) {
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