<template>
  <div class="border">
  <div class="card">
    <img src="../assets/abakus_logo_white-ny.png" />
    <h1>{{ msg }}</h1>
  </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Velkommen #1-tisser',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  margin-top: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

img {
  opacity: 1;
  width: 50%;
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
