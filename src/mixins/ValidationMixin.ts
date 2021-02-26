import Vue from 'vue';
import Component from 'vue-class-component';
import { Container } from 'typedi';
import { TranslateResult } from 'vue-i18n';

import tokens from '@/services/tokens';
import validationCodes from '@/constants/validationCodes';

@Component
export default class ValidationMixin extends Vue {
  // TODO add type for validation
  $getValidationMessage(validation: any): TranslateResult {
    if (validation.$error) {
      const translationService = Container.get(tokens.TRANSLATION_SERVICE);
      let validationMessage = translationService.getValidationMessage(validationCodes.UNKNOWN);
      if (validation.required !== undefined && !validation.required) {
        validationMessage = translationService.getValidationMessage(validationCodes.REQUIRED);
      } else if (validation.email !== undefined && !validation.email) {
        validationMessage = translationService.getValidationMessage(validationCodes.EMAIL);
      } else if (validation.minLength !== undefined && !validation.minLength) {
        validationMessage = translationService.getValidationMessage(
          validationCodes.MIN_LENGTH,
          { min: validation.$params.minLength.min }
        );
      }
      return validationMessage;
    }
    return '';
  }
}
