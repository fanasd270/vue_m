<template>
  <div v-if="fresh">
    <el-dialog
        title="新建"
        v-model="dialogVisible"
        width="50%"
        :before-close="serveHandleClose">

      <el-form ref="form" :model="serveForm" style="margin:30px 0 0 60px; font-weight: bold">

        <el-form-item label="志愿活动名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="serveForm.voluntary_activities_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="举办部门" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="serveForm.voluntary_activities_studept" clearable></el-input>
        </el-form-item>
        <el-form-item label="活动始、末时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="serveForm.voluntary_activities_time_from_to" clearable></el-input>
        </el-form-item>
        <el-form-item label="参与时长" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="serveForm.voluntary_activities_time_long" clearable @input="NumberCheck"></el-input>
        </el-form-item>
        <el-form-item label="活动内容" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="serveForm.voluntary_activities_content" clearable></el-input>
        </el-form-item>

        <el-form-item label="成果证明材料" style="margin-bottom: 70px;">

          <el-upload
              class="upload-demo"
              ref="upload"
              action="http://10.236.11.68:8080/"
              :http-request="serveUpload"
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
          <el-button @click="serveHandleClose">取消</el-button>
        </el-form-item>
        <div style="height: 50px"></div>
      </el-form>

    </el-dialog>

    <div>申请记录:</div>
    <div>
      <span>总计时常:</span>
      <span style="color: turquoise">{{sumTime}}</span>
      <span>小时</span>
    </div>
<!--    <el-button type="text" @click="dialogVisible = true" :disabled=newButtons>点击新建</el-button>-->
    <el-button type="text" @click="dialogVisible = true">点击新建</el-button>
    <el-scrollbar height="60vh">
      <el-empty description="暂无信息" v-if="didHistory"></el-empty>
      <div v-for="(m,index) in serveDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="toDoShow[index]">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="志愿活动名称:">{{m.data.voluntary_activities_name}}</el-descriptions-item>
              <el-descriptions-item label="举办部门:">{{m.data.voluntary_activities_studept}}</el-descriptions-item>
              <el-descriptions-item label="活动始、末时间:">{{m.data.voluntary_activities_time_from_to}}</el-descriptions-item>
              <el-descriptions-item label="参与时长:">{{m.data.voluntary_activities_time_long}}</el-descriptions-item>
              <el-descriptions-item label="活动内容:">{{m.data.voluntary_activities_content}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadServe(m.data.voluntary_activities_url)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.data.voluntary_activities_status==='1'">已通过</el-tag>
            <el-tag type="warning" v-if="m.data.voluntary_activities_status==='0'">待审核</el-tag>
            <el-tag type="danger" v-if="m.data.voluntary_activities_status==='2'">已驳回</el-tag>
<!--            <el-button @click="changeInfo(index)" style="margin-left: 5%" v-if="m.voluntary_activities_status==='0'">修改</el-button>-->
            <el-button @click="changeInfo(index)" style="margin-left: 5%">修改</el-button>
            <el-button @click="deleteInfo(index)" style="margin-left: 1%" v-if="m.data.voluntary_activities_status==='0'||m.data.voluntary_activities_status==='2'">删除</el-button>
            <div v-if="m.data.voluntary_activities_status==='2'">
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
import uploadFilled from "@element-plus/icons/lib/UploadFilled";

export default {
  name: "stuVolServe",

  components:{
    uploadFilled,
  },
  data(){
    return{
      serveForm:{
        voluntary_activities_no:'',
        voluntary_activities_stu_name:'',
        voluntary_activities_studept:'',
        voluntary_activities_stu_no:'',
        voluntary_activities_time_from_to:'',
        voluntary_activities_time_long:null,
        voluntary_activities_content:'',
        voluntary_activities_status:'0',
        voluntary_activities_name:'',
        voluntary_activities_url:'',
      },
      serveDid:[],//历史记录表
      tagType:['success','warning','danger'],
      toDoShow:[],//每条历史记录的v-if
      // newButtons:false,//新建按钮是否可用
      dialogVisible:false,//表单的显示
      didHistory:false,//空状态是否显示
      fresh:true,
      sumTime:0,
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
    NumberCheck(num) {
      let str = this.serveForm.voluntary_activities_time_long;
      //限制只能输入一个小数点
      if (str.indexOf(".") !== -1) {
        var str_ = str.substr(str.indexOf(".") + 1);
        if (str_.indexOf(".") !== -1) {
          str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
        }
      }
      //正则替换，保留数字和小数点
      str = str.replace(/[^\d^\.]+/g,'')
      this.serveForm.voluntary_activities_time_long=str
    },
    downloadServe(m){
      window.open(this.Fapi+"/Activities/"+m)
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    fileUploadError(){
      this.$message.error('文件上传失败')
    },
    onSubmit(){
      if(this.$refs.upload.uploadFiles.length===0){
        this.$message.warning('请选择证明材料')
        return
      }
      // this.serveForm.voluntary_activities_name=''
      // this.serveForm.voluntary_activities_studept=''
      // this.serveForm.voluntary_activities_time_from_to=''
      // this.serveForm.voluntary_activities_time_long=null
      // this.serveForm.voluntary_activities_content=''
      if(this.serveForm.voluntary_activities_name===''||this.serveForm.voluntary_activities_studept===''||
          this.serveForm.voluntary_activities_time_from_to===''||this.serveForm.voluntary_activities_time_long===''||this.serveForm.voluntary_activities_content===''){
        this.$message.warning('请将信息填写完整')
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
    serveHandleClose(){
      this.serveForm.voluntary_activities_name=''
      this.serveForm.voluntary_activities_studept=''
      this.serveForm.voluntary_activities_time_from_to=''
      this.serveForm.voluntary_activities_time_long=null
      this.serveForm.voluntary_activities_content=''
      this.dialogVisible=false
    },
    serveUpload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/upload_activity_info2', formData).then(res=>{
        if(res.code===0){
          this.$message.error("文件类型错误")
          return
        }
        this.fileList=[]
        this.serveForm.voluntary_activities_url=res.data
        let user=JSON.parse(sessionStorage.getItem('user'))//
        this.serveForm.voluntary_activities_stu_no=user.stu_no//
        this.serveForm.voluntary_activities_stu_name=user.stu_name//
        this.serveForm.voluntary_activities_status='0'

        request.post("/upload_activity_info", that.serveForm).then(res=>{
          that.$message.success(res.msg)
          this.serveHandleClose()//关闭表单
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
      request.post('/find_my_activity_info',user).then(res=>{
        this.serveDid=res
        if(this.serveDid.length===0){
          this.didHistory=true
        }
        else{
          this.didHistory=false
          for(let i=0;i<this.serveDid.length;i++){
            this.toDoShow[i]=true
          }
        }
        this.countTime()
      })
    },

    changeInfo(index){
      this.dialogVisible=true
      let temp=JSON.stringify(this.serveDid[index].data)
      this.serveForm=JSON.parse(temp)
    },
    deleteInfo(index){
      let serve=JSON.stringify(this.serveDid[index].data)
      let that=this
      request.post('/delete_activity', serve).then(res=>{
        this.toDoShow[index]=false
        that.refreshComponent()
      })
    },
    countTime(){
      for(let i=0,t=0;i<this.serveDid.length;i++){
        if(this.serveDid[i].voluntary_activities_status==='1'){
          t=this.serveDid[i].voluntary_activities_time_long-0
          this.sumTime+=t
        }
      }
    },
  },
}
</script>

<style scoped>

</style>