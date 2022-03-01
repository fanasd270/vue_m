<template>
<div style="position: relative; margin:20px 9% 0 9% ">
  <i style="background-color: blue;">
    <span style="opacity: 0">1</span>
  </i>
  <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
    年鉴
  </p>

  <div style="font-weight: 550; opacity: 0.9; margin-top: 20px">
    <el-col :span="16" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default;" @click="downloadAllStu" >
        <div class="ecard">
          <el-icon :size="30"><edit /></el-icon>
          <span style="position: absolute; top: 35%">本科生名单</span>
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

</div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "gCAlmanac",
  data(){
    return{
      user:{},
    }
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'));
  },
  methods:{
    downloadAllStu(){
      request.post('/getStudentExcelInfoByGuidanceCounselor',this.user).then(res=>{
        this.downloadFile(res.data)
      }).catch(err=>{
        this.$message.error("下载失败")
      })
    },
    downloadFile(url){
      window.location.href='http://10.236.11.68:9876/excel/'+url
    },
  },
}
</script>

<style scoped>

</style>