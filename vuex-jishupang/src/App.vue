<template>
<div>
    <div>
        <h2>{{msg}}</h2>
        <hr>
        <h3>{{$store.state.a.count}}</h3>
    </div>
    <div>
	 直接调用 $store.commit 派发事件 触发 vuex的 mutations <br>
        <button @click="$store.commit('add')">+</button>
        <button @click="$store.commit('reduce')">-</button>
	<hr>
		
		mapActions 映射 方法到 vuex的 actions <br>
	    <button @click="addMethod">+</button>
        <button @click="reduceMethod(3)">-</button>
		<button @click="addAsyncMethod">异步增加</button>  <br>
		actions 支持异步，而mutations 不支持异步
	<hr>
		直接调用 $store.dispatch 派发事件 触发 vuex的 actions <br>
	    <button @click="$store.dispatch('add')">+</button>
        <button @click="$store.dispatch('reduceFac',3)">-</button>
	<hr>
		<button @click="$store.commit('add')">+</button>
	
	
    </div>
	<hr>
	<div>
		<Parent> </Parent> <hr>
		<Child> </Child>
	
	</div>
	
	
</div>
</template>

<script>
import {mapState,mapMutations,mapActions,matpGetters} from 'vuex'
import Parent from '@/components/Parent.vue'
import Child from '@/components/Child.vue'


export default {

        data(){
            return {
                msg:'hello vuex'
            }
        },
		/*
		methods:mapMutations({
			addMethod: 'add',  // `this.addMethod()` 映射为 `this.$store.commit('add')`
			reduceMethod:'reduceFac'
		})*/
		
		methods:mapActions({
			addMethod: 'add',  // `this.addMethod()` 映射为 `this.$store.dispatch('add')`
			reduceMethod:'reduceFac',
			addAsyncMethod:'increaseAsync'
		}),
		components:{
			Parent,
			Child
		}
}
</script>
