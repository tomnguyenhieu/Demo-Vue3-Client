import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js"
import { Form, Field, ErrorMessage } from 'vee-validate';

const app = createApp(App)

// App use
app.use(router)

// App components
app
	.component('vee-form', Form)
   	.component('vee-field', Field)
   	.component('vee-error-message', ErrorMessage)

// App mount
app.mount("#app");