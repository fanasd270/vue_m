<template>
  <div style="position: relative; margin:20px 9% 0 9% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      报表
    </p>
    <br>

    <div style="width: 59%; height: 400px;border-radius: 2px;border: solid #9AFF9A; margin-bottom: 5px; display: inline-block;
    vertical-align: top">
      <el-scrollbar height="400px" style="display: inline-block; width: 50%">
        <el-table :data="sortClass" style="width: 100%" :default-sort="{ prop: 'score', order: 'descending' }" @row-click="showSingleClass">
          <el-table-column
              type="index"
              width="50">
          </el-table-column>
          <el-table-column
              prop="class_name"
              label="班级"
              width="150">
          </el-table-column>
          <el-table-column
              prop="score"
              label="分数"
              width="100"
              sortable>
          </el-table-column>
        </el-table>
      </el-scrollbar>

      <el-scrollbar height="400px" style="display: inline-block; width: 50%">
        <el-table :data="sortDorm" style="width: 100%" :default-sort="{ prop: 'score', order: 'descending' }" @row-click="showSingleDorm">
          <el-table-column
              type="index"
              width="50">
          </el-table-column>
          <el-table-column
              prop="room"
              label="宿舍"
              width="150">
          </el-table-column>
          <el-table-column
              prop="score"
              label="分数"
              width="100"
              sortable>
          </el-table-column>
        </el-table>
      </el-scrollbar>

    </div>
    <div style="display: inline-block; width: 40%; height: 400px; margin-left: 1%;border-radius: 2px;border: solid #9AFF9A;
    margin-bottom: 5px;
    vertical-align: top">
      <div style="display: inline-block; margin-left: 40%">志愿时长</div>
      <el-input style="width: 25%; margin-left: 10px" v-model="timeLimit" placeholder="输入最低时长" @input="timeChange"/>
      <el-divider></el-divider>
      <el-scrollbar height="310px">
        <el-table
            :data="volunteerData"
            style="width: 100%">
          <el-table-column
              type="index"
              width="50">
          </el-table-column>
          <el-table-column
              prop="stu_name"
              label="姓名"
              width="100">
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
              prop="time"
              label="时长"
              sortable>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </div>

    <div style="border-radius: 2px;border: solid #9AFF9A">
      <div class="echarts" style="display: inline-block">
        <div>班级绩点统计</div>
        <div id="chartClass" :style="{ width: '500px', height: '380px' }"></div>
      </div>
    </div>

    <div style="border-radius: 2px;border: solid #9AFF9A">
      <div>
        <!--      <span style="position: absolute; top: 20px">党团统计</span>-->
        <el-dropdown split-button type="primary" style="margin-bottom: 20px;">
          选择班级
          <template #dropdown>
            <el-dropdown-menu style="margin: 0 3px 0 3px">
              <el-checkbox v-model="checkAll" @change="CheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="checkedClassList" @change="changeOption">
                <div v-for="(m,i) in DTClassList">
                  <el-checkbox :label="m" size="large"></el-checkbox>
                </div>
              </el-checkbox-group>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>


      <div class="echarts" style="display: inline-block">
        <div>党团统计</div>
        <div id="chartDT" :style="{ width: '380px', height: '300px' }"></div>
      </div>


      <div class="echarts" style="display: inline-block">
        <div>民族统计</div>
        <div id="chartEthnic" :style="{ width: '380px', height: '300px' }"></div>
      </div>

      <div class="echarts" style="display: inline-block">
        <div>降级生统计</div>
        <div id="chartDemoted" :style="{ width: '380px', height: '300px' }"></div>
      </div>
    </div>

    <div style="border-radius: 2px;border: solid #9AFF9A; margin-top: 10px">

      <div style="margin-top: 5px">
        <el-select v-model="choosedClass" placeholder="请选择" @change="changeClass" style="margin-right: 10px">
          <el-option
              v-for="(item,key,index) in otherClassPoint"
              :key="key"
              :label="key"
              :value="key">
          </el-option>
        </el-select>

        <el-select v-model="choosedFilterTerms" placeholder="请选择学期" @change="changeTerms" style="margin-right: 10px" multiple collapse-tags clearable>
          <el-option
              v-for="(item,key,index) in filterTerms"
              :key="item.value"
              :label="item.value"
              :value="item.value">
          </el-option>
        </el-select>

        <el-input
            v-model="searchInfo"
            placeholder="搜索学生或课程"
            :prefix-icon="Search"
            style="width: 20%; margin-bottom: 5px"
            @keyup.enter="searchFun"
            clearable
            @clear="clearSearch"
        />
        <el-button :icon="Search" circle size="small" @click="searchFun" style="margin-left: 5px"></el-button>
      </div>

      <el-table
          :data="showPoints"
          stripe
          style="width: 100%">
        <el-table-column
            prop="final_Information_no_stu_no"
            label="学号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="final_Information_stu_name"
            label="姓名">
        </el-table-column>
        <el-table-column
            prop="final_Information_year"
            label="学年学期"
            :filters="this.filterTerms"
            :filter-method="filterTermsHandler">
        </el-table-column>
        <el-table-column
            prop="final_Information_dept"
            label="学院"
        >
        </el-table-column>
        <el-table-column
            prop="final_Information_no"
            label="班级"
            width="120">
        </el-table-column>
        <el-table-column
            prop="final_Information_no_coursename"
            label="课程名称"
            width="150">
        </el-table-column>
        <el-table-column
            prop="final_Information_coursecode"
            label="课程代码"
            width="120"
        >
        </el-table-column>
        <el-table-column
            prop="credits"
            label="课程学分"
        >
        </el-table-column>
        <el-table-column
            prop="final_Information_character"
            label="修读性质"
        >
        </el-table-column>
        <el-table-column
            prop="final_Information_comprehensive_achievements"
            label="综合成绩"
            sortable>
        </el-table-column>
        <el-table-column
            prop="final_Information_effective_achievement"
            label="有效成绩"
            sortable>
        </el-table-column>
        <el-table-column
            prop="final_Information_examination_situation"
            label="考试情况">
        </el-table-column>
        <el-table-column
            prop="final_Information_examination_type"
            label="考试类型">
        </el-table-column>
      </el-table>
      <el-pagination
          v-model:currentPage="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

  </div>

<!--  图表学生详细信息-->
  <el-dialog
      v-model="InfoListShow"
      :title="InfoName"
      width="60%"
  >
    <el-table :data="showChartInfoList" class="detailChartInfo">
      <el-table-column prop="stu_name" label="姓名" width="100" fixed/>
      <el-table-column
          prop="stu_no"
          label="学号"
          width="130"
      />
      <el-table-column
          prop="stu_class"
          label="班级"
          width="130"
      />
      <el-table-column
          prop="stu_gender"
          label="性别"
          :formatter="genderFormatter"
      />
      <el-table-column
          prop="stu_politicalface"
          label="政治面貌"
          width="100"
      />
      <el-table-column prop="stu_caucus_time" label="入党/团时间" width="120"/>
      <el-table-column
          prop="stu_ethnic"
          label="民族"
          width="100"
      />
      <el-table-column
          prop="stu_ismacau"
          label="是否港澳"
          width="100"
          :formatter="macauFormatter"
      />
      <el-table-column prop="stu_origin" label="籍贯"  width="180"/>
      <el-table-column prop="stu_id" label="身份证号" width="180"/>
      <el-table-column prop="stu_birthday" label="出生年月" width="120"/>
      <el-table-column prop="stu_address" label="常驻地址"  width="180"/>
      <el-table-column prop="stu_telephone" label="电话"  width="120"/>
      <el-table-column prop="stu_qq" label="QQ" width="120"/>
      <el-table-column prop="stu_email" label="邮箱"  width="220"/>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="InfoListShow = false">关闭</el-button>
        <el-button @click="exportExcel">导出</el-button>
      </span>
    </template>
  </el-dialog>

<!--  班级宿舍排名详细-->
  <el-dialog
      v-model="classShow"
      width="60%"
  >
    <el-descriptions
        direction="vertical"
        :column="7"
        border
    >
      <el-descriptions-item label="班级">{{singleClass.class_name}}</el-descriptions-item>
      <el-descriptions-item label="分数">{{singleClass.score}}</el-descriptions-item>
      <el-descriptions-item label="平均绩点">{{singleClass.GPA}}</el-descriptions-item>
      <el-descriptions-item label="论文数">{{singleClass.paper_num}}</el-descriptions-item>
      <el-descriptions-item label="专利数">{{singleClass.patent_num}}</el-descriptions-item>
      <el-descriptions-item label="竞赛数">{{singleClass.contest_num}}</el-descriptions-item>
      <el-descriptions-item label="项目数">{{singleClass.project_num}}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>

  <el-dialog
      v-model="dormShow"
      width="60%"
  >
    <el-descriptions
        direction="vertical"
        :column="7"
        border
    >
      <el-descriptions-item label="宿舍">{{singleDorm.room}}</el-descriptions-item>
      <el-descriptions-item label="分数">{{singleDorm.score}}</el-descriptions-item>
      <el-descriptions-item label="平均绩点">{{singleDorm.GPA}}</el-descriptions-item>
      <el-descriptions-item label="论文数">{{singleDorm.paper_num}}</el-descriptions-item>
      <el-descriptions-item label="专利数">{{singleDorm.patent_num}}</el-descriptions-item>
      <el-descriptions-item label="竞赛数">{{singleDorm.contest_num}}</el-descriptions-item>
      <el-descriptions-item label="项目数">{{singleDorm.project_num}}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script>
import * as echarts from "echarts";
import request from "@/utils/request";
import {Search} from "@element-plus/icons";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
export default {
  name: "gCTable",
  setup(){
    return{
      Search,
    }
  },

  data() {
    return {

      classShow:false,
      singleClass:{},
      dormShow:false,
      singleDorm:{},

      sortClass:[],
      sortDorm:[],

      user:{},
      power:{},
      checkAll:true,

      showPoints:[],
      showPointsCopy:[],
      otherClassPoint:{},
      searchInfo:'',
      choosedClass:'',
      //分页数据
      currentPage: 1,
      pageSize:20,
      total:0,

      filterTerms:[],
      choosedFilterTerms:[],

      DTClassList:[],
      EthnicClassList:[],
      checkedClassList:[],

      DTMsg:[],
      EthnicMsg:[],
      DemotedMsg:[],

      DTChart:null,
      EthnicChart:null,
      DemotedChart:null,
      ClassChart:null,
      option : {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 0,
                name: '党员'
              },
              {
                value: 0,
                name: '团员'
              },
              {
                value: 0,
                name: '群众'
              }
            ]
          }
        ],
        tooltip:{
          trigger:'item',
          axisPointer:{
            type:'shadow'
          },
          formatter:'{b}:{c}<br/>百分比:{d}%'
        },
      },

      optionEthnic : {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 0,
                name: '少数民族'
              },
              {
                value: 0,
                name: '汉族'
              }
            ]
          }
        ],
        tooltip:{
          trigger:'item',
          axisPointer:{
            type:'shadow'
          },
          formatter:'{b}:{c}<br/>百分比:{d}%'
        },
      },

      optionDemoted : {
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 0,
                name: '降级生'
              },
              {
                value: 0,
                name: '普通生'
              }
            ]
          }
        ],
        tooltip:{
          trigger:'item',
          axisPointer:{
            type:'shadow'
          },
          formatter:'{b}:{c}<br/>百分比:{d}%'
        },
      },

      optionClass:{
        legend:{
          orient:'horizontal',
          x:'right',
          y:'top',
          data:[],
          textStyle:{
            fontsize:6
          },
        },
        tooltip:{
          trigger:'axis',
          show:true,
          axisPointer:{
            type:'shadow'
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },

        xAxis: {
          data: []
        },
        yAxis: {
          name:'平均GPA',
          type:'value',
          min:2,
          max:4,
          splitNumber:8,
        },
        series: []
      },

      volunteerData:[],
      volunteerDataCopy:[],
      timeLimit:null,

      showChartInfoList:[],
      InfoListShow:false,
      InfoName:'',
    };
  },

  mounted() {
    this.init()
    this.initEthnic()
    this.initDemoted()
    this.initClass()
  },

  created() {
    this.power=JSON.parse(sessionStorage.getItem('power'))
    if(this.power.type===1){
      this.user=JSON.parse(sessionStorage.getItem('user_t'))
    }else{
      this.user=JSON.parse(sessionStorage.getItem('user'))
    }
    this.getData()
  },


  methods: {
    showSingleClass(row){
      this.classShow=true
      this.singleClass=row
    },
    showSingleDorm(row){
      this.dormShow=true
      this.singleDorm=row
    },
    genderFormatter(row, column){
      if(row.stu_gender=== 0){
        return '女'
      } else{
        return '男'
      }
    },
    macauFormatter(row, column){
      if(row.stu_ismacau=== 0){
        return '否'
      } else{
        return '是'
      }
    },

    //学期筛选
    changeTerms(){
      this.showPoints=[]
      let tempList=[]
      for(let index in this.choosedFilterTerms){
        tempList=this.showPointsCopy.filter((value)=>{
          return value.final_Information_year===this.choosedFilterTerms[index]
        })
        this.showPoints=this.showPoints.concat(tempList)
      }
    },


    //班级选择
    changeClass(val){
      this.showPoints=JSON.parse(JSON.stringify(this.otherClassPoint[val]))
      this.total=this.showPoints.length
      this.showPointsCopy=this.otherClassPoint[val]
      this.showPoints=this.showPoints.splice((this.currentPage-1)*this.pageSize, this.pageSize)
    },

    //搜索
    searchFun(){
      let fuzzy=this.searchInfo
      if(fuzzy){
        this.showPoints=this.showPointsCopy.filter((value)=>{
          return value.final_Information_stu_name.includes(fuzzy)||value.final_Information_no_coursename.includes(fuzzy)
        })
      }else{
        this.showPoints=JSON.parse(JSON.stringify(this.showPointsCopy))
      }
    },
    //清空搜索
    clearSearch(){
      this.showDataChange()
    },
    handleSizeChange(pageSize){//改变每页数量触发
      this.searchInfo=null
      this.pageSize=pageSize
      this.showDataChange()
    },
    handleCurrentChange(currentPage){//改变页码触发
      this.searchInfo=null
      this.currentPage=currentPage
      this.showDataChange()
    },
    showDataChange(){
      this.choosedFilterTerms=[]
      this.showPoints=JSON.parse(JSON.stringify(this.showPointsCopy))
      this.showPoints=this.showPoints.splice((this.currentPage-1)*this.pageSize, this.pageSize)
    },

    //志愿时长筛选
    timeChange(){
      let fuzzy=this.timeLimit
      if(fuzzy){
        this.volunteerData=this.volunteerDataCopy.filter((value)=>{
          return value.time>=fuzzy
        })
      }else{
        this.volunteerData=JSON.parse(JSON.stringify(this.volunteerDataCopy))
      }
    },
    //党团班级全选按钮
    CheckAllChange(){
      if(this.checkAll===true){
        this.checkedClassList=this.DTClassList
      }
      else{
        this.checkedClassList=[]
      }
      this.changeOption()
    },
    //党团班级选择改变
    changeOption(){
      //重置党团数据
      this.option.series[0].data[0].value=0
      this.option.series[0].data[1].value=0
      this.option.series[0].data[2].value=0
      //重置民族数据
      this.optionEthnic.series[0].data[0].value=0
      this.optionEthnic.series[0].data[1].value=0
      //重置降级生
      this.optionDemoted.series[0].data[0].value=0
      this.optionDemoted.series[0].data[1].value=0

      for(let i in this.checkedClassList){
        //党团
        for(let j=0;j<this.DTMsg.length;j+=3){
          if(this.checkedClassList[i]===this.DTMsg[j].ele_class){
            this.option.series[0].data[0].value+=this.DTMsg[j].ele_count
            this.option.series[0].data[1].value+=this.DTMsg[j+1].ele_count
            this.option.series[0].data[2].value+=this.DTMsg[j+2].ele_count
            break
          }
        }
        //民族
        for(let j=0;j<this.EthnicMsg.length;j+=2){
          if(this.checkedClassList[i]===this.EthnicMsg[j].ele_class){
            this.optionEthnic.series[0].data[0].value+=this.EthnicMsg[j].ele_count
            this.optionEthnic.series[0].data[1].value+=this.EthnicMsg[j+1].ele_count
            break
          }
        }
        //降级生
        for(let j=0;j<this.DemotedMsg.length;j+=2){
          if(this.checkedClassList[i]===this.DemotedMsg[j].ele_class){
            this.optionDemoted.series[0].data[0].value+=this.DemotedMsg[j].ele_count
            this.optionDemoted.series[0].data[1].value+=this.DemotedMsg[j+1].ele_count
            break
          }
        }

      }
      this.init()
      this.initEthnic()
      this.initDemoted()
      this.initClass()
    },
    //重新画党团图
    init(){
      this.DTChart = echarts.init(document.getElementById("chartDT"));
      this.DTChart.setOption(this.option);
      this.DTChart.off('click')
      let that=this
      this.DTChart.on('click',function (param){
        if(param.name==='党员'){
          request.post('/findDangYuan',that.user).then(res=>{
            that.InfoListShow=true
            that.InfoName=param.name
            that.showChartInfoList=[]
            let tempList=[]
            for(let index in that.checkedClassList){
              tempList=res.data.filter((value)=>{
                return value.stu_class===that.checkedClassList[index]
              })
              that.showChartInfoList=that.showChartInfoList.concat(tempList)
            }
          }).catch(err=>{
            that.$message.error("访问失败")
          })
        }else if(param.name==='团员'){
          request.post('/findTuanYuan',that.user).then(res=>{
            that.InfoListShow=true
            that.InfoName=param.name
            that.showChartInfoList=[]
            let tempList=[]
            for(let index in that.checkedClassList){
              tempList=res.data.filter((value)=>{
                return value.stu_class===that.checkedClassList[index]
              })
              that.showChartInfoList=that.showChartInfoList.concat(tempList)
            }
          }).catch(err=>{
            that.$message.error("访问失败")
          })
        }else if(param.name==='群众'){
          request.post('/findQunzhong',that.user).then(res=>{
            that.InfoListShow=true
            that.InfoName=param.name
            that.showChartInfoList=[]
            let tempList=[]
            for(let index in that.checkedClassList){
              tempList=res.data.filter((value)=>{
                return value.stu_class===that.checkedClassList[index]
              })
              that.showChartInfoList=that.showChartInfoList.concat(tempList)
            }
          }).catch(err=>{
            that.$message.error("访问失败")
          })
        }
      })
    },

    initEthnic(){
      this.EthnicChart = echarts.init(document.getElementById("chartEthnic"));
      this.EthnicChart.setOption(this.optionEthnic);
      this.EthnicChart.off('click')
      let that=this
      this.EthnicChart.on('click',function (param){
        if(param.name==='汉族'){
          request.post('/findbigethnic',that.user).then(res=>{
            that.InfoListShow=true
            that.InfoName=param.name

            that.showChartInfoList=[]
            let tempList=[]
            for(let index in that.checkedClassList){
              tempList=res.data.filter((value)=>{
                  return value.stu_class===that.checkedClassList[index]
                })
              that.showChartInfoList=that.showChartInfoList.concat(tempList)
            }
          }).catch(err=>{
            that.$message.error("访问失败")
          })
        }else if(param.name==='少数民族'){
          request.post('/findsmallethnic',that.user).then(res=>{
            that.InfoListShow=true
            that.InfoName=param.name
            that.showChartInfoList=[]
            let tempList=[]
            for(let index in that.checkedClassList){
              tempList=res.data.filter((value)=>{
                return value.stu_class===that.checkedClassList[index]
              })
              that.showChartInfoList=that.showChartInfoList.concat(tempList)
            }
          }).catch(err=>{
            that.$message.error("访问失败")
          })
        }
      })
    },

    initDemoted(){
      this.DemotedChart = echarts.init(document.getElementById("chartDemoted"));
      this.DemotedChart.setOption(this.optionDemoted);
      this.DemotedChart.off('click')
      let that=this
      this.DemotedChart.on('click',function (param){
        if(param.name==='降级生'){
          request.post('/findJiangji',that.user).then(res=>{
            that.InfoListShow=true
            that.InfoName=param.name
            that.showChartInfoList=[]
            let tempList=[]
            for(let index in that.checkedClassList){
              tempList=res.data.filter((value)=>{
                return value.stu_class===that.checkedClassList[index]
              })
              that.showChartInfoList=that.showChartInfoList.concat(tempList)
            }
          }).catch(err=>{
            that.$message.error("访问失败")
          })
        }
      })
    },
    initClass(){
      this.ClassChart = echarts.init(document.getElementById("chartClass"));
      this.ClassChart.setOption(this.optionClass);
    },


    getData(){
      request.post('/findParty_and_League',this.user).then(res=>{
        this.DTMsg=res.data
        this.DTClassList=[]
        for(let i=0;i<this.DTMsg.length;i+=3){
          this.DTClassList.push(this.DTMsg[i].ele_class)
        }
        this.checkedClassList=this.DTClassList
        this.changeOption()

        request.post('/ethnic_minority',this.user).then(res=>{
          this.EthnicMsg=res.data
          this.changeOption()
        }).catch(err=>{
          this.$message.error("获取信息失败")
        })

        request.post('/findDemoted_student',this.user).then(res=>{
          this.DemotedMsg=res.data
          this.changeOption()
        }).catch(err=>{
          this.$message.error("获取信息失败")
        })

        request.post('/findVolunteer_Hours',this.user).then(res=>{
          this.volunteerData=res.data
          this.volunteerDataCopy=JSON.parse(JSON.stringify(this.volunteerData))
        }).catch(err=>{
          this.$message.error("获取信息失败")
        })

        request.post('/findFailedstudent',this.user).then(res=>{
          this.otherClassPoint=res.data
          for(let item in this.otherClassPoint){
            for(let m in this.otherClassPoint[item]){
              if(this.filterTerms.findIndex(t=>t.value===this.otherClassPoint[item][m].final_Information_year)===-1){
                this.filterTerms.push({text:this.otherClassPoint[item][m].final_Information_year,value:this.otherClassPoint[item][m].final_Information_year})
              }
            }
          }
        })
        request.post('/findGradePointGroupByclass',this.user).then(res=>{
          let tempClass
          for(let Cla in res.data){
            tempClass={name:'',data:[],type:'line'}
            tempClass.name=Cla
            for(let year in res.data[Cla]){
              let tempGPA=0
              if(this.optionClass.xAxis.data.indexOf(year)===-1){
                this.optionClass.xAxis.data.push(year)
              }
              for(let i in res.data[Cla][year]){
                tempGPA+=res.data[Cla][year][i].grade_point_gpa-0
              }
              tempClass.data.push(parseFloat(tempGPA/res.data[Cla][year].length).toFixed(3))
            }
            this.optionClass.series.push(JSON.parse(JSON.stringify(tempClass)))
            this.optionClass.legend.data.push(tempClass.name)
          }
          this.sortTerm()
          this.initClass()
        }).catch(err=>{
          this.$message.error("连接失败")
        })

        request.post('/findScoreByClass',this.user).then(res=>{
          let tempClass={class_name:'',score:0,GPA:0,paper_num:0,patent_num:0,project_num:0,contest_num:0}
          for(let index in res.data){
            tempClass.class_name=res.data[index].class_name
            tempClass.paper_num=res.data[index].paper_num
            tempClass.patent_num=res.data[index].patent_num
            tempClass.project_num=res.data[index].project_num
            tempClass.contest_num=res.data[index].contest_num
            for(let j in res.data[index].alltotalGradePoint){
              tempClass.GPA+=res.data[index].alltotalGradePoint[j]
            }
            tempClass.GPA=tempClass.GPA/res.data[index].alltotalGradePoint.length
            tempClass.score=parseFloat(tempClass.GPA*10+tempClass.paper_num+tempClass.patent_num+tempClass.project_num+tempClass.contest_num).toFixed(3)
            this.sortClass.push(JSON.parse(JSON.stringify(tempClass)))
          }
        })

        request.post('/findScoreByBedRoom',this.user).then(res=>{
          let tempDorm={room:'',score:0,GPA:0,paper_num:0,patent_num:0,project_num:0,contest_num:0}
          for(let index in res.data){
            tempDorm.room=res.data[index].room
            tempDorm.paper_num=res.data[index].paper_num
            tempDorm.patent_num=res.data[index].patent_num
            tempDorm.project_num=res.data[index].project_num
            tempDorm.contest_num=res.data[index].contest_num
            for(let j in res.data[index].score){
              tempDorm.GPA+=res.data[index].score[j]
            }
            tempDorm.GPA=tempDorm.GPA/res.data[index].score.length
            tempDorm.score=parseFloat(tempDorm.GPA*10+tempDorm.paper_num+tempDorm.patent_num+tempDorm.project_num+tempDorm.contest_num).toFixed(3)
            this.sortDorm.push(JSON.parse(JSON.stringify(tempDorm)))
          }
        })

      }).catch(err=>{
        this.$message.error("获取信息失败")
      })

    },
    sortTerm(){
      let tempData=this.optionClass.xAxis.data
      for(let i=0;i<tempData.length;i++){
        for(let j=i+1;j<tempData.length;j++){
          if((tempData[i].substring(0,4)>tempData[j].substring(0,4))||(tempData[i].substring(0,4)===tempData[j].substring(0,4)&&tempData[i].substring(5,6)==='秋')){
            let temp=tempData[i]
            tempData[i]=tempData[j]
            tempData[j]=temp
            for(let t=0;t<this.optionClass.series.length;t++){
              let temp2=this.optionClass.series[t].data[i]
              this.optionClass.series[t].data[i]=this.optionClass.series[t].data[j]
              this.optionClass.series[t].data[j]=temp2
            }
          }
        }
      }
    },

    exportExcel() {
      // 设置当前日期
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = year + "" + month + "" + day;
      /* generate workbook object from table */
      //  .table要导出的是哪一个表格
      var wb = XLSX.utils.table_to_book(document.querySelector(".detailChartInfo"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        //  name+'.xlsx'表示导出的excel表格名字
        FileSaver.saveAs(
            new Blob([wbout], { type: "application/octet-stream" }),
            name + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
  },
}
</script>

<style scoped>

</style>