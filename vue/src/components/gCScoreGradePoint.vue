<template>
  <div v-loading="loading"
       element-loading-text="正在加载">
    <div style="margin-top: 10px">
      <div v-if="coursePointTable.length===0">
        <el-button @click="downloadCourse" style="margin-right: 10px">下载综测模板</el-button>
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
            prop="comprehensive_evaluation_stu_no"
            label="学号">
        </el-table-column>
        <el-table-column
            prop="comprehensive_evaluation_name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="comprehensive_evaluation_yearfromto"
            label="学年">
        </el-table-column>
        <el-table-column
            prop="comprehensive_evaluation_semester"
            label="学期">
        </el-table-column>
        <el-table-column
            prop="comprehensive_evaluation_rankforscore"
            label="成绩排名"
            sortable>
        </el-table-column>
        <el-table-column
            prop="comprehensive_evaluation_rank"
            label="综合素质测评排名"
            sortable>
        </el-table-column>
        <el-table-column
            prop="comprehensive_evaluation_totalnumforscore"
            label="成绩排名总人数">
        </el-table-column>
        <el-table-column
            prop="comprehensive_evaluation_totalnumforcom_eva"
            label="综合素质排名总人数">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import fileApi from "@/components/Store";
import request from "@/utils/request";
export default {
  name: "gCScoreGradePoint",
  data(){
    return{
      loading:false,
      Fapi:'',
      coursePointTable:[],
    }
  },
  created() {
    this.Fapi=fileApi.fileApi
  },
  methods:{
    cancelUploadCoursePoint(){
      request.post('/cacelCE').then(res=>{
        this.$message.warning("取消成功")
        this.coursePointTable=[]
      })
    },
    uploadCoursePoint(param){
      const formData=new FormData()
      formData.append('file', param.file)

      request.post('/issubmitingCE').then(res=>{
        if(res.code===0){
          this.$message.warning('服务器正忙，请稍等')
          return
        }
        this.loading=true
        request.post('/uploadExcelforGradePoint', formData).then(res=>{
          let read={path:res.data}
          request.post('/readExcelforCE',read).then(res=>{
            this.loading=false
            this.$message.success("操作成功，请在确认信息无误后点击确认上传，此操作请在一分钟内完成，之后将自动取消")
            this.coursePointTable=res.data
          }).catch(err=>{
            this.loading=false
            this.$message.error("上传失败")
          })
        })
      })
    },
    downloadCourse(){
      request.post('/downloadExcelforCE').then(res=>{
        window.location.href=this.Fapi+'/excel/Uploadexcel/'+res.data
      })
    },
    comfirmUploadCoursePoint(){
      this.loading=true
      request.post('/submitCE').then(res=>{
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