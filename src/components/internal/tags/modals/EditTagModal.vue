<template>
  <div class="d-inline-flex">
    <v-dialog v-model="isDialogOpened" max-width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          color="primary"
          small
        >
          {{ $t('controls.edit') }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>{{ $t('internal.tags.controls.editTag') }}</v-card-title>
        <v-card-text class="px-3 pb-0">
          <form id="editTag" @submit.prevent="editTag">
            <v-container class="py-0">
              <v-row>
                <v-col class="pt-0">
                  <v-text-field
                    v-model="$v.form.name.$model"
                    :label="$t('internal.tags.editTag.labels.name')"
                    :placeholder="$t('internal.tags.editTag.placeholders.name')"
                    :error-messages="$getValidationMessage($v.form.name)"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pt-0">
                  <v-text-field
                    v-model="$v.form.slug.$model"
                    :label="$t('internal.tags.editTag.labels.slug')"
                    :placeholder="$t('internal.tags.editTag.placeholders.slug')"
                    :error-messages="$getValidationMessage($v.form.slug)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="isDialogOpened = false" small>{{ $t('controls.cancel') }}</v-btn>
          <v-btn
            color="primary"
            type="submit"
            form="editTag"
            small
            :disabled="isFormInvalid || loading.editTag"
            :loading="loading.editTag"
          >
            {{ $t('controls.edit') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Watch } from 'vue-property-decorator';
  import { Container } from 'typedi';
  import { minLength, required } from 'vuelidate/lib/validators';
  import { mixins } from 'vue-class-component';

  import Tag from '@/models/Tag';
  import tokens from '@/services/tokens';
  import successCodes from '@/constants/successCodes';
  import ValidationMixin from '@/mixins/ValidationMixin';
  import type { Loading } from '@/typings/misc';

  interface EditTagForm {
    name: string;
    slug: string;
  }

  @Component
  export default class EditTagModal extends mixins(ValidationMixin) {
    @Prop({ type: Object, required: true }) readonly tag!: Tag;

    isDialogOpened = false;

    form: EditTagForm = {
      name: '',
      slug: '',
    };

    loading: Loading = {
      editTag: false,
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
    resetForm(newValue: boolean) {
      const { tag } = this;
      if (newValue && tag) {
        this.form = {
          ...this.form,
          name: tag.name,
          slug: tag.slug,
        };
      }
    }

    async editTag() {
      const { form, tag, isFormInvalid } = this;
      if (!isFormInvalid) {
        try {
          this.loading.editTag = true;
          await Container.get(tokens.TAGS_SERVICE).editTag(tag.id, form);
          Container.get(tokens.ALERTS_SERVICE).addSuccessAlert(successCodes.EDIT_TAG);
          this.isDialogOpened = false;
        } finally {
          this.loading.editTag = false;
        }
      }
    }
  }
</script>
