<template>
  <div id="app">
    <transition name="slide">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100%;
  width: 100%;
}

.slide-enter-active {
  animation: get-in 2s;
}
.slide-leave-active {
  animation: get-out 2s;
}
@keyframes get-in {
  0% {
    transform: translate(-200%);
  }
  100% {
    transform: translate(0px);
  }
}

@keyframes get-out {
  0% {
    transform: translate(0px);
  }
  100% {
    transform: translate(200%);
  }
}

</style>
