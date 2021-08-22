import Vue from 'vue';

Vue.filter('formatEmptyValue', (value: unknown, replacer = '-') => value || replacer);
