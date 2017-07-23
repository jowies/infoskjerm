import Koa from 'koa';
import Router from 'koa-router';
import cors from 'kcors';
import serve from 'koa-static';
import mount from 'koa-mount';
import body from 'koa-bodyparser';
import request from 'request';
import cheerop from 'cheerio';

const client = new Koa();
const api = new Koa();
const app = new Koa();
const router = new Router()

const db = {
  tobi: { name: 'tobi', species: 'ferret' },
  loki: { name: 'loki', species: 'ferret' },
  jane: { name: 'jane', species: 'ferret' },
};


const bus = async (ctx) => {
  console.log(ctx);

  const info = await getBus();

  ctx.body = info;
};

const getBus = async function() {
  return new Promise(function(resolve, reject) {
    request('https://api.founder.no/atb/stop/16010905', function(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      };
    });
  });
};

const events = async (ctx) => {
  const json = await getEvents();

  ctx.body = json;
};

const getEvents = async function() {
  return new Promise(function(resolve, reject) {
    request('https://abakus.no', function(error, response, html) {
      if(!error) {
        const $ = cheerio.load(html);
        const pres = [];
        const fun_events = [];

        $('.content_list').filter(function() {
          const data = $(this);
          console.log(data);
        });
      }
    });
  });
};

router.get('/bus', bus);

router.get('/events', events);

api.use(cors());

api.use(router.routes())
api.use(router.allowedMethods());


client.use(serve('../client/dist'));

app.use(mount('/', client));
app.use(mount('/api', api));


app.listen(3000);
console.log('Listening on port 3000');
