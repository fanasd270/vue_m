<template>
  <div v-if="fresh">
    <div>待审核:</div>
    <el-scrollbar height="70vh">
      <el-empty description="暂无信息" v-if="noInfo"></el-empty>
      <div v-for="(m,index) in projectToDo">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="projectToDoShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.project_student_name}}</span>
            <span style="font-weight: bold;">学号：{{m.project_student_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目名称:">{{m.project_name}}</el-descriptions-item>
              <el-descriptions-item label="项目所在单位:">{{m.project_unit}}</el-descriptions-item>
              <el-descriptions-item label="项目类型:">{{m.project_type}}</el-descriptions-item>
              <el-descriptions-item label="项目状态:">{{m.project_status}}</el-descriptions-item>
              <el-descriptions-item label="参与项目时间:">{{m.project_join_time}}</el-descriptions-item>
              <el-descriptions-item label="认定时间:">{{m.project_year}}</el-descriptions-item>
              <el-descriptions-item label="指导老师姓名:">{{m.project_teacher_name}}</el-descriptions-item>
              <el-descriptions-item label="指导老师学院:">{{m.project_teacher_dept}}</el-descriptions-item>
              <el-descriptions-item label="是否已提交证书:">{{m.project_issubmit}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:">{{m.project_supporting_materials}}</el-descriptions-item>
              <!--                  <el-descriptions-item label="获奖证书:"><a href="http://localhost:8080/background.png"></a></el-descriptions-item>-->
              <!--                  csdn收藏夹尝试不同源下载图片-->
            </el-descriptions>
            <el-button @click="passProject(index)">通过</el-button>
            <el-button @click="rejectProject(index)">驳回</el-button>
            <el-button @click="waitProject(index)">稍后</el-button>
          </el-card>
        </transition>
      </div>
    </el-scrollbar>

    <!--        历史-->
    <div style="width: 100%; height: 3px; background-color: lightblue"></div>
    <div>历史:</div>
    <el-scrollbar height="70vh">
      <div v-for="(m,index) in projectDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="projectDidShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.project_student_name}}</span>
            <span style="font-weight: bold;">学号：{{m.project_student_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目名称:">{{m.project_name}}</el-descriptions-item>
              <el-descriptions-item label="项目所在单位:">{{m.project_unit}}</el-descriptions-item>
              <el-descriptions-item label="项目类型:">{{m.project_type}}</el-descriptions-item>
              <el-descriptions-item label="项目状态:">{{m.project_status}}</el-descriptions-item>
              <el-descriptions-item label="参与项目时间:">{{m.project_join_time}}</el-descriptions-item>
              <el-descriptions-item label="认定时间:">{{m.project_year}}</el-descriptions-item>
              <el-descriptions-item label="指导老师姓名:">{{m.project_teacher_name}}</el-descriptions-item>
              <el-descriptions-item label="指导老师学院:">{{m.project_teacher_dept}}</el-descriptions-item>
              <el-descriptions-item label="是否已提交证书:">{{m.project_issubmit}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:">{{m.project_supporting_materials}}</el-descriptions-item>
              <!--                  <el-descriptions-item label="获奖证书:"><a href="http://localhost:8080/background.png"></a></el-descriptions-item>-->
              <!--                  csdn收藏夹尝试不同源下载图片-->
            </el-descriptions>
            <el-tag type="success" v-if="m.project_audit_status==='1'">已通过</el-tag>
            <el-tag type="danger" v-if="m.project_audit_status==='2'">已驳回</el-tag>
            <!--                <el-button @click="passPaper(index)">通过</el-button>-->
            <!--                <el-button @click="rejectPaper(index)">驳回</el-button>-->
            <!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
          </el-card>
        </transition>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "gCAuditProject",

  data(){
    return{
      numShow:false,//是否显示红点
      toDoNum:0,//红点数
      noInfo:false,
      projectToDoShow:[],
      projectDidShow:[],
      projectToDo:[],//待审核列表
      projectDid:[],
      fresh:true,
    }
  },
  created() {
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

    passProject(index){
      request.post('/pass_project',this.projectToDo[index]).then(res=>{
        // console.log(res.msg)
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
    rejectProject(index){
      request.post('/refuse_project',this.projectToDo[index]).then(res=>{
        // console.log(res.msg)
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
      let user=JSON.parse(sessionStorage.getItem('user'))

      request.post('/find_all_project_info_new',user).then(res=>{
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

      request.post('/find_all_project_info_old',user).then(res=>{
        console.log("project记录:"+res)
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