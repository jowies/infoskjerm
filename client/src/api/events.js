import axios from 'axios';

export default {
  getEvents: async function events() {
    return axios
      .get('https://jowies.com/api/events')
      .then(result => result.data.events)
      .catch((error) => {
        console.log(error);
      });
  },
};
