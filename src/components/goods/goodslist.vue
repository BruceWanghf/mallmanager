<template>
    <el-card class="box-card">
        <my-bread level1="商品管理" level2="商品列表">  </my-bread>
         <el-row class="rowSearch">
            <el-col :span="24">
                <el-input clearable placeholder="请输入内容" v-model="searchValue" class="input-select">
                    <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success" @click="$router.push({name:'goodsadd'})"  >添加商品</el-button>
            </el-col>
        </el-row>

    </el-card>
</template>
<script>
export default {
    data(){
        return {
            searchValue:''
        }
    },
    methods: {
        handleSearch(){
            
        }
    },
}
</script>
<style>
.box-card {
    height: 100%;
}
.input-select {
    width: 500px;
}
.rowSearch {
    margin-top: 15px;
}
</style>