<template>
  <div style="position: relative; margin:20px 0 0 9% ">
    <div style="margin-bottom: 20px">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
        下载中心
      </p>
    </div>
    <br>
    <div style="margin: 0 40px 0 0;width: 20%;display: inline-block; vertical-align: top">
      <span>上传专区</span>
      <el-divider></el-divider>
      <el-button type="text" @click="uploadFile">上传文件</el-button>
      <br>
    </div>


    <div style="margin: 0 40px 0 0;width: 60%;display: inline-block; vertical-align: top">
      <span>下载专区</span>
      <el-divider></el-divider>
      <div style="font-size: small">
        <el-divider content-position="left">教师上传</el-divider>
        <el-scrollbar max-height="400px">
          <div v-for="(item,index) in dataTea">
            <span style="font-size: medium; max-width: 5em;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;color: #008c8c">{{item.download_center_description}}</span>
            <span>||{{item.download_center_user_name}}</span>
            <span>||{{item.download_center_time}}</span>
            <span>||{{item.count}}</span>
            <el-button type="text" @click="downloadFile(item)">下载</el-button>
            <el-button v-if="item.download_center_user_no==user.t_no" @click="deleteMine(item)">删除</el-button>
            <el-divider border-style="dashed" />
          </div>
        </el-scrollbar>
        <el-divider content-position="left">学生上传</el-divider>
          <el-scrollbar max-height="400px">
            <div v-for="(item,index) in dataStu">
              <span style="font-size: medium">{{item.download_center_description}}</span>
              <span>||{{item.download_center_user_name}}</span>
              <span>||{{item.download_center_time}}</span>
              <span>||{{item.count}}</span>
              <el-button type="text" @click="downloadFile(item)">下载</el-button>
              <el-button v-if="item.download_center_user_no==user.stu_no" @click="deleteMine(item)">删除</el-button>
              <el-divider border-style="dashed" />
            </div>
          </el-scrollbar>
      </div>

      <br>
    </div>

    <el-dialog
        v-model="dialogVisible"
        title="上传文件"
        width="30%"
    >
      <span>文件描述：</span>
      <el-input v-model="upForm.download_center_description" style="width: 68%;margin-bottom: 5px" placeholder="这将是下载者识别该文件内容的唯一依据"></el-input>
      <el-upload
          class="upload-demo"
          ref="upload"
          action="http://10.236.11.68:8080/"
          :http-request="paperUpload"
          drag
          :limit="1"
          :auto-upload="false">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽或 <em>点击上传</em>
        </div>
        <!--      <template #tip>-->
        <!--        <div class="el-upload__tip">-->
        <!--          仅上传jpg/pdf-->
        <!--        </div>-->
        <!--      </template>-->
      </el-upload>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="upFormCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import fileApi from "@/components/Store";
import request from "@/utils/request";
export default {
  name: "downloadCenter",
  data(){
    return{
      user:{},
      Fapi:'',
      dialogVisible:false,
      upForm:{
        download_center_no:"",
        download_center_user_name: "",
        download_center_user_no: "",
        download_user_type: "",
        download_center_url: "",
        download_center_description: "",
        count: 0,
        download_center_time: ""
      },
      copyUpForm:{},

      dataTea:[],
      dataStu:[],
    }
  },
  created() {
    this.Fapi=fileApi.fileApi;
    this.user=JSON.parse(sessionStorage.getItem('user'))
    if(this.user.t_no){
      this.upForm.download_user_type='t'
      this.upForm.download_center_user_name=this.user.t_name
      this.upForm.download_center_user_no=this.user.t_no+''
    } else{
      this.upForm.download_user_type='s'
      this.upForm.download_center_user_name=this.user.stu_name
      this.upForm.download_center_user_no=this.user.stu_no+''
    }
    this.copyUpForm=JSON.parse(JSON.stringify(this.upForm))
    this.getData()
  },
  methods:{

    deleteMine(item){
      request.post('/Tea/deleFileDB',item).then(res=>{
        this.$message.success("删除成功")
      }).catch(err=>{
        this.$message.error("删除失败")
      })
    },
    downloadFile(item){
      request.post('/countDownload',item).then(res=>{
        if(res.code===1){
          window.location.href=this.Fapi+"/DownloadCenter/"+item.download_center_url
          item.count=res.data
        }else{
          this.$message.error("下载失败")
        }
      })
    },

    getData(){
      request.post('/findAllTeacherDownCenter').then(res=>{
        console.log(res)
        this.dataTea=res.data
      })
      request.post('/findAllStudentrDownCenter').then(res=>{
        console.log(res.data)
        this.dataStu=res.data
      })
    },
    uploadFile(){
      this.dialogVisible=true
      this.upForm=JSON.parse(JSON.stringify(this.copyUpForm))
    },

    upFormCancel(){
      this.dialogVisible=false
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    onSubmit(){
      this.submitUpload()
    },
    paperUpload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      if(this.upForm.download_user_type==='t'){
        request.post('/Tea/uploadFile', formData).then(res=>{
          this.upForm.download_center_url=res.data
          console.log(this.upForm)
          request.post("/Tea/uploadFileDB",this.upForm).then(res=>{
            that.$message.success(res.msg)
            this.dialogVisible=false
          }).catch(err=>{
            that.$message.error("请求错误")
          })
        })
      }else{
        request.post('/Stu/uploadFile', formData).then(res=>{
          this.upForm.download_center_url=res.data
          request.post("/Stu/uploadFileDB",this.upForm).then(res=>{
            that.$message.success(res.msg)
            this.dialogVisible=false
          }).catch(err=>{
            that.$message.error("请求错误")
          })
        })

      }

    },
  },
}
</script>

<style scoped>

</style>