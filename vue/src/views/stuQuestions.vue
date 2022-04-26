<template>
  <div style="position: relative; margin:20px 0 0 9% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      题库列表
    </p>
    <br>
<!--    <div style="position: relative">-->
<!--      <el-input @mouseenter="mouseOn=true" @mouseleave="mouseOn=false" v-model="searchInfo.queryString" @input="searchCourse" style="width: 20%" placeholder="输入班组号或课程名查找"></el-input>-->
<!--      <el-card @mouseenter="mouseOn=true" @mouseleave="mouseOn=false" v-if="searchData.length!==0&&mouseOn" style="min-width: 50%; position: absolute; z-index: 99;top: 2em; opacity: 0.8">-->
<!--        <div class="item" v-for="(item,index) in searchData" style="height: 2em">-->
<!--          <span>班组号：</span>-->
<!--          <span style="color: #008c8c; margin-right: 5px">{{item.classNo}}</span>-->
<!--          <span>课程名称：</span>-->
<!--          <span style="color: #008c8c; margin-right: 5px">{{item.courseName}}</span>-->
<!--          <span>人数:</span>-->
<!--          <span style="color: #008c8c">{{item.count}}</span>-->
<!--          <el-tag class="add" @click="addCourse(item)">点击添加</el-tag>-->
<!--        </div>-->
<!--      </el-card>-->
<!--    </div>-->
    <el-col v-for="(item,index) in questionList" :span="16" style="width: 300px; margin: 20px 20px 20px 0; position: relative; z-index: 1">
<!--      <el-dropdown style="position:absolute; right: 15px; top: 5px">-->
<!--        <el-icon class="el-icon&#45;&#45;right">-->
<!--          <span style="font-size: large; font-weight: bold">...</span>-->
<!--          <arrow-down />-->
<!--        </el-icon>-->
<!--        <template #dropdown>-->
<!--          <el-dropdown-menu>-->
<!--            <el-dropdown-item @click="changeCourseName(item)">修改课程备注</el-dropdown-item>-->
<!--            <el-dropdown-item @click="deleteCourse(item)">删除绑定</el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </template>-->
<!--      </el-dropdown>-->
      <el-card :body-style="{padding:'28px'}" :style="cardStyle[index]">
        <div class="ecard">
          <div style="height: 50px; line-height: 50px">
            <div style="font-weight: bold; font-size: large;text-align: center">{{item.question_bank_name}}</div>
          </div>
          <el-button @click="jumpToExam(item)" type="primary" size="small">模拟考试</el-button>
          <el-button @click="jumpToTest(item)" type="primary" size="small" style="margin-left: 70px">自主刷题</el-button>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "stuQuestions",
  data(){
    return{
      questionList:[],
      cardStyle:[],
      bgColor:[
        '#EB8E55',
        '#90FF40',
        '#F2F243',
        '#5EAFE9',
        '#52F5DC',
        '#EB5591',
        '#7272E6',
        '#BDE672',
      ],
    }
  },
  created() {
    this.initialPage()
  },
  methods:{
    initialPage(){
      request.post('findQuestionBankList').then(res=>{
        this.questionList=res.data
        this.cardStyle=[]
        let color=0,lastColor=0//flag使相邻两天配色不同，并保证lastcolor与color不同，来保证同一天相邻课程颜色不同，但因为dom元素渲染顺序不定，所以不太有用
        let tempStyle={color: 'dimgray', cursor: 'default', height: 140+'px',backgroundColor: '#008c8c'}
        for(let index in this.questionList){
          while (color===lastColor){
            color=Math.floor(Math.random()*8)
          }
          tempStyle.backgroundColor=this.bgColor[color]
          this.cardStyle.push(JSON.parse(JSON.stringify(tempStyle)))
          lastColor=color
        }
        console.log(res)
      })
    },
    jumpToTest(item){
      this.$router.push({name:'stuTest', params:{question_bank_name:item.question_bank_name, question_bank_no:item.question_bank_no}})
    },
    jumpToExam(item){
      this.$router.push({name:'stuExam', params:{question_bank_name:item.question_bank_name, question_bank_no:item.question_bank_no}})
    },
  }
}
</script>

<style scoped>

</style>