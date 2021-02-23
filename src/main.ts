import 'reflect-metadata';
import Vue from 'vue';
import i18n from '@/i18n/i18n';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import '@/DI';
import '@/registerComponentHooks';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
