<template>
  <div class="home">
    <h3>Home</h3>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="gotoAbout">调转到about</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld 
  },
  methods:{
    gotoAbout(){
      console.log(this.$router);
      this.$router.push("about")
    }
  }
}

 
</script>
