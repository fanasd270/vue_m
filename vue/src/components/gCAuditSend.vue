<template>
  <div v-if="fresh">
    <div>待审核:</div>
    <el-scrollbar height="70vh">
      <el-empty description="暂无信息" v-if="noInfo"></el-empty>
      <div v-for="(m,index) in sendToDo">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="sendToDoShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.data.dispatch_stu_name}}</span>
            <span style="font-weight: bold;">学号：{{m.data.dispatch_stu_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目名称:">{{m.data.dispatch_name}}</el-descriptions-item>
              <el-descriptions-item label="校/院:">{{m.data.dispatch_level}}</el-descriptions-item>
              <el-descriptions-item label="项目类别:">{{m.data.dispatch_project_type}}</el-descriptions-item>
              <el-descriptions-item label="国家/地区:">{{m.data.dispatch_nation}}</el-descriptions-item>
              <el-descriptions-item label="大洲:">{{m.data.dispatch_continent}}</el-descriptions-item>
              <el-descriptions-item label="外方学校/组织:">{{m.data.dispatch_foreign_counterpart}}</el-descriptions-item>
              <el-descriptions-item label="性别:">{{m.data.dispatch_stu_gender}}</el-descriptions-item>
              <el-descriptions-item label="学院:">{{m.data.dispatch_stu_department}}</el-descriptions-item>
              <el-descriptions-item label="专业:">{{m.data.dispatch_stu_major}}</el-descriptions-item>
              <el-descriptions-item label="项目时间段:">{{m.data.dispatch_project_time_from_to}}</el-descriptions-item>
              <el-descriptions-item label="项目时长大于三个月:">{{m.data.dispatch_greater_than_3month}}</el-descriptions-item>
              <el-descriptions-item label="层次(本/硕/博):">{{m.data.dispatch_arrangement}}</el-descriptions-item>
              <el-descriptions-item label="年级:">{{m.data.dispatch_grade}}</el-descriptions-item>
              <el-descriptions-item label="护照号码:">{{m.data.dispatch_passport_no}}</el-descriptions-item>
              <el-descriptions-item label="电话号码:">{{m.data.dispatch_tel}}</el-descriptions-item>
              <el-descriptions-item label="邮箱:">{{m.data.dispatch_email}}</el-descriptions-item>
              <el-descriptions-item label="是否录取:">{{m.data.dispatch_is_admission}}</el-descriptions-item>
              <el-descriptions-item label="是否200强:">{{m.data.dispatch_is_top200}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadSend(m.data.dispatch_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-button @click="passSend(index)">通过</el-button>
            <el-button @click="rejectReason(index)">驳回</el-button>
            <el-button @click="waitSend(index)">稍后</el-button>
            <el-button @click="changeInfo(m)">修改</el-button>
          </el-card>
        </transition>
      </div>

      <el-dialog
          v-model="rejectReasonDia"
          title="驳回理由"
          width="30%"
      >
        <el-input v-model="rejectItem.reason"></el-input>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="rejectReasonDia = false">取消</el-button>
        <el-button v-if="rejectType==='toDo'" type="primary" @click="rejectSend(rejectIndex)">确认</el-button>
        <el-button v-if="rejectType==='did'" type="primary" @click="rejectSendDid(rejectIndex)">确认</el-button>
      </span>
        </template>
      </el-dialog>

      <el-dialog
          title="修改"
          v-model="dialogVisible"
          width="50%"
          :before-close="sendHandleClose">

        <el-form ref="form" :model="sendForm" style="margin:30px 0 0 60px; font-weight: bold">

          <el-form-item label="项目名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="sendForm.dispatch_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="校/院" style="width: 46%; margin-bottom: 40px; margin-right: 2%;">
            <el-radio-group v-model="sendForm.dispatch_level">
              <el-radio  label="校">校</el-radio>
              <el-radio  label="院">院</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="项目类别" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="sendForm.dispatch_project_type" clearable></el-input>
          </el-form-item>
          <el-form-item label="国家/地区" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="sendForm.dispatch_nation" clearable></el-input>
          </el-form-item>
          <el-form-item label="大洲" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="sendForm.dispatch_continent" clearable></el-input>
          </el-form-item>
          <el-form-item label="外方学校/组织" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="sendForm.dispatch_foreign_counterpart" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目时间段" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="sendForm.dispatch_project_time_from_to" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目时长大于三个月" style="width: 46%; margin-bottom: 40px; margin-right: 2%;">
            <el-radio-group v-model="sendForm.dispatch_greater_than_3month">
              <el-radio  label="是">是</el-radio>
              <el-radio  label="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="层次(本/硕/博)" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-select v-model="sendForm.dispatch_arrangement">
              <el-option label="本" value="本"></el-option>
              <el-option label="硕" value="硕"></el-option>
              <el-option label="博" value="博"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别" style="width: 46%; margin-bottom: 40px; margin-right: 2%;">
            <el-radio-group v-model="sendForm.dispatch_stu_gender">
              <el-radio  label="男">男</el-radio>
              <el-radio  label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学院" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="sendForm.dispatch_stu_department" clearable></el-input>
          </el-form-item>
          <el-form-item label="专业" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="sendForm.dispatch_stu_major" clearable></el-input>
          </el-form-item>
          <el-form-item label="年级" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="sendForm.dispatch_grade" clearable></el-input>
          </el-form-item>
          <el-form-item label="护照号码" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="sendForm.dispatch_passport_no" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话号码" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="sendForm.dispatch_tel" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="sendForm.dispatch_email" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否录取" style="width: 46%; margin-bottom: 40px; margin-right: 2%;">
            <el-radio-group v-model="sendForm.dispatch_is_admission">
              <el-radio  label="是">是</el-radio>
              <el-radio  label="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否200强" style="width: 46%; margin-bottom: 40px; margin-right: 2%;">
            <el-radio-group v-model="sendForm.dispatch_is_top200">
              <el-radio  label="是">是</el-radio>
              <el-radio  label="否">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item style="position: absolute; left:40%">
            <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>
            <el-button @click="sendHandleClose">取消</el-button>
          </el-form-item>
          <div style="height: 50px"></div>
        </el-form>

      </el-dialog>

    </el-scrollbar>

    <!--        历史-->
    <div style="width: 100%; height: 3px; background-color: lightblue"></div>
    <div>历史:</div>
    <el-scrollbar height="70vh">
      <div v-for="(m,index) in sendDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="sendDidShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.data.dispatch_stu_name}}</span>
            <span style="font-weight: bold;">学号：{{m.data.dispatch_stu_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目名称:">{{m.data.dispatch_name}}</el-descriptions-item>
              <el-descriptions-item label="校/院:">{{m.data.dispatch_level}}</el-descriptions-item>
              <el-descriptions-item label="项目类别:">{{m.data.dispatch_project_type}}</el-descriptions-item>
              <el-descriptions-item label="国家/地区:">{{m.data.dispatch_nation}}</el-descriptions-item>
              <el-descriptions-item label="大洲:">{{m.data.dispatch_continent}}</el-descriptions-item>
              <el-descriptions-item label="外方学校/组织:">{{m.data.dispatch_foreign_counterpart}}</el-descriptions-item>
              <el-descriptions-item label="性别:">{{m.data.dispatch_stu_gender}}</el-descriptions-item>
              <el-descriptions-item label="学院:">{{m.data.dispatch_stu_department}}</el-descriptions-item>
              <el-descriptions-item label="专业:">{{m.data.dispatch_stu_major}}</el-descriptions-item>
              <el-descriptions-item label="项目时间段:">{{m.data.dispatch_project_time_from_to}}</el-descriptions-item>
              <el-descriptions-item label="项目时长大于三个月:">{{m.data.dispatch_greater_than_3month}}</el-descriptions-item>
              <el-descriptions-item label="层次(本/硕/博):">{{m.data.dispatch_arrangement}}</el-descriptions-item>
              <el-descriptions-item label="年级:">{{m.data.dispatch_grade}}</el-descriptions-item>
              <el-descriptions-item label="护照号码:">{{m.data.dispatch_passport_no}}</el-descriptions-item>
              <el-descriptions-item label="电话号码:">{{m.data.dispatch_tel}}</el-descriptions-item>
              <el-descriptions-item label="邮箱:">{{m.data.dispatch_email}}</el-descriptions-item>
              <el-descriptions-item label="是否录取:">{{m.data.dispatch_is_admission}}</el-descriptions-item>
              <el-descriptions-item label="是否200强:">{{m.data.dispatch_is_top200}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadSend(m.data.dispatch_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.data.dispatch_status==='1'">已通过</el-tag>
            <el-tag type="danger" v-if="m.data.dispatch_status==='2'">已驳回</el-tag>
            <!--                <el-button @click="passPaper(index)">通过</el-button>-->
            <el-button style="margin-left: 5px" v-if="m.data.dispatch_status==='1'" @click="rejectReason_did(index)">驳回</el-button>
            <el-button v-if="m.data.dispatch_status==='1'" @click="changeInfo(m)">修改</el-button>
            <!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
            <div v-if="m.data.dispatch_status==='2'">
              驳回理由:{{m.reason}}
            </div>
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
      rejectReasonDia:false,
      rejectType:'',
      rejectIndex:0,
      rejectItem:{},
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

      sendForm:{},
      dialogVisible:false,
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
      window.open(this.Fapi+"/Dispatches/"+m)
    },
    changeInfo(m){
      this.dialogVisible=true
      this.sendForm=JSON.parse(JSON.stringify(m.data))
    },
    sendHandleClose(){
      this.dialogVisible=false
    },
    onSubmit(){
      request.post("/upload_dispatch_info", this.sendForm).then(res=>{
        this.$message.success(res.msg)
        this.dialogVisible=false//关闭表单
        this.refreshComponent()
      }).catch(err=>{
        this.$message.error("请求错误")
      })
    },
    passSend(index) {
      request.post('/pass_dispatch', this.sendToDo[index].data).then(res => {
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
    rejectReason(index){
      this.rejectReasonDia=true
      this.rejectType='toDo'
      this.rejectIndex=index
      this.rejectItem=JSON.parse(JSON.stringify(this.sendToDo[index]))
    },
    rejectReason_did(index){
      this.rejectReasonDia=true
      this.rejectType='did'
      this.rejectIndex=index
      this.rejectItem=JSON.parse(JSON.stringify(this.sendDid[index]))
    },
    rejectSend(index) {
      request.post('/refuse_dispatch', this.rejectItem).then(res => {
        this.rejectReasonDia=false
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
    rejectSendDid(index) {
      request.post('/refuse_dispatch', this.rejectItem).then(res => {
        this.rejectReasonDia=false
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