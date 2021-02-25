<template>
  <v-app>
    <AlertManager />
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <template v-for="item in menuItems">
          <v-list-group
              v-if="item.children"
              v-model="item.model"
              :key="item.text"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
                v-for="(child, i) in item.children"
                :to="child.to"
                :key="i"
                link
                exact
            >
              <v-list-item-action>
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
              v-else
              :key="item.text"
              :to="item.to"
              link
              exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
    <v-app-bar color="primary" clipped-left app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-spacer></v-spacer>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon :loading="loading.logout" v-bind="attrs" v-on="on" @click="logout">
            <v-icon>mdi-export</v-icon>
          </v-btn>
        </template>
        <span>Выход</span>
      </v-tooltip>
    </v-app-bar>
  </v-app>
</template>

<script lang="ts">
import { Container } from 'typedi';
import { Component, Vue } from 'vue-property-decorator';

import menuItems from '@/constants/menuItems';
import tokens from '@/services/tokens';
import type { Loading } from '@/typings/misc';

import AlertManager from '@/components/common/AlertManager.vue';

@Component({
  components: {
    AlertManager,
  },
})
export default class Internal extends Vue {
  drawer = true;

  menuItems: Record<string, any>[] = menuItems;

  loading: Loading = {
    logout: false,
  };

  async logout() {
    try {
      this.loading.logout = true;
      await Container.get(tokens.AUTH_SERVICE).logout();
      // await Container.get(tokens.ROOT_SERVICE).resetState(); TODO !!!
      await this.$router.push({ name: 'login' });
    } finally {
      this.loading.logout = false;
    }
  }
}
</script>
