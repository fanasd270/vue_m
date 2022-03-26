<template>
  <div style="padding-left: 6%; padding-right: 6%;">
    <div style="margin-top: 30px">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline">
        社会工作
      </p>
    </div>
    <div style="border: dimgray solid; margin-top: 20px; height: 100%; position: relative">
      <el-tabs v-model="activeName" style="margin:0 1% 0 1%;">
        <el-tab-pane label="志愿服务" name="first">
          <stu-vol-serve/>
        </el-tab-pane>
        <el-tab-pane label="学生工作" name="second">
          <stu-social-work/>
        </el-tab-pane>
        <el-tab-pane label="外派" name="third">
          <stu-vol-send/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import stuVolServe from "@/components/stuVolServe";
import stuVolSend from "@/components/stuVolSend";
import stuSocialWork from "@/components/stuSocialWork";

export default {
  name: "stuWorkAndVol",
  components:{
    stuVolServe,
    stuVolSend,
    stuSocialWork,
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