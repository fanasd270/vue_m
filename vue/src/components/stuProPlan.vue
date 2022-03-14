<template>
  <div style="padding-left: 6%; padding-right: 6%;">

      <div style="width: 88%; margin-top: 30px; position: relative">
        <p style="margin-left: 30px; font-weight: bold; margin-bottom: 20px;">
          计划开展
        </p>
        <el-form  :model="plan" label-width="34%" :inline="true">
          <el-form-item label="类别" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-select v-model="plan.type" placeholder=" " :disabled="Edit[0]">
              <el-option label="科研" value="科研"></el-option>
              <el-option label="论文" value="论文"></el-option>
              <el-option label="竞赛" value="竞赛"></el-option>
              <el-option label="专利" value="专利"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="计划开展时间段" style="margin-bottom: 40px; width: 46%; margin-right: 2%;">
            <el-date-picker
                v-model="plan.time"
                type="monthrange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                value-format="YYYY-MM"
                :disabled="Edit[0]">
            </el-date-picker>
          </el-form-item>

          <br>
          <el-button style="position: relative; left:55%" v-if="isShow1[0]" @click="changeInfo(0)">修改</el-button>
          <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[0]">
            <el-button type="primary" @click="onSubmit(0)" style="margin-right: 50px">确认</el-button>
            <el-button @click="CancelInfo(0)">取消</el-button>
          </div>
        </el-form>

        <p style="margin-left: 30px; font-weight: bold; margin-bottom: 20px;">
          正在进行
        </p>
        <el-form  :model="doing" label-width="34%" :inline="true">
          <el-form-item label="类别" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
            <el-select v-model="doing.is_doing_category" placeholder=" " :disabled="Edit[1]">
              <el-option label="科研" value="科研"></el-option>
              <el-option label="论文" value="论文"></el-option>
              <el-option label="竞赛" value="竞赛"></el-option>
              <el-option label="专利" value="专利"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目名称" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">
            <el-input v-model="doing.is_doing_name" :disabled="Edit[1]"></el-input>
          </el-form-item>

          <el-form-item label="完成期限" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">
            <el-date-picker
                v-model="doing.is_doing_end"
                type="month"
                placeholder="选择月"
                value-format="YYYY-MM"
                :disabled="Edit[1]">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="指导老师" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">
            <el-input v-model="doing.is_doing_guide_teacher" :disabled="Edit[1]"></el-input>
          </el-form-item>

          <el-form-item label="团队成员" style="margin-bottom: 40px; width: 30%; margin-right: 2%;">
            <div v-for="(m,i) in doing.is_doing_member" v-if="teamShow">
              <el-input v-model="doing.is_doing_member[i]" :disabled="Edit[1]" style="width: 60%; margin-right: 3px"></el-input>
              <el-button type="danger" size="small"  circle @click="deleteTeam(i)" :disabled="Edit[1]">
                <el-icon><Delete/></el-icon>
              </el-button>
            </div>
            <el-button size="small" @click="addTeam" :disabled="Edit[1]">新增</el-button>
          </el-form-item>


          <br>
          <el-button style="position: relative; left:55%" v-if="isShow1[1]" @click="changeInfo(1)">修改</el-button>
          <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[1]">
            <el-button type="primary" @click="onSubmit(1)" style="margin-right: 50px">确认</el-button>
            <el-button @click="CancelInfo(1)">取消</el-button>
          </div>
        </el-form>
      </div>

      <div style="width: 100%;height: 10px"></div>

  </div>
</template>

<script>
import {Delete} from "@element-plus/icons";
import request from "@/utils/request";

export default {
  name: "stuProPlan",
 components:{
   Delete,
 },
  data(){
    return{
      user:{},
      Edit:[true,true],
      isShow1:[true,true],
      isShow2:[false,false],
      teamShow:[true],
      plan:{
        type:'',
        time:[],
      },
      planCopy:{},
      doing:{
        is_doing_no:null,
        is_doing_stu_no:'',
        is_doing_stu_name:'',
        is_doing_name:'',
        is_doing_category:'',
        is_doing_end:'',
        is_doing_member:[],
        is_doing_guide_teacher:'',
      },
      doingCopy:{},
    }
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.doing.is_doing_stu_no=this.user.stu_no+''
    this.doing.is_doing_stu_name=this.user.stu_name
    this.getData()
  },
  methods:{
    getData(){
      let u=JSON.parse(JSON.stringify(this.user))
      u.stu_no-=0
      request.post('/find_my_is_doing',u).then(res=>{
        if(res.data!==null){
          this.doing=res.data
        }
        console.log(res.data)
      }).catch(err=>{
        this.$message.error("访问错误")
      })
    },
    changeInfo(i){
      this.Edit[i]=false
      this.isShow1[i]=false
      this.isShow2[i]=true
      if(i===0){
        this.planCopy=JSON.parse(JSON.stringify(this.plan))
      }
      else{
        this.doingCopy=JSON.parse(JSON.stringify(this.doing))
      }
    },
    onSubmit(i){
      if(i===0){
        request.post('',this.plan).then(res=>{


          this.Edit[i]=true
          this.isShow1[i]=true
          this.isShow2[i]=false
          this.$message.success("修改成功")
        }).catch(err=>{
          this.$message.error("修改失败")
        })
      }else{
        request.post('/upload_is_doing',this.doing).then(res=>{

          console.log(this.doing)
          this.Edit[i]=true
          this.isShow1[i]=true
          this.isShow2[i]=false
          this.$message.success("修改成功")
        }).catch(err=>{
          this.$message.error("修改失败")
        })
      }
    },
    CancelInfo(i){
      this.Edit[i]=true
      this.isShow1[i]=true
      this.isShow2[i]=false
      if(i===0){
        this.plan=JSON.parse(JSON.stringify(this.planCopy))
      }
      else{
        this.doing=JSON.parse(JSON.stringify(this.doingCopy))
      }
    },
    deleteTeam(i){
      this.doing.is_doing_member.splice(i,1)
      this.teamShow=false
      this.$nextTick(()=>{
        this.teamShow=true
      })
    },
    addTeam(){
      this.doing.is_doing_member.push('')
      this.teamShow=false
      this.$nextTick(()=>{
        this.teamShow=true
      })
    },
  },
}
</script>

<style scoped>

</style>