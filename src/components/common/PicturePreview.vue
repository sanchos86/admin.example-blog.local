<template>
  <v-img class="picture-preview" max-width="100%" :src="src">
    <v-btn
      class="picture-preview__remove-picture-icon"
      color="error"
      depressed
      x-small
      dark
      fab
      @click="removePicture"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-img>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class PicturePreview extends Vue {
    @Prop({ type: String, required: true }) readonly src!: string;

    removePicture() {
      this.$emit('remove-picture');
    }
  }
</script>

<style lang="scss" scoped>
  .picture-preview {
    &__remove-picture-icon {
      position: absolute;
      top: map_get($gaps, 2);
      right: map_get($gaps, 2);
    }
  }
</style>
