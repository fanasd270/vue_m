<template>
<div>
  图书管理
</div>
  <div class="echarts">
    <div id="barchart" :style="{ width: '380px', height: '300px' }"></div>
  </div>

  <el-button @click="changeOption"></el-button>

</template>

<script>

import * as echarts from "echarts";
import { onMounted } from "vue";

export default {
  name: "gCLib",

  mounted() {
    this.init()
  },

  data() {
    return {
      option : {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: '直接访问'
              },
              {
                value: 234,
                name: '联盟广告'
              },
              {
                value: 1548,
                name: '搜索引擎'
              }
            ]
          }
        ]
      },

    };
  },



  methods: {
    changeOption(){
      this.option.series[0].data[0].name='111'
      this.init()
    },
    init(){
      var myChart = echarts.init(document.getElementById("barchart"));
      myChart.setOption(this.option);
    },


    getData(){

    },

  },
}
</script>

<style scoped>

</style>