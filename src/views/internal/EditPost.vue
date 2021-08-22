<template>
  <v-container class="edit-post" fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Редактировать запись</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <form @submit.prevent="editPost">
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
            <v-row align="end">
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
                  @change="renderPicture"
                  @click:clear="removePicture"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <quill-editor
                  ref="editor"
                  v-model="$v.form.text.$model"
                  :options="editorOptions"
                />
              </v-col>
            </v-row>
            <v-row class="align-center">
              <v-col cols="6">
                <v-checkbox
                  v-model="$v.form.publish.$model"
                  class="mt-0 pt-0"
                  label="Опубликовать"
                  hide-details
                />
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn
                  color="primary"
                  type="submit"
                  :loading="loading.editPost"
                  :disabled="isFormInvalid"
                >
                  Изменить запись
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </form>
      </v-col>
      <v-col cols="4">
        <PicturePreview
          v-if="form.src"
          :src="form.src"
          @remove-picture="removePicture"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  import { Container } from 'typedi';
  import { State } from 'vuex-class';
  import { mixins } from 'vue-class-component';
  import { minLength, required, requiredIf } from 'vuelidate/lib/validators';
  import hljs from 'highlight.js';

  import Tag from '@/models/Tag';
  import Post from '@/models/Post';
  import Category from '@/models/Category';
  import tokens from '@/services/tokens';
  import ValidationMixin from '@/mixins/ValidationMixin';
  import successCodes from '@/constants/successCodes';

  import PicturePreview from '@/components/common/PicturePreview.vue';

  import type { Loading } from '@/typings/misc';
  import type { EditPostForm } from '@/typings/forms';

  type LoadingKeys = 'editPost';
  type CustomLoading = Loading<LoadingKeys>;

  hljs.configure({
    useBR: false,
  });

  @Component({
    components: {
      PicturePreview,
    },
  })
  export default class EditPost extends mixins(ValidationMixin) {
    @State('tags', { namespace: 'tags' }) tags!: Tag[];

    @State('categories', { namespace: 'categories' }) categories!: Category[];

    loading: CustomLoading = {
      editPost: false,
    };

    editorOptions = {
      placeholder: 'Введите текст...',
      modules: {
        syntax: {
          highlight: (text: never) => hljs.highlightAuto(text).value,
        },
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['code-block', 'blockquote', 'code'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: [false, 'center', 'right', 'justify'] }],
          [{ color: [] }, { background: [] }],
          ['link', 'image'],
        ],
      },
    };

    form: EditPostForm = {
      id: null,
      title: null,
      text: null,
      slug: null,
      publish: false,
      category: null,
      tags: [],
      picture: null,
      src: null,
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
            required: requiredIf((vm) => !vm.src),
          },
        },
      };
    }

    get postSlug() {
      return this.$route.params.slug;
    }

    get isFormInvalid() {
      return this.$v.form.$invalid;
    }

    get editor() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return this.$refs.editor?.quill;
    }

    renderPicture(file: File) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener('loadend', (e) => {
        if (typeof e.target?.result === 'string') {
          this.form.src = e.target.result;
        }
      });
    }

    updateForm(post: Post) {
      this.form = {
        id: post.id,
        title: post.title,
        text: post.text,
        slug: post.slug,
        publish: Boolean(post.publishedAt),
        category: post.category.id,
        tags: post.tagsIds,
        picture: null,
        src: post.src,
      };
    }

    removePicture() {
      this.form.src = null;
    }

    async editPost() {
      const { isFormInvalid, form, editor } = this;
      const postId = form.id as number;
      if (!isFormInvalid) {
        try {
          this.loading.editPost = true;
          const data = {
            ...form,
            plainText: editor.getText(),
          };
          await Container.get(tokens.POSTS_SERVICE).editPost(postId, data);
          Container.get(tokens.ALERTS_SERVICE).addSuccessAlert(successCodes.EDIT_POST);
          await this.$router.push({ name: 'posts' });
        } finally {
          this.loading.editPost = false;
        }
      } else {
        this.$v.form.$touch();
      }
    }

    async created() {
      const { postSlug } = this;
      try {
        Container.get(tokens.PROGRESS_SERVICE).setGlobalProgress(true);
        await Container.get(tokens.TAGS_SERVICE).getTags();
        await Container.get(tokens.CATEGORIES_SERVICE).getCategories();
        const post = await Container.get(tokens.POSTS_SERVICE).getPost(postSlug);
        this.updateForm(post);
      } finally {
        Container.get(tokens.PROGRESS_SERVICE).setGlobalProgress(false);
      }
    }
  }
</script>
