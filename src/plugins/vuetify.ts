import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ru from 'vuetify/src/locale/ru';

import store from '@/store';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ru },
    current: store.state.language,
  },
});
