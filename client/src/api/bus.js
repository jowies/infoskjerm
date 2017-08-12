import axios from 'axios';

export default {
  getTimes: async function bus() {
    return axios
      .get('https://jowies.com/api/bus')
      .then(result => result.data)
      .catch((error) => {
        console.log(error);
      });
  },
};
