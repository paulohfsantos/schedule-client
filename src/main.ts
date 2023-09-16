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

import App from './App.vue'
import router from './router'

const app = createApp(App)

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
