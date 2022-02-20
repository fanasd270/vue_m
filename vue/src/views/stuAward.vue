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
    <el-tabs v-model="activeName" style="margin:0 1% 0 1%">
      <el-tab-pane label="论文" name="first">

        <el-dialog
            title="新建"
            v-model="dialogVisible[0]"
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
            <el-form-item label="撰写时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
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
                  action="http://10.236.11.68:8080/upload_paper_info2"
                  :http-request="paperUpload"
                  drag
                  :on-error="fileUploadError"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :file-list="fileList"
                  :limit="1"
                  :auto-upload="false">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  拖拽或 <em>点击上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    仅上传jpg/png/pdf
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
        <el-button type="text" @click="dialogVisible[0] = true" :disabled=newButtons[0]>点击新建</el-button>
        <el-empty description="暂无信息" v-if="didHistory[0]"></el-empty>
        <el-scrollbar height="70vh">
          <div v-for="(m,index) in paperDid">
            <transition name="el-fade-in-linear">
              <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="toDoShow[index]">
                <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
                  <el-descriptions-item label="论文名称:">{{paperDid[index].paper_name}}</el-descriptions-item>
                  <el-descriptions-item label="发表期刊/会议名称:">{{paperDid[index].paper_periodical}}</el-descriptions-item>
                  <el-descriptions-item label="出版时间:">{{paperDid[index].paper_publicationTime}}</el-descriptions-item>
                  <el-descriptions-item label="撰写时间:">{{paperDid[index].paper_year}}</el-descriptions-item>
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
      </el-tab-pane>
      <el-tab-pane label="专利" name="second">

<!--        <el-dialog-->
<!--            title="新建"-->
<!--            v-model="dialogVisible[0]"-->
<!--            width="50%"-->
<!--            :before-close="paperHandleClose">-->

<!--          <el-form ref="form" :model="paperForm" style="margin:30px 0 0 60px; font-weight: bold">-->

<!--            <el-form-item label="论文名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">-->
<!--              <el-input v-model="paperForm.paper_name" clearable></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="发表期刊/会议名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">-->
<!--              <el-input v-model="paperForm.paper_periodical" clearable></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="出版时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">-->
<!--              <el-input v-model="paperForm.paper_publicationTime" clearable></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="撰写时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">-->
<!--              <el-input v-model="paperForm.paper_year" clearable></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="是否CSCD" style="width: 46%; margin-bottom: 40px; margin-right: 2%;">-->
<!--              <el-radio-group v-model="paperForm.paper_iscscd">-->
<!--                <el-radio  label="是">是</el-radio>-->
<!--                <el-radio  label="否">否</el-radio>-->
<!--              </el-radio-group>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="SCI检索号" style="margin-bottom: 40px; margin-right: 2%; width: 46%">-->
<!--              <el-input v-model="paperForm.paper_sciSearchNumber" clearable></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="EI检索号" style="margin-bottom: 40px; margin-right: 2%; width: 46%">-->
<!--              <el-input v-model="paperForm.paper_eiSearchNumber" clearable></el-input>-->
<!--            </el-form-item>-->


<!--            <el-form-item label="成果证明材料" style="margin-bottom: 70px;">-->

<!--              <el-upload-->
<!--                  class="upload-demo"-->
<!--                  ref="upload"-->
<!--                  action="http://10.236.11.68:8080/upload_paper_info2"-->
<!--                  :http-request="paperUpload"-->
<!--                  drag-->
<!--                  :on-error="fileUploadError"-->
<!--                  :file-list="fileList"-->
<!--                  :limit="1"-->
<!--                  :auto-upload="false">-->
<!--                <el-icon class="el-icon&#45;&#45;upload"><upload-filled /></el-icon>-->
<!--                <div class="el-upload__text">-->
<!--                  拖拽或 <em>点击上传</em>-->
<!--                </div>-->
<!--                <template #tip>-->
<!--                  <div class="el-upload__tip">-->
<!--                    仅上传jpg/png/pdf-->
<!--                  </div>-->
<!--                </template>-->
<!--              </el-upload>-->
<!--            </el-form-item>-->

<!--            <el-form-item style="position: absolute; left:40%">-->
<!--              <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>-->
<!--              <el-button @click="paperHandleClose">取消</el-button>-->
<!--            </el-form-item>-->
<!--            <div style="height: 50px"></div>-->
<!--          </el-form>-->

<!--        </el-dialog>-->

<!--        <div>申请记录:</div>-->
<!--        <el-button type="text" @click="dialogVisible[0] = true">点击新建</el-button>-->
<!--        <el-empty description="暂无信息" v-if="didHistory[0]"></el-empty>-->
<!--        <el-scrollbar height="70vh">-->
<!--          <div v-for="(m,index) in paperDid">-->
<!--            <transition name="el-fade-in-linear">-->
<!--              <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="toDoShow[index]">-->
<!--                <el-descriptions style="padding: 10px 5px 0 5px" :column=4>-->
<!--                  <el-descriptions-item label="论文名称:">{{paperDid[index].paper_name}}</el-descriptions-item>-->
<!--                  <el-descriptions-item label="发表期刊/会议名称:">{{paperDid[index].paper_periodical}}</el-descriptions-item>-->
<!--                  <el-descriptions-item label="出版时间:">{{paperDid[index].paper_publicationTime}}</el-descriptions-item>-->
<!--                  <el-descriptions-item label="撰写时间:">{{paperDid[index].paper_year}}</el-descriptions-item>-->
<!--                  <el-descriptions-item label="是否CSCD:">{{paperDid[index].paper_iscscd}}</el-descriptions-item>-->
<!--                  <el-descriptions-item label="SCI检索号:">{{paperDid[index].paper_sciSearchNumber}}</el-descriptions-item>-->
<!--                  <el-descriptions-item label="EI检索号:">{{paperDid[index].paper_eiSearchNumber}}</el-descriptions-item>-->
<!--                  <el-descriptions-item label="证明材料:">{{paperDid[index].paper_supporting_materials}}</el-descriptions-item>-->
<!--                </el-descriptions>-->
<!--                <el-tag type="success" v-if="paperDid[index].paper_status==='1'">已通过</el-tag>-->
<!--                <el-tag type="warning" v-if="paperDid[index].paper_status==='0'">待审核</el-tag>-->
<!--                <el-tag type="danger" v-if="paperDid[index].paper_status==='2'">已驳回</el-tag>-->
<!--                <el-button @click="changeInfo(index)" style="margin-left: 5%" v-if="paperDid[index].paper_status==='0'">修改</el-button>-->
<!--                <el-button @click="deleteInfo(index)" style="margin-left: 1%" v-if="paperDid[index].paper_status==='0'">删除</el-button>-->
<!--              </el-card>-->
<!--            </transition>-->
<!--          </div>-->
<!--        </el-scrollbar>-->
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
      activeName: 'first',
      paperDid:[
        {
          paper_no: "",
          paper_stuno: 0,
          paper_stuname: "1",
          paper_name: "1",
          paper_periodical: "1",
          paper_publicationTime: "",
          paper_iscscd: "否",
          paper_sciSearchNumber: "11",
          paper_eiSearchNumber: "11",
          paper_year: "",
          paper_supporting_materials: "zzz",
          paper_status:"0",
        },
        {
          paper_no: "",
          paper_stuno: 0,
          paper_stuname: "122",
          paper_name: "122",
          paper_periodical: "1222",
          paper_publicationTime: "",
          paper_iscscd: "是",
          paper_sciSearchNumber: "11",
          paper_eiSearchNumber: "11",
          paper_year: "",
          paper_supporting_materials: "zzz",
          paper_status:"2",
        },
      ],
      tagType:['success','warning','danger'],
      toDoShow:[],//每条历史记录的v-if
      newButtons:[],//新建按钮是否可用
      dialogVisible:[false,false,false,false],//四类表单的显示
      didHistory:[false,false,false,false],//四类空状态是否显示
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
    paperHandleClose(){
      this.paperForm.paper_name=''
      this.paperForm.paper_periodical=''
      this.paperForm.paper_publicationTime=''
      this.paperForm.paper_year=''
      this.paperForm.paper_iscscd=''
      this.paperForm.paper_sciSearchNumber=''
      this.paperForm.paper_eiSearchNumber=''
      this.paperForm.paper_supporting_materials=''
      this.dialogVisible[0]=false
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
          this.dialogVisible[0]=false//关闭表单
        })
      })
    },
    getData(){
      let user=JSON.parse(sessionStorage.getItem('user'))
      this.paperForm.paper_stuno=user.stu_no
      user.stu_no=user.stu_no-0
      this.paperForm.paper_stuname=user.stu_name
      request.post('/find_my_paper_info',user).then(res=>{
        console.log(res)
        this.paperDid=res
        if(this.paperDid.length===0){
          this.didHistory[0]=true
        }
        else{
          this.didHistory[0]=false
          for(let i=0;i<this.paperDid.length;i++){
            this.toDoShow[i]=true
          }
        }
      })

      // 判断是否有正在审核的信息
      request.post('/paper_isexamineing',user).then(res=>{
        console.log("审核："+res)
        if(res.data===1){
          this.newButtons[0]=true
        }
        else{
          this.newButtons[0]=false
        }
      })
    },
    changeInfo(index){
      this.dialogVisible[0]=true
      let temp=JSON.stringify(this.paperDid[index])
      this.paperForm=JSON.parse(temp)
    },
    deleteInfo(index){
      let paper=JSON.stringify(this.paperDid[index])
      request.post('/delete_paper', paper).then(res=>{
        console.log(res)
      })
    },
  },
}
</script>

<style scoped>

</style>