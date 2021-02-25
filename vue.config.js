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
};
