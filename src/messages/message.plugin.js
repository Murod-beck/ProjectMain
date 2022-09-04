import local from '@/filtrs/localefiltr';

export default {
  install: (app, options) => {
    app.config.globalProperties.$message = (html) => {
      M.toast({ html });
    };
    app.config.globalProperties.$error = function (html) {
      M.toast({ html: `[${local('Error')}]: ${html}` });
    };
  },
};
