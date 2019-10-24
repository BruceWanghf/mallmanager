<template>
    <el-card class="box-card">
        <my-bread level1="权限管理" level2="权限列表"></my-bread>
    </el-card>
</template>
<script>
export default {
    data(){
        return{
            rightList:[],
        }
    },
    created(){
        this.getRightlist()
    },
    methods: {
        async getRightlist(){
            // const AUTH_TOKEN = localStorage.getItem("token")
            // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN
            const res = await this.$http.get(`rights/list`)
            console.log(res)
            this.rightList = res.data.data

        }
    },
}
</script>
<style>
    
</style>