<template>
  <div v-if="fresh">
    <div>待审核:</div>
    <el-scrollbar height="70vh">
      <el-empty description="暂无信息" v-if="noInfo"></el-empty>
      <div v-for="(m,index) in projectToDo">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="projectToDoShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.award_info_stu_name}}</span>
            <span style="font-weight: bold;">学号：{{m.award_info_stu_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="获奖名称:">{{m.award_info_name}}</el-descriptions-item>
              <el-descriptions-item label="颁发单位:">{{m.award_info_unit}}</el-descriptions-item>
              <el-descriptions-item label="获奖时间:">{{m.award_info_time}}</el-descriptions-item>
              <el-descriptions-item label="获奖名次:">{{m.award_info_rank}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadProject(m.award_info_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-button @click="passProject(index)">通过</el-button>
            <el-button @click="rejectProject(index)">驳回</el-button>
            <el-button @click="waitProject(index)">稍后</el-button>
            <span style="margin-left: 5px">认定时间:</span>
            <span style="color:cornflowerblue;">{{m.award_info_year}}</span>
          </el-card>
        </transition>
      </div>
    </el-scrollbar>

    <!--        历史-->
    <div style="width: 100%; height: 3px; background-color: lightblue"></div>
    <div>历史:</div>
    <el-scrollbar height="70vh">
      <div v-for="(m,index) in projectDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="projectDidShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.award_info_stu_name}}</span>
            <span style="font-weight: bold;">学号：{{m.award_info_stu_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="获奖名称:">{{m.award_info_name}}</el-descriptions-item>
              <el-descriptions-item label="颁发单位:">{{m.award_info_unit}}</el-descriptions-item>
              <el-descriptions-item label="获奖时间:">{{m.award_info_time}}</el-descriptions-item>
              <el-descriptions-item label="获奖名次:">{{m.award_info_rank}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadProject(m.award_info_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.award_info_status==='1'">已通过</el-tag>
            <el-tag type="warning" v-if="m.award_info_status==='0'">待审核</el-tag>
            <el-tag type="danger" v-if="m.award_info_status==='2'">已驳回</el-tag>
            <span style="margin-left: 5px">认定时间:</span>
            <span style="color:cornflowerblue;">{{m.award_info_year}}</span>
          </el-card>
        </transition>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import request from "@/utils/request";
import fileApi from "@/components/Store";

export default {
  name: "gCAuditAward",

  data(){
    return{
      user:{},
      power:{},
      numShow:false,//是否显示红点
      toDoNum:0,//红点数
      noInfo:false,
      projectToDoShow:[],
      projectDidShow:[],
      projectToDo:[],//待审核列表
      projectDid:[],
      fresh:true,
      Fapi:'',
    }
  },
  created() {
    this.Fapi=fileApi.fileApi
    this.power=JSON.parse(sessionStorage.getItem('power'))
    if(this.power.type===1){
      this.user=JSON.parse(sessionStorage.getItem('user_t'))
    }else{
      this.user=JSON.parse(sessionStorage.getItem('user'))
    }
    this.getData();
  },

  methods:{
    //刷新组件
    refreshComponent(){
      this.fresh=false
      this.getData()
      this.$nextTick(()=>{
        this.fresh=true
      })
    },

    downloadProject(m){
      window.location.href=this.Fapi+"/Award/"+m
    },
    passProject(index){
      request.post('/pass_award',this.projectToDo[index]).then(res=>{
        // console.log(res.msg)
        this.projectToDoShow[index]=false
        delete this.projectToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    rejectProject(index){
      request.post('/refuse_award',this.projectToDo[index]).then(res=>{
        // console.log(res.msg)
        this.projectToDoShow[index]=false
        delete this.projectToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    waitProject(index){
      this.projectToDoShow[index]=false
      if(this.toDoNum-1===0){
        this.numShow=false
      } else {
        this.toDoNum--
      }
      this.$emit('awardKey',this.toDoNum,this.numShow)
    },

    getData(){
      request.post('/find_all_Award_info_new',this.user).then(res=>{
        this.projectToDo=res
        for(let i=0;i<this.projectToDo.length;i++){
          this.projectToDoShow[i]=true
        }
        console.log("获奖")
        console.log(this.projectToDo)
        //原numcount函数内容
        this.toDoNum=this.projectToDo.length
        if(this.toDoNum===0){
          this.numShow=false
          this.noInfo=true
        }
        else {
          this.numShow=true
          this.noInfo=false
        }
        console.log("number")
        console.log(this.toDoNum)
        this.$emit('awardKey',this.toDoNum,this.numShow)
      })

      request.post('/find_all_Award_info_old',this.user).then(res=>{
        console.log("award记录:"+res)
        this.projectDid=res
        for(let i=0;i<this.projectDid.length;i++){
          this.projectDidShow[i]=true
        }
      })
    },
  },
}
</script>

<style scoped>

</style>