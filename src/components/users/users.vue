<template>
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="rowSearch">
            <el-col>
                <el-input clearable placeholder="请输入内容" v-model="query" class="input-select">
                    <el-button @click="searchUsers()" slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success" @click="showAddUser()">添加用户</el-button>
            </el-col>
        </el-row>

        <el-table height="400px" :data="userList" style="width: 100%">
            <el-table-column type="index" label="#" width="60"></el-table-column>
            <el-table-column prop="username" label="姓名" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="mobile" label="电话"></el-table-column>

            <!-- {{cretae_time | fmdate}} -->
            <!-- 如果单元格内显示的不是字符串（文本），需要给被显示的内容外层包裹一个template -->
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    <!-- template 内部要用数据，需要设置slot-scope属性
                         该属性的值是要使用数据的数据源 此处为userList(scope)
                         slot-scope的值其实就是el-table绑定的数据userlist
                    userList(scope).row 是数组中的每个对象-->
                    {{scope.row.create_time | fmdate}}
                </template>
            </el-table-column>
            <el-table-column label="用户状态" width="100">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column prop label="操作">
                <template slot-scope="scope">
                    <el-button @click="showEdit(scope.row)" size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button @click="showDel(scope.row.id)" size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
                    <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[2, 4, 6,8]"
            :page-size="2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>

        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="form">
                <el-form-item hide-required-asterisk label="用户名" label-width="100px">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="100px">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="100px">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="100px">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="addUser()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
            <el-form   :model="form">
                <el-form-item hide-required-asterisk label="用户名" label-width="100px">
                    <el-input  disabled v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="100px">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" label-width="100px">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisibleEdit = false">确 定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            query: "",
            userList: [],
            //分页相关的数据
            total: -1,
            pagenum: 1,
            pagesize: 2,
            dialogFormVisibleEdit:false,
            dialogFormVisibleAdd:false,
            form:{
                username:'',
                password:'',
                email:'',
                mobile:''
            }
        };
    },
    created() {
        this.getUserList();
    },
    methods: {
        showEdit(user){
            this.form = user
            this.dialogFormVisibleEdit = true
        },
        showDel(userId){
          this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await this.$http.delete(`users/${userId}`)
          console.log(res)
          if(res.data.meta.status===200){
              this.pagenum = 1
              this.getUserList()  
              this.$message({
                type: 'success',
                message: res.data.meta.msg
              })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        async addUser(){
            const res = await this.$http.post("users",this.form)
            const {
                data,
                meta:{ msg, status}
            } = res.data
            
            if(status===201){
                this.$message.success(msg)
                this.dialogFormVisibleAdd = false
                this.form = {}
                this.getUserList()
            }else{
                this.$message.warning(msg)
                this.getUserList()
            }
        },
        showAddUser(){
            this.dialogFormVisibleAdd = true
        },
        searchUsers() {
            this.getUserList();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagenum = 1;
            this.pagesize = val;
            this.getUserList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.getUserList();
        },
        async getUserList() {
            //this.$http
            // query	查询参数	可以为空
            // pagenum	当前页码	不能为空
            // pagesize	每页显示条数	不能为空
            const AUTH_TOKEN = localStorage.getItem("token");
            this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            const res = await this.$http.get(
                `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
            );
            console.log(res);

            const {
                meta: { status, msg },
                data: { users, total }
            } = res.data;
            if (status === 200) {
                //1.给表格数据赋值
                //2.  给total赋值，提示
                this.userList = users;
                this.total = total;
                this.$message.success(msg);
            } else {
                this.$message.warning(msg);
            }
        }
    }
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