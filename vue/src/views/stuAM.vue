<template>
<div style="position: relative; margin:20px 0 0 9% ">
  <i style="background-color: blue;">
    <span style="opacity: 0">1</span>
  </i>
  <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px">
    公告
  </p>
  <el-input placeholder="请输入内容" v-model="inputSearch" clearable :prefix-icon="Search"
            style="width: 20%; position: absolute; right: 12%;">
  </el-input>

  <div style="width: 88%; height: 80vh; margin-top: 30px; position: relative; border: dimgray solid">
  </div>
</div>
</template>

<script>
import {Search} from "@element-plus/icons";

export default {
  name: "stuAM",
  data(){
    return{
      Search,
      inputSearch: "",
    }
  },
}
</script>

<style scoped>

</style>