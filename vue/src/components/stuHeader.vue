<template>
  <el-card class="box-card" style=" height: 60px; position: relative" :body-style="{padding:0}">
    <div>
        <span style="margin-left: 30px" @click="backHome">
          <el-tooltip
              class="box-item"
              effect="dark"
              :content="contentText"
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
            v-if="user.stu_photourl!=null&&user.stu_photourl!==''"
            style="width: 50px; height: 50px; border-radius: 50%;"
            :src="headUrl"
            @error="noPicture"
        ></el-image>
        <div style="margin-top: 20px" v-if="user.stu_photourl===null||user.stu_photourl===''">上传头像</div>
      </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-upload
                  class="upload-demo"
                  action="http://10.236.11.68:8080/Stu/upLoadPicture"
                  :http-request="stuUploadHead"
                  :on-success="headUpdate"
                  :show-file-list=false
              >
                <el-dropdown-item :disabled="userFamily.type==='fam'">更改头像</el-dropdown-item>
              </el-upload>
              <el-dropdown-item @click="changePassword" :disabled="userFamily.type==='fam'">更改密码</el-dropdown-item>
              <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>

    </div>

    <el-dialog v-model="dialogVisible" title="更改密码" width="30%" :before-close="handleClose">

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
import request from "@/utils/request";
import {ElMessage} from "element-plus/es/components";
import fileApi from "@/components/Store"

export default {
  name: "stuHeader",
  inject:['reload'],
  components:{
    bellFilled,
    infoFilled,
    UserFilled,
  },
  data() {
    return{
      Avatar,
      Lock,
      contentText:null,
      form:{},
      user:{},
      userFamily:{},
      dialogVisible:false,
      headUrl:'',
    }
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.userFamily=JSON.parse(sessionStorage.getItem('family'))
    if(this.userFamily.type==="stu"){
      this.contentText="点击返回主页"
    } else {
      this.contentText="点击退出登录"
    }
    this.updateUrl()
  },
  methods: {
    jumpToIntro(){
      this.$router.push("/stuLayout/stuAboutUs")
    },
    reflesh(){
      this.reload()
    },
    noPicture(){

    },
    changePassword(){
      this.dialogVisible=true
      this.form.no=this.user.stu_no
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
      sessionStorage.clear()
      this.$router.push("/Login")
    },
    backHome(){
      if(this.userFamily.type==='stu'){
        this.$router.push("/stuHome")
      }else{
        this.loginOut()
      }
    },
    headUpdate(res){
      this.user.stu_url=res.stu_url;
      sessionStorage.setItem(user,this.user);
      this.$message.success('头像更改成功')
    },
    stuUploadHead(param){
      const formData=new FormData()
      formData.append('file', param.file)
      request.post('/Stu/upLoadPicture', formData).then(res=>{
        this.user.stu_photourl=res.data
        this.user.stu_no=this.user.stu_no-0;
        this.user.stu_ismacau=this.user.stu_ismacau-0;
        this.user.stu_gender=this.user.stu_gender-0;
        let formstring=JSON.stringify(this.user);
        request.post('/Stu/upDateStudent',formstring).then(res=>{
          if(res.data===null){
            this.$message({
              type:"error",
              message:res.msg//后端给出的错误信息
            })
          }else {
            this.$message({
              type:"success",
              message:"修改成功"
            })
            sessionStorage.setItem('user',JSON.stringify(res.data));
            this.user=res.data;
            this.updateUrl()
          }

        });

      })
    },
    updateUrl(){
      this.headUrl=fileApi.fileApi+'/Pictures/'+this.user.stu_photourl
    },
  },
}
</script>

<style scoped>

</style>