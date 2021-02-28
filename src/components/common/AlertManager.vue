<template>
  <div class="alert-manager">
    <v-alert
      v-for="(alert, index) in alerts"
      :key="index"
      :type="alert.type"
      :icon="false"
      dismissible
      @input="removeAlert(alert)"
    >
      {{ alert.data.text }}
      <template v-if="hasDetails(alert.data.details)">
        <br />
        <span class="alert-manager__details">{{ alert.data.details }}</span>
      </template>
    </v-alert>
  </div>
</template>

<script lang="ts">
  import { Container } from 'typedi';
  import { Component, Vue } from 'vue-property-decorator';
  import { State } from 'vuex-class';

  import Alert from '@/models/Alert';
  import tokens from '@/services/tokens';

  @Component
  export default class AlertManager extends Vue {
    @State('alerts', { namespace: 'alerts' }) alerts!: Alert[];

    removeAlert(alert: Alert) {
      Container.get(tokens.ALERTS_SERVICE).removeAlert(alert);
    }

    hasDetails(details?: string): boolean {
      return !!details;
    }
  }
</script>

<style lang="scss" scoped>
  .alert-manager {
    position: fixed;
    top: 1rem;
    min-width: 320px;
    max-width: 100%;
    z-index: map_get($z-indices, 25);
    left: 50%;
    transform: translate(-50%, 0);
    box-sizing: border-box;

    &__details {
      white-space: pre;
    }
  }
</style>
