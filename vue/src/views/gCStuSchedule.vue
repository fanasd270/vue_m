<template>
  <div v-loading="loading"
       element-loading-text="正在加载">
    <el-button @click="drawer=true" style="margin: 10px 0 5px 0">选择学生</el-button>
    <div style="margin: 5px 0 5px 5px; display: inline-block">
      <el-date-picker v-model="year" type="year" placeholder="选择学年" value-format="YYYY" style="width: 10em" @change="tea_stu.year=year+year2">
      </el-date-picker>
      <el-select v-model="year2" style="width: 6em;" placeholder="学期" :disabled="year===''||year===null" @change="tea_stu.year=year+year2">
        <el-option
            v-for="item in yearTime"
            :key="item.name"
            :label="item.name"
            :value="item.name">
        </el-option>
      </el-select>
    </div>

    <el-upload
        v-if="tea_stu.studentNo!==''&&tea_stu.year!==''"
        style="display: inline-block"
        class="upload-demo"
        action=""
        :http-request="uploadCoursePoint"
        :show-file-list=false
    >
      <el-button>上传</el-button>
    </el-upload>
    <br>
    <el-tag type="success" v-if="multipleSelection.stu_name" style="margin-right: 5px">{{multipleSelection.stu_name}}</el-tag>

    <div v-if="schedule.length!==0" style="margin-top: 10px">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
        预览
      </p>
      <br>

      <span>{{schedule[0].student_course_stu_no}}{{schedule[0].student_course_stu_name}}{{schedule[0].student_course_year}}</span>

      <el-button style="margin-left: 5px" @click="confirmUpload" type="text">确认上传</el-button>
      <el-button style="margin-left: 5px" @click="cancelUpload" type="text">取消上传</el-button>

      <el-table
          :data="schedule"
          stripe
          style="width: 100%">
        <el-table-column
            prop="student_course_name"
            label="课程名称">
        </el-table-column>
        <el-table-column
            prop="student_course_code"
            label="课程代码">
        </el-table-column>
        <el-table-column
            prop="student_course_class_no"
            label="教学班号">
        </el-table-column>
        <el-table-column
            prop="student_course_week"
            label="周次">
        </el-table-column>
        <el-table-column
            prop="student_course_day"
            label="星期">
        </el-table-column>
        <el-table-column
            prop="student_course_section"
            label="节次">
        </el-table-column>
        <el-table-column
            prop="student_course_teachername"
            label="教师">
        </el-table-column>
        <el-table-column
            prop="student_course_classroom"
            label="上课教室">
        </el-table-column>
        <el-table-column
            prop="student_course_lab"
            label="实验">
        </el-table-column>
      </el-table>
    </div>

    <el-drawer
        title="学生列表"
        v-model="drawer"
        direction="rtl"
    >
      <el-button @click="drawer=false" style="margin-bottom: 5px">确定</el-button>
      <br>
      <span>已选:{{multipleSelection.stu_name}}</span>
      <br>
      <el-input
          v-model="searchInfo"
          placeholder="搜索学号或姓名"
          :prefix-icon="Search"
          style="width: 50%; margin: 5px 0 5px 0"
          @keyup.enter="searchFun"
          clearable
          @clear="clearSearch"
      />
      <el-button :icon="Search" circle size="small" @click="searchFun" style="margin-left: 5px"></el-button>
      <el-table ref="tableRef" highlight-current-row @current-change="handleCurrentChange" row-key="stu_no" :data="tableData" style="width: 100%" max-height="600">
        <el-table-column prop="stu_name" label="姓名" width="100" fixed/>
        <el-table-column
            prop="stu_no"
            label="学号"
            width="100"
            sortable
            column-key="stu_no"
        />


      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import {Search} from "@element-plus/icons";
import request from "@/utils/request";

export default {
  name: "gCStuSchedule",
  data(){
    return{
      loading:false,
      user:{},
      power:{},
      tea_stu:{
        teacherNo:'',
        studentNo:'',
        year:'',
        file_path:'',
      },
      schedule:[],
      tableData:[],
      tableDataCopy:[],
      drawer:false,
      multipleSelection:{},
      searchInfo:'',
      year:'',
      year2:'',
      yearTime:[
        {name:'春'},
        {name:'秋'},
      ],
    }
  },
  setup(){
    return{
      Search
    }
  },
  created() {
    this.power=JSON.parse(sessionStorage.getItem('power'))
    if(this.power.type===1){
      this.user=JSON.parse(sessionStorage.getItem('user_t'))
    }else{
      this.user=JSON.parse(sessionStorage.getItem('user'))
    }
    this.tea_stu.teacherNo=this.user.t_no+''
    this.getData()
  },
  methods:{
    cancelUpload(){
      request.post('/cancelStudentCourse',this.multipleSelection).then(res=>{
        this.$message.warning("取消成功")
        this.schedule=[]
      }).catch(err=>{
        this.$message.error("连接错误")
      })
    },
    confirmUpload(){
      request.post('/submitStudentCourses',this.user).then(res=>{
        this.$message.success("成功")
        this.schedule=[]
      }).catch(err=>{
        this.$message.error("连接错误")
      })
    },
    //搜索
    searchFun(){
      let fuzzy=this.searchInfo
      if(fuzzy){
        this.tableData=this.tableDataCopy.filter((value)=>{
          return value.stu_name.includes(fuzzy)||value.stu_no===fuzzy-0
        })
      }else{
        this.tableData=JSON.parse(JSON.stringify(this.tableDataCopy))
      }
    },
    //清空搜索
    clearSearch(){
      this.tableData=JSON.parse(JSON.stringify(this.tableDataCopy))
    },
    handleCurrentChange(val){
      this.multipleSelection = val;
      this.tea_stu.studentNo=this.multipleSelection.stu_no+''
    },
    getData(){
      request.post('/Stu/stuList', this.user).then(res=>{
        this.tableData=res
        this.tableDataCopy=JSON.parse(JSON.stringify(this.tableData))
      }).catch(err=>{
        this.$message.error("学生信息请求错误")
      })

    },

    uploadCoursePoint(param){

      const formData=new FormData()
      formData.append('file', param.file)
      this.loading=true
      request.post('/choseStudentForCourse',this.tea_stu).then(res=>{
        this.loading=false
        if(res.code===0){
          this.$message.error("信息错误")
          return
        }
        request.post('/uploadExcelforGradePoint', formData).then(res=>{
          this.tea_stu.file_path=res.data
          console.log(1111111111111111111111)
          console.log(this.tea_stu)
          request.post('/readStudentCourse',this.tea_stu).then(res=>{
            this.schedule=res.data
            this.$message.success("操作成功，请在确认信息无误后点击确认上传，此操作请在一分钟内完成，之后将自动取消")
          })
        })
      }).catch(err=>{
        this.loading=false
        this.$message.error("连接错误")
      })

    },
  },
}
</script>

<style scoped>

</style>