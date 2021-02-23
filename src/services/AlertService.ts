import { Service, Inject } from 'typedi';

import Alert from '@/models/Alert';
import tokens from '@/services/tokens';
import errorCodes from '@/constants/errorCodes';
import infoCodes from '@/constants/infoCodes';
import successCodes from '@/constants/successCodes';
import TranslationService from '@/services/TranslationService';

import { AlertType } from '@/typings/enum';
import { AppStore } from '@/typings/store';

@Service(tokens.ALERTS_SERVICE)
export default class AlertService {
  @Inject(tokens.TRANSLATION_SERVICE)
  private readonly translationService!: TranslationService;

  @Inject(tokens.STORE)
  private readonly store!: AppStore;

  private readonly readAlertTime = 7500;

  addAlert(alert: Alert) {
    this.store.commit('alerts/addAlert', alert);
    setTimeout(() => {
      this.removeAlert(alert);
    }, this.readAlertTime);
  }

  addSuccessAlert(code: string, details?: string) {
    const finalCode = code || successCodes.UNKNOWN;
    const text = this.translationService.t(finalCode);
    const alert = new Alert(AlertType.SUCCESS, { text, details });
    this.addAlert(alert);
  }

  addErrorAlert(code: string, details?: string) {
    const finalCode = code || errorCodes.UNKNOWN;
    const text = this.translationService.t(finalCode);
    const alert = new Alert(AlertType.ERROR, { text, details });
    this.addAlert(alert);
  }

  addInfoAlert(code: string, details?: string) {
    const finalCode = code || infoCodes.UNKNOWN;
    const text = this.translationService.t(finalCode);
    const alert = new Alert(AlertType.INFO, { text, details });
    this.addAlert(alert);
  }

  removeAlert(alert: Alert) {
    this.store.commit('alerts/removeAlert', alert);
  }
}
