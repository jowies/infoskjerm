import router from './router';
import store from './store/index';

let count = 0;
const routes = [
  '/bus',
  '/',
];

const updateBus = function update() {
  store.dispatch('fetchBus');
};
const updateEvents = function update() {
  store.dispatch('fetchEvents');
};


const changeRoute = function tick() {
  router.push(routes[count % routes.length]);
  if (count === 10000) count = 0;
  count += 1;
};

updateBus();
updateEvents();
setInterval(updateBus, 10 * 1000);
setInterval(updateEvents, 10 * 60 * 1000);
setInterval(changeRoute, 10 * 1000);
