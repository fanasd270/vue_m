<template>
  <div v-if="fresh">
    <el-dialog
        title="新建"
        v-model="dialogVisible"
        width="50%"
        :before-close="projectHandleClose">

      <el-form ref="form" :model="projectForm" style="margin:30px 0 0 60px; font-weight: bold">

        <el-form-item label="项目名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="projectForm.project_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目所在单位" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="projectForm.project_unit" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目类型" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="projectForm.project_type" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目状态" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="projectForm.project_status" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目参与时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="projectForm.project_join_time" clearable></el-input>
        </el-form-item>
        <el-form-item label="指导老师姓名" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="projectForm.project_teacher_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="指导老师学院" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="projectForm.project_teacher_dept" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否已提交证书电子版" style="width: 46%; margin-bottom: 40px; margin-right: 2%;">
          <el-radio-group v-model="projectForm.project_issubmit">
            <el-radio  label="是">是</el-radio>
            <el-radio  label="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="认定时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-date-picker v-model="projectForm.project_year" type="year" placeholder="上报学院年份" value-format="YYYY"></el-date-picker>
        </el-form-item>

        <el-form-item label="成果证明材料" style="margin-bottom: 70px;">

          <el-upload
              class="upload-demo"
              ref="upload"
              action="http://10.236.11.68:8080/"
              :http-request="projectUpload"
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
          <el-button @click="projectHandleClose">取消</el-button>
        </el-form-item>
        <div style="height: 50px"></div>
      </el-form>

    </el-dialog>

    <div>申请记录:</div>
    <el-button type="text" @click="dialogVisible = true" :disabled=newButtons>点击新建</el-button>
    <el-scrollbar height="60vh">
      <el-empty description="暂无信息" v-if="didHistory"></el-empty>
      <div v-for="(m,index) in projectDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="projectShow[index]">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目名称:">{{m.project_name}}</el-descriptions-item>
              <el-descriptions-item label="项目所在单位:">{{m.project_unit}}</el-descriptions-item>
              <el-descriptions-item label="项目类型:">{{m.project_type}}</el-descriptions-item>
              <el-descriptions-item label="项目状态:">{{m.project_status}}</el-descriptions-item>
              <el-descriptions-item label="参与项目时间:">{{m.project_join_time}}</el-descriptions-item>
              <el-descriptions-item label="指导老师姓名:">{{m.project_teacher_name}}</el-descriptions-item>
              <el-descriptions-item label="指导老师学院:">{{m.project_teacher_dept}}</el-descriptions-item>
              <el-descriptions-item label="是否已提交证书:">{{m.project_issubmit}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadProject(m.project_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.project_audit_status==='1'">已通过</el-tag>
            <el-tag type="warning" v-if="m.project_audit_status==='0'">待审核</el-tag>
            <el-tag type="danger" v-if="m.project_audit_status==='2'">已驳回</el-tag>
            <span style="margin-left: 5px">认定时间:</span>
            <span style="color:cornflowerblue;">{{m.project_year.substring(0,4)}}</span>
            <el-button @click="changeInfo(index)" style="margin-left: 5%" v-if="m.project_audit_status==='0'">修改</el-button>
            <el-button @click="deleteInfo(index)" style="margin-left: 1%" v-if="m.project_audit_status==='0'">删除</el-button>
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
  name: "stuAwardProject",

  data(){
    return{
      projectForm:{
        project_no: "",
        project_name: "",
        project_unit: "",
        project_type: "",
        project_status: "",
        project_join_time: "",
        project_teacher_name: "",
        project_teacher_dept: "",
        project_student_name: "",
        project_student_no: "",
        project_issubmit: "",
        project_year: "",
        project_supporting_materials: "",
        project_audit_status: "0"
      },
      projectDid:[],//历史记录表
      tagType:['success','warning','danger'],
      projectShow:[],//每条历史记录的v-if
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
    downloadProject(m){
      window.location.href=this.Fapi+"/Projects/"+m
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    fileUploadError(){
      this.$message.error('文件上传失败')
    },
    onSubmit(){
      if(this.projectForm.project_year===''){
        this.$message.warning('认定时间不能为空')
        return
      }
      if(this.projectForm.project_name===''){
        this.$message.warning('项目名不能为空')
        return
      }
      if(this.$refs.upload.uploadFiles.length===0){
        this.$message.warning('请选择证明材料')
        return
      }
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
    projectHandleClose(){
      this.projectForm.project_name= ""
      this.projectForm.project_unit= ""
      this.projectForm.project_type= ""
      this.projectForm.project_status= ""
      this.projectForm.project_join_time= ""
      this.projectForm.project_teacher_name= ""
      this.projectForm.project_teacher_dept= ""
      this.projectForm.project_issubmit= ""
      this.projectForm.project_year= ""
      this.dialogVisible=false
    },
    projectUpload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/upload_project_info2', formData).then(res=>{
        this.projectForm.project_supporting_materials=res.data
        let user=JSON.parse(sessionStorage.getItem('user'))//
        this.projectForm.project_student_no=user.stu_no//
        this.projectForm.project_student_name=user.stu_name//

        request.post("/upload_project_info", that.projectForm).then(res=>{
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

      //请求专利
      request.post('find_my_project_info',user).then(res=>{
        this.projectDid=res
        if(this.projectDid.length===0){
          this.didHistory=true
        }
        else{
          this.didHistory=false
          for(let i=0;i<this.projectDid.length;i++){
            this.projectShow[i]=true
          }
        }
      })

      // 判断是否有正在审核的信息
      request.post('/project_isexamineing',user).then(res=>{
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
      let temp=JSON.stringify(this.projectDid[index])
      this.projectForm=JSON.parse(temp)
    },
    deleteInfo(index){
      let project=JSON.stringify(this.projectDid[index])
      let that=this
      request.post('/delete_project', project).then(res=>{
        this.projectShow[index]=false
        that.refreshComponent()
      })
    },
  },
}
</script>

<style scoped>

</style>