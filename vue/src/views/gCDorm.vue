<template>
<div>
  <el-tabs v-model="activeName" style="margin:0 1% 0 1%;">
    <el-tab-pane name="first">
      <template #label>松园({{countPlace[0]}})</template>
      <el-tabs v-model="activeNameS" style="margin:0 1% 0 1%;" tab-position="left">
        <el-tab-pane v-for="(item,key,index) in buildingSong" :name="item.key">
          <template #label>{{item.key}}</template>
          <el-card v-for="(room,key1,index1) in item.value" style="display: inline-block; width: 23%; height: 300px ;margin-right: 2%;vertical-align: top">
            <template #header>
              <div class="card-header">
                <span>{{key1}}</span>
              </div>
            </template>
            <el-table :data="room" stripe style="width: 100%">
              <el-table-column prop="accommodation_information_no" label="姓名" width="70"/>
              <el-table-column prop="accommodation_information_stu_no" label="学号" width="90" />
              <el-table-column prop="accommodation_information_bed" label="床号" width="55"/>
              <el-table-column prop="accommodation_information_ismain" label="室长" width="55"></el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane name="second">
      <template #label>竹园({{countPlace[1]}})</template>
      <el-tabs v-model="activeNameZ" style="margin:0 1% 0 1%;" tab-position="left">
        <el-tab-pane v-for="(item,key,index) in buildingZhu" :name="item.key">
          <template #label>{{item.key}}</template>
          <el-card v-for="(room,key1,index1) in item.value" style="display: inline-block; width: 24%;height: 300px ;margin-right: 1%;vertical-align: top">
            <template #header>
              <div class="card-header">
                <span>{{key1}}</span>
              </div>
            </template>
            <el-table :data="room" stripe style="width: 100%">
              <el-table-column prop="accommodation_information_no" label="姓名" width="70"/>
              <el-table-column prop="accommodation_information_stu_no" label="学号" width="90" />
              <el-table-column prop="accommodation_information_bed" label="床号" width="55"/>
              <el-table-column prop="accommodation_information_ismain" label="室长" width="55"></el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane name="third">
      <template #label>梅园({{countPlace[2]}})</template>
      <el-tabs v-model="activeNameM" style="margin:0 1% 0 1%;" tab-position="left">
        <el-tab-pane v-for="(item,key,index) in buildingMei" :name="item.key">
          <template #label>{{item.key}}</template>
          <el-card v-for="(room,key1,index1) in item.value" style="display: inline-block; width: 24%; height: 300px ;margin-right: 1%;vertical-align: top">
            <template #header>
              <div class="card-header">
                <span>{{key1}}</span>
              </div>
            </template>
            <el-table :data="room" stripe style="width: 100%">
              <el-table-column prop="accommodation_information_no" label="姓名" width="70"/>
              <el-table-column prop="accommodation_information_stu_no" label="学号" width="90" />
              <el-table-column prop="accommodation_information_bed" label="床号" width="55"/>
              <el-table-column prop="accommodation_information_ismain" label="室长" width="55"></el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane name="fourth">
      <template #label>兰园({{countPlace[3]}})</template>
      <el-tabs v-model="activeNameL" style="margin:0 1% 0 1%;" tab-position="left">
        <el-tab-pane v-for="(item,key,index) in buildingLan" :name="item.key">
          <template #label>{{item.key}}</template>
          <el-card v-for="(room,key1,index1) in item.value" style="display: inline-block; width: 24%; height: 300px ;margin-right: 1%;vertical-align: top">
            <template #header>
              <div class="card-header">
                <span>{{key1}}</span>
              </div>
            </template>
            <el-table :data="room" stripe style="width: 100%">
              <el-table-column prop="accommodation_information_no" label="姓名" width="70"/>
              <el-table-column prop="accommodation_information_stu_no" label="学号" width="90" />
              <el-table-column prop="accommodation_information_bed" label="床号" width="55"/>
              <el-table-column prop="accommodation_information_ismain" label="室长" width="55"></el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane name="fifth">
      <template #label>菊园({{countPlace[4]}})</template>
      <el-tabs v-model="activeNameJ" style="margin:0 1% 0 1%;" tab-position="left">
        <el-tab-pane v-for="(item,key,index) in buildingJu" :name="item.key">
          <template #label>{{item.key}}</template>
          <el-card v-for="(room,key1,index1) in item.value" style="display: inline-block; width: 24%; height: 300px ;margin-right: 1%;vertical-align: top">
            <template #header>
              <div class="card-header">
                <span>{{key1}}</span>
              </div>
            </template>
            <el-table :data="room" stripe style="width: 100%">
              <el-table-column prop="accommodation_information_no" label="姓名" width="70"/>
              <el-table-column prop="accommodation_information_stu_no" label="学号" width="90" />
              <el-table-column prop="accommodation_information_bed" label="床号" width="55"/>
              <el-table-column prop="accommodation_information_ismain" label="室长" width="55"></el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</div>

</template>

<script>



import request from "@/utils/request";

export default {
  name: "gCDorm",


  data() {
    return {
      activeName:'first',
      activeNameS:'',
      activeNameZ:'',
      activeNameM:'',
      activeNameL:'',
      activeNameJ:'',
      countPlace:[0,0,0,0,0],
      user:{},
      bedRoomList:{},
      buildingSong:[],
      buildingZhu:[],
      buildingMei:[],
      buildingLan:[],
      buildingJu:[],
    };
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.getData()
  },
  methods: {
    getData(){
      request.post("/bedRoomList",this.user).then(res=>{
        console.log(res.data)
        this.bedRoomList=res.data
        let temp={key:'',value:[]}
        let tempCopy={key:'',value:[]}
        for(let item in this.bedRoomList){
          temp.key=item
          temp.value=this.bedRoomList[item]
          if(item.includes("松园")){
            this.buildingSong.push(JSON.parse(JSON.stringify(temp)))
            for(let m in temp.value){
              this.countPlace[0]+=temp.value[m].length
            }
          } else if(item.includes("竹园")){
            this.buildingZhu.push(JSON.parse(JSON.stringify(temp)))
            for(let m in temp.value){
              this.countPlace[1]+=temp.value[m].length
            }
          } else if(item.includes("梅园")){
            this.buildingMei.push(JSON.parse(JSON.stringify(temp)))
            for(let m in temp.value){
              this.countPlace[2]+=temp.value[m].length
            }
          } else if(item.includes("兰园")){
            this.buildingLan.push(JSON.parse(JSON.stringify(temp)))
            for(let m in temp.value){
              this.countPlace[3]+=temp.value[m].length
            }
          } else if(item.includes("菊园")){
            this.buildingJu.push(JSON.parse(JSON.stringify(temp)))
            for(let m in temp.value){
              this.countPlace[4]+=temp.value[m].length
            }
          }
        }
        this.activeNameS=this.buildingSong[0].key
        this.activeNameZ=this.buildingZhu[0].key
        this.activeNameM=this.buildingMei[0].key
        this.activeNameL=this.buildingLan[0].key
        this.activeNameJ=this.buildingJu[0].key
      })
    },

  },
}
</script>

<style scoped>

</style>