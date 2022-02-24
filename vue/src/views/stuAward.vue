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
      activeName: 'first',
    }
  },
}
</script>

<style scoped>

</style>