<template>
<div style="padding: 0 6% 0 6%">
  <div style="border: dimgray solid; margin-top: 20px; height: 100%">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="论文" name="first">

        <div v-for="(m,index) in toDo">
          <el-card class="box-card" style="margin: 10px 5px 0 5px">
            <span style="font-weight: bold; margin-right: 2%">姓名：{{toDo[index].paper_stuname}}</span>
            <span style="font-weight: bold;">学号：{{toDo[index].paper_stuno}}</span>
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="论文名称:">{{toDo[index].paper_name}}</el-descriptions-item>
              <el-descriptions-item label="发表期刊/会议名称:">{{toDo[index].paper_periodical}}</el-descriptions-item>
              <el-descriptions-item label="出版时间:">{{toDo[index].paper_publicationTime}}</el-descriptions-item>
              <el-descriptions-item label="撰写时间:">{{toDo[index].paper_year}}</el-descriptions-item>
              <el-descriptions-item label="是否CSCD:">{{toDo[index].paper_iscscd}}</el-descriptions-item>
              <el-descriptions-item label="SCI检索号:">{{toDo[index].paper_sciSearchNumber}}</el-descriptions-item>
              <el-descriptions-item label="EI检索号:">{{toDo[index].paper_eiSearchNumber}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:">{{toDo[index].paper_supporting_materials}}</el-descriptions-item>
            </el-descriptions>
            <el-button>通过</el-button>
            <el-button>驳回</el-button>
            <el-button>稍后</el-button>
          </el-card>
        </div>



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
export default {
  name: "gCAudit",
  data(){
    return{
      activeName: 'first',
      name:'qwe',
      stu:2020,
      toDo:[
        {
          paper_no: 0,
          paper_stuno: 0,
          paper_stuname: "11",
          paper_name: "22",
          paper_periodical: "33",
          paper_publicationTime: "11",
          paper_iscscd: "11",
          paper_sciSearchNumber: "11",
          paper_eiSearchNumber: "11",
          paper_year: "11",
          paper_supporting_materials: "11",
          paper_status:"0",
        },
        {
          paper_no: 0,
          paper_stuno: 2,
          paper_stuname: "",
          paper_name: "",
          paper_periodical: "",
          paper_publicationTime: "",
          paper_iscscd: "",
          paper_sciSearchNumber: "",
          paper_eiSearchNumber: "",
          paper_year: "",
          paper_supporting_materials: "",
          paper_status:"0",
        },
      ],
      did:[

      ],
    }
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
}
</script>

<style scoped>

</style>