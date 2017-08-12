import store from './store/index';

const updateBus = function update() {
  store.dispatch('fetchBus');
};
const updateEvents = function update() {
  store.dispatch('fetchEvents');
};


const changeSlide = function update() {
  store.dispatch('changeSlide');
};

updateBus();
updateEvents();
setInterval(updateBus, 10 * 1000);
setInterval(updateEvents, 10 * 60 * 1000);
setInterval(changeSlide, 10 * 1000);

function sleep(milliseconds) {
  const start = new Date().getTime();
  for (let i = 0; i < 1e7; i += 1) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

sleep(2000);
