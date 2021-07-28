<template>
  <div id="app">
     <h3>{{name}}</h3>
     <h3>{{aliasName}}</h3>
     <h3>{{nameDetail}}</h3>
     <h3>{{countFullName}}</h3>
     <button @click="modifyNameAction">修改名字</button>

  </div>
</template>

<script>
import {mapState, mapActions,mapMutations,mapGetters} from 'vuex';

/*
      export default {
        data() {
            return {
                name: 'Lucy'
            }
        },

        methods: {
            modifyNameAction() {
                this.name = "bighone"
            }
        }
    }
*/
    export default {

        data:function(){
          return {
            localName:"local Big"
          }
        },
        //映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组
        /*
        computed: {
          // 映射 this.name 为 store.state.name
            ...mapState(['name'])
        },*/

        /*
        computed: mapState({
          // 箭头函数可使代码更简练
          name: state => state.name,

          // 传字符串参数 'name' 等同于 `state => state.name`
          aliasName: 'name',

          // 为了能够使用 `this` 获取局部状态，必须使用常规函数
          countFullName (state) {
            return state.name +" " +this.localName
          }
        }),
        */
        computed: {
            ...mapState({
                // 
                name: state => state.moduleA.text,

                //  
                aliasName: state => state.moduleB.text,

                // 为了能够使用 `this` 获取局部状态，必须使用常规函数
                countFullName (state) {
                  return state.name +" " +this.localName
                }
            }),
            ...mapGetters({
                //nameDetail: 'detail'
                nameDetail: 'moduleA/detail'
            }),
        },
        methods: {
            ...mapActions(['modifyName']),

            //...mapActions(['callAction']),

            ...mapActions({
                callAction:"moduleA/callAction"
            }),
            ...mapMutations(['setText']),
            modifyNameAction() {
                //this.modifyName('bighone');
                //this.setText();
                 this.callAction();
            }
        },
    }

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
