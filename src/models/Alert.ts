import { AlertType } from '@/typings/enum';

export default class Alert {
  type: AlertType;

  title: string;

  details?: string;

  created: number;

  constructor(type: AlertType, title: string, details?: string) {
    this.type = type;
    this.title = title;
    this.details = details;
    this.created = Date.now();
  }
}
