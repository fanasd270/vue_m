<template>
<div style="padding: 0 6% 0 6%">
  <div style="border: dimgray solid; margin-top: 20px; height: 100%; position: relative">
    <el-badge :value="toDoNum[0]" :max="99" v-show="numShow[0]" style="position: absolute; left:2%"></el-badge>
    <el-badge :value="toDoNum[1]" :max="99" v-show="numShow[1]" style="position: absolute; left:7%"></el-badge>
    <el-badge :value="toDoNum[2]" :max="99" v-show="numShow[2]" style="position: absolute; left:12%"></el-badge>
    <el-badge :value="toDoNum[3]" :max="99" v-show="numShow[3]" style="position: absolute; left:17%"></el-badge>
    <el-badge :value="toDoNum[4]" :max="99" v-show="numShow[4]" style="position: absolute; left:25%"></el-badge>
    <el-badge :value="toDoNum[5]" :max="99" v-show="numShow[5]" style="position: absolute; left:32%"></el-badge>
    <el-badge :value="toDoNum[6]" :max="99" v-show="numShow[6]" style="position: absolute; left:38%"></el-badge>
    <el-badge :value="toDoNum[7]" :max="99" v-show="numShow[7]" style="position: absolute; left:43%"></el-badge>
    <el-badge :value="toDoNum[8]" :max="99" v-show="numShow[8]" style="position: absolute; left:51%"></el-badge>
    <el-tabs v-model="activeName" style="margin:0 1% 0 1%">

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
      <el-tab-pane label="获奖/荣誉" name="seventh">
        <g-c-audit-award v-on:awardKey="awardCom"></g-c-audit-award>
      </el-tab-pane>
      <el-tab-pane label="志愿服务" name="fifth">
        <g-c-audit-serve v-on:serveKey="serveCom"></g-c-audit-serve>
      </el-tab-pane>
      <el-tab-pane label="外派" name="sixth">
        <g-c-audit-send v-on:sendKey="sendCom"></g-c-audit-send>
      </el-tab-pane>
      <el-tab-pane label="奖学金" name="eighth">
        <g-c-audit-scholarship v-on:scholarshipKey="scholarshipCom"></g-c-audit-scholarship>
      </el-tab-pane>
      <el-tab-pane label="留校申请" name="ninth">
        <g-c-audit-application v-on:applicationKey="applicationCom"></g-c-audit-application>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import gCAuditPaper from "@/components/gCAuditPaper";
import gCAuditContest from "@/components/gCAuditContest"
import GCAuditPatent from "@/components/gCAuditPatent";
import GCAuditProject from "@/components/gCAuditProject";
import gCAuditServe from "@/components/gCAuditServe";
import gCAuditSend from "@/components/gCAuditSend";
import GCAuditAward from "@/components/gCAuditAward";
import GCAuditScholarship from "@/components/gCAuditScholarship";
import GCAuditApplication from "@/components/gCAuditApplication";

export default {
  name: "gCAudit",
  components:{
    GCAuditApplication,
    GCAuditScholarship,
    GCAuditAward,
    GCAuditProject,
    GCAuditPatent,
    gCAuditPaper,
    gCAuditContest,
    gCAuditServe,
    gCAuditSend,
  },
  data(){
    return{
      activeName: 'first',
      numShow:[false, false, false, false, false, false,false,false,false],//统计数字是否显示
      toDoNum:[0, 0, 0, 0, 0, 0,0,0,0],//四类统计数字
    }
  },

  created() {
    // console.log(this.$refs.paperCom)
    // this.getData();
    // this.numShow[0]=this.$refs.paperCom.numShow
    // this.toDoNum[0]=this.$refs.paperCom.toDoNum
  },

  methods:{
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
    awardCom(toDoNum, numShow){
      this.numShow[4]=numShow
      this.toDoNum[4]=toDoNum
    },
    serveCom(toDoNum, numShow){
      this.numShow[5]=numShow
      this.toDoNum[5]=toDoNum
    },
    sendCom(toDoNum, numShow){
      this.numShow[6]=numShow
      this.toDoNum[6]=toDoNum
    },
    scholarshipCom(toDoNum, numShow){
      this.numShow[7]=numShow
      this.toDoNum[7]=toDoNum
    },
    applicationCom(toDoNum, numShow){
      this.numShow[8]=numShow
      this.toDoNum[8]=toDoNum
    },
  },
}
</script>

<style scoped>

</style>