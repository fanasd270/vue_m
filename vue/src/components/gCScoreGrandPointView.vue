<template>
  <el-select v-model="choosedTerm" placeholder="请选择" @change="changeTerms">
    <el-option
        v-for="(item,key,index) in otherTermsPoint"
        :key="key"
        :label="key"
        :value="key">
    </el-option>
  </el-select>

  <el-table
      :data="showPoints"
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
</template>

<script>
import request from "@/utils/request";

export default {
  name: "gCScoreGrandPointView",
  data(){
    return{
      user:{},
      otherTermsPoint:{},
      showPoints:[],
      choosedTerm:'',
    }
  },

  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.getData()
  },
  methods:{
    changeTerms(val){
      this.showPoints=this.otherTermsPoint[val]
    },
    getData(){
      request.post('/findAllGradePiontTatol',this.user).then(res=>{
        request.post('/findallGradePointByyear',this.user).then(res=>{
          console.log(res)
          this.otherTermsPoint=res.data
          if(this.otherTermsPoint["总绩点"]){
            this.choosedTerm="总绩点"
            this.showPoints=this.otherTermsPoint[this.choosedTerm]
          }
        })
      })
    },
  },
}
</script>

<style scoped>

</style>