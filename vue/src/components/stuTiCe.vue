<template>
  <div style="margin: 5px 9% 0 9%; min-height: 500px">
    <div>
      <el-date-picker
          v-model="singleInfo.test_of_physical_strength_year"
          type="year"
          value-format="YYYY"
          placeholder="选择年份">
      </el-date-picker>
      <el-input v-model="singleInfo.test_of_physical_strength_score" style="width: 15%; margin-left: 5px; vertical-align: top" placeholder="分数" @input="NumberCheck"></el-input>
      <el-button type="text" @click="insertInfo">新建</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="test_of_physical_strength_year" label="年份" width="150"/>
      <el-table-column prop="test_of_physical_strength_score" label="分数" width="120" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="text" size="small" @click="deleteInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "stuTiCe",
  data(){
    return{
      user:{},
      singleInfo:{
        test_of_physical_strength_no: "",
        test_of_physical_strength_stu_no: "",
        test_of_physical_strength_score: "",
        test_of_physical_strength_year: ""
      },
      tableData:[],
    }
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'));
    this.singleInfo.test_of_physical_strength_stu_no=this.user.stu_no+''
    this.getData()
  },
  methods:{
    insertInfo(){
      if(this.singleInfo.test_of_physical_strength_year===''||this.singleInfo.test_of_physical_strength_score===''){
        this.$message.warning('请完整填写信息')
        return
      }
      request.post('/uploadSportTest',this.singleInfo).then(res=>{
        this.getData()
        this.singleInfo.test_of_physical_strength_year=''
        this.singleInfo.test_of_physical_strength_score=''
      })
    },
    deleteInfo(row){
      request.post('/deleteSportTest',row).then(res=>{
        this.getData()
      })
    },
    getData(){
      request.post('/findSportTest',this.user).then(res=>{
        this.tableData=res.data
      }).catch(err=>{
        this.$message.error('连接失败')
      })
    },
    NumberCheck(num) {
      let str = this.singleInfo.test_of_physical_strength_score;
      //限制只能输入一个小数点
      if (str.indexOf(".") !== -1) {
        var str_ = str.substr(str.indexOf(".") + 1);
        if (str_.indexOf(".") !== -1) {
          str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
        }
      }
      //正则替换，保留数字和小数点
      str = str.replace(/[^\d^\.]+/g,'')
      this.singleInfo.test_of_physical_strength_score=str
    },
  },
}
</script>

<style scoped>

</style>