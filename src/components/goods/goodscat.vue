<template>
    <el-card class="box-card">
        <my-bread level1="商品管理" level2="商品分类"></my-bread>

        <el-row>
            <el-col :span="24" class="searchArea">
                <el-button type="success" @click="addGoodsCate()" >添加分类</el-button>
            </el-col>
        </el-row>
<!-- 添加分类对话框 -->
        <el-dialog title="添加分类" :visible.sync="dialogFormVisibleAdd">

            <el-form :model="form">
                <el-form-item label="分类名称" label-width="120px">
                    <el-input v-model="form.cat_name" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="分类" label-width="120px" >
                    <!-- {{selectOptions}} -->
                    <!-- 
                        expand-trigger="hover"
                        change-on-select
                        clearable
                     -->
                    <el-cascader 
                        :options="caslist"
                        v-model="selectOptions"
                        :props="defaultProp"
                        expand-trigger="hover"
                        change-on-select
                        clearable
                    >
                    </el-cascader>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取消</el-button>
                <el-button type="primary" @click="addCate()">确定</el-button>
            </div>
        </el-dialog>
        <!-- 表格 -->
        <el-table height="450px" :data="list" style="width:100%">
            <!-- <el-table-column label="类别名称" prop="cat_name">
            </el-table-column> -->
            <!-- 
                treeKey -> nodeKey 节点的唯一标识 id
                parentKey > 父节点的id
                levelKey -> 当前节点的级别
                childKey -> 子节点
            -->
            <el-tree-grid
                prop="cat_name"
                label="分类名称"
                treeKey="cat_id"
                parentKey="cat_pid"
                levelKey="cat_level"
                childKey="children"

            >

            </el-tree-grid>
            <el-table-column label="级别">
                <template slot-scope="scope">
                    <span v-if="scope.row.cat_level===0">一级</span>
                    <span v-else-if="scope.row.cat_level===1">二级</span>
                    <span v-else-if="scope.row.cat_level===2">三级</span>
                </template>
            </el-table-column>

            <el-table-column label="是否有效">
                <template slot-scope="scope">
                    <span v-if="scope.row.cat_deleted===false">有效</span>
                    <span v-else-if="scope.row.cat_deleted===true">无效</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                <el-button
                    @click="showEdit(scope.row)"
                    size="mini"
                    plain
                    type="primary"
                    icon="el-icon-edit"
                    circle
                ></el-button>
                <el-button
                    @click="showDel(scope.row.id)"
                    size="mini"
                    plain
                    type="danger"
                    icon="el-icon-delete"
                    circle
                ></el-button>
            </template>
            </el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagenum"
            :page-sizes="[5,10,15,20]"
            :page-size="pagesize"
            layout="total,sizes,prev,pager,next,jumper"
            :total="total"
        >
        </el-pagination>
    </el-card>
</template>

<script>
//引入element tree-grid 
var ElTreeGrid = require('element-tree-grid');

export default {
    components:{
        //组件名 <el-tree-grid>
        ElTreeGrid
    },
    data(){
        return {
            list:[],
            dialogFormVisibleAdd:false,
            selectOptions:[],
            pagesize:10,
            pagenum:1,
            total:1,
            form:{
                cat_pid:-1,
                cat_name:'',
                cat_level:-1
            },
            caslist:[],
            defaultProp:{
                value:"cat_id",
                label:"cat_name",
                children:"children"
            },
            options:[]
        }
    },
    created(){
        this.getGoodsCate()
    },
    methods: {
        async addCate(){
            if(this.selectOptions.length===0){
                this.form.cat_pid = 0
                this.form.cat_level = 0
            }else if(this.selectOptions.length===1){
                this.form.cat_pid = this.selectOptions[0]
                this.form.cat_level = 1
            }else if(this.selectOptions.length===2){
                this.form.cat_pid = this.selectOptions[1]
                this.form.cat_level = 2
            }

            let postData = {
                cat_level:this.form.cat_level,
                cat_name:this.form.cat_name,
                cat_pid:this.form.cat_pid
            }
            const res = await this.$http.post(`categories`,postData)
            this.getGoodsCate()
            this.dialogFormVisibleAdd = false
        },
        async addGoodsCate(){
            const res = await this.$http.get("categories?type=2");            
            this.caslist = res.data.data;
            this.dialogFormVisibleAdd = true

        },
        async getGoodsCate(){
            const res = await this.$http.get(
                `categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
            )
            console.log(res)
            this.list = res.data.data.result;
            this.total = res.data.data.total;
        },
        handleSizeChange(val){
            this.pagesize = val;
            this.pagenum = 1;
            this.getGoodsCate()
        },
        handleCurrentChange(){

        }
    },

}
</script>
<style>
.searchArea {
    margin-top: 15px
}
    
</style>
