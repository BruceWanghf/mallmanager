
<template>
    <el-card>
        <my-bread level1="数据统计" level2="数据报表"></my-bread>

        <div id="main" style="width:800px; height:600px;" ></div>
    </el-card>
</template>
<script>
//echars的使用步骤
// 1.npm i echarts
// 导入
// 视图 提供一个容器 div（需要设置宽高）
// myechart.init(容器)
// 配置选项（配置数据） option
// mychart.setOption(option)

var echarts = require('echarts')

export default {
    data(){
        return {

        }
    },
    //须在mounted中调用，不能在created中调用，因为需要有操作dom元素
    mounted(){
        this.useEchart()
    },
    methods: {
        async useEchart(){
            //init
            var myChart  = echarts.init(document.getElementById("main"))  

            const res = await this.$http.get(`reports/type/1`)
            console.log(res)

            let option2 = res.data.data

            //option
            let option1 = {
                title: {
                    text: '堆叠区域图'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                
            };

            let option = {...option1,...option2}
            //setOption
            myChart.setOption(option)
        }
    },
}
</script>
<style>

</style>