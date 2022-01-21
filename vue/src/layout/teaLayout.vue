<template>
  <div>
    <!--    头部-->
    <teaHeader />

    <!--    主体-->
    <div style="display: flex">

      <!--      内容区域-->
      <router-view style="flex: 1;"/>
    </div>
  </div>

</template>

<script>
import teaHeader from "@/components/teaHeader";

export default {
  name: "gCLayout",
  components:{
    teaHeader,
  },
}
</script>

<style scoped>

</style>