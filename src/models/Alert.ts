import { AlertType } from '@/typings/enum';

export default class Alert {
  type: AlertType;

  data: any;

  created: number;

  constructor(type: AlertType, data: any = {}) {
    this.type = type;
    this.data = data;
    this.created = Date.now();
  }
}
