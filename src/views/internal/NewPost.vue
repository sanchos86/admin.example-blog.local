<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Новая запись</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class NewPost extends Vue {}
</script>
