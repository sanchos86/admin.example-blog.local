<template>
  <v-data-table
      class="elevation-1"
      :headers="headers"
      :items="tags"
      :loading="loading"
  >
    <template v-slot:item.controls="{ item }">
      <EditTagModal class="mr-2" :tag="item" />
      <DeleteTagModal :tag="item" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { DataTableHeader } from 'vuetify';

  import Tag from '@/models/Tag';
  import EditTagModal from '@/components/internal/tags/modals/EditTagModal.vue';
  import DeleteTagModal from '@/components/internal/tags/modals/DeleteTagModal.vue';

  @Component({
    components: {
      EditTagModal,
      DeleteTagModal,
    },
  })
  export default class TagsTable extends Vue {
    @Prop({ type: Boolean, required: true }) readonly loading!: boolean;

    @Prop({ type: Array, required: true }) readonly tags!: Tag[];

    headers: DataTableHeader[] = [
      { value: 'id', text: 'ID', align: 'start' },
      { value: 'name', text: 'Название' },
      { value: 'slug', text: 'Ярлык' },
      { value: 'controls', text: 'Действия', sortable: false },
    ];
  }
</script>
