<template>
  <div style="padding-left: 6%; padding-right: 6%;">
    <div style="margin-top: 30px">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline">
        教育经历
      </p>
    </div>

    <div style="border: dimgray solid; margin-top: 20px; min-height: 600px; position: relative">
      <div style="margin: 5px 9% 0 9%">

        <div>
          <el-date-picker
              style="vertical-align: top"
              v-model="singleInfo.educational_experience_fromto"
              type="monthrange"
              range-separator="至"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM"
              >
          </el-date-picker>

          <el-input v-model="singleInfo.educational_experience_school" style="width: 15%; margin-left: 5px; vertical-align: top" placeholder="学校"></el-input>

          <el-select v-model="singleInfo.educational_experience_identity" class="m-2" placeholder="身份" style="width: 15%; margin-left: 5px; vertical-align: top">
            <el-option
                key="学生"
                label="学生"
                value="学生"
            />
            <el-option
                key="其他"
                label="其他"
                value="其他"
            />
          </el-select>
          <el-button type="text" @click="insertInfo">新建</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'educational_experience_fromto', order: 'ascending' }">
          <el-table-column prop="educational_experience_fromto" :formatter="filterFrom" label="起始时间" width="150" sortable />
          <el-table-column prop="educational_experience_fromto" :formatter="filterTo" label="结束时间" width="120" />
          <el-table-column prop="educational_experience_school" label="学校" width="120" />
          <el-table-column prop="educational_experience_identity" label="身份" width="120" />

          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button type="text" size="small" @click="changeInfo(scope.row)"
              >修改</el-button
              >
              <el-button type="text" size="small" @click="deleteInfo(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
        v-model="dialogVisible"
        title="修改"
        width="50%"
    >
      <div>
        <el-date-picker
            style="vertical-align: top"
            v-model="singleChangeInfo.educational_experience_fromto"
            type="monthrange"
            range-separator="至"
            start-placeholder="起始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM"
        >
        </el-date-picker>

        <el-input v-model="singleChangeInfo.educational_experience_school" style="width: 15%; margin-left: 5px; vertical-align: top" placeholder="学校"></el-input>

        <el-select v-model="singleChangeInfo.educational_experience_identity" class="m-2" placeholder="身份" style="width: 15%; margin-left: 5px; vertical-align: top">
          <el-option
              key="学生"
              label="学生"
              value="学生"
          />
          <el-option
              key="其他"
              label="其他"
              value="其他"
          />
        </el-select>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmChange"
        >确认</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import StuForeign from "@/components/stuForeign";
import StuTiCe from "@/components/stuTiCe";
import request from "@/utils/request";
export default {
  name: "stuEduExp",

  data(){
    return{
      user:{},
      singleInfo:{
        educational_experience_no: "",
        educational_experience_stu_no: "",
        educational_experience_school: "",
        educational_experience_identity: "",
        educational_experience_fromto: [],
      },
      dialogVisible:false,
      tempIndex:0,
      singleChangeInfo:{
        educational_experience_no: "",
        educational_experience_stu_no: "",
        educational_experience_school: "",
        educational_experience_identity: "",
        educational_experience_fromto: [],
      },
      tableData:[],
    }
  },

  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'));
    this.singleInfo.educational_experience_stu_no=this.user.stu_no+''
    this.getData()
  },
  methods:{
    confirmChange(){
      this.tableData[this.tempIndex]=JSON.parse(JSON.stringify(this.singleChangeInfo))
      this.tableData[this.tempIndex].educational_experience_fromto=this.tableData[this.tempIndex].educational_experience_fromto[0]+this.tableData[this.tempIndex].educational_experience_fromto[1]
      this.updateInfo()
      this.dialogVisible=false
    },
    changeInfo(row){
      this.tempIndex=this.tableData.indexOf(row)
      this.singleChangeInfo.educational_experience_stu_no=row.educational_experience_stu_no
      this.singleChangeInfo.educational_experience_school=row.educational_experience_school
      this.singleChangeInfo.educational_experience_identity=row.educational_experience_identity
      this.singleChangeInfo.educational_experience_fromto[0]=row.educational_experience_fromto.substring(0,7)
      this.singleChangeInfo.educational_experience_fromto[1]=row.educational_experience_fromto.substring(7,14)
      this.dialogVisible=true
    },
    deleteInfo(row){
      this.tableData.splice(this.tableData.indexOf(row),1)
      this.updateInfo()
    },
    insertInfo(){
      let singleCopy=JSON.parse(JSON.stringify(this.singleInfo))
      if(singleCopy.educational_experience_fromto.length!==2){
        this.$message.warning('完整请填写信息')
        return
      }
      singleCopy.educational_experience_fromto=singleCopy.educational_experience_fromto[0]+singleCopy.educational_experience_fromto[1]
      if(singleCopy.educational_experience_school===''||singleCopy.educational_experience_identity===''){
        this.$message.warning('完整请填写信息')
        return
      }
      this.tableData.push(singleCopy)
      this.updateInfo()
    },
    filterFrom(val){
      return val.educational_experience_fromto.substring(0,7)
    },
    filterTo(val){
      return val.educational_experience_fromto.substring(7,14)
    },
    updateInfo(){
      let singleCopy={educational_experience_stu_no:this.user.stu_no+''}
      request.post('/deleteEducationalExperience',singleCopy).then(res=>{
        for(let item in this.tableData){
          this.tableData[item].educational_experience_no=''
          request.post('/uploadeducationalExperience',this.tableData[item]).then(res=>{

          }).catch(err=>{
            this.$message.error('更新失败')
          })
        }
        this.singleInfo.educational_experience_school=''
        this.singleInfo.educational_experience_identity=''
        this.singleInfo.educational_experience_fromto=''
      })
    },
    getData(){
      request.post('/findEducationalExperienceByStudent',this.user).then(res=>{
        console.log(res)
        this.tableData=res.data
      })
    },
  },
}
</script>

<style scoped>

</style>