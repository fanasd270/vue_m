<template>
  <div style="margin-top: 10px"
       v-loading.fullscreen="loading"
       element-loading-text="正在加载"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div v-if="coursePointTable.length===0">
      <el-button @click="downloadCourse" style="margin-right: 10px">下载单科成绩模板</el-button>
      <el-upload
          style="display: inline-block"
          class="upload-demo"
          action=""
          :http-request="uploadCoursePoint"
          :show-file-list=false
      >
        <el-button title="请确保上传文件格式与模板一致">上传</el-button>
      </el-upload>
    </div>

    <div v-if="coursePointTable.length!==0">
      <el-button @click="cancelUploadCoursePoint" style="margin-right: 10px">取消</el-button>
      <el-button @click="comfirmUploadCoursePoint">确认提交</el-button>
    </div>
  </div>

  <div v-if="coursePointTable.length!==0" style="margin-top: 10px">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      预览
    </p>
    <br>

    <el-table
        :data="coursePointTable"
        stripe
        style="width: 100%">
      <el-table-column
          prop="final_Information_no_stu_no"
          label="学号">
      </el-table-column>
      <el-table-column
          prop="final_Information_stu_name"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="final_Information_year"
          label="学年学期">
      </el-table-column>
      <el-table-column
          prop="final_Information_dept"
          label="学院"
          >
      </el-table-column>
      <el-table-column
          prop="final_Information_no_coursename"
          label="课程名称">
      </el-table-column>
      <el-table-column
          prop="final_Information_coursecode"
          label="课程代码"
          >
      </el-table-column>
      <el-table-column
          prop="credits"
          label="课程学分"
      >
      </el-table-column>
      <el-table-column
          prop="final_Information_character"
          label="修读性质"
          >
      </el-table-column>
      <el-table-column
          prop="final_Information_comprehensive_achievements"
          label="综合成绩"
          sortable>
      </el-table-column>
      <el-table-column
          prop="final_Information_effective_achievement"
          label="有效成绩"
          sortable>
      </el-table-column>
      <el-table-column
          prop="final_Information_examination_situation"
          label="考试情况">
      </el-table-column>
      <el-table-column
          prop="final_Information_examination_type"
          label="考试类型">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import fileApi from "@/components/Store";
import request from "@/utils/request";
export default {
  name: "gCScoreCourse",
  data(){
    return{
      Fapi:'',
      grandPointUrl:'',
      coursePointTable:[],
      loading:false
    }
  },
  created() {
    this.Fapi=fileApi.fileApi
  },
  methods:{
    cancelUploadCoursePoint(){
      request.post('/cacelExamination').then(res=>{
        this.$message.warning("取消成功")
        this.coursePointTable=[]
      })
    },
    uploadCoursePoint(param){
      const formData=new FormData()
      formData.append('file', param.file)
      request.post('/issubmitingforEx').then(res=>{
        console.log("状态")
        console.log(res.data)
        if(res.code===0){
          this.$message.warning('服务器正忙，请稍等')
          return
        }
        this.loading=true
        request.post('/uploadExcelforGradePoint', formData).then(res=>{
          let read={path:res.data}
          request.post('/readExcelforExamination',read).then(res=>{
            console.log(res.data)
            this.loading=false
            this.$message.success("操作成功，请在确认信息无误后点击确认上传，此操作请在五分钟内完成，之后将自动取消")
            this.coursePointTable=res.data
          }).catch(err=>{
            this.loading=false
            this.$message.error("上传失败")
          })
        })
      })
    },
    downloadCourse(){
      request.post('/downloadExcelforExamination').then(res=>{
        window.location.href=this.Fapi+'/excel/Uploadexcel/'+res.data
      })
    },
    comfirmUploadCoursePoint(){
      this.loading=true
      request.post('/submitExamination').then(res=>{
        this.loading=false
        this.$message.success("上传成功")
        this.coursePointTable=[]
      }).catch(err=>{
        this.loading=false
        this.$message.error("上传失败")
      })
    },
  },
}
</script>

<style scoped>

</style>