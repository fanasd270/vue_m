<template>
  <div>
    <!--    头部-->
    <Header />

    <!--    主体-->
    <div style="display: flex">

      <!--      内容区域-->
      <router-view style="flex: 1; border: 2px solid"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "Layout",
  components:{
    Header,
  }
}
</script>

<style scoped>

</style>