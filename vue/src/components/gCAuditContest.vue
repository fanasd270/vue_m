<template>
  <div v-if="fresh">
    <div>待审核:</div>
    <el-scrollbar height="70vh">
      <el-empty description="暂无信息" v-if="noInfo"></el-empty>
      <div v-for="(m,index) in contestToDo">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="contestToDoShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.data.contest_stuname}}</span>
            <span style="font-weight: bold;">学号：{{m.data.contest_stuno}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="竞赛名称:">{{m.data.contest_name}}</el-descriptions-item>
              <el-descriptions-item label="项目名称:">{{m.data.contest_projectname}}</el-descriptions-item>
              <el-descriptions-item label="授予部门:">{{m.data.contest_grantingdepartment}}</el-descriptions-item>
              <el-descriptions-item label="获奖级别:">{{m.data.contest_level}}</el-descriptions-item>
              <el-descriptions-item label="获奖名次:">{{m.data.contest_ranking}}</el-descriptions-item>
              <el-descriptions-item label="获奖时间:">{{m.data.contest_date}}</el-descriptions-item>
              <el-descriptions-item label="指导老师姓名:">{{m.data.contest_teachername}}</el-descriptions-item>
              <el-descriptions-item label="指导老师学院:">{{m.data.contest_teacherdept}}</el-descriptions-item>
              <el-descriptions-item label="获奖证书上传:">{{m.data.contest_issubmitcertificate}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadContest(m.data.contest_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-button @click="passContest(index)">通过</el-button>
            <el-button @click="rejectReason(index)">驳回</el-button>
            <el-button @click="waitContest(index)">稍后</el-button>
            <el-button @click="changeInfo(m)">修改</el-button>
            <span style="margin-left: 5px" >认定时间:</span>
            <span style="color:cornflowerblue;">{{m.data.contest_year.substring(0,4)}}</span>
          </el-card>
        </transition>
      </div>
      <el-dialog
          v-model="rejectReasonDia"
          title="驳回理由"
          width="30%"
      >
        <el-input v-model="rejectItem.reason"></el-input>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="rejectReasonDia = false">取消</el-button>
        <el-button v-if="rejectType==='toDo'" type="primary" @click="rejectContest(rejectIndex)">确认</el-button>
        <el-button v-if="rejectType==='did'" type="primary" @click="rejectContestDid(rejectIndex)">确认</el-button>
      </span>
        </template>
      </el-dialog>

      <el-dialog
          title="修改"
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
            <el-input v-model="contestForm.contest_year" clearable></el-input>
<!--            <el-date-picker v-model="contestForm.contest_year" type="year" placeholder="上报学院年份" value-format="YYYY"></el-date-picker>-->
          </el-form-item>

          <el-form-item style="position: absolute; left:40%">
            <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>
            <el-button @click="contestHandleClose">取消</el-button>
          </el-form-item>
          <div style="height: 50px"></div>
        </el-form>

      </el-dialog>
    </el-scrollbar>

    <!--        历史-->
    <div style="width: 100%; height: 3px; background-color: lightblue"></div>
    <div>历史:</div>
    <el-scrollbar height="70vh">
      <div v-for="(m,index) in contestDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="contestDidShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.data.contest_stuname}}</span>
            <span style="font-weight: bold;">学号：{{m.data.contest_stuno}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="竞赛名称:">{{m.data.contest_name}}</el-descriptions-item>
              <el-descriptions-item label="项目名称:">{{m.data.contest_projectname}}</el-descriptions-item>
              <el-descriptions-item label="授予部门:">{{m.data.contest_grantingdepartment}}</el-descriptions-item>
              <el-descriptions-item label="获奖级别:">{{m.data.contest_level}}</el-descriptions-item>
              <el-descriptions-item label="获奖名次:">{{m.data.contest_ranking}}</el-descriptions-item>
              <el-descriptions-item label="获奖时间:">{{m.data.contest_date}}</el-descriptions-item>
              <el-descriptions-item label="指导老师姓名:">{{m.data.contest_teachername}}</el-descriptions-item>
              <el-descriptions-item label="指导老师学院:">{{m.data.contest_teacherdept}}</el-descriptions-item>
              <el-descriptions-item label="获奖证书上传:">{{m.data.contest_issubmitcertificate}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadContest(m.data.contest_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.data.contest_status==='1'">已通过</el-tag>
            <el-tag type="danger" v-if="m.data.contest_status==='2'">已驳回</el-tag>
            <span style="margin-left: 5px" >认定时间:</span>
            <span style="color:cornflowerblue;">{{m.data.contest_year.substring(0,4)}}</span>
            <!--                <el-button @click="passPaper(index)">通过</el-button>-->
            <el-button style="margin-left: 5px" v-if="m.data.contest_status==='1'" @click="rejectReason_did(index)">驳回</el-button>
            <el-button v-if="m.data.contest_status==='1'" @click="changeInfo(m)">修改</el-button>
            <!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
            <div v-if="m.data.contest_status==='2'">
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

export default {
  name: "gCAuditContest",

  data(){
    return{
      rejectReasonDia:false,
      rejectType:'',
      rejectIndex:0,
      rejectItem:{},
      user:{},
      power:{},
      numShow:false,//是否显示红点
      toDoNum:0,//红点数
      noInfo:false,
      contestToDoShow:[],
      contestDidShow:[],
      contestToDo:[],//待审核列表
      contestDid:[],
      fresh:true,
      Fapi:'',

      contestForm:{},
      dialogVisible:false,
    }
  },

  created() {
    this.Fapi=fileApi.fileApi
    this.power=JSON.parse(sessionStorage.getItem('power'))
    if(this.power.type===1){
      this.user=JSON.parse(sessionStorage.getItem('user_t'))
    }else{
      this.user=JSON.parse(sessionStorage.getItem('user'))
    }
    this.getData();
  },

  methods:{
    //刷新组件
    refreshComponent(){
      this.fresh=false
      this.getData()
      this.$nextTick(()=>{
        this.fresh=true
      })
    },

    downloadContest(m){
      window.open(this.Fapi+"/Contests/"+m)
    },

    changeInfo(m){
      this.dialogVisible=true
      this.contestForm=JSON.parse(JSON.stringify(m.data))
    },
    contestHandleClose(){
      this.dialogVisible=false
    },
    onSubmit(){
      request.post("/upload_contest_info", this.contestForm).then(res=>{
        this.$message.success(res.msg)
        this.dialogVisible=false//关闭表单
        this.refreshComponent()
      }).catch(err=>{
        this.$message.error("请求错误")
      })
    },

    passContest(index){
      request.post('/pass_contest',this.contestToDo[index].data).then(res=>{
        this.contestToDoShow[index]=false
        delete this.contestToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    rejectReason(index){
      this.rejectReasonDia=true
      this.rejectType='toDo'
      this.rejectIndex=index
      this.rejectItem=JSON.parse(JSON.stringify(this.contestToDo[index]))
    },
    rejectReason_did(index){
      this.rejectReasonDia=true
      this.rejectType='did'
      this.rejectIndex=index
      this.rejectItem=JSON.parse(JSON.stringify(this.contestDid[index]))
    },
    rejectContest(index){
      request.post('/refuse_contest',this.rejectItem).then(res=>{
        this.rejectReasonDia=false
        this.contestToDoShow[index]=false
        delete this.contestToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    rejectContestDid(index){
      request.post('/refuse_contest',this.rejectItem).then(res=>{
        this.rejectReasonDia=false
        this.refreshComponent()
      })
    },
    waitContest(index){
      this.contestToDoShow[index]=false
      if(this.toDoNum-1===0){
        this.numShow=false
      } else {
        this.toDoNum--
      }
      this.$emit('contestKey',this.toDoNum,this.numShow)
    },

    getData(){
      request.post('/find_all_contest_info_new',this.user).then(res=>{
        this.contestToDo=res
        for(let i=0;i<this.contestToDo.length;i++){
          this.contestToDoShow[i]=true
        }
        //原numcount函数内容
        this.toDoNum=this.contestToDo.length
        if(this.toDoNum===0){
          this.numShow=false
          this.noInfo=true
        }
        else {
          this.numShow=true
          this.noInfo=false
        }
        this.$emit('contestKey',this.toDoNum,this.numShow)
      })

      request.post('/find_all_contest_info_old',this.user).then(res=>{
        this.contestDid=res
        for(let i=0;i<this.contestDid.length;i++){
          this.contestDidShow[i]=true
        }
      })
    },
  },
}
</script>

<style scoped>

</style>