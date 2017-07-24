<template>
  <div class="border">
    <div class="card">
      <h1>{{ msg }}</h1>
      {{something}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'AtB Bus',
    };
  },
  computed: {
    something() {
      if (!this.$store.state.bus.error) {
        return this.$store.state.bus.next[0].t;
      }
      return 'Connection error';
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
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.card {
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.9;
}

.border {
  height: 100%;
  width: 100%;
  position: absolute;
  padding: 2.5%;
}
</style>
