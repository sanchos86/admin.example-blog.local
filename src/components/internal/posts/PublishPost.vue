<template>
  <v-btn
      color="primary"
      class="mr-2"
      size="small"
      small
      :loading="loading.publishPost"
      @click="publishPost"
  >
    {{ post.publishedAt ? 'Скрыть' : 'Опубликовать' }}
  </v-btn>
</template>

<script lang="ts">
  import { Container } from 'typedi';
  import { Component, Vue, Prop } from 'vue-property-decorator';

  import tokens from '@/services/tokens';
  import type { Loading } from '@/typings/misc';
  import Post from '@/models/Post';
  import successCodes from '@/constants/successCodes';

  @Component
  export default class PublishPost extends Vue {
    @Prop({ type: Object, required: true }) readonly post!: Post;

    loading: Loading = {
      publishPost: false,
    };

    async publishPost() {
      const successCode = !this.post.publishedAt
          ? successCodes.PUBLISH_POST
          : successCodes.UNPUBLISH_POST;

      try {
        this.loading.publishPost = true;
        await Container.get(tokens.POSTS_SERVICE).publishPost(this.post.id, !this.post.publishedAt);
        Container.get(tokens.ALERTS_SERVICE).addSuccessAlert(successCode);
        this.$emit('publish-post');
      } finally {
        this.loading.publishPost = false;
      }
    }
  }
</script>
