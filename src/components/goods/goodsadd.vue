<template>
    <el-card class="box-card">
        <my-bread level1="商品管理" level2="添加商品"></my-bread>

        <el-alert title="添加商品信息" :type="infotype" center show-icon class="info-alert"></el-alert>

        <el-steps :active="1*activeName" finish-status="success" align-center class="info-step">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
        </el-steps>
        <!-- 由于都用一个表单提交，最外层包裹一个el-form -->
        <el-form label-position="top" label-width="80px" :model="form">
            <el-tabs
                @tab-click="tabchange()"
                v-model="activeName"
                tab-position="left"
                style="margin-top:20px"
                class="info-tabs"
            >
                <el-tab-pane name="1" label="基本信息" style="height:400px;overflow:auto">
                    <el-form-item label="商品名称">
                        <el-input v-model="form.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="form.goods_price"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量">
                        <el-input v-model="form.goods_weight"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量">
                        <el-input v-model="form.goods_number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <el-cascader
                            v-model="selectOptions"
                            :options="options"
                            :props="defaultProp"
                            @change="handleChange"
                        ></el-cascader>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="2" label="商品参数">
                    <!-- 该三级分类的商品参数 -->
                    <el-alert
                        v-if="selectOptions.length!==3"
                        title="请选择三级分类"
                        type="warning"
                        center
                        show-icon
                        class="info-alert"
                    ></el-alert>
                    <el-form-item
                        :label="item1.attr_name"
                        v-for="(item1,i) in arrDyparams"
                        :key="i"
                    >
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox
                                v-for="(item2,i) in item1.attr_vals"
                                :key="i"
                                :label="item2"
                                border
                            ></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="3" label="商品属性">
                    <el-form-item
                        v-for="(item3,i) in arrStaparams"
                        :key="i"
                        :label="item3.attr_name"
                    >
                        <el-input v-model="item3.attr_vals"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="4" label="商品图片">
                    <el-form-item>
                        <el-upload
                            class="upload-demo"
                            action="http://localhost:8888/api/private/v1/upload"
                            :headers="headers"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess"
                            list-type="picture"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane name="5" label="商品内容">
                    <el-form-item>
                        <el-button @click="addGoods()" type="primary">添加商品</el-button>
                        <quill-editor v-model="form.goods_introduce"></quill-editor>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </el-card>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
    components: {
        quillEditor
    },
    data() {
        return {
            infotype: "success",
            activeName: "1",
            // goods_name	商品名称	不能为空
            // goods_cat	以为','分割的分类列表	不能为空
            // goods_price	价格	不能为空
            // goods_number	数量	不能为空
            // goods_weight	重量	不能为空
            // goods_introduce	介绍	可以为空
            // pics	上传的图片临时路径（对象）	可以为空
            // attrs	商品的参数（数组）	可以为空
            form: {
                goods_name: "",
                goods_cat: "",
                goods_price: "",
                goods_number: "",
                goods_weight: "",
                goods_introduce: "",
                pics: [],
                attrs: []
            },
            options: [],
            selectOptions: [],
            defaultProp: {
                label: "cat_name",
                value: "cat_id",
                children: "children"
            },
            arrDyparams: [],
            checkList: [],
            arrStaparams: [],
            headers:{
                Authorization:localStorage.getItem("token")
            }
        };
    },
    created() {
        this.getGoodCate();
    },
    methods: {
        //添加商品
        async addGoods(){
            //发请求之前处理this.form中的未处理数据
            //1.goods_cat的数据
            this.form.goods_cat = this.selectOptions.join(',')
            //2.pic在上传和移除图片是处理上传和移除 [].findIndex()
            //3.attrs[{attr_id:?,attr_value:?}]
            console.log(this.arrDyparams)
            //把arrDyparams遍历取值放到新数组中
            let arr1 = this.arrDyparams.map((item)=>{
                return {attr_id:item.attr_id,attr_value:item.attr_vals}
            })
            let arr2 = this.arrStaparams.map((item)=>{
                return {attr_id:item.attr_id,attr_value:item.attr_vals}
            })
            this.form.attrs = [...arr1,...arr2]

            const res = await this.$http.post(`goods`,this.form)
            console.log(res)

            //返回商品列表页
            this.$router.push({name:'goods'})
        },
        //图片上传是的相关方法
        //file为当前操作的图片的相关信息（图片名，图片路径等信息）
        handlePreview(file){
            
        },
        handleSuccess(file){
            //file.data.tmp_path 临时图片路径
           
            this.form.pics.push({
                pic:file.data.tmp_path
            })
            
        },
        handleRemove(file){
            //file.response.data.tmp_path 临时图片路径
            
            //移除图片
            //先获取该图片的索引
            let index = this.form.pics.findIndex((item)=>{
                return item.pic === file.response.data.tmp_path
            })
            this.form.pics.splice(index,1)
            
        },
        //商品分类级联的change方法
        handleChange() {},
        //获取三级分类的信息
        async getGoodCate() {
            const res = await this.$http.get("categories?type=3");            
            this.options = res.data.data;
        },
        //点击不同的tab事件
        async tabchange() {
            //点击第二个tab，同时三级分类要有值
            if (this.activeName === "2") {
                if (this.selectOptions.length !== 3) {
                    this.$message.warning("请先选择三级分类");
                    return;
                }
                //获取参数数据
                const res = await this.$http.get(
                    `categories/${this.selectOptions[2]}/attributes?sel=many`
                );
                
                this.arrDyparams = res.data.data;
                this.arrDyparams.forEach(element => {
                    element.attr_vals =
                        element.attr_vals.length === 0
                            ? []
                            : element.attr_vals.trim().split(",");
                    this.checkList += element.attr_vals + ",";
                });
                this.checkList = this.checkList
                    .substr(0, this.checkList.length - 1)
                    .trim()
                    .split(",");
            } else if (this.activeName === "3") {
                if (this.selectOptions.length !== 3) {
                    this.$message.warning("请先选择三级分类");
                    return;
                }
                //获取静态参数的数据
                const res = await this.$http.get(
                    `categories/${this.selectOptions[2]}/attributes?sel=only`
                );
                
                this.arrStaparams = res.data.data;
            }
        }
    }
};
</script>
<style >
.info-alert {
    margin-top: 10px;
}
.info-step {
    margin-top: 10px;
}
.ql-editor{
    min-height: 300px
}
</style>