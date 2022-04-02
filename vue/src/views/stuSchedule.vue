<template>
  <div style="position: relative; margin:20px 0 0 9% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      课程表
    </p>
    <br>

    <div style="margin-left: 3%">
      <el-button type="text" @click="refreshWeek"><el-icon><refresh /></el-icon></el-button>
      <el-button type="primary" style="vertical-align: top" @click="changeWeek(0)"><el-icon><ArrowLeft /></el-icon>上一周</el-button>
      <el-tag size="large">第{{askForm.week}}周</el-tag>
      <el-button type="primary" style="vertical-align: top" @click="changeWeek(1)">下一周<el-icon><ArrowRight /></el-icon></el-button>
    </div>
    <div style="margin-top: 10px">
      <div style="width: 5%;height: 90vh;display: inline-block; vertical-align: top">
        <div style="height: 7%"></div>
        <div style="height: 7%">1</div>
        <div style="height: 7%">2</div>
        <div style="height: 7%">3</div>
        <div style="height: 7%">4</div>
        <div style="height: 7%">5</div>
        <div style="height: 7%">6</div>
        <div style="height: 7%">7</div>
        <div style="height: 7%">8</div>
        <div style="height: 7%">9</div>
        <div style="height: 7%">10</div>
        <div style="height: 7%">11</div>
        <div style="height: 7%">12</div>
        <div style="height: 7%">13</div>
      </div>
      <div style="width: 95%; height: 90vh; display: inline-block; vertical-align: top">
        <div style="width: 14%; height: 95%; display: inline-block; position:relative">
          周一
          <div v-for="(item,key) in scheduleStyle['星期一']" :style="item" @click="showCourse(schedule['星期一'][key][0])">
          <span style="display: table-cell; vertical-align: middle;">
            {{schedule['星期一'][key][0].room}}
            <br>
            <span style="font-size: small">{{schedule['星期一'][key][0].coursename}}</span>
          </span>
          </div>
        </div>
        <div style="width: 14%; height: 95%; display: inline-block; position:relative">
          周二
          <div v-for="(item,key) in scheduleStyle['星期二']" :style="item" @click="showCourse(schedule['星期二'][key][0])">
          <span style="display: table-cell; vertical-align: middle;">
            {{schedule['星期二'][key][0].room}}
            <br>
            <span style="font-size: small">{{schedule['星期二'][key][0].coursename}}</span>
          </span>
          </div>
        </div>
        <div style="width: 14%; height: 95%; display: inline-block; position:relative">
          周三
          <div v-for="(item,key) in scheduleStyle['星期三']" :style="item" @click="showCourse(schedule['星期三'][key][0])">
          <span style="display: table-cell; vertical-align: middle;">
            {{schedule['星期三'][key][0].room}}
            <br>
            <span style="font-size: small">{{schedule['星期三'][key][0].coursename}}</span>
          </span>
          </div>
        </div>
        <div style="width: 14%; height: 95%; display: inline-block; position:relative">
          周四
          <div v-for="(item,key) in scheduleStyle['星期四']" :style="item" @click="showCourse(schedule['星期四'][key][0])">
          <span style="display: table-cell; vertical-align: middle;">
            {{schedule['星期四'][key][0].room}}
            <br>
            <span style="font-size: small">{{schedule['星期四'][key][0].coursename}}</span>
          </span>
          </div>
        </div>
        <div style="width: 14%; height: 95%; display: inline-block; position:relative">
          周五
          <div v-for="(item,key) in scheduleStyle['星期五']" :style="item" @click="showCourse(schedule['星期五'][key][0])">
          <span style="display: table-cell; vertical-align: middle;">
            {{schedule['星期五'][key][0].room}}
            <br>
            <span style="font-size: small">{{schedule['星期五'][key][0].coursename}}</span>
          </span>
          </div>
        </div>
        <div style="width: 14%; height: 95%; display: inline-block; position:relative">
          周六
          <div v-for="(item,key) in scheduleStyle['星期六']" :style="item" @click="showCourse(schedule['星期六'][key][0])">
          <span style="display: table-cell; vertical-align: middle;">
            {{schedule['星期六'][key][0].room}}
            <br>
            <span style="font-size: small">{{schedule['星期六'][key][0].coursename}}</span>
          </span>
          </div>
        </div>
        <div style="width: 14%; height: 95%; display: inline-block; position:relative">
          周日
          <div v-for="(item,key) in scheduleStyle['星期日']" :style="item" @click="showCourse(schedule['星期日'][key][0])">
          <span style="display: table-cell; vertical-align: middle;">
            {{schedule['星期日'][key][0].room}}
            <br>
            <span style="font-size: small">{{schedule['星期日'][key][0].coursename}}</span>
          </span>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
        v-model="dialogVisible"
        width="30%"
    >
      <el-descriptions
          class="margin-top"
          :column="1"
          border
      >
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              课程名称
            </div>
          </template>
          {{singleCourse.coursename}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              授课教师
            </div>
          </template>
          {{singleCourse.teacher}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              上课教室
            </div>
          </template>
          {{singleCourse.room}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              上课时间
            </div>
          </template>
          {{singleCourse.day}}{{singleCourse.fromto}}节
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>

</div>
</template>

<script>
import request from "@/utils/request";
import {ArrowLeft, ArrowRight} from "@element-plus/icons";
import refresh from "@element-plus/icons/lib/Refresh";

export default {
  name: "stuSchedule",
  components:{
    refresh,
    ArrowLeft,
    ArrowRight,
  },
  data(){
    return{
      dialogVisible:false,
      singleCourse:{},
      user:{},
      askForm:{
        stu_no:'',
        week:'1',
      },
      schedule:{},
      scheduleStyle:{
        '星期一':{},
        '星期二':{},
        '星期三':{},
        '星期四':{},
        '星期五':{},
        '星期六':{},
        '星期日':{},
      },
      scheduleColor:[
          '#90FF40',
          '#F2F243',
          '#5EAFE9',
          '#52F5DC',
          '#EB8E55',
          '#EB5591',
          '#7272E6',
          '#BDE672',
      ],
    }
  },
  computed:{
    scheduleHeight(){
      return 50
    },
    schedulePos(){
      return 20
    },
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'));
    this.askForm.stu_no=this.user.stu_no+''
    this.askSchedule()
    let aDate=new Date()
    console.log(aDate)
  },
  methods:{
    refreshWeek(){
      this.askForm.week=1
      this.askSchedule()
    },
    changeWeek(num){
      if(num===0&&this.askForm.week>1){
        this.askForm.week--
        this.askSchedule()
      }else if(num===1){
        this.askForm.week++
        this.askSchedule()
      }
    },
    showCourse(course){
      this.dialogVisible=true
      this.singleCourse=course
    },
    askSchedule(){
      let that=this
      request.post("/findStudentCourseByStudent",this.askForm).then(res=>{
        console.log(res)
        this.schedule=res.data
        this.scheduleStyle={
          '星期一':{},
          '星期二':{},
          '星期三':{},
          '星期四':{},
          '星期五':{},
          '星期六':{},
          '星期日':{},
        }
        let flag=true
        let max,min,color=0,lastColor=-1//flag使相邻两天配色不同，并保证lastcolor与color不同，来保证同一天相邻课程颜色不同，但因为dom元素渲染顺序不定，所以不太有用
        for(let item in this.schedule){
          if(flag){
            max=4
            min=0
            flag=false
          }else{
            max=8
            min=4
            flag=true
          }
          for(let time in this.schedule[item]){
            let times=time.split(",")
            while (color===lastColor){
              color=Math.floor(Math.random()*(max-min))+min
            }
            lastColor=color
            console.log(color)
            let tempStyle={height:50+'%' ,width:'50%', position:'absolute', top:20+'%', backgroundColor:'#008c8c',
              borderRadius:10+'px', display:'table', textAlign:'center', textOverflow:'ellipsis', overflow:'hidden'}

            tempStyle.height=7.5*times.length+0.1*(times.length-1)+'%'
            tempStyle.top=7.6*times[0]+'%'
            tempStyle.backgroundColor=this.scheduleColor[color]
            this.scheduleStyle[item][time]=JSON.parse(JSON.stringify(tempStyle))

          }
        }
      })
    },
  },
}
</script>

<style scoped>

</style>