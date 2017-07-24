import Vue from 'vue';
import Router from 'vue-router';
import Bedpres from '../components/Bedpres';
import Bus from '../components/Bus';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/bedpres',
      name: 'Bedpres',
      component: Bedpres,
    },
    {
      path: '/bus',
      name: 'Bus',
      component: Bus,
    },
  ],
  mode: 'history',
});
