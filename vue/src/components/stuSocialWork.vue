<template>
  <div style="min-height: 500px">
    <el-dialog
        v-model="dialogVisible"
        title="修改"
        width="30%"
    >
      <div>
        <el-form  :model="temp" label-width="34%">
          <el-form-item label="年度" style="margin-bottom: 40px; width: 80%; margin-right: 2%;">
            <el-date-picker
                v-model="temp.social_activity_start_time"
                type="year"
                value-format="YYYY"
                style="width: 48%">
            </el-date-picker>
            -
            <el-date-picker
                v-model="temp.social_activity_end_time"
                type="year"
                value-format="YYYY"
                style="width: 48%">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="职务" style="margin-bottom: 40px; margin-right: 2%; width: 80%">
            <el-input v-model="temp.social_activity_name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogCancle">取消</el-button>
        <el-button type="primary" @click="onsubmitWorks"
        >确认</el-button
        >
      </span>
      </template>
    </el-dialog>

    <el-button type="text" @click="dialogVisible = true">点击新建</el-button>
    <el-table :data="socialWords" style="width: 100%">
      <el-table-column label="年度" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.social_activity_start_time }}年-{{scope.row.social_activity_end_time}}年</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="职务" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.social_activity_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import timer from "@element-plus/icons/lib/Timer";
import request from "@/utils/request";

export default {
  name: "stuSocialWork",
  components:{
    timer,
  },
  data(){
    return{
      user:{},
      dialogVisible:false,
      socialWords:[],
      temp:{
        social_activity_no:null,
        social_activity_stu_no:'',
        social_activity_stu_name:'',
        social_activity_name:'',
        social_activity_start_time:'',
        social_activity_end_time:'',
      },
    }
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.temp.social_activity_stu_no=this.user.stu_no+''
    this.temp.social_activity_stu_name=this.user.stu_name
    // this.user.stu_no-=0
    this.getData()
  },
  methods:{
    dialogCancle(){
      this.dialogVisible=false
      this.index=null
      this.temp.social_activity_start_time=''
      this.temp.social_activity_end_time=''
      this.temp.social_activity_name=''
    },
    onsubmitWorks(){
      request.post('/uploadSocialActivity',this.temp).then(res=>{
        this.socialWords.push(JSON.parse(JSON.stringify(this.temp)))
        this.dialogVisible=false
        this.temp.social_activity_start_time=''
        this.temp.social_activity_end_time=''
        this.temp.social_activity_name=''
      }).catch(err=>{
        this.$message.error("上传失败")
      })

    },


    handleDelete(i,m){
      request.post('/deleteSocialActivity',m).then(res=>{
        this.socialWords.splice(i,1)
      }).catch(err=>{
        this.$message.error("删除失败")
      })
    },
    getData(){
      request.post('/find_my_social_activity_info',this.user).then(res=>{
        this.socialWords=res
      }).catch(err=>{
        this.$message.error("请求错误")
      })
    },


  },
}
</script>

<style scoped>

</style>