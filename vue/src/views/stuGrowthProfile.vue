<template>
  <el-tabs tab-position="left" >
    <el-tab-pane label="教育经历">
      <stu-edu-exp/>
    </el-tab-pane>
    <el-tab-pane label="综合能力">
      <stu-general/>
    </el-tab-pane>
    <el-tab-pane label="项目与志愿">
      <stu-award></stu-award>
    </el-tab-pane>
    <el-tab-pane>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
import stuAward from "@/components/stuAward";
import stuEduExp from "@/components/stuEduExp";
import stuGeneral from "@/components/stuGeneral";

export default {
  name: "stuGrowthProfile",
  components:{
    stuAward,
    stuEduExp,
    stuGeneral,
  },
}
</script>

<style scoped>

</style>