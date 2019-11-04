<template>
    <el-card class="box-card">
        <my-bread level1="商品管理" level2="分类参数"></my-bread>

        <el-alert v-if="selectOptions.length!==3" title="只允许为第三级分类设置参数" type="error" center show-icon class="info-alert"></el-alert>
        <el-form class="formcas" label-position="left" label-width="80px" >
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
    </el-card>
</template>

<script>
export default {
    data(){
        return {
            options: [],
            selectOptions: [],
            defaultProp: {
                label: "cat_name",
                value: "cat_id",
                children: "children"
            },

            arrDyparams:[]
        }
    },
    created(){
        this.getGoodCate()
    },
    methods: {
        async handleChange(){
            if(this.selectOptions.length===3){
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
                
            }
        },
        //获取三级分类
        async getGoodCate() {
            const res = await this.$http.get("categories?type=3");
            this.options = res.data.data;
        },
    },
};
</script>
<style>
.info-alert {
    margin-top: 10px;
}
.formcas {
    margin-top: 20px
}
</style>