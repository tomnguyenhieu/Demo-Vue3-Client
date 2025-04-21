import * as yup from 'yup';

const validator  = {
	login: yup.object({
		email: yup.string().required('Vui lòng nhập email của bạn').email('Vui lòng nhập đúng định dạng của email'),
		password: yup.string().required('Vui lòng nhập mật khẩu của bạn')
	}),
	register: yup.object({
		email: yup.string().required('Vui lòng nhập email của bạn').email('Vui lòng nhập đúng định dạng của email'),
		password: yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Vui lòng nhập mật khẩu có độ dài tối thiểu 8 ký tự'),
		re_password: yup.string().required('Vui lòng nhập lại mật khẩu').oneOf([yup.ref('password')], 'Mật khẩu chưa giống nhau')
	})
}

export default validator