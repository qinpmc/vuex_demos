<template>
<div>
	<h2>{{msg}}</h2>
</div>
</template>

<script>
 

export default {

        data(){
            return {
                msg:'hello vuex'
            }
        },
		
		methods:{
			parentMet1(){
				console.log("parentMet1111")
			},
			parentMet2(){
				console.log("parentMet222")
			},
			met(){
				console.log("met.......")
			}
		}
}
</script>
