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
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default;" @click="jumpToStuPersonal" >
                <div class="ecard">
                  <el-icon :size="30"><edit /></el-icon>
                  <span style="position: absolute; top: 35%">个人信息管理</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="width: 220px; margin: 0 20px 20px 0; position: relative">
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToStuTask">
                <div class="ecard">
                  <el-icon :size="30"><finished /></el-icon>
                  <span style="position: absolute; top: 35%">我的任务</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToStuScore">
                <div class="ecard">
                  <el-icon :size="30"><reading /></el-icon>
                  <span style="position: absolute; top: 35%">成绩查询</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToStuAward">
                <div class="ecard">
                  <el-icon :size="30"><trophy /></el-icon>
                  <span style="position: absolute; top: 35%">获奖信息维护</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToStuVol">
                <div class="ecard">
                  <el-icon :size="30"><bicycle /></el-icon>
                  <span style="position: absolute; top: 35%">志愿服务与外派</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToStuAM">
                <div class="ecard">
                  <el-icon :size="30"><bell /></el-icon>
                  <span style="position: absolute; top: 35%">查看公告</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToStuSchedule">
                <div class="ecard">
                  <el-icon :size="30"><school /></el-icon>
                  <span style="position: absolute; top: 35%">课程表</span>
                </div>
              </el-card>
            </el-col>
            <div style="clear: both"></div>
          </div>

          <p style="font-weight: bold; margin:30px 0 20px 0; color: #cccccc; cursor: default">交流服务</p>
          <div style="font-weight: 550; opacity: 0.9">
            <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative" @click="jumpToStuChat">
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default">
                <div class="ecard">
                  <el-icon :size="30"><chat-dot-round /></el-icon>
                  <span style="position: absolute; top: 35%">师生交流</span>
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
import bicycle from "@element-plus/icons/lib/Bicycle";

export default {
  name: "stuHome",
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
    bicycle,
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
    jumpToStuPersonal(){
      this.$router.push("/stuLayout/stuPersonal")//跳转至个人信息管理页面
    },
    jumpToStuTask(){
      this.$router.push("/stuLayout/stuTask")//跳转至我的任务页面
    },
    jumpToStuScore(){
      this.$router.push("/stuLayout/stuScore")//跳转至成绩页面
    },
    jumpToStuAward(){
      this.$router.push("/stuLayout/stuAward")//跳转至获奖维护页面
    },
    jumpToStuVol(){
      this.$router.push("/stuLayout/stuVol")
    },
    jumpToStuAM(){
      this.$router.push("/stuLayout/stuAM")//跳转至公告页面
    },
    jumpToStuSchedule(){
      this.$router.push("/stuLayout/stuSchedule")//跳转至课程表页面
    },
    jumpToStuChat(){
      this.$router.push("/stuLayout/stuChat")//跳转至交流页面
    },
  },
}

</script>

<style scoped>
  .ecard:hover{
    color: #008c8c;
  }
</style>