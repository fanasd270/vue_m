<template>
  <el-tabs tab-position="left" >
    <el-tab-pane label="德育素质测评">
      <stu-a-c-de/>
    </el-tab-pane>
    <el-tab-pane label="智育素质测评">
      <stu-a-c-zhi/>
    </el-tab-pane>
    <el-tab-pane label="体育素质测评">
      <stu-a-c-ti/>
    </el-tab-pane>
    <el-tab-pane label="美育素质测评">
      <stu-a-c-mei/>
    </el-tab-pane>
    <el-tab-pane label="劳育素质测评">
      <stu-a-c-lao/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import stuACZhi from "@/components/stuACZhi";
import stuACDe from "@/components/stuACDe";
import stuACTi from "@/components/stuACTi";
import stuACMei from "@/components/stuACMei";
import stuACLao from "@/components/stuACLao";

export default {
  name: "stuCA",
  components:{
    stuACZhi,
    stuACDe,
    stuACTi,
    stuACMei,
    stuACLao,
  },
}
</script>

<style scoped>

</style>