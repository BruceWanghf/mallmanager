<template>
    <el-card class="box-card">
        <my-bread level1="商品管理" level2="添加商品"></my-bread>

        <el-alert title="添加商品信息" :type="infotype" center show-icon class="info-alert"></el-alert>

        <el-steps :active="1*active" finish-status="success" align-center class="info-step">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
        </el-steps>
        <!-- 由于都用一个表单提交，最外层包裹一个el-form -->
        <el-form label-position="top" label-width="80px" :model="form" >
            <el-tabs v-model="active" tab-position="left" style="margin-top:20px" class="info-tabs">
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
                </el-tab-pane>
                <el-tab-pane name="2" label="商品参数"></el-tab-pane>
                <el-tab-pane name="3" label="商品属性"></el-tab-pane>
                <el-tab-pane name="4" label="商品图片"></el-tab-pane>
                <el-tab-pane name="5" label="商品内容"></el-tab-pane>
            </el-tabs>
        </el-form>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            infotype: "success",
            active: "1",
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
                pics: {},
                attrs: []
            }
        };
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
</style>