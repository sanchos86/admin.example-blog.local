<template>
  <div class="login">
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>{{ $t('auth.login.enter') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <form id="loginForm" @submit.prevent="login">
          <v-text-field
            v-model="$v.form.email.$model"
            prepend-icon="mdi-account"
            type="text"
            :label="$t('auth.login.labels.email')"
            :error-messages="$getValidationMessage($v.form.email)"
          ></v-text-field>
          <v-text-field
            v-model="$v.form.password.$model"
            prepend-icon="mdi-lock"
            type="password"
            :label="$t('auth.login.labels.password')"
            :error-messages="$getValidationMessage($v.form.password)"
          ></v-text-field>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          type="submit"
          color="primary"
          form="loginForm"
          :disabled="isFormInvalid"
          :loading="loading.login"
        >
          {{ $t('auth.login.controls.enter') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { Container } from 'typedi';
  import { Component } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { required, email, minLength } from 'vuelidate/lib/validators';

  import tokens from '@/services/tokens';
  import type { Loading } from '@/typings/misc';
  import ValidationMixin from '@/mixins/ValidationMixin';

  interface LoginForm {
    email: string;
    password: string;
  }

  @Component
  export default class Login extends mixins(ValidationMixin) {
    loading: Loading = {
      login: false,
    };

    form: LoginForm = {
      email: 'admin@admin.ru',
      password: 'combat18',
    };

    validations() {
      return {
        form: {
          email: {
            required,
            email,
          },
          password: {
            required,
            minLength: minLength(6),
          },
        },
      };
    }

    get isFormInvalid(): boolean {
      return this.$v.form.$invalid;
    }

    async login() {
      const { form, isFormInvalid } = this;
      if (!isFormInvalid) {
        try {
          this.loading.login = true;
          await Container.get(tokens.AUTH_SERVICE).login(form);
          await Container.get(tokens.USERS_SERVICE).getProfile();
          await this.$router.push({ name: 'home' });
        } finally {
          this.loading.login = false;
        }
      }
    }
  }
</script>
