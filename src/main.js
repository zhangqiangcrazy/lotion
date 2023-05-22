import { createApp } from 'vue';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { MdDragindicator, HiTrash, HiPlus, HiSolidSearch, BiTextLeft, BiTypeH1, BiTypeH2, BiTypeH3, BiHr, BiQuote } from "oh-vue-icons/icons";
import App from './App.vue';
import './index.css';
addIcons(MdDragindicator, HiTrash, HiPlus, HiSolidSearch, BiTextLeft, BiTypeH1, BiTypeH2, BiTypeH3, BiHr, BiQuote);
const app = createApp(App);
app.use(ElementPlus);
app.component("v-icon", OhVueIcon);
app.mount('#app');
//# sourceMappingURL=main.js.map