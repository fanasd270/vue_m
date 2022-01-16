<template>
  <div style="position: relative; margin:20px 0 0 9% ">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
        我的任务
      </p>

    <div style="width: 30%" v-for="(m,i) in mess.msg">
      <transition :name="closeStyle">
      <div v-show="show[i]" class="transition-box">
        <el-card class="box-card" style="margin-top: 10px">
          <div style="min-height: 100px; cursor: default">
            {{m.mainmsg}}
          </div>
          <div style="margin-left: 40%">
            <el-button size="mini" @click="WaitMsg(i)" style="width: 27%">
              <span style="font-size: 1px;">
                稍后处理
              </span>
            </el-button>
            <el-button size="mini" @click="ReadMsg(i)" style="width: 27%">
              <span style="font-size: 1px;">
                确认收到
              </span>
            </el-button>
            <el-button size="mini" @click="DidMsg(i)" style="width: 27%">
              <span style="font-size: 1px;">
                确认完成
              </span>
            </el-button>
          </div>
        </el-card>
      </div>
      </transition>
    </div>


    <div class="block" style="width: 40%; position: absolute; right: 10%; top:30px">
      <p style="font-weight: bold;font-size: large; margin-bottom: 20px; cursor: default">以往任务记录</p>
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "stuTask",

  data(){
    return{
      show:[true,true],
      mess:{
        msg:[
          {man:"小明",
            mainmsg:"1232131",
          did:0,},
          {mam:"小红",
            mainmsg:"100000",
            did:0},
        ],
        totalLength:2,
      },
      closeStyle:"el-zoom-in-top",
    }
  },

  created() {
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
      this.sentBack(i);
    },

    readData(){
      request.post('').then(res=>{

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