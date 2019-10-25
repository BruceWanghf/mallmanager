<template>
    <el-card class="box-card">
        <my-bread level1="权限管理" level2="角色列表"></my-bread>
        <el-row class="addrole">
            <el-button round>添加角色</el-button>
        </el-row>

        <el-table height="400px" :data="rolelist" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row v-for="(item1,i) in scope.row.children" :key="i">
                        <el-col :span="4"> <el-tag @close="deleteRight(scope.row,item1.id)" closable>{{item1.authName}} </el-tag> <i class="el-icon-arrow-right"></i> </el-col>
                        <el-col :span="20">
                            <el-row v-for="(item2,j) in item1.children" :key="j">
                                <el-col :span="4">
                                    <el-tag @close="deleteRight(scope.row,item2.id)" closable type="success">
                                    {{item2.authName}}
                                    </el-tag>
                                    <i class="el-icon-arrow-right"></i>
                                </el-col>
                                <el-col :span="15">
                                    <el-tag @close="deleteRight(scope.row,item3.id)" type="warning" v-for="(item3,k) in item2.children" :key="k" closable>
                                        {{item3.authName}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <span v-if="scope.row.children.length===0">未分配权限</span>
                </template>
            </el-table-column>
            <el-table-column type="index" label="#" width="80"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
            <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>
            <el-table-column prop label="操作">
                <template slot-scope>
                    <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
                    <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script>
export default {
    created() {
        this.getRolelist();
    },
    data() {
        return {
            rolelist: []
        };
    },
    methods: {
        async getRolelist() {
            const res = await this.$http.get(`roles`);
            console.log(res);
            this.rolelist = res.data.data;
        },
        async deleteRight(role,rightId){
            const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
            // console.log(res)
            // this.getRolelist()
            if(res.data.meta.status===200){
                role.children = res.data.data
                this.$message.success(res.data.meta.msg)
            }else{
                this.$message.warning(res.data.meta.msg)
            }
            
        }
    }
};
</script>
<style>
.addrole {
    margin-top: 15px;
}
</style>