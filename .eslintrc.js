module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 'off',
    'class-methods-use-this': 'off',
    'vue/script-indent': ['error', 2, {
      baseIndent: 1,
      switchCase: 1
    }],
    'max-len': ['error', { code: 120 }],
    'no-empty': ['error', { allowEmptyCatch: true }]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ],
};
