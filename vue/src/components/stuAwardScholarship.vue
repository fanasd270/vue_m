<template>
  <div v-if="fresh">
    <el-dialog
        title="新建"
        v-model="dialogVisible"
        width="50%"
        :before-close="paperHandleClose">

      <el-form ref="form" :model="awardForm" style="margin:30px 0 0 60px; font-weight: bold">

        <el-form-item label="奖学金名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="awardForm.scholarship_info_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="颁发单位" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="awardForm.scholarship_info_unit" clearable></el-input>
        </el-form-item>
        <el-form-item label="获奖时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="awardForm.scholarship_info_time" clearable></el-input>
        </el-form-item>
        <el-form-item label="排名" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="awardForm.scholarship_info_rank" clearable placeholder="选填"></el-input>
        </el-form-item>
        <el-form-item label="认定时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-date-picker v-model="awardForm.scholarship_info_year" type="year" placeholder="上报学院年份" value-format="YYYY"></el-date-picker>
        </el-form-item>

        <el-form-item label="成果证明材料" style="margin-bottom: 70px;">

          <el-upload
              class="upload-demo"
              ref="upload"
              action="http://10.236.11.68:8080/"
              :http-request="paperUpload"
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
          <el-button @click="paperHandleClose">取消</el-button>
        </el-form-item>
        <div style="height: 50px"></div>
      </el-form>

    </el-dialog>

    <div>申请记录:</div>
    <el-button type="text" @click="dialogVisible = true" :disabled=newButtons>点击新建</el-button>
    <el-scrollbar height="60vh">
      <el-empty description="暂无信息" v-if="didHistory"></el-empty>
      <div v-for="(m,index) in paperDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="toDoShow[index]">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="奖学金名称:">{{m.scholarship_info_name}}</el-descriptions-item>
              <el-descriptions-item label="颁发单位:">{{m.scholarship_info_unit}}</el-descriptions-item>
              <el-descriptions-item label="获奖时间:">{{m.scholarship_info_time}}</el-descriptions-item>
              <el-descriptions-item label="排名:">{{m.scholarship_info_rank}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadPaper(m.scholarship_info_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.scholarship_info_status==='1'">已通过</el-tag>
            <el-tag type="warning" v-if="m.scholarship_info_status==='0'">待审核</el-tag>
            <el-tag type="danger" v-if="m.scholarship_info_status==='2'">已驳回</el-tag>
            <span style="margin-left: 5px">认定时间:</span>
            <span style="color:cornflowerblue;">{{m.scholarship_info_year}}</span>
            <el-button @click="changeInfo(index)" style="margin-left: 5%" v-if="m.scholarship_info_status==='0'">修改</el-button>
            <el-button @click="deleteInfo(index)" style="margin-left: 1%" v-if="m.scholarship_info_status==='0'">删除</el-button>
          </el-card>
        </transition>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import fileApi from "@/components/Store";
import request from "@/utils/request";

export default {
  name: "stuAwardScholarship",
  data(){
    return{
      value1:0,
      awardForm:{
        scholarship_info_no: "",
        scholarship_info_name: "",
        scholarship_info_stu_no: "",
        scholarship_info_stu_name: "",
        scholarship_info_unit: "",
        scholarship_info_rank: "",
        scholarship_info_time: "",
        scholarship_info_year: "",
        scholarship_info_status: "0",
        scholarship_info_supporting_materials:""
      },
      paperDid:[],//论文历史记录表
      tagType:['success','warning','danger'],
      toDoShow:[],//paper每条历史记录的v-if
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
    downloadPaper(m){
      window.location.href=this.Fapi+"/ScholarshipInfo/"+m
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    fileUploadError(){
      this.$message.error('文件上传失败')
    },
    onSubmit(){
      if(this.awardForm.scholarship_info_year===''){
        this.$message.warning('认定时间不能为空')
        return
      }
      if(this.awardForm.scholarship_info_name===''){
        this.$message.warning('奖学金名称不能为空')
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
    paperHandleClose(){
      this.awardForm.scholarship_info_name=""
      this.awardForm.scholarship_info_unit= ""
      this.awardForm.scholarship_info_rank=""
      this.awardForm.scholarship_info_time=""
      this.awardForm.scholarship_info_year=""
      this.dialogVisible=false
    },
    paperUpload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/upload_scholarship_info2', formData).then(res=>{
        this.awardForm.scholarship_info_supporting_materials=res.data
        let user=JSON.parse(sessionStorage.getItem('user'))//
        this.awardForm.scholarship_info_stu_no=user.stu_no+''//
        this.awardForm.scholarship_info_stu_name=user.stu_name//
        request.post("/upload_scholarship", that.awardForm).then(res=>{
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

      //请求
      request.post('/find_my_scholarship',user).then(res=>{
        this.paperDid=res
        if(this.paperDid.length===0){
          this.didHistory=true
        }
        else{
          this.didHistory=false
          for(let i=0;i<this.paperDid.length;i++){
            this.toDoShow[i]=true
          }
        }
      })

      // 判断是否有正在审核的信息
      request.post('/scholarship_isExamining',user).then(res=>{
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
      let temp=JSON.stringify(this.paperDid[index])
      this.awardForm=JSON.parse(temp)
    },
    deleteInfo(index){
      let paper=JSON.stringify(this.paperDid[index])
      let that=this
      request.post('/delete_scholarship', paper).then(res=>{
        this.toDoShow[index]=false
        that.refreshComponent()
      })
    },
  },
}
</script>

<style scoped>

</style>