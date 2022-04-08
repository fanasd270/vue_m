<template>
  <div style="position: relative; margin:20px 0 0 9% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      管理授权
    </p>

    <br>
    <el-button @click="drawer=true" style="margin: 10px 0 5px 0">选择授权对象</el-button>
    <br>

    <el-tag type="success" v-if="multipleSelection.stu_name" style="margin-right: 5px">{{multipleSelection.stu_name}}</el-tag>

    <el-button type="text" v-if="multipleSelection.length!==0" @click="confirmTo">确认授权</el-button>

    <div style="font-weight: 550; opacity: 0.9; margin: 40px 30% 0 0">
      <el-col :span="16" style="width: 220px;margin: 0 20px 20px 0; position: relative">
        <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default;" @click="confirmToForm.authors[0]=!confirmToForm.authors[0]">
          <el-checkbox v-model="confirmToForm.authors[0]" size="large" style="position: absolute; top: 25%; right: 10%"></el-checkbox>
          <div class="ecard" style="display: inline-block">
            <el-icon :size="30"><edit /></el-icon>
            <span style="position: absolute; top: 35%">学生信息管理</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="width: 220px; margin: 0 20px 20px 0; position: relative">
        <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="confirmToForm.authors[1]=!confirmToForm.authors[1]">
          <el-checkbox v-model="confirmToForm.authors[1]" size="large" style="position: absolute; top: 25%; right: 10%"></el-checkbox>
          <div class="ecard">
            <el-icon :size="30"><timer /></el-icon>
            <span style="position: absolute; top: 35%">发布任务</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="width: 220px; margin: 0 20px 20px 0; position: relative">
        <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="confirmToForm.authors[2]=!confirmToForm.authors[2]">
          <el-checkbox v-model="confirmToForm.authors[2]" size="large" style="position: absolute; top: 25%; right: 10%"></el-checkbox>
          <div class="ecard">
            <el-icon :size="30"><data-analysis /></el-icon>
            <span style="position: absolute; top: 35%">报表查看</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
        <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="confirmToForm.authors[3]=!confirmToForm.authors[3]">
          <el-checkbox v-model="confirmToForm.authors[3]" size="large" style="position: absolute; top: 25%; right: 10%"></el-checkbox>
          <div class="ecard">
            <el-icon :size="30"><reading /></el-icon>
            <span style="position: absolute; top: 35%">年鉴导出</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
        <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="confirmToForm.authors[4]=!confirmToForm.authors[4]">
          <el-checkbox v-model="confirmToForm.authors[4]" size="large" style="position: absolute; top: 25%; right: 10%"></el-checkbox>
          <div class="ecard">
            <el-icon :size="30"><trophy /></el-icon>
            <span style="position: absolute; top: 35%">查看学生成绩</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
        <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="confirmToForm.authors[5]=!confirmToForm.authors[5]">
          <el-checkbox v-model="confirmToForm.authors[5]" size="large" style="position: absolute; top: 25%; right: 10%"></el-checkbox>
          <div class="ecard">
            <el-icon :size="30"><promotion /></el-icon>
            <span style="position: absolute; top: 35%">下载中心</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
        <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="confirmToForm.authors[6]=!confirmToForm.authors[6]">
          <el-checkbox v-model="confirmToForm.authors[6]" size="large" style="position: absolute; top: 25%; right: 10%"></el-checkbox>
          <div class="ecard">
            <el-icon :size="30"><finished /></el-icon>
            <span style="position: absolute; top: 35%">审核学生表单</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
        <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="confirmToForm.authors[7]=!confirmToForm.authors[7]">
          <el-checkbox v-model="confirmToForm.authors[7]" size="large" style="position: absolute; top: 25%; right: 10%"></el-checkbox>
          <div class="ecard">
            <el-icon :size="30"><school /></el-icon>
            <span style="position: absolute; top: 35%">宿舍管理</span>
          </div>
        </el-card>
      </el-col>
      <div style="clear: both"></div>
    </div>

    <div style="margin-top: 10px">
      <span>已授权对象</span>
      <div style="margin-top: 5px">
        <el-tag type="success" size="large"
                v-if="whoHasauthorize.length!==0"
                v-for="(item) in whoHasauthorize"
                style="margin-right: 5px;cursor: default"
                @click="showPower(item)">
          {{item.stu_name}}
        </el-tag>
      </div>
    </div>

  <el-drawer
      title="学生列表"
      v-model="drawer"
      direction="rtl"
  >
    <el-button @click="drawer=false" style="margin-bottom: 5px">确定</el-button>
    <br>
    <span>已选:{{multipleSelection.stu_name}}</span>
    <br>
    <el-input
        v-model="searchInfo"
        placeholder="搜索学号或姓名"
        :prefix-icon="Search"
        style="width: 50%; margin: 5px 0 5px 0"
        @keyup.enter="searchFun"
        clearable
        @clear="clearSearch"
    />
    <el-button :icon="Search" circle size="small" @click="searchFun" style="margin-left: 5px"></el-button>
    <el-table ref="tableRef" highlight-current-row @current-change="handleCurrentChange" row-key="stu_no" :data="tableData" style="width: 100%" max-height="600">
      <el-table-column prop="stu_name" label="姓名" width="100" fixed/>
      <el-table-column
          prop="stu_no"
          label="学号"
          width="100"
          sortable
          column-key="stu_no"
      />


    </el-table>
  </el-drawer>
</div>

  <el-dialog
      v-model="showOnesAuthors"
      title="详细权限"
      width="30%"
  >
    <el-tag v-if="onesAuthors[0]" style="margin-right: 20px" size="large">信息管理</el-tag>
    <el-tag v-if="onesAuthors[1]" style="margin-right: 20px" size="large">发布任务</el-tag>
    <el-tag v-if="onesAuthors[2]" style="margin-right: 20px" size="large">报表查看</el-tag>
    <el-tag v-if="onesAuthors[3]" style="margin-right: 20px" size="large">年鉴导出</el-tag>

    <el-tag v-if="onesAuthors[4]" style="margin: 5px 20px 0 0" size="large">查看成绩</el-tag>
    <el-tag v-if="onesAuthors[5]" style="margin: 5px 20px 0 0" size="large">下载中心</el-tag>
    <el-tag v-if="onesAuthors[6]" style="margin: 5px 20px 0 0" size="large">审核表单</el-tag>
    <el-tag v-if="onesAuthors[7]" style="margin: 5px 20px 0 0" size="large">宿舍管理</el-tag>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelOnesAuthors">撤销权限</el-button>
        <el-button @click="showOnesAuthors = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import request from "@/utils/request";
import UserFilled, {Search} from "@element-plus/icons";
import bellFilled from "@element-plus/icons/lib/BellFilled";
import infoFilled from "@element-plus/icons/lib/InfoFilled";
import finished from "@element-plus/icons/lib/Finished";
import edit from "@element-plus/icons/lib/Edit";
import reading from "@element-plus/icons/lib/Reading";
import trophy from "@element-plus/icons/lib/Trophy";
import bell from "@element-plus/icons/lib/Bell";
import school from "@element-plus/icons/lib/School";
import chatDotRound from "@element-plus/icons/lib/ChatDotRound";
import promotion from "@element-plus/icons/lib/Promotion";
import dataAnalysis from "@element-plus/icons/lib/DataAnalysis";
import timer from "@element-plus/icons/lib/Timer";

export default {
  name: "gCAM",
  inject:['reload'],
  data(){
    return{
      user:'',
      drawer:false,
      tableData:[],
      tableDataCopy:[],
      multipleSelection:[],
      searchInfo:'',
      confirmToForm:{
        teacher:{},
        student:{},
        authors:[false,false,false,false,false,false,false,false],
      },
      whoHasauthorize:[],
      singleMan:{},
      onesAuthors:[],
      showOnesAuthors:false,
    }
  },
  setup(){
    return{
      Search
    }
  },
  components: {
    bellFilled,
    infoFilled,
    UserFilled,
    finished,
    edit,
    reading,
    trophy,
    bell,
    school,
    chatDotRound,
    promotion,
    dataAnalysis,
    timer,
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.confirmToForm.teacher=this.user
    this.getData()
  },
  methods:{
    reflesh(){
      this.reload()
    },
    showPower(item){
      this.singleMan=item
      request.post('/Tea/haswhatAuthorize',item).then(res=>{
        this.onesAuthors=res.data
        this.showOnesAuthors=true
      }).catch(err=>{
        this.$message.error("连接错误")
      })
    },
    cancelOnesAuthors(){
      request.post('/Tea/unauthorize',this.singleMan).then(res=>{
        this.$message.success("撤销成功")
        this.reflesh()
        this.showOnesAuthors=false
      }).catch(err=>{
        this.$message.error("连接错误")
      })
    },
    confirmTo(){
      request.post('/Tea/authorize',this.confirmToForm).then(res=>{
        this.$message.success("授权成功")
        this.reflesh()
      }).catch(err=>{
        this.$message.error("连接错误")
      })
    },
    //搜索
    searchFun(){
      let fuzzy=this.searchInfo
      if(fuzzy){
        this.tableData=this.tableDataCopy.filter((value)=>{
          return value.stu_name.includes(fuzzy)||value.stu_no===fuzzy-0
        })
      }else{
        this.tableData=JSON.parse(JSON.stringify(this.tableDataCopy))
      }
    },
    //清空搜索
    clearSearch(){
      this.tableData=JSON.parse(JSON.stringify(this.tableDataCopy))
    },
    handleCurrentChange(val){
      this.multipleSelection = val;
      this.confirmToForm.student=this.multipleSelection
    },
    getData(){
      request.post('/Stu/stuList', this.user).then(res=>{
        this.tableData=res
        this.tableDataCopy=JSON.parse(JSON.stringify(this.tableData))
      }).catch(err=>{
        this.$message.error("学生信息请求错误")
      })

      request.post('/Tea/whoHasauthorize',this.user).then(res=>{
        this.whoHasauthorize=res.data
      }).catch(err=>{
        this.$message.error("连接错误")
      })
    },
  },
}
</script>

<style scoped>

</style>