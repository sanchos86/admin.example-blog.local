<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="categories"
    :loading="loading"
  >
    <template v-slot:item.controls="{ item }">
      <EditCategoryModal class="mr-2" :category="item" />
      <DeleteCategoryModal :category="item" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { DataTableHeader } from 'vuetify';

  import Category from '@/models/Category';

  import EditCategoryModal from '@/components/internal/categories/modals/EditCategoryModal.vue';
  import DeleteCategoryModal from '@/components/internal/categories/modals/DeleteCategoryModal.vue';

  @Component({
    components: {
      EditCategoryModal,
      DeleteCategoryModal,
    },
  })
  export default class CategoriesTable extends Vue {
    @Prop({ type: Array, required: true }) readonly categories!: Category[];

    @Prop({ type: Boolean, required: true }) readonly loading!: boolean;

    headers: DataTableHeader[] = [
      { value: 'id', text: 'ID', align: 'start' },
      { value: 'name', text: 'Название' },
      { value: 'slug', text: 'Ярлык' },
      { value: 'controls', text: 'Действия', sortable: false },
    ];
  }
</script>
