<template>
  <el-select v-model="choosedTerm" placeholder="请选择" @change="changeTerms" style="margin-right: 10px">
    <el-option
        v-for="(item,key,index) in otherTermsPoint"
        :key="key"
        :label="key"
        :value="key">
    </el-option>
  </el-select>

  <el-input
      v-model="searchInfo"
      placeholder="搜索学生或课程"
      :prefix-icon="Search"
      style="width: 20%; margin-bottom: 5px"
      @keyup.enter="searchFun"
      clearable
      @clear="clearSearch"
  />
  <el-button :icon="Search" circle size="small" @click="searchFun" style="margin-left: 5px"></el-button>

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
  <el-pagination
      v-model:currentPage="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script>
import request from "@/utils/request";
import {Search} from "@element-plus/icons";

export default {
  name: "gCScoreCourseView",
  setup(){
    return{
      Search,
    }
  },
  data(){
    return{
      user:{},
      otherTermsPoint:{},
      showPoints:[],
      choosedTerm:'',

      searchInfo:'',
      showPointsCopy:[],
      //分页数据
      currentPage: 1,
      pageSize:10,
      total:0,
    }
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.getData()
  },
  methods:{
    searchFun(){
      let fuzzy=this.searchInfo
      if(fuzzy){
        this.showPoints=this.showPointsCopy.filter((value)=>{
          return value.final_Information_stu_name.includes(fuzzy)||value.final_Information_no_coursename.includes(fuzzy)
        })
      }else{
        this.showPoints=JSON.parse(JSON.stringify(this.showPointsCopy))
      }
    },
    clearSearch(){
      this.showDataChange()
    },

    handleSizeChange(pageSize){//改变每页数量触发
      this.searchInfo=null
      this.pageSize=pageSize
      this.showDataChange()
    },
    handleCurrentChange(currentPage){//改变页码触发
      this.searchInfo=null
      this.currentPage=currentPage
      this.showDataChange()
    },
    showDataChange(){
      this.showPoints=JSON.parse(JSON.stringify(this.showPointsCopy))
      this.showPoints=this.showPoints.splice((this.currentPage-1)*this.pageSize, this.pageSize)
    },
    changeTerms(val){
      this.showPoints=JSON.parse(JSON.stringify(this.otherTermsPoint[val]))
      this.total=this.showPoints.length
      this.showPointsCopy=this.otherTermsPoint[val]
      this.showPoints=this.showPoints.splice((this.currentPage-1)*this.pageSize, this.pageSize)
    },
    getData(){
      request.post('/findallExaminationByyear',this.user).then(res=>{
        console.log("course")
        console.log(res)
        this.otherTermsPoint=res.data
      })
    },
  },
}
</script>

<style scoped>

</style>