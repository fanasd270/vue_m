<template>
  <div class="mainContent">
    <div>
      <span>体育成绩：</span>
      <br>
      <span>T=t1*80%*5%+t2={{tAll.toFixed(3)}}</span>
    </div>
    <div style="border-bottom: solid 1px #57d3ef">
      <span>t1.体测成绩：({{t1.toFixed(2)}})</span>
      <div style="max-height: 300px;">
        <el-scrollbar max-height="300px">
          <el-card>
            <el-descriptions style="padding: 10px 5px 0 5px">
              <el-descriptions-item label="项目名称:" width="25em">{{otherList3.data.other_name}}</el-descriptions-item>
              <el-descriptions-item label="认定时间:">{{otherList3.data.other_time}}</el-descriptions-item>
              <el-descriptions-item label="分数:">{{otherList3.data.other_info}}</el-descriptions-item>
              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadOther(otherList3.data.other_proof)">点击下载</span></el-descriptions-item>
            </el-descriptions>
            <el-tag type="success" v-if="otherList3.status===1">已加分:{{otherList3.score}}</el-tag>
            <el-tag type="warning" v-if="otherList3.status===0">未加分</el-tag>

            <el-popover
                placement="top"
                :width="200"
                trigger="click"
                :visible="popover_other3[0]"
            >
              <el-input-number v-model="otherList3.score" :precision="1" :step="0.1" :max="100" :min="0"/>
              <el-button  class="btn2" @click="updateScore(otherList3,0,'t1')">确认</el-button>
              <el-button class="btn2" @click="otherList3.score=0;popover_other3[0]=false">取消</el-button>
              <template #reference>
                <el-button class="btn1" v-if="otherList3.status===0&&$store.state.code===1" @click="popover_other3[0]=true">加分</el-button>
              </template>
            </el-popover>
            <el-button class="btn1" v-if="otherList3.status===1&&$store.state.code===1" @click="clearScoreOther(otherList3)">取消</el-button>
            <el-button class="btn1" :disabled="zCeStatus.status!=='1'" v-if="$store.state.code===0" @click="updateT1">修改</el-button>
          </el-card>

          <el-dialog
              title="体测成绩"
              v-model="dialogVisibleT1"
              width="50%"
              :before-close="updateT1Close">

            <el-form ref="form" :model="otherList3Copy" style="margin:30px 0 0 60px; font-weight: bold">

              <el-form-item label="体测成绩" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
<!--                <el-input v-model="otherList3Copy.other_info" placeholder="分数" clearable></el-input>-->
                <el-input-number v-model="otherList3Copy.data.other_info" :precision="2" :step="0.1" :max="100" :min="0" controls="false"/>
              </el-form-item>
              <el-form-item label="证明材料" style="margin-bottom: 70px;">

                <el-upload
                    class="upload-demo"
                    ref="uploadT1"
                    action="http://10.236.11.68:8080/"
                    :http-request="t1Upload"
                    drag
                    :limit="1"
                    :on-exceed="uploadCoverT1"
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
                <el-button type="primary" @click="onSubmitT1" style="margin-right: 40px">提交</el-button>
                <el-button @click="updateT1Close">取消</el-button>
              </el-form-item>
              <div style="height: 50px"></div>
            </el-form>
          </el-dialog>
        </el-scrollbar>
      </div>
    </div>
    <div class="secondContent">
      <div class="thirdContent">
        <span>t2.体育素质加分项得分：({{t2.toFixed(2)}})</span>
        <br>
        <el-button :disabled="zCeStatus.status!=='1'" v-if="$store.state.code===0" @click="this.dialogVisible=true">新建</el-button>
        <el-scrollbar max-height="400px">
          <el-card v-for="(m, index) in otherList">
            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
              <el-descriptions-item label="项目名称:">{{m.data.other_name}}</el-descriptions-item>
              <el-descriptions-item v-if="m.data.other_type==='T2_1'" label="活动名称:">{{m.data.other_info2}}</el-descriptions-item>
              <el-descriptions-item v-if="m.data.other_type==='T2_3'" label="竞赛名称:">{{m.data.other_info2}}</el-descriptions-item>
              <el-descriptions-item v-if="m.data.other_type==='T2_3'" label="竞赛类别:">{{m.data.other_info3}}</el-descriptions-item>
              <el-descriptions-item v-if="m.data.other_type==='T2_3'&&m.data.other_info3==='团体'" label="团队完成人次序:">{{m.data.other_info}}</el-descriptions-item>
              <el-descriptions-item v-if="m.data.other_type==='T2_3'" label="竞赛等级:">{{m.data.other_info4}}</el-descriptions-item>
              <el-descriptions-item v-if="m.data.other_type==='T2_3'" label="获奖等级:">{{m.data.other_info5}}</el-descriptions-item>
              <el-descriptions-item label="认定时间:">{{m.data.other_time}}</el-descriptions-item>
              <el-descriptions-item v-if="m.data.other_type!=='T2_3'||m.data.other_info3==='个人'" label="备注信息:">{{m.data.other_info}}</el-descriptions-item>
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
              <el-button  class="btn2" @click="updateScore(m,index,'t2')">确认</el-button>
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
              <el-select v-model="otherThing.other_name" class="m-2" size="large" @change="typeChangeT2">
                <el-option
                    v-for="item in optionsT2"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="otherThing.other_type==='T2_1'" label="活动名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-input v-model="otherThing.other_info2" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="otherThing.other_type==='T2_3'" label="竞赛名称" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-input v-model="otherThing.other_info2" clearable></el-input>
            </el-form-item>
            <el-form-item v-if="otherThing.other_type==='T2_3'" label="竞赛类别" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-select v-model="otherThing.other_info3" class="m-2" size="large">
                <el-option
                    v-for="item in [{value:'个人'},{value: '团体'}]"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="otherThing.other_type==='T2_3'&&otherThing.other_info3==='团体'" label="团队完成人次序" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-select v-model="otherThing.other_info" class="m-2" size="large">
                <el-option
                    v-for="item in optionsT2_order"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="otherThing.other_type==='T2_3'" label="竞赛等级" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-select v-model="otherThing.other_info4" class="m-2" size="large">
                <el-option
                    v-for="item in optionsT2_type"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="otherThing.other_type==='T2_3'" label="获奖等级" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
              <el-select v-model="otherThing.other_info5" class="m-2" size="large">
                <el-option
                    v-for="item in optionsT2_level"
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
            <el-form-item v-if="otherThing.other_type!=='T2_3'||otherThing.other_info3==='个人'" label="备注信息" style="margin-bottom: 40px; margin-right: 2%; width: 46%">
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
<!--      <div class="thirdContent" style="margin-top: 30px">-->
<!--        <span>t3.体育竞赛加分项得分：({{t3.toFixed(2)}})</span>-->
<!--        <br>-->
<!--        <el-button :disabled="zCeStatus.status!=='1'" v-if="$store.state.code===0" @click="this.dialogVisible2=true">新建</el-button>-->
<!--        <el-scrollbar max-height="400px">-->
<!--          <el-card v-for="(m, index) in otherList2">-->
<!--            <el-descriptions style="padding: 10px 5px 0 5px" :column=4>-->
<!--              <el-descriptions-item label="项目名称:">{{m.data.other_name}}</el-descriptions-item>-->
<!--              <el-descriptions-item label="认定时间:">{{m.data.other_time}}</el-descriptions-item>-->
<!--              <el-descriptions-item label="备注信息:">{{m.data.other_info}}</el-descriptions-item>-->
<!--              <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadOther(m.data.other_proof)">点击下载</span></el-descriptions-item>-->
<!--            </el-descriptions>-->
<!--            <el-tag type="success" v-if="m.status===1">已加分:{{m.score}}</el-tag>-->
<!--            <el-tag type="warning" v-if="m.status===0">未加分</el-tag>-->
<!--            <el-tag type="info" v-if="m.status===2">往年已加分:{{m.score}}</el-tag>-->

<!--            <el-popover-->
<!--                placement="top"-->
<!--                :width="200"-->
<!--                trigger="click"-->
<!--                :visible="popover_other2[index]"-->
<!--            >-->
<!--              <el-input-number v-model="m.score" :precision="1" :step="0.1" :max="10" :min="0"/>-->
<!--              <el-button  class="btn2" @click="updateScore(m,index,'t3')">确认</el-button>-->
<!--              <el-button class="btn2" @click="m.score=0;popover_other2[index]=false">取消</el-button>-->
<!--              <template #reference>-->
<!--                <el-button class="btn1" v-if="m.status===0&&$store.state.code===1" @click="popover_other2[index]=true">加分</el-button>-->
<!--              </template>-->
<!--            </el-popover>-->
<!--            <el-button class="btn1" v-if="m.status===1&&$store.state.code===1" @click="clearScoreOther(m)">取消</el-button>-->
<!--            <el-button class="btn1" :disabled="zCeStatus.status!=='1'" v-if="$store.state.code===0" @click="deleteOther(m)">删除</el-button>-->
<!--          </el-card>-->
<!--        </el-scrollbar>-->

<!--        <el-dialog-->
<!--            title="新建"-->
<!--            v-model="dialogVisible2"-->
<!--            width="50%"-->
<!--            :before-close="paperHandleClose2">-->

<!--          <el-form ref="form" :model="otherThing" style="margin:30px 0 0 60px; font-weight: bold">-->

<!--            <el-form-item label="加分项目" style="margin-bottom: 40px; margin-right: 2%; width: 46%">-->
<!--              <el-input v-model="otherThing.other_name" placeholder="" clearable></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="认定时间" style="margin-bottom: 40px; margin-right: 2%; width: 46%">-->
<!--              <el-date-picker v-model="otherThing.other_time" type="year" placeholder="上报学院年份" value-format="YYYY" style="width: 150px;display: inline-block"></el-date-picker>-->
<!--              <el-select v-model="otherThing.other_time2" class="m-2" size="normal" placeholder=" " style="width: 80px;display: inline-block">-->
<!--                <el-option-->
<!--                    v-for="item in [{value:'春'},{value: '秋'}]"-->
<!--                    :key="item.value"-->
<!--                    :label="item.value"-->
<!--                    :value="item.value"-->
<!--                />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="备注信息" style="margin-bottom: 40px; margin-right: 2%; width: 46%">-->
<!--              <el-input v-model="otherThing.other_info" placeholder="其他信息在此补充(可选)" clearable></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="证明材料" style="margin-bottom: 70px;">-->

<!--              <el-upload-->
<!--                  class="upload-demo"-->
<!--                  ref="upload2"-->
<!--                  action="http://10.236.11.68:8080/"-->
<!--                  :http-request="paperUpload2"-->
<!--                  drag-->
<!--                  :limit="1"-->
<!--                  :on-exceed="uploadCover2"-->
<!--                  :auto-upload="false">-->
<!--                <el-icon class="el-icon&#45;&#45;upload"><upload-filled /></el-icon>-->
<!--                <div class="el-upload__text">-->
<!--                  拖拽或 <em>点击上传</em>-->
<!--                </div>-->
<!--                <template #tip>-->
<!--                  <div class="el-upload__tip">-->
<!--                    仅上传jpg/pdf/png-->
<!--                  </div>-->
<!--                </template>-->
<!--              </el-upload>-->
<!--            </el-form-item>-->

<!--            <el-form-item style="position: absolute; left:40%">-->
<!--              <el-button type="primary" @click="onSubmit2" style="margin-right: 40px">提交</el-button>-->
<!--              <el-button @click="paperHandleClose2">取消</el-button>-->
<!--            </el-form-item>-->
<!--            <div style="height: 50px"></div>-->
<!--          </el-form>-->
<!--        </el-dialog>-->
<!--      </div>-->
    </div>

  </div>
</template>

<script>
import fileApi from "@/components/Store";
import request from "@/utils/request";

export default {
  name: "stuACTi",
  data(){
    return{
      Fapi:fileApi.fileApi,
      user:{},
      t1:0,
      t2:0,
      t3:0,
      tAll:0,
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
      dialogVisibleT1:false,
      popover_other:[],
      popover_other2:[],
      popover_other3:[],
      otherList:[],
      otherList2:[],
      otherList3:{
        data:{
          id:0,
          other_stu_no:'',
          other_name:'',
          other_info:'', //备注信息
          other_time:'',
          other_proof:'', //证明材料
          other_type:'', //大写字母
        },
        score:0,
        status:0,
      },
      otherList3Copy:{},
      infoCopy:'',
      zCeStatus:{
        grade:'',
        status:'',
        change_time:'',
      },
      optionsT2:[
        {
          value:'课外体育锻炼活动',
          type:'T2_1',
        },
        {
          value:'带动同学养成体育锻炼习惯',
          type:'T2_2',
        },
        {
          value:'体育比赛',
          type:'T2_3',
        },
        {
          value:'其他',
          type:'T2_4',
        },
      ],
      optionsT2_type:[
        {
          value:'国际级',
        },
        {
          value:'国家级',
        },
        {
          value:'省市级',
        },
        {
          value:'校级',
        },
        {
          value:'学院级',
        },
      ],
      optionsT2_level:[
        {
          value:'特等奖',
        },
        {
          value:'一等奖',
        },
        {
          value:'二等奖',
        },
        {
          value:'三等奖',
        },
        {
          value:'优秀奖',
        },
      ],
      optionsT2_order:[
        {
          value:'第一完成人',
        },
        {
          value:'第二完成人',
        },
        {
          value:'第三完成人',
        },
        {
          value:'第四完成人',
        },
        {
          value:'第五完成人',
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
    typeChangeT2(val){
      this.clearOtherThing()
      if(val==='课外体育锻炼活动'){
        this.otherThing.other_type='T2_1'
      }else if(val==='带动同学养成体育锻炼习惯'){
        this.otherThing.other_type='T2_2'
      }else if(val==='体育比赛'){
        this.otherThing.other_type='T2_3'
      }else if(val==='其他'){
        this.otherThing.other_type='T2_4'
      }
    },
    getData(){
      request.post('/getZongceStatus',this.user).then(res=>{
        this.zCeStatus=res.data
      })
      request.post('/getT1',this.user).then(res=>{
        this.otherList3=res
        this.countT1()
        this.popover_other3=new Array(1).fill(false)
      })
      request.post('/getT2',this.user).then(res=>{
        this.otherList=res
        this.countT2()
        this.popover_other=new Array(this.otherList.length).fill(false)
      })
      request.post('/getT3',this.user).then(res=>{
        this.otherList2=res
        this.countT3()
        this.popover_other2=new Array(this.otherList2.length).fill(false)
      })
    },
    updateT1(){
      this.dialogVisibleT1=true
      this.otherList3Copy=JSON.parse(JSON.stringify(this.otherList3))
    },
    updateT1Close(){
      this.dialogVisibleT1=false
    },
    countT1(){
      this.t1=this.otherList3.score
    },
    countT2(){
      this.t2=0
      for(let item of this.otherList){
        this.t2+=item.score
      }
      this.tAll=this.t1*0.04+this.t2+this.t3
    },
    countT3(){
      this.t3=0
      for(let item of this.otherList2){
        this.t3+=item.score
      }
      this.tAll=this.t1*0.04+this.t2+this.t3
    },
    uploadAll(){
      let item={
        id:0,
        stu_no:this.user.stu_no,
        stu_name:'',
        stu_class:'',
        zongce_type:'T',
        zongce_score:this.tAll,
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
      this.countT1()
      this.countT2()
      this.countT3()
      request.post('/scoreOther',m).then(res=>{
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
      if (m.score<0.1){
        m.status=0
      }else{
        m.status=1
      }
      switch (type) {
        case 't1':this.popover_other3[index]=false
          this.setScoreOther(m)
          break
        case 't2':this.popover_other[index]=false
          this.setScoreOther(m)
          break
        case 't3':this.popover_other2[index]=false
          this.setScoreOther(m)
          break
      }
    },
    uploadCoverT1(files, fileList){
      this.$refs.uploadT1.clearFiles()
      this.$refs.uploadT1.handleStart(files[0])
    },
    uploadCover(files, fileList){
      this.$refs.upload.clearFiles()
      this.$refs.upload.handleStart(files[0])
    },
    // uploadCover2(files, fileList){
    //   this.$refs.upload2.clearFiles()
    //   this.$refs.upload2.handleStart(files[0])
    // },
    submitUpload() {
      this.$refs.upload.submit();
    },
    submitUploadT1(){
      this.$refs.uploadT1.submit();
    },
    submitUpload2() {
      this.$refs.upload2.submit();
    },
    onSubmit(){
      if(this.otherThing.other_name===''){
        this.$message.warning('名称不能为空')
        return
      }
      if(this.otherThing.other_time===''||this.otherThing.other_time===null||this.otherThing.other_time2===''||this.otherThing.other_time2===''){
        this.$message.warning('认定时间不能为空')
        return
      }
      if(this.$refs.upload.uploadFiles.length===0){
        this.$message.warning('请选择证明材料')
        return
      }
      if(this.otherThing.other_type==='T2_3'){
        if(this.otherThing.other_info2===''){
          this.$message.warning('竞赛名称不能为空')
          return
        }
        if(this.otherThing.other_info3===''){
          this.$message.warning('竞赛类别不能为空')
          return
        }
        if(this.otherThing.other_info4===''){
          this.$message.warning('竞赛等级不能为空')
          return
        }
        if(this.otherThing.other_info5===''){
          this.$message.warning('获奖等级不能为空')
          return
        }
        if(this.otherThing.other_info3==='团体'){
          if(this.otherThing.other_info!=='第一完成人'&&this.otherThing.other_info!=='第二完成人'&&this.otherThing.other_info!=='第三完成人'
              &&this.otherThing.other_info!=='第四完成人'&&this.otherThing.other_info!=='第五完成人'){
            this.$message.warning('团队完成人次序非法')
            return
          }
        }
      }
      this.submitUpload()
    },
    onSubmitT1(){
      if(this.otherList3.other_time===''||this.otherList3.other_time===null){
        this.$message.warning('认定时间不能为空')
        return
      }
      if(this.$refs.uploadT1.uploadFiles.length===0){
        this.$message.warning('请选择证明材料')
        return
      }
      this.submitUploadT1()
    },
    onSubmit2(){
      if(this.otherThing.other_name===''){
        this.$message.warning('项目类别不能为空')
        return
      }
      if(this.otherThing.other_time===''||this.otherThing.other_time===null){
        this.$message.warning('认定时间不能为空')
        return
      }
      if(this.$refs.upload2.uploadFiles.length===0){
        this.$message.warning('请选择证明材料')
        return
      }
      this.submitUpload2()
    },
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
          that.$message.success('修改成功')
          this.paperHandleClose()//关闭表单
          this.getData()
        }).catch(err=>{
          that.$message.error("请求错误")
        })
      })
    },
    t1Upload(param){
      const formData=new FormData()
      formData.append('file', param.file)
      let that=this
      request.post('/addOther2', formData).then(res=>{
        if(res.code===0){
          this.$message.error("文件类型错误")
          return
        }
        this.otherList3=JSON.parse(JSON.stringify(this.otherList3Copy))
        this.otherList3.data.other_proof=res.data
        this.otherList3.data.other_stu_no=this.user.stu_no+''//
        this.otherList3.data.other_type='T1'
        request.post("/scoreOther", this.otherList3).then(res=>{
          that.$message.success('上传成功')
          this.updateT1Close()//关闭表单
          this.getData()
        }).catch(err=>{
          that.$message.error("请求错误")
        })
      })
    },
    // paperUpload2(param){
    //   const formData=new FormData()
    //   formData.append('file', param.file)
    //   let that=this
    //   request.post('/addOther2', formData).then(res=>{
    //     if(res.code===0){
    //       this.$message.error("文件类型错误")
    //       return
    //     }
    //     this.otherThing.other_proof=res.data
    //     this.otherThing.other_stu_no=this.user.stu_no+''//
    //     this.otherThing.other_type='T3'
    //     request.post("/addOther", this.otherThing).then(res=>{
    //       that.$message.success('上传成功')
    //       this.paperHandleClose2()//关闭表单
    //       this.getData()
    //     }).catch(err=>{
    //       that.$message.error("请求错误")
    //     })
    //   })
    // },
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
  min-height: 300px;
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