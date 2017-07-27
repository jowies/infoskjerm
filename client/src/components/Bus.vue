<template>
  <div class="border">
    <div class="card">
      <div class="clock"><h1 class="no-space">{{getHours}}<span class="blink-me">:</span>{{getMinutes}}</h1></div>
      <img src="../assets/atb_logo.png" />
      <h1 v-if="busFromActive" >Mot midtbyen</h1>
      <div v-if="busToActive" class="container">
        <div class="list-left">
          <ul>
            <li v-for="bus in busTo">
              {{ bus.number }}
            </li>
          </ul>
        </div>
        <div class="list-middle">
          <ul>
            <li v-for="bus in busTo">
              {{ bus.name }}
            </li>
          </ul>
        </div>
        <div class="list-right">
          <ul>
            <li class="align-right" v-for="bus in busTo">
              {{ bus.time }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else><h1>{{getErrorTo}}</h1></div>
      <h1 v-if="busFromActive" class="space">Fra midtbyen</h1>
      <div v-if="busFromActive" class="container">
        <div class="list-left">
          <ul>
            <li v-for="bus in busFrom">
              {{ bus.number }}
            </li>
          </ul>
        </div>
        <div class="list-middle">
          <ul>
            <li v-for="bus in busFrom">
              {{ bus.name }}
            </li>
          </ul>
        </div>
        <div class="list-right">
          <ul>
            <li class="align-right" v-for="bus in busFrom">
              {{ bus.time }}
            </li>
          </ul>
        </div>
      </div>
      <div v-else><h1>{{getErrorFrom}}</h1></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Mot midtbyen',
    };
  },
  computed: {
    busTo() {
      return this.$store.state.bus.to;
    },
    busFrom() {
      return this.$store.state.bus.from;
    },
    busToActive() {
      return !this.$store.state.bus.to.error;
    },
    busFromActive() {
      return !this.$store.state.bus.from.error;
    },
    getErrorTo() {
      return this.$store.state.bus.to.message;
    },
    getErrorFrom() {
      return this.$store.state.bus.from.message;
    },
    getHours() {
      const time = new Date().toLocaleTimeString('nb-NO');
      const seperate = time.split(':');
      /* eslint-disable */
      const newTime = seperate[0];
      return newTime;
    },
    getMinutes() {
      const time = new Date().toLocaleTimeString('nb-NO');
      const seperate = time.split(':');
      /* eslint-disable */
      const newTime = seperate[1];
      return newTime;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  margin-top: 0;
  color: white;
  font-size: 2.9vh;
}

div {
  height: auto;
  width: auto;
}

ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}

li {
  list-style: none;
  color: white;
  font-size: 2.9vh;
  padding: 1vh;
}

img {
  margin-top: 2%;
  height: 7%;
}

.blink-me {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {  
  50% { opacity: 0; }
}

.no-space {
  font-size: 2.9vh;
}

.align-right {
  text-align: right;
}

li+li {
  border-top: 1px solid white;
}

.clock {
  position: absolute;
  height: 100%;
  width: 100%;
  text-align: right;
  color: white;
  font-size: 2.9vh;
  padding-right: 1vh;
  padding-top: 1vh;
}

.card {
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.9);
  position: relative;
}

.border {
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 2.5%;
}

.container {
  height: auto;
  width: auto;
  display: flex;
}

.list-middle {
  height: auto;
  width: 80%;
}

.list-left {
  height: auto;
  width: 10%;
  padding-left: 2.5vw;
}

.list-right {
  height: auto;
  width: 50%;
  flex-grow: 1;
  padding-right: 2.5vw;
}

.space {
  margin-top: 3vh;
}
</style>
