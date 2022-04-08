<template>
  <div>
    <!--    头部-->
<!--    <Header />-->

    <!--    主体-->
    <div style="display: flex">

      <!--      内容区域-->
      <router-view style="flex: 1; border: 2px solid"/>
    </div>
  </div>
</template>

<script>

export default {
  name: "Layout",
}
</script>

<style scoped>

</style>