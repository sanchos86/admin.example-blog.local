<template>
  <v-container fluid>
    <v-row>
      <v-col cols="11">
        <h1 class="text-h4">Записи</h1>
      </v-col>
      <v-col class="text-right" cols="1">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              v-on="on"
              small
              fab
              :to="to"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Добавить запись</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <PostsTable
          :posts="posts"
          :page="page"
          :total="total"
          :per-page="perPage"
          :loading="loading.getPosts"
          @update:page="updatePage"
          @update:items-per-page="updateItemsPerPage"
          @delete-post="getPosts"
          @publish-post="getPosts"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { Location } from 'vue-router';
  import { Container } from 'typedi';

  import Post from '@/models/Post';
  import tokens from '@/services/tokens';

  import PostsTable from '@/components/internal/posts/PostsTable.vue';

  import type { Loading } from '@/typings/misc';

  type LoadingKeys = 'getPosts';
  type CustomLoading = Loading<LoadingKeys>;

  @Component({
    components: {
      PostsTable,
    },
  })
  export default class Posts extends Vue {
    to: Location = { name: 'new-post' };

    posts: Post[] = [];

    loading: CustomLoading = {
      getPosts: true,
    };

    page = 1;

    total = -1;

    perPage = 10;

    updatePage(page: number) {
      this.page = page;
    }

    updateItemsPerPage(perPage: number) {
      this.perPage = perPage;
    }

    async getPosts(): Promise<void> {
      const { perPage, page, loading } = this;
      const params = { page, perPage };
      try {
        if (!loading.getPosts) {
          this.loading.getPosts = true;
        }
        const { entities, meta } = await Container.get(tokens.POSTS_SERVICE).getPosts(params);
        this.posts = entities;
        this.total = meta.total;
      } finally {
        this.loading.getPosts = false;
      }
    }

    created() {
      this.getPosts();
    }

    @Watch('page')
    onPageChanged() {
      this.getPosts();
    }

    @Watch('perPage')
    onPerPageChanged() {
      this.getPosts();
    }
  }
</script>
