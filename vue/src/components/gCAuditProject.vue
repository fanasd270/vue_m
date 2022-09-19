<template>
  <div v-if="fresh">
    <div>待审核:</div>
    <el-scrollbar height="70vh">
      <el-empty description="暂无信息" v-if="noInfo"></el-empty>
      <div v-for="(m,index) in projectToDo">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="projectToDoShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.data.project_student_name}}</span>
            <span style="font-weight: bold;">学号：{{m.data.project_student_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目名称:">{{m.data.project_name}}</el-descriptions-item>
              <el-descriptions-item label="项目所在单位:">{{m.data.project_unit}}</el-descriptions-item>
              <el-descriptions-item label="项目类型:">{{m.data.project_type}}</el-descriptions-item>
              <el-descriptions-item label="项目状态:">{{m.data.project_status}}</el-descriptions-item>
              <el-descriptions-item label="参与项目时间:">{{m.data.project_join_time}}</el-descriptions-item>
              <el-descriptions-item label="指导老师姓名:">{{m.data.project_teacher_name}}</el-descriptions-item>
              <el-descriptions-item label="指导老师学院:">{{m.data.project_teacher_dept}}</el-descriptions-item>
              <el-descriptions-item label="是否已提交证书:">{{m.data.project_issubmit}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadProject(m.data.project_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-button @click="passProject(index)">通过</el-button>
            <el-button @click="rejectReason(index)">驳回</el-button>
            <el-button @click="waitProject(index)">稍后</el-button>
            <el-button @click="changeInfo(m)">修改</el-button>
            <span style="margin-left: 5px">认定时间:</span>
            <span style="color:cornflowerblue;">{{m.data.project_year.substring(0,4)}}</span>
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
          :before-close="projectHandleClose">

        <el-form ref="form" :model="projectForm" style="margin:30px 0 0 60px; font-weight: bold">

          <el-form-item label="项目名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="projectForm.project_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目所在单位" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="projectForm.project_unit" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目类型" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="projectForm.project_type" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目状态" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="projectForm.project_status" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目参与时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="projectForm.project_join_time" clearable></el-input>
          </el-form-item>
          <el-form-item label="指导老师姓名" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="projectForm.project_teacher_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="指导老师学院" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="projectForm.project_teacher_dept" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否已提交证书电子版" style="width: 46%; margin-bottom: 40px; margin-right: 2%;">
            <el-radio-group v-model="projectForm.project_issubmit">
              <el-radio  label="是">是</el-radio>
              <el-radio  label="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="认定时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="projectForm.project_year" clearable></el-input>
<!--            <el-date-picker v-model="projectForm.project_year" type="year" placeholder="上报学院年份" value-format="YYYY"></el-date-picker>-->
          </el-form-item>

          <el-form-item style="position: absolute; left:40%">
            <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>
            <el-button @click="projectHandleClose">取消</el-button>
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
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.data.project_student_name}}</span>
            <span style="font-weight: bold;">学号：{{m.data.project_student_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目名称:">{{m.data.project_name}}</el-descriptions-item>
              <el-descriptions-item label="项目所在单位:">{{m.data.project_unit}}</el-descriptions-item>
              <el-descriptions-item label="项目类型:">{{m.data.project_type}}</el-descriptions-item>
              <el-descriptions-item label="项目状态:">{{m.data.project_status}}</el-descriptions-item>
              <el-descriptions-item label="参与项目时间:">{{m.data.project_join_time}}</el-descriptions-item>
              <el-descriptions-item label="指导老师姓名:">{{m.data.project_teacher_name}}</el-descriptions-item>
              <el-descriptions-item label="指导老师学院:">{{m.data.project_teacher_dept}}</el-descriptions-item>
              <el-descriptions-item label="是否已提交证书:">{{m.data.project_issubmit}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadProject(m.data.project_supporting_materials)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.data.project_audit_status==='1'">已通过</el-tag>
            <el-tag type="danger" v-if="m.data.project_audit_status==='2'">已驳回</el-tag>
            <span style="margin-left: 5px">认定时间:</span>
            <span style="color:cornflowerblue;">{{m.data.project_year.substring(0,4)}}</span>
            <!--                <el-button @click="passPaper(index)">通过</el-button>-->
            <el-button style="margin-left: 5px" v-if="m.data.project_audit_status==='1'" @click="rejectReason_did(index)">驳回</el-button>
            <el-button v-if="m.data.project_audit_status==='1'" @click="changeInfo(m)">修改</el-button>
            <!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
            <div v-if="m.data.project_audit_status==='2'">
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
  name: "gCAuditProject",

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

      projectForm:{},
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
      window.open(this.Fapi+"/Projects/"+m)
      // window.location.href=this.Fapi+"/Projects/"+m
    },
    changeInfo(m){
      this.dialogVisible=true
      this.projectForm=JSON.parse(JSON.stringify(m.data))
    },
    projectHandleClose(){
      this.dialogVisible=false
    },
    onSubmit(){
      request.post("/upload_project_info", this.projectForm).then(res=>{
        this.$message.success(res.msg)
        this.dialogVisible=false//关闭表单
        this.refreshComponent()
      }).catch(err=>{
        this.$message.error("请求错误")
      })
    },
    passProject(index){
      request.post('/pass_project',this.projectToDo[index].data).then(res=>{
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
      request.post('/refuse_project',this.rejectItem).then(res=>{
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
      request.post('/refuse_project',this.rejectItem).then(res=>{
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
      this.$emit('projectKey',this.toDoNum,this.numShow)
    },

    getData(){
      request.post('/find_all_project_info_new',this.user).then(res=>{
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
        this.$emit('projectKey',this.toDoNum,this.numShow)
      })

      request.post('/find_all_project_info_old',this.user).then(res=>{
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