<template>
  <div style="margin-top: 10px">
    <div v-if="grandPointTable.length===0">
      <el-button @click="downloadGrandPoint" style="margin-right: 10px">下载绩点成绩模板</el-button>
      <el-upload
          style="display: inline-block"
          class="upload-demo"
          action=""
          :http-request="uploadGrandPoint"
          :show-file-list=false
      >
        <el-button title="请确保上传文件格式与模板一致">上传</el-button>
      </el-upload>
    </div>

    <div v-if="grandPointTable.length!==0">
      <el-button @click="cancelUploadGrandPoint" style="margin-right: 10px">取消</el-button>
      <el-button @click="comfirmUploadGrandPoint">确认提交</el-button>
    </div>
  </div>

  <div v-if="grandPointTable.length!==0" style="margin-top: 10px">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      预览
    </p>
    <br>
    <div>
      <span >绩点类型:</span>
      <span v-if="grandPointTable[0].grade_point_time===null">总绩点</span>
      <span v-if="grandPointTable[0].grade_point_time!==null">{{grandPointTable[0].grade_point_time}}</span>
    </div>

    <el-table
        :data="grandPointTable"
        stripe
        style="width: 100%">
      <el-table-column
          prop="grade_point_stu_no"
          label="学号">
      </el-table-column>
      <el-table-column
          prop="grade_point_stu_name"
          label="姓名">
      </el-table-column>
      <el-table-column
          prop="grade_point_stu_class"
          label="班级">
      </el-table-column>
      <el-table-column
          prop="grade_point_mrjorpercentage"
          label="专业百分比"
          sortable>
      </el-table-column>
      <el-table-column
          prop="grade_point_national_english"
          label="国家英语">
      </el-table-column>
      <el-table-column
          prop="grade_point_gpa"
          label="学生课程平均绩点"
          sortable>
      </el-table-column>
      <el-table-column
          prop="grade_point_rankforclass"
          label="年级排名"
          sortable>
      </el-table-column>
      <el-table-column
          prop="grade_point_rankformajor"
          label="专业排名"
          sortable>
      </el-table-column>
      <el-table-column
          prop="grade_point_major_num"
          label="专业人数">
      </el-table-column>
      <el-table-column
          prop="grade_point_english_score"
          label="英语学分">
      </el-table-column>
      <el-table-column
          prop="grade_point_sportsscore"
          label="体育总学分">
      </el-table-column>
      <el-table-column
          prop="grade_point_healthknowledge"
          label="健康知识">
      </el-table-column>
      <el-table-column
          prop="grade_point_long_distance_run"
          label="长跑">
      </el-table-column>
      <el-table-column
          prop="grade_point_general_knowledge"
          label="全校通识">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import fileApi from "@/components/Store";
import request from "@/utils/request";
export default {
  name: "gCScoreGrandPont",
  data(){
    return{
      Fapi:'',
      grandPointUrl:'',
      grandPointTable:[
        // {
        //   grade_point_english_score: "4",
        //   grade_point_general_knowledge: "2",
        //   grade_point_gpa: "3.94",
        //   grade_point_healthknowledge: "",
        //   grade_point_istatol: null,
        //   grade_point_long_distance_run: "",
        //   grade_point_major_num: "182",
        //   grade_point_mrjorpercentage: "0.0055",
        //   grade_point_national_english: "英语通过",
        //   grade_point_no: "20201755222624",
        //   grade_point_rankforclass: "1",
        //   grade_point_rankformajor: "1",
        //   grade_point_sportsscore: "2",
        //   grade_point_stu_class: "20软件工程01",
        //   grade_point_stu_name: "邱天",
        //   grade_point_stu_no: "20201755",
        //   grade_point_time: null,
        // },
      ],
    }
  },
  created() {
    this.Fapi=fileApi.fileApi
  },
  methods:{
    cancelUploadGrandPoint(){
      request.post('/cacelGradePoint').then(res=>{
        this.$message.warning("取消成功")
        this.grandPointTable=[]
      })
    },
    uploadGrandPoint(param){
      const formData=new FormData()
      formData.append('file', param.file)

      request.post('/issubmiting').then(res=>{
        console.log("状态")
        console.log(res.data)
        if(res.code===0){
          this.$message.warning('服务器正忙，请稍等')
          return
        }
        request.post('/uploadExcelforGradePoint', formData).then(res=>{
          let read={path:res.data}
          request.post('/readExcelforGradepoint',read).then(res=>{
            console.log(res.data)
            this.$notify.success("操作成功，请在确认信息无误后点击确认上传，此操作请在五分钟内完成，之后将自动取消")
            this.grandPointTable=res.data
          })
        })
      })
    },
    downloadGrandPoint(){
      request.post('/downloadExcelforGradepoint').then(res=>{
        console.log(res)
        window.location.href=this.Fapi+'/excel/Uploadexcel/'+res.data
      })
    },
    comfirmUploadGrandPoint(){
      request.post('/submitGradePoint').then(res=>{
        this.$message.success("上传成功")
        this.grandPointTable=[]
      })
    },
  },
}
</script>

<style scoped>

</style>