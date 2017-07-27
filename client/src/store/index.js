import Vuex from 'vuex';
import Vue from 'vue';
import Bus from '../api/bus';
import Events from '../api/events';

Vue.use(Vuex);

const getFormatedTime = (time, realTime) => {
  const seperate = time.split(' ');
  const datePart = seperate[0].split('.');
  const timePart = seperate[1].split(':');

  const y = datePart[2];
  const m = datePart[1] - 1;
  const d = datePart[0];
  const hour = timePart[0];
  const min = timePart[1];
  const timeNow = new Date();
  const arrival = new Date(y, m, d, hour, min);
  const difference = Math.floor((arrival.getTime() - timeNow.getTime()) / 60000);
  let formatedTime;
  const ca = 'ca ';
  const now = 'nå';
  const minutes = ' min';
  if (difference < -1) {
    formatedTime = 'kjørt';
  } else if (difference >= -1 && difference <= 0) {
    formatedTime = realTime ? now : ca + now;
  } else if (difference <= 10) {
    formatedTime = realTime ? (difference + minutes) : ca + difference + min;
  } else {
    /* eslint-disable prefer-template */
    formatedTime = timePart[0] + ':' + timePart[1];
  }
  return formatedTime;
};

const getFormatedLine = (line) => {
  let realtime;
  if (line.rt === 0) {
    realtime = false;
  } else {
    realtime = true;
  }

  const formatedLine = {};

  formatedLine.number = line.l;
  formatedLine.name = line.d;
  formatedLine.time = getFormatedTime(line.t, realtime);

  return formatedLine;
};

const getFormatedLines = (lines) => {
  const next5 = [];
  if (lines.name) {
    for (let i = 0; i < 5; i += 1) {
      if (!lines.next[i]) {
        break;
      }
      next5.push(getFormatedLine(lines.next[i]));
    }
  }
  return next5;
};

/* eslint-disable no-new */
export default new Vuex.Store({
  state: {
    bus: { from: {}, to: {} },
    events: { error: false },
  },
  mutations: {
    setBus(state, bus) {
      /* eslint-disable no-param-reassign*/
      if (bus.to.error) {
        state.bus.to = { error: true, message: 'Det går ingen busser mot midtbyen nå' };
      } else if (bus.to === 'Internal error') {
        state.bus.to = { error: true, message: 'Får ikke tilgang til sanntid mot midtbyen' };
      } else {
        state.bus.to = getFormatedLines(bus.to);
      }

      if (bus.from.error) {
        state.bus.from = { error: true, message: 'Det går ingen busser fra midtbyen nå' };
      } else if (bus.from === 'Internal error') {
        state.bus.from = { error: true, message: 'Får ikke tilgang til sanntid andre veien' };
      } else {
        state.bus.from = getFormatedLines(bus.from);
      }
    },
    setEvents(state, events) {
      if (events === 'Internal error') {
        state.events = { error: true, message: 'Får ikke tilgang til abakus.no' };
      } else if (!events) {
        state.events = { error: true, message: 'Får ikke tilgang til server' };
      } else {
        state.events = events;
      }
    },
  },
  actions: {
    async fetchBus({ commit }) {
      const times = await Bus.getTimes();
      commit('setBus', times);
    },
    async fetchEvents({ commit }) {
      const events = await Events.getEvents();
      commit('setEvents', events);
    },
  },
});
