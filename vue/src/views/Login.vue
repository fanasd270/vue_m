<template>
  <div style="width: 100%; height: 100vh; overflow:hidden" class="note" :style="note">

    <div style="width: 400px; position:absolute;right:10%;top: 20%; margin: auto; ">
      <el-card class="box-card" >
        <div class="text item">

          <div style="color:#000000;font-weight: bold ;font-size:30px; text-align: center; margin-bottom: 30px; cursor:default" >欢迎登录</div>
          <el-form ref="formRef" :model="form" >
            <el-form-item>
              <el-input v-model="form.user_id" :prefix-icon="Avatar"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.user_password" :prefix-icon="Lock" show-password @keyup.enter="login"></el-input>
            </el-form-item>
            <el-form-item>
              <div style="margin-left: 65px;">
                <el-radio-group v-model="form.user_type">
                  <el-radio :label=1 size="large" style="color: black">学生</el-radio>
                  <el-radio  :label=0 size="large" style="color: black">老师</el-radio>
                  <el-radio  :label=2 size="large" style="color: black">家长</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%" type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>

          <div>
            <span style="cursor:default">忘记密码？</span>
            <span style="color:dodgerblue; cursor: pointer" @click="changePassword">找回</span>
          </div>

        </div>
      </el-card>
    </div>

    <el-dialog
        v-model="dialogVisible"
        title="找回密码"
        width="30%"
    >
      <el-form  :model="cPasswaord">
        <el-form-item label="账号">
          <el-input v-model="cPasswaord.stu_no" placeholder="请输入需找回的账号" clearable/>
        </el-form-item>
        <el-form-item label="验证码" v-if="numInputShow" style="width: 60%">
          <el-input v-model="cPasswaord.stu_code" placeholder="邮箱验证码/区分大小写" clearable/>
        </el-form-item>
      </el-form>


      <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelChange">取消</el-button>
        <el-button @click="commitChange" v-if="commitCShow">找回</el-button>
        <el-button @click="commitNum" v-if="commitNShow">确认</el-button>
      </span>
      </template>
    </el-dialog>

    <el-dialog
        v-model="dialogVisible1"
        title="重置密码"
        width="30%"
    >

      <el-form  :model="updateP">
        <el-form-item label="新密码">
          <el-input v-model="updateP.new_password" placeholder="请输入新密码" clearable show-password/>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="comfirmP" placeholder="请确认密码" clearable show-password/>
        </el-form-item>
      </el-form>


      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible1=false">取消</el-button>
        <el-button @click="comfirm">确认</el-button>
      </span>
      </template>
    </el-dialog>

    <span style="position: absolute; bottom: 0; height: 20px;  text-align: center;line-height: 20px; background-color: aliceblue; font-size: 10px">历史登录人次:学生:{{numCount[0]}};老师:{{numCount[1]}}|今日登录人次:学生:{{numCount[2]}};老师:{{numCount[3]}}</span>


  </div>


</template>

<script>
import '@/assets/css/entypo.css';
import {Avatar,Lock} from "@element-plus/icons-vue"

import request from "@/utils/request";

export default {
  name: "Login",
  setup(){
    return {
      Avatar,
      Lock
    }

  },
  data(){
    return {
      dialogVisible:false,
      dialogVisible1:false,
      numInputShow:false,
      commitCShow:true,
      commitNShow:false,
      cPasswaord:{
        stu_no:null,
        stu_code:'',
      },
      updateP:{
        old_password:'',
        new_password:'',
        no:null,
      },
      comfirmP:'',
      form:{
        user_id:"",
        user_password:"",
        user_type:1,
      },
      note:{
        backgroundImage:"url("+require("../assets/background.png")+")",
        backgroundRepeat:"no-repeat",
        backgroundSize:"100% 100vh",
      },
      numCount:[],

    }
  },
  created() {
    this.numLogin()
  },
  methods:{
    changePassword(){
      this.commitCShow=true
      this.commitNShow=false
      this.numInputShow=false
      this.cPasswaord.stu_no=null
      this.cPasswaord.stu_code=''
      this.updateP.no=null
      this.updateP.old_password=''
      this.updateP.new_password=''
      this.dialogVisible=true
    },
    cancelChange(){
      this.dialogVisible=false
    },
    commitChange(){
      this.cPasswaord.stu_no=this.cPasswaord.stu_no-0
      request.post('/findpassword',this.cPasswaord).then(res=>{
        if(res.code===0){
          this.$message.error(res.msg)
        }
        else {
        this.$message.success(res.msg)
          this.commitCShow=false
          this.commitNShow=true
          this.numInputShow=true
        }
      })
    },
    commitNum(){
      request.post('/judgeemailcode',this.cPasswaord).then(res=>{
        if(res.code===0){
          this.$message.error(res.msg)
        }
        else{
          this.dialogVisible=false
          this.dialogVisible1=true
          this.updateP.old_password=this.cPasswaord.stu_code
          this.updateP.no=this.cPasswaord.stu_no
        }
      })
    },
    comfirm(){
      if(this.updateP.new_password===this.comfirmP){
        request.post('/passwordbyemail',this.updateP).then(res=>{
          this.$message.success("修改成功")
          this.dialogVisible1=false
        })
      }
      else{
        this.$message.error("两次密码输入不一致！")
      }
    },
    login(){
       this.form.user_id=this.form.user_id-0
       let formstring=JSON.stringify(this.form)
        request.post("/login", formstring).then(res=>{
          console.log(res)
        if(res.data===null){
          this.$message({
            type:"error",
            message:res.msg//后端给出的错误信息
          })
        }
        else{
          this.$message({
            type:"success",
            message:"登录成功"
          })
          sessionStorage.setItem("user",JSON.stringify(res.data))
          console.log(res.data)

          if(this.form.user_type===1){
            this.$router.push("/stuHome")//跳转至主页
          }
          else if(this.form.user_type===0){
            this.$router.push("/tealayout")//跳转至主页
          }

        }
      }).catch(err=>{
          this.$message({
            type:"error",
            message:"连接错误"
          })
        })
    },
    numLogin(){
      request.post('/count').then(res=>{
        this.numCount=res.data
        console.log(this.numCount)
      })
    },
  }
}

</script>

<style scoped>

</style>