import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    count: 13,
    anotherCount: 17,
    array: [
      {
        name: "lis",
        age: 19
      },
      {
        name: "zhangs",
        age: 2
      },
      {
        name: "wangw",
        age: 22
      },
      {
        name: "zhaol",
        age: 17
      }
    ]
  },
  getters: {
    gt18: state => {
      let gt18Array = state.array.filter((item) => {
        return item.age > 18;
      })
      return gt18Array;
    },
    gt18Length: (state, getters) => {
      return getters.gt18.length;
    },
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
  mutations: {

  },
  actions: {

  },
})
