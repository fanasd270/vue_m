<template>
  <div>
    <el-button @click="drawer=true" style="margin: 10px 5px 5px 0">选择学生</el-button>

    <el-upload
        v-if="stu.score_pdf_stu_no!==''"
        style="display: inline-block"
        class="upload-demo"
        action=""
        :http-request="uploadCoursePoint"
        :show-file-list=false
    >
      <el-tooltip
          class="box-item"
          effect="dark"
          content="上传pdf或jpg"
      >
        <el-button>上传</el-button>
      </el-tooltip>
    </el-upload>
    <br>
    <el-tag type="success" v-if="multipleSelection.stu_name" style="margin-right: 5px">{{multipleSelection.stu_name}}</el-tag>

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
import request from "@/utils/request";
import {Search} from "@element-plus/icons";

export default {
  name: "gCStuIndividualScore",
  data(){
    return{
      user:{},
      power:{},
      stu:{
        score_pdf_no:'',
        score_pdf_stu_no:'',
        score_pdf_url:'',
      },
      tableData:[],
      tableDataCopy:[],
      searchInfo:'',
      drawer:false,
      multipleSelection:{},
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
    this.getData()
  },
  methods:{
    uploadCoursePoint(param){
      const formData=new FormData()
      formData.append('file', param.file)
      this.loading=true
      request.post('/uploadScorePDF',formData).then(res=>{
        this.stu.score_pdf_url=res.data
        request.post('/uploadPDF_DB', this.stu).then(res=>{
          this.$message.success("上传成功")
          console.log(this.stu)
        })
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
      this.stu.score_pdf_stu_no=this.multipleSelection.stu_no+''
    },
    getData(){
      request.post('/Stu/stuList', this.user).then(res=>{
        this.tableData=res
        this.tableDataCopy=JSON.parse(JSON.stringify(this.tableData))
      }).catch(err=>{
        this.$message.error("学生信息请求错误")
      })

    },
  },

}
</script>

<style scoped>

</style>