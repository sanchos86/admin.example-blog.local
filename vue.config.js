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
  },

  chainWebpack(config) {
    config
      .plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].title = 'Панель администратора';
        return args;
      });
  },
};
