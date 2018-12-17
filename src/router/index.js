import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes';
import store from '@/store/index';
import { getToken } from '@/utils/auth';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})



router.beforeEach(async (to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
    else {
      console.log(getToken())
      if (getToken()) {
        try {
          await store.dispatch('getUser')
          next();
        } catch (e) {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        };
      } else {
        next({
        path: '/login',
        query: { redirect: to.fullPath }
        })
      }

    }
  }
  else {
    next();
  }
})


export default router;
