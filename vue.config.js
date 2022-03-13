const appConfig = require('./config/config');

module.exports = {
  lintOnSave: false,

  transpileDependencies: [
    'vuetify',
  ],

  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/assets/scss/variables/_variables.scss";',
      },
    },
  },

  devServer: {
    progress: false,
    proxy: {
      '/api': {
        target: 'http://api.example-blog.local',
      },
    },
  },

  chainWebpack(config) {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].title = 'Панель администратора';
        args[0].appConfig = JSON.stringify(appConfig);
        return args;
      });
  },


  publicPath: process.env.NODE_ENV === 'production'
    ? '/' + process.env.CI_PROJECT_NAME + '/'
    : '/'
};
