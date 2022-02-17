<template>
  <div style="padding-left: 6%; padding-right: 6%;">
    <div style="margin-top: 30px">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline">
        获奖信息维护
      </p>
    </div>
    <div style="border: dimgray solid; margin-top: 20px; height: 100%; position: relative">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin:0 1% 0 1%">
      <el-tab-pane label="论文" name="first">

          <el-form ref="form" :model="paperForm" style="margin:30px 0 0 60px; font-weight: bold">

            <el-form-item label="论文名称" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
              <el-input v-model="paperForm.paper_name" clearable></el-input>
            </el-form-item>
            <el-form-item label="发表期刊/会议名称" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
              <el-input v-model="paperForm.paper_periodical" clearable></el-input>
            </el-form-item>
            <el-form-item label="出版时间" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
              <el-input v-model="paperForm.paper_publicationTime" clearable></el-input>
            </el-form-item>
            <el-form-item label="撰写时间" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
              <el-input v-model="paperForm.paper_year" clearable></el-input>
            </el-form-item>
            <el-form-item label="是否CSCD" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
              <el-radio-group v-model="paperForm.paper_iscscd">
                <el-radio  :label=1>是</el-radio>
                <el-radio  :label=0>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="SCI检索号" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
              <el-input v-model="paperForm.paper_sciSearchNumber" clearable></el-input>
            </el-form-item>
            <el-form-item label="EI检索号" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
              <el-input v-model="paperForm.paper_eiSearchNumber" clearable></el-input>
            </el-form-item>


            <el-form-item label="成果证明材料" style="margin-bottom: 70px;">


              <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="http://10.236.11.68:8080/upload_paper_info2"
                  :http-request="paperUpload"
                  drag
                  :on-error="fileUploadError"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :limit="1"
                  :auto-upload="false">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  拖拽或 <em>点击上传</em>
                </div>
<!--                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
<!--                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
              </el-upload>
            </el-form-item>

            <el-form-item style="position: absolute; left:45%">
              <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
          <div style="height: 100px"></div>
      </el-tab-pane>
      <el-tab-pane label="专利" name="second">

      </el-tab-pane>
      <el-tab-pane label="竞赛" name="third">

      </el-tab-pane>
      <el-tab-pane label="项目" name="fourth">

      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script>
import uploadFilled from "@element-plus/icons/lib/UploadFilled";
import request from "@/utils/request";

export default {
  name: "stuAward",
  components:{
    uploadFilled,
  },
  data(){
    return{
      paperForm:{
        paper_no: 0,
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
      activeName: 'first'
    }
  },
  methods:{
    submitUpload() {
      this.$refs.upload.submit();
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePreview(file) {
    //   console.log(file);
    // },
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    fileUploadError(){
      this.$message.error('文件上传失败')
    },
    onSubmit(){
      this.submitUpload()
    },
    paperUpload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/upload_paper_info2', formData).then(res=>{
        this.paperForm.paper_supporting_materials=res.data

        let user=JSON.parse(sessionStorage.getItem('user'))
        that.paperForm.paper_stuno=user.stu_no
        that.paperForm.paper_stuname=user.stu_name
        request.post("/upload_paper_info", that.paperForm).then(res=>{
          this.$message.success(res.msg)
        })
      })
    },
  },
}
</script>

<style scoped>

</style>