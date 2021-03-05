<template>
  <div></div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { DataTableHeader } from 'vuetify';

  import Post from '@/models/Post';

  @Component
  export default class PostsTable extends Vue {
    @Prop({ type: Array, required: true }) readonly posts!: Post[];

    @Prop({ type: Boolean, required: true }) readonly loading!: boolean;

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
