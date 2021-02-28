<template>
  <div class="d-inline-flex">
    <v-dialog v-model="isDialogOpened" max-width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-on="on" v-bind="attrs" color="red" class="white--text" small>Удалить</v-btn>
      </template>
      <v-card>
        <v-card-title>Удалить тег</v-card-title>
        <v-card-text class="px-3 pb-0">
          <v-container class="py-0">
            <v-row>
              <v-col class="pt-0">
                <span class="subtitle-2">Вы действительно хотите удалить тег {{ tag.name }}?</span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="isDialogOpened = false" small>Отмена</v-btn>
          <v-btn
              color="red"
              class="white--text"
              small
              :loading="loading.deleteTag"
              @click="deleteTag"
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

  import Tag from '@/models/Tag';
  import tokens from '@/services/tokens';
  import successCodes from '@/constants/successCodes';
  import type { Loading } from '@/typings/misc';

  @Component
  export default class DeleteTagModal extends Vue {
    @Prop({ type: Object, required: true }) readonly tag!: Tag;

    isDialogOpened = false;

    loading: Loading = {
      deleteTag: false,
    };

    async deleteTag() {
      try {
        this.loading.deleteTag = true;
        await Container.get(tokens.TAGS_SERVICE).deleteTag(this.tag.id);
        Container.get(tokens.ALERTS_SERVICE).addSuccessAlert(successCodes.DELETE_TAG);
        this.isDialogOpened = false;
      } finally {
        this.loading.deleteTag = false;
      }
    }
  }
</script>
