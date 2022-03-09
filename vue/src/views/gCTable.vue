<template>
  <div style="position: relative; margin:20px 9% 0 9% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      报表
    </p>

    <div>
<!--      <span style="position: absolute; top: 20px">党团统计</span>-->
      <el-dropdown split-button type="primary" style="margin-bottom: 20px;">
        选择班级
        <template #dropdown>
          <el-dropdown-menu style="margin: 0 3px 0 3px">
            <el-checkbox v-model="checkAll" @change="CheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedClassList" @change="changeOption">
              <div v-for="(m,i) in DTClassList">
                <el-checkbox :label="m" size="large"></el-checkbox>
              </div>
            </el-checkbox-group>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>


    <div class="echarts" style="display: inline-block">
      <div>党团统计</div>
      <div id="chartDT" :style="{ width: '380px', height: '300px' }"></div>
    </div>


    <div class="echarts" style="display: inline-block">
      <div>民族统计</div>
      <div id="chartEthnic" :style="{ width: '380px', height: '300px' }"></div>
    </div>

    <div class="echarts" style="display: inline-block">
      <div>降级生统计</div>
      <div id="chartDemoted" :style="{ width: '380px', height: '300px' }"></div>
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
      checkAll:true,

      DTClassList:[],
      EthnicClassList:[],
      checkedClassList:[],

      DTMsg:[],
      EthnicMsg:[],
      DemotedMsg:[],

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

      optionEthnic : {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 0,
                name: '少数民族'
              },
              {
                value: 0,
                name: '汉族'
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

      optionDemoted : {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 0,
                name: '降级生'
              },
              {
                value: 0,
                name: '普通生'
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
    this.initEthnic()
    this.initDemoted()
  },

  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.getData()
  },


  methods: {
    //党团班级全选按钮
    CheckAllChange(){
      if(this.checkAll===true){
        this.checkedClassList=this.DTClassList
      }
      else{
        this.checkedClassList=[]
      }
      this.changeOption()
    },
    //党团班级选择改变
    changeOption(){
      //重置党团数据
      this.option.series[0].data[0].value=0
      this.option.series[0].data[1].value=0
      this.option.series[0].data[2].value=0
      //重置民族数据
      this.optionEthnic.series[0].data[0].value=0
      this.optionEthnic.series[0].data[1].value=0
      //重置降级生
      this.optionDemoted.series[0].data[0].value=0
      this.optionDemoted.series[0].data[1].value=0

      for(let i in this.checkedClassList){
        //党团
        for(let j=0;j<this.DTMsg.length;j+=3){
          if(this.checkedClassList[i]===this.DTMsg[j].ele_class){
            this.option.series[0].data[0].value+=this.DTMsg[j].ele_count
            this.option.series[0].data[1].value+=this.DTMsg[j+1].ele_count
            this.option.series[0].data[2].value+=this.DTMsg[j+2].ele_count
            break
          }
        }
        //民族
        for(let j=0;j<this.EthnicMsg.length;j+=2){
          if(this.checkedClassList[i]===this.EthnicMsg[j].ele_class){
            this.optionEthnic.series[0].data[0].value+=this.EthnicMsg[j].ele_count
            this.optionEthnic.series[0].data[1].value+=this.EthnicMsg[j+1].ele_count
            break
          }
        }
        //降级生
        for(let j=0;j<this.DemotedMsg.length;j+=2){
          if(this.checkedClassList[i]===this.DemotedMsg[j].ele_class){
            this.optionDemoted.series[0].data[0].value+=this.DemotedMsg[j].ele_count
            this.optionDemoted.series[0].data[1].value+=this.DemotedMsg[j+1].ele_count
            break
          }
        }

      }
      this.init()
      this.initEthnic()
      this.initDemoted()
    },
    //重新画党团图
    init(){
      var myChart = echarts.init(document.getElementById("chartDT"));
      myChart.setOption(this.option);
    },

    initEthnic(){
      var myChart = echarts.init(document.getElementById("chartEthnic"));
      myChart.setOption(this.optionEthnic);
    },

    initDemoted(){
      var myChart = echarts.init(document.getElementById("chartDemoted"));
      myChart.setOption(this.optionDemoted);
    },


    getData(){
      request.post('/findParty_and_League',this.user).then(res=>{
        this.DTMsg=res.data
        this.DTClassList=[]
        for(let i=0;i<this.DTMsg.length;i+=3){
          this.DTClassList.push(this.DTMsg[i].ele_class)
        }
        this.checkedClassList=this.DTClassList
        this.changeOption()
        console.log(this.DTMsg)

        request.post('/ethnic_minority',this.user).then(res=>{
          this.EthnicMsg=res.data
          console.log(res.data)
          this.changeOption()
        }).catch(err=>{
          this.$message.error("获取信息失败")
        })

        request.post('/findDemoted_student',this.user).then(res=>{
          this.DemotedMsg=res.data
          console.log(res.data)
          this.changeOption()
        }).catch(err=>{
          this.$message.error("获取信息失败")
        })

      }).catch(err=>{
        this.$message.error("获取信息失败")
      })
    },

  },
}
</script>

<style scoped>

</style>