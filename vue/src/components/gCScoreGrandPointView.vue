<template>
  <div v-loading="loading">
    <el-select v-model="choosedTerm" placeholder="请选择" @change="changeTerms">
      <el-option
          v-for="(item,key,index) in otherTermsPoint"
          :key="key"
          :label="key"
          :value="key">
      </el-option>
    </el-select>

    <el-select v-model="choosedClassList" placeholder="请选择" @change="changeClassList" multiple collapse-tags clearable>
      <el-option
          v-for="(item,key,index) in filterClass"
          :key="item.value"
          :label="item.value"
          :value="item.value">
      </el-option>
    </el-select>

    <el-table
        @sort-change="sortChange"
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
          sortable="custom"
          >
      </el-table-column>
      <el-table-column
          prop="grade_point_rankformajor"
          label="专业排名"
          sortable="custom">
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
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "gCScoreGrandPointView",
  data(){
    return{
      loading:false,
      power:{},
      user:{},
      otherTermsPoint:{},
      showPoints:[],
      showPointsCopy:[],
      choosedTerm:'',
      choosedClassList:[],
      filterClass:[],

      currentPage: 1,
      pageSize:10,
      total:0,
    }
  },

  created() {
    this.power=JSON.parse(sessionStorage.getItem('power'))
    if(this.power.type===1){
      this.user=JSON.parse(sessionStorage.getItem('user_t'))
    }else{
      this.user=JSON.parse(sessionStorage.getItem('user'))
    }
    this.getData()
  },
  methods:{
    changeClassList(){
      this.showPoints=[]
      let tempList=[]
      for(let index in this.choosedClassList){
        tempList=this.showPointsCopy.filter((value)=>{
          return value.grade_point_stu_class===this.choosedClassList[index]
        })
        this.showPoints=this.showPoints.concat(tempList)
      }
    },
    sortChange(val){
      if(val.order==='descending'){
        this.showPointsCopy.sort(function (a,b){
          let x=a[val.prop]-0
          let y=b[val.prop]-0
          return((x>y)?-1:((x<=y)?1:0))
        })
      }else{
        this.showPointsCopy.sort(function (a,b){
          let x=a[val.prop]-0
          let y=b[val.prop]-0
          return((x<=y)?-1:((x>y)?1:0))
        })
      }
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
      this.choosedClassList=[]
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
      this.loading=true
      request.post('/findAllGradePiontTatol',this.user).then(res=>{
        request.post('/findallGradePointByyear',this.user).then(res=>{
          this.otherTermsPoint=res.data
          for(let item in this.otherTermsPoint){
            for(let m in this.otherTermsPoint[item]){
              if(this.filterClass.findIndex(t=>t.value===this.otherTermsPoint[item][m].grade_point_stu_class)===-1){
                this.filterClass.push({text:this.otherTermsPoint[item][m].grade_point_stu_class,value:this.otherTermsPoint[item][m].grade_point_stu_class})
              }
            }
          }
          this.loading=false

          // if(this.otherTermsPoint["总绩点"]){
          //   this.choosedTerm="总绩点"
          //   this.choosedTerm(this.choosedTerm)
          // }
        }).catch(err=>{
          this.loading=false
        })
      })
    },
  },
}
</script>

<style scoped>

</style>