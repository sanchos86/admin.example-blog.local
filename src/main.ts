import 'reflect-metadata';
import Vue from 'vue';
import dayjs from 'dayjs';
import i18n from '@/i18n/i18n';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import '@/DI';
import '@/registerComponentHooks';
import '@/filters/filters';
import 'dayjs/locale/ru';

dayjs.locale('ru');
dayjs.extend(localizedFormat);

Vue.prototype.dayjs = dayjs;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
