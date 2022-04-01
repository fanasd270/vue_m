<template>
  <div v-if="fresh">
    <div>待审核:</div>
    <el-scrollbar height="70vh">
      <el-empty description="暂无信息" v-if="noInfo"></el-empty>
      <div v-for="(m,index) in projectToDo">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="projectToDoShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.stay_school_info_stuname}}</span>
            <span style="font-weight: bold; margin-right: 2%">学号：{{m.stay_school_info_stu_no}}</span>
            <span style="font-weight: bold;">班级：{{m.stay_school_info_stuclass}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="留校理由:">{{m.stay_school_info_reason}}</el-descriptions-item>
              <el-descriptions-item label="留校时间:">{{m.stay_school_info_time}}</el-descriptions-item>
              <el-descriptions-item label="开始时间:">{{m.stay_school_info_begin}}</el-descriptions-item>
              <el-descriptions-item label="结束时间:">{{m.stay_school_info_end}}</el-descriptions-item>
            </el-descriptions>
            <el-button @click="passProject(index)">通过</el-button>
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
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.stay_school_info_stuname}}</span>
            <span style="font-weight: bold; margin-right: 2%">学号：{{m.stay_school_info_stu_no}}</span>
            <span style="font-weight: bold;">班级：{{m.stay_school_info_stuclass}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="留校理由:">{{m.stay_school_info_reason}}</el-descriptions-item>
              <el-descriptions-item label="留校时间:">{{m.stay_school_info_time}}</el-descriptions-item>
              <el-descriptions-item label="开始时间:">{{m.stay_school_info_begin}}</el-descriptions-item>
              <el-descriptions-item label="结束时间:">{{m.stay_school_info_end}}</el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.stay_school_info_status==='1'">已通过</el-tag>
            <el-tag type="warning" v-if="m.stay_school_info_status!=='1'">未审核</el-tag>
          </el-card>
        </transition>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "gCAuditApplication",

  data(){
    return{
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
    }
  },
  created() {
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

    passProject(index){
      request.post('/passStaySchool',this.projectToDo[index]).then(res=>{
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
      this.$emit('applicationKey',this.toDoNum,this.numShow)
    },

    getData(){
      let usertemp={teacherNo:''}
      usertemp.teacherNo=this.user.t_no+''
      request.post('/find_all_stay_school_new',usertemp).then(res=>{
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
        this.$emit('applicationKey',this.toDoNum,this.numShow)
      })

      request.post('/find_all_stay_school_old2',usertemp).then(res=>{
        console.log("application记录:"+res)
        console.log(res)
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