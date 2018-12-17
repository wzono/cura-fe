import * as user from '@/services/user';

const apis = {
  user,
}

const install = Vue => {
  if (install.installed) {
    return;
  }
  install.installed = true;

  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return apis;
      },
    },
  });

  Object.defineProperties(window, {
    $api: {
      get() {
        return apis;
      }
    }
  })
};

export default install;
