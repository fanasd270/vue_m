<template>
<div>
  <el-tabs tab-position="left" >
    <el-tab-pane label="查看成绩">
      <el-tabs v-model="activeName1" style="margin:0 1% 0 1%;">
        <el-tab-pane label="绩点排名" name="first">
          <g-c-score-grand-point-view/>
        </el-tab-pane>
        <el-tab-pane label="学科成绩" name="second">
          <g-c-score-course-view/>
        </el-tab-pane>
        <el-tab-pane label="综合测评" name="third">
          <g-c-score-grade-point-view/>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="上传成绩">
      <el-tabs v-model="activeName" style="margin:0 1% 0 1%;">
        <el-tab-pane label="绩点排名" name="first">
          <g-c-score-grand-pont/>
        </el-tab-pane>
        <el-tab-pane label="学科成绩" name="second">
          <g-c-score-course/>
        </el-tab-pane>
        <el-tab-pane label="综合测评" name="third">
          <g-c-score-grade-point/>
        </el-tab-pane>
        <el-tab-pane label="学生课表" name="fourth">
          <g-c-stu-schedule/>
        </el-tab-pane>
        <el-tab-pane label="个人成绩单" name="fifth">
          <g-c-stu-individual-score/>
        </el-tab-pane>
      </el-tabs>

    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import GCScoreGrandPont from "@/components/gCScoreGrandPont";
import GCScoreGrandPointView from "@/components/gCScoreGrandPointView";
import GCScoreCourseView from "@/components/gCScoreCourseView";
import GCScoreCourse from "@/components/gCScoreCourse";
import GCScoreGradePoint from "@/components/gCScoreGradePoint";
import GCScoreGradePointView from "@/components/gCScoreGradePointView";
import GCStuSchedule from "@/views/gCStuSchedule";
import GCStuIndividualScore from "@/views/gCStuIndividualScore";
export default {
  name: "gCStuScore",
  components:{
    GCStuIndividualScore,
    GCStuSchedule,
    GCScoreGradePointView,
    GCScoreGradePoint,
    GCScoreCourse,
    GCScoreCourseView,
    GCScoreGrandPointView,
    GCScoreGrandPont

  },
  data(){
    return {
      activeName:'first',
      activeName1:'first',
    }
  },
  created() {

  },
  methods:{
    // callView(tab,event){
    //   console.log(2222222222222)
    //   this.$refs.courseChild.getData()
    //   if(tab.name==='second'){
    //     console.log(2222222222222)
    //     this.$refs.courseChild.getData()
    //   }
    // },
  },
}
</script>

<style scoped>

</style>