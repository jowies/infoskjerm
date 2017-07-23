import axios from 'axios';

export default {
  getTimes: async function bus() {
    return axios
      .get('http://localhost:3000/api/bus')
      .then(result => result.data)
      .catch((error) => {
        console.log(error);
      });
  },
};
