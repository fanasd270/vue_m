<template>
  <div class="mainContent">
    <div>
      <span>德育成绩：</span>
      <br>
      <span>D=d1*20%+d2+d3={{dAll.toFixed(3)}}</span>
    </div>
    <div style="border-bottom: solid 1px #57d3ef">
      <span>d1.德育基础分：({{d1.toFixed(2)}})</span>
      <div style="max-height: 300px;">
        <el-scrollbar max-height="300px">
          <el-card v-for="(m, index) in otherList3">
            <el-descriptions style="padding: 10px 5px 0 5px">
              <el-descriptions-item label="项目名称:" width="25em">{{m.data.other_name}}</el-descriptions-item>
              <el-descriptions-item label="自我评价:">{{m.data.other_info}}</el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.status===1">已加分:{{m.score}}</el-tag>
            <el-tag type="warning" v-if="m.status===0">未加分</el-tag>

            <el-popover
                placement="top"
                :width="200"
                trigger="click"
                :visible="popover_other3[index]"
            >
              <el-input-number v-model="m.score" :precision="1" :step="0.1" :max="10" :min="0"/>
              <el-button  class="btn2" @click="updateScore(m,index,'d1')">确认</el-button>
              <el-button class="btn2" @click="m.score=0;popover_other3[index]=false">取消</el-button>
              <template #reference>
                <el-button class="btn1" v-if="m.status===0&&$store.state.code===1" @click="popover_other3[index]=true">加分</el-button>
              </template>
            </el-popover>
            <el-button class="btn1" v-if="m.status===1&&$store.state.code===1" @click="clearScoreOther(m)">取消</el-button>

            <el-popover
                placement="top"
                :width="300"
                trigger="click"
                :visible="popover_other3_info[index]"
            >
              <el-input v-model="m.data.other_info" type="textarea" placeholder="自我评价"></el-input>
              <el-button  class="btn2" @click="updateInfo(m)">确认</el-button>
              <el-button class="btn2" @click="m.data.other_info=JSON.parse(JSON.stringify(infoCopy));popover_other3_info[index]=false">取消</el-button>
              <template #reference>
                <el-button class="btn1" :disabled="zCeStatus.status!=='1'" v-if="$store.state.code===0" @click="infoCopy=JSON.parse(JSON.stringify(m.data.other_info));popover_other3_info[index]=true">修改</el-button>
              </template>
            </el-popover>
          </el-card>
        </el-scrollbar>
      </div>
    </div>
    <div class="secondContent">
      <div class="thirdContent">
        <span>d2.德育加分项得分：({{d2.toFixed(2)}})</span>
        <br>
        <el-button :disabled="zCeStatus.status!=='1'" v-if="$store.state.code===0" @click="this.dialogVisible=true">新建</el-button>
        <el-scrollbar max-height="400px">
          <el-card v-for="(m, index) in otherList">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目类别:">{{m.data.other_name}}</el-descriptions-item>
              <el-descriptions-item v-if="m.data.other_type==='D2_1'||m.data.other_type==='D2_2'" label="活动名称:">{{m.data.other_info2}}</el-descriptions-item>
              <el-descriptions-item v-if="m.data.other_type==='D2_3'||m.data.other_type==='D2_4'" label="荣誉名称:">{{m.data.other_info2}}</el-descriptions-item>
              <el-descriptions-item v-if="m.data.other_type==='D2_5'" label="职位:">{{m.data.other_info2}}</el-descriptions-item>
              <el-descriptions-item v-if="m.data.other_type==='D2_3'||m.data.other_type==='D2_4'" label="荣誉等级:">{{m.data.other_info3}}</el-descriptions-item>
              <el-descriptions-item v-if="m.data.other_type==='D2_4'" label="团队身份:">{{m.data.other_info4}}</el-descriptions-item>
              <el-descriptions-item label="认定时间:">{{m.data.other_time}}</el-descriptions-item>
              <el-descriptions-item label="备注信息:">{{m.data.other_info}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadOther(m.data.other_proof)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.status===1">已加分:{{m.score}}</el-tag>
            <el-tag type="warning" v-if="m.status===0">未加分</el-tag>
            <el-tag type="info" v-if="m.status===2">往年已加分:{{m.score}}</el-tag>

            <el-popover
                placement="top"
                :width="200"
                trigger="click"
                :visible="popover_other[index]"
            >
              <el-input-number v-model="m.score" :precision="1" :step="0.1" :max="10" :min="0"/>
              <el-button  class="btn2" @click="updateScore(m,index,'d2')">确认</el-button>
              <el-button class="btn2" @click="m.score=0;popover_other[index]=false">取消</el-button>
              <template #reference>
                <el-button class="btn1" v-if="m.status===0&&$store.state.code===1" @click="popover_other[index]=true">加分</el-button>
              </template>
            </el-popover>
            <el-button class="btn1" v-if="m.status===1&&$store.state.code===1" @click="clearScoreOther(m)">取消</el-button>
            <el-button class="btn1" :disabled="zCeStatus.status!=='1'" v-if="$store.state.code===0" @click="deleteOther(m)">删除</el-button>
          </el-card>
        </el-scrollbar>

        <el-dialog
            title="新建"
            v-model="dialogVisible"
            width="50%"
            :before-close="paperHandleClose">

          <el-form ref="form" :model="otherThing" style="margin:30px 0 0 60px; font-weight: bold">

            <el-form-item label="加分项目" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-select v-model="otherThing.other_name" class="m-2" size="large" @change="typeChangeD2">
                <el-option
                    v-for="item in optionsD2"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="otherThing.other_type==='D2_1'||otherThing.other_type==='D2_2'" label="活动名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-input v-model="otherThing.other_info2" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="otherThing.other_type==='D2_3'||otherThing.other_type==='D2_4'" label="荣誉名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-input v-model="otherThing.other_info2" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="otherThing.other_type==='D2_5'" label="职位" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-input v-model="otherThing.other_info2" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="otherThing.other_type==='D2_3'||otherThing.other_type==='D2_4'" label="荣誉等级" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-select v-model="otherThing.other_info3" class="m-2" size="large">
                <el-option
                    v-for="item in optionsD2_level"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="otherThing.other_type==='D2_4'" label="团队身份" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-select v-model="otherThing.other_info4" class="m-2" size="large">
                <el-option
                    v-for="item in [{value:'负责人'},{value: '成员'}]"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="认定时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-date-picker v-model="otherThing.other_time" type="year" placeholder="上报学院年份" value-format="YYYY" style="width: 150px;display: inline-block"></el-date-picker>
              <el-select v-model="otherThing.other_time2" class="m-2" size="normal" placeholder=" " style="width: 80px;display: inline-block">
                <el-option
                    v-for="item in [{value:'春'},{value: '秋'}]"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="备注信息" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-input v-model="otherThing.other_info" placeholder="其他信息在此补充(可选)" clearable></el-input>
            </el-form-item>
            <el-form-item label="证明材料" style="margin-bottom: 70px;">

              <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="http://10.236.11.68:8080/"
                  :http-request="paperUpload"
                  drag
                  :limit="1"
                  :on-exceed="uploadCover"
                  :auto-upload="false">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  拖拽或 <em>点击上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    仅上传jpg/pdf/png
                  </div>
                </template>
              </el-upload>
            </el-form-item>

            <el-form-item style="position: absolute; left:40%">
              <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>
              <el-button @click="paperHandleClose">取消</el-button>
            </el-form-item>
            <div style="height: 50px"></div>
          </el-form>
        </el-dialog>
      </div>
      <div class="thirdContent" style="margin-top: 30px">
        <span>d3.德育扣分项得分：({{d3.toFixed(2)}})</span>
        <br>
        <el-button v-if="$store.state.code===1" @click="this.dialogVisible2=true">新建</el-button>
        <el-scrollbar max-height="400px">
          <el-card v-for="(m, index) in otherList2">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="扣分项目:">{{m.data.other_name}}</el-descriptions-item>
              <el-descriptions-item label="具体行为:">{{m.data.other_info2}}</el-descriptions-item>
              <el-descriptions-item label="认定时间:">{{m.data.other_time}}</el-descriptions-item>
              <el-descriptions-item label="备注信息:">{{m.data.other_info}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadOther(m.data.other_proof)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="m.status===1">已加分:{{m.score}}</el-tag>
            <el-tag type="warning" v-if="m.status===0">未加分</el-tag>
            <el-tag type="info" v-if="m.status===2">往年已加分:{{m.score}}</el-tag>

            <el-popover
                placement="top"
                :width="200"
                trigger="click"
                :visible="popover_other2[index]"
            >
              <el-input-number v-model="m.score" :precision="1" :step="0.1" :max="0" :min="-10"/>
              <el-button  class="btn2" @click="updateScore(m,index,'d3')">确认</el-button>
              <el-button class="btn2" @click="m.score=0;popover_other2[index]=false">取消</el-button>
              <template #reference>
                <el-button class="btn1" v-if="m.status===0&&$store.state.code===1" @click="popover_other2[index]=true">扣分</el-button>
              </template>
            </el-popover>
            <el-button class="btn1" v-if="m.status===1&&$store.state.code===1" @click="clearScoreOther(m)">取消</el-button>
            <el-button class="btn1" v-if="$store.state.code===1" @click="deleteOther(m)">删除</el-button>
          </el-card>
        </el-scrollbar>

        <el-dialog
            title="新建"
            v-model="dialogVisible2"
            width="50%"
            :before-close="paperHandleClose2">

          <el-form ref="form" :model="otherThing" style="margin:30px 0 0 60px; font-weight: bold">

            <el-form-item label="扣分项目" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-select v-model="otherThing.other_name" class="m-2" size="large" @change="typeChangeD3">
                <el-option
                    v-for="item in optionsD3"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="具体行为" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-input v-model="otherThing.other_info2" clearable></el-input>
            </el-form-item>
            <el-form-item label="认定时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-date-picker v-model="otherThing.other_time" type="year" placeholder="上报学院年份" value-format="YYYY" style="width: 150px;display: inline-block"></el-date-picker>
              <el-select v-model="otherThing.other_time2" class="m-2" size="normal" placeholder=" " style="width: 80px;display: inline-block">
                <el-option
                    v-for="item in [{value:'春'},{value: '秋'}]"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="备注信息" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-input v-model="otherThing.other_info" placeholder="其他信息在此补充(可选)" clearable></el-input>
            </el-form-item>
            <el-form-item label="证明材料" style="margin-bottom: 70px;">

              <el-upload
                  class="upload-demo"
                  ref="upload2"
                  action="http://10.236.11.68:8080/"
                  :http-request="paperUpload2"
                  drag
                  :limit="1"
                  :on-exceed="uploadCover2"
                  :auto-upload="false">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  拖拽或 <em>点击上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">
                    仅上传jpg/pdf/png
                  </div>
                </template>
              </el-upload>
            </el-form-item>

            <el-form-item style="position: absolute; left:40%">
              <el-button type="primary" @click="onSubmit2" style="margin-right: 40px">提交</el-button>
              <el-button @click="paperHandleClose2">取消</el-button>
            </el-form-item>
            <div style="height: 50px"></div>
          </el-form>
        </el-dialog>
      </div>
    </div>

  </div>
</template>

<script>
import fileApi from "@/components/Store";
import request from "@/utils/request";

export default {
  name: "stuACDe",
  data(){
    return{
      Fapi:fileApi.fileApi,
      user:{},
      d1:0,
      d2:0,
      d3:0,
      dAll:0,
      otherThing:{
        id:0,
        other_stu_no:'',
        other_name:'',
        other_info:'', //备注信息
        other_info2:'',
        other_info3:'',
        other_info4:'',
        other_info5:'',
        other_time:'',
        other_time2:'',
        other_proof:'', //证明材料
        other_type:'', //大写字母
      },
      dialogVisible:false,
      dialogVisible2:false,
      popover_other:[],
      popover_other2:[],
      popover_other3:[],
      popover_other3_info:[],
      otherList:[],
      otherList2:[],
      otherList3:[],
      infoCopy:'',

      zCeStatus:{
        grade:'',
        status:'',
        change_time:'',
      },

      optionsD2:[
        {
          value:'主题教育活动',
          type:'D2_1',
        },
        {
          value:'社会公益活动',
          type:'D2_2',
        },
        {
          value:'个人荣誉',
          type:'D2_3',
        },
        {
          value:'集体荣誉',
          type:'D2_4',
        },
        {
          value:'学生干部',
          type:'D2_5',
        },
        {
          value:'其他',
          type:'D2_6',
        },
      ],
      optionsD2_level:[
        {
          value:'国家级',
        },
        {
          value:'省部级',
        },
        {
          value:'学校级',
        },
        {
          value:'学院级',
        },
      ],
      optionsD3:[
        {
          value:'无故迟到、早退、旷课或不参加集体活动',
          type:'D3_1',
        },
        {
          value:'不假晚归、无故夜不归宿、使用大规律违章电器',
          type:'D3_2',
        },
        {
          value:'被学院、学校通报批评',
          type:'D3_3',
        },
        {
          value:'受到学校纪律处分',
          type:'D3_4',
        },
        {
          value:'其他违规行为（宿舍抽烟、熬夜打游戏、饲养宠物等影响他人）',
          type:'D3_5',
        },
        {
          value:'其他未列出情况',
          type:'D3_6',
        },
      ],
    }
  },
  watch:{
    "$store.state.info":{
      handler:function (newVal, oldVal){
        this.user=newVal
        this.getData()
      }
    },
  },
  created() {
    // this.user=JSON.parse(sessionStorage.getItem('user'))
    this.user=this.$store.state.info
    this.getData()
  },
  methods:{
    clearOtherThing(){
      this.otherThing.other_proof=''
      // this.otherThing.other_name=''
      this.otherThing.other_time=''
      this.otherThing.other_time2=''
      this.otherThing.other_info=''
      this.otherThing.other_info2=''
      this.otherThing.other_info3=''
      this.otherThing.other_info4=''
      this.otherThing.other_info5=''
      this.otherThing.other_type=''
    },
    typeChangeD2(val){
      this.clearOtherThing()
      if(val==='主题教育活动'){
        this.otherThing.other_type='D2_1'
      }else if(val==='社会公益活动'){
        this.otherThing.other_type='D2_2'
      }else if(val==='个人荣誉'){
        this.otherThing.other_type='D2_3'
      }else if(val==='集体荣誉'){
        this.otherThing.other_type='D2_4'
      }else if(val==='学生干部'){
        this.otherThing.other_type='D2_5'
      }else if(val==='其他'){
        this.otherThing.other_type='D2_6'
      }
    },
    typeChangeD3(val){
      this.clearOtherThing()
      if(val==='无故迟到、早退、旷课或不参加集体活动'){
        this.otherThing.other_type='D3_1'
      }else if(val==='不假晚归、无故夜不归宿、使用大规律违章电器'){
        this.otherThing.other_type='D3_2'
      }else if(val==='被学院、学校通报批评'){
        this.otherThing.other_type='D3_3'
      }else if(val==='受到学校纪律处分'){
        this.otherThing.other_type='D3_4'
      }else if(val==='其他违规行为（宿舍抽烟、熬夜打游戏、饲养宠物等影响他人）'){
        this.otherThing.other_type='D3_5'
      }else if(val==='其他未列出情况'){
        this.otherThing.other_type='D3_6'
      }
    },
    getData(){
      request.post('/getZongceStatus',this.user).then(res=>{
        this.zCeStatus=res.data
      })
      request.post('/getD1',this.user).then(res=>{
        this.otherList3=res
        this.countD1()
        this.popover_other3=new Array(this.otherList3.length).fill(false)
        this.popover_other3_info=new Array(this.otherList3.length).fill(false)
      })
      request.post('/getD2',this.user).then(res=>{
        this.otherList=res
        this.countD2()
        this.popover_other=new Array(this.otherList.length).fill(false)
      })
      request.post('/getD3',this.user).then(res=>{
        this.otherList2=res
        this.countD3()
        this.popover_other2=new Array(this.otherList2.length).fill(false)
      })
    },
    countD1(){
      this.d1=0
      for(let item of this.otherList3){
        console.log(item)
        this.d1+=item.score
      }
      this.dAll=this.d1*0.2+this.d2+this.d3
    },
    countD2(){
      this.d2=0
      for(let item of this.otherList){
        console.log(item)
        this.d2+=item.score
      }
      this.dAll=this.d1*0.2+this.d2+this.d3
    },
    countD3(){
      this.d3=0
      for(let item of this.otherList2){
        console.log(item)
        this.d3+=item.score
      }
      this.dAll=this.d1*0.2+this.d2+this.d3
    },
    uploadAll(){
      let item={
        id:0,
        stu_no:this.user.stu_no,
        stu_name:'',
        stu_class:'',
        zongce_type:'D',
        zongce_score:this.dAll,
      }
      request.post('/updateZongce2', item).then(res=>{

      })
    },
    updateInfo(m){
      request.post('/scoreOther',m).then(res=>{
        this.uploadAll()
        this.getData()
      })
    },
    deleteOther(m){
      request.post('/deleteOther',m.data).then(res=>{
        this.getData()
      })
    },
    setScoreOther(m){
      this.countD1()
      this.countD2()
      this.countD3()
      request.post('/scoreOther',m).then(res=>{
        console.log(res)
        this.uploadAll()
        this.getData()
      })
    },
    clearScoreOther(m){
      m.score=0
      m.status=0
      this.setScoreOther(m)
    },
    updateScore(m,index,type){
      console.log(m)
      if (m.score<0.1&&m.score>-0.1){
        m.status=0
      }else{
        m.status=1
      }
      switch (type) {
        case 'd1':this.popover_other3[index]=false
          this.setScoreOther(m)
          break
        case 'd2':this.popover_other[index]=false
          this.setScoreOther(m)
          break
        case 'd3':this.popover_other2[index]=false
          this.setScoreOther(m)
          break
      }
    },
    uploadCover(files, fileList){
      this.$refs.upload.clearFiles()
      this.$refs.upload.handleStart(files[0])
    },
    uploadCover2(files, fileList){
      this.$refs.upload2.clearFiles()
      this.$refs.upload2.handleStart(files[0])
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    submitUpload2() {
      this.$refs.upload2.submit();
    },
    onSubmit(){
      if(this.otherThing.other_name===''){
        this.$message.warning('项目不能为空')
        return
      }
      if(this.otherThing.other_time===''||this.otherThing.other_time===null||this.otherThing.other_time2===''){
        this.$message.warning('认定时间不能为空')
        return
      }
      if(this.$refs.upload.uploadFiles.length===0){
        this.$message.warning('请选择证明材料')
        return
      }
      if(this.otherThing.other_type==='D2_1'||this.otherThing.other_type==='D2_2'){
        if(this.otherThing.other_info2===''){
          this.$message.warning('活动名称不能为空')
          return
        }
      }
      if(this.otherThing.other_type==='D2_3'||this.otherThing.other_type==='D2_4'){
        if(this.otherThing.other_info2===''){
          this.$message.warning('荣誉名称不能为空')
          return
        }
        if(this.otherThing.other_info3===''){
          this.$message.warning('荣誉等级不能为空')
          return
        }
        if(this.otherThing.other_type==='D2_4'&&this.otherThing.other_info4===''){
          this.$message.warning('团队身份不能为空')
          return
        }
      }
      if(this.otherThing.other_type==='D2_5'){
        if(this.otherThing.other_info2===''){
          this.$message.warning('职位不能为空')
          return
        }
      }
      this.submitUpload()
    },
    onSubmit2(){
      if(this.otherThing.other_name===''){
        this.$message.warning('扣分项目不能为空')
        return
      }
      if(this.otherThing.other_info2===''){
        this.$message.warning('具体行为不能为空')
        return
      }
      if(this.otherThing.other_time===''||this.otherThing.other_time===null||this.otherThing.other_time2===''){
        this.$message.warning('认定时间不能为空')
        return
      }
      if(this.$refs.upload2.uploadFiles.length===0){
        this.$message.warning('请选择证明材料')
        return
      }
      this.submitUpload2()
    },
    paperHandleClose(){
      this.otherThing.other_name=''
      this.clearOtherThing()
      this.dialogVisible=false
    },
    paperHandleClose2(){
      this.otherThing.other_name=''
      this.clearOtherThing()
      this.dialogVisible2=false
    },
    paperUpload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/addOther2', formData).then(res=>{
        if(res.code===0){
          this.$message.error("文件类型错误")
          return
        }
        this.otherThing.other_proof=res.data
        this.otherThing.other_stu_no=this.user.stu_no+''//
        this.otherThing.other_time=this.otherThing.other_time+this.otherThing.other_time2
        request.post("/addOther", this.otherThing).then(res=>{
          that.$message.success(res.msg)
          this.paperHandleClose()//关闭表单
          this.getData()
        }).catch(err=>{
          that.$message.error("请求错误")
        })
      })
    },
    paperUpload2(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/addOther2', formData).then(res=>{
        if(res.code===0){
          this.$message.error("文件类型错误")
          return
        }
        this.otherThing.other_proof=res.data
        this.otherThing.other_stu_no=this.user.stu_no+''//
        this.otherThing.other_time=this.otherThing.other_time+this.otherThing.other_time2
        request.post("/addOther", this.otherThing).then(res=>{
          that.$message.success(res.msg)
          this.paperHandleClose2()//关闭表单
          this.getData()
        }).catch(err=>{
          that.$message.error("请求错误")
        })
      })
    },
    downloadOther(m){
      window.open(this.Fapi+"/Others/"+m)
    }
  },
}
</script>

<style scoped>
.mainContent{
  margin-top: 5px;
  height: 100%;
}
.secondContent{
  /*height: calc(100vh - 80px - 5em);*/
  min-height: 300px;
}
.thirdContent{
  min-height: 200px;
  border-bottom: solid 1px #57d3ef;
  margin-top: 20px;
}
.btn1{
  margin-left: 5px;
}
.btn2{
  margin-top: 5px;
}
</style>