<template>
<div>
    <div>
        <h2>{{msg}}</h2>
        <hr>
        <h3>$store.state.count:{{$store.state.count}}</h3>
        <h3>count: {{count}}</h3>
        <h3>mycount: {{mycount}}</h3>
    </div>
    <div>
        <button @click="$store.commit('add')">+</button>
        <button @click="$store.commit('reduce')">-</button>
    </div>
</div>
</template>



<script>
import store from './store.js'
import {mapState} from 'vuex';

export default {
        // computed:{
        //     count(){
        //         return this.$store.state.count;
        //     }
        // },


        // computed:mapState({
        //     count:state => state.count
        // }),

        //computed:mapState(["count"]), // 当映射的计算属性的名称与 state 的子节点名称相同时
        
		/*
        computed:mapState({
			count:state => state.count,
            mycount: "count"
             
        }),*/
		
		
		computed:{
			...mapState(["count"]), // mapState 函数返回一个对象,对象具有count属性，采用解构赋值
			//...mapState({mycount: "count"}) , // 和下方的写法等价
			mycount:mapState(["count"]).count
			
			
		},
		
        data(){
            return {
                msg:'hello vuex'
            }
        },
        //store:store
}
</script>

 