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
              <el-badge :value="taskNum" :max="99" v-show="taskNum!==0" style="position: absolute; right:2%"></el-badge>
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
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToStuGrowthProfile">
                <div class="ecard">
                  <el-icon :size="30"><trophy /></el-icon>
                  <span style="position: absolute; top: 35%">成长档案</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToStuAM">
                <div class="ecard">
                  <el-icon :size="30"><promotion /></el-icon>
                  <span style="position: absolute; top: 35%">下载中心</span>
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
            <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToStuApplication">
                <div class="ecard">
                  <el-icon :size="30"><document-checked /></el-icon>
                  <span style="position: absolute; top: 35%">申请</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToStuQuestions">
                <div class="ecard">
                  <el-icon :size="30"><document-checked /></el-icon>
                  <span style="position: absolute; top: 35%">刷题自测</span>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToStuTakeOff">
                <div class="ecard">
                  <el-icon :size="30"><document-checked /></el-icon>
                  <span style="position: absolute; top: 35%">外出请假</span>
                </div>
              </el-card>
            </el-col>
            <div style="clear: both"></div>
          </div>

<!--          <p style="font-weight: bold; margin:30px 0 20px 0; color: #cccccc; cursor: default">交流服务</p>-->
          <div style="font-weight: 550; opacity: 0.9">
            <el-col v-if="power.type===1"  :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative" @click="changePage">
              <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default">
                <div class="ecard">
                  <el-icon :size="30"><chat-dot-round /></el-icon>
                  <span style="position: absolute; top: 35%">管理页面</span>
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
import promotion from "@element-plus/icons/lib/Promotion";
import request from "@/utils/request";
import documentChecked from "@element-plus/icons/lib/DocumentChecked";

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
    promotion,
    documentChecked,
  },
  data(){
    return{
      taskNum:0,
      note:{
        backgroundImage:"url("+require("../../../../vue_project/vue/src/assets/background2.png")+")",
        backgroundRepeat:"no-repeat",
        backgroundSize:"100% 100vh",
      },
      power:{},
      user:{},
    }
  },
  created() {
    this.power=JSON.parse(sessionStorage.getItem('power'))
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.readData()
  },
  methods:{
    readData(){
      request.post('/getstudent_msg', this.user).then(res=>{
        for(let i=0,temp;i<res.data.length;i++){
          if(res.data[i].status!==2){
            this.taskNum++
          }
        }
      })
    },

    jumpToStuPersonal(){
      this.$router.push("/stuLayout/stuPersonal")//跳转至个人信息管理页面
    },
    jumpToStuTask(){
      this.$router.push("/stuLayout/stuTask")//跳转至我的任务页面
    },
    jumpToStuScore(){
      this.$router.push("/stuLayout/stuScore")//跳转至成绩页面
    },
    jumpToStuGrowthProfile(){
      this.$router.push("/stuLayout/stuGrowthProfile")//跳转至成长档案页面
    },
    jumpToStuAM(){
      this.$router.push("/stuLayout/stuDownloadCenter")//跳转至下载页面
    },
    jumpToStuSchedule(){
      this.$router.push("/stuLayout/stuSchedule")//跳转至课程表页面
    },
    jumpToStuChat(){
      this.$router.push("/stuLayout/stuChat")//跳转至交流页面
    },
    jumpToStuApplication(){
      this.$router.push("/stuLayout/stuApplication")
    },
    jumpToStuQuestions(){
      this.$router.push("/stuLayout/stuQuestions")
    },
    jumpToStuTakeOff(){
      this.$router.push("/stuLayout/stuTakeOff")
    },
    changePage(){
      let data={student:{},teacher:{}}
      data.teacher=JSON.parse(sessionStorage.getItem('user_t'))
      data.student=JSON.parse(sessionStorage.getItem('user'))

      request.post('/loginwithAuthorize',data).then(res=>{
        if(res.code===1){
          this.$router.push("/gCHome")
        }else{
          this.$message.error("非法访问！")
        }
      }).catch(err=>{
        this.$message.error("连接错误")
      })
    },
  },
}

</script>

<style scoped>
  .ecard:hover{
    color: #008c8c;
  }
</style>