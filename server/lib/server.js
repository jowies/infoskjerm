import Koa from 'koa';
import Router from 'koa-router';
import cors from 'kcors';
import serve from 'koa-static';
import mount from 'koa-mount';
import axios from 'axios';
import info from './private.json';

const client = new Koa();
const api = new Koa();
const app = new Koa();
const router = new Router();

const urlTo = 'https://api.founder.no/atb/stop/16011265';
const urlFrom = 'https://api.founder.no/atb/stop/16010265';

const isType = (array, types, equals) => array.filter((element) => {
  for (let i = 0; i < types.length; i += 1) {
    if (element.eventType === types[i]) return equals;
  }
  return !equals;
});

/*async function getBus(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        resolve('Internal error');
        reject(error);
      }
    });
  });
}*/


const bus = async (ctx) => {
  const [infoTo, infoFrom] = await Promise.all([getBus(urlTo), getBus(urlFrom)]);
  ctx.body = { to: infoTo, from: infoFrom };
};

async function getEvents(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        console.log(response);
        resolve(response.data.results);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function getToken() {
  return new Promise((resolve, reject) => {
    axios.post('https://lego.abakus.no/authorization/token-auth/', info)
      .then((response) => {
        console.log(response);
        resolve(response.data.token);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

const dateString = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const currentDay = ('0' + currentDate.getDate()).slice(-2);
  const dateAfter = `date_after=${currentYear}-${currentMonth}-${currentDay}`;
  const dateBefore = `date_before=${currentYear + 1}-${currentMonth}-${currentDay}`;
  return `?${dateAfter}&${dateBefore}&page_size=100`;
};

const events = async (ctx) => {
  //const token = await getToken();
  const url = 'https://lego.abakus.no/api/v1/events' + dateString();
  const array = await getEvents(url);
  console.log(url);
  const json = {};
  //json.bed = isType(array, ['company_presentation', 'course'], true);
  //json.arr = isType(array, ['company_presentation', 'course'], false);
  ctx.body = array;
};

//router.get('/bus', bus);

router.get('/events', events);

api.use(cors());

api.use(router.routes());
api.use(router.allowedMethods());

client.use(serve('../client/dist'));

app.use(mount('/api', api));
app.use(mount('/', client));

app.listen(3000);
console.log('Listening on port 3000');
