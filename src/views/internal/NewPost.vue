<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Новая запись</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <form @submit.prevent="addPost">
          <v-container class="pa-0" fluid>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="$v.form.title.$model"
                  label="Заголовок"
                  clearable
                  :error-messages="$getValidationMessage($v.form.title)"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="$v.form.slug.$model"
                  label="Ярлык"
                  clearable
                  :error-messages="$getValidationMessage($v.form.slug)"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-select
                  v-model="$v.form.category.$model"
                  label="Категория"
                  clearable
                  :items="categories"
                  :error-messages="$getValidationMessage($v.form.category)"
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="$v.form.tags.$model"
                  label="Теги"
                  multiple
                  clearable
                  :items="tags"
                />
              </v-col>
              <v-col cols="4">
                <v-file-input
                  v-model="$v.form.picture.$model"
                  label="Картинка"
                  :error-messages="$getValidationMessage($v.form.picture)"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <quill-editor
                  ref="editor"
                  v-model="form.text"
                  :options="editorOptions"
                />
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col cols="6">
                <v-checkbox
                  v-model="form.publish"
                  class="mt-0 pt-0"
                  label="Опубликовать"
                  hide-details
                />
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn
                  color="primary"
                  type="submit"
                  :loading="loading.addPost"
                  :disabled="isFormInvalid"
                >
                  Создать запись
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  import { State } from 'vuex-class';
  import { Container } from 'typedi';
  import { required, minLength } from 'vuelidate/lib/validators';
  import { mixins } from 'vue-class-component';

  import type { Loading } from '@/typings/misc';
  import Tag from '@/models/Tag';
  import Category from '@/models/Category';
  import tokens from '@/services/tokens';
  import ValidationMixin from '@/mixins/ValidationMixin';

  interface NewPostForm {
    title: string | undefined;
    text: string | undefined;
    slug: string | undefined;
    publish: boolean;
    category: number | undefined;
    tags: number[];
    picture: File | undefined;
  }

  @Component
  export default class NewPost extends mixins(ValidationMixin) {
    @State('tags', { namespace: 'tags' }) tags!: Tag[];

    @State('categories', { namespace: 'categories' }) categories!: Category[];

    loading: Loading = {
      addPost: false,
    };

    editorOptions = {
      placeholder: 'Введите текст...',
    };

    form: NewPostForm = {
      title: undefined,
      text: undefined,
      slug: undefined,
      publish: false,
      category: undefined,
      tags: [],
      picture: undefined,
    };

    validations() {
      return {
        form: {
          title: {
            required,
            minLength: minLength(6),
          },
          text: {
            required,
          },
          slug: {
            required,
            minLength: minLength(3),
          },
          publish: {},
          category: {
            required,
          },
          tags: {},
          picture: {
            required,
          },
        },
      };
    }

    get isFormInvalid() {
      return this.$v.form.$invalid;
    }

    get editor() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return this.$refs.editor?.quill;
    }

    async addPost() {
      const { isFormInvalid, form } = this;
      if (!isFormInvalid) {
        try {
          this.loading.addPost = true;
          await Container.get(tokens.POSTS_SERVICE).addPost(form);
          await this.$router.push({ name: 'posts' });
        } finally {
          this.loading.addPost = false;
        }
      } else {
        this.$v.form.$touch();
      }
    }

    async created() {
      await Container.get(tokens.TAGS_SERVICE).getTags();
      await Container.get(tokens.CATEGORIES_SERVICE).getCategories();
    }
  }
</script>

<style>
  .ql-container {
    min-height: 200px;
  }
</style>
