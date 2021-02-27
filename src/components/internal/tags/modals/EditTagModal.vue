<template>
  <div class="d-inline-flex"></div>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';

  import ValidationMixin from '@/mixins/ValidationMixin';

  @Component
  export default class EditTagModal extends mixins(ValidationMixin) {
    validations() {
      return {};
    }
  }
</script>

<style scoped>

</style>
