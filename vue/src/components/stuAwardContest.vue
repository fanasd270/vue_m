<template>
  <div v-if="fresh">
    <el-dialog
        title="新建"
        v-model="dialogVisible"
        width="50%"
        :before-close="contestHandleClose">

      <el-form ref="form" :model="contestForm" style="margin:30px 0 0 60px; font-weight: bold">

        <el-form-item label="竞赛名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="contestForm.contest_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="contestForm.contest_projectname" clearable></el-input>
        </el-form-item>
        <el-form-item label="授予部门" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="contestForm.contest_grantingdepartment" clearable></el-input>
        </el-form-item>
        <el-form-item label="获奖级别" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="contestForm.contest_level" clearable placeholder="国家级/省部级/校级..."></el-input>
        </el-form-item>
        <el-form-item label="获奖名次" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="contestForm.contest_ranking" clearable></el-input>
        </el-form-item>
        <el-form-item label="获奖时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="contestForm.contest_date" clearable></el-input>
        </el-form-item>
        <el-form-item label="指导老师姓名" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="contestForm.contest_teachername" clearable></el-input>
        </el-form-item>
        <el-form-item label="指导老师学院" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="contestForm.contest_teacherdept" clearable></el-input>
        </el-form-item>
        <el-form-item label="获奖信息是否已上传" style="width: 46%; margin-bottom: 40px; margin-right: 2%;">
          <el-radio-group v-model="contestForm.contest_issubmitcertificate">
            <el-radio  label="是">是</el-radio>
            <el-radio  label="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="认定时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-date-picker v-model="contestForm.contest_year" type="year" placeholder="上报学院年份" value-format="YYYY"></el-date-picker>
        </el-form-item>


        <el-form-item label="获奖证书" style="margin-bottom: 70px;">

          <el-upload
              class="upload-demo"
              ref="upload"
              action="http://10.236.11.68:8080/"
              :http-request="contestUpload"
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
                仅上传jpg/pdf；清晰扫描件，姓名+学号命名
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item style="position: absolute; left:40%">
          <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>
          <el-button @click="contestHandleClose">取消</el-button>
        </el-form-item>
        <div style="height: 50px"></div>
      </el-form>

    </el-dialog>

    <div>申请记录:</div>
    <el-button type="text" @click="dialogVisible = true" :disabled=newButtons>点击新建</el-button>
    <el-scrollbar height="60vh">
      <el-empty description="暂无信息" v-if="didHistory"></el-empty>
      <div v-for="(m,index) in contestDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="contestShow[index]">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="竞赛名称:">{{m.contest_name}}</el-descriptions-item>
              <el-descriptions-item label="项目名称:">{{m.contest_projectname}}</el-descriptions-item>
              <el-descriptions-item label="授予部门:">{{m.contest_grantingdepartment}}</el-descriptions-item>
              <el-descriptions-item label="获奖级别:">{{m.contest_level}}</el-descriptions-item>
              <el-descriptions-item label="获奖名次:">{{m.contest_ranking}}</el-descriptions-item>
              <el-descriptions-item label="获奖时间:">{{m.contest_date}}</el-descriptions-item>
              <el-descriptions-item label="指导老师姓名:">{{m.contest_teachername}}</el-descriptions-item>
              <el-descriptions-item label="指导老师学院:">{{m.contest_teacherdept}}</el-descriptions-item>
              <el-descriptions-item label="获奖证书上传:">{{m.contest_issubmitcertificate}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadContest(m.contest_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.contest_status==='1'">已通过</el-tag>
            <el-tag type="warning" v-if="m.contest_status==='0'">待审核</el-tag>
            <el-tag type="danger" v-if="m.contest_status==='2'">已驳回</el-tag>
            <span style="margin-left: 5px">认定时间:</span>
            <span style="color:cornflowerblue;">{{m.contest_year.substring(0,4)}}</span>
            <el-button @click="changeContestInfo(index)" style="margin-left: 5%" v-if="m.contest_status==='0'">修改</el-button>
            <el-button @click="deleteContestInfo(index)" style="margin-left: 1%" v-if="m.contest_status==='0'">删除</el-button>
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
  name: "stuAwardContest",
  data(){
    return{
      contestForm:{
        contest_no: "",
        contest_name: "",
        contest_projectname: "",
        contest_grantingdepartment: "",
        contest_level: "",
        contest_ranking: "",
        contest_date: "",
        contest_teachername: "",
        contest_teacherdept: "",
        contest_stuname: "",
        contest_stuno: "",
        contest_issubmitcertificate: "",
        contest_year: "",
        contest_supporting_materials: "",
        contest_status: "0"
      },
      contestDid:[],//竞赛
      tagType:['success','warning','danger'],
      contestShow:[],//竞赛每条历史记录的v-if
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
    downloadContest(m){
      window.location.href=this.Fapi+"/Contests/"+m
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
    contestHandleClose(){
      this.contestForm.contest_name=''
      this.contestForm.contest_projectname=''
      this.contestForm.contest_grantingdepartment=''
      this.contestForm.contest_level=''
      this.contestForm.contest_ranking=''
      this.contestForm.contest_date=''
      this.contestForm.contest_teachername=''
      this.contestForm.contest_teacherdept=''
      this.contestForm.contest_issubmitcertificate=''
      this.contestForm.contest_year=''
      this.dialogVisible=false
    },

    contestUpload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/upload_contest_info2', formData).then(res=>{
        this.contestForm.contest_supporting_materials=res.data
        console.log(res)
        let user=JSON.parse(sessionStorage.getItem('user'))//
        this.contestForm.contest_stuno=user.stu_no//
        this.contestForm.contest_stuname=user.stu_name//

        request.post("/upload_contest_info", that.contestForm).then(res=>{
          console.log(res)
          that.$message.success(res.msg)
          this.dialogVisible=false//关闭表单
           // that.reload()
          that.refreshComponent()
        }).catch(err=>{
          that.$message.error("请求错误")
        })
      })
    },
    getData(){
      let user=JSON.parse(sessionStorage.getItem('user'))
      user.stu_no=user.stu_no-0

      //请求竞赛
      request.post('/find_my_contest_info',user).then(res=>{
        console.log(res)
        this.contestDid=res
        if(this.contestDid.length===0){
          this.didHistory=true
        }
        else{
          this.didHistory=false
          for(let i=0;i<this.contestDid.length;i++){
            this.contestShow[i]=true
          }
        }
      })

      // 判断是否有正在审核的信息
      request.post('/contest_isexamineing',user).then(res=>{
        console.log("竞赛审核："+res)
        if(res===1){
          this.newButtons=true
        }
        else{
          this.newButtons=false
        }
      })
    },

    changeContestInfo(index){
      this.dialogVisible=true
      let temp=JSON.stringify(this.contestDid[index])
      this.contestForm=JSON.parse(temp)
    },

    deleteContestInfo(index){
      let contest=JSON.stringify(this.contestDid[index])
      let that=this
      request.post('/delete_contest', contest).then(res=>{
        console.log(res)
        this.contestShow[index]=false
        that.refreshComponent()
      })
    },
  },
}
</script>

<style scoped>

</style>