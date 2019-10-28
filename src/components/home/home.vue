<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <img src="../../assets/xmlogo.png" alt />
                    </div>
                </el-col>
                <el-col :span="18" class="middle">
                    <div class="grid-content bg-purple">
                        <H1>雄猫综合运维管理系统</H1>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <a class="logout"  href="#" @click.prevent="handleLogout()">退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside" width="200px">
                <el-menu :unique-opened="true"
                :router="true"
                >
                    <el-submenu :index="item1.order" v-for="(item1,index) in menus" :key="index">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item1.authName}}</span>
                        </template>
                        <template>
                            <el-menu-item :index="item2.path" v-for="(item2,index) in item1.children" :key="index">
                                <i class="el-icon-menu"></i>
                                <span>{{item2.authName}}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                    <!-- <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <template>
                            <el-menu-item index="role">
                                <i class="el-icon-menu"></i>
                                <span>角色列表</span>
                            </el-menu-item>
                        </template>
                        <template>
                            <el-menu-item index="rights">
                                <i class="el-icon-menu"></i>
                                <span>权限列表</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品管理</span>
                        </template>
                        <template>
                            <el-menu-item index="3-1">
                                <i class="el-icon-menu"></i>
                                <span>商品列表</span>
                            </el-menu-item>
                        </template>
                        <template>
                            <el-menu-item index="3-2">
                                <i class="el-icon-menu"></i>
                                <span>分类参数</span>
                            </el-menu-item>
                        </template>
                        <template>
                            <el-menu-item index="3-3">
                                <i class="el-icon-menu"></i>
                                <span>商品分类</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <template>
                            <el-menu-item index="4-1">
                                <i class="el-icon-menu"></i>
                                <span>订单列表</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>数据统计</span>
                        </template>
                        <template>
                            <el-menu-item index="5-1">
                                <i class="el-icon-menu"></i>
                                <span>数据报表</span>
                            </el-menu-item>
                        </template>
                        
                    </el-submenu> -->
                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>


<script>
export default {

    data(){
        return {
            menus:[]
        }
    },
    //组件渲染成功之前判断 是否有token，如果没有token 就路由到login登录页面
    beforeCreate(){
        const token = localStorage.getItem('token')
        if(!token){
            this.$router.push({name:'login'})
        }
    },
    created(){
        this.getMenus()
    },
    methods: {
        handleLogout(){
            
            localStorage.clear()
            this.$message.success('退出成功')
            this.$router.push({name:'login'})
        },
        async getMenus(){
            const res = await this.$http.get(`menus`)
            console.log(res)
            this.menus = res.data.data
        }
    },
};
</script>

<style>
.container {
    height: 100%;
}
.header {
    background-color: #fff;
}
.aside {
    background-color: #d3dce6;
}
.main {
    background-color: #e9eef3;
    height: 100%;
}
.middle {
    text-align: center;
}
.logout {
    line-height: 60px;
    text-decoration: none;
}
</style>