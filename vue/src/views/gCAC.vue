<template>
  <div style="position: relative; margin:20px 0 0 0 ">
    <div style="margin-left: 9%">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
        综合测评
      </p>

      <div style="display: inline-block">
        <el-radio-group v-if="power.type===2" v-model="caStatus" size="large" @change="changeStatus">
          <el-radio-button label="开启综测填写" />
          <el-radio-button label="开启综测评分" />
          <el-radio-button label="关闭综测评分" />
        </el-radio-group>
        <el-button @click="downloadTable" style="margin-left: 10px;height: 40px;vertical-align: top">下载年级综测表</el-button>
      </div>

      <br>
      <el-button @click="drawer=true" style="margin: 10px 0 5px 0" :disabled="caStatus!=='开启综测评分'">选择对象</el-button>
      <br>

      <el-tag type="success" v-if="multipleSelection.stu_name" style="margin-right: 5px">{{multipleSelection.stu_name}}</el-tag>
    </div>

    <div v-if="multipleSelection.length===0" style="margin-top: 10px;border-top: black solid 1px">
      <el-table
          @sort-change="sortChangeForScore"
          :data="scoreTable"
          style="width: 100%">
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            prop="stu_name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="stu_no"
            label="学号">
        </el-table-column>
        <el-table-column
            prop="stu_class"
            label="班级"
        >
        </el-table-column>
        <el-table-column
            prop="d"
            label="德育"
            sortable="custom">
        </el-table-column>
        <el-table-column
            prop="z"
            label="智育"
            sortable="custom">
        </el-table-column>
        <el-table-column
            prop="t"
            label="体育"
            sortable="custom">
        </el-table-column>
        <el-table-column
            prop="m"
            label="美育"
            sortable="custom">
        </el-table-column>
        <el-table-column
            prop="l"
            label="劳育"
            sortable="custom">
        </el-table-column>
        <el-table-column
            prop="all"
            label="综测分数"
            sortable="custom">
        </el-table-column>
      </el-table>
    </div>
    <div v-if="multipleSelection.length!==0" style="margin-top: 10px;border-top: black solid 1px">
      <g-c-c-a/>
    </div>

    <el-drawer
        title="学生列表"
        v-model="drawer"
        direction="rtl"
    >
      <el-button @click="drawer=false" style="margin-bottom: 5px">确定</el-button>
      <br>
      <span>已选:{{multipleSelection.stu_name}}</span>
      <span>共有:{{tableData.length}}</span>
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
</template>

<script>
import fileApi from "@/components/Store";
import request from "@/utils/request";
import gCCA from "@/components/gCCA";
import {Search} from "@element-plus/icons";
export default {
  name: "gCAC",
  components:{
    gCCA,
  },
  setup(){
    return{
      Search
    }
  },
  data(){
    return{
      user:{},
      user_stu:{},
      power:{},
      Fapi:fileApi.fileApi,

      drawer:false,
      tableData:[],
      tableDataCopy:[],
      multipleSelection:[],
      searchInfo:'',

      caStatus:'',
      zCeStatus:{
        grade:'',
        status:'',
        change_time:'',
      },

      scoreTable:[],
    }
  },
  created() {
    this.power=JSON.parse(sessionStorage.getItem('power'))
    if(this.power.type===1){
      this.user=JSON.parse(sessionStorage.getItem('user_t'))
      this.user_stu=JSON.parse(sessionStorage.getItem('user'))
    }else{
      this.user=JSON.parse(sessionStorage.getItem('user'))
    }
    this.getData();
  },
  methods:{
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
      this.$store.commit('setCode', 1)
      this.$store.commit('setInfo', this.multipleSelection)
    },
    changeStatus(){
      switch (this.caStatus) {
        case '关闭综测评分':this.zCeStatus.status='0'
          break
        case '开启综测填写':this.zCeStatus.status='1'
          break
        case '开启综测评分':this.zCeStatus.status='2'
      }
      request.post('/changeZongceStatus',this.zCeStatus).then(res=>{

      })
    },
    getData(){
      request.post('/getZongceStatus2',this.user).then(res=>{
        this.zCeStatus=res.data
        switch (this.zCeStatus.status) {
          case '0':this.caStatus="关闭综测评分"
                  break
          case '1':this.caStatus="开启综测填写"
                  break
          case '2':this.caStatus="开启综测评分"
        }
      })
      request.post('/getAllZongceOrdered', this.user).then(res=>{
        console.log(res)
        // this.scoreTable=res.data

        let tableData=[]
        let single={
          stu_name:'',
          stu_no:'',
          stu_class:'',
          d:0,
          z:0,
          t:0,
          m:0,
          l:0,
          all:0,
        }
        for(let i=0;i<res.data.length;i++){
          single.stu_name=res.data[i].stu_name
          single.stu_no=res.data[i].stu_no
          single.stu_class=res.data[i].stu_class
          single.d=res.data[i].d
          single.z=res.data[i].z
          single.t=res.data[i].t
          single.m=res.data[i].m
          single.l=res.data[i].l
          single.all=single.d+single.z+single.t+single.m+single.l
          tableData.push(JSON.parse(JSON.stringify(single)))
        }
        this.scoreTable=JSON.parse(JSON.stringify(tableData))
      })
      request.post('/Stu/stuList', this.user).then(res=>{
        if(this.power.type===1){
          let stu_class=this.user_stu.stu_class
          this.tableData=res.filter((value)=>{
            return value.stu_class===stu_class
          })
        }else{
          this.tableData=res
        }
        this.tableDataCopy=JSON.parse(JSON.stringify(this.tableData))
      }).catch(err=>{
        this.$message.error("学生信息请求错误")
      })
    },
    sortChangeForScore(val){
      if(val.order==='descending'){
        this.scoreTable.sort(function (a,b){
          let x=a[val.prop]-0
          let y=b[val.prop]-0
          return((x>y)?-1:((x<=y)?1:0))
        })
      }else{
        this.scoreTable.sort(function (a,b){
          let x=a[val.prop]-0
          let y=b[val.prop]-0
          return((x<=y)?-1:((x>y)?1:0))
        })
      }
    },
    downloadTable(){
      request.post('/downloadAllZongceT',this.user).then(res=>{
        window.open(this.Fapi+"/excel/"+res.data)
      })
    },
  },
}
</script>

<style scoped>

</style>