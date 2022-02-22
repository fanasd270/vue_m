<template>
  <div v-if="fresh">
    <el-dialog
        title="新建"
        v-model="dialogVisible"
        width="50%"
        :before-close="paperHandleClose">

      <el-form ref="form" :model="paperForm" style="margin:30px 0 0 60px; font-weight: bold">

        <el-form-item label="论文名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="paperForm.paper_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="发表期刊/会议名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="paperForm.paper_periodical" clearable></el-input>
        </el-form-item>
        <el-form-item label="出版时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="paperForm.paper_publicationTime" clearable></el-input>
        </el-form-item>
        <el-form-item label="认定时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="paperForm.paper_year" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否CSCD" style="width: 46%; margin-bottom: 40px; margin-right: 2%;">
          <el-radio-group v-model="paperForm.paper_iscscd">
            <el-radio  label="是">是</el-radio>
            <el-radio  label="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="SCI检索号" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="paperForm.paper_sciSearchNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="EI检索号" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
          <el-input v-model="paperForm.paper_eiSearchNumber" clearable></el-input>
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
              <el-descriptions-item label="论文名称:">{{paperDid[index].paper_name}}</el-descriptions-item>
              <el-descriptions-item label="发表期刊/会议名称:">{{paperDid[index].paper_periodical}}</el-descriptions-item>
              <el-descriptions-item label="出版时间:">{{paperDid[index].paper_publicationTime}}</el-descriptions-item>
              <el-descriptions-item label="认定时间:">{{paperDid[index].paper_year}}</el-descriptions-item>
              <el-descriptions-item label="是否CSCD:">{{paperDid[index].paper_iscscd}}</el-descriptions-item>
              <el-descriptions-item label="SCI检索号:">{{paperDid[index].paper_sciSearchNumber}}</el-descriptions-item>
              <el-descriptions-item label="EI检索号:">{{paperDid[index].paper_eiSearchNumber}}</el-descriptions-item>
              <!--                  <el-descriptions-item label="证明材料:">{{paperDid[index].paper_supporting_materials}}</el-descriptions-item>-->
              <el-descriptions-item label="证明材料:"><a href="http://localhost:8080/background.png"></a></el-descriptions-item>
              <!--                  csdn收藏夹尝试不同源下载图片-->
            </el-descriptions>
            <el-tag type="success" v-if="paperDid[index].paper_status==='1'">已通过</el-tag>
            <el-tag type="warning" v-if="paperDid[index].paper_status==='0'">待审核</el-tag>
            <el-tag type="danger" v-if="paperDid[index].paper_status==='2'">已驳回</el-tag>
            <el-button @click="changeInfo(index)" style="margin-left: 5%" v-if="paperDid[index].paper_status==='0'">修改</el-button>
            <el-button @click="deleteInfo(index)" style="margin-left: 1%" v-if="paperDid[index].paper_status==='0'">删除</el-button>
          </el-card>
        </transition>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "stuAwardPaper",
  data(){
    return{
      paperForm:{
        paper_no: "",
        paper_stuno: 0,
        paper_stuname: "",
        paper_name: "",
        paper_periodical: "",
        paper_publicationTime: "",
        paper_iscscd: "",
        paper_sciSearchNumber: "",
        paper_eiSearchNumber: "",
        paper_year: "",
        paper_supporting_materials: "zzz",
        paper_status:"0",
      },
      paperDid:[],//论文历史记录表
      tagType:['success','warning','danger'],
      toDoShow:[],//paper每条历史记录的v-if
      newButtons:false,//新建按钮是否可用
      dialogVisible:false,//表单的显示
      didHistory:false,//空状态是否显示
      fresh:true,
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
    paperHandleClose(){
      this.paperForm.paper_name=''
      this.paperForm.paper_periodical=''
      this.paperForm.paper_publicationTime=''
      this.paperForm.paper_year=''
      this.paperForm.paper_iscscd=''
      this.paperForm.paper_sciSearchNumber=''
      this.paperForm.paper_eiSearchNumber=''
      this.paperForm.paper_supporting_materials=''
      this.dialogVisible=false
    },
    paperUpload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/upload_paper_info2', formData).then(res=>{
        this.paperForm.paper_supporting_materials=res.data
        console.log(res)
        let user=JSON.parse(sessionStorage.getItem('user'))//
        this.paperForm.paper_stuno=user.stu_no//
        this.paperForm.paper_stuname=user.stu_name//以上三句可在getData实现后删除

        request.post("/upload_paper_info", that.paperForm).then(res=>{
          console.log(res)
          that.$message.success(res.msg)
          this.dialogVisible=false//关闭表单
          that.refreshComponent()
        })
      })
    },
    getData(){
      let user=JSON.parse(sessionStorage.getItem('user'))
      user.stu_no=user.stu_no-0

      //请求论文
      request.post('/find_my_paper_info',user).then(res=>{
        console.log(res)
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
      request.post('/paper_isexamineing',user).then(res=>{
        console.log("论文审核："+res)
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
      this.paperForm=JSON.parse(temp)
    },
    deleteInfo(index){
      let paper=JSON.stringify(this.paperDid[index])
      let that=this
      request.post('/delete_paper', paper).then(res=>{
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