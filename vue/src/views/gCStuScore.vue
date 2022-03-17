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
        <el-tab-pane label="333" name="third">

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
        <el-tab-pane label="333" name="third">

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
export default {
  name: "gCStuScore",
  components:{
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

  },
}
</script>

<style scoped>

</style>