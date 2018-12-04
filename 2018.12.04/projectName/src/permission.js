import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          store.dispatch('GenerateRoutes', res.data.data.userInfo).then(() => {
            router.addRoutes(store.getters.addRouters);
            next({ ...to, replace: true })
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        next();
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});
