<template>
  <div v-if="fresh">
    <div>待审核:</div>
    <el-scrollbar height="70vh">
      <el-empty description="暂无信息" v-if="noInfo"></el-empty>
      <div v-for="(m,index) in sendToDo">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="sendToDoShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.dispatch_stu_name}}</span>
            <span style="font-weight: bold;">学号：{{m.dispatch_stu_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目名称:">{{m.dispatch_name}}</el-descriptions-item>
              <el-descriptions-item label="校/院:">{{m.dispatch_level}}</el-descriptions-item>
              <el-descriptions-item label="项目类别:">{{m.dispatch_project_type}}</el-descriptions-item>
              <el-descriptions-item label="国家/地区:">{{m.dispatch_nation}}</el-descriptions-item>
              <el-descriptions-item label="大洲:">{{m.dispatch_continent}}</el-descriptions-item>
              <el-descriptions-item label="外方学校/组织:">{{m.dispatch_foreign_counterpart}}</el-descriptions-item>
              <el-descriptions-item label="性别:">{{m.dispatch_stu_gender}}</el-descriptions-item>
              <el-descriptions-item label="学院:">{{m.dispatch_stu_department}}</el-descriptions-item>
              <el-descriptions-item label="专业:">{{m.dispatch_stu_major}}</el-descriptions-item>
              <el-descriptions-item label="项目时间段:">{{m.dispatch_project_time_from_to}}</el-descriptions-item>
              <el-descriptions-item label="项目时长大于三个月:">{{m.dispatch_greater_than_3month}}</el-descriptions-item>
              <el-descriptions-item label="层次(本/硕/博):">{{m.dispatch_arrangement}}</el-descriptions-item>
              <el-descriptions-item label="年级:">{{m.dispatch_grade}}</el-descriptions-item>
              <el-descriptions-item label="护照号码:">{{m.dispatch_passport_no}}</el-descriptions-item>
              <el-descriptions-item label="电话号码:">{{m.dispatch_tel}}</el-descriptions-item>
              <el-descriptions-item label="邮箱:">{{m.dispatch_email}}</el-descriptions-item>
              <el-descriptions-item label="是否录取:">{{m.dispatch_is_admission}}</el-descriptions-item>
              <el-descriptions-item label="是否200强:">{{m.dispatch_is_top200}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadSend(m.dispatch_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-button @click="passSend(index)">通过</el-button>
            <el-button @click="rejectSend(index)">驳回</el-button>
            <el-button @click="waitSend(index)">稍后</el-button>
          </el-card>
        </transition>
      </div>
    </el-scrollbar>

    <!--        历史-->
    <div style="width: 100%; height: 3px; background-color: lightblue"></div>
    <div>历史:</div>
    <el-scrollbar height="70vh">
      <div v-for="(m,index) in sendDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="sendDidShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.dispatch_stu_name}}</span>
            <span style="font-weight: bold;">学号：{{m.dispatch_stu_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目名称:">{{m.dispatch_name}}</el-descriptions-item>
              <el-descriptions-item label="校/院:">{{m.dispatch_level}}</el-descriptions-item>
              <el-descriptions-item label="项目类别:">{{m.dispatch_project_type}}</el-descriptions-item>
              <el-descriptions-item label="国家/地区:">{{m.dispatch_nation}}</el-descriptions-item>
              <el-descriptions-item label="大洲:">{{m.dispatch_continent}}</el-descriptions-item>
              <el-descriptions-item label="外方学校/组织:">{{m.dispatch_foreign_counterpart}}</el-descriptions-item>
              <el-descriptions-item label="性别:">{{m.dispatch_stu_gender}}</el-descriptions-item>
              <el-descriptions-item label="学院:">{{m.dispatch_stu_department}}</el-descriptions-item>
              <el-descriptions-item label="专业:">{{m.dispatch_stu_major}}</el-descriptions-item>
              <el-descriptions-item label="项目时间段:">{{m.dispatch_project_time_from_to}}</el-descriptions-item>
              <el-descriptions-item label="项目时长大于三个月:">{{m.dispatch_greater_than_3month}}</el-descriptions-item>
              <el-descriptions-item label="层次(本/硕/博):">{{m.dispatch_arrangement}}</el-descriptions-item>
              <el-descriptions-item label="年级:">{{m.dispatch_grade}}</el-descriptions-item>
              <el-descriptions-item label="护照号码:">{{m.dispatch_passport_no}}</el-descriptions-item>
              <el-descriptions-item label="电话号码:">{{m.dispatch_tel}}</el-descriptions-item>
              <el-descriptions-item label="邮箱:">{{m.dispatch_email}}</el-descriptions-item>
              <el-descriptions-item label="是否录取:">{{m.dispatch_is_admission}}</el-descriptions-item>
              <el-descriptions-item label="是否200强:">{{m.dispatch_is_top200}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadSend(m.dispatch_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.dispatch_status==='1'">已通过</el-tag>
            <el-tag type="danger" v-if="m.dispatch_status==='2'">已驳回</el-tag>
            <!--                <el-button @click="passPaper(index)">通过</el-button>-->
            <!--                <el-button @click="rejectPaper(index)">驳回</el-button>-->
            <!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
          </el-card>
        </transition>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import request from "@/utils/request";
import fileApi from "@/components/Store";

export default {
  name: "gCAuditSend",
  data(){
    return{
      user:{},
      power:{},
      numShow:false,//是否显示红点
      toDoNum:0,//红点数
      noInfo:false,
      sendToDoShow:[],
      sendDidShow:[],
      sendToDo:[
        {
          dispatch_no:null,
          dispatch_name:'',
          dispatch_level:'',
          dispatch_project_type:'',
          dispatch_nation:'',
          dispatch_continent:'',
          dispatch_foreign_counterpart:'',
          dispatch_stu_name:'',
          dispatch_stu_gender:'',
          dispatch_stu_no:'',
          dispatch_stu_department:'',
          dispatch_stu_major:'',
          dispatch_project_time_from_to:'',
          dispatch_greater_than_3month:'',
          dispatch_arrangement:'',
          dispatch_grade:'',
          dispatch_passport_no:'',
          dispatch_tel:'',
          dispatch_email:'',
          dispatch_is_admission:'',
          dispatch_is_top200:'',
          dispatch_status:'0',
          dispatch_supporting_materials:'',
        }
      ],//待审核列表
      sendDid:[{
        dispatch_no:null,
        dispatch_name:'',
        dispatch_level:'',
        dispatch_project_type:'',
        dispatch_nation:'',
        dispatch_continent:'',
        dispatch_foreign_counterpart:'',
        dispatch_stu_name:'',
        dispatch_stu_gender:'',
        dispatch_stu_no:'',
        dispatch_stu_department:'',
        dispatch_stu_major:'',
        dispatch_project_time_from_to:'',
        dispatch_greater_than_3month:'',
        dispatch_arrangement:'',
        dispatch_grade:'',
        dispatch_passport_no:'',
        dispatch_tel:'',
        dispatch_email:'',
        dispatch_is_admission:'',
        dispatch_is_top200:'',
        dispatch_status:'0',
        dispatch_supporting_materials:'',
      }],
      fresh:true,
      Fapi:'',
    }
  },
  created() {
    this.Fapi=fileApi.fileApi
    this.power=JSON.parse(sessionStorage.getItem('power'))
    if(this.power.type===1){
      this.user=JSON.parse(sessionStorage.getItem('user_t'))
    }else{
      this.user=JSON.parse(sessionStorage.getItem('user'))
    }
    this.getData();
  },

  methods: {
    //刷新组件
    refreshComponent() {
      this.fresh = false
      this.getData()
      this.$nextTick(() => {
        this.fresh = true
      })
    },

    downloadSend(m){
      window.location.href=this.Fapi+"/Dispatches/"+m
    },

    passSend(index) {
      request.post('/pass_dispatch', this.sendToDo[index]).then(res => {
        this.sendToDoShow[index] = false
        delete this.sendToDo[index]
        if (this.toDoNum - 1 === 0) {
          this.numShow = false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    rejectSend(index) {
      request.post('/refuse_dispatch', this.sendToDo[index]).then(res => {
        this.sendToDoShow[index] = false
        delete this.sendToDo[index]
        if (this.toDoNum - 1 === 0) {
          this.numShow = false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    waitSend(index) {
      this.sendToDoShow[index] = false
      if (this.toDoNum - 1 === 0) {
        this.numShow = false
      } else {
        this.toDoNum--
      }
      this.$emit('sendKey', this.toDoNum, this.numShow)
    },

    getData() {
      request.post('/find_all_dispatch_new', this.user).then(res => {
        this.sendToDo = res
        for (let i = 0; i < this.sendToDo.length; i++) {
          this.sendToDoShow[i] = true
        }
        //原numcount函数内容
        this.toDoNum = this.sendToDo.length
        if (this.toDoNum === 0) {
          this.numShow = false
          this.noInfo = true
        } else {
          this.numShow = true
          this.noInfo = false
        }
        this.$emit('sendKey', this.toDoNum, this.numShow)
      })

      request.post('/find_all_dispatch_old', this.user).then(res => {
        this.sendDid = res
        for (let i = 0; i < this.sendDid.length; i++) {
          this.sendDidShow[i] = true
        }
      })

    },
  },
}
</script>

<style scoped>

</style>