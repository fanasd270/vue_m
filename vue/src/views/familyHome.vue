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
      <el-tab-pane label="个人成长规划">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StuAndFamilyScoreView from "@/components/stuAndFamilyScoreView";
import StuHeader from "@/components/stuHeader";
import StuAndFamilyPersonal from "@/components/stuAndFamilyPersonal";
export default {
  name: "familyHome",
  components: {
    StuAndFamilyPersonal, StuHeader, StuAndFamilyScoreView
  },
  data(){
    return{

    }
  },
  created() {
  let family=sessionStorage.getItem("family")
    console.log("family")
    console.log(family)
  },
  methods:{

  },
}
</script>

<style scoped>

</style>