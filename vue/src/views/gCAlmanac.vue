<template>
<div style="position: relative; margin:20px 9% 0 9% ">
  <i style="background-color: blue;">
    <span style="opacity: 0">1</span>
  </i>
  <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
    年鉴
  </p>

  <el-drawer
      title="学生列表"
      v-model="drawer"
      direction="rtl"
  >
    <el-button v-if="buttonType===0" @click="downloadTemplateForGrant">导出</el-button>
    <el-button v-if="buttonType===1" @click="downloadTemplateForSchoolars">导出</el-button>
    <el-button v-if="buttonType===2" @click="downloadTemplateForSchoolarsB">导出</el-button>
    <span>已选:{{multipleSelection.length}}/{{tableData.length}}</span>
    <el-table ref="tableRef" @selection-change="handleSelectionChange" row-key="stu_no" :data="tableData" style="width: 100%" max-height="600">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column prop="stu_name" label="姓名" width="100" fixed/>
      <el-table-column
          prop="stu_no"
          label="学号"
          width="100"
          sortable
          column-key="stu_no"
      />
      <el-table-column
          prop="stu_class"
          label="班级"
          width="100"
          :filters="this.filterClass"
          :filter-method="filterClassHandler"
      />

    </el-table>
  </el-drawer>

  <div style="font-weight: 550; opacity: 0.9; margin-top: 20px">
    <el-col :span="16" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default;" @click="downloadAllStu" >
        <div class="ecard">
          <el-icon :size="30"><edit /></el-icon>
          <span style="position: absolute; top: 35%">本科生名单--辅导员</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px; margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="downloadClassStu">
        <div class="ecard">
          <el-icon :size="30"><timer /></el-icon>
          <span style="position: absolute; top: 35%">本科生名单--班主任</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px; margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="chooseStu(0)">
        <div class="ecard">
          <el-icon :size="30"><data-analysis /></el-icon>
          <span style="position: absolute; top: 35%">助学金模板</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="chooseStu(1)">
        <div class="ecard">
          <el-icon :size="30"><reading /></el-icon>
          <span style="position: absolute; top: 35%">奖学金模板</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="chooseStu(2)">
        <div class="ecard">
          <el-icon :size="30"><trophy /></el-icon>
          <span style="position: absolute; top: 35%">励志奖学金模板</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="downloadDormitory">
        <div class="ecard">
          <el-icon :size="30"><promotion /></el-icon>
          <span style="position: absolute; top: 35%">寝室信息</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="downloadHuXiInfo">
        <div class="ecard">
          <el-icon :size="30"><finished /></el-icon>
          <span style="position: absolute; top: 35%">虎溪管委会信息</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="jumpToLib">
        <div class="ecard">
          <el-icon :size="30"><school /></el-icon>
          <span style="position: absolute; top: 35%">图书管理</span>
        </div>
      </el-card>
    </el-col>
    <div style="clear: both"></div>
  </div>

</div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "gCAlmanac",
  data(){
    return{
      drawer: false,
      user:{},
      tableData:[],
      multipleSelection: [],
      filterClass:[],
      buttonType:0,
      teaAndStu:{
        teacherId:0,
        stuList:[],
      },
    }
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'));
    this.teaAndStu.teacherId=this.user.t_no
  },
  methods:{
    downloadAllStu(){
      request.post('/getStudentExcelInfoByGuidanceCounselor',this.user).then(res=>{
        this.downloadFile(res.data)
      }).catch(err=>{
        this.$message.error("下载失败")
      })
    },
    downloadClassStu(){
      request.post('/getStudentExcelInfoByHeadMaster',this.user).then(res=>{
        for(let i=0;i<res.data.length;i++){
          this.downloadFile(res.data[i])
        }
      }).catch(err=>{
        this.$message.error("下载失败")
      })
    },
    downloadTemplateForGrant(){
      let len=this.multipleSelection.length
      if(len===this.tableData.length){
        request.post('/getAllStudentInfoByTemplateForGrant',this.user).then(res=>{
          this.downloadFile(res.data)
          this.teaAndStu.stuList=[]
        }).catch(err=>{
          this.$message.error("下载失败")
        })
      } else {

        for(let i=0;i<len;i++){
          this.teaAndStu.stuList.push(this.multipleSelection[i].stu_no)
        }
        request.post('/getSomeStudentInfoByTemplateForGrant',this.teaAndStu).then(res=>{
          this.downloadFile(res.data)
          this.teaAndStu.stuList=[]
        }).catch(err=>{
          this.$message.error("下载失败")
        })
      }
    },
    downloadTemplateForSchoolars(){
      let len=this.multipleSelection.length
      if(len===this.tableData.length){
        request.post('/getAllStudentInfoByTemplateForSchoolars',this.user).then(res=>{
          this.downloadFile(res.data)
          this.teaAndStu.stuList=[]
        }).catch(err=>{
          this.$message.error("下载失败")
        })
      } else {

        for(let i=0;i<len;i++){
          this.teaAndStu.stuList.push(this.multipleSelection[i].stu_no)
        }
        request.post('/getSomeStudentInfoByTemplateForSchoolars',this.teaAndStu).then(res=>{
          this.downloadFile(res.data)
          this.teaAndStu.stuList=[]
        }).catch(err=>{
          this.$message.error("下载失败")
        })
      }
    },
    downloadTemplateForSchoolarsB(){
      let len=this.multipleSelection.length
      if(len===this.tableData.length){
        request.post('/getAllStudentInfoByTemplateForSchoolarsB',this.user).then(res=>{
          this.downloadFile(res.data)
          this.teaAndStu.stuList=[]
        }).catch(err=>{
          this.$message.error("下载失败")
        })
      } else {

        for(let i=0;i<len;i++){
          this.teaAndStu.stuList.push(this.multipleSelection[i].stu_no)
        }
        request.post('/getSomeStudentInfoByTemplateForSchoolarsB',this.teaAndStu).then(res=>{
          this.downloadFile(res.data)
          this.teaAndStu.stuList=[]
        }).catch(err=>{
          this.$message.error("下载失败")
        })
      }
    },
    downloadDormitory(){
      request.post('/getStudentBedroomInfo',this.user).then(res=>{
        this.downloadFile(res.data)
      }).catch(err=>{
        this.$message.error("下载失败")
      })
    },
    downloadHuXiInfo(){
      request.post('/getHuxiInfo',this.user).then(res=>{
        for(let i=0;i<res.data.length;i++){
          this.downloadFile(res.data[i])
        }
      }).catch(err=>{
        this.$message.error("下载失败")
      })
    },
    downloadFile(url){
      const iframe = document.createElement("iframe");
      iframe.style.display = "none"; // 防止影响页面
      iframe.style.height = 0; // 防止影响页面
      iframe.src = 'http://10.236.11.68:9876/excel/'+url;
      document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
      // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
      setTimeout(()=>{
        iframe.remove();
      }, 5 * 60 * 1000);
    },
    // downloadFile(url){
    //   window.location.href='http://10.236.11.68:9876/excel/'+url
    // },

    handleSelectionChange(val){
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    filterClassHandler(value, row, column){
      const property = column['property']
      return row[property] === value
    },

    chooseStu(num){
      this.buttonType=num
      this.drawer=true

      request.post('/Stu/stuList', this.user).then(res=>{
        this.tableData=res
      }).catch(err=>{
        this.$message.error("学生信息请求错误")
      })

      request.post('/classList', this.user).then(res=>{
        for(let i=0; i<res.length; i++){
          this.filterClass.push({text:res[i].class_name, value: res[i].class_name})
        }

      }).catch(err=>{
        this.$message.error("班级信息请求错误")
      })


    },

  },
}
</script>

<style scoped>

</style>