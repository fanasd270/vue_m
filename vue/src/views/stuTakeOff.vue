<template>
  <div style="position: relative; margin:20px 0 0 5% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      外出请假
    </p>
    <div v-if="fresh">
      <el-dialog
          title="新建"
          v-model="dialogVisible"
          width="50%"
          >

        <el-form ref="form" :model="askForm" style="margin:30px 0 0 60px; font-weight: bold">

          <el-form-item label="请假理由" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="askForm.leave_reason" clearable></el-input>
          </el-form-item>
          <el-form-item label="开始时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-date-picker v-model="askForm.leave_starttime" value-format="YYYY-MM-DD" type="date" />
          </el-form-item>
          <el-form-item label="结束时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-date-picker v-model="askForm.leave_endtime" value-format="YYYY-MM-DD" type="date" />
          </el-form-item>

          <el-form-item style="position: absolute; left:40%">
            <el-button type="primary" @click="onSubmitFirst" style="margin-right: 40px">提交</el-button>
            <el-button @click="cancelFirst">取消</el-button>
          </el-form-item>
          <div style="height: 50px"></div>
        </el-form>

      </el-dialog>

      <el-dialog
          title="修改"
          v-model="dialogVisible2"
          width="50%"
      >

        <el-form ref="form" :model="changeForm" style="margin:30px 0 0 60px; font-weight: bold">

          <el-form-item label="请假理由" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input disabled v-model="changeForm.leave_reason"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-date-picker disabled v-model="changeForm.leave_starttime" value-format="YYYY-MM-DD" type="date" />
          </el-form-item>
          <el-form-item label="结束时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-date-picker disabled v-model="changeForm.leave_endtime" value-format="YYYY-MM-DD" type="date" />
          </el-form-item>
          <el-form-item label="健康码" style="margin-bottom: 70px;">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture"
                limit="1"
                :http-request="fileUpload1"
            >
              <el-button type="text">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="行程码" style="margin-bottom: 70px;">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture"
                limit="1"
                :http-request="fileUpload2"
            >
              <el-button type="text">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="核酸检测报告" style="margin-bottom: 70px;">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture"
                limit="1"
                :http-request="fileUpload3"
            >
              <el-button type="text">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item style="position: absolute; left:40%">
            <el-button type="primary" @click="onSubmitSecond" style="margin-right: 40px">提交</el-button>
            <el-button @click="cancelSecond">取消</el-button>
          </el-form-item>
          <div style="height: 50px"></div>
        </el-form>

      </el-dialog>

      <el-dialog
          title="销假"
          v-model="dialogVisible3"
          width="50%"
      >
        <el-form ref="form" :model="eliminateForm" style="margin:30px 0 0 60px; font-weight: bold">
          <el-form-item label="请假理由" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="eliminateForm.leave_reason" disabled></el-input>
          </el-form-item>
          <el-form-item label="开始时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-date-picker disabled v-model="eliminateForm.leave_starttime" value-format="YYYY-MM-DD" type="date" />
          </el-form-item>
          <el-form-item label="结束时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-date-picker disabled v-model="eliminateForm.leave_endtime" value-format="YYYY-MM-DD" type="date" />
          </el-form-item>

          <el-form-item label="健康码" style="margin-bottom: 70px;">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture"
                limit="1"
                :http-request="fileUpload1"
            >
              <el-button type="text">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="行程码" style="margin-bottom: 70px;">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture"
                limit="1"
                :http-request="fileUpload2"
            >
              <el-button type="text">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="核酸检测报告" style="margin-bottom: 70px;">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture"
                limit="1"
                :http-request="fileUpload3"
            >
              <el-button type="text">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item style="position: absolute; left:40%">
            <el-button type="primary" @click="onSubmitThird" style="margin-right: 40px">提交</el-button>
            <el-button @click="cancelThird">取消</el-button>
          </el-form-item>
          <div style="height: 50px"></div>
        </el-form>

      </el-dialog>

      <div style="margin-top: 10px">申请记录:</div>
      <!--    <el-button type="text" @click="dialogVisible = true" :disabled=newButtons>点击新建</el-button>-->
      <el-button type="text" @click="dialogVisible = true">点击新建</el-button>
      <el-scrollbar height="60vh">
        <el-empty description="暂无信息" v-if="histories.length===0"></el-empty>
        <div v-for="(m,index) in histories">
          <transition name="el-fade-in-linear">
            <el-card class="box-card" style="margin: 10px 5px 0 5px">
              <el-descriptions style="padding: 10px 5px 0 5px" :column=3>
                <el-descriptions-item label="请假理由:">{{m.leave_reason}}</el-descriptions-item>
                <el-descriptions-item label="开始时间:">{{m.leave_starttime}}</el-descriptions-item>
                <el-descriptions-item label="结束时间:">{{m.leave_endtime}}</el-descriptions-item>
                <el-descriptions-item v-if="m.leave_status==='3'||m.leave_status==='4'" label="健康码:">
                  <span style="color:cornflowerblue;" @click="downloadFile(m.leave_health_code)">点击下载</span>
                </el-descriptions-item>
                <el-descriptions-item v-if="m.leave_status==='3'||m.leave_status==='4'" label="行程码:">
                  <span style="color:cornflowerblue;" @click="downloadFile(m.leave_travel_code)">点击下载</span>
                </el-descriptions-item>
                <el-descriptions-item v-if="m.leave_status==='3'||m.leave_status==='4'" label="核酸检测证明:">
                  <span style="color:cornflowerblue;" @click="downloadFile(m.leave_nucleic_acid_report)">点击下载</span>
                </el-descriptions-item>
              </el-descriptions>
              <el-tag type="warning" v-if="m.leave_status==='0'">申请离校</el-tag>
              <el-tag type="success" v-if="m.leave_status==='1'">同意离校</el-tag>
              <el-tag type="danger" v-if="m.leave_status==='2'">拒绝离校</el-tag>
              <el-tag type="warning" v-if="m.leave_status==='3'">申请销假</el-tag>
              <el-tag type="success" v-if="m.leave_status==='4'">同意销假</el-tag>
              <el-button v-if="m.leave_status==='3'" @click="changeInfo(m)" style="margin-left: 1%">修改</el-button>
              <el-button v-if="m.leave_status==='1'" @click="eliminate(m)" style="margin-left: 1%">销假</el-button>
              <el-button @click="deleteInfo(m)" style="margin-left: 1%" v-if="m.leave_status==='0'||m.leave_status==='2'">删除</el-button>
            </el-card>
          </transition>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import fileApi from "@/components/Store";
export default {
  name: "stuTakeOff",
  inject:['reload'],
  data(){
    return{
      Fapi:'',
      fresh:true,
      dialogVisible:false,
      dialogVisible2:false,
      dialogVisible3:false,
      user:{},
      histories:[],
      askForm:{
        leave_reason:'',
        leave_endtime:"",
        leave_health_code:"",
        leave_no:"",
        leave_nucleic_acid_report:"",
        leave_starttime:"",
        leave_status:"0",
        leave_stu_class:"",
        leave_stu_name:"",
        leave_stu_no:"",
        leave_travel_code:"",
      },
      changeForm:{
        leave_reason:'',
        leave_endtime:"",
        leave_health_code:"",
        leave_no:"",
        leave_nucleic_acid_report:"",
        leave_starttime:"",
        leave_status:"0",
        leave_stu_class:"",
        leave_stu_name:"",
        leave_stu_no:"",
        leave_travel_code:"",
      },
      eliminateForm:{
        leave_reason:'',
        leave_endtime:"",
        leave_health_code:"",
        leave_no:"",
        leave_nucleic_acid_report:"",
        leave_starttime:"",
        leave_status:"0",
        leave_stu_class:"",
        leave_stu_name:"",
        leave_stu_no:"",
        leave_travel_code:"",
      },
    }
  },
  created() {
    this.Fapi=fileApi.fileApi
    this.user=JSON.parse(sessionStorage.getItem('user'));
    this.askForm.leave_stu_class=this.user.stu_class
    this.askForm.leave_stu_name=this.user.stu_name
    this.askForm.leave_stu_no=this.user.stu_no+''
    this.getData()
  },
  methods:{
    reflesh(){
      this.reload()
    },
    downloadFile(m){
      window.location.href=this.Fapi+"/Leaves/"+m
    },
    fileUpload1(param){
      const formData=new FormData()
      formData.append('file', param.file)
      request.post('/uploadHealthCode', formData).then(res=>{
        if(res.code===0){
          this.$message.error("文件类型错误")
          return
        }
        console.log(res.data)
        this.eliminateForm.leave_health_code=res.data
      })
      //     .catch(err=>{
      //   this.$message.error('请求错误')
      // })
    },
    fileUpload2(param){
      const formData=new FormData()
      formData.append('file', param.file)
      request.post('/uploadTravelCode', formData).then(res=>{
        if(res.code===0){
          this.$message.error("文件类型错误")
          return
        }
        this.eliminateForm.leave_travel_code=res.data
      })
      //     .catch(err=>{
      //   this.$message.error('请求错误')
      // })
    },
    fileUpload3(param){
      const formData=new FormData()
      formData.append('file', param.file)
      request.post('/uploadNucleicAcidReport', formData).then(res=>{
        if(res.code===0){
          this.$message.error("文件类型错误")
          return
        }
        this.eliminateForm.leave_nucleic_acid_report=res.data
      })
      //     .catch(err=>{
      //   this.$message.error('请求错误')
      // })
    },
    deleteInfo(item){
      console.log(item)
      request.post('/deleteLeaveByStudent',item).then(res=>{
        this.reflesh()
      })
    },
    changeInfo(item){
      this.dialogVisible2=true
      this.changeForm=item
    },
    eliminate(item){
      this.dialogVisible3=true
      this.eliminateForm=item
    },
    cancelSecond(){
      this.reflesh()
    },
    onSubmitSecond(){
      if(this.changeForm.leave_starttime===''||this.changeForm.leave_endtime===''||this.changeForm.leave_reason===''){
        this.$message.warning('请上传完整信息')
        return
      }
      request.post('/updateLeaveByStudent',this.changeForm).then(res=>{
        this.reflesh()
      })
    },
    cancelThird(){
      this.dialogVisible3=false
      this.eliminateForm.leave_health_code=''
      this.eliminateForm.leave_travel_code=''
      this.eliminateForm.leave_nucleic_acid_report=''
    },
    onSubmitThird(){
      if(this.eliminateForm.leave_health_code===''||this.eliminateForm.leave_travel_code===''||this.eliminateForm.leave_nucleic_acid_report===''){
        this.$message.warning('请上传完整信息')
        return
      }
      request.post('/submitLeaveCancellationByStudent',this.eliminateForm).then(res=>{

        this.reflesh()
      })
    },
    cancelFirst(){
      this.dialogVisible=false
      this.askForm.leave_endtime=''
      this.askForm.leave_starttime=''
      this.askForm.leave_reason=''
    },
    onSubmitFirst(){
      if(this.askForm.leave_starttime===''||this.askForm.leave_endtime===''||this.askForm.leave_reason===''){
        this.$message.warning('请上传完整信息')
        return
      }
      request.post('/addLeaveByStudent',this.askForm).then(res=>{
        console.log(res)
        this.reflesh()
      })
    },
    getData(){
      request.post('/findStudentLeaveInfoByStudent',this.user).then(res=>{
        console.log(res)
        this.histories=res.data
      })
    },
  },
}
</script>

<style scoped>

</style>