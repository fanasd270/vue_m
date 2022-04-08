<template>
<div style="height:80px; line-height: 80px; border-bottom: 1px solid #ccc; display: flex">
  <div style="width: 200px; padding-left: 30px; font-weight: bold; color: blue">本科生</div>
  <div style="flex: 1"></div>
  <div style="width: 100px">
    <el-dropdown>
      <span class="el-dropdown-link">
        更多
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="dialogVisible=true">更改密码</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
    </el-dropdown>
  </div>



  <el-dialog v-model="dialogVisible" title="更改密码" width="30%" :before-close="handleClose">

    <el-form :model="form" label-width="120px">
      <el-form-item label="账号">
        <el-input v-model="form.stu_no" :prefix-icon="Avatar"></el-input>
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
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="changeP">Confirm</el-button>
      </span>
    </template>
  </el-dialog>

</div>
</template>

<script>
import request from "@/utils/request";
import {ElMessage} from "element-plus/es/components";
import {Avatar,Lock} from "@element-plus/icons-vue"

export default {
  name: "Header",
  data() {
    return{
      Avatar,
      Lock,
      form:{
        stu_no:'',
        old_password:'',
        new_password:'',
        stu_confirmNew:'',
      },
      dialogVisible:false,
    }
  },
  methods: {
    changeP(){
      if(this.form.new_password===this.form.stu_confirmNew)
      {
        this.dialogVisible = false;
        this.form.stu_no=this.form.stu_no-0;
        let formstring=JSON.stringify(this.form);
        request.post("/updatepassword", formstring).then(res=>{
          if(res.data===null)
          {
            ElMessage.error('密码错误')
          } else {
            ElMessage('修改成功')
          }
        })
      } else{
          ElMessage.error('新密码输入不一致！')
      }
    },
  },
}
</script>

<style scoped>

</style>