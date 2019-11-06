<template>
    <el-card>
        <my-bread level1="订单管理" level2="订单列表"></my-bread>
    </el-card>
</template>
<script>
import citylist from '@/assets/city.js'
export default {
    data(){
        return {
            caslist:[]
        }
    },
    created(){
        this.caslist = citylist
    },
    methods: {
        
    },
}
</script>
<style>

</style>