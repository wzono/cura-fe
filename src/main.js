import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui';
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import NProgress from 'muse-ui-progress';
import Loading from 'muse-ui-loading';
import apiRegister from '@/plugins/apiRegister'; // 导入全局api
import componentsRegister from '@/plugins/componentsRegister'; // 导入全局组件
import request from '@/plugins/request'; // 导入全局封装的request
import 'typeface-roboto';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-message/dist/muse-ui-message.css';
import 'muse-ui-progress/dist/muse-ui-progress.css';
import '@/assets/scss/_rem.scss';
import 'normalize.css';

const errorHandler = (err, vm) => {
  console.error(`[error]: ${err.message}`);
  console.error(err);
}

Vue.config.productionTip = false
Vue.config.errorHandler = errorHandler;

Vue.prototype.$throw = (err) => errorHandler(err, this);

Vue.use(MuseUI)
  .use(apiRegister)
  .use(componentsRegister)
  .use(Toast, { position: 'bottom' })
  .use(NProgress)
  .use(Loading)
  .use(Message)
  .use(request);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
