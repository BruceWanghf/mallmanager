<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <img src="../../assets/xmlogo.png" alt="">
                    </div>
                </el-col>
                <el-col :span="18" class="middle">
                    <H1>雄猫综合运维管理系统</H1>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <a class='logout' href="">退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside" width="200px">Aside</el-aside>
            <el-main class="main">Main</el-main>
        </el-container>
    </el-container>
</template>


<script>
export default {};
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
.logout{
    line-height: 60px;
    text-decoration: none;
}
</style>