<template>
  <div id="app">
    <h3>{{gt18}}</h3>
    <h3>{{gt18Length}}</h3>
    <br>别名：
    <h3>{{aliasName}}</h3>
    <br>
    <span>根据指定名称获取该人年龄</span>
    <input type="text" placeholder="请输入姓名" v-model="name">
    <h3>{{getAgeFromName}}岁</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: function() {
    return {
      name: "wangw"
    };
  },
  computed: {
    // gt18() {
    //   return this.$store.getters.gt18;
    // },
    // gt18Length() {
    //   return this.$store.getters.gt18Length;
    // },
    getAgeFromName() {
      return this.$store.getters.getSomeoneAge(this.name);
    },
    ...mapGetters(["gt18", "gt18Length"]),
    ...mapGetters({
      aliasName: "gt18Length"
    })
  },
  methods: {}
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
