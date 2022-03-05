<template>
  <div v-if="fresh">
    <el-dialog
        title="新建"
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


        <el-form-item label="成果证明材料" style="margin-bottom: 70px;">

          <el-upload
              class="upload-demo"
              ref="upload"
              action="http://10.236.11.68:8080/"
              :http-request="sendUpload"
              drag
              :on-error="fileUploadError"
              :limit="1"
              :auto-upload="false">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽或 <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                仅上传jpg/pdf
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item style="position: absolute; left:40%">
          <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>
          <el-button @click="sendHandleClose">取消</el-button>
        </el-form-item>
        <div style="height: 50px"></div>
      </el-form>

    </el-dialog>

    <div>申请记录:</div>
    <el-button type="text" @click="dialogVisible = true" :disabled=newButtons>点击新建</el-button>
    <el-scrollbar height="60vh">
      <el-empty description="暂无信息" v-if="didHistory"></el-empty>
      <div v-for="(m,index) in sendDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="toDoShow[index]">
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
            <el-tag type="warning" v-if="m.dispatch_status==='0'">待审核</el-tag>
            <el-tag type="danger" v-if="m.dispatch_status==='2'">已驳回</el-tag>
            <el-button @click="changeInfo(index)" style="margin-left: 5%" v-if="m.dispatch_status==='0'">修改</el-button>
            <el-button @click="deleteInfo(index)" style="margin-left: 1%" v-if="m.dispatch_status==='0'">删除</el-button>
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
  name: "stuVolSend",

  data(){
    return{
      sendForm:{
        dispatch_no:'',
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
      },
      sendDid:[],//历史记录表
      tagType:['success','warning','danger'],
      toDoShow:[],//每条历史记录的v-if
      newButtons:false,//新建按钮是否可用
      dialogVisible:false,//表单的显示
      didHistory:false,//空状态是否显示
      fresh:true,
      Fapi:'',
    }
  },

  created() {
    this.Fapi=fileApi.fileApi
    this.getData()
  },
  methods:{
    downloadSend(m){
      window.location.href=this.Fapi+"/Dispatches/"+m
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    fileUploadError(){
      this.$message.error('文件上传失败')
    },
    onSubmit(){
      this.submitUpload()
    },
    //刷新组件
    refreshComponent(){
      this.fresh=false
      this.getData()
      this.$nextTick(()=>{
        this.fresh=true
      })
    },
    //表单关闭
    sendHandleClose(){
      this.sendForm.dispatch_name=''
      this.sendForm.dispatch_level=''
      this.sendForm.dispatch_project_type=''
      this.sendForm.dispatch_nation=''
      this.sendForm.dispatch_continent=''
      this.sendForm.dispatch_foreign_counterpart=''
      this.sendForm.dispatch_stu_department=''
      this.sendForm.dispatch_stu_major=''
      this.sendForm.dispatch_project_time_from_to=''
      this.sendForm.dispatch_greater_than_3month=''
      this.sendForm.dispatch_arrangement=''
      this.sendForm.dispatch_grade=''
      this.sendForm.dispatch_passport_no=''
      this.sendForm.dispatch_tel=''
      this.sendForm.dispatch_email=''
      this.sendForm.dispatch_is_admission=''
      this.sendForm.dispatch_is_top200=''
      this.dialogVisible=false
    },
    sendUpload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/upload_dispatch_info2', formData).then(res=>{
        this.sendForm.dispatch_supporting_materials=res.data
        console.log(res)
        let user=JSON.parse(sessionStorage.getItem('user'))//
        this.sendForm.dispatch_stu_no=user.stu_no//
        this.sendForm.dispatch_stu_name=user.stu_name//
        console.log("send:")
        console.log(that.sendForm)

        request.post("/upload_dispatch_info", that.sendForm).then(res=>{
          console.log(res)
          that.$message.success(res.msg)
          this.dialogVisible=false//关闭表单
          that.refreshComponent()
        }).catch(err=>{
          that.$message.error("请求错误")
        })
      })
    },
    getData(){
      let user=JSON.parse(sessionStorage.getItem('user'))
      user.stu_no=user.stu_no-0

      //请求记录
      request.post('/find_my_dispatch_info',user).then(res=>{
        console.log("send记录")
        console.log(res)
        this.sendDid=res
        if(this.sendDid.length===0){
          this.didHistory=true
        }
        else{
          this.didHistory=false
          for(let i=0;i<this.sendDid.length;i++){
            this.toDoShow[i]=true
          }
        }
      })

      // 判断是否有正在审核的信息
      request.post('/dispatch_isexamineing',user).then(res=>{
        console.log("serve审核："+res)
        if(res===1){
          this.newButtons=true
        }
        else{
          this.newButtons=false
        }
      })

    },

    changeInfo(index){
      this.dialogVisible=true
      let temp=JSON.stringify(this.sendDid[index])
      this.sendForm=JSON.parse(temp)
    },
    deleteInfo(index){
      let send=JSON.stringify(this.sendDid[index])
      let that=this
      request.post('/delete_dispatch', send).then(res=>{
        console.log(res)
        this.toDoShow[index]=false
        that.refreshComponent()
      })
    },
  },
}
</script>

<style scoped>

</style>