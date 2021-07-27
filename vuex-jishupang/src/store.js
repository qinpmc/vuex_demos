import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count :0
}


const mutations = {
  add(state){
    state.count++;
  },
  reduce(state){
    state.count-= 1;
  },
   reduceFac(state,reduceFactor){
    state.count-= reduceFactor;
  }
}

const actions = {
	add(context){
		console.log(context);
		context.commit("add");
	},
	reduceFac({commit},reduceFactor){
		commit('reduceFac',reduceFactor);
		
	},
	increaseAsync({commit}){
		setTimeout(()=>{
			commit('add');
		},1500)
	}
	
}

/*
export default new Vuex.Store({
  state,
  mutations,
  actions
})

*/

const moduleA = {
	state,
	mutations,
	actions
}

export default new Vuex.Store({
	modules:{
		a:moduleA
	}
})


