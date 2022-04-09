<template>
  <div style="padding-left: 6%; padding-right: 6%;">
    <div style="margin-top: 30px">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline">
        外语/体测
      </p>
    </div>
    <div style="border: dimgray solid; margin-top: 20px; height: 100%; position: relative">
      <el-tabs v-model="activeName" style="margin:0 1% 0 1%;">
        <el-tab-pane label="外语" name="first">
          <stu-foreign/>
        </el-tab-pane>
        <el-tab-pane label="体测" name="second">
          <stu-ti-ce/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import StuTiCe from "@/components/stuTiCe";
import StuForeign from "@/components/stuForeign";

export default {
  name: "stuForeignAndTiCe",
  components: {StuTiCe, StuForeign},
  data(){
    return{
      activeName:'first'
    }
  },
}
</script>

<style scoped>

</style>