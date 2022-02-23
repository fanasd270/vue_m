<template>
<div style="padding: 0 6% 0 6%">
  <div style="border: dimgray solid; margin-top: 20px; height: 100%; position: relative">
    <el-badge :value="toDoNum[0]" :max="99" v-show="numShow[0]" style="position: absolute; left:2%"></el-badge>
    <el-badge :value="toDoNum[1]" :max="99" v-show="numShow[1]" style="position: absolute; left:7%"></el-badge>
    <el-badge :value="toDoNum[2]" :max="99" v-show="numShow[2]" style="position: absolute; left:12%"></el-badge>
    <el-badge :value="toDoNum[3]" :max="99" v-show="numShow[3]" style="position: absolute; left:17%"></el-badge>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin:0 1% 0 1%">

      <el-tab-pane label="论文" name="first">
        <gCAuditPaper v-on:paperKey="paperCom"></gCAuditPaper>
      </el-tab-pane>
      <el-tab-pane label="专利" name="second">
        <g-c-audit-patent v-on:patentKey="patentCom"></g-c-audit-patent>
      </el-tab-pane>
      <el-tab-pane label="竞赛" name="third">
        <gCAuditContest v-on:contestKey="contestCom"></gCAuditContest>
      </el-tab-pane>
      <el-tab-pane label="项目" name="fourth">
        <g-c-audit-project v-on:projectKey="projectCom"></g-c-audit-project>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import request from "@/utils/request";
import gCAuditPaper from "@/components/gCAuditPaper";
import gCAuditContest from "@/components/gCAuditContest"
import GCAuditPatent from "@/components/gCAuditPatent";
import GCAuditProject from "@/components/gCAuditProject";

export default {
  name: "gCAudit",
  components:{
    GCAuditProject,
    GCAuditPatent,
    gCAuditPaper,
    gCAuditContest,
  },
  data(){
    return{
      activeName: 'first',
      numShow:[false, false, false, false],//统计数字是否显示
      toDoNum:[0, 0, 0, 0],//四类统计数字
      noInfo:[false,false,false,false],//暂无信息
      toDoShow:[true, true, true, true, true],//论文待审核显示
      patentToDoShow:[],
      contestToDoShow:[],
      didShow:[true, true, true, true, true],//论文已审核显示
      patentDidShow:[],
      contestDidShow:[],

      paperToDo:[],//论文待审核列表
      patentToDo:[],
      contestToDo:[],

      paperDid:[
        // {
        //   paper_no: "0",
        //   paper_stuno: 2,
        //   paper_stuname: "",
        //   paper_name: "",
        //   paper_periodical: "",
        //   paper_publicationTime: "",
        //   paper_iscscd: "",
        //   paper_sciSearchNumber: "",
        //   paper_eiSearchNumber: "",
        //   paper_year: "",
        //   paper_supporting_materials: "",
        //   paper_status:"0",
        // },
      ],//已审核
      patentDid:[],
      contestDid:[],
    }
  },

  created() {
    // console.log(this.$refs.paperCom)
    // this.getData();
    // this.numShow[0]=this.$refs.paperCom.numShow
    // this.toDoNum[0]=this.$refs.paperCom.toDoNum
  },

  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    },
    paperCom(toDoNum, numShow){
      this.numShow[0]=numShow
      this.toDoNum[0]=toDoNum
    },
    patentCom(toDoNum, numShow){
      this.numShow[1]=numShow
      this.toDoNum[1]=toDoNum
    },
    contestCom(toDoNum, numShow){
      this.numShow[2]=numShow
      this.toDoNum[2]=toDoNum
    },
    projectCom(toDoNum, numShow){
      this.numShow[3]=numShow
      this.toDoNum[3]=toDoNum
    },

    // passPaper(index){
    //   request.post('/pass_paper',this.paperToDo[index]).then(res=>{
    //     // console.log(res.msg)
    //     this.toDoShow[index]=false
    //     delete this.paperToDo[index]
    //     if(this.toDoNum[0]-1===0){
    //       this.numShow[0]=false
    //     } else {
    //       this.toDoNum[0]--
    //     }
    //     this.reload()
    //   })
    // },
    // passContest(index){
    //   request.post('/pass_contest',this.contestToDo[index]).then(res=>{
    //     // console.log(res.msg)
    //     this.contestToDoShow[index]=false
    //     delete this.contestToDo[index]
    //     if(this.toDoNum[2]-1===0){
    //       this.numShow[2]=false
    //     } else {
    //       this.toDoNum[2]--
    //     }
    //     this.reload()
    //   })
    // },

    // rejectPaper(index){
    //   request.post('/refuse_paper',this.paperToDo[index]).then(res=>{
    //     // console.log(res.msg)
    //     this.toDoShow[index]=false
    //     delete this.paperToDo[index]
    //     if(this.toDoNum[0]-1===0){
    //       this.numShow[0]=false
    //     } else {
    //       this.toDoNum[0]--
    //     }
    //     this.reload()
    //   })
    // },
    // rejectContest(index){
    //   request.post('/refuse_contest',this.contestToDo[index]).then(res=>{
    //     // console.log(res.msg)
    //     this.contestToDoShow[index]=false
    //     delete this.contestToDo[index]
    //     if(this.toDoNum[2]-1===0){
    //       this.numShow[2]=false
    //     } else {
    //       this.toDoNum[2]--
    //     }
    //     this.reload()
    //   })
    // },

    // waitPaper(index){
    //   this.toDoShow[index]=false
    //   if(this.toDoNum[0]-1===0){
    //     this.numShow[0]=false
    //   } else {
    //     this.toDoNum[0]--
    //   }
    // },
    // waitContest(index){
    //   this.contestToDoShow[index]=false
    //   if(this.toDoNum[2]-1===0){
    //     this.numShow[2]=false
    //   } else {
    //     this.toDoNum[2]--
    //   }
    // },

    // getData(){
    //   let user=JSON.parse(sessionStorage.getItem('user'))
    //
    //   request.post('/find_all_paper_info_new',user).then(res=>{
    //     this.paperToDo=res
    //     for(let i=0;i<this.paperToDo.length;i++){
    //       this.toDoShow[i]=true
    //     }
    //     //原numcount函数内容
    //     this.toDoNum[0]=this.paperToDo.length
    //     if(this.toDoNum[0]===0){
    //       this.numShow[0]=false
    //       this.noInfo[0]=true
    //     }
    //     else {
    //       this.numShow[0]=true
    //       this.noInfo[0]=false
    //     }
    //   })
    //   request.post('/find_all_contest_info_new',user).then(res=>{
    //     this.contestToDo=res
    //     for(let i=0;i<this.contestToDo.length;i++){
    //       this.contestToDoShow[i]=true
    //     }
    //     //原numcount函数内容
    //     this.toDoNum[2]=this.contestToDo.length
    //     if(this.toDoNum[2]===0){
    //       this.numShow[2]=false
    //       this.noInfo[2]=true
    //     }
    //     else {
    //       this.numShow[2]=true
    //       this.noInfo[2]=false
    //     }
    //   })
    //
    //   request.post('/find_all_paper_info_old',user).then(res=>{
    //     this.paperDid=res
    //     for(let i=0;i<this.paperDid.length;i++){
    //       this.didShow[i]=true
    //     }
    //   })
    //   request.post('/find_all_contest_info_old',user).then(res=>{
    //     console.log("竞赛记录:"+res)
    //     this.contestDid=res
    //     for(let i=0;i<this.contestDid.length;i++){
    //       this.contestDidShow[i]=true
    //     }
    //   })
    // },

  },
}
</script>

<style scoped>

</style>