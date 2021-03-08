<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="posts"
    :loading="loading"
    :page="page"
    :items-per-page="perPage"
    :server-items-length="total"
    :footer-props="{ 'items-per-page-options': [5, 10, 15] }"
    @update:page="$emit('update:page', $event)"
    @update:items-per-page="$emit('update:items-per-page', $event)"
  >
    <template v-slot:item.title="{ item }">
      <div class="text-truncate">{{ item.title }}</div>
    </template>
    <template v-slot:item.slug="{ item }">
      <div class="text-truncate">{{ item.slug }}</div>
    </template>
    <template v-slot:item.publishedAt="{ item }">
      <div class="text-no-wrap">{{ item.publishedAt | formatDate('LL') | formatEmptyValue }}</div>
    </template>
    <template v-slot:item.tags="{ item }">
      {{ item.tagsNames.join(', ') | formatEmptyValue }}
    </template>
    <template v-slot:item.controls="{ item }">
      <div class="d-flex py-2">
        <PublishPost
          :post="item"
          @publish-post="$emit('publish-post')"
        />
<!--        <DeletePostModal-->
<!--          :post="item"-->
<!--          @delete-post="$emit('delete-post')"-->
<!--        />-->
      </div>
      <div class="d-flex pb-2">
        <v-btn
          color="primary"
          :to="{ name: 'edit-post', params: { slug: item.slug } }"
          small
        >
          Редактировать
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { DataTableHeader } from 'vuetify';

  import Post from '@/models/Post';

  import PublishPost from '@/components/internal/posts/PublishPost.vue';

  @Component({
    components: {
      PublishPost,
    },
  })
  export default class PostsTable extends Vue {
    @Prop({ type: Array, required: true }) readonly posts!: Post[];

    @Prop({ type: Boolean, required: true }) readonly loading!: boolean;

    @Prop({ type: Number, required: true }) readonly page!: number;

    @Prop({ type: Number, required: true }) readonly perPage!: number;

    @Prop({ type: Number, required: true }) readonly total!: number;

    headers: DataTableHeader[] = [
      { value: 'id', text: 'ID', align: 'start' },
      { value: 'title', text: 'Заголовок' },
      { value: 'slug', text: 'Ярлык' },
      { value: 'publishedAt', text: 'Опубликована' },
      { value: 'tags', text: 'Теги' },
      { value: 'controls', text: 'Действия', sortable: false },
    ];
  }
</script>
