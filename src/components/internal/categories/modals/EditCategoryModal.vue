<template>
  <div class="d-inline-flex">
    <v-dialog v-model="isDialogOpened" max-width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-on="on" v-bind="attrs" color="primary" small>Редактировать</v-btn>
      </template>
      <v-card>
        <v-card-title>Редактировать категорию</v-card-title>
        <v-card-text>
          <form id="editCategory" @submit.prevent="editCategory">
            <v-container class="pa-0">
              <v-row>
                <v-col class="py-0">
                  <v-text-field
                    v-model="$v.form.name.$model"
                    :label="$t('internal.categories.editCategory.labels.name')"
                    :placeholder="$t('internal.categories.editCategory.placeholders.name')"
                    :error-messages="$getValidationMessage($v.form.name)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0">
                  <v-text-field
                    v-model="$v.form.slug.$model"
                    :label="$t('internal.categories.editCategory.labels.slug')"
                    :placeholder="$t('internal.categories.editCategory.placeholders.slug')"
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
            form="editCategory"
            small
            :disabled="isFormInvalid || loading.editCategory"
            :loading="loading.editCategory"
          >
            Редактировать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import { Container } from 'typedi';
  import { required, minLength } from 'vuelidate/lib/validators';
  import { Component, Watch, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';

  import tokens from '@/services/tokens';
  import successCodes from '@/constants/successCodes';
  import ValidationMixin from '@/mixins/ValidationMixin';
  import Category from '@/models/Category';

  import type { EditCategoryForm } from '@/typings/forms';
  import type { Loading } from '@/typings/misc';

  type LoadingKeys = 'editCategory';
  type CustomLoading = Loading<LoadingKeys>;

  @Component
  export default class EditCategoryModal extends mixins(ValidationMixin) {
    @Prop({ type: Object, required: true }) readonly category!: Category;

    form: EditCategoryForm = {
      name: '',
      slug: '',
    };

    loading: CustomLoading = {
      editCategory: false,
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
      const { category } = this;
      if (newValue && category) {
        this.form = {
          ...this.form,
          name: category.name,
          slug: category.slug,
        };
      }
    }

    async editCategory() {
      const { category, form, isFormInvalid } = this;
      if (!isFormInvalid) {
        try {
          this.loading.editCategory = true;
          await Container.get(tokens.CATEGORIES_SERVICE).editCategory(category.id, form);
          await Container.get(tokens.ALERTS_SERVICE).addSuccessAlert(successCodes.EDIT_CATEGORY);
          this.isDialogOpened = false;
        } finally {
          this.loading.editCategory = false;
        }
      }
    }
  }
</script>
