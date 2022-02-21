<template>


  <div>申请记录:</div>

  <el-empty description="暂无信息"></el-empty>
  <el-button @click="refresh">111</el-button>
  <el-scrollbar height="70vh">

  </el-scrollbar>
</template>

<script>
export default {
  name: "stuAwardPatent",
  methods:{
    refresh(){
      this.$forceUpdate()
    },
  },
}
</script>

<style scoped>

</style>