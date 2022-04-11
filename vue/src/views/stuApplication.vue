<template>
<div style="position: relative; margin:20px 0 0 9% ">
  <i style="background-color: blue;">
    <span style="opacity: 0">1</span>
  </i>
  <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
    寒暑假留校申请
  </p>
  <div>
    <el-form ref="form" :model="stayApplication" style="margin:30px 0 0 60px; font-weight: bold">

      <el-form-item label="留校理由" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
        <el-input v-model="stayApplication.stay_school_info_reason" clearable></el-input>
      </el-form-item>
      <el-form-item label="留校时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
        <el-date-picker v-model="year" type="year" placeholder="选择学年" value-format="YYYY" style="width: 10em">
        </el-date-picker>
        <el-select v-model="year2" style="width: 6em;" placeholder=" ">
          <el-option
              v-for="item in yearTime"
              :key="item.name"
              :label="item.name"
              :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
        <el-date-picker v-model="stayApplication.stay_school_info_begin" value-format="YYYY-MM-DD"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
        <el-date-picker v-model="stayApplication.stay_school_info_end" value-format="YYYY-MM-DD"></el-date-picker>
      </el-form-item>
      <el-form-item label="审核状态" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
        <el-tag class="ml-2" type="info" v-if="everApp">无提交</el-tag>
        <el-tag class="ml-2" type="success" v-if="stayApplication.stay_school_info_status==='1'&&!everApp">已通过</el-tag>
        <el-tag class="ml-2" type="warning" v-if="stayApplication.stay_school_info_status==='0'&&!everApp">待审核</el-tag>
        <el-tag class="ml-2" type="danger" v-if="stayApplication.stay_school_info_status==='2'&&!everApp">未通过</el-tag>
      </el-form-item>

      <el-form-item style="position: absolute; left:40%">
        <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>
        <el-button @click="uploadHandleClose">恢复</el-button>
      </el-form-item>
      <div style="height: 50px"></div>
    </el-form>
  </div>
</div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "stuApplication",
  data(){
    return{
      year:'',
      year2:'',
      yearTime:[
        {name:'暑假'},
        {name:'寒假'},
      ],
      user:{},
      stayApplication:{
        stay_school_info_no: "",
        stay_school_info_stu_no: "",
        stay_school_info_begin: "",
        stay_school_info_end: "",
        stay_school_info_reason: "",
        stay_school_info_status: "0",
        stay_school_info_time: "",
        stay_school_info_stuname: "",
        stay_school_info_stuclass: "",
      },
      stayApplicationCopy:{},
      everApp:true
    }
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem("user"))
    this.stayApplication.stay_school_info_stuname=this.user.stu_name
    this.stayApplication.stay_school_info_stu_no=this.user.stu_no+''
    this.stayApplication.stay_school_info_stuclass=this.user.stu_class
    this.getData()
  },
  methods:{
    getData(){
      request.post('/find_stayschool_byStudent',this.user).then(res=>{
        if(res.code===1){
          this.everApp=false
          this.stayApplication=res.data[0]
          this.year=this.stayApplication.stay_school_info_time.substr(0,4)
          this.year2=this.stayApplication.stay_school_info_time.substr(4,2)
        }
        this.stayApplicationCopy=JSON.parse(JSON.stringify(this.stayApplication))
      }).catch(err=>{
        this.$message.error("连接失败")
      })
    },
    onSubmit(){
      this.stayApplication.stay_school_info_time=this.year+this.year2
      this.stayApplication.stay_school_info_status='0'
      request.post('/upload_stayschool_info',this.stayApplication).then(res=>{
        this.$message.success(res.msg)
        this.getData()
      }).catch(err=>{
        this.$message.error("连接失败")
      })
    },
    uploadHandleClose(){
      this.stayApplication=JSON.parse(JSON.stringify(this.stayApplicationCopy))
      this.year=this.stayApplication.stay_school_info_time.substr(0,4)
      this.year2=this.stayApplication.stay_school_info_time.substr(4,2)
    },
  },
}
</script>

<style scoped>

</style>