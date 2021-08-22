<template>
  <router-view></router-view>
</template>

<script lang="ts">
  import { Component, Watch, Vue } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';

  @Component
  export default class App extends Vue {
    @Getter('isAuthorized', { namespace: 'user' }) isAuthorized!: boolean;

    @Watch('isAuthorized')
    onChangeIsAuthorized(newValue: boolean) {
      const name = newValue ? 'home' : 'login';
      this.$router.push({ name });
    }
  }
</script>
