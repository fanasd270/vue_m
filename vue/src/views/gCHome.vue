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
            <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default;" @click="jumpTogCStuInfo" >
              <div class="ecard">
                <el-icon :size="30"><edit /></el-icon>
                <span style="position: absolute; top: 35%">学生信息管理</span>
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
          <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
            <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToAlmanac">
              <div class="ecard">
                <el-icon :size="30"><reading /></el-icon>
                <span style="position: absolute; top: 35%">年鉴导出</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
            <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToStuScore">
              <div class="ecard">
                <el-icon :size="30"><trophy /></el-icon>
                <span style="position: absolute; top: 35%">查看学生成绩</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
            <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToSign">
              <div class="ecard">
                <el-icon :size="30"><promotion /></el-icon>
                <span style="position: absolute; top: 35%">网上报名</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
            <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToAudit">
              <div class="ecard">
                <el-icon :size="30"><finished /></el-icon>
                <span style="position: absolute; top: 35%">审核学生提交表单</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
            <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToLib">
              <div class="ecard">
                <el-icon :size="30"><school /></el-icon>
                <span style="position: absolute; top: 35%">图书管理</span>
              </div>
            </el-card>
          </el-col>
          <div style="clear: both"></div>
        </div>

        <p style="font-weight: bold; margin:30px 0 20px 0; color: #cccccc; cursor: default">交流服务</p>
        <div style="font-weight: 550; opacity: 0.9">
          <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative" @click="jumpToChat">
            <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default">
              <div class="ecard">
                <el-icon :size="30"><chat-dot-round /></el-icon>
                <span style="position: absolute; top: 35%">师生交流</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative" @click="jumpToAM">
            <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default">
              <div class="ecard">
                <el-icon :size="30"><bell /></el-icon>
                <span style="position: absolute; top: 35%">发布公告</span>
              </div>
            </el-card>
          </el-col>
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
  name: "gCHome",
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
        backgroundImage:"url("+require("../assets/background.png")+")",
        backgroundRepeat:"no-repeat",
        backgroundSize:"100% 100vh",
      },
    }
  },
  methods:{
    jumpTogCStuInfo(){
      this.$router.push("/teaLayout/gCStuInfo")//跳转至学生信息管理页面
    },
    jumpToTask(){
      this.$router.push("/teaLayout/gCTask")//跳转至发布任务页面
    },
    jumpToTable(){
      this.$router.push("/teaLayout/gCTable")//跳转至报表查看页面
    },
    jumpToAlmanac(){
      this.$router.push("/teaLayout/gCAlmanac")//跳转至年鉴导出页面
    },
    jumpToStuScore(){
      this.$router.push("/teaLayout/gCStuScore")//跳转至学生成绩页面
    },
    jumpToSign(){
      this.$router.push("/teaLayout/gCSign")//跳转至网上报名页面
    },
    jumpToAudit(){
      this.$router.push("/teaLayout/gCAudit")//跳转至审核页面
    },
    jumpToLib(){
      this.$router.push("/teaLayout/gCLib")//跳转至图书管理页面
    },
    jumpToChat(){
      this.$router.push("/teaLayout/gCChat")//跳转至师生交流页面
    },
    jumpToAM(){
      this.$router.push("/teaLayout/gCAM")//跳转至图书管理页面
    },
  },
}

</script>

<style scoped>
.ecard:hover{
  color: #008c8c;
}
</style>