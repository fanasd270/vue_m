<template>
<div>
  <el-tabs tab-position="left" >
    <el-tab-pane label="上传成绩">
      <el-button @click="downloadGrandPoint">下载绩点排名模板</el-button>
      <el-upload
          class="upload-demo"
          action=""
          :http-request="uploadGrandPoint"
          :on-success="headUpdate"
          :show-file-list=false
      >
        <el-button>上传绩点排名</el-button>
      </el-upload>

      <div v-if="this.grandPointTable.length!==0">预览
        <el-button @click="comfirmUploadGrandPoint">确认提交</el-button>
        <div v-if="this.grandPointTable[0].grade_point_time===null">总绩点</div>
        <div v-if="this.grandPointTable[0].grade_point_time!==null">{{this.grandPointTable[0].grade_point_time}}</div>
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
              label="专业百分比">
          </el-table-column>
          <el-table-column
              prop="grade_point_national_english"
              label="国家英语">
          </el-table-column>
          <el-table-column
              prop="grade_point_gpa"
              label="学生课程平均绩点">
          </el-table-column>
          <el-table-column
              prop="grade_point_rankforclass"
              label="年级排名">
          </el-table-column>
          <el-table-column
              prop="grade_point_rankformajor"
              label="专业排名">
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

    </el-tab-pane>
    <el-tab-pane label="查看成绩">

    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import fileApi from "@/components/Store";
import request from "@/utils/request";
export default {
  name: "gCStuScore",
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
    headUpdate(){
      this.$message.success("上传成功")
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
      })
    },
  },
}
</script>

<style scoped>

</style>