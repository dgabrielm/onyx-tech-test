import axios from 'axios';

const AlertsService = {
  getAlerts: (callback) => {
    axios.get('https://run.mocky.io/v3/6a13fe7e-840c-4d82-b58f-c737139f0e55')
      .then((response) => {
        callback({ error: null, data: response.data });
      })
      .catch((error) => {
        callback({ error, data: null });
      });
  },
};

export default AlertsService;
