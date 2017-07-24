<template>
  <div class="border">
  <div class="card">
    <img class="abakus" src="../assets/abakus_logo_white-ny.png" />
    <h1>Bedriftspresentasjoner og kurs</h1>
    <div class="container">
      <div class="list-left">
        <ul>
          <li v-for="bedrift in bedrifter">
            {{ bedrift.name }}
          </li>
        </ul>
      </div>
      <div class="list-right">
        <ul>
          <li class="align-right" v-for="bedrift in bedrifter">
            {{ bedrift.date }}
          </li>
        </ul>
      </div>
    </div>
    <h1>Andre arrangementer</h1>
    <div class="container">
      <div class="list-left">
        <ul>
          <li v-for="arr in arrangementer">
            {{ arr.name }}
          </li>
        </ul>
      </div>
      <div class="list-right">
        <ul>
          <li class="align-right" v-for="arr in arrangementer">
            {{ arr.date }}
          </li>
        </ul>
      </div>
    </div>
    <img class="bekk" src="../assets/bekk_pos_white.png" />
  </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Bedriftspresentasjoner og Kurs',
    };
  },
  computed: {
    bedrifter() {
      if (this.$store.state.events) {
        return this.$store.state.events.bedpres;
      }
      return [];
    },
    arrangementer() {
      if (this.$store.state.events) {
        return this.$store.state.events.arr;
      }
      return [];
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
  font-size: 3vh;
}

ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}

li {
  list-style: none;
  color: white;
  font-size: 3vh;
  padding: 1vh;
}

img.abakus {
  opacity: 1;
  width: 60%;
}

img.bekk {
  opacity: 1;
  width: 50%;
}

.container {
  height: auto;
  width: auto;
  display: flex;
}

.list-left {
  height: auto;
  width: 50%;
  padding-left: 2.5vw;
}
.list-right {
  height: auto;
  width: 50%;
  flex-grow: 1;
  padding-right: 2.5vw;
}

.align-right {
  text-align: right;
}

li+li {
  border-top: 1px solid white;
}

.card {
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.9)

}
.border {
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 2.5%;
}
</style>
