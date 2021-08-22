<template>
  <div class="d-inline-flex">
    <v-dialog v-model="isDialogOpened" max-width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-on="on"
          v-bind="attrs"
          color="red"
          class="white--text"
          small
        >
          Удалить
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Удалить категорию</v-card-title>
        <v-card-text>
          <v-container class="pa-0">
            <v-row>
              <v-col class="py-0">
                <span class="subtitle-2">
                  Вы действительно хотите удалить категорию {{ category.name }}?
                </span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="px-6 pb-4">
          <v-spacer></v-spacer>
          <v-btn @click="isDialogOpened = false" small>Отмена</v-btn>
          <v-btn
            color="red"
            class="white--text"
            small
            :loading="loading.deleteCategory"
            @click="deleteCategory"
          >
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { Container } from 'typedi';

  import Category from '@/models/Category';
  import tokens from '@/services/tokens';
  import successCodes from '@/constants/successCodes';

  import type { Loading } from '@/typings/misc';

  type LoadingKeys = 'deleteCategory';
  type CustomLoading = Loading<LoadingKeys>;

  @Component
  export default class DeleteCategoryModal extends Vue {
    @Prop({ type: Object, required: true }) readonly category!: Category;

    isDialogOpened = false;

    loading: CustomLoading = {
      deleteCategory: false,
    };

    async deleteCategory() {
      try {
        this.loading.deleteCategory = true;
        await Container.get(tokens.CATEGORIES_SERVICE).deleteCategory(this.category.id);
        Container.get(tokens.ALERTS_SERVICE).addSuccessAlert(successCodes.DELETE_CATEGORY);
        this.isDialogOpened = false;
      } catch (e) {
      } finally {
        this.loading.deleteCategory = false;
      }
    }
  }
</script>
