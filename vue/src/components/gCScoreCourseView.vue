<template>
<!--  <el-select v-model="choosedTerm" placeholder="请选择" @change="changeTerms" style="margin-right: 10px">-->
<!--    <el-option-->
<!--        v-for="(item,key,index) in otherTermsPoint"-->
<!--        :key="key"-->
<!--        :label="key"-->
<!--        :value="key">-->
<!--    </el-option>-->
<!--  </el-select>-->

<!--  <el-date-picker v-model="year" type="year" placeholder="选择学年" value-format="YYYY" style="width: 10em">-->
<!--  </el-date-picker>-->
<!--  <el-select v-model="year2" style="width: 6em;" placeholder=" " :disabled="year===''" @change="askData">-->
<!--    <el-option-->
<!--        v-for="item in yearTime"-->
<!--        :key="item.name"-->
<!--        :label="item.name"-->
<!--        :value="item.name">-->
<!--    </el-option>-->
<!--  </el-select>-->
  <el-drawer
      title="学生列表"
      v-model="drawer"
      direction="rtl"
  >
    <el-button @click="drawer=false" style="margin: 0 5px 5px 0">确定</el-button>
    <br>
    <span>已选:{{multipleSelection.stu_name}}</span>
    <br>
    <el-input
        v-model="searchInfo1"
        placeholder="搜索学号或姓名"
        :prefix-icon="Search"
        style="width: 50%; margin: 5px 0 5px 0"
        @keyup.enter="searchFun1"
        clearable
        @clear="clearSearch1"
    />
    <el-button :icon="Search" circle size="small" @click="searchFun1" style="margin-left: 5px"></el-button>
    <el-table ref="tableRef" highlight-current-row @current-change="handleSelectionChange" row-key="stu_no" :data="tableData" style="width: 100%" max-height="600">
      <el-table-column prop="stu_name" label="姓名" width="100" fixed/>
      <el-table-column
          prop="stu_no"
          label="学号"
          width="100"
          sortable
          column-key="stu_no"
      />
      <el-table-column
          prop="stu_class"
          label="班级"
          width="100"
          :filters="this.filterClass"
          :filter-method="filterClassHandler"
      />

    </el-table>
  </el-drawer>

  <el-button @click="chooseStu">选择学生</el-button>

  <el-select v-model="choosedTerm" placeholder="请选择" @change="changeTerms" style="margin-right: 10px" :disabled="multipleSelection===''">
    <el-option
        v-for="(item,key,index) in otherTermsPoint"
        :key="key"
        :label="key"
        :value="key">
    </el-option>
  </el-select>

  <el-input
      v-model="searchInfo"
      placeholder="搜索课程"
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
      searchInfo1:'',
      drawer: false,
      multipleSelection: {},
      tableData:[],
      tableDataCopy:[],
      filterClass:[],

      power:{},
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
    this.power=JSON.parse(sessionStorage.getItem('power'))
    if(this.power.type===1){
      this.user=JSON.parse(sessionStorage.getItem('user_t'))
    }else{
      this.user=JSON.parse(sessionStorage.getItem('user'))
    }
    //this.getData()
  },
  methods:{
    handleSelectionChange(val){
      this.multipleSelection = val;
      request.post('/findallExaminationByyear',val).then(res=>{
        console.log("course")
        console.log(res)
        this.otherTermsPoint=res.data
        for(let item in this.otherTermsPoint){
          this.choosedTerm=item
          this.changeTerms(item)
          break
        }
      })
      // console.log(this.multipleSelection)
    },
    filterClassHandler(value, row, column){
      const property = column['property']
      return row[property] === value
    },
    chooseStu(){
      this.drawer=true
      request.post('/Stu/stuList', this.user).then(res=>{
        this.tableData=res
        this.tableDataCopy=JSON.parse(JSON.stringify(res))
      }).catch(err=>{
        this.$message.error("学生信息请求错误")
      })
      request.post('/classList', this.user).then(res=>{
        for(let i=0; i<res.length; i++){
          this.filterClass.push({text:res[i].class_name, value: res[i].class_name})
        }
      }).catch(err=>{
        this.$message.error("班级信息请求错误")
      })
    },
    searchFun1(){
      let fuzzy=this.searchInfo1
      if(fuzzy){
        this.tableData=this.tableDataCopy.filter((value)=>{
          return value.stu_name.includes(fuzzy)||value.stu_no===fuzzy-0
        })
      }else{
        this.tableData=JSON.parse(JSON.stringify(this.tableDataCopy))
      }
    },
    //清空搜索
    clearSearch1(){
      this.tableData=JSON.parse(JSON.stringify(this.tableDataCopy))
    },
    searchFun(){

      request.post('/findallExaminationByyear',this.user).then(res=>{
        console.log("course")
        console.log(res)
        this.otherTermsPoint=res.data
      })


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
    // getData(){
    //   request.post('/findallExaminationByyear',this.user).then(res=>{
    //     console.log("course")
    //     console.log(res)
    //     this.otherTermsPoint=res.data
    //   })
    // },
  },
}
</script>

<style scoped>

</style>