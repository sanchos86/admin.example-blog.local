import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ValidationMixin extends Vue {
  $getValidationMessage(validation: any) {
    return '';
  }
}
