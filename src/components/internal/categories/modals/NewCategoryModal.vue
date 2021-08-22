<template>
  <v-dialog v-model="isDialogOpened" max-width="500">
    <template v-slot:activator="{ on: dialog, attrs }">
      <v-tooltip left>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="{ ...dialog, ...tooltip }"
            small
            fab
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Добавить категорию</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>Новая категория</v-card-title>
      <v-card-text>
        <form id="newCategory" @submit.prevent="addCategory">
          <v-container class="pa-0">
            <v-row>
              <v-col class="py-0">
                <v-text-field
                  v-model="$v.form.name.$model"
                  :label="$t('internal.categories.newCategory.labels.name')"
                  :placeholder="$t('internal.categories.newCategory.placeholders.name')"
                  :error-messages="$getValidationMessage($v.form.name)"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0">
                <v-text-field
                  v-model="$v.form.slug.$model"
                  :label="$t('internal.categories.newCategory.labels.slug')"
                  :placeholder="$t('internal.categories.newCategory.placeholders.slug')"
                  :error-messages="$getValidationMessage($v.form.slug)"
                />
              </v-col>
            </v-row>
          </v-container>
        </form>
      </v-card-text>
      <v-card-actions class="px-6 pb-4">
        <v-spacer></v-spacer>
        <v-btn @click="isDialogOpened = false" small>Отмена</v-btn>
        <v-btn
          color="primary"
          type="submit"
          form="newCategory"
          small
          :disabled="isFormInvalid || loading.addCategory"
          :loading="loading.addCategory"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Container } from 'typedi';
  import { required, minLength } from 'vuelidate/lib/validators';
  import { Component, Watch } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';

  import ValidationMixin from '@/mixins/ValidationMixin';
  import tokens from '@/services/tokens';
  import successCodes from '@/constants/successCodes';

  import type { NewCategoryForm } from '@/typings/forms';
  import type { Loading } from '@/typings/misc';

  type LoadingKeys = 'addCategory';
  type CustomLoading = Loading<LoadingKeys>;

  @Component
  export default class NewCategoryModal extends mixins(ValidationMixin) {
    form: NewCategoryForm = {
      name: '',
      slug: '',
    };

    loading: CustomLoading = {
      addCategory: false,
    };

    isDialogOpened = false;

    validations() {
      return {
        form: {
          name: {
            required,
            minLength: minLength(3),
          },
          slug: {
            required,
            minLength: minLength(3),
          },
        },
      };
    }

    get isFormInvalid() {
      return this.$v.form.$invalid;
    }

    @Watch('isDialogOpened')
    resetForm(newValue: boolean) {
      if (newValue) {
        this.form = {
          name: '',
          slug: '',
        };
        this.$v.form.$reset();
      }
    }

    async addCategory() {
      const { form } = this;
      try {
        this.loading.addCategory = true;
        await Container.get(tokens.CATEGORIES_SERVICE).addCategory(form);
        await Container.get(tokens.CATEGORIES_SERVICE).getCategories();
        await Container.get(tokens.ALERTS_SERVICE).addSuccessAlert(successCodes.ADD_CATEGORY);
        this.isDialogOpened = false;
      } finally {
        this.loading.addCategory = false;
      }
    }
  }
</script>
