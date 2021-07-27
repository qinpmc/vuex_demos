<template>
<div>
	<h2>{{msg}}</h2>
	<button @click = "parentMet1()">子组件调用父组件方法1</button>
	<button @click = "childMet1()">子组件调用子组件方法1</button>
	<button @click = "met()">子组件调用父子组件同名方法</button>
</div>
</template>

<script>
import parent from "./Parent"

export default {

        data(){
            return {
                msg:'hello child vuex'
            }
        },
		
		methods:{
			childMet1(){
				console.log("childMet11111")
			},
			met(){
				console.log("child met.......")
			}
		},
		mixins: [parent],
}
</script>
