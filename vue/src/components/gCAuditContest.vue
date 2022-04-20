<template>
  <div v-if="fresh">
    <div>待审核:</div>
    <el-scrollbar height="70vh">
      <el-empty description="暂无信息" v-if="noInfo"></el-empty>
      <div v-for="(m,index) in contestToDo">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="contestToDoShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.contest_stuname}}</span>
            <span style="font-weight: bold;">学号：{{m.contest_stuno}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="竞赛名称:">{{m.contest_name}}</el-descriptions-item>
              <el-descriptions-item label="项目名称:">{{m.contest_projectname}}</el-descriptions-item>
              <el-descriptions-item label="授予部门:">{{m.contest_grantingdepartment}}</el-descriptions-item>
              <el-descriptions-item label="获奖级别:">{{m.contest_level}}</el-descriptions-item>
              <el-descriptions-item label="获奖名次:">{{m.contest_ranking}}</el-descriptions-item>
              <el-descriptions-item label="获奖时间:">{{m.contest_date}}</el-descriptions-item>
              <el-descriptions-item label="指导老师姓名:">{{m.contest_teachername}}</el-descriptions-item>
              <el-descriptions-item label="指导老师学院:">{{m.contest_teacherdept}}</el-descriptions-item>
              <el-descriptions-item label="获奖证书上传:">{{m.contest_issubmitcertificate}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadContest(m.contest_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-button @click="passContest(index)">通过</el-button>
            <el-button @click="rejectContest(index)">驳回</el-button>
            <el-button @click="waitContest(index)">稍后</el-button>
            <span style="margin-left: 5px" >认定时间:</span>
            <span style="color:cornflowerblue;">{{m.contest_year.substring(0,4)}}</span>
          </el-card>
        </transition>
      </div>
    </el-scrollbar>

    <!--        历史-->
    <div style="width: 100%; height: 3px; background-color: lightblue"></div>
    <div>历史:</div>
    <el-scrollbar height="70vh">
      <div v-for="(m,index) in contestDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="contestDidShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.contest_stuname}}</span>
            <span style="font-weight: bold;">学号：{{m.contest_stuno}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="竞赛名称:">{{m.contest_name}}</el-descriptions-item>
              <el-descriptions-item label="项目名称:">{{m.contest_projectname}}</el-descriptions-item>
              <el-descriptions-item label="授予部门:">{{m.contest_grantingdepartment}}</el-descriptions-item>
              <el-descriptions-item label="获奖级别:">{{m.contest_level}}</el-descriptions-item>
              <el-descriptions-item label="获奖名次:">{{m.contest_ranking}}</el-descriptions-item>
              <el-descriptions-item label="获奖时间:">{{m.contest_date}}</el-descriptions-item>
              <el-descriptions-item label="指导老师姓名:">{{m.contest_teachername}}</el-descriptions-item>
              <el-descriptions-item label="指导老师学院:">{{m.contest_teacherdept}}</el-descriptions-item>
              <el-descriptions-item label="获奖证书上传:">{{m.contest_issubmitcertificate}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadContest(m.contest_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.contest_status==='1'">已通过</el-tag>
            <el-tag type="danger" v-if="m.contest_status==='2'">已驳回</el-tag>
            <span style="margin-left: 5px" >认定时间:</span>
            <span style="color:cornflowerblue;">{{m.contest_year.substring(0,4)}}</span>
            <!--                <el-button @click="passPaper(index)">通过</el-button>-->
            <el-button style="margin-left: 5px" v-if="m.contest_status==='1'" @click="rejectContestDid(index)">驳回</el-button>
            <!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
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
  name: "gCAuditContest",

  data(){
    return{
      user:{},
      power:{},
      numShow:false,//是否显示红点
      toDoNum:0,//红点数
      noInfo:false,
      contestToDoShow:[],
      contestDidShow:[],
      contestToDo:[],//待审核列表
      contestDid:[],
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

    downloadContest(m){
      window.location.href=this.Fapi+"/Contests/"+m
    },
    passContest(index){
      request.post('/pass_contest',this.contestToDo[index]).then(res=>{
        this.contestToDoShow[index]=false
        delete this.contestToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    rejectContest(index){
      request.post('/refuse_contest',this.contestToDo[index]).then(res=>{
        this.contestToDoShow[index]=false
        delete this.contestToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    rejectContestDid(index){
      request.post('/refuse_contest',this.contestDid[index]).then(res=>{

        this.refreshComponent()
      })
    },
    waitContest(index){
      this.contestToDoShow[index]=false
      if(this.toDoNum-1===0){
        this.numShow=false
      } else {
        this.toDoNum--
      }
      this.$emit('contestKey',this.toDoNum,this.numShow)
    },

    getData(){
      request.post('/find_all_contest_info_new',this.user).then(res=>{
        this.contestToDo=res
        for(let i=0;i<this.contestToDo.length;i++){
          this.contestToDoShow[i]=true
        }
        //原numcount函数内容
        this.toDoNum=this.contestToDo.length
        if(this.toDoNum===0){
          this.numShow=false
          this.noInfo=true
        }
        else {
          this.numShow=true
          this.noInfo=false
        }
        this.$emit('contestKey',this.toDoNum,this.numShow)
      })

      request.post('/find_all_contest_info_old',this.user).then(res=>{
        this.contestDid=res
        for(let i=0;i<this.contestDid.length;i++){
          this.contestDidShow[i]=true
        }
      })
    },
  },
}
</script>

<style scoped>

</style>