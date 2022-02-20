<template>
<div style="padding: 0 6% 0 6%">
  <div style="border: dimgray solid; margin-top: 20px; height: 100%; position: relative">
    <el-badge :value="toDoNum[0]" :max="99" v-show="numShow[0]" style="position: absolute; left:2%"></el-badge>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="margin:0 1% 0 1%">

      <el-tab-pane label="论文" name="first">
        <div>待审核:</div>
        <el-scrollbar height="70vh">
          <el-empty description="暂无信息" v-if="noInfo[0]"></el-empty>
          <div v-for="(m,index) in paperToDo">
            <transition name="el-fade-in-linear">
              <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="toDoShow[index]">
                <span style="font-weight: bold; margin-right: 2%">姓名：{{paperToDo[index].paper_stuname}}</span>
                <span style="font-weight: bold;">学号：{{paperToDo[index].paper_stuno}}</span>
                <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
                  <el-descriptions-item label="论文名称:">{{paperToDo[index].paper_name}}</el-descriptions-item>
                  <el-descriptions-item label="发表期刊/会议名称:">{{paperToDo[index].paper_periodical}}</el-descriptions-item>
                  <el-descriptions-item label="出版时间:">{{paperToDo[index].paper_publicationTime}}</el-descriptions-item>
                  <el-descriptions-item label="撰写时间:">{{paperToDo[index].paper_year}}</el-descriptions-item>
                  <el-descriptions-item label="是否CSCD:">{{paperToDo[index].paper_iscscd}}</el-descriptions-item>
                  <el-descriptions-item label="SCI检索号:">{{paperToDo[index].paper_sciSearchNumber}}</el-descriptions-item>
                  <el-descriptions-item label="EI检索号:">{{paperToDo[index].paper_eiSearchNumber}}</el-descriptions-item>
                  <el-descriptions-item label="证明材料:">{{paperToDo[index].paper_supporting_materials}}</el-descriptions-item>
                </el-descriptions>
                <el-button @click="passPaper(index)">通过</el-button>
                <el-button @click="rejectPaper(index)">驳回</el-button>
                <el-button @click="waitPaper(index)">稍后</el-button>
              </el-card>
            </transition>
          </div>
        </el-scrollbar>

<!--        历史-->
        <div>历史:</div>
        <el-scrollbar height="70vh">
          <div v-for="(m,index) in paperDid">
            <transition name="el-fade-in-linear">
              <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="didShow[index]">
                <span style="font-weight: bold; margin-right: 2%">姓名：{{paperDid[index].paper_stuname}}</span>
                <span style="font-weight: bold;">学号：{{paperDid[index].paper_stuno}}</span>
                <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
                  <el-descriptions-item label="论文名称:">{{paperDid[index].paper_name}}</el-descriptions-item>
                  <el-descriptions-item label="发表期刊/会议名称:">{{paperDid[index].paper_periodical}}</el-descriptions-item>
                  <el-descriptions-item label="出版时间:">{{paperDid[index].paper_publicationTime}}</el-descriptions-item>
                  <el-descriptions-item label="撰写时间:">{{paperDid[index].paper_year}}</el-descriptions-item>
                  <el-descriptions-item label="是否CSCD:">{{paperDid[index].paper_iscscd}}</el-descriptions-item>
                  <el-descriptions-item label="SCI检索号:">{{paperDid[index].paper_sciSearchNumber}}</el-descriptions-item>
                  <el-descriptions-item label="EI检索号:">{{paperDid[index].paper_eiSearchNumber}}</el-descriptions-item>
                  <el-descriptions-item label="证明材料:">{{paperDid[index].paper_supporting_materials}}</el-descriptions-item>
                </el-descriptions>
                <el-tag type="success" v-if="paperDid[index].paper_status==='1'">已通过</el-tag>
                <el-tag type="danger" v-if="paperDid[index].paper_status==='2'">已驳回</el-tag>
<!--                <el-button @click="passPaper(index)">通过</el-button>-->
<!--                <el-button @click="rejectPaper(index)">驳回</el-button>-->
<!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
              </el-card>
            </transition>
          </div>
        </el-scrollbar>
      </el-tab-pane>

      <el-tab-pane label="专利" name="second">

      </el-tab-pane>
      <el-tab-pane label="竞赛" name="third">

      </el-tab-pane>
      <el-tab-pane label="项目" name="fourth">

      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "gCAudit",
  data(){
    return{
      activeName: 'first',
      numShow:[false, false, false, false],
      toDoShow:[true, true, true, true, true],
      didShow:[true, true, true, true, true],
      toDoNum:[0, 0, 0, 0],
      noInfo:[false,false,false,false],
      paperToDo:[],
      paperDid:[
        // {
        //   paper_no: "0",
        //   paper_stuno: 2,
        //   paper_stuname: "",
        //   paper_name: "",
        //   paper_periodical: "",
        //   paper_publicationTime: "",
        //   paper_iscscd: "",
        //   paper_sciSearchNumber: "",
        //   paper_eiSearchNumber: "",
        //   paper_year: "",
        //   paper_supporting_materials: "",
        //   paper_status:"0",
        // },
      ],
    }
  },

  created() {
    this.getData();
  },

  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    },
    passPaper(index){
      this.toDoShow[index]=false
      request.post('/pass_paper',this.paperToDo[index]).then(res=>{
        console.log(res.msg)
      })
      delete this.paperToDo[index]
      if(this.toDoNum[0]-1===0){
        this.numShow[0]=false
      } else {
        this.toDoNum[0]--
      }
      // this.audit(1)
    },
    rejectPaper(index){
      this.toDoShow[index]=false
      request.post('/refuse_paper',this.paperToDo[index]).then(res=>{
        console.log(res.msg)
      })
      delete this.paperToDo[index]
      if(this.toDoNum[0]-1===0){
        this.numShow[0]=false
      } else {
        this.toDoNum[0]--
      }
      // this.audit(2)
    },
    waitPaper(index){
      this.toDoShow[index]=false
      if(this.toDoNum[0]-1===0){
        this.numShow[0]=false
      } else {
        this.toDoNum[0]--
      }
    },

    // numCount(){
    //   this.toDoNum[0]=this.paperToDo.length
    //   console.log("length:"+this.paperToDo.length)
    //   // this.toDoNum[1]=this.paperToDo.length
    //   // this.toDoNum[2]=this.paperToDo.length
    //   // this.toDoNum[3]=this.paperToDo.length
    //   for(let i=0; i<4; i++){
    //     if(this.toDoNum[i]===0){
    //       this.numShow[i]=false
    //       this.noInfo[i]=true
    //     }
    //     else {
    //       this.numShow[i]=true
    //       this.noInfo[i]=false
    //     }
    //   }
    // },
    getData(){
      let user=JSON.parse(sessionStorage.getItem('user'))
      request.post('/find_all_paper_info_new',user).then(res=>{
        this.paperToDo=res
        for(let i=0;i<this.paperToDo.length;i++){
          this.toDoShow[i]=true
        }

        //原numcount函数内容
        this.toDoNum[0]=this.paperToDo.length
        if(this.toDoNum[0]===0){
          this.numShow[0]=false
          this.noInfo[0]=true
        }
        else {
          this.numShow[0]=true
          this.noInfo[0]=false
        }
      })
      request.post('/find_all_paper_info_old',user).then(res=>{
        this.paperDid=res
        for(let i=0;i<this.paperDid.length;i++){
          this.didShow[i]=true
        }
      })
    },

    //返回状态
    audit(sta){
      request.post('',sta).then(res=>{

      })
    },

  },
}
</script>

<style scoped>

</style>