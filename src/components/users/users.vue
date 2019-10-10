<template>
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="rowSearch">
            <el-col>
                <el-input placeholder="请输入内容" v-model="query" class="input-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success">添加用户</el-button>
            </el-col>
        </el-row>

        <el-table :data="userList" style="width: 100%">
            <el-table-column type="index" label="#" width="60"></el-table-column>
            <el-table-column prop="username" label="姓名" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="mg_state" label="用户状态"></el-table-column>
            <el-table-column prop="" label="操作"></el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
    data() {
        return {

          query : '',
          userList: [],
          //分页相关的数据
          total:-1,
          pagenum:1,
          pagesize:5
        }
    },
    created(){
        this.getUserList()
    },
    methods: {
        async getUserList(){
            //this.$http
            // query	查询参数	可以为空
            // pagenum	当前页码	不能为空
            // pagesize	每页显示条数	不能为空
            const AUTH_TOKEN = localStorage.getItem("token")
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
            const res = await this.$http.get
            (`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            console.log(res)

            const {meta:{status,msg},data:{users,total}} = res.data
            if(status===200){
                //1.给表格数据赋值
                //2.  给total赋值，提示
                this.userList = users
                this.total = total
                this.$message.success(msg)

            }else{
                this.$message.warning(msg)
            }
        }
    },
};
</script>

<style >
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