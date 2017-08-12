import Koa from 'koa';
import Router from 'koa-router';
import cors from 'kcors';
import serve from 'koa-static';
import mount from 'koa-mount';
import request from 'request';
import cheerio from 'cheerio';

const client = new Koa();
const api = new Koa();
const app = new Koa();
const router = new Router();

const urlTo = 'https://api.founder.no/atb/stop/16010905';
const urlFrom = 'https://api.founder.no/atb/stop/16010905';

async function getBus(url) {
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
}


const bus = async (ctx) => {
  const [infoTo, infoFrom] = await Promise.all([getBus(urlTo), getBus(urlFrom)]);
  ctx.body = { to: infoTo, from: infoFrom };
};

async function getEvents() {
  return new Promise((resolve, reject) => {
    request('https://abakus.no', (error, response, html) => {
      if (!error) {
        const $ = cheerio.load(html);
        const pres = [];
        const funEvents = [];

        const content = $('.content_list');

        for (let i = 0; i < content.length; i += 1) {
          const t = content.get(i);
          const ol = $(t).find('ol');
          const li = $(ol).find('li');
          for (let j = 0; j < li.length; j += 1) {
            const u = li.get(j);
            const a = $(u).find('a');
            const name = $(a).text().trim();
            const p = $(u).find('p');
            const date = $(p).text();
            if (i === 0) {
              pres.push({ name, date });
            } else {
              funEvents.push({ name, date });
            }
          }
        }
        const send = {
          events: {
            bedpres: pres,
            arr: funEvents,
          },
        };

        resolve(send);
      } else {
        resolve('Internal error');
        reject(error);
      }
    });
  });
}

const events = async (ctx) => {
  const json = await getEvents();
  ctx.body = json;
};

router.get('/bus', bus);

router.get('/events', events);

api.use(cors());

api.use(router.routes());
api.use(router.allowedMethods());

client.use(serve('../client/dist'));

app.use(mount('/api', api));
app.use(mount('/', client));

app.listen(3000);
console.log('Listening on port 3000');
