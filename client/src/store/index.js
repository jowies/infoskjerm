import Vuex from 'vuex';
import Vue from 'vue';
import Bus from '../api/bus';
import Events from '../api/events';

Vue.use(Vuex);

/* eslint-disable no-new */
export default new Vuex.Store({
  state: {
    bus: {},
    events: {},
  },
  mutations: {
    setBus(state, bus) {
      /* eslint-disable no-param-reassign*/
      state.bus = bus;
    },
    setEvents(state, events) {
      state.events = events;
    },
  },
  actions: {
    async fetchBus({ commit }) {
      const times = await Bus.getTimes();
      commit('setBus', times);
    },
    async fetchEvents({ commit }) {
      const data = await Events.getEvents();
      commit('setEvents', data.events);
    },
  },
});
