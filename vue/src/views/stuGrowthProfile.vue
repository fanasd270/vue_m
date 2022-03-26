<template>
  <el-tabs tab-position="left" >
    <el-tab-pane label="教育经历">
      <stu-edu-exp/>
    </el-tab-pane>
    <el-tab-pane label="综合能力">
      <stu-general/>
    </el-tab-pane>
    <el-tab-pane label="获奖信息">
      <stu-award></stu-award>
    </el-tab-pane>
    <el-tab-pane label="社会工作">
      <stu-work-and-vol/>
    </el-tab-pane>
    <el-tab-pane>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
import stuAward from "@/components/stuAward";
import stuEduExp from "@/components/stuEduExp";
import stuGeneral from "@/components/stuGeneral";
import StuWorkAndVol from "@/components/stuWorkAndVol";

export default {
  name: "stuGrowthProfile",
  components:{
    StuWorkAndVol,
    stuAward,
    stuEduExp,
    stuGeneral,
  },
}
</script>

<style scoped>

</style>