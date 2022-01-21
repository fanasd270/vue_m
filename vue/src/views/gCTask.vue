<template>
  <div style="position: relative; margin:20px 0 0 9% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      发布任务
    </p>

    <div style="width: 30%">
      <transition name="el-zoom-in-center">
        <div v-show="show" class="transition-box">
          <el-card class="box-card" style="margin-top: 10px">
            <el-input
                v-model="mess.msg_content"
                :autosize="{ minRows: 4, maxRows: 10 }"
                type="textarea"
                placeholder="请输入内容"
            >
            </el-input>
            <el-date-picker
                v-model="mess.msg_ddl"
                type="datetime"
                placeholder="设置截至时间，可忽略"
                style="margin-top: 10px"
            >
            </el-date-picker>
            <br>
            <el-button size="mini" @click="chooseStu" style="margin-top: 10px">
              <span style="font-size: 1px;">
                选择接收者
              </span>
            </el-button>
            <div style="margin-left: 40%">
              <el-button size="mini" @click="cancelTask" style="width: 27%">
              <span style="font-size: 1px;">
                取消
              </span>
              </el-button>
              <el-button size="mini" @click="sendTask" style="width: 27%">
              <span style="font-size: 1px;">
                发布
              </span>
              </el-button>
            </div>
          </el-card>
        </div>
      </transition>
    </div>


    <div class="block" style="width: 40%; position: absolute; right: 10%; top:30px">
      <p style="font-weight: bold;font-size: large; margin-bottom: 20px; cursor: default">以往任务记录</p>
      <el-scrollbar height="500px">
        <el-timeline>
          <div v-for="(m,j) in oldMsg">
            <el-timeline-item :timestamp="m.msg_time" placement="top">
              <el-card>
                <h4>{{m.msg_content}}</h4>
                <p>截至时间 {{m.msg_ddl}}</p>
                  <div style="margin: 10px 0 0 80%">
                    <el-button type="primary" circle size="small">
                      <el-icon><Edit/></el-icon>
                    </el-button>
                    <el-button type="danger" circle size="small">
                      <el-icon><Delete/></el-icon>
                    </el-button>
                  </div>
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
import {Delete, Edit} from "@element-plus/icons";

export default {
  name: "gCTask",
  components:{
    Edit,
    Delete,
  },
  data(){
    return{
      show: true,
      stu: {},
      mess:{
        msg_sender:0,
        msg_content:'',
        stuList: [],
        msg_class:'',
        msg_time: '',
        msg_ddl: ''
      },
      oldMsg:[
        {
          msg_content: '111',
          msg_time: '2022/1/1 00:00',
          msg_ddl: '2022/1/2 00:00'
        },
        {
          msg_content: '221',
          msg_time: '2022/1/3 00:00',
          msg_ddl: '2022/1/4 00:00'
        },
        {
          msg_content: '221',
          msg_time: '2022/1/3 00:00',
          msg_ddl: '2022/1/4 00:00'
        },
        {
          msg_content: '221',
          msg_time: '2022/1/3 00:00',
          msg_ddl: '2022/1/4 00:00'
        },
        {
          msg_content: '221',
          msg_time: '2022/1/3 00:00',
          msg_ddl: '2022/1/4 00:00'
        },
        {
          msg_content: '221',
          msg_time: '2022/1/3 00:00',
          msg_ddl: '2022/1/4 00:00'
        },
      ],
    }
  },

  created() {
    this.stu=JSON.parse(sessionStorage.getItem('user'));

    //this.readData()
  },


  methods:{
    WaitMsg(i){
      this.closeStyle="el-zoom-in-bottom";
      this.show[i]=!this.show[i];
    },
    ReadMsg(i){
      this.closeStyle="el-zoom-in-top";
      this.show[i]=!this.show[i];
      this.mess.msg[i].did=1;
      this.sentBack(i);
    },
    DidMsg(i){
      this.closeStyle="el-zoom-in-center";
      this.show[i]=!this.show[i];
      this.mess.msg[i].did=2;
      this.mess.didMsg.push(this.mess.toDoMsg[i]);
      this.mess.didMsg.splice(i,1);
      this.sentBack(i);
    },

    readData(){
      request.post('', this.stu).then(res=>{

        ///
        ///
        for(let i=0; i<this.mess.totalLength;i++){
          this.show[i]=true;
        }
      })
    },

    sentBack(i){
      //requset
    },

  },
}
</script>

<style scoped>

</style>