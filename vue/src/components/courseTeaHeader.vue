<template>
  <el-card class="box-card" style=" height: 60px; position: relative" :body-style="{padding:0}">
    <div>
        <span style="margin-left: 30px" @click="backHome">
          <el-tooltip
              class="box-item"
              effect="dark"
              content="点击返回主页"
              placement="bottom-start"
          >
        <el-image
            style="width: 30px; height: 30px; border-radius: 50%; margin: 10px 10px 10px 10px"
            :src="require('../assets/home.png')"
            fit="fill"
        ></el-image>
      </el-tooltip>
          <span style="position: absolute; top:15px;margin-left: 20px; font-weight: bold; cursor: default">
            智慧校园平台
          </span>
        </span>

      <span style="position: absolute; top:18px; right:100px;margin-right: 20px;">
<!--        <el-icon style="margin-right: 20px;" size="20px"><bell-filled /> </el-icon>-->
        <el-icon style="margin-right: 20px" size="20px" @click="jumpToIntro"><info-filled /></el-icon>
      </span>
      <span style="position: absolute; right:65px">
        <el-dropdown>
      <span class="el-dropdown-link" style="margin-bottom: 30px">
        <el-image
            style="width: 50px; height: 50px; border-radius: 50%;"
            :src="require('../assets/logo-xiaohui.png')"
            fit="fill"
        ></el-image>
      </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-upload
                  class="upload-demo"
                  action="http://10.236.11.12:8080/Stu/upLoadPicture"
                  on-success="headUpdate"
              >
                <el-dropdown-item disabled>更改头像</el-dropdown-item>
              </el-upload>
              <el-dropdown-item @click="dialogShow">更改密码</el-dropdown-item>
              <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>

    </div>

    <el-dialog v-model="dialogVisible" title="更改密码" width="30%">

      <el-form :model="form" label-width="120px">
        <el-form-item label="账号">
          <el-input v-model="form.no" :prefix-icon="Avatar" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.old_password" show-password :prefix-icon="Lock"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.new_password" show-password :prefix-icon="Lock"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="form.stu_confirmNew" show-password :prefix-icon="Lock"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="changeCancel">取消</el-button>
        <el-button type="primary" @click="changeP">确认</el-button>
      </span>
      </template>
    </el-dialog>

  </el-card>
</template>

<script>
import bellFilled from "@element-plus/icons/lib/BellFilled";
import infoFilled from "@element-plus/icons/lib/InfoFilled";
import UserFilled from "@element-plus/icons";
import {Avatar, Lock} from "@element-plus/icons-vue";
import router from "@/router";
import request from "@/utils/request";
import {ElMessage} from "element-plus/es/components";

export default {
  name: "courseTeaHeader",
  components:{
    bellFilled,
    infoFilled,
    UserFilled,
  },
  data() {
    return{
      Avatar,
      Lock,
      form:{},
      user:{},
      dialogVisible:false,
    }
  },
  created() {
    let userjson=sessionStorage.getItem("user")
    if(!userjson) {
      router.push("/Login")
    }
  },
  methods: {
    jumpToIntro(){
      this.$router.push("/courseTeaLayout/courseTeaAboutUs")
    },
    dialogShow(){
      this.form.no=this.user.t_no
      this.dialogVisible=true
    },
    changeP(){
      if(this.form.new_password===this.form.stu_confirmNew)
      {
        this.form.no=this.form.no-0;
        let formstring=JSON.stringify(this.form);
        request.post("/Stu/upDatePassword", formstring).then(res=>{
          if(res.data===null)
          {
            ElMessage.error('密码错误')
          } else {
            this.dialogVisible = false;
            this.form={};
            ElMessage('修改成功')
            this.loginOut()
          }
        })
      } else{
        ElMessage.error('新密码输入不一致！')
      }
    },
    changeCancel(){
      this.dialogVisible = false;
      this.form={};
    },
    loginOut(){
      request.post('/logout').then(res=>{
        if(res.code===0){

        }else{
          this.$message.error('未注销成功，账号可能存在安全隐患')
        }
      })

      sessionStorage.removeItem("user")
      this.$router.push("/Login")
    },
    backHome(){

      this.$router.push("/teaHome")
    },
    headUpdate(res){
      this.user.stu_url=res.stu_url;
      sessionStorage.setItem(user,this.user);
    },
  },
}
</script>

<style scoped>

</style>