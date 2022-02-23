<template>
<div v-if="fresh">
  <div>待审核:</div>
  <el-scrollbar height="70vh">
    <el-empty description="暂无信息" v-if="noInfo"></el-empty>
    <div v-for="(m,index) in patentToDo">
      <transition name="el-fade-in-linear">
        <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="patentToDoShow[index]">
          <span style="font-weight: bold; margin-right: 2%">姓名：{{m.patent_stu_name}}</span>
          <span style="font-weight: bold;">学号：{{m.patent_stu_no}}</span>
          <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
            <el-descriptions-item label="专利名称:">{{m.patent_name}}</el-descriptions-item>
            <el-descriptions-item label="专利类型:">{{m.patent_type}}</el-descriptions-item>
            <el-descriptions-item label="专利申请号:">{{m.patent_application_no}}</el-descriptions-item>
            <el-descriptions-item label="专利申请日:">{{m.patent_application_time}}</el-descriptions-item>
            <el-descriptions-item label="专利证书号:">{{m.patent_certificate_no}}</el-descriptions-item>
            <el-descriptions-item label="专利获权时间:">{{m.patent_authorization_time}}</el-descriptions-item>
            <el-descriptions-item label="认定时间:">{{m.patent_year}}</el-descriptions-item>
            <el-descriptions-item label="是否第一发明人:">{{m.patent_isfirstone}}</el-descriptions-item>
            <el-descriptions-item label="证明材料:">{{m.patent_supporting_materials}}</el-descriptions-item>
            <!--                  <el-descriptions-item label="获奖证书:"><a href="http://localhost:8080/background.png"></a></el-descriptions-item>-->
            <!--                  csdn收藏夹尝试不同源下载图片-->
          </el-descriptions>
          <el-button @click="passPatent(index)">通过</el-button>
          <el-button @click="rejectPatent(index)">驳回</el-button>
          <el-button @click="waitPatent(index)">稍后</el-button>
        </el-card>
      </transition>
    </div>
  </el-scrollbar>

  <!--        历史-->
  <div style="width: 100%; height: 3px; background-color: lightblue"></div>
  <div>历史:</div>
  <el-scrollbar height="70vh">
    <div v-for="(m,index) in patentDid">
      <transition name="el-fade-in-linear">
        <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="patentDidShow[index]">
          <span style="font-weight: bold; margin-right: 2%">姓名：{{m.patent_stu_name}}</span>
          <span style="font-weight: bold;">学号：{{m.patent_stu_no}}</span>
          <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
            <el-descriptions-item label="专利名称:">{{m.patent_name}}</el-descriptions-item>
            <el-descriptions-item label="专利类型:">{{m.patent_type}}</el-descriptions-item>
            <el-descriptions-item label="专利申请号:">{{m.patent_application_no}}</el-descriptions-item>
            <el-descriptions-item label="专利申请日:">{{m.patent_application_time}}</el-descriptions-item>
            <el-descriptions-item label="专利证书号:">{{m.patent_certificate_no}}</el-descriptions-item>
            <el-descriptions-item label="专利获权时间:">{{m.patent_authorization_time}}</el-descriptions-item>
            <el-descriptions-item label="认定时间:">{{m.patent_year}}</el-descriptions-item>
            <el-descriptions-item label="是否第一发明人:">{{m.patent_isfirstone}}</el-descriptions-item>
            <el-descriptions-item label="证明材料:">{{m.patent_supporting_materials}}</el-descriptions-item>
            <!--                  <el-descriptions-item label="获奖证书:"><a href="http://localhost:8080/background.png"></a></el-descriptions-item>-->
            <!--                  csdn收藏夹尝试不同源下载图片-->
          </el-descriptions>
          <el-tag type="success" v-if="m.patent_status==='1'">已通过</el-tag>
          <el-tag type="danger" v-if="m.patent_status==='2'">已驳回</el-tag>
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

export default {
  name: "gCAuditPatent",

  data(){
    return{
      numShow:false,//是否显示红点
      toDoNum:0,//红点数
      noInfo:false,
      patentToDoShow:[],
      patentDidShow:[],
      patentToDo:[],//待审核列表
      patentDid:[],
      fresh:true,
    }
  },
  created() {
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

    passPatent(index){
      request.post('/pass_patent',this.patentToDo[index]).then(res=>{
        // console.log(res.msg)
        this.patentToDoShow[index]=false
        delete this.patentToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    rejectPatent(index){
      request.post('/refuse_patent',this.patentToDo[index]).then(res=>{
        // console.log(res.msg)
        this.patentToDoShow[index]=false
        delete this.patentToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    waitPatent(index){
      this.patentToDoShow[index]=false
      if(this.toDoNum-1===0){
        this.numShow=false
      } else {
        this.toDoNum--
      }
      this.$emit('patentKey',this.toDoNum,this.numShow)
    },

    getData(){
      let user=JSON.parse(sessionStorage.getItem('user'))

      request.post('/find_all_patent_info_new',user).then(res=>{
        this.patentToDo=res
        for(let i=0;i<this.patentToDo.length;i++){
          this.patentToDoShow[i]=true
        }
        //原numcount函数内容
        this.toDoNum=this.patentToDo.length
        if(this.toDoNum===0){
          this.numShow=false
          this.noInfo=true
        }
        else {
          this.numShow=true
          this.noInfo=false
        }
        this.$emit('patentKey',this.toDoNum,this.numShow)
      })

      request.post('/find_all_patent_info_old',user).then(res=>{
        console.log("patent记录:"+res)
        this.patentDid=res
        for(let i=0;i<this.patentDid.length;i++){
          this.patentDidShow[i]=true
        }
      })
    },
  },

}
</script>

<style scoped>

</style>