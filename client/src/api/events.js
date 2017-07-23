import axios from 'axios';

export default {
  getEvents: async function events() {
    return axios
      .get('http://localhost:3000/api/events')
      .then(result => result.data)
      .catch((error) => {
        console.log(error);
      });
  },
};
