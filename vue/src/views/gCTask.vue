<template>

  <div style="position: relative; margin:20px 0 0 9% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      发布任务
    </p>

    <el-drawer
        title="学生列表"
        v-model="drawer"
        direction="rtl"
    >
      <span>已选:{{multipleSelection.length}}/{{tableData.length}}</span>
      <el-table ref="tableRef" @selection-change="handleSelectionChange" row-key="stu_no" :data="tableData" class="stuinfo" style="width: 100%" max-height="600">
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

    <div style="width: 30%">
      <transition name="el-zoom-in-center">
        <div v-show="show" class="transition-box">
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
            <el-timeline-item :timestamp="m.msg_time" placement="top">
              <el-card>
                <h4>{{m.msg_content}}</h4>
                <p>截至时间 {{m.msg_ddl}}</p>
                  <div style="margin: 10px 0 0 80%">
                    <el-button type="primary" circle size="small">
                      <el-icon><Edit/></el-icon>
                    </el-button>
                    <el-button type="danger" circle size="small">
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
  components:{
    Edit,
    Delete,
  },
  data(){
    return{
      drawer: false,
      show: true,
      user: {},
      tableData:[],
      filterClass:[],
      mess:{
        msg_sender:0,
        msg_content:'',
        stuList: [],
        isAllStudent:0,
        msg_class:[],
        msg_releasetime: '',
        msg_deadline: '',
      },
      oldMsg:[
        {
          msg_content: '111',
          msg_time: '2022/1/1 00:00',
          msg_ddl: '2022/1/2 00:00'
        },
      ],
      multipleSelection: [],

    }
  },

  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'));
    //this.readData()
  },


  methods:{
    WaitMsg(i){
      this.closeStyle="el-zoom-in-bottom";
      this.show[i]=!this.show[i];
    },
    ReadMsg(i){
      this.closeStyle="el-zoom-in-top";
      this.show[i]=!this.show[i];
      this.mess.msg[i].did=1;
      this.sentBack(i);
    },
    DidMsg(i){
      this.closeStyle="el-zoom-in-center";
      this.show[i]=!this.show[i];
      this.mess.msg[i].did=2;
      this.mess.didMsg.push(this.mess.toDoMsg[i]);
      this.mess.didMsg.splice(i,1);
      this.sentBack(i);
    },

    readData(){
      request.post('', this.user).then(res=>{

        ///
        ///
        for(let i=0; i<this.mess.totalLength;i++){
          this.show[i]=true;
        }
      })
    },


    sentBack(i){
      //requset
    },

    chooseStu(){
      // request.post('', this.user).then(res=>{
      //
      // })
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

    sendTask(){
      this.mess.msg_sender=this.user.t_no
      // this.mess.stuList=this.multipleSelection
      for(let i=0;i<this.multipleSelection.length;i++){
        this.mess.stuList.push(this.multipleSelection[i].stu_no)
      }
      this.mess.msg_releasetime=this.getTime()
      console.log(this.mess)
      request.post('/Tea/send_msg',this.mess).then(res=>{
        this.$message({
          type:"success",
          message:res.msg,
        })
        this.mess.msg_content=''
        this.mess.msg_deadline=''
        this.mess.stuList=[]
        this.multipleSelection=[]
      })
    },

    filterClassHandler(value, row, column){
      const property = column['property']
      return row[property] === value
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
  },
}
</script>

<style scoped>

</style>