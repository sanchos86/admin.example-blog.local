import Vue from 'vue';
import dayjs from 'dayjs';

Vue.filter('formatDate', (value: any, formatTo: string, formatFrom?: string) => {
  if (formatFrom) {
    return dayjs(value, formatFrom).isValid() ? dayjs(value, formatFrom).format(formatTo) : value;
  }
  return dayjs(value).isValid() ? dayjs(value).format(formatTo) : value;
});
