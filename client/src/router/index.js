import Vue from 'vue';
import Router from 'vue-router';
import Hello from '../components/Hello';
import Bus from '../components/Bus';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/bus',
      name: 'Bus',
      component: Bus,
    },
  ],
  mode: 'history',
});
