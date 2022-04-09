<template>
  <stu-header/>
  <div style="margin-left: 10px">
    <el-tabs>
      <el-tab-pane label="学生信息">
        <stu-and-family-personal/>
      </el-tab-pane>
      <el-tab-pane label="查看成绩">
        <stu-and-family-score-view/>
      </el-tab-pane>
      <el-tab-pane label="查看课表">
        <stu-and-family-schedule/>
      </el-tab-pane>
      <el-tab-pane label="个人成长规划">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StuAndFamilyScoreView from "@/components/stuAndFamilyScoreView";
import StuHeader from "@/components/stuHeader";
import StuAndFamilyPersonal from "@/components/stuAndFamilyPersonal";
import StuAndFamilySchedule from "@/components/stuAndFamilySchedule";
export default {
  name: "familyHome",
  components: {
    StuAndFamilySchedule,
    StuAndFamilyPersonal, StuHeader, StuAndFamilyScoreView
  },
  data(){
    return{

    }
  },
  created() {
  let family=sessionStorage.getItem("family")
  },
  methods:{

  },
}
</script>

<style scoped>

</style>