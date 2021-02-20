import { Store } from 'vuex';
import { Service, Inject } from 'typedi';

import Alert from '@/models/Alert';
import tokens from '@/services/tokens';
import errorCodes from '@/constants/errorCodes';
import { AlertType } from '@/typings/enum';
import TranslationService from '@/services/TranslationService';

@Service(tokens.ALERTS_SERVICE)
export default class AlertService {
  private readonly translationService: TranslationService;

  private readonly store: Store<{}>;

  private readonly readAlertTime = 7500;

  constructor(
    @Inject(tokens.STORE) store: Store<{}>,
    @Inject(tokens.TRANSLATION_SERVICE) translationService: TranslationService
  ) {
    this.store = store;
    this.translationService = translationService;
  }

  addAlert(alert: Alert) {
    this.store.commit('alerts/addAlert', alert);
    setTimeout(() => {
      this.removeAlert(alert);
    }, this.readAlertTime);
  }

  addSuccessAlert(code: string, details?: string) {
    const finalCode = code || errorCodes.UNKNOWN;
    const text = this.translationService.t(finalCode);
    const alert = new Alert(AlertType.SUCCESS, { text, details });
    this.addAlert(alert);
  }

  addErrorAlert(code: string, details?: string) {

  }

  addInfoAlert(code: string, details?: string) {}

  removeAlert(alert: Alert) {
    this.store.commit('alerts/removeAlert', alert);
  }
}
