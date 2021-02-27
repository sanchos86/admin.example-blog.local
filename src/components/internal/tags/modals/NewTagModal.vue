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
        <span>Добавить тег</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title>Новый тег</v-card-title>
      <v-card-text class="h">
        <form id="newTag" @submit.prevent="addTag">
          <v-container class="pa-0">
            <v-row>
              <v-col class="py-0">
                <v-text-field
                  v-model="$v.form.name.$model"
                  :label="$t('internal.tags.newTag.labels.name')"
                  :placeholder="$t('internal.tags.newTag.placeholders.name')"
                  :error-messages="$getValidationMessage($v.form.name)"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0">
                <v-text-field
                  v-model="$v.form.slug.$model"
                  :label="$t('internal.tags.newTag.labels.slug')"
                  :placeholder="$t('internal.tags.newTag.placeholders.slug')"
                  :error-messages="$getValidationMessage($v.form.slug)"
                ></v-text-field>
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
          form="newTag"
          small
          :disabled="isFormInvalid"
          :loading="loading.addTag"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import { Component, Watch } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { Container } from 'typedi';
  import { required, minLength } from 'vuelidate/lib/validators';

  import tokens from '@/services/tokens';
  import ValidationMixin from '@/mixins/ValidationMixin';
  import type { Loading } from '@/typings/misc';
  import successCodes from '@/constants/successCodes';

  interface TagForm {
    name: string;
    slug: string;
  }

  @Component
  export default class NewTagModal extends mixins(ValidationMixin) {
    isDialogOpened = false;

    loading: Loading = {
      addTag: false,
    };

    form: TagForm = {
      name: '',
      slug: '',
    };

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
    onIsDialogOpened(newValue: boolean) {
      if (newValue) {
        this.form = {
          name: '',
          slug: '',
        };
        this.$v.form.$reset();
      }
    }

    async addTag() {
      const { form } = this;
      try {
        this.loading.addTag = true;
        await Container.get(tokens.TAGS_SERVICE).addTag(form);
        await Container.get(tokens.TAGS_SERVICE).getTags();
        await Container.get(tokens.ALERTS_SERVICE).addSuccessAlert(successCodes.ADD_TAG);
        this.isDialogOpened = false;
      } finally {
        this.loading.addTag = false;
      }
    }
  }
</script>
