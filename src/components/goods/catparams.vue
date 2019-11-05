<template>
    <el-card class="box-card">
        <my-bread level1="商品管理" level2="分类参数"></my-bread>

        <el-alert
            v-if="selectOptions.length!==3"
            title="只允许为第三级分类设置参数"
            type="error"
            center
            show-icon
            class="info-alert"
        ></el-alert>
        <el-form class="formcas" label-position="left" label-width="80px">
            <el-form-item label="商品分类">
                <el-cascader
                    v-model="selectOptions"
                    :options="options"
                    :props="defaultProp"
                    @change="handleChange"
                    :show-all-levels="false"
                ></el-cascader>
            </el-form-item>
        </el-form>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane label="动态参数" name="1">
                <el-button type="danger">设置动态参数</el-button>
                <el-table height="400px" :data="arrDyparams" style="width: 100%">
                    <el-table-column type="expand" label="#" width="60">
                        <template slot-scope="scope">
                            <el-tag
                                :key="tag"
                                v-for="tag in scope.row.attr_vals"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name,tag)"
                            >{{tag}}</el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm(scope.row)"
                                @blur="handleInputConfirm(scope.row)"
                            ></el-input>
                            <el-button
                                v-else
                                class="button-new-tag"
                                size="small"
                                @click="showInput"
                            >+ New Tag</el-button>
                        </template>
                    </el-table-column>

                    <el-table-column prop="attr_name" label="属性名称" width="120"></el-table-column>
                    <el-table-column prop label="操作">
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
            </el-tab-pane>
            <el-tab-pane label="静态参数" name="2">
                <el-button type="danger">设置静态参数</el-button>
                <el-table height="400px" :data="arrStaparams" style="width: 100%">
                    <el-table-column type="index" label="#" width="60"></el-table-column>
                    <el-table-column prop="attr_name" label="属性名称" width="260"></el-table-column>
                    <el-table-column prop="attr_vals" label="属性值" width="260"></el-table-column>
                    <el-table-column prop label="操作">
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
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            options: [],
            selectOptions: [],
            defaultProp: {
                label: "cat_name",
                value: "cat_id",
                children: "children"
            },
            activeName: "",
            arrDyparams: [],
            activeName:'1',
            list:[],
            inputVisible: false,
            inputValue: '',
            arrStaparams:[]
        };
    },
    created() {
        this.getGoodCate();
    },
    methods: {
        handleChange() {
            if (this.selectOptions.length === 3) {
                if(this.activeName==='1'){
                    this.getDydata()
                }else if(this.activeName==='2'){
                    this.getStadata()
                }
            }else{
                this.arrDyparams = []
                this.arrStaparams = []
            }
        },
        //获取三级分类
        async getGoodCate() {
            const res = await this.$http.get("categories?type=3");
            this.options = res.data.data;
        },
        handleClick() {
            if(this.activeName==='2'){
                if(this.selectOptions.length === 3){
                    
                    this.getStadata()
                }else{
                    this.arrStaparams = []
                    this.arrDyparams = []
                }
                
            }else if(this.activeName==='1'){
                this.getDydata()
            }
        },
        async getDydata(){
            const res = await this.$http.get(
                `categories/${this.selectOptions[2]}/attributes?sel=many`
            );
            
            this.arrDyparams = res.data.data;
            this.arrDyparams.forEach(element => {
                element.attr_vals =
                    element.attr_vals.length === 0
                        ? []
                        : element.attr_vals.trim().split(",");
            });
        },
        async getStadata(){
            const res = await this.$http.get(
            `categories/${this.selectOptions[2]}/attributes?sel=only`
            );
            console.log(res)
            this.arrStaparams = res.data.data;
        },
        showEdit(params) {},
        showDel(paramId) {},

        //点击X按钮的事件
        async handleClose(attr_vals,attr_id,attr_name,tag) {
            attr_vals.splice(attr_vals.indexOf(tag), 1);
            //发送请求
            //categories/:id/attributes/:attrId
            //put请求的请求体
            // attr_name	参数名称	不能为空
            // attr_sel	[only,many]	不能为空
            // attr_vals	如果是 many 就需要填写值的选项，以逗号分隔

            let putData = {
                attr_name:attr_name,
                attr_sel:'many',
                attr_vals:attr_vals.join(',')
            }
            const res = await 
            this.$http.put(`categories/${this.selectOptions[2]}/attributes/${attr_id}`,putData)
            console.log(res)

        },
        //点击new tag 按钮
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        //回车键or失去焦点
        async handleInputConfirm(attr) {
            let inputValue = this.inputValue;
            if (inputValue) {
                attr.attr_vals.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';

            let putData = {
                attr_name:attr.attr_name,
                attr_sel:'many',
                attr_vals:attr.attr_vals.join(',')
            }
            const res = await this.$http.put(`categories/${this.selectOptions[2]}/attributes/${attr.attr_id}`,putData)
            console.log(res)
        }
    }
};
</script>
<style>
.info-alert {
    margin-top: 10px;
}
.formcas {
    margin-top: 20px;
}
</style>