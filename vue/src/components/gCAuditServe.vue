<template>
  <div v-if="fresh">
    <div>待审核:</div>
    <el-scrollbar height="70vh">
      <el-empty description="暂无信息" v-if="noInfo"></el-empty>
      <div v-for="(m,index) in serveToDo">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="serveToDoShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.data.voluntary_activities_stu_name}}</span>
            <span style="font-weight: bold;">学号：{{m.data.voluntary_activities_stu_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="志愿活动名称:">{{m.data.voluntary_activities_name}}</el-descriptions-item>
              <el-descriptions-item label="举办部门:">{{m.data.voluntary_activities_studept}}</el-descriptions-item>
              <el-descriptions-item label="活动始、末时间:">{{m.data.voluntary_activities_time_from_to}}</el-descriptions-item>
              <el-descriptions-item label="参与时长:">{{m.data.voluntary_activities_time_long}}</el-descriptions-item>
              <el-descriptions-item label="活动内容:">{{m.data.voluntary_activities_content}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadServe(m.data.voluntary_activities_url)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-button @click="passServe(index)">通过</el-button>
            <el-button @click="rejectReason(index)">驳回</el-button>
            <el-button @click="waitServe(index)">稍后</el-button>
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
        <el-button v-if="rejectType==='toDo'" type="primary" @click="rejectServe(rejectIndex)">确认</el-button>
        <el-button v-if="rejectType==='did'" type="primary" @click="rejectServeDid(rejectIndex)">确认</el-button>
      </span>
        </template>
      </el-dialog>

    </el-scrollbar>

    <!--        历史-->
    <div style="width: 100%; height: 3px; background-color: lightblue"></div>
    <div>历史:</div>
    <el-scrollbar height="70vh">
      <div v-for="(m,index) in serveDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="serveDidShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.data.voluntary_activities_stu_name}}</span>
            <span style="font-weight: bold;">学号：{{m.data.voluntary_activities_stu_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="志愿活动名称:">{{m.data.voluntary_activities_name}}</el-descriptions-item>
              <el-descriptions-item label="举办部门:">{{m.data.voluntary_activities_studept}}</el-descriptions-item>
              <el-descriptions-item label="活动始、末时间:">{{m.data.voluntary_activities_time_from_to}}</el-descriptions-item>
              <el-descriptions-item label="参与时长:">{{m.data.voluntary_activities_time_long}}</el-descriptions-item>
              <el-descriptions-item label="活动内容:">{{m.data.voluntary_activities_content}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadServe(m.data.voluntary_activities_url)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.data.voluntary_activities_status==='1'">已通过</el-tag>
            <el-tag type="danger" v-if="m.data.voluntary_activities_status==='2'">已驳回</el-tag>
            <!--                <el-button @click="passPaper(index)">通过</el-button>-->
            <el-button style="margin-left: 5px" v-if="m.data.voluntary_activities_status==='1'" @click="rejectReason_did(index)">驳回</el-button>
            <!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
            <div v-if="m.data.voluntary_activities_status==='2'">
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
  name: "gCAuditServe",
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
      serveToDoShow:[],
      serveDidShow:[],
      serveToDo:[],//待审核列表
      serveDid:[],
      fresh:true,
      Fapi:'',
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

  methods: {
    //刷新组件
    refreshComponent() {
      this.fresh = false
      this.getData()
      this.$nextTick(() => {
        this.fresh = true
      })
    },

    downloadServe(m){
      window.open(this.Fapi+"/Activities/"+m)
    },
    passServe(index) {
      request.post('/pass_activity', this.serveToDo[index].data).then(res => {
        this.serveToDoShow[index] = false
        delete this.serveToDo[index]
        if (this.toDoNum - 1 === 0) {
          this.numShow = false
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
      this.rejectItem=JSON.parse(JSON.stringify(this.serveToDo[index]))
    },
    rejectReason_did(index){
      this.rejectReasonDia=true
      this.rejectType='did'
      this.rejectIndex=index
      this.rejectItem=JSON.parse(JSON.stringify(this.serveDid[index]))
    },
    rejectServe(index) {
      request.post('/refuse_activity', this.rejectItem).then(res => {
        this.rejectReasonDia=false
        this.serveToDoShow[index] = false
        delete this.serveToDo[index]
        if (this.toDoNum - 1 === 0) {
          this.numShow = false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    rejectServeDid(index) {
      request.post('/refuse_activity', this.rejectItem).then(res => {
        this.rejectReasonDia=false
        this.refreshComponent()
      })
    },
    waitServe(index) {
      this.serveToDoShow[index] = false
      if (this.toDoNum - 1 === 0) {
        this.numShow = false
      } else {
        this.toDoNum--
      }
      this.$emit('serveKey', this.toDoNum, this.numShow)
    },

    getData() {
      request.post('/find_all_activity_new', this.user).then(res => {
        this.serveToDo = res
        for (let i = 0; i < this.serveToDo.length; i++) {
          this.serveToDoShow[i] = true
        }
        //原numcount函数内容
        this.toDoNum = this.serveToDo.length
        if (this.toDoNum === 0) {
          this.numShow = false
          this.noInfo = true
        } else {
          this.numShow = true
          this.noInfo = false
        }
        this.$emit('serveKey', this.toDoNum, this.numShow)
      })

      request.post('/find_all_activity_old', this.user).then(res => {
        this.serveDid = res
        for (let i = 0; i < this.serveDid.length; i++) {
          this.serveDidShow[i] = true
        }
      })

    },
  },
}
</script>

<style scoped>

</style>