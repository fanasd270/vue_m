<template>
  <div style="position: relative; margin:20px 0 0 9% ">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
        我的任务
      </p>

    <el-scrollbar height="600px">
      <el-empty description="暂无信息" v-if="mess.toDoMsg.length===0" style="width: 35%"></el-empty>
      <div style="width: 35%" v-for="(m,i) in mess.toDoMsg">
        <transition :name="closeStyle">
            <div v-show="show[i]" class="transition-box">
              <el-timeline-item :timestamp="m.msg_releasetime" placement="top" style="margin-top: 10px">
                <el-card class="box-card">
                  <div>{{m.teacherName}}:</div>
                  <div style="min-height: 100px;">
                    {{m.msg_content}}
                  </div>
                  <div>
                    <span style="font-size: 15px">截止 {{m.msg_deadline}}||剩余 {{m.days}}天{{m.hours}}时{{m.minutes}}分{{m.seconds}}秒</span>
                  </div>
                  <div style="margin-left: 2%">
                    <el-tag type="warning" v-if="m.status===1">已读</el-tag>
                    <el-tag type="danger" v-if="m.status===0">未读</el-tag>
                    <el-button size="mini" @click="WaitMsg(i)" style="width: 20%; margin-left: 5%">
                    <span style="font-size: 1px;">
                      稍后处理
                    </span>
                    </el-button>
                    <el-button size="mini" @click="ReadMsg(i)" style="width: 20%">
                    <span style="font-size: 1px;">
                      确认收到
                    </span>
                    </el-button>
                    <el-button size="mini" @click="DidMsg(i)" style="width: 20%">
                    <span style="font-size: 1px;">
                      确认完成
                    </span>
                    </el-button>
                  </div>
                </el-card>
              </el-timeline-item>
            </div>
        </transition>
      </div>
    </el-scrollbar>


    <div class="block" style="width: 40%; position: absolute; right: 10%; top:30px">
      <p style="font-weight: bold;font-size: large; margin-bottom: 20px; cursor: default">以往任务记录</p>
      <el-scrollbar height="500px">
        <el-empty description="暂无信息" v-if="mess.didMsg.length===0"></el-empty>
        <el-timeline>
          <div v-for="(m,j) in mess.didMsg">
            <el-timeline-item :timestamp="m.msg_releasetime" placement="top">
              <el-card>
                <div>{{m.teacherName}}:</div>
                <div>
                  {{m.msg_content}}
                </div>
                <el-tag type="success">已完成</el-tag>
                <span style="font-size: 15px">截止 {{m.msg_deadline}}</span>
              </el-card>
            </el-timeline-item>
          </div>
        </el-timeline>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "stuTask",

  data(){
    return{
      show:[],
      stu: {},
      messTemp:{
        all: null,
        done: null,
        msg_content: "",
        msg_deadline: "",
        msg_no: "",
        msg_releasetime: "",
        msg_sender: 0,
        read: null,
        status: 0,
        teacherName: "",
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        residue: 0,
      },
      mess:{
        toDoMsg:[],
        didMsg:[],
      },
      operationMess:{
        msg_no2:'',
        receiver:0,
      },
      closeStyle:"el-zoom-in-top",
    }
  },

  created() {
    this.stu=JSON.parse(sessionStorage.getItem('user'));
    this.operationMess.receiver=this.stu.stu_no-0
    this.readData()
  },


  methods:{
    WaitMsg(i){
      this.closeStyle="el-zoom-in-bottom";
      this.show[i]=!this.show[i];
    },
    ReadMsg(i){
      this.operationMess.msg_no2=this.mess.toDoMsg[i].msg_no
      request.post('/read_msg',this.operationMess).then(res=>{
        this.mess.toDoMsg[i].status=1
      }).catch(err=>{
        this.$message.error("错误")
      })
    },
    DidMsg(i){
      this.operationMess.msg_no2=this.mess.toDoMsg[i].msg_no
      request.post('/finish_msg',this.operationMess).then(res=>{
        this.closeStyle="el-zoom-in-center";
        this.show[i]=!this.show[i];
        this.mess.didMsg.push(this.mess.toDoMsg[i]);
        // this.mess.didMsg.splice(i,1);
      }).catch(err=>{
        this.$message.error("错误")
      })
    },

    readData(){
      request.post('/getstudent_msg', this.stu).then(res=>{

        // this.mess.toDoMsg=res.data
        for(let i=0,temp;i<res.data.length;i++){
          temp=JSON.parse(JSON.stringify(this.messTemp))
          temp.all=res.data[i].all
          temp.done=res.data[i].done
          temp.msg_content=res.data[i].msg_content
          temp.msg_deadline=res.data[i].msg_deadline
          temp.msg_no=res.data[i].msg_no
          temp.msg_releasetime=res.data[i].msg_releasetime
          temp.msg_sender=res.data[i].msg_sender
          temp.read=res.data[i].read
          temp.status=res.data[i].status
          temp.teacherName=res.data[i].teacherName
          if(temp.status===2){
            this.mess.didMsg.push(temp)

          } else{
            this.mess.toDoMsg.push(temp)
            this.show.push(true)
          }
        }
      })
    },



  //  计算时间
    convert(val) {
      return val < 10 ? '0' + val : val
    },
    getTime(){
      const myDate = new Date()
      //获取当前年
      const year = myDate.getFullYear()
      //获取当前月
      const month = myDate.getMonth() + 1
      //获取当前日
      const date = myDate.getDate()
      //获取当前小时数(0-23)
      const h = myDate.getHours()
      //获取当前分钟数(0-59)
      const m = myDate.getMinutes()
      const s = myDate.getSeconds()

      //获取当前时间
      const time =
          year +
          '-' +
          this.convert(month) +
          '-' +
          this.convert(date) +
          ' ' +
          this.convert(h) +
          ':' +
          this.convert(m) +
          ':' +
          this.convert(s)
      return time
    },

    getResidueDate() {
      for(let i=0;i<this.mess.toDoMsg.length;i++){
        this.mess.toDoMsg[i].residue = new Date(this.mess.toDoMsg[i].msg_deadline).getTime() - new Date();
        if(this.mess.toDoMsg[i].residue<0){
          continue
        }
        this.mess.toDoMsg[i].days = this.addZero(
            Math.floor(this.mess.toDoMsg[i].residue / 1000 / 60 / 60 / 24)
        ); //天
        this.mess.toDoMsg[i].hours = this.addZero(
            Math.floor((this.mess.toDoMsg[i].residue / 1000 / 60 / 60) % 24)
        ); //时
        this.mess.toDoMsg[i].minutes = this.addZero(
            Math.floor((this.mess.toDoMsg[i].residue / 1000 / 60) % 60)
        ); //分
        this.mess.toDoMsg[i].seconds = this.addZero(Math.floor((this.mess.toDoMsg[i].residue / 1000) % 60)); //秒
      }
    },
    start() {
      // let _this = this;
    },
    addZero(d) {
      return parseInt(d) < 10 ? "0" + d : d;
    },
  },
}
</script>

<style scoped>

</style>