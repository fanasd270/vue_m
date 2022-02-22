<template>
<div style="padding: 0 6% 0 6%">
  <div style="border: dimgray solid; margin-top: 20px; height: 100%; position: relative">
    <el-badge :value="toDoNum[0]" :max="99" v-show="numShow[0]" style="position: absolute; left:2%"></el-badge>
    <el-badge :value="toDoNum[1]" :max="99" v-show="numShow[1]" style="position: absolute; left:7%"></el-badge>
    <el-badge :value="toDoNum[2]" :max="99" v-show="numShow[2]" style="position: absolute; left:12%"></el-badge>
    <el-badge :value="toDoNum[3]" :max="99" v-show="numShow[3]" style="position: absolute; left:17%"></el-badge>
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
                  <el-descriptions-item label="认定时间:">{{paperToDo[index].paper_year}}</el-descriptions-item>
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
        <div style="width: 100%; height: 3px; background-color: lightblue"></div>
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
                  <el-descriptions-item label="认定时间:">{{paperDid[index].paper_year}}</el-descriptions-item>
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
        <div>待审核:</div>
        <el-scrollbar height="70vh">
          <el-empty description="暂无信息" v-if="noInfo[1]"></el-empty>
          <div v-for="(m,index) in patentToDo">
            <transition name="el-fade-in-linear">
              <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="patentToDoShow[index]">
                <span style="font-weight: bold; margin-right: 2%">姓名：{{m.patent_stu_name}}</span>
                <span style="font-weight: bold;">学号：{{m.patent_stu_no}}</span>
                <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
                  <el-descriptions-item label="专利名称:">{{m.patent_name}}</el-descriptions-item>
                  <el-descriptions-item label="专利类型:">{{m.patent_type}}</el-descriptions-item>
                  <el-descriptions-item label="专利申请号:">{{m.patent_application_no}}</el-descriptions-item>
                  <el-descriptions-item label="专利申请日:">{{m.patent_application_time}}</el-descriptions-item>
                  <el-descriptions-item label="专利证书号:">{{m.patent_certificate_no}}</el-descriptions-item>
                  <el-descriptions-item label="专利获权时间:">{{m.patent_authorization_time}}</el-descriptions-item>
                  <el-descriptions-item label="认定时间:">{{m.patent_year}}</el-descriptions-item>
                  <el-descriptions-item label="是否第一发明人:">{{m.patent_isfirstone}}</el-descriptions-item>
                  <el-descriptions-item label="证明材料:">{{m.patent_supporting_materials}}</el-descriptions-item>
                  <!--                  <el-descriptions-item label="获奖证书:"><a href="http://localhost:8080/background.png"></a></el-descriptions-item>-->
                  <!--                  csdn收藏夹尝试不同源下载图片-->
                </el-descriptions>
                <el-button @click="passPatent(index)">通过</el-button>
                <el-button @click="rejectPatent(index)">驳回</el-button>
                <el-button @click="waitPatent(index)">稍后</el-button>
              </el-card>
            </transition>
          </div>
        </el-scrollbar>

        <!--        历史-->
        <div style="width: 100%; height: 3px; background-color: lightblue"></div>
        <div>历史:</div>
        <el-scrollbar height="70vh">
          <div v-for="(m,index) in patentDid">
            <transition name="el-fade-in-linear">
              <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="patentDidShow[index]">
                <span style="font-weight: bold; margin-right: 2%">姓名：{{m.patent_stu_name}}</span>
                <span style="font-weight: bold;">学号：{{m.patent_stu_no}}</span>
                <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
                  <el-descriptions-item label="专利名称:">{{m.patent_name}}</el-descriptions-item>
                  <el-descriptions-item label="专利类型:">{{m.patent_type}}</el-descriptions-item>
                  <el-descriptions-item label="专利申请号:">{{m.patent_application_no}}</el-descriptions-item>
                  <el-descriptions-item label="专利申请日:">{{m.patent_application_time}}</el-descriptions-item>
                  <el-descriptions-item label="专利证书号:">{{m.patent_certificate_no}}</el-descriptions-item>
                  <el-descriptions-item label="专利获权时间:">{{m.patent_authorization_time}}</el-descriptions-item>
                  <el-descriptions-item label="认定时间:">{{m.patent_year}}</el-descriptions-item>
                  <el-descriptions-item label="是否第一发明人:">{{m.patent_isfirstone}}</el-descriptions-item>
                  <el-descriptions-item label="证明材料:">{{m.patent_supporting_materials}}</el-descriptions-item>
                  <!--                  <el-descriptions-item label="获奖证书:"><a href="http://localhost:8080/background.png"></a></el-descriptions-item>-->
                  <!--                  csdn收藏夹尝试不同源下载图片-->
                </el-descriptions>
                <el-tag type="success" v-if="m.patent_status==='1'">已通过</el-tag>
                <el-tag type="danger" v-if="m.patent_status==='2'">已驳回</el-tag>
                <!--                <el-button @click="passPaper(index)">通过</el-button>-->
                <!--                <el-button @click="rejectPaper(index)">驳回</el-button>-->
                <!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
              </el-card>
            </transition>
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane label="竞赛" name="third">
        <div>待审核:</div>
        <el-scrollbar height="70vh">
          <el-empty description="暂无信息" v-if="noInfo[2]"></el-empty>
          <div v-for="(m,index) in contestToDo">
            <transition name="el-fade-in-linear">
              <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="contestToDoShow[index]">
                <span style="font-weight: bold; margin-right: 2%">姓名：{{m.contest_stuname}}</span>
                <span style="font-weight: bold;">学号：{{m.contest_stuno}}</span>
                <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
                  <el-descriptions-item label="竞赛名称:">{{m.contest_name}}</el-descriptions-item>
                  <el-descriptions-item label="项目名称:">{{m.contest_projectname}}</el-descriptions-item>
                  <el-descriptions-item label="授予部门:">{{m.contest_grantingdepartment}}</el-descriptions-item>
                  <el-descriptions-item label="获奖级别:">{{m.contest_level}}</el-descriptions-item>
                  <el-descriptions-item label="获奖名次:">{{m.contest_ranking}}</el-descriptions-item>
                  <el-descriptions-item label="获奖时间:">{{m.contest_date}}</el-descriptions-item>
                  <el-descriptions-item label="指导老师姓名:">{{m.contest_teachername}}</el-descriptions-item>
                  <el-descriptions-item label="指导老师学院:">{{m.contest_teacherdept}}</el-descriptions-item>
                  <el-descriptions-item label="获奖证书上传:">{{m.contest_issubmitcertificate}}</el-descriptions-item>
                  <el-descriptions-item label="证明材料:">{{m.contest_supporting_materials}}</el-descriptions-item>
<!--                  <el-descriptions-item label="获奖证书:"><a href="http://localhost:8080/background.png"></a></el-descriptions-item>-->
                  <!--                  csdn收藏夹尝试不同源下载图片-->
                </el-descriptions>
                <el-button @click="passContest(index)">通过</el-button>
                <el-button @click="rejectContest(index)">驳回</el-button>
                <el-button @click="waitContest(index)">稍后</el-button>
              </el-card>
            </transition>
          </div>
        </el-scrollbar>

        <!--        历史-->
        <div style="width: 100%; height: 3px; background-color: lightblue"></div>
        <div>历史:</div>
        <el-scrollbar height="70vh">
          <div v-for="(m,index) in contestDid">
            <transition name="el-fade-in-linear">
              <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="contestDidShow[index]">
                <span style="font-weight: bold; margin-right: 2%">姓名：{{m.contest_stuname}}</span>
                <span style="font-weight: bold;">学号：{{m.contest_stuno}}</span>
                <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
                  <el-descriptions-item label="竞赛名称:">{{m.contest_name}}</el-descriptions-item>
                  <el-descriptions-item label="项目名称:">{{m.contest_projectname}}</el-descriptions-item>
                  <el-descriptions-item label="授予部门:">{{m.contest_grantingdepartment}}</el-descriptions-item>
                  <el-descriptions-item label="获奖级别:">{{m.contest_level}}</el-descriptions-item>
                  <el-descriptions-item label="获奖名次:">{{m.contest_ranking}}</el-descriptions-item>
                  <el-descriptions-item label="获奖时间:">{{m.contest_date}}</el-descriptions-item>
                  <el-descriptions-item label="指导老师姓名:">{{m.contest_teachername}}</el-descriptions-item>
                  <el-descriptions-item label="指导老师学院:">{{m.contest_teacherdept}}</el-descriptions-item>
                  <el-descriptions-item label="获奖证书上传:">{{m.contest_issubmitcertificate}}</el-descriptions-item>
                  <el-descriptions-item label="证明材料:">{{m.paper_supporting_materials}}</el-descriptions-item>
                  <!--                  <el-descriptions-item label="获奖证书:"><a href="http://localhost:8080/background.png"></a></el-descriptions-item>-->
                  <!--                  csdn收藏夹尝试不同源下载图片-->
                </el-descriptions>
                <el-tag type="success" v-if="m.contest_status==='1'">已通过</el-tag>
                <el-tag type="danger" v-if="m.contest_status==='2'">已驳回</el-tag>
                <!--                <el-button @click="passPaper(index)">通过</el-button>-->
                <!--                <el-button @click="rejectPaper(index)">驳回</el-button>-->
                <!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
              </el-card>
            </transition>
          </div>
        </el-scrollbar>
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
  inject:['reload'],
  data(){
    return{
      activeName: 'first',
      numShow:[false, false, false, false],//统计数字是否显示
      toDoNum:[0, 0, 0, 0],//四类统计数字
      noInfo:[false,false,false,false],//暂无信息
      toDoShow:[true, true, true, true, true],//论文待审核显示
      patentToDoShow:[],
      contestToDoShow:[],
      didShow:[true, true, true, true, true],//论文已审核显示
      patentDidShow:[],
      contestDidShow:[],

      paperToDo:[],//论文待审核列表
      patentToDo:[],
      contestToDo:[],

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
      ],//已审核
      patentDid:[],
      contestDid:[],
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
      request.post('/pass_paper',this.paperToDo[index]).then(res=>{
        // console.log(res.msg)
        this.toDoShow[index]=false
        delete this.paperToDo[index]
        if(this.toDoNum[0]-1===0){
          this.numShow[0]=false
        } else {
          this.toDoNum[0]--
        }
        this.reload()
      })
    },
    passContest(index){
      request.post('/pass_contest',this.contestToDo[index]).then(res=>{
        // console.log(res.msg)
        this.contestToDoShow[index]=false
        delete this.contestToDo[index]
        if(this.toDoNum[2]-1===0){
          this.numShow[2]=false
        } else {
          this.toDoNum[2]--
        }
        this.reload()
      })
    },

    rejectPaper(index){
      request.post('/refuse_paper',this.paperToDo[index]).then(res=>{
        // console.log(res.msg)
        this.toDoShow[index]=false
        delete this.paperToDo[index]
        if(this.toDoNum[0]-1===0){
          this.numShow[0]=false
        } else {
          this.toDoNum[0]--
        }
        this.reload()
      })
    },
    rejectContest(index){
      request.post('/refuse_contest',this.contestToDo[index]).then(res=>{
        // console.log(res.msg)
        this.contestToDoShow[index]=false
        delete this.contestToDo[index]
        if(this.toDoNum[2]-1===0){
          this.numShow[2]=false
        } else {
          this.toDoNum[2]--
        }
        this.reload()
      })
    },

    waitPaper(index){
      this.toDoShow[index]=false
      if(this.toDoNum[0]-1===0){
        this.numShow[0]=false
      } else {
        this.toDoNum[0]--
      }
    },
    waitContest(index){
      this.contestToDoShow[index]=false
      if(this.toDoNum[2]-1===0){
        this.numShow[2]=false
      } else {
        this.toDoNum[2]--
      }
    },

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
      request.post('/find_all_contest_info_new',user).then(res=>{
        this.contestToDo=res
        for(let i=0;i<this.contestToDo.length;i++){
          this.contestToDoShow[i]=true
        }
        //原numcount函数内容
        this.toDoNum[2]=this.contestToDo.length
        if(this.toDoNum[2]===0){
          this.numShow[2]=false
          this.noInfo[2]=true
        }
        else {
          this.numShow[2]=true
          this.noInfo[2]=false
        }
      })

      request.post('/find_all_paper_info_old',user).then(res=>{
        this.paperDid=res
        for(let i=0;i<this.paperDid.length;i++){
          this.didShow[i]=true
        }
      })
      request.post('/find_all_contest_info_old',user).then(res=>{
        console.log("竞赛记录:"+res)
        this.contestDid=res
        for(let i=0;i<this.contestDid.length;i++){
          this.contestDidShow[i]=true
        }
      })
    },

  },
}
</script>

<style scoped>

</style>