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

          <el-form-item label="去向类型" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <el-select v-model="askForm.leave_type" placeholder="请选择">
              <el-option
                  v-for="item in leaveType"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="离校事由" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="askForm.leave_reason" clearable></el-input>
          </el-form-item>
          <el-form-item label="离校时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-date-picker v-model="askForm.leave_starttime" value-format="YYYY-MM-DD" type="date" />
          </el-form-item>
          <el-form-item label="返校时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-date-picker v-model="askForm.leave_endtime" value-format="YYYY-MM-DD" type="date" />
          </el-form-item>
          <el-form-item label="离校所乘交通工具及车次号（航班号）" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <el-input v-model="askForm.leave_vehicle" clearable></el-input>
          </el-form-item>
          <el-form-item label="离校目的地" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <el-input v-model="askForm.leave_destination" clearable></el-input>
          </el-form-item>
          <el-form-item label="离校目的地疫情防控情况" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <el-select v-model="askForm.leave_epidemic_prevention" placeholder="请选择">
              <el-option
                  v-for="item in preventionType"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建康码" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-select v-model="askForm.leave_firsthealth" placeholder="请选择">
              <el-option
                  v-for="item in healthCode"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="家长知情同意书" style="margin-bottom: 70px;">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture"
                limit="1"
                :http-request="fileUploadFamily"
            >
              <el-button type="text">点击上传</el-button>
            </el-upload>
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

          <el-form-item label="去向类型" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <el-select disabled v-model="changeForm.leave_type" placeholder="请选择">
              <el-option
                  v-for="item in leaveType"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="离校事由" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input disabled v-model="changeForm.leave_reason"></el-input>
          </el-form-item>
          <el-form-item label="离校时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-date-picker disabled v-model="changeForm.leave_starttime" value-format="YYYY-MM-DD" type="date" />
          </el-form-item>
          <el-form-item label="返校时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-date-picker disabled v-model="changeForm.leave_endtime" value-format="YYYY-MM-DD" type="date" />
          </el-form-item>

          <el-form-item label="离校所乘交通工具及车次号（航班号）" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <el-input disabled v-model="changeForm.leave_vehicle" clearable></el-input>
          </el-form-item>
          <el-form-item label="离校目的地" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <el-input disabled v-model="changeForm.leave_destination" clearable></el-input>
          </el-form-item>
          <el-form-item label="离校目的地疫情防控情况" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <el-select disabled v-model="changeForm.leave_epidemic_prevention" placeholder="请选择">
              <el-option
                  v-for="item in preventionType"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建康码" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-select disabled v-model="changeForm.leave_firsthealth" placeholder="请选择">
              <el-option
                  v-for="item in healthCode"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="家长知情同意书" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <span style="color:cornflowerblue;" @click="downloadFile(changeForm.leave_parental_consent)">点击下载</span>
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

          <el-form-item label="去向类型" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <el-select disabled v-model="eliminateForm.leave_type" placeholder="请选择">
              <el-option
                  v-for="item in leaveType"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="离校事由" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="eliminateForm.leave_reason" disabled></el-input>
          </el-form-item>
          <el-form-item label="离校时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-date-picker disabled v-model="eliminateForm.leave_starttime" value-format="YYYY-MM-DD" type="date" />
          </el-form-item>
          <el-form-item label="返校时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-date-picker disabled v-model="eliminateForm.leave_endtime" value-format="YYYY-MM-DD" type="date" />
          </el-form-item>

          <el-form-item label="离校所乘交通工具及车次号（航班号）" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <el-input disabled v-model="eliminateForm.leave_vehicle" clearable></el-input>
          </el-form-item>
          <el-form-item label="离校目的地" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <el-input disabled v-model="eliminateForm.leave_destination" clearable></el-input>
          </el-form-item>
          <el-form-item label="离校目的地疫情防控情况" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <el-select disabled v-model="eliminateForm.leave_epidemic_prevention" placeholder="请选择">
              <el-option
                  v-for="item in preventionType"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="建康码" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-select disabled v-model="eliminateForm.leave_firsthealth" placeholder="请选择">
              <el-option
                  v-for="item in healthCode"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="家长知情同意书" style="margin-bottom: 40px; margin-right: 2%; width: 70%">
            <span style="color:cornflowerblue;" @click="downloadFile(eliminateForm.leave_parental_consent)">点击下载</span>
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
      <div style="color: red">为保证请假成功，请确保你的基本信息填写无误</div>
      <!--    <el-button type="text" @click="dialogVisible = true" :disabled=newButtons>点击新建</el-button>-->
      <el-button type="text" @click="dialogVisible = true">点击新建</el-button>
      <el-scrollbar height="60vh">
        <el-empty description="暂无信息" v-if="histories.length===0"></el-empty>
        <div v-for="(m,index) in histories">
          <transition name="el-fade-in-linear">
            <el-card class="box-card" style="margin: 10px 5px 0 5px">
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
                  <span style="color:cornflowerblue;" @click="downloadFile(m.leave_parental_consent)">点击下载</span>
                </el-descriptions-item>
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
      leaveType:[
        '离校不离渝(不离开高新区和沙坪坝)',
        '离校不离渝(离开高新区和沙坪坝，当日返回宿舍)',
        '离校不离渝(不离开高新区和沙坪坝，且在校外住宿)',
        '离校离渝',
      ],
      preventionType:[
          '中高风险区',
          '中高风险区所在县级行政区域的其他低风险区',
          '中高风险区所在地级市的其他县级行政区',
          '出现本土病例、但为划定中高风险区的地级市或县级市',
          '低风险区',
          '其他情况',
      ],
      healthCode:[
          '绿码',
          '黄码',
          '红码',
      ],
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
        leave_type:'',
        leave_vehicle:'',
        leave_destination:'',
        leave_parental_consent:'',
        leave_epidemic_prevention:'',
        leave_firsthealth:'',
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
      window.open(this.Fapi+"/Leaves/"+m)
    },
    fileUploadFamily(param){
      const formData=new FormData()
      formData.append('file', param.file)
      request.post('/uploadFamilyMean', formData).then(res=>{
        if(res.code===0){
          this.$message.error("文件类型错误")
          return
        }
        console.log(res.data)
        this.askForm.leave_parental_consent=res.data
      })
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
      if(this.changeForm.leave_health_code===''||this.changeForm.leave_travel_code===''||this.changeForm.leave_nucleic_acid_report===''){
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
      if(this.askForm.leave_starttime===''||this.askForm.leave_endtime===''||this.askForm.leave_reason===''||this.askForm.leave_type===''||
          this.askForm.leave_vehicle===''||this.askForm.leave_destination===''||this.askForm.leave_epidemic_prevention===''||this.askForm.leave_firsthealth===''||
          this.askForm.leave_parental_consent===''){
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