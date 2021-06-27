<template>
  <div class="d-inline-flex">
    <v-dialog v-model="isDialogOpened" max-width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-on="on" v-bind="attrs" color="red" class="white--text" small>Удалить</v-btn>
      </template>
      <v-card>
        <v-card-title class="px-4">Удалить запись</v-card-title>
        <v-card-text class="px-4">
          Вы действительно хотите удалить запись <strong>{{ post.title }}</strong>?
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            outlined
            small
            @click="isDialogOpened = false"
          >
            Отмена
          </v-btn>
          <v-btn
            color="red"
            class="white--text"
            small
            :loading="loading.deletePost"
            @click="deletePost"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import { Container } from 'typedi';
  import { Component, Vue, Prop } from 'vue-property-decorator';

  import tokens from '@/services/tokens';
  import successCodes from '@/constants/successCodes';
  import type { Loading } from '@/typings/misc';
  import Post from '@/models/Post';

  @Component
  export default class DeletePostModal extends Vue {
    @Prop({ type: Object, required: true }) readonly post!: Post;

    loading: Loading = {
      deletePost: false,
    };

    isDialogOpened = false;

    async deletePost() {
      try {
        this.loading.deletePost = true;
        await Container.get(tokens.POSTS_SERVICE).deletePost(this.post.id);
        Container.get(tokens.ALERTS_SERVICE).addSuccessAlert(successCodes.DELETE_POST);
        this.isDialogOpened = false;
        this.$emit('delete-post');
      } finally {
        this.loading.deletePost = false;
      }
    }
  }
</script>
