<template>
  <div style="position: relative; margin:20px 0 0 9% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      课程管理
    </p>
    <br>
    <div style="position: relative">
      <el-input @mouseenter="mouseOn=true" @mouseleave="mouseOn=false" v-model="searchInfo.queryString" @input="searchCourse" style="width: 20%" placeholder="输入班组号或课程名查找"></el-input>
      <el-card @mouseenter="mouseOn=true" @mouseleave="mouseOn=false" v-if="searchData.length!==0&&mouseOn" style="min-width: 50%; position: absolute; z-index: 99;top: 2em; opacity: 0.8">
        <div class="item" v-for="(item,index) in searchData" style="height: 2em">
          <span>班组号：</span>
          <span style="color: #008c8c; margin-right: 5px">{{item.classNo}}</span>
          <span>课程名称：</span>
          <span style="color: #008c8c; margin-right: 5px">{{item.courseName}}</span>
          <span>人数:</span>
          <span style="color: #008c8c">{{item.count}}</span>
          <el-tag class="add" @click="addCourse(item)">点击添加</el-tag>
        </div>
      </el-card>
    </div>
    <el-col v-for="(item,index) in myCourse" :span="16" style="width: 300px; margin: 20px 20px 20px 0; position: relative; z-index: 1">
      <el-dropdown style="position:absolute; right: 15px; top: 5px">
        <el-icon class="el-icon--right">
          <span style="font-size: large; font-weight: bold">...</span>
          <arrow-down />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changeCourseName(item)">修改课程备注</el-dropdown-item>
            <el-dropdown-item @click="deleteCourse(item)">删除绑定</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-card :body-style="{padding:'28px'}" :style="courseStyle[index]" @click="getAllStu(item)" >
        <div class="ecard">
          <div style="height: 50px">
            <div style="font-weight: bold">{{item.course_index_name}}</div>
            <div style="font-size: 5px">{{item.course_index_no}}</div>
          </div>
          <div style="margin-top: 10px">
            <el-icon><user /></el-icon>
            {{item.course_index_count}}
            <span style="font-size: 5px">(本系统统计人数)</span>
          </div>
        </div>
      </el-card>
    </el-col>


    <div v-if="stuList.length!==0" style="clear: both">
      <div style="font-weight: bold">{{detailCourse.course_index_name}}:{{detailCourse.course_index_count}}人</div>
      <el-table :data="stuList" style="width: 100%">
        <el-table-column label="头像" width="180">
          <template #default="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.stu_photourl" fit="fill" />
<!--            <el-image style="width: 100px; height: 100px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill" />-->
          </template>
        </el-table-column>
        <el-table-column prop="stu_name" label="姓名" width="180" />
        <el-table-column label="学号" width="180">
          <template #default="scope">
            {{scope.row.stu_no}}
          </template>
        </el-table-column>
        <el-table-column label="班级" width="180">
          <template #default="scope">
            <span>{{scope.row.stu_class}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        v-model="dialogVisible"
        title="修改备注"
        width="30%"
    >
      <el-input v-model="changeName.course_index_name" style="width: 80%"></el-input>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmRename"
        >确认</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import user from "@element-plus/icons/lib/User";
import fileApi from "@/components/Store";
export default {
  name: "ctCourseManage",
  data(){
    return{
      mouseOn:false,
      searchInfo:{
        queryString:'',
      },
      searchData:[],
      user:{},
      courseAndTea:{
        course_index_no: "",
        course_index_name: "",
        course_index_teacherno: 0,
      },
      changeName:{
        course_index_no: "",
        course_index_name: "",
        course_index_teacherno: 0,
      },
      delCourse:{
        course_index_no: "",
        course_index_name: "",
        course_index_teacherno: 0,
      },
      detailCourse:{},
      myCourse:[],
      courseStyle:[],
      bgColor:[
        '#90FF40',
        '#F2F243',
        '#5EAFE9',
        '#52F5DC',
        '#EB8E55',
        '#EB5591',
        '#7272E6',
        '#BDE672',
      ],
      dialogVisible:false,
      stuList:[],
      Fapi:'',
    }
  },
  components:{
    user,
  },
  created() {
    this.Fapi=fileApi.fileApi
    this.getReady()
    this.user=JSON.parse(sessionStorage.getItem('user'))
    console.log(this.user)
    this.courseAndTea.course_index_teacherno=this.user.t_no
    this.changeName.course_index_teacherno=this.user.t_no
    this.delCourse.course_index_teacherno=this.user.t_no
    this.getCourse()
  },
  methods:{
    onMouse(){
      console.log(111111111111)
    },
    getAllStu(item){
      this.detailCourse=JSON.parse(JSON.stringify(item))
      request.post('/findStudentsByCourse',item).then(res=>{
        console.log(res)
        this.stuList=res.data
        for(let i in this.stuList){
          this.stuList[i].stu_photourl=this.Fapi+'/Pictures/'+this.stuList[i].stu_photourl
        }
      })
    },
    deleteCourse(item){
      this.delCourse.course_index_name=item.course_index_name
      this.delCourse.course_index_no=item.course_index_no
      request.post('/deleteCourseByTeacher',this.delCourse).then(res=>{
        this.getCourse()
      })
    },
    changeCourseName(item){
      this.changeName.course_index_name=item.course_index_name
      this.changeName.course_index_no=item.course_index_no
      this.dialogVisible=true
    },
    confirmRename(){
      request.post('/renameCourseByTeacher',this.changeName).then(res=>{
        this.getCourse()
        this.dialogVisible=false
      })
    },
    getCourse(){
      request.post('/findTeacherCourses',this.user).then(res=>{
        this.myCourse=res.data
        this.courseStyle=[]
        let color=0,lastColor=0//flag使相邻两天配色不同，并保证lastcolor与color不同，来保证同一天相邻课程颜色不同，但因为dom元素渲染顺序不定，所以不太有用

        let tempStyle={color: 'dimgray', cursor: 'default', height: 140+'px',backgroundColor: '#008c8c'}
        for(let index in this.myCourse){
          while (color===lastColor){
            color=Math.floor(Math.random()*8)
          }
          tempStyle.backgroundColor=this.bgColor[color]
          this.courseStyle.push(JSON.parse(JSON.stringify(tempStyle)))
          console.log("color")
          console.log(color)
          lastColor=color
        }
        console.log(res)
      })
    },
    addCourse(item){
      this.courseAndTea.course_index_no=item.classNo
      this.courseAndTea.course_index_name=item.courseName
      console.log(this.courseAndTea)
      request.post('/addCourseByTeacher',this.courseAndTea).then(res=>{
        if(res.code===0){
          this.$message.error("插入失败")
        }else{
          this.$message.success("插入成功")
          this.getCourse()
        }
      })
    },
    getReady(){
      request.post('/courseDataRead').then(res=>{
        console.log(res)
      })
    },
    searchCourse(){
      console.log(this.searchInfo)
      request.post('/findCourseList',this.searchInfo).then(res=>{
        console.log(res)
        this.searchData=res.data
      })
    },
  },
}
</script>

<style>
.item:hover{
  background-color: rgba(0,0,0,.1);
}
.add{
  cursor: pointer;
  float: right;
  height: 100%;
  opacity: 0;
}
.item:hover .add{
  opacity: 1;
}
</style>