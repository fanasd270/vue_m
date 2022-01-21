<template>
  <div style="padding-left: 6%; padding-right: 6%;">
    <div style="margin-bottom: 10px; margin-top: 20px;">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline">
        个人信息管理
      </p>
    </div>
    <div style="border: dimgray solid">
      <div style="width: 88%; margin-top: 30px; position: relative">
        <p style="margin-left: 30px; font-weight: bold; margin-bottom: 20px;">
          基本信息
        </p>
        <el-form  :model="form" label-width="34%" :inline="true">
          <el-form-item label="姓名" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-input v-model="form.stu_name" disabled></el-input>
          </el-form-item>

          <el-form-item label="性别" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
            <el-radio-group v-model="form.stu_gender" disabled>
              <el-radio  :label=1>男</el-radio>
              <el-radio  :label=0>女</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="班级" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">
            <el-input v-model="form.stu_class" disabled></el-input>
          </el-form-item>

          <el-form-item label="出生日期" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
            <el-input v-model="form.stu_birthday" disabled></el-input>
          </el-form-item>

          <el-form-item label="学号" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-input v-model="form.stu_no" disabled></el-input>
          </el-form-item>

          <el-form-item label="民族" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-input v-model="form.stu_ethnic" disabled></el-input>
          </el-form-item>

          <el-form-item label="籍贯" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-input v-model="form.stu_origin" :disabled="Edit"></el-input>
          </el-form-item>

          <el-form-item label="政治面貌"  style="margin-right: 2%; width: 23%; margin-bottom: 40px;" >
            <el-select v-model="form.stu_politicalface" placeholder=" " :disabled="Edit">
              <el-option label="群众" value="群众"></el-option>
              <el-option label="共青团员" value="共青团员"></el-option>
              <el-option label="中共党员" value="中共党员"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="党团时间" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-col :span="11">
              <el-date-picker
                  v-model="form.stu_caucus_time"
                  :disabled="Edit"
                  type="date"
                  style="width: 220%"
              ></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="身份证号" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-input v-model="form.stu_id" disabled></el-input>
          </el-form-item>

          <el-form-item label="常驻地址" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-input v-model="form.stu_address" :disabled="Edit"></el-input>
          </el-form-item>

          <el-form-item label="是否港澳" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-radio-group v-model="form.stu_ismacau" disabled>
              <el-radio :label=0>否</el-radio>
              <el-radio :label=1>是</el-radio>
            </el-radio-group>
          </el-form-item>

          <p style="margin-left: 30px; font-weight: bold; margin-bottom: 20px">
            联系信息
          </p>



          <el-form-item label="电话" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-input v-model="form.stu_telephone" :disabled="Edit"></el-input>
          </el-form-item>

          <el-form-item label="QQ" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-input v-model="form.stu_qq" :disabled="Edit"></el-input>
          </el-form-item>

          <el-form-item label="E-mail" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-input v-model="form.stu_email" :disabled="Edit"></el-input>
          </el-form-item>

          <br>

          <el-form-item label="父亲电话" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-input v-model="form.stu_email" :disabled="Edit"></el-input>
          </el-form-item>

          <br>

          <el-form-item label="母亲电话" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-input v-model="form.stu_email" :disabled="Edit"></el-input>
          </el-form-item>



          <br>
            <el-button style="position: relative; left:55%" v-if="isShow1" @click="changeData">修改</el-button>
          <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2">
            <el-button type="primary" @click="onSubmit" style="margin-right: 50px">确认</el-button>
            <el-button @click="Cancel">取消</el-button>
          </div>
        </el-form>
      </div>

      <div style="width: 100%;height: 50px"></div>

    </div>
  </div>
</template>

<script>


import request from "@/utils/request";
import {Avatar} from "@element-plus/icons-vue";

export default {
  name: 'Home',
  components: {
    Avatar,
  },

  data(){
    return{
      Edit:true,
      isShow1:true,
      isShow2:false,
      form:{
          stu_address: "重庆大学",
          stu_birthday: "1995-12-26",
          stu_caucus_time: "2021",
          stu_class: "1",
          stu_email: "ch@163",
          stu_ethnic: "汉族",
          stu_gender: 0,
          stu_id: "522321",
          stu_ismacau: 1,
          stu_name: "李四",
          stu_no: 1231234,
          stu_origin: "四川成都",
          stu_password: "123456",
          stu_photourl: "WU",
          stu_politicalface: "党员",
          stu_qq: "122706559",
          stu_telephone: "135959002",
      },

    }
  },

  // created() {
  //   this.showOriginalData();
  // },

  methods:{

    showOriginalData(){
      // let userjava=JSON.parse(sessionStorage.getItem('user'))
      this.form=JSON.parse(sessionStorage.getItem('user'))

    },

      changeData(){
        this.Edit= false;
        this.isShow1=false;
        this.isShow2=true;
      },
    Cancel(){
      this.Edit= true;
      this.isShow1=true;
      this.isShow2=false;
      //根据本地数据恢复
      this.form=JSON.parse(sessionStorage.getItem('user'))
    },
    onSubmit(){
      this.form.stu_no=this.form.stu_no-0;
      this.form.stu_ismacau=this.form.stu_ismacau-0;
      this.form.stu_gender=this.form.stu_gender-0;
      let formstring=JSON.stringify(this.form);
      console.log("提交")
      console.log(formstring)
      request.post('/Stu/upDateStudent',formstring).then(res=>{
        console.log("结果")
        console.log(res);
        if(res.data===null){
          this.$message({
            type:"error",
            message:res.msg//后端给出的错误信息
          })

        } else {
          this.$message({
            type:"success",
            message:"修改成功"
          })
          this.Edit= true;
          this.isShow1=true;
          this.isShow2=false;
          sessionStorage.setItem('user',JSON.stringify(res.data));
          this.form=res.data;
        }

      });
    },
  }

}




</script>
