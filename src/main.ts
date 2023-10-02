import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import updateLocale from "dayjs/plugin/updateLocale";
import weekOfYear from "dayjs/plugin/weekOfYear";

import Toast, { POSITION } from "vue-toastification";
import type { PluginOptions } from 'vue-toastification'
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

const options: PluginOptions = {
  draggable: true,
  position: "top-right" as POSITION,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  hideProgressBar: false,
  icon: true,
}

const app = createApp(App)

app.use(Toast, options)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

dayjs.extend(weekday);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: -1,
});
dayjs.extend(weekOfYear);

app.mount('#app')
