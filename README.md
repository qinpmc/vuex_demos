
- https://www.jianshu.com/p/83d5677b0928
- https://zhuanlan.zhihu.com/p/38090965
- https://www.cnblogs.com/chinabin1993/p/9848720.html




vuex中，有默认的五种基本的对象：

- state：存储状态（变量）
- getters：对数据获取之前的再次编译，可以理解为state的计算属性。我们在组件中使用 $sotre.getters.fun()
- mutations：修改状态，并且是同步的。在组件中使用$store.commit('',params)。这个和我们组件中的自定义事件类似。
- actions：异步操作。在组件中使用是$store.dispath('')
- modules：store的子模块，为了开发大型项目，方便状态管理而使用的。 


1. 模块内部的 state 是局部的，只属于模块本身所有，所以外部必须通过对应的模块名进行访问

```
// moduleA.js
export default {
    state: {
        text: 'moduleA'
    },
    getters: {},
    mutations: {},
    actions: {}
}




// store.js
import moduleA from './module/moduleA';
import moduleB from './module/moduleB';

export default new Vuex.Store({
    modules: {
        moduleA, moduleB,
    },
    // ...
}



// 组件中
// ...
computed: {
    ...mapState({
        name: state => state.moduleA.text
    }),
},

```

2. 模块内部的 action、mutation 和 getter 默认可是注册在**全局**命名空间的，这样使得多个模块能够对同一 mutation 或 action 作出响应。


```
// moduleA.js
mutations: {
    setText(state) {
        state.text = 'A'
    }
},


// moduleB.js
mutations: {
    setText(state) {
        state.text = 'B'
    }
},



// 组件中
<script>
    import {mapState, mapMutations} from 'vuex';
    export default {
        computed: {
            ...mapState({
                name: state => (state.moduleA.text + '和' + state.moduleB.text)
            }),
        },
        methods: {
            ...mapMutations(['setText']),
            modifyNameAction() {
                this.setText();
            }
        },
    }
</script>
// 执行modifyNameAction方法，会发现模块 A 和 B 中的 text 值都改变 

```








## State
Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。


Vuex 通过 **store 选项**，提供了一种机制将状态从根组件“注入”到**每一个子组件**中（需调用 Vue.use(Vuex)）：

```
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})

```

子组件Counter使用，子组件能通过 this.$store 访问：

```
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

### mapState 辅助函数


```
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}

//映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])

```



### 对象展开运算符


```
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```


## Getter

使用场景： 有多个组件需要用到state中某属性，解决方案：
- 1. 用到的地方复制这个函数
- 2. 抽取到一个共享函数然后在多处导入
无论哪种方式都不是很理想。
Vuex 允许我们在 store 中定义“getter”（可以认为**是 store 的计算属性**）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

可以从 store 中的 state 中**派生**出一些状态，例如对列表进行过滤并计数：

```
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```
### Getters 参数

Getter 接受 state 作为其第一个参数，接受其他 getter 作为第二个参数

```
getters: {
    doneTodos: state => {
        return state.todos.filter(todo => todo.done)
    }
    // ...
    doneTodosCount: (state, getters) => {
        return getters.doneTodos.length
    }
}

```
 
### 通过属性访问

在任何组件中使用它：


```
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

### 通过方法访问

```
  getters: {
    // 根据传入的name查询数据, 数据存在, 返回数据中的name
    getSomeoneAge(state) {
      return (name) => {
        let oneData = state.array.find((ele) => {
          return ele.name == name;
        });
        let age = oneData ? oneData.age : "查无此人"
        return age;
      }
    }
  },
```

### mapGetters 辅助函数


```
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
```

## Mutation

mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。        
这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：



### Mutation 必须是同步函数





### 在组件中提交 Mutation

```
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}

```





## actions 和 mutations 区别
- 作者：尤雨溪
- 链接：https://www.zhihu.com/question/48759748/answer/112823337

区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化。
事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。异步竞态怎么处理那是用户自己的事情。   
vuex 真正限制你的只有 mutation 必须是同步的这一点（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。
同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。        
如果你开着 devtool 调用一个异步的 action，你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态。         
其实我有个点子一直没时间做，那就是把记录下来的 mutations 做成类似 rx-marble 那样的时间线图，对于理解应用的异步状态变化很有帮助。  


vscode的帮助：
ctrl+shift+p










































