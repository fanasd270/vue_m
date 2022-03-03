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
          <el-input v-model="serveForm.voluntary_activities_time_long" clearable></el-input>
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
    <el-button type="text" @click="dialogVisible = true" :disabled=newButtons>点击新建</el-button>
    <el-scrollbar height="60vh">
      <el-empty description="暂无信息" v-if="didHistory"></el-empty>
      <div v-for="(m,index) in serveDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="toDoShow[index]">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="志愿活动名称:">{{m.voluntary_activities_name}}</el-descriptions-item>
              <el-descriptions-item label="举办部门:">{{m.voluntary_activities_studept}}</el-descriptions-item>
              <el-descriptions-item label="活动始、末时间:">{{m.voluntary_activities_time_from_to}}</el-descriptions-item>
              <el-descriptions-item label="参与时长:">{{m.voluntary_activities_time_long}}</el-descriptions-item>
              <el-descriptions-item label="活动内容:">{{m.voluntary_activities_content}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:">{{m.voluntary_activities_url}}</el-descriptions-item>
              <!--              <el-descriptions-item label="证明材料:"><a href="http://localhost:8080/background.png"></a></el-descriptions-item>-->
              <!--                  csdn收藏夹尝试不同源下载图片-->
            </el-descriptions>
            <el-tag type="success" v-if="m.voluntary_activities_status==='1'">已通过</el-tag>
            <el-tag type="warning" v-if="m.voluntary_activities_status==='0'">待审核</el-tag>
            <el-tag type="danger" v-if="m.voluntary_activities_status==='2'">已驳回</el-tag>
            <el-button @click="changeInfo(index)" style="margin-left: 5%" v-if="m.voluntary_activities_status==='0'">修改</el-button>
            <el-button @click="deleteInfo(index)" style="margin-left: 1%" v-if="m.voluntary_activities_status==='0'">删除</el-button>
          </el-card>
        </transition>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "stuVolServe",

  data(){
    return{
      serveForm:{
        voluntary_activities_no:'',
        voluntary_activities_stu_name:'',
        voluntary_activities_studept:'',
        voluntary_activities_stu_no:'',
        voluntary_activities_time_from_to:'',
        voluntary_activities_time_long:0,
        voluntary_activities_content:'',
        voluntary_activities_status:'0',
        voluntary_activities_name:'',
        voluntary_activities_url:'',
      },
      serveDid:[],//历史记录表
      tagType:['success','warning','danger'],
      toDoShow:[],//每条历史记录的v-if
      newButtons:false,//新建按钮是否可用
      dialogVisible:false,//表单的显示
      didHistory:false,//空状态是否显示
      fresh:true,
      sumTime:0,
    }
  },

  created() {
    this.getData()
  },
  methods:{
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
    serveHandleClose(){
      this.serveForm.voluntary_activities_name=''
      this.serveForm.voluntary_activities_studept=''
      this.serveForm.voluntary_activities_time_from_to=''
      this.serveForm.voluntary_activities_time_long=0
      this.serveForm.voluntary_activities_content=''
      this.dialogVisible=false
    },
    serveUpload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/upload_activity_info2', formData).then(res=>{
        this.serveForm.voluntary_activities_url=res.data
        console.log(res)
        let user=JSON.parse(sessionStorage.getItem('user'))//
        this.serveForm.voluntary_activities_stu_no=user.stu_no//
        this.serveForm.voluntary_activities_stu_name=user.stu_name//

        request.post("/upload_activity_info", that.serveForm).then(res=>{
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
      request.post('/find_my_activity_info',user).then(res=>{
        console.log(res)
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
      let temp=JSON.stringify(this.serveDid[index])
      this.serveForm=JSON.parse(temp)
    },
    deleteInfo(index){
      let serve=JSON.stringify(this.serveDid[index])
      let that=this
      request.post('/delete_activity', serve).then(res=>{
        console.log(res)
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