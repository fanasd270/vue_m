<template>
  <div style="position: relative; margin:20px 0 0 5% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      外出请假
    </p>
    <div style="margin-top: 10px">
      <div>待审核:</div>
      <el-scrollbar height="70vh" style="width: 45%; display: inline-block">
        <span>离校申请</span>
        <el-empty description="暂无信息" v-if="newFirst.length===0"></el-empty>
        <div v-for="(m,index) in newFirst">
          <transition name="el-fade-in-linear">
            <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="firstShow[index]">
              <span style="font-weight: bold; margin-right: 2%">姓名：{{m.leave_stu_name}}</span>
              <span style="font-weight: bold;">学号：{{m.leave_stu_no}}</span>
              <span style="font-weight: bold;">班级：{{m.leave_stu_class}}</span>
              <el-descriptions style="padding: 10px 5px 0 5px" :column=2>
                <el-descriptions-item label="离校去向类型:">{{m.leave_type}}</el-descriptions-item>
                <el-descriptions-item label="离校事由:">{{m.leave_reason}}</el-descriptions-item>
                <el-descriptions-item label="离校时间:">{{m.leave_starttime}}</el-descriptions-item>
                <el-descriptions-item label="返校时间:">{{m.leave_endtime}}</el-descriptions-item>
                <el-descriptions-item label="离校所乘交通工具及车次号（航班号）:">{{m.leave_vehicle}}</el-descriptions-item>
                <el-descriptions-item label="离校目的地:">{{m.leave_destination}}</el-descriptions-item>
                <el-descriptions-item label="离校目的地疫情防控情况:">{{m.leave_epidemic_prevention}}</el-descriptions-item>
                <el-descriptions-item label="建康码:">{{m.leave_firsthealth}}</el-descriptions-item>
                <el-descriptions-item label="家长知情同意书:">
                  <span style="color:cornflowerblue;" @click="downloadFile(m.leave_parental_consent)">点击查看</span>
                </el-descriptions-item>
<!--                <el-descriptions-item label="建康码:"><span style="color:cornflowerblue;" @click="downloadPaper(m.leave_health_code)">点击下载</span></el-descriptions-item>-->
<!--                <el-descriptions-item label="行程码:"><span style="color:cornflowerblue;" @click="downloadPaper(m.leave_travel_code)">点击下载</span></el-descriptions-item>-->
<!--                <el-descriptions-item label="核酸检测证明:"><span style="color:cornflowerblue;" @click="downloadPaper(m.leave_nucleic_acid_report)">点击下载</span></el-descriptions-item>-->
              </el-descriptions>
              <el-button @click="passFirst(m,index)">通过</el-button>
              <el-button @click="rejectFirst(m,index)">驳回</el-button>
            </el-card>
          </transition>
        </div>
      </el-scrollbar>

      <el-scrollbar height="70vh" style="width: 45%; display: inline-block">
        <span>销假申请</span>
        <el-empty description="暂无信息" v-if="newSecond.length===0"></el-empty>
        <div v-for="(m,index) in newSecond">
          <transition name="el-fade-in-linear">
            <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="secondShow[index]">
              <span style="font-weight: bold; margin-right: 2%">姓名：{{m.leave_stu_name}}</span>
              <span style="font-weight: bold;">学号：{{m.leave_stu_no}}</span>
              <span style="font-weight: bold;">班级：{{m.leave_stu_class}}</span>
              <el-descriptions style="padding: 10px 5px 0 5px" :column=2>
                <el-descriptions-item label="离校去向类型:">{{m.leave_type}}</el-descriptions-item>
                <el-descriptions-item label="离校事由:">{{m.leave_reason}}</el-descriptions-item>
                <el-descriptions-item label="离校时间:">{{m.leave_starttime}}</el-descriptions-item>
                <el-descriptions-item label="返校时间:">{{m.leave_endtime}}</el-descriptions-item>
                <el-descriptions-item label="离校所乘交通工具及车次号（航班号）:">{{m.leave_vehicle}}</el-descriptions-item>
                <el-descriptions-item label="离校目的地:">{{m.leave_destination}}</el-descriptions-item>
                <el-descriptions-item label="离校目的地疫情防控情况:">{{m.leave_epidemic_prevention}}</el-descriptions-item>
                <el-descriptions-item label="建康码:">{{m.leave_firsthealth}}</el-descriptions-item>
                <el-descriptions-item label="家长知情同意书:">
                  <span style="color:cornflowerblue;" @click="downloadFile(m.leave_parental_consent)">点击查看</span>
                </el-descriptions-item>
                <el-descriptions-item label="建康码:"><span style="color:cornflowerblue;" @click="downloadFile(m.leave_health_code)">点击查看</span></el-descriptions-item>
                <el-descriptions-item label="行程码:"><span style="color:cornflowerblue;" @click="downloadFile(m.leave_travel_code)">点击查看</span></el-descriptions-item>
                <el-descriptions-item label="核酸检测证明:"><span style="color:cornflowerblue;" @click="downloadFile(m.leave_nucleic_acid_report)">点击查看</span></el-descriptions-item>
              </el-descriptions>
              <el-button @click="passSecond(m,index)">通过</el-button>
<!--              <el-button @click="rejectSecond(m,index)">驳回</el-button>-->
            </el-card>
          </transition>
        </div>
      </el-scrollbar>

      <!--        历史-->
      <div style="width: 100%; height: 3px; background-color: lightblue"></div>
      <div>历史:</div>
      <el-scrollbar height="70vh">
        <div v-for="(m,index) in oldMsg">
          <transition name="el-fade-in-linear">
            <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="didShow[index]">
              <span style="font-weight: bold; margin-right: 2%">姓名：{{m.leave_stu_name}}</span>
              <span style="font-weight: bold;">学号：{{m.leave_stu_no}}</span>
              <span style="font-weight: bold;">班级：{{m.leave_stu_class}}</span>
              <el-descriptions style="padding: 10px 5px 0 5px" :column=3>
                <el-descriptions-item label="离校去向类型:">{{m.leave_type}}</el-descriptions-item>
                <el-descriptions-item label="离校事由:">{{m.leave_reason}}</el-descriptions-item>
                <el-descriptions-item label="离校时间:">{{m.leave_starttime}}</el-descriptions-item>
                <el-descriptions-item label="返校时间:">{{m.leave_endtime}}</el-descriptions-item>
                <el-descriptions-item label="离校所乘交通工具及车次号（航班号）:">{{m.leave_vehicle}}</el-descriptions-item>
                <el-descriptions-item label="离校目的地:">{{m.leave_destination}}</el-descriptions-item>
                <el-descriptions-item label="离校目的地疫情防控情况:">{{m.leave_epidemic_prevention}}</el-descriptions-item>
                <el-descriptions-item label="建康码:">{{m.leave_firsthealth}}</el-descriptions-item>
                <el-descriptions-item label="家长知情同意书:">
                  <span style="color:cornflowerblue;" @click="downloadFile(m.leave_parental_consent)">点击查看</span>
                </el-descriptions-item>
                <el-descriptions-item v-if="m.leave_status==='4'" label="建康码:"><span style="color:cornflowerblue;" @click="downloadFile(m.leave_health_code)">点击查看</span></el-descriptions-item>
                <el-descriptions-item v-if="m.leave_status==='4'" label="行程码:"><span style="color:cornflowerblue;" @click="downloadFile(m.leave_travel_code)">点击查看</span></el-descriptions-item>
                <el-descriptions-item v-if="m.leave_status==='4'" label="核酸检测证明:"><span style="color:cornflowerblue;" @click="downloadFile(m.leave_nucleic_acid_report)">点击查看</span></el-descriptions-item>
              </el-descriptions>
              <el-tag type="success" v-if="m.leave_status==='1'">允许离校</el-tag>
              <el-tag type="success" v-if="m.leave_status==='4'">允许销假</el-tag>
              <el-tag type="danger" v-if="m.leave_status==='2'">拒绝离校</el-tag>
              <!--                <el-button @click="passPaper(index)">通过</el-button>-->
              <el-button style="margin-left: 5px" v-if="m.leave_status==='1'" @click="rejectDid(m)">驳回</el-button>
              <!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
            </el-card>
          </transition>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import fileApi from "@/components/Store";
import request from "@/utils/request";
export default {
  name: "gCTakeOff",
  inject:['reload'],
  data(){
    return{
      Fapi:'',
      power:{},
      user:{},
      newFirst:[],
      newSecond:[],
      oldMsg:[],
      firstShow:[],
      secondShow:[],
      didShow:[],
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
    this.getData()
  },
  methods:{
    reflesh(){
      this.reload()
    },
    rejectDid(m){
      request.post('/refuseLeaveByTeacher',m).then(res=>{
        this.getData()
      })
    },
    passSecond(m,index){
      request.post('/finishLeave',m).then(res=>{
        this.getData()
      })
    },
    passFirst(m,index){
      console.log(m)
      request.post('/passLeaveByTeacher',m).then(res=>{
        this.getData()
      })
    },
    rejectFirst(m,index){
      request.post('/refuseLeaveByTeacher',m).then(res=>{
        this.getData()
      })
    },
    downloadFile(m){
      window.open(this.Fapi+"/Leaves/"+m)
    },
    getData(){
      request.post('/findNewLeaveByTeacher',this.user).then(res=>{
        console.log(res)
        this.newFirst=[]
        this.newSecond=[]
        this.firstShow=[]
        this.secondShow=[]
        for(let index in res.data){
          if(res.data[index].leave_status==='0'){
            this.newFirst.push(res.data[index])
            this.firstShow.push(true)
          }else{
            this.newSecond.push(res.data[index])
            this.secondShow.push(true)
          }
        }
        console.log(this.newFirst)
        console.log(this.newSecond)
      }).catch(err=>{
        this.$message.error('连接错误')
      })
      request.post('/findOldLeaveByTeacher',this.user).then(res=>{
        console.log(res.data)
        this.oldMsg=res.data
        this.didShow=new Array(res.data.length).fill(true)
      }).catch(err=>{
        this.$message.error('连接错误')
      })
    },
  },
}
</script>

<style scoped>

</style>