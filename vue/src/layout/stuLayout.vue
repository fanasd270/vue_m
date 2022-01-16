<template>
  <div>
    <!--    头部-->
    <stuHeader />

    <!--    主体-->
    <div style="display: flex">

      <!--      内容区域-->
      <router-view style="flex: 1;"/>
    </div>
  </div>
</template>

<script>
import stuHeader from "@/components/stuHeader";
export default {
  name: "stuLayout",
  components:{
    stuHeader,
  },
}
</script>

<style scoped>

</style>