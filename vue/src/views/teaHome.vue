<template>
  <div style="width: 100%; height: 100vh; padding-top: 30px" class="note" :style="note">
    <div style="width: 1000px;margin: auto">
      <i style="background-color: blue; cursor: default">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline; cursor: default">
        应用管理
      </p>
      <div style="margin-top: 30px;">
        <div style="margin-bottom: 20px; font-weight: bold; cursor: default">我的应用</div>
        <div style="font-weight: 550; opacity: 0.9">
          <el-col :span="16" style="width: 220px;margin: 0 20px 20px 0; position: relative">
            <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default;" @click="jumpToCourseManage" >
              <div class="ecard">
                <el-icon :size="30"><edit /></el-icon>
                <span style="position: absolute; top: 35%">课程管理</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="width: 220px; margin: 0 20px 20px 0; position: relative">
            <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToTask">
              <div class="ecard">
                <el-icon :size="30"><timer /></el-icon>
                <span style="position: absolute; top: 35%">发布任务</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="width: 220px; margin: 0 20px 20px 0; position: relative">
            <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToTable">
              <div class="ecard">
                <el-icon :size="30"><data-analysis /></el-icon>
                <span style="position: absolute; top: 35%">报表查看</span>
              </div>
            </el-card>
          </el-col>
          <div style="clear: both"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import bellFilled from "@element-plus/icons/lib/BellFilled";
import infoFilled from "@element-plus/icons/lib/InfoFilled";
import UserFilled from "@element-plus/icons";
import finished from "@element-plus/icons/lib/Finished";
import edit from "@element-plus/icons/lib/Edit";
import reading from "@element-plus/icons/lib/Reading";
import trophy from "@element-plus/icons/lib/Trophy";
import bell from "@element-plus/icons/lib/Bell";
import school from "@element-plus/icons/lib/School";
import chatDotRound from "@element-plus/icons/lib/ChatDotRound";
import promotion from "@element-plus/icons/lib/Promotion";
import dataAnalysis from "@element-plus/icons/lib/DataAnalysis";
import timer from "@element-plus/icons/lib/Timer";

export default {
  name: "teaHome",
  components: {
    bellFilled,
    infoFilled,
    UserFilled,
    finished,
    edit,
    reading,
    trophy,
    bell,
    school,
    chatDotRound,
    promotion,
    dataAnalysis,
    timer,
  },
  data(){
    return{
      note:{
        backgroundImage:"url("+require("../../../../vue_project/vue/src/assets/background2.png")+")",
        backgroundRepeat:"no-repeat",
        backgroundSize:"100% 100vh",
      },
      user:{},
    }
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'))
  },
  methods:{
    jumpToCourseManage(){
      this.$router.push("/courseTeaLayout/ctCourseManage")//跳转至学生信息管理页面
    },
  },
}
</script>

<style scoped>

</style>