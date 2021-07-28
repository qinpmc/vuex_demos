export default {
    namespaced: true,
    state: {
        text: 'moduleA'
    },
    getters: {
        // 注意:rootState必须是第三个参数
        detail(state, getters, rootState) {
            return state.text + '-' + rootState.name;
        }
    },
    actions: {
        callAction({state, rootState}) {
            console.log(rootState);
            alert(state.text + '-' + rootState.name);
        }
    },
    mutations: {
        setText(state) {
            state.text = 'A'
        }
    },
 
}