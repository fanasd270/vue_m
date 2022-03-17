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
        label="考试情况"
        sortable>
    </el-table-column>
    <el-table-column
        prop="final_Information_examination_type"
        label="考试类型"
        sortable>
    </el-table-column>
  </el-table>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "gCScoreCourseView",
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
      request.post('/findallExaminationByyear',this.user).then(res=>{
        console.log(res)
        this.otherTermsPoint=res.data
      })
    },
  },
}
</script>

<style scoped>

</style>