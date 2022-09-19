<template>
<div v-if="fresh">
  <div>待审核:</div>
  <el-scrollbar height="70vh">
    <el-empty description="暂无信息" v-if="noInfo"></el-empty>
    <div v-for="(m,index) in patentToDo">
      <transition name="el-fade-in-linear">
        <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="patentToDoShow[index]">
          <span style="font-weight: bold; margin-right: 2%">姓名：{{m.data.patent_stu_name}}</span>
          <span style="font-weight: bold;">学号：{{m.data.patent_stu_no}}</span>
          <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
            <el-descriptions-item label="专利名称:">{{m.data.patent_name}}</el-descriptions-item>
            <el-descriptions-item label="专利类型:">{{m.data.patent_type}}</el-descriptions-item>
            <el-descriptions-item label="专利申请号:">{{m.data.patent_application_no}}</el-descriptions-item>
            <el-descriptions-item label="专利申请日:">{{m.data.patent_application_time}}</el-descriptions-item>
            <el-descriptions-item label="专利证书号:">{{m.data.patent_certificate_no}}</el-descriptions-item>
            <el-descriptions-item label="专利获权时间:">{{m.data.patent_authorization_time}}</el-descriptions-item>
            <el-descriptions-item label="是否第一发明人:">{{m.data.patent_isfirstone}}</el-descriptions-item>
            <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadPatent(m.data.patent_supporting_materials)">点击下载</span></el-descriptions-item>
          </el-descriptions>
          <el-button @click="passPatent(index)">通过</el-button>
          <el-button @click="rejectReason(index)">驳回</el-button>
          <el-button @click="waitPatent(index)">稍后</el-button>
          <el-button @click="changeInfo(m)">修改</el-button>
          <span style="margin-left: 5px">认定时间:</span>
          <span style="color:cornflowerblue;">{{m.data.patent_year.substring(0,4)}}</span>
        </el-card>
      </transition>
    </div>
    <el-dialog
        v-model="rejectReasonDia"
        title="驳回理由"
        width="30%"
    >
      <el-input v-model="rejectItem.reason"></el-input>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="rejectReasonDia = false">取消</el-button>
        <el-button v-if="rejectType==='toDo'" type="primary" @click="rejectPatent(rejectIndex)">确认</el-button>
        <el-button v-if="rejectType==='did'" type="primary" @click="rejectPatentDid(rejectIndex)">确认</el-button>
      </span>
      </template>
    </el-dialog>

      <el-dialog
          title="修改"
          v-model="dialogVisible"
          width="50%"
          :before-close="patentHandleClose">

        <el-form ref="form" :model="patentForm" style="margin:30px 0 0 60px; font-weight: bold">

          <el-form-item label="专利名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="patentForm.patent_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="专利类型" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="patentForm.patent_type" clearable></el-input>
          </el-form-item>
          <el-form-item label="专利申请号" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="patentForm.patent_application_no" clearable></el-input>
          </el-form-item>
          <el-form-item label="专利申请日" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="patentForm.patent_application_time" clearable></el-input>
          </el-form-item>
          <el-form-item label="专利证书号" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="patentForm.patent_certificate_no" clearable></el-input>
          </el-form-item>
          <el-form-item label="专利获权时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="patentForm.patent_authorization_time" clearable></el-input>
          </el-form-item>
          <el-form-item label="是否第一发明人" style="width: 46%; margin-bottom: 40px; margin-right: 2%;">
            <el-radio-group v-model="patentForm.patent_isfirstone">
              <el-radio  label="是">是</el-radio>
              <el-radio  label="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="认定时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
            <el-input v-model="patentForm.patent_year" clearable></el-input>
<!--            <el-date-picker v-model="patentForm.patent_year" type="year" placeholder="上报学院年份" value-format="YYYY"></el-date-picker>-->
          </el-form-item>

          <el-form-item style="position: absolute; left:40%">
            <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>
            <el-button @click="patentHandleClose">取消</el-button>
          </el-form-item>
          <div style="height: 50px"></div>
        </el-form>

      </el-dialog>
  </el-scrollbar>

  <!--        历史-->
  <div style="width: 100%; height: 3px; background-color: lightblue"></div>
  <div>历史:</div>
  <el-scrollbar height="70vh">
    <div v-for="(m,index) in patentDid">
      <transition name="el-fade-in-linear">
        <el-card class="box-card" style="margin: 10px 5px 0 5px" v-if="patentDidShow[index]">
          <span style="font-weight: bold; margin-right: 2%">姓名：{{m.data.patent_stu_name}}</span>
          <span style="font-weight: bold;">学号：{{m.data.patent_stu_no}}</span>
          <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
            <el-descriptions-item label="专利名称:">{{m.data.patent_name}}</el-descriptions-item>
            <el-descriptions-item label="专利类型:">{{m.data.patent_type}}</el-descriptions-item>
            <el-descriptions-item label="专利申请号:">{{m.data.patent_application_no}}</el-descriptions-item>
            <el-descriptions-item label="专利申请日:">{{m.data.patent_application_time}}</el-descriptions-item>
            <el-descriptions-item label="专利证书号:">{{m.data.patent_certificate_no}}</el-descriptions-item>
            <el-descriptions-item label="专利获权时间:">{{m.data.patent_authorization_time}}</el-descriptions-item>
            <el-descriptions-item label="是否第一发明人:">{{m.data.patent_isfirstone}}</el-descriptions-item>
            <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadPatent(m.data.patent_supporting_materials)">点击下载</span></el-descriptions-item>
          </el-descriptions>
          <el-tag type="success" v-if="m.data.patent_status==='1'">已通过</el-tag>
          <el-tag type="danger" v-if="m.data.patent_status==='2'">已驳回</el-tag>
          <span style="margin-left: 5px">认定时间:</span>
          <span style="color:cornflowerblue;">{{m.data.patent_year.substring(0,4)}}</span>
          <!--                <el-button @click="passPaper(index)">通过</el-button>-->
          <el-button style="margin-left: 5px" v-if="m.data.patent_status==='1'" @click="rejectReason_did(index)">驳回</el-button>
          <el-button v-if="m.data.patent_status==='1'" @click="changeInfo(m)">修改</el-button>
          <!--                <el-button @click="waitPaper(index)">稍后</el-button>-->
          <div v-if="m.data.patent_status==='2'">
            驳回理由:{{m.reason}}
          </div>
        </el-card>
      </transition>
    </div>
  </el-scrollbar>
</div>
</template>

<script>
import request from "@/utils/request";
import fileApi from "@/components/Store";

export default {
  name: "gCAuditPatent",

  data(){
    return{
      rejectReasonDia:false,
      rejectType:'',
      rejectIndex:0,
      rejectItem:{},
      user:{},
      power:{},
      numShow:false,//是否显示红点
      toDoNum:0,//红点数
      noInfo:false,
      patentToDoShow:[],
      patentDidShow:[],
      patentToDo:[],//待审核列表
      patentDid:[],
      fresh:true,
      Fapi:'',

      patentForm:{},
      dialogVisible:false,
    }
  },
  created() {
    this.Fapi=fileApi.fileApi
    this.power=JSON.parse(sessionStorage.getItem('power'))
    if(this.power.type===1){
      this.user=JSON.parse(sessionStorage.getItem('user_t'))
    }else{
      this.user=JSON.parse(sessionStorage.getItem('user'))
    }
    this.getData();
  },

  methods:{
    //刷新组件
    refreshComponent(){
      this.fresh=false
      this.getData()
      this.$nextTick(()=>{
        this.fresh=true
      })
    },

    downloadPatent(m){
      window.open(this.Fapi+"/Patents/"+m)
    },

    changeInfo(m){
      this.dialogVisible=true
      this.patentForm=JSON.parse(JSON.stringify(m.data))
    },
    patentHandleClose(){
      this.dialogVisible=false
    },
    onSubmit(){
      request.post("/upload_patent_info", this.patentForm).then(res=>{
        this.$message.success(res.msg)
        this.dialogVisible=false//关闭表单
        this.refreshComponent()
      }).catch(err=>{
        this.$message.error("请求错误")
      })
    },

    passPatent(index){
      request.post('/pass_patent',this.patentToDo[index].data).then(res=>{
        this.patentToDoShow[index]=false
        delete this.patentToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    rejectReason(index){
      this.rejectReasonDia=true
      this.rejectType='toDo'
      this.rejectIndex=index
      this.rejectItem=JSON.parse(JSON.stringify(this.patentToDo[index]))
    },
    rejectReason_did(index){
      this.rejectReasonDia=true
      this.rejectType='did'
      this.rejectIndex=index
      this.rejectItem=JSON.parse(JSON.stringify(this.patentDid[index]))
    },
    rejectPatent(index){
      request.post('/refuse_patent',this.rejectItem).then(res=>{
        this.rejectReasonDia=false
        this.patentToDoShow[index]=false
        delete this.patentToDo[index]
        if(this.toDoNum-1===0){
          this.numShow=false
        } else {
          this.toDoNum--
        }
        this.refreshComponent()
      })
    },
    rejectPatentDid(index){
      request.post('/refuse_patent',this.rejectItem).then(res=>{
        this.rejectReasonDia=false
        this.refreshComponent()
      })
    },
    waitPatent(index){
      this.patentToDoShow[index]=false
      if(this.toDoNum-1===0){
        this.numShow=false
      } else {
        this.toDoNum--
      }
      this.$emit('patentKey',this.toDoNum,this.numShow)
    },

    getData(){
      request.post('/find_all_patent_info_new',this.user).then(res=>{
        this.patentToDo=res
        for(let i=0;i<this.patentToDo.length;i++){
          this.patentToDoShow[i]=true
        }
        //原numcount函数内容
        this.toDoNum=this.patentToDo.length
        if(this.toDoNum===0){
          this.numShow=false
          this.noInfo=true
        }
        else {
          this.numShow=true
          this.noInfo=false
        }
        this.$emit('patentKey',this.toDoNum,this.numShow)
      })

      request.post('/find_all_patent_info_old',this.user).then(res=>{
        this.patentDid=res
        for(let i=0;i<this.patentDid.length;i++){
          this.patentDidShow[i]=true
        }
      })
    },
  },

}
</script>

<style scoped>

</style>