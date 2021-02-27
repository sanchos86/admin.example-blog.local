<template>
  <v-container fluid>
    <v-row>
      <v-col cols="11">
        <h1 class="text-h4">Теги</h1>
      </v-col>
      <v-col class="text-right" cols="1">
        <NewTagModal />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TagsTable
          :tags="tags"
          :loading="loading.getTags"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Container } from 'typedi';
  import { State } from 'vuex-class';

  import Tag from '@/models/Tag';
  import tokens from '@/services/tokens';
  import type { Loading } from '@/typings/misc';

  import TagsTable from '@/components/internal/tags/TagsTable.vue';
  import NewTagModal from '@/components/internal/tags/modals/NewTagModal.vue';

  @Component({
    components: {
      TagsTable,
      NewTagModal,
    },
  })
  export default class Tags extends Vue {
    loading: Loading = {
      getTags: true,
    };

    @State('tags', { namespace: 'tags' }) tags!: Tag[];

    async created() {
      try {
        await Container.get(tokens.TAGS_SERVICE).getTags();
      } finally {
        this.loading.getTags = false;
      }
    }
  }
</script>
