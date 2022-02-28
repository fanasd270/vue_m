<template>
  <div v-if="fresh">
    <div>待审核:</div>
    <el-scrollbar height="70vh">
      <el-empty description="暂无信息" v-if="noInfo"></el-empty>
      <div v-for="(m,index) in serveToDo">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="serveToDoShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.voluntary_activities_stu_name}}</span>
            <span style="font-weight: bold;">学号：{{m.voluntary_activities_stu_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="志愿活动名称:">{{m.voluntary_activities_name}}</el-descriptions-item>
              <el-descriptions-item label="举办部门:">{{m.voluntary_activities_studept}}</el-descriptions-item>
              <el-descriptions-item label="活动始、末时间:">{{m.voluntary_activities_time_from_to}}</el-descriptions-item>
              <el-descriptions-item label="参与时长:">{{m.voluntary_activities_time_long}}</el-descriptions-item>
              <el-descriptions-item label="活动内容:">{{m.voluntary_activities_content}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:">{{m.voluntary_activities_url}}</el-descriptions-item>
              <!--                  <el-descriptions-item label="获奖证书:"><a href="http://localhost:8080/background.png"></a></el-descriptions-item>-->
              <!--                  csdn收藏夹尝试不同源下载图片-->
            </el-descriptions>
            <el-button @click="passServe(index)">通过</el-button>
            <el-button @click="rejectServe(index)">驳回</el-button>
            <el-button @click="waitServe(index)">稍后</el-button>
          </el-card>
        </transition>
      </div>
    </el-scrollbar>

    <!--        历史-->
    <div style="width: 100%; height: 3px; background-color: lightblue"></div>
    <div>历史:</div>
    <el-scrollbar height="70vh">
      <div v-for="(m,index) in serveDid">
        <transition name="el-fade-in-linear">
          <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="serveDidShow[index]">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{m.voluntary_activities_stu_name}}</span>
            <span style="font-weight: bold;">学号：{{m.voluntary_activities_stu_no}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="志愿活动名称:">{{m.voluntary_activities_name}}</el-descriptions-item>
              <el-descriptions-item label="举办部门:">{{m.voluntary_activities_studept}}</el-descriptions-item>
              <el-descriptions-item label="活动始、末时间:">{{m.voluntary_activities_time_from_to}}</el-descriptions-item>
              <el-descriptions-item label="参与时长:">{{m.voluntary_activities_time_long}}</el-descriptions-item>
              <el-descriptions-item label="活动内容:">{{m.voluntary_activities_content}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:">{{m.voluntary_activities_url}}</el-descriptions-item>
              <!--                  <el-descriptions-item label="获奖证书:"><a href="http://localhost:8080/background.png"></a></el-descriptions-item>-->
              <!--                  csdn收藏夹尝试不同源下载图片-->
            </el-descriptions>
            <el-tag type="success" v-if="m.voluntary_activities_status==='1'">已通过</el-tag>
            <el-tag type="danger" v-if="m.voluntary_activities_status==='2'">已驳回</el-tag>
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
  name: "gCAuditServe",
  data(){
    return{
      numShow:false,//是否显示红点
      toDoNum:0,//红点数
      noInfo:false,
      serveToDoShow:[],
      serveDidShow:[],
      serveToDo:[],//待审核列表
      serveDid:[],
      fresh:true,
    }
  },
  created() {
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

    passServe(index) {
      request.post('/pass_activity', this.serveToDo[index]).then(res => {
        // console.log(res.msg)
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
    rejectServe(index) {
      request.post('/refuse_activity', this.serveToDo[index]).then(res => {
        // console.log(res.msg)
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
      let user = JSON.parse(sessionStorage.getItem('user'))

      request.post('/find_all_activity_new', user).then(res => {
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

      request.post('/find_all_activity_old', user).then(res => {
        console.log("serve记录:" + res)
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