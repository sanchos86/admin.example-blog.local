import VueI18n, { Values, Path, Choice } from 'vue-i18n';

export default class TranslationService {
  private readonly i18n: VueI18n;

  constructor(i18n: VueI18n) {
    this.i18n = i18n;
  }

  t(key: Path, values?: Values) {
    console.log('key', key);
    if (this.i18n.te(key)) {
      return this.i18n.t(key, values);
    }
    return `TRANSLATION_MISSING: ${key}`;
  }

  tc(key: Path, choice: Choice, values?: Values) {
    if (this.i18n.te(key)) {
      return this.i18n.tc(key, choice, values);
    }
    return `TRANSLATION_MISSING: ${key}`;
  }

  getValidationMessage(key: Path, values?: Values) {
    return this.i18n.t(`validationMessages.${key}`, values);
  }

  getInfoMessage(key: Path, values?: Values) {
    return this.i18n.t(`infoMessages.${key}`, values);
  }

  getSuccessMessage(key: Path, values?: Values) {
    return this.i18n.t(`successMessages.${key}`, values);
  }

  getErrorMessage(key: Path, values?: Values) {
    return this.i18n.t(`errorMessages.${key}`, values);
  }
}
