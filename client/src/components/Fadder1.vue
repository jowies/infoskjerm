<template>
  <div class="border">
    <div class="card">
    <h1 class="big">Fadderperioden</h1>
    <h1>Uke 1</h1>
    <div class="container">
    <div class="list-left">
        <ul>
          <li v-for="event in events">
            {{ event.day }}
            <span class="second push">Mandag</span>
          </li>
        </ul>
      </div>
      <div class="list-right">
        <ul>
          
          <li class="align-right" v-for="event in events">
            {{ event.events[0] }}
            <span class="push">{{ event.events[1] }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      events: [
        {
          day: 'Mandag',
          events: ['Ny i Trondheim-kurs', 'Grilling i Høgskoleparken'],
        },
        {
          day: 'Tirsdag',
          events: ['Faddergruppeinndeling', 'Musikkquiz på Olavs Pub'],
        },
        {
          day: 'Onsdag',
          events: ['Immatrikulering på Gløs', 'Fest på Sammfunnet'],
        },
        {
          day: 'Torsdag',
          events: ['Rebus på Gløshaugen', 'Spill og lek på kontoret'],
        },
        {
          day: 'Fredag',
          events: ['Bedpres med BEKK', 'Facebookfest på LaBamba'],
        },
        {
          day: 'Lørdag',
          events: ['Harrytur til Sverige', 'Togafest'],
        },
        {
          day: 'Søndag',
          events: ['Løpetur med Abarun', 'Restitusjonsdag ;)'],
        },
      ],
    };
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

.big {
  font-size: 5vh;
  margin-bottom: 1vh;
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

.second {
  visibility: hidden; 
}

.push {
  margin-top: 1vh;
  display: block;
}

li {
  list-style: none;
  color: white;
  font-size: 2.9vh;
  padding: 1vh;
  display: block;
  margin-bottom: 1vh;
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

.list-left {
  height: auto;
  width: 25%;
  padding-left: 2.5vw;
}

.list-right {
  height: auto;
  width: 75%;
  flex-grow: 1;
  padding-right: 2.5vw;
}

.space {
  margin-top: 3vh;
}
</style>
