<style>
	#register-panel {
		margin: 0 auto;
	}

	#register-form {
		margin: 20% auto;
		border: 1px solid #00000057;
		padding: 25px;
		border-radius: 15px;
	}
</style>

<template>
	<div class="container" id="register-panel">
		<div class="col-md-3" id="register-form">
			<h1>REGISTER</h1>
			<form>
				<div class="form-group mb-2">
					<label for="email">Email</label>
					<input v-model="email" type="email" class="form-control" id="email" placeholder="email" required>
				</div>
				<div class="form-group mb-2">
					<label for="password">Password</label>
					<input v-model="password" type="password" class="form-control" id="password" placeholder="password"
						required>
				</div>
				<div class="form-group mb-2">
					<label for="re-password">Re Password</label>
					<input v-model="re_password" type="password" class="form-control" id="re-password"
						placeholder="re password" required>
				</div>
				<div class="d-flex align-items-center justify-content-between">
					<button v-on:click="register" type="button" class="btn btn-primary">Submit</button>
					<RouterLink to="/login">Login</RouterLink>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				email: "",
				password: "",
				re_password: ""
			}
		},
		methods: {
			async register() {
				try {
					await axios.post('http://laravel_1.test/api/register', {
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