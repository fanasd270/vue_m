<template>
<div>
  图书管理
</div>
  <div class="echarts">
    <div id="barchart" :style="{ width: '380px', height: '300px' }"></div>
  </div>

</template>

<script>

import * as echarts from "echarts";
import { onMounted } from "vue";

export default {
  name: "gCLib",

  setup() {
    onMounted(() => {
      var myChart = echarts.init(document.getElementById("barchart"));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "ECharts入门",
        },
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [13, 25, 46, 21, 40, 20],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    })
    return {}
  },
  data() {
    return {};
  },



  methods: {},
}
</script>

<style scoped>

</style>