import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import * as globals from "./components";

const app = createApp(App);

// Register global components
Object.entries(globals).forEach(([name, component]) => {
    app.component(name, component);
});

app.mount("#app");
