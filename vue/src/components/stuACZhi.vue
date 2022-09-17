<template>
  <div class="mainContent">
    <div>
      <span>智育成绩：</span>
      <br>
      <span>Z=z1*65%+z2+z3={{zAll.toFixed(3)}}</span>
    </div>
    <div>
      <span>z1.学业成绩加权平均分：({{z1.toFixed(2)}})</span>

    </div>
    <div class="secondContent">
      <div class="thirdContent">
        <span>z2.科研创新与竞赛类加分项得分：({{z2.toFixed(2)}})</span>
        <el-scrollbar max-height="400px">
          <el-card v-for="(m, index) in allLists.paper">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="论文名称:">{{m.data.paper_name}}</el-descriptions-item>
              <el-descriptions-item label="认定时间:">{{m.data.paper_year.substring(0,4)}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadPaper(m.data.paper_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.status===1">已加分:{{m.score}}</el-tag>
            <el-tag type="warning" v-if="m.status===0">未加分</el-tag>
            <el-tag type="info" v-if="m.status===2">往年已加分:{{m.score}}</el-tag>

            <el-popover
                placement="top"
                :width="200"
                trigger="click"
                :visible="popover_paper[index]"
            >
              <el-input-number v-model="m.score" :precision="1" :step="0.1" :max="10" :min="0"/>
              <el-button class="btn2" @click="updateScore(m,index,'paper')">确认</el-button>
              <el-button class="btn2" @click="m.score=0;popover_paper[index]=false">取消</el-button>
              <template #reference>
                <el-button class="btn1" v-if="m.status===0&&$store.state.code===1" @click="popover_paper[index]=true">加分</el-button>
              </template>
            </el-popover>
            <el-button class="btn1" v-if="m.status===1&&$store.state.code===1" @click="clearScorePaper(m)">取消</el-button>
          </el-card>

          <el-card v-for="(m, index) in allLists.patent">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="专利名称:">{{m.data.patent_name}}</el-descriptions-item>
              <el-descriptions-item label="认定时间:">{{m.data.patent_year.substring(0,4)}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadPatent(m.data.patent_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.status===1">已加分:{{m.score}}</el-tag>
            <el-tag type="warning" v-if="m.status===0">未加分</el-tag>
            <el-tag type="info" v-if="m.status===2">往年已加分:{{m.score}}</el-tag>

            <el-popover
                placement="top"
                :width="200"
                trigger="click"
                :visible="popover_patent[index]"
            >
              <el-input-number v-model="m.score" :precision="1" :step="0.1" :max="10" :min="0"/>
              <el-button class="btn2" @click="updateScore(m,index,'patent')">确认</el-button>
              <el-button class="btn2" @click="m.score=0;popover_patent[index]=false">取消</el-button>
              <template #reference>
                <el-button class="btn1" v-if="m.status===0&&$store.state.code===1" @click="popover_patent[index]=true">加分</el-button>
              </template>
            </el-popover>
            <el-button class="btn1" v-if="m.status===1&&$store.state.code===1" @click="clearScorePatent(m)">取消</el-button>
          </el-card>

          <el-card v-for="(m, index) in allLists.project">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目名称:">{{m.data.project_name}}</el-descriptions-item>
              <el-descriptions-item label="认定时间:">{{m.data.project_year.substring(0,4)}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadProject(m.data.project_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.status===1">已加分:{{m.score}}</el-tag>
            <el-tag type="warning" v-if="m.status===0">未加分</el-tag>
            <el-tag type="info" v-if="m.status===2">往年已加分:{{m.score}}</el-tag>

            <el-popover
                placement="top"
                :width="200"
                trigger="click"
                :visible="popover_project[index]"
            >
              <el-input-number v-model="m.score" :precision="1" :step="0.1" :max="10" :min="0"/>
              <el-button  class="btn2" @click="updateScore(m,index,'project')">确认</el-button>
              <el-button class="btn2" @click="m.score=0;popover_project[index]=false">取消</el-button>
              <template #reference>
                <el-button class="btn1" v-if="m.status===0&&$store.state.code===1" @click="popover_project[index]=true">加分</el-button>
              </template>
            </el-popover>
            <el-button class="btn1" v-if="m.status===1&&$store.state.code===1" @click="clearScoreProject(m)">取消</el-button>
          </el-card>

          <el-card v-for="(m, index) in allLists.contest">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="竞赛名称:">{{m.data.contest_name}}</el-descriptions-item>
              <el-descriptions-item label="认定时间:">{{m.data.contest_year.substring(0,4)}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadContest(m.data.contest_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.status===1">已加分:{{m.score}}</el-tag>
            <el-tag type="warning" v-if="m.status===0">未加分</el-tag>
            <el-tag type="info" v-if="m.status===2">往年已加分:{{m.score}}</el-tag>

            <el-popover
                placement="top"
                :width="200"
                trigger="click"
                :visible="popover_contest[index]"
            >
              <el-input-number v-model="m.score" :precision="1" :step="0.1" :max="10" :min="0"/>
              <el-button class="btn2" @click="updateScore(m,index,'contest')">确认</el-button>
              <el-button class="btn2" @click="m.score=0;popover_contest[index]=false">取消</el-button>
              <template #reference>
                <el-button class="btn1" v-if="m.status===0&&$store.state.code===1" @click="popover_contest[index]=true">加分</el-button>
              </template>
            </el-popover>
            <el-button class="btn1" v-if="m.status===1&&$store.state.code===1" @click="clearScoreContest(m)">取消</el-button>
          </el-card>
        </el-scrollbar>
      </div>
      <div class="thirdContent" style="margin-top: 30px">
        <span>z3.专业水平类加分项得分：({{z3.toFixed(2)}})</span>
        <br>
        <el-button :disabled="zCeStatus.status!=='1'" v-if="$store.state.code===0" @click="this.dialogVisible=true">新建</el-button>
        <el-scrollbar max-height="400px">
          <el-card v-for="(m, index) in otherList">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目名称:">{{m.data.other_name}}</el-descriptions-item>
              <el-descriptions-item label="认定时间:">{{m.data.other_time.substring(0,4)}}</el-descriptions-item>
              <el-descriptions-item label="备注信息:">{{m.data.other_info}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadOther(m.data.other_proof)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.status===1">已加分:{{m.score}}</el-tag>
            <el-tag type="warning" v-if="m.status===0">未加分</el-tag>
            <el-tag type="info" v-if="m.status===2">往年已加分:{{m.score}}</el-tag>

            <el-popover
                placement="top"
                :width="200"
                trigger="click"
                :visible="popover_other[index]"
            >
              <el-input-number v-model="m.score" :precision="1" :step="0.1" :max="10" :min="0"/>
              <el-button  class="btn2" @click="updateScore(m,index,'other')">确认</el-button>
              <el-button class="btn2" @click="m.score=0;popover_other[index]=false">取消</el-button>
              <template #reference>
                <el-button class="btn1" v-if="m.status===0&&$store.state.code===1" @click="popover_other[index]=true">加分</el-button>
              </template>
            </el-popover>
            <el-button class="btn1" v-if="m.status===1&&$store.state.code===1" @click="clearScoreOther(m)">取消</el-button>
            <el-button class="btn1" :disabled="zCeStatus.status!=='1'" v-if="$store.state.code===0" @click="deleteOther(m)">删除</el-button>
          </el-card>
        </el-scrollbar>

        <el-dialog
            title="新建"
            v-model="dialogVisible"
            width="50%"
            :before-close="paperHandleClose">

          <el-form ref="form" :model="otherThing" style="margin:30px 0 0 60px; font-weight: bold">

            <el-form-item label="加分项目" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-input v-model="otherThing.other_name" placeholder="四六级证书/托福雅思等专业技能资格证书" clearable></el-input>
            </el-form-item>
            <el-form-item label="认定时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-date-picker v-model="otherThing.other_time" type="year" placeholder="上报学院年份" value-format="YYYY"></el-date-picker>
            </el-form-item>
            <el-form-item label="备注信息" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-input v-model="otherThing.other_info" placeholder="其他信息在此补充(可选)" clearable></el-input>
            </el-form-item>
            <el-form-item label="证明材料" style="margin-bottom: 70px;">

              <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="http://10.236.11.68:8080/"
                  :http-request="paperUpload"
                  drag
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
              <el-button @click="paperHandleClose">取消</el-button>
            </el-form-item>
            <div style="height: 50px"></div>
          </el-form>
        </el-dialog>
      </div>
    </div>

  </div>
</template>

<script>
import fileApi from "@/components/Store";
import request from "@/utils/request";
export default {
  name: "stuACZhi",
  data(){
    return{
      Fapi:fileApi.fileApi,
      user:{},
      z1:0,
      z2:0,
      z3:0,
      zAll:0,
      otherThing:{
        id:0,
        other_stu_no:'',
        other_name:'',
        other_info:'', //备注信息
        other_time:'',
        other_proof:'', //证明材料
        other_type:'Z3', //大写字母
      },
      dialogVisible:false,
      popover_paper:[],
      popover_patent:[],
      popover_project:[],
      popover_contest:[],
      popover_other:[],
      allLists:{
        paper:[],
        patent:[],
        project:[],
        contest:[],
      },
      otherList:[],
      zCeStatus:{
        grade:'',
        status:'',
        change_time:'',
      },
    }
  },
  watch:{
    "$store.state.info":{
      handler:function (newVal, oldVal){
        this.user=newVal
        this.getData()
      }
    },
  },
  created() {
    // this.user=JSON.parse(sessionStorage.getItem('user'))
    this.user=this.$store.state.info
    this.getData()
  },
  methods:{
    getData(){
      request.post('/getZongceStatus',this.user).then(res=>{
        this.zCeStatus=res.data
      })
      request.post('/getZ2',this.user).then(res=>{
        this.allLists=res
        this.countZ2()
        this.popover_paper=new Array(res.paper.length).fill(false)
        this.popover_patent=new Array(res.patent.length).fill(false)
        this.popover_project=new Array(res.project.length).fill(false)
        this.popover_contest=new Array(res.contest.length).fill(false)
      })
      request.post('/getZ3',this.user).then(res=>{
        this.otherList=res
        this.countZ3()
        this.popover_other=new Array(this.otherList.length).fill(false)
      })
    },

    countZ2(){
      this.z2=0
      console.log(this.z2)
      for(let item of this.allLists.paper){
        console.log(item)
        this.z2+=item.score
      }
      for(let item of this.allLists.patent){
        this.z2+=item.score
      }
      for(let item of this.allLists.project){
        this.z2+=item.score
      }
      for(let item of this.allLists.contest){
        this.z2+=item.score
      }
      this.zAll=this.z1*0.65+this.z2+this.z3
    },
    countZ3(){
      this.z3=0
      console.log('count')
      console.log(this.z3)
      for(let item of this.otherList){
        console.log(item)
        this.z3+=item.score
      }
      this.zAll=this.z1*0.65+this.z2+this.z3
    },
    uploadAll(){
      let item={
        id:0,
        stu_no:this.user.stu_no,
        stu_name:'',
        stu_class:'',
        zongce_type:'Z',
        zongce_score:this.zAll,
      }
      request.post('/updateZongce2', item).then(res=>{

      })
    },
    deleteOther(m){
      request.post('/deleteOther',m.data).then(res=>{
        this.getData()
      })
    },
    setScorePaper(m){
      this.countZ2()
      request.post('/scorePaper',m).then(res=>{
        console.log(res)
        this.uploadAll()
      })
    },
    setScorePatent(m){
      this.countZ2()
      request.post('/scorePatent',m).then(res=>{
        console.log(res)
        this.uploadAll()
      })
    },
    setScoreContest(m){
      this.countZ2()
      request.post('/scoreContest',m).then(res=>{
        console.log(res)
        this.uploadAll()
      })
    },
    setScoreProject(m){
      this.countZ2()
      request.post('/scoreProject',m).then(res=>{
        console.log(res)
        this.uploadAll()
      })
    },
    setScoreOther(m){
      this.countZ3()
      request.post('/scoreOther',m).then(res=>{
        console.log(res)
        this.uploadAll()
      })
    },
    clearScorePaper(m){
      m.score=0
      m.status=0
      this.setScorePaper(m)
    },
    clearScorePatent(m){
      m.score=0
      m.status=0
      this.setScorePatent(m)
    },
    clearScoreProject(m){
      m.score=0
      m.status=0
      this.setScoreProject(m)
    },
    clearScoreContest(m){
      m.score=0
      m.status=0
      this.setScoreContest(m)
    },
    clearScoreOther(m){
      m.score=0
      m.status=0
      this.setScoreOther(m)
    },
    updateScore(m,index,type){
      console.log(m)
      if (m.score<0.1){
        m.status=0
      }else{
        m.status=1
      }
      switch (type) {
        case 'paper':this.popover_paper[index]=false
            this.setScorePaper(m)
              break
        case 'patent':this.popover_patent[index]=false
            this.setScorePatent(m)
              break
        case 'project':this.popover_project[index]=false
            this.setScoreProject(m)
              break
        case 'contest':this.popover_contest[index]=false
            this.setScoreContest(m)
              break
        case 'other':this.popover_other[index]=false
              this.setScoreOther(m)
              break
      }
    },
    uploadCover(files, fileList){
      this.$refs.upload.clearFiles()
      this.$refs.upload.handleStart(files[0])
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    fileUploadError(){
      this.$message.error('文件上传失败')
    },
    onSubmit(){
      if(this.otherThing.other_name===''){
        this.$message.warning('名称不能为空')
        return
      }
      if(this.otherThing.other_time===''||this.otherThing.other_time===null){
        this.$message.warning('认定时间不能为空')
        return
      }
      if(this.$refs.upload.uploadFiles.length===0){
        this.$message.warning('请选择证明材料')
        return
      }
      this.submitUpload()
    },
    paperHandleClose(){
      this.otherThing.other_proof=''
      this.otherThing.other_name=''
      this.otherThing.other_time=''
      this.otherThing.other_info=''
      this.dialogVisible=false
    },
    paperUpload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/addOther2', formData).then(res=>{
        if(res.code===0){
          this.$message.error("文件类型错误")
          return
        }
        this.otherThing.other_proof=res.data
        this.otherThing.other_stu_no=this.user.stu_no+''//
        this.otherThing.other_type='Z3'
        request.post("/addOther", this.otherThing).then(res=>{
          that.$message.success(res.msg)
          this.paperHandleClose()//关闭表单
          this.getData()
        }).catch(err=>{
          that.$message.error("请求错误")
        })
      })
    },
    downloadPaper(m){
      window.open(this.Fapi+"/Papers/"+m)
    },
    downloadPatent(m){
      window.open(this.Fapi+"/Patents/"+m)
    },
    downloadProject(m){
      window.open(this.Fapi+"/Projects/"+m)
    },
    downloadContest(m){
      window.open(this.Fapi+"/Contests/"+m)
    },
    downloadOther(m){
      window.open(this.Fapi+"/Others/"+m)
    }
  },
}
</script>

<style scoped>
.mainContent{
  margin-top: 5px;
  height: 100%;
}
.secondContent{
  height: calc(100vh - 80px - 5em);
}
.thirdContent{
  height: calc(50% - 20px);
  border-bottom: solid 1px #57d3ef;
  margin-top: 20px;
}
.btn1{
  margin-left: 5px;
}
.btn2{
  margin-top: 5px;
}
</style>