<template>
  <div v-if="fresh">
    <div>待审核:</div>
    <el-scrollbar height="70vh">
      <el-empty description="暂无信息" v-if="noInfo"></el-empty>
      <div v-for="(m,index) in projectToDo">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="projectToDoShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.data.scholarship_info_stu_name}}</span>
            <span style="font-weight: bold;">学号：{{m.data.scholarship_info_stu_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="奖学金名称:">{{m.data.scholarship_info_name}}</el-descriptions-item>
              <el-descriptions-item label="颁发单位:">{{m.data.scholarship_info_unit}}</el-descriptions-item>
              <el-descriptions-item label="获奖时间:">{{m.data.scholarship_info_time}}</el-descriptions-item>
              <el-descriptions-item label="排名:">{{m.data.scholarship_info_rank}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadProject(m.data.scholarship_info_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-button @click="passProject(index)">通过</el-button>
            <el-button @click="rejectReason(index)">驳回</el-button>
            <el-button @click="waitProject(index)">稍后</el-button>
            <el-button @click="changeInfo(m)">修改</el-button>
            <span style="margin-left: 5px">认定时间:</span>
            <span style="color:cornflowerblue;">{{m.data.scholarship_info_year}}</span>
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
        <el-button v-if="rejectType==='toDo'" type="primary" @click="rejectProject(rejectIndex)">确认</el-button>
        <el-button v-if="rejectType==='did'" type="primary" @click="rejectProjectDid(rejectIndex)">确认</el-button>
      </span>
        </template>
      </el-dialog>

      <el-dialog
          title="修改"
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
            <el-input v-model="awardForm.scholarship_info_year" clearable></el-input>
<!--            <el-date-picker v-model="awardForm.scholarship_info_year" type="year" placeholder="上报学院年份" value-format="YYYY"></el-date-picker>-->
          </el-form-item>

          <el-form-item style="position: absolute; left:40%">
            <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>
            <el-button @click="paperHandleClose">取消</el-button>
          </el-form-item>
          <div style="height: 50px"></div>
        </el-form>

      </el-dialog>

    </el-scrollbar>

    <!--        历史-->
    <div style="width: 100%; height: 3px; background-color: lightblue"></div>
    <div>历史:</div>
    <el-scrollbar height="70vh">
      <div v-for="(m,index) in projectDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="projectDidShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.data.scholarship_info_stu_name}}</span>
            <span style="font-weight: bold;">学号：{{m.data.scholarship_info_stu_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="奖学金名称:">{{m.data.scholarship_info_name}}</el-descriptions-item>
              <el-descriptions-item label="颁发单位:">{{m.data.scholarship_info_unit}}</el-descriptions-item>
              <el-descriptions-item label="获奖时间:">{{m.data.scholarship_info_time}}</el-descriptions-item>
              <el-descriptions-item label="排名:">{{m.data.scholarship_info_rank}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadProject(m.data.scholarship_info_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.data.scholarship_info_status==='1'">已通过</el-tag>
            <el-tag type="warning" v-if="m.data.scholarship_info_status==='0'">待审核</el-tag>
            <el-tag type="danger" v-if="m.data.scholarship_info_status==='2'">已驳回</el-tag>
            <span style="margin-left: 5px">认定时间:</span>
            <span style="color:cornflowerblue;">{{m.data.scholarship_info_year}}</span>
            <el-button style="margin-left: 5px" v-if="m.data.scholarship_info_status==='1'" @click="rejectReason_did(index)">驳回</el-button>
            <el-button v-if="m.data.scholarship_info_status==='1'" @click="changeInfo(m)">修改</el-button>
            <div v-if="m.data.scholarship_info_status==='2'">
              驳回理由:{{m.reason}}
            </div>
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
  name: "gCAuditScholarship",
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
      projectToDoShow:[],
      projectDidShow:[],
      projectToDo:[],//待审核列表
      projectDid:[],
      fresh:true,
      Fapi:'',

      awardForm:{},
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

    downloadProject(m){
      window.open(this.Fapi+"/ScholarshipInfo/"+m)
    },
    changeInfo(m){
      this.dialogVisible=true
      this.awardForm=JSON.parse(JSON.stringify(m.data))
    },
    paperHandleClose(){
      this.dialogVisible=false
    },
    onSubmit(){
      request.post("/upload_scholarship", this.awardForm).then(res=>{
        this.$message.success(res.msg)
        this.dialogVisible=false//关闭表单
        this.refreshComponent()
      }).catch(err=>{
        this.$message.error("请求错误")
      })
    },
    passProject(index){
      request.post('/pass_scholarship',this.projectToDo[index].data).then(res=>{
        this.projectToDoShow[index]=false
        delete this.projectToDo[index]
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
      this.rejectItem=JSON.parse(JSON.stringify(this.projectToDo[index]))
    },
    rejectReason_did(index){
      this.rejectReasonDia=true
      this.rejectType='did'
      this.rejectIndex=index
      this.rejectItem=JSON.parse(JSON.stringify(this.projectDid[index]))
    },
    rejectProject(index){
      request.post('/refuse_scholarship',this.rejectItem).then(res=>{
        this.rejectReasonDia=false
        this.projectToDoShow[index]=false
        delete this.projectToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    rejectProjectDid(index){
      request.post('/refuse_scholarship',this.rejectItem).then(res=>{
        this.rejectReasonDia=false
        this.refreshComponent()
      })
    },
    waitProject(index){
      this.projectToDoShow[index]=false
      if(this.toDoNum-1===0){
        this.numShow=false
      } else {
        this.toDoNum--
      }
      this.$emit('scholarshipKey',this.toDoNum,this.numShow)
    },

    getData(){
      request.post('/find_all_scholarship_new',this.user).then(res=>{
        this.projectToDo=res
        for(let i=0;i<this.projectToDo.length;i++){
          this.projectToDoShow[i]=true
        }
        //原numcount函数内容
        this.toDoNum=this.projectToDo.length
        if(this.toDoNum===0){
          this.numShow=false
          this.noInfo=true
        }
        else {
          this.numShow=true
          this.noInfo=false
        }
        this.$emit('scholarshipKey',this.toDoNum,this.numShow)
      })

      request.post('/find_all_scholarship_old',this.user).then(res=>{
        this.projectDid=res
        for(let i=0;i<this.projectDid.length;i++){
          this.projectDidShow[i]=true
        }
      })
    },
  },
}
</script>

<style scoped>

</style>