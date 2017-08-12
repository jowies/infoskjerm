<template>
  <div id="app">
    <transition v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
        <component v-bind:is="slide"></component>
    </transition>
  </div>
</template>

<script>
import { TweenLite } from 'gsap';
import Bus from './components/Bus';
import Bedpres from './components/Bedpres';
import Fadder1 from './components/Fadder1';
import Fadder2 from './components/Fadder2';

export default {
  name: 'app',
  methods: {
    enter(el, done) {
      const width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      TweenLite.from(el, 2, { x: -width * 2, onComplete: done });
    },
    leave(el, done) {
      const width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      TweenLite.to(el, 2, { x: width * 2, onComplete: done });
    },
  },
  computed: {
    slide() {
      return this.$store.state.activeSlide;
    },
  },
  components: {
    bus: Bus,
    events: Bedpres,
    fadder1: Fadder1,
    fadder2: Fadder2,
  },
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
