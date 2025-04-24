import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// App use
app.use(router);

// App mount
app.mount("#app");
