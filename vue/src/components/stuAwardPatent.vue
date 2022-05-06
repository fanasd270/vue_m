<template>
  <div v-if="fresh">
    <el-dialog
        title="新建"
        v-model="dialogVisible"
        width="50%"
        :before-close="patentHandleClose">

      <el-form ref="form" :model="patentForm" style="margin:30px 0 0 60px; font-weight: bold">

        <el-form-item label="专利名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="patentForm.patent_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="专利类型" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="patentForm.patent_type" clearable></el-input>
        </el-form-item>
        <el-form-item label="专利申请号" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="patentForm.patent_application_no" clearable></el-input>
        </el-form-item>
        <el-form-item label="专利申请日" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="patentForm.patent_application_time" clearable></el-input>
        </el-form-item>
        <el-form-item label="专利证书号" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="patentForm.patent_certificate_no" clearable></el-input>
        </el-form-item>
        <el-form-item label="专利获权时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="patentForm.patent_authorization_time" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否第一发明人" style="width: 46%; margin-bottom: 40px; margin-right: 2%;">
          <el-radio-group v-model="patentForm.patent_isfirstone">
            <el-radio  label="是">是</el-radio>
            <el-radio  label="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="认定时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-date-picker v-model="patentForm.patent_year" type="year" placeholder="上报学院年份" value-format="YYYY"></el-date-picker>
        </el-form-item>


        <el-form-item label="成果证明材料" style="margin-bottom: 70px;">

          <el-upload
              class="upload-demo"
              ref="upload"
              action="http://10.236.11.68:8080/"
              :http-request="patentUpload"
              drag
              :on-error="fileUploadError"
              :limit="1"
              :on-exceed="uploadCover"
              :auto-upload="false">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              拖拽或 <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                仅上传jpg/pdf/png
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item style="position: absolute; left:40%">
          <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>
          <el-button @click="patentHandleClose">取消</el-button>
        </el-form-item>
        <div style="height: 50px"></div>
      </el-form>

    </el-dialog>

    <div>申请记录:</div>
<!--    <el-button type="text" @click="dialogVisible = true" :disabled=newButtons>点击新建</el-button>-->
    <el-button type="text" @click="dialogVisible = true">点击新建</el-button>
    <el-scrollbar height="60vh">
      <el-empty description="暂无信息" v-if="didHistory"></el-empty>
      <div v-for="(m,index) in patentDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="patentShow[index]">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="专利名称:">{{m.patent_name}}</el-descriptions-item>
              <el-descriptions-item label="专利类型:">{{m.patent_type}}</el-descriptions-item>
              <el-descriptions-item label="专利申请号:">{{m.patent_application_no}}</el-descriptions-item>
              <el-descriptions-item label="专利申请日:">{{m.patent_application_time}}</el-descriptions-item>
              <el-descriptions-item label="专利证书号:">{{m.patent_certificate_no}}</el-descriptions-item>
              <el-descriptions-item label="专利获权时间:">{{m.patent_authorization_time}}</el-descriptions-item>
              <el-descriptions-item label="是否第一发明人:">{{m.patent_isfirstone}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadPatent(m.patent_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.patent_status==='1'">已通过</el-tag>
            <el-tag type="warning" v-if="m.patent_status==='0'">待审核</el-tag>
            <el-tag type="danger" v-if="m.patent_status==='2'">已驳回</el-tag>
            <span style="margin-left: 5px">认定时间:</span>
            <span style="color:cornflowerblue;">{{m.patent_year.substring(0,4)}}</span>
<!--            <el-button @click="changeInfo(index)" style="margin-left: 5%" v-if="m.patent_status==='0'">修改</el-button>-->
            <el-button @click="changeInfo(index)" style="margin-left: 5%">修改</el-button>
            <el-button @click="deleteInfo(index)" style="margin-left: 1%" v-if="m.patent_status==='0'||m.patent_status==='2'">删除</el-button>
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
  name: "stuAwardPatent",
  data(){
    return{
      patentForm:{
        patent_no: "",
        patent_stu_no: "",
        patent_stu_name: "",
        patent_name: "",
        patent_type: "",
        patent_application_no: "",
        patent_application_time: "",
        patent_certificate_no: "",
        patent_authorization_time: "",
        patent_isfirstone: "",
        patent_year: "",
        patent_supporting_materials: "",
        patent_status: "0"
      },
      patentDid:[],//历史记录表
      tagType:['success','warning','danger'],
      patentShow:[],//paper每条历史记录的v-if
      // newButtons:false,//新建按钮是否可用
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
    uploadCover(files, fileList){
      this.$refs.upload.clearFiles()
      this.$refs.upload.handleStart(files[0])
    },
    downloadPatent(m){
      window.open(this.Fapi+"/Patents/"+m)
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    fileUploadError(){
      this.$message.error('文件上传失败')
    },
    onSubmit(){
      if(this.patentForm.patent_year===''){
        this.$message.warning('认定时间不能为空')
        return
      }
      if(this.patentForm.patent_name===''){
        this.$message.warning('专利名不能为空')
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
    patentHandleClose(){
      this.patentForm.patent_name=''
      this.patentForm.patent_type=''
      this.patentForm.patent_application_no=''
      this.patentForm.patent_application_time=''
      this.patentForm.patent_certificate_no=''
      this.patentForm.patent_authorization_time=''
      this.patentForm.patent_isfirstone=''
      this.patentForm.patent_year=''
      this.dialogVisible=false
    },
    patentUpload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/upload_patent_info2', formData).then(res=>{
        if(res.code===0){
          this.$message.error("文件类型错误")
          return
        }
        this.patentForm.patent_supporting_materials=res.data
        let user=JSON.parse(sessionStorage.getItem('user'))//
        this.patentForm.patent_stu_no=user.stu_no//
        this.patentForm.patent_stu_name=user.stu_name//
        this.patentForm.patent_status='0'
        request.post("/upload_patent_info", that.patentForm).then(res=>{
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
      request.post('find_my_patent_info',user).then(res=>{
        this.patentDid=res
        if(this.patentDid.length===0){
          this.didHistory=true
        }
        else{
          this.didHistory=false
          for(let i=0;i<this.patentDid.length;i++){
            this.patentShow[i]=true
          }
        }
      })

      // 判断是否有正在审核的信息
      // request.post('/patent_isexamineing',user).then(res=>{
      //   if(res===1){
      //     this.newButtons=true
      //   }
      //   else{
      //     this.newButtons=false
      //   }
      //
      //   this.newButtons=false//之后删除
      // })

    },

    changeInfo(index){
      this.dialogVisible=true
      let temp=JSON.stringify(this.patentDid[index])
      this.patentForm=JSON.parse(temp)
    },
    deleteInfo(index){
      let patent=JSON.stringify(this.patentDid[index])
      let that=this
      request.post('/delete_patent', patent).then(res=>{
        this.patentShow[index]=false
        that.refreshComponent()
      })
    },
  },
}
</script>

<style scoped>

</style>