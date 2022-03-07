<template>
  <div style="position: relative; margin:20px 9% 0 9% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      报表
    </p>

    <div style="margin: 32px 10px 0 150px; position: relative">
      <span style="position: absolute; top: 20px">党团统计</span>
      <el-dropdown split-button type="primary" style="margin-left: 100px;">
        选择班级
        <template #dropdown>
          <el-dropdown-menu style="margin: 0 3px 0 3px">
            <el-checkbox v-model="checkAllDT" @change="CheckAllChangeDT">全选</el-checkbox>
            <el-checkbox-group v-model="checkedClassList" @change="changeOptionDT">
              <div v-for="(m,i) in DTClassList">
                <el-checkbox :label="m" size="large"></el-checkbox>
              </div>
            </el-checkbox-group>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>


    <div class="echarts">
      <div id="barchart" :style="{ width: '380px', height: '300px' }"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import request from "@/utils/request";

export default {
  name: "gCTable",

  data() {
    return {
      user:{},
      checkAllDT:true,
      DTClassList:[],
      checkedClassList:[],
      DTMsg:[],
      option : {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 0,
                name: '党员'
              },
              {
                value: 0,
                name: '团员'
              },
              {
                value: 0,
                name: '群众'
              }
            ]
          }
        ],
        tooltip:{
          trigger:'item',
          axisPointer:{
            type:'shadow'
          },
          formatter:'{b}:{c}<br/>百分比:{d}%'
        },
      },

    };
  },

  mounted() {
    this.init()
  },

  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.getData()
  },


  methods: {
    //党团班级全选按钮
    CheckAllChangeDT(){
      if(this.checkAllDT===true){
        this.checkedClassList=this.DTClassList
      }
      else{
        this.checkedClassList=[]
      }
      this.changeOptionDT()
    },
    //党团班级选择改变
    changeOptionDT(){
      //重置数据
      this.option.series[0].data[0].value=0
      this.option.series[0].data[1].value=0
      this.option.series[0].data[2].value=0
      for(let i in this.checkedClassList){
        for(let j=0;j<this.DTMsg.length;j+=3){
          if(this.checkedClassList[i]===this.DTMsg[j].ele_class){
            this.option.series[0].data[0].value+=this.DTMsg[j].ele_count
            this.option.series[0].data[1].value+=this.DTMsg[j+1].ele_count
            this.option.series[0].data[2].value+=this.DTMsg[j+2].ele_count
            break
          }
        }
      }
      this.init()
    },
    //重新画党团图
    init(){
      var myChart = echarts.init(document.getElementById("barchart"));
      myChart.setOption(this.option);
    },


    getData(){
      request.post('/findParty_and_League',this.user).then(res=>{
        this.DTMsg=res.data
        this.DTClassList=[]
        for(let i=0;i<this.DTMsg.length;i+=3){
          this.DTClassList.push(this.DTMsg[i].ele_class)
        }
        this.checkedClassList=this.DTClassList
        this.changeOptionDT()
        console.log(this.DTMsg)
      }).catch(err=>{
        this.$message.error("获取党团信息失败")
      })
    },

  },
}
</script>

<style scoped>

</style>