<template>
  <div style="padding-left: 6%; padding-right: 6%;">
    <div style="margin-top: 30px">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline">
        获奖信息维护
      </p>
    </div>
    <div style="border: dimgray solid; margin-top: 20px; height: 100%; position: relative">
    <el-tabs v-model="activeName" style="margin:0 1% 0 1%;">
      <el-tab-pane label="论文" name="first">
        <stuAwardPaper/>
      </el-tab-pane>
      <el-tab-pane label="专利" name="second">
        <stuAwardPatent/>
      </el-tab-pane>
      <el-tab-pane label="竞赛" name="third">
        <stuAwardContest/>
      </el-tab-pane>
      <el-tab-pane label="项目" name="fourth">
        <stu-award-project></stu-award-project>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script>
import stuAwardPatent from "@/components/stuAwardPatent";
import stuAwardPaper from "@/components/stuAwardPaper";
import stuAwardContest from "@/components/stuAwardContest";
import StuAwardProject from "@/components/stuAwardProject";

export default {
  name: "stuAward",
  components:{
    StuAwardProject,
    stuAwardPatent,
    stuAwardPaper,
    stuAwardContest,
  },
  data(){
    return{
      patentForm:{
        patent_no: "",
        patent_stu_no: "",
        patent_stu_name: "",
        patent_name: "",
        patent_type: "",
        patent_application_no: "",
        patent_application_time: "",
        patent_certificate_no: "",
        patent_authorization_time: "",
        patent_isfirstone: "",
        patent_year: "",
        patent_supporting_materials: "",
        patent_status: "0"
      },
      activeName: 'first',
      //paperDid:[],//论文历史记录表
      patentDid:[],//专利历史记录表
      // contestDid:[],//竞赛
      tagType:['success','warning','danger'],
      //toDoShow:[],//paper每条历史记录的v-if
      patentShow:[],//专利每条历史记录的v-if
      // contestShow:[],//竞赛每条历史记录的v-if

      newButtons:[],//新建按钮是否可用
      dialogVisible:[false,false,false,false],//四类表单的显示
      didHistory:[false,false,false,false],//四类空状态是否显示
    }
  },
}
</script>

<style scoped>

</style>