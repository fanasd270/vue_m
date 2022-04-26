<template>
  <div>
    <!--    头部-->
    <course-tea-header/>

    <!--    主体-->
    <div style="display: flex">

      <!--      内容区域-->
      <router-view style="flex: 1;"/>
    </div>
  </div>
</template>

<script>
import CourseTeaHeader from "@/components/courseTeaHeader";

export default {
  name: "courseTeaLayout",
  components:{
    CourseTeaHeader,
  },
}
</script>

<style scoped>

</style>