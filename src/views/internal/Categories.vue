<template>
  <v-container fluid>
    <v-row>
      <v-col cols="11">
        <h1 class="text-h4">Категории</h1>
      </v-col>
      <v-col class="text-right" cols="1">
        <NewCategoryModal />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <CategoriesTable
          :categories="categories"
          :loading="loading.getCategories"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Container } from 'typedi';
  import { Component, Vue } from 'vue-property-decorator';
  import { State } from 'vuex-class';

  import Category from '@/models/Category';
  import tokens from '@/services/tokens';
  import type { Loading } from '@/typings/misc';

  import CategoriesTable from '@/components/internal/categories/CategoriesTable.vue';
  import NewCategoryModal from '@/components/internal/categories/modals/NewCategoryModal.vue';

  @Component({
    components: {
      CategoriesTable,
      NewCategoryModal,
    },
  })
  export default class Categories extends Vue {
    loading: Loading = {
      getCategories: true,
    };

    @State('categories', { namespace: 'categories' }) categories!: Category[];

    async created() {
      try {
        await Container.get(tokens.CATEGORIES_SERVICE).getCategories();
      } finally {
        this.loading.getCategories = false;
      }
    }
  }
</script>
