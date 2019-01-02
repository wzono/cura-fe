import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes';
import store from '@/store/index';
import * as types from '@/store/types';
import { getToken } from '@/utils/auth';
import Toast from 'muse-ui-toast';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// 用于路由跳转
const history = window.sessionStorage;
history.clear()
let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);



router.beforeEach(async (to, from, next) => {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);

  if (to.path === '/user/msg_box' || to.path === '/') {
    history.clear()
    history.setItem(to.path, 0);
  }

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit({
        type: types.UPDATE_DIRECTION,
        payload: { direction: 'forward' }
      })
    } else {
      store.commit({
        type: types.UPDATE_DIRECTION,
        payload: { direction: 'reverse' }
      })
    }
  } else {
    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);
    store.commit({
      type: types.UPDATE_DIRECTION,
      payload: { direction: 'forward' }
    })
  }

  // 权限路由处理
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    } else {
      if (getToken()) {
        try {
          await store.dispatch('getMe')
          next();
        } catch (e) {
          Toast.error('token失效，请重新登录')
          next({
            path: '/login',
          })
        };
      } else {
        next({
          path: '/login',
        })
      }
    }
  } else {
    next();
  }
})


export default router;
