import Vue from 'vue';

Vue.filter('formatEmptyValue', (value: any, replacer = '-') => value || replacer);
