<template>
  <div v-if="fresh">
    <div>待审核:</div>
    <el-scrollbar height="70vh">
      <el-empty description="暂无信息" v-if="noInfo"></el-empty>
      <div v-for="(m,index) in paperToDo">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="toDoShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.paper_stuname}}</span>
            <span style="font-weight: bold;">学号：{{m.paper_stuno}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="论文名称:">{{m.paper_name}}</el-descriptions-item>
              <el-descriptions-item label="发表期刊/会议名称:">{{m.paper_periodical}}</el-descriptions-item>
              <el-descriptions-item label="出版时间:">{{m.paper_publicationTime}}</el-descriptions-item>
              <el-descriptions-item label="是否CSCD:">{{m.paper_iscscd}}</el-descriptions-item>
              <el-descriptions-item label="SCI检索号:">{{m.paper_sciSearchNumber}}</el-descriptions-item>
              <el-descriptions-item label="EI检索号:">{{m.paper_eiSearchNumber}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadPaper(m.paper_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-button @click="passPaper(index)">通过</el-button>
            <el-button @click="rejectPaper(index)">驳回</el-button>
            <el-button @click="waitPaper(index)">稍后</el-button>
            <span style="margin-left: 5px" >认定时间:</span>
            <span style="color:cornflowerblue;">{{m.paper_year.substring(0,4)}}</span>
          </el-card>
        </transition>
      </div>
    </el-scrollbar>

    <!--        历史-->
    <div style="width: 100%; height: 3px; background-color: lightblue"></div>
    <div>历史:</div>
    <el-scrollbar height="70vh">
      <div v-for="(m,index) in paperDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="didShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.paper_stuname}}</span>
            <span style="font-weight: bold;">学号：{{m.paper_stuno}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="论文名称:">{{m.paper_name}}</el-descriptions-item>
              <el-descriptions-item label="发表期刊/会议名称:">{{m.paper_periodical}}</el-descriptions-item>
              <el-descriptions-item label="出版时间:">{{m.paper_publicationTime}}</el-descriptions-item>
              <el-descriptions-item label="是否CSCD:">{{m.paper_iscscd}}</el-descriptions-item>
              <el-descriptions-item label="SCI检索号:">{{m.paper_sciSearchNumber}}</el-descriptions-item>
              <el-descriptions-item label="EI检索号:">{{m.paper_eiSearchNumber}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadPaper(m.paper_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.paper_status==='1'">已通过</el-tag>
            <el-tag type="danger" v-if="m.paper_status==='2'">已驳回</el-tag>
            <span style="margin-left: 5px">认定时间:</span>
            <span style="color:cornflowerblue;">{{m.paper_year.substring(0,4)}}</span>
            <!--                <el-button @click="passPaper(index)">通过</el-button>-->
            <!--                <el-button @click="rejectPaper(index)">驳回</el-button>-->
            <!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
          </el-card>
        </transition>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import request from "@/utils/request";
import fileApi from "@/components/Store"

export default {
  name: "gCAuditPaper",
  props:["Data"],
  data(){
    return{
      user:{},
      power:{},
      numShow:false,//是否显示红点
      toDoNum:0,//红点数
      noInfo:false,
      toDoShow:[],
      didShow:[],
      paperToDo:[],//论文待审核列表
      paperDid:[],
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

    downloadPaper(m){
      window.location.href=this.Fapi+"/Papers/"+m
    },

    passPaper(index){
      request.post('/pass_paper',this.paperToDo[index]).then(res=>{
        this.toDoShow[index]=false
        delete this.paperToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    rejectPaper(index){
      request.post('/refuse_paper',this.paperToDo[index]).then(res=>{
        this.toDoShow[index]=false
        delete this.paperToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    waitPaper(index){
      this.toDoShow[index]=false
      if(this.toDoNum-1===0){
        this.numShow=false
      } else {
        this.toDoNum--
      }
      this.$emit('paperKey',this.toDoNum,this.numShow)
    },
    getData(){
      request.post('/find_all_paper_info_new',this.user).then(res=>{
        this.paperToDo=res
        for(let i=0;i<this.paperToDo.length;i++){
          this.toDoShow[i]=true
        }
        //原numcount函数内容
        this.toDoNum=this.paperToDo.length
        if(this.toDoNum===0){
          this.numShow=false
          this.noInfo=true
        }
        else {
          this.numShow=true
          this.noInfo=false
        }
        this.$emit('paperKey',this.toDoNum,this.numShow)
      })

      request.post('/find_all_paper_info_old',this.user).then(res=>{
        this.paperDid=res
        for(let i=0;i<this.paperDid.length;i++){
          this.didShow[i]=true
        }
      })
    },
  },
}
</script>

<style scoped>

</style>