import '@/registerComponentHooks';
import 'reflect-metadata';
import Vue from 'vue';
import dayjs from 'dayjs';
import { Container } from 'typedi';
import Vuelidate from 'vuelidate';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import VueQuillEditor from 'vue-quill-editor';
import i18n from '@/i18n/i18n';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import tokens from '@/services/tokens';
import '@/DI';
import '@/filters/filters';
import 'dayjs/locale/ru';
/* eslint-disable import/no-extraneous-dependencies */
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
/* eslint-enable import/no-extraneous-dependencies */
import 'highlight.js/styles/ocean.css';

dayjs.locale('ru');
dayjs.extend(localizedFormat);

Vue.use(Vuelidate);
Vue.use(VueQuillEditor);

Vue.prototype.dayjs = dayjs;
Vue.config.productionTip = false;

const init = async () => {
  const tokenService = Container.get(tokens.TOKEN_SERVICE);
  const authService = Container.get(tokens.AUTH_SERVICE);
  const userServices = Container.get(tokens.USERS_SERVICE);
  const accessToken = tokenService.getAccessToken();
  if (accessToken) {
    const accessTokenValid = tokenService.checkAccessTokenValidity();
    if (accessTokenValid) {
      try {
        await authService.refresh();
        await userServices.getProfile();
      } catch (e) {
        tokenService.removeAccessToken();
        tokenService.removeExpirationDate();
      }
    } else {
      tokenService.removeAccessToken();
      tokenService.removeExpirationDate();
    }
  }
};

(async () => {
  try {
    await init();
  } finally {
    new Vue({
      router,
      store,
      vuetify,
      i18n,
      render: (h) => h(App),
    }).$mount('#app');
  }
})();
