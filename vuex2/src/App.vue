<template>
  <div id="app">
    Clicked:{{$store.state.count}} times,count is{{evenOrOdd}}
    <button @click="increment222('testinfo')">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  // computed:mapGetters([
  //   "evenOrOdd"
  // ]),
  computed: {
    evenOrOdd() {
      return this.$store.state.evenOrOdd;
    }
  },
  methods: {
    increment222: function(info) {
      return this.$store.dispatch("increment",info);
    },
    ...mapActions(["decrement", "incrementIfOdd", "incrementAsync"])
  }
  //   methods: mapActions([
  //   'increment',
  //   'decrement',
  //   'incrementIfOdd',
  //   'incrementAsync'
  // ])
};
</script>
