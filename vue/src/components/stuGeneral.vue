<template>
  <div style="padding-left: 6%; padding-right: 6%;">
    <div style="margin-top: 30px">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline">
        近期计划
      </p>
    </div>
    <div style="border: dimgray solid; margin-top: 20px; height: 100%; position: relative">
      <el-tabs v-model="activeName" style="margin:0 1% 0 1%;">
        <el-tab-pane label="计划/进行中" name="first">
          <stu-pro-plan/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import stuProPlan from "@/components/stuProPlan";

export default {
  name: "stuGeneral",
  components:{
    stuProPlan,
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