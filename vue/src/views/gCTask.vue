<template>

  <div style="position: relative; margin:20px 0 0 9% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      发布任务
    </p>
<!--选择接受者抽屉-->
    <el-drawer
        title="学生列表"
        v-model="drawer"
        direction="rtl"
    >
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
状态抽屉
    <el-drawer
        title="学生列表"
        v-model="drawer1"
        direction="ltr"
    >
      <span>已读未做:{{}}|已做:{{}}|共:{{}}</span>
      <el-table ref="tableRef" row-key="stu_no" :data="stulist" class="stuinfo"
                style="width: 100%" max-height="600"
      >
        <el-table-column
            prop="status"
            label="状态"
            width="100"
            :filters="this.filterStatus"
            :filter-method="filterStatusHandler"
            :formatter="statusFormatter"
        />
        <el-table-column prop="stuName" label="姓名" width="100" fixed/>
        <el-table-column
            prop="receiver"
            label="学号"
            width="100"
            sortable
            column-key="stu_no"
        />
        <el-table-column
            prop="stuClass"
            label="班级"
            width="100"
            :filters="this.filterClass"
            :filter-method="filterClassHandler"
        />

      </el-table>
    </el-drawer>
<!--编辑卡片-->
    <el-dialog
        v-model="editCardShow"
        title="更新"
        width="30%"
        :before-close="cardClose"
    >
      <el-card class="box-card" style="margin-top: 10px">
        <el-input
            v-model="editMess.msg_content"
            :autosize="{ minRows: 4, maxRows: 10 }"
            type="textarea"
            placeholder="请输入内容"
        >
        </el-input>
        <el-date-picker
            v-model="editMess.msg_deadline"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="设置截至时间，可忽略"
            style="margin-top: 10px"
        >
        </el-date-picker>
        <br>
        <div style="margin-left: 40%">
          <el-button size="mini" @click="cardClose" style="width: 27%">
              <span style="font-size: 1px;">
                取消
              </span>
          </el-button>
          <el-button size="mini" @click="cardSend" style="width: 27%">
              <span style="font-size: 1px;">
                发布
              </span>
          </el-button>
        </div>
      </el-card>

    </el-dialog>


    <div style="width: 30%">
      <transition name="el-zoom-in-center">
        <div class="transition-box">
          <el-card class="box-card" style="margin-top: 10px">
            <el-input
                v-model="mess.msg_content"
                :autosize="{ minRows: 4, maxRows: 10 }"
                type="textarea"
                placeholder="请输入内容"
            >
            </el-input>
            <el-date-picker
                v-model="mess.msg_deadline"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="设置截至时间，可忽略"
                style="margin-top: 10px"
            >
            </el-date-picker>
            <br>
            <el-button size="mini" @click="chooseStu" style="margin-top: 10px">
              <span style="font-size: 1px;">
                选择接收者
                已选:{{multipleSelection.length}}/{{tableData.length}}
              </span>
            </el-button>
            <div style="margin-left: 40%">
              <el-button size="mini" @click="cancelTask" style="width: 27%">
              <span style="font-size: 1px;">
                取消
              </span>
              </el-button>
              <el-button size="mini" @click="sendTask" style="width: 27%">
              <span style="font-size: 1px;">
                发布
              </span>
              </el-button>
            </div>
          </el-card>
        </div>
      </transition>
    </div>


    <div class="block" style="width: 40%; position: absolute; right: 10%; top:30px">
      <p style="font-weight: bold;font-size: large; margin-bottom: 20px; cursor: default">以往任务记录</p>
      <el-scrollbar height="500px">
        <el-timeline>
          <div v-for="(m,j) in oldMsg">
            <el-timeline-item :timestamp="m.msg_releasetime" placement="top" v-if="show[j]">
              <el-card>
                <p style="word-break: normal; white-space: pre-wrap; word-wrap: break-word">{{m.msg_content}}</p>
                  <div style="margin-top: 10px">
                    <span>截止 {{m.msg_deadline}}||剩余 {{m.days}}天{{m.hours}}时{{m.minutes}}分{{m.seconds}}秒</span>
                    <br>
                    <span @click="stuStatus(j)" style="color: red">已读未做:{{m.read}}
                      <span style="color:#008c8c;">|已做:{{m.done}}</span>
                      <span style="color: black">|共:{{m.all}}</span>
                    </span>
                    <el-button type="primary" circle size="small" style="margin-left: 5px" @click="editMessFun(j)">
                      <el-icon><Edit/></el-icon>
                    </el-button>
                    <el-button type="danger" circle size="small" @click="deleteMess(j)">
                      <el-icon><Delete/></el-icon>
                    </el-button>
                  </div>
              </el-card>
            </el-timeline-item>
          </div>
        </el-timeline>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import {Delete, Edit} from "@element-plus/icons";

export default {
  name: "gCTask",
  inject:['reload'],
  components:{
    Edit,
    Delete,
  },
  data(){
    return{
      drawer: false,
      drawer1: false,
      editCardShow: false,
      show: [],
      power:{},
      user: {},
      tableData:[],
      filterClass:[],
      filterStatus:[
        {text:'未读',value:0},
        {text:'已读未做',value:1},
        {text:'已做',value:2},
      ],
      mess:{
        msg_sender:0,
        msg_content:'',
        stuList: [],
        isAllStudent:0,
        msg_class:[],
        msg_releasetime: '',
        msg_deadline: '',
      },
      editMess:{
        msg_no:'',
        msg_content: '',
        msg_sender:0,
        msg_releasetime: '',
        msg_deadline: '',
        read:0,
        done:0,
        all:0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        residue: 0,
      },
      oldMsg:[],
      singleMess:{
        msg_no:'',
        msg_content: '',
        msg_sender:0,
        msg_releasetime: '',
        msg_deadline: '',
        read:0,
        done:0,
        all:0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        residue: 0,
      },
      stulist:[],
      multipleSelection: [],

    }
  },

  created() {
    this.power=JSON.parse(sessionStorage.getItem('power'))
    this.user=JSON.parse(sessionStorage.getItem('user'));
    if(this.power.type===1){
      this.user=JSON.parse(sessionStorage.getItem('user_t'))
    }else{
      this.user=JSON.parse(sessionStorage.getItem('user'))
    }
    //this.readData()
    setInterval(() => {
      this.getResidueDate();
    }, 1000);

    this.readData()
  },


  methods:{
    reflesh(){
      this.reload()
    },

    readData(){
      request.post('/Tea/findAllStatus', this.user).then(res=>{
        if(res.data===null){
          return
        }
        for(let i=0, m;i<res.data.length;i++){
          this.show[i]=true
          m=JSON.parse(JSON.stringify(this.singleMess))
          m.msg_no=res.data[i].msg_no
          m.msg_sender=res.data[i].msg_sender
          m.msg_content=res.data[i].msg_content
          m.msg_releasetime=res.data[i].msg_releasetime
          m.msg_deadline=res.data[i].msg_deadline
          m.read=res.data[i].read
          m.done=res.data[i].done
          m.all=res.data[i].all
          this.oldMsg.push(m)
        }
      })
    },


    stuStatus(j){
      request.post('Tea/findWhoReadOneMsg', this.oldMsg[j]).then(res=>{
        this.stulist=res.data
      })
      this.drawer1=true
    },
    // macauFormatter(row, column){
    //   if(row.stu_ismacau=== 0){
    //     return '否'
    //   } else{
    //     return '是'
    //   }
    // },
    statusFormatter(row, column){
      if(row.status===0){
        return '未读'
      } else if(row.status===1){
        return '已读未做'
      } else {
        return '已做'
      }
    },
    filterStatusHandler(value, row, column){
      const property = column['property']
      return row[property] === value
    },
    // tableRowClassName({row, rowIndex}){
    //   if(this.row.status===0){
    //     return 'notRead';
    //   } else if(this.row.status===1){
    //     return 'readBut';
    //   } else{
    //     return 'did';
    //   }
    // },

    chooseStu(){
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
    //计算时间
    convert(val) {
      return val < 10 ? '0' + val : val
    },
    getTime(){
      const myDate = new Date()
      //获取当前年
      const year = myDate.getFullYear()
      //获取当前月
      const month = myDate.getMonth() + 1
      //获取当前日
      const date = myDate.getDate()
      //获取当前小时数(0-23)
      const h = myDate.getHours()
      //获取当前分钟数(0-59)
      const m = myDate.getMinutes()
      const s = myDate.getSeconds()

      //获取当前时间
      const time =
          year +
          '-' +
          this.convert(month) +
          '-' +
          this.convert(date) +
          ' ' +
          this.convert(h) +
          ':' +
          this.convert(m) +
          ':' +
          this.convert(s)
      return time
    },

    getResidueDate() {
      for(let i=0;i<this.oldMsg.length;i++){
        this.oldMsg[i].residue = new Date(this.oldMsg[i].msg_deadline).getTime() - new Date();
        if(this.oldMsg[i].residue<0){
          continue
        }
        this.oldMsg[i].days = this.addZero(
            Math.floor(this.oldMsg[i].residue / 1000 / 60 / 60 / 24)
        ); //天
        this.oldMsg[i].hours = this.addZero(
            Math.floor((this.oldMsg[i].residue / 1000 / 60 / 60) % 24)
        ); //时
        this.oldMsg[i].minutes = this.addZero(
            Math.floor((this.oldMsg[i].residue / 1000 / 60) % 60)
        ); //分
        this.oldMsg[i].seconds = this.addZero(Math.floor((this.oldMsg[i].residue / 1000) % 60)); //秒
      }
    },
    start() {
      // let _this = this;
    },
    addZero(d) {
      return parseInt(d) < 10 ? "0" + d : d;
    },

    sendTask(){
      this.mess.msg_sender=this.user.t_no
      // this.mess.stuList=this.multipleSelection
      for(let i=0;i<this.multipleSelection.length;i++){
        this.mess.stuList.push(this.multipleSelection[i].stu_no)
      }
      this.mess.msg_releasetime=this.getTime()
      request.post('/Tea/send_msg',this.mess).then(res=>{
        this.$message({
          type:"success",
          message:res.msg,
        })
        // this.mess.msg_content=''
        // this.mess.msg_deadline=''
        // this.mess.stuList=[]
        // this.multipleSelection=[]
        this.reflesh()
      })
    },
    cancelTask(){
      this.mess.msg_content=''
      this.mess.msg_deadline=''
      this.mess.stuList=[]
      this.multipleSelection=[]
    },

    filterClassHandler(value, row, column){
      const property = column['property']
      return row[property] === value
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },

    editMessFun(j){
      this.editCardShow=true
      this.editMess=JSON.parse(JSON.stringify(this.oldMsg[j]))
    },
    cardClose(){
      this.editCardShow=false
      this.editMess={}
    },
    cardSend(){
      request.post('/updateMsg',this.editMess).then(res=>{
        this.$message.success(res.msg)
        this.editCardShow=false
        this.editMess={}
        this.reflesh()
      }).catch(err=>{
        this.$message.error(res.msg)
      })
    },
    deleteMess(j){
      request.post('/deleteMsg',this.oldMsg[j]).then(res=>{
        this.$message.success(res.msg)
        delete this.oldMsg[j]
        this.reflesh()
      }).catch(err=>{
        this.$message.error("删除失败")
      })

    },
  },
}
</script>

<style scoped>
.notRead {
  background: red;
}
.readBut {
  background: oldlace;
}
.did {
  background: #f0f9eb;
}

</style>