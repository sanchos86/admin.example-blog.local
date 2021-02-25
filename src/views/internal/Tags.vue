<template>
  <div class="tags">Tags</div>
</template>

<script lang="ts">
  import { Container } from 'typedi';
  import { Component, Vue } from 'vue-property-decorator';

  import tokens from '@/services/tokens';

  @Component
  export default class Tags extends Vue {
    async created() {
      const s = await Container.get(tokens.TAGS_SERVICE).getTags();
      console.log(s);
    }
  }
</script>

<style scoped>

</style>
