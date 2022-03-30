<template>
<div style="width: 96vw; margin: 5px 2vw 0 2vw;">
  <el-checkbox v-model="showAll" @change="handleCheckAllChange">全选</el-checkbox>

    <el-checkbox v-model="isShow[0]" label="班级"/>
    <el-checkbox v-model="isShow[1]" label="性别" />
  <el-checkbox v-model="isShow[2]" label="政治面貌" />
  <el-checkbox v-model="isShow[3]" label="入党/团时间" />
  <el-checkbox v-model="isShow[4]" label="民族" />
  <el-checkbox v-model="isShow[5]" label="是否港澳" />
  <el-checkbox v-model="isShow[6]" label="籍贯" />
  <el-checkbox v-model="isShow[7]" label="身份证号" />
  <el-checkbox v-model="isShow[8]" label="出生年月" />
  <el-checkbox v-model="isShow[9]" label="常驻地址" />
  <el-checkbox v-model="isShow[10]" label="电话" />
  <el-checkbox v-model="isShow[11]" label="QQ" />
  <el-checkbox v-model="isShow[12]" label="邮箱" />

  <el-input
      v-model="searchInfo.stu_name"
      placeholder="模糊查询名字或学号"
      :prefix-icon="Search"
      style="width: 20%; margin-bottom: 5px"
      @keyup.enter="searchFun"
      clearable
      @clear="deleteSearch"
  />
  <el-button :icon="Search" circle size="small" @click="searchFun" style="margin-left: 5px"></el-button>
  <el-button @click="exportExcel">
    导出
  </el-button>
  <el-scrollbar height="90vh">
    <div style="border: #008c8c solid; height: 70vh">
      <el-table
          class="stuinfo"
          :data="tableData"
          style="width: 100%"
          max-height="600"
          @row-click="stuInfoDetail">
<!--      <el-table ref="tableRef" :data="tableData"  style="width: 100%" max-height="600" @rwo-click="stuInfoDetail">-->
        <el-table-column prop="stu_name" label="姓名" width="100" fixed/>
        <el-table-column
            prop="stu_no"
            label="学号"
            width="130"
            sortable
        />
        <el-table-column
            prop="stu_class"
            label="班级"
            v-if="isShow[0]"
            width="130"
            :filters="this.filterClass"
            :filter-method="filterClassHandler"
        />
        <el-table-column
            prop="stu_gender"
            label="性别"
            v-if="isShow[1]"
            :filters="this.filterGender"
            :filter-method="filterGenderHandler"
            :formatter="genderFormatter"
        />
        <el-table-column
            prop="stu_politicalface"
            label="政治面貌"
            v-if="isShow[2]"
            width="100"
            :filters="this.filterFace"
            :filter-method="filterFaceHandler"
        />
        <el-table-column prop="stu_caucus_time" label="入党/团时间" v-if="isShow[3]" width="120"/>
        <el-table-column
            prop="stu_ethnic"
            label="民族"
            v-if="isShow[4]"
            width="100"
            :filters="this.filterEthnic"
            :filter-method="filterEthnicHandler"
        />
        <el-table-column
            prop="stu_ismacau"
            label="是否港澳"
            v-if="isShow[5]"
            width="100"
            :filters="this.filterMacau"
            :filter-method="filterMacauHandler"
            :formatter="macauFormatter"
        />
        <el-table-column prop="stu_origin" label="籍贯" v-if="isShow[6]" width="180"/>
        <el-table-column prop="stu_id" label="身份证号" v-if="isShow[7]" width="180"/>
        <el-table-column prop="stu_birthday" label="出生年月" v-if="isShow[8]" width="120"/>
        <el-table-column prop="stu_address" label="常驻地址" v-if="isShow[9]" width="180"/>
        <el-table-column prop="stu_telephone" label="电话" v-if="isShow[10]" width="120"/>
        <el-table-column prop="stu_qq" label="QQ" v-if="isShow[11]" width="120"/>
        <el-table-column prop="stu_email" label="邮箱" v-if="isShow[12]" width="220"/>
      </el-table>
    </div>

  </el-scrollbar>

  <el-dialog
      v-model="infoDialog"
      title="详细信息"
      width="700px"
  >
    <div>
      <div>
        <el-image
            style="width: 96px; height: 96px;"
            :src="headUrl"
        ></el-image>

        <el-descriptions :column="3" size="small" border style="display: inline-block; width: 564px">
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                姓名
              </div>
            </template>
            {{detailInfo.stu_name}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                学号
              </div>
            </template>
            {{detailInfo.stu_no}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                专业
              </div>
            </template>
            {{detailInfo.stu_major}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                性别
              </div>
            </template>
            <span v-if="detailInfo.stu_gender===1">男</span>
            <span v-if="detailInfo.stu_gender===0">女</span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                出生日期
              </div>
            </template>
            {{detailInfo.stu_birthday}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                电话
              </div>
            </template>
            {{detailInfo.stu_telephone}}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                地址
              </div>
            </template>
            {{detailInfo.stu_address}}
          </el-descriptions-item>
        </el-descriptions>
        <el-collapse v-model="activeName1">
          <el-collapse-item title="更多基本信息" name="1">
            <el-descriptions>
              <el-descriptions-item label="班级">{{detailInfo.stu_class}}</el-descriptions-item>
              <el-descriptions-item label="民族">{{detailInfo.stu_ethnic}}</el-descriptions-item>
              <el-descriptions-item label="籍贯">{{detailInfo.stu_origin}}</el-descriptions-item>
              <el-descriptions-item label="身份证号">{{detailInfo.stu_id}}</el-descriptions-item>
              <el-descriptions-item label="政治面貌">{{detailInfo.stu_politicalface}}</el-descriptions-item>
              <el-descriptions-item label="党团时间">{{detailInfo.stu_caucus_time}}</el-descriptions-item>
              <el-descriptions-item label="是否港澳">
                <span v-if="detailInfo.stu_ismacau===1">是</span>
                <span v-if="detailInfo.stu_ismacau===0">否</span>
              </el-descriptions-item>
              <el-descriptions-item label="QQ">{{detailInfo.stu_qq}}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{detailInfo.stu_email}}</el-descriptions-item>
              <el-descriptions-item label="入学时间">{{detailInfo.stu_join_time}}</el-descriptions-item>
            </el-descriptions>
          </el-collapse-item>
          <el-collapse-item title="入住信息" name="2">
            <el-descriptions v-if="detailInfo.stu_accommodation!=null">
              <el-descriptions-item label="楼栋">{{detailInfo.stu_accommodation.accommodation_information_building}}</el-descriptions-item>
              <el-descriptions-item label="房号">{{detailInfo.stu_accommodation.accommodation_information_room_no}}</el-descriptions-item>
              <el-descriptions-item label="床号">{{detailInfo.stu_accommodation.accommodation_information_bed}}</el-descriptions-item>
              <el-descriptions-item label="是否室长">{{detailInfo.stu_accommodation.accommodation_information_ismain}}</el-descriptions-item>
            </el-descriptions>
          </el-collapse-item>
          <el-collapse-item title="家庭信息" name="3">
            <el-descriptions v-if="detailInfo.stu_family[0]!=null" :title="detailInfo.stu_family[0].family_relationship">
              <el-descriptions-item label="姓名">{{detailInfo.stu_family[0].family_name}}</el-descriptions-item>
              <el-descriptions-item label="年龄">{{detailInfo.stu_family[0].family_age}}</el-descriptions-item>
              <el-descriptions-item label="电话">{{detailInfo.stu_family[0].family_tel}}</el-descriptions-item>
              <el-descriptions-item label="工作">{{detailInfo.stu_family[0].family_work}}</el-descriptions-item>
              <el-descriptions-item label="职位">{{detailInfo.stu_family[0].family_duties}}</el-descriptions-item>
              <el-descriptions-item label="工作地点">{{detailInfo.stu_family[0].family_workplace}}</el-descriptions-item>
              <el-descriptions-item label="是否第一监护人">{{detailInfo.stu_family[0].family_ismain}}</el-descriptions-item>
            </el-descriptions>
            <el-descriptions v-if="detailInfo.stu_family[1]!=null" :title="detailInfo.stu_family[1].family_relationship">
              <el-descriptions-item label="姓名">{{detailInfo.stu_family[1].family_name}}</el-descriptions-item>
              <el-descriptions-item label="年龄">{{detailInfo.stu_family[1].family_age}}</el-descriptions-item>
              <el-descriptions-item label="电话">{{detailInfo.stu_family[1].family_tel}}</el-descriptions-item>
              <el-descriptions-item label="工作">{{detailInfo.stu_family[1].family_work}}</el-descriptions-item>
              <el-descriptions-item label="职位">{{detailInfo.stu_family[1].family_duties}}</el-descriptions-item>
              <el-descriptions-item label="工作地点">{{detailInfo.stu_family[1].family_workplace}}</el-descriptions-item>
              <el-descriptions-item label="是否第一监护人">{{detailInfo.stu_family[1].family_ismain}}</el-descriptions-item>
            </el-descriptions>
          </el-collapse-item>
          <el-collapse-item title="成长档案" name="4">
            <el-collapse v-model="activeName2" style="margin-left: 3%">
              <el-collapse-item title="社会工作" name="5">
              <el-table :data="detailInfo.socialWords" style="width: 100%">
                <el-table-column label="年度" width="180">
                  <template #default="scope">
                    <div style="display: flex; align-items: center">
                      <el-icon><timer /></el-icon>
                      <span style="margin-left: 10px">{{ scope.row.social_activity_start_time }}年-{{scope.row.social_activity_end_time}}年</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="职务" width="180">
                  <template #default="scope">
                    <div style="display: flex; align-items: center">
                      <span style="margin-left: 10px">{{ scope.row.social_activity_name }}</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              </el-collapse-item>
              <el-collapse-item title="论文" name="1">
                <div v-for="(m,index) in detailInfo.paper">
                  <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
                    <el-descriptions-item label="论文名称:">{{m.paper_name}}</el-descriptions-item>
                    <el-descriptions-item label="发表期刊/会议名称:">{{m.paper_periodical}}</el-descriptions-item>
                    <el-descriptions-item label="出版时间:">{{m.paper_publicationTime}}</el-descriptions-item>
                    <el-descriptions-item label="是否CSCD:">{{m.paper_iscscd}}</el-descriptions-item>
                    <el-descriptions-item label="SCI检索号:">{{m.paper_sciSearchNumber}}</el-descriptions-item>
                    <el-descriptions-item label="EI检索号:">{{m.paper_eiSearchNumber}}</el-descriptions-item>
                    <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadPaper(m.paper_supporting_materials)">点击下载</span></el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-collapse-item>
              <el-collapse-item title="专利" name="2">
                <div v-for="(m,index) in detailInfo.patent">
                  <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
                    <el-descriptions-item label="专利名称:">{{m.patent_name}}</el-descriptions-item>
                    <el-descriptions-item label="专利类型:">{{m.patent_type}}</el-descriptions-item>
                    <el-descriptions-item label="专利申请号:">{{m.patent_application_no}}</el-descriptions-item>
                    <el-descriptions-item label="专利申请日:">{{m.patent_application_time}}</el-descriptions-item>
                    <el-descriptions-item label="专利证书号:">{{m.patent_certificate_no}}</el-descriptions-item>
                    <el-descriptions-item label="专利获权时间:">{{m.patent_authorization_time}}</el-descriptions-item>
                    <el-descriptions-item label="是否第一发明人:">{{m.patent_isfirstone}}</el-descriptions-item>
                    <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadPatent(m.patent_supporting_materials)">点击下载</span></el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-collapse-item>
              <el-collapse-item title="竞赛" name="3">
                <div v-for="(m,index) in detailInfo.contest">
                  <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
                    <el-descriptions-item label="竞赛名称:">{{m.contest_name}}</el-descriptions-item>
                    <el-descriptions-item label="项目名称:">{{m.contest_projectname}}</el-descriptions-item>
                    <el-descriptions-item label="授予部门:">{{m.contest_grantingdepartment}}</el-descriptions-item>
                    <el-descriptions-item label="获奖级别:">{{m.contest_level}}</el-descriptions-item>
                    <el-descriptions-item label="获奖名次:">{{m.contest_ranking}}</el-descriptions-item>
                    <el-descriptions-item label="获奖时间:">{{m.contest_date}}</el-descriptions-item>
                    <el-descriptions-item label="指导老师姓名:">{{m.contest_teachername}}</el-descriptions-item>
                    <el-descriptions-item label="指导老师学院:">{{m.contest_teacherdept}}</el-descriptions-item>
                    <el-descriptions-item label="获奖证书上传:">{{m.contest_issubmitcertificate}}</el-descriptions-item>
                    <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadContest(m.contest_supporting_materials)">点击下载</span></el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-collapse-item>
              <el-collapse-item title="项目" name="4">
                <div v-for="(m,index) in detailInfo.project">
                  <el-descriptions style="padding: 10px 5px 0 5px" :column=4>
                    <el-descriptions-item label="项目名称:">{{m.project_name}}</el-descriptions-item>
                    <el-descriptions-item label="项目所在单位:">{{m.project_unit}}</el-descriptions-item>
                    <el-descriptions-item label="项目类型:">{{m.project_type}}</el-descriptions-item>
                    <el-descriptions-item label="项目状态:">{{m.project_status}}</el-descriptions-item>
                    <el-descriptions-item label="参与项目时间:">{{m.project_join_time}}</el-descriptions-item>
                    <el-descriptions-item label="指导老师姓名:">{{m.project_teacher_name}}</el-descriptions-item>
                    <el-descriptions-item label="指导老师学院:">{{m.project_teacher_dept}}</el-descriptions-item>
                    <el-descriptions-item label="是否已提交证书:">{{m.project_issubmit}}</el-descriptions-item>
                    <el-descriptions-item label="证明材料:"><span style="color:cornflowerblue;" @click="downloadProject(m.project_supporting_materials)">点击下载</span></el-descriptions-item>
                  </el-descriptions>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
          <el-collapse-item title="个人发展规划" name="5">

            <div v-if="developmentPlanYears.length!==0">
              <el-select v-model="selectYear" placeholder="请选择学期" style="width: 20%" @change="selectYearChanged">
                <el-option
                    v-for="item in developmentPlanYears"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
              <el-button @click="downloadPlan" style="margin-left: 5px">下载</el-button>
              <el-descriptions class="margin-top" :column="1" border>

                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item" style="width: 4em">
                      基本信息
                    </div>
                  </template>
                  <div style="width: 33%;display: inline-block">
                    <span>姓名:</span>
                    <span>{{developmentPlan.development_planning_stu_name}}</span>
                  </div>
                  <div style="width: 33%;display: inline-block">
                    <span style="width: 16%">学号:</span>
                    <span style="width: 16%">{{developmentPlan.development_planning_stu_no}}</span>
                  </div>
                  <div style="width: 33%;display: inline-block">
                    <span style="width: 16%">班级:</span>
                    <span style="width: 16%">{{developmentPlan.development_planning_stu_class}}</span>
                  </div>
                  <div style="width: 33%;display: inline-block">
                    <span style="width: 16%">宿舍:</span>
                    <span style="width: 16%">{{developmentPlan.development_planning_room}}</span>
                  </div>
                  <div style="width: 33%;display: inline-block">
                    <span style="width: 16%">GPA:</span>
                    <span style="width: 16%">{{developmentPlan.development_planning_gpa}}</span>
                  </div>
                  <div style="width: 33%;display: inline-block">
                    <span style="width: 16%">累计不及格学分:</span>
                    <span style="width: 16%">{{developmentPlan.development_planning_nopass_point}}</span>
                  </div>
                </el-descriptions-item>


                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item" style="width: 4em">
                      个人愿景(十年后你想成为什么样的人)
                    </div>
                  </template>
                  {{developmentPlan.development_planning_wish}}
                </el-descriptions-item>

                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item" style="width: 4em">
                      第一职业目标
                    </div>
                  </template>
                  {{developmentPlan.development_planning_planone}}
                </el-descriptions-item>

                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item" style="width: 4em">
                      第二职业目标
                    </div>
                  </template>
                  {{developmentPlan.development_planning_plantwo}}
                </el-descriptions-item>

                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item" style="width: 4em">
                      个人总结
                    </div>
                  </template>
                  {{developmentPlan.development_planning_summary}}
                </el-descriptions-item>

                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item" style="width: 4em">
                      实现职业目标的行动计划
                    </div>
                  </template>
                  <el-form  :model="developmentPlan" label-width="4em" label-position="left">
                    <el-form-item :label="developmentPlan.year+'年计划和目标'">
                      {{developmentPlan.development_planning_howtonextyear}}
                    </el-form-item>
                    <el-form-item :label="developmentPlan.year-0+1+'年计划和目标'">
                      {{developmentPlan.development_planning_howtonext2year}}
                    </el-form-item>
                  </el-form>

                </el-descriptions-item>

                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item" style="width: 4em">
                      {{developmentPlan.year}}年{{developmentPlan.year2}}季学期的目标与规划
                    </div>
                  </template>
                  <el-form  :model="developmentPlan" label-width="4em" label-position="left">
                    <el-form-item label="目标">
                      {{developmentPlan.development_planning_thisyearplan}}
                    </el-form-item>
                    <el-form-item label="过往的成功经验">
                      {{developmentPlan.development_planning_successful_experience}}
                    </el-form-item>
                    <el-form-item label="详细规划">
                      {{developmentPlan.development_planning_details}}
                    </el-form-item>
                  </el-form>

                </el-descriptions-item>

                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item" style="width: 4em">
                      家长意见
                    </div>
                  </template>
                  <span v-if="developmentPlan.development_planning_family_status==='0'">家长还未填写</span>
                  {{developmentPlan.development_planning_familymean}}

                </el-descriptions-item>
              </el-descriptions>
            </div>




          </el-collapse-item>
        </el-collapse>
        <div>志愿时长:{{detailInfo.volunteerTime}}</div>


      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="infoDialog = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>

</div>
</template>

<script>
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import request from "@/utils/request";
import {Search} from '@element-plus/icons-vue'
import {Delete} from "@element-plus/icons";
import fileApi from "@/components/Store";

export default {
  name: "gCStuInfo",
  setup(){
    return{
      Search,
      Delete,
    }
  },

  data(){
    return{

      user:{},
      power:{},

      activeName1:'0',
      activeName2:'0',
      filterClass:[],
      filterGender:[
        {text: '男', value: 1},
        {text: '女', value: 0},
      ],
      filterFace:[
        {text: '群众', value: '群众'},
        {text: '共青团员', value: '共青团员'},
        {text: '党员', value: '党员'},
      ],
      filterEthnic:[
        {text: '汉族', value: '汉族'},
        {text: '少数民族', value: '少数民族'},
      ],
      filterMacau:[
        {text: '否', value: 0},
        {text: '是', value: 1},
      ],
      showAll: true,
      infoDialog: false,
      isShow:[
          true, true, true, true, true,true,true,true,true,true,true,true,true
      ],
      tableData:[],
      infoCopy:[],
      searchInfo:{
          stu_address: "",
          stu_birthday: "",
          stu_caucus_time: "",
          stu_class: "",
          stu_email: "",
          stu_ethnic: "",
          stu_gender: "0",
          stu_id: "",
          stu_ismacau: "1",
          stu_name: "",
          stu_no: "0",
          stu_origin: "",
          stu_password: "",
          stu_photourl: "",
          stu_politicalface: "",
          stu_qq: "",
          stu_telephone: "",
      },
      searchedInfo:[],
      detailInfo:{},
      headUrl:'',
      Fapi:'',


      developmentPlanYears:[],
      selectYear:'',
      developmentPlan:{
        development_planning_no:'',
        development_planning_stu_no:'20201686',
        development_planning_stu_name:'zhangsan',
        development_planning_stu_class:'软件工程01',
        development_planning_room:'竹园五栋322',
        development_planning_gpa:'0.00',
        development_planning_nopass_point:'0',
        development_planning_wish:'123123213123213213qweqeqweqweqweqweqweqweqweq123123213123213213qweqeqweqweqweqweqweqweqweq123123213123213213qweqeqweqweqweqweqweqweqweq123123213123213213qweqeqweqweqweqweqweqweqweq',
        development_planning_planone:'潜伏期而夫妻恩爱算法为',
        development_planning_plantwo:'我发我发士大夫哇额外',
        development_planning_summary:'分为氛围分为氛围发',
        development_planning_howtonextyear:'分为氛围服务',
        development_planning_howtonext2year:'官方撒给我',
        development_planning_thisyearplan:'分为氛围分为我服务范围',
        development_planning_successful_experience:'法撒旦发威锋网服务',
        development_planning_details:'分为FEWFWE',
        development_planning_familymean:'fefefefefefe',
        development_planning_status:'0',
        development_planning_family_status:'0',
        year:'',
        year2:'',
      },
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
    this.getData()
  },

  methods:{
    //详细信息页面函数
    selectYearChanged(val){
      for(let i=0;i<this.developmentPlanYears.length;i++){
        if(val===this.developmentPlanYears[i]){
          this.developmentPlan=this.detailInfo.developmentPlannings[i]
          break
        }
      }
    },

    downloadPlan(){
      request.post('/Tea/writeplanning',this.developmentPlan).then(res=>{
        window.location.href=this.Fapi+"/Word/"+res.data
      })
    },
    downloadProject(m){
      window.location.href=this.Fapi+"/Projects/"+m
    },
    downloadContest(m){
      window.location.href=this.Fapi+"/Contests/"+m
    },
    downloadPatent(m){
      window.location.href=this.Fapi+"/Patents/"+m
    },
    downloadPaper(m){
      console.log("点击下载")
      window.location.href=this.Fapi+"/Papers/"+m
    },
    filterClassHandler(value, row, column){
      const property = column['property']
      return row[property] === value
    },
    filterGenderHandler(value, row, column){
      const property = column['property']
      return row[property] === value
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
    filterFaceHandler(value, row, column){
      const property = column['property']
      return row[property] === value
    },
    filterEthnicHandler(value, row, column){
      const property = column['property']
      if(value==='汉族'){
        return (row[property] === value)||(row[property] === '汉')
      } else {
        return  (row[property] !== '汉族')&&(row[property] !== '汉')
      }
    },
    filterMacauHandler(value, row, column){
      const property = column['property']
      return row[property] === value
    },
    handleCheckAllChange(){
      if(this.showAll){
        for(let index in this.isShow){
          this.isShow[index]=true
        }
      } else{
        for(let index in this.isShow){
          this.isShow[index]=false
        }
      }
    },
    stuInfoDetail(row){
      console.log(row)
      request.post('/Stu/findallinfoforone',row).then(res=>{
        console.log(res)
        this.detailInfo=res.data
        this.headUrl=fileApi.fileApi+'/Pictures/'+res.data.stu_photourl
        this.infoDialog=true
        this.activeName1='0'
        this.activeName2='0'

        let year
        this.developmentPlanYears=[]
        this.developmentPlan={}
        for(let i=0;i<this.detailInfo.developmentPlannings.length;i++){
          year=this.detailInfo.developmentPlannings[i].year+this.detailInfo.developmentPlannings[i].year2
          this.developmentPlanYears.push(JSON.parse(JSON.stringify(year)))
        }
        if(this.developmentPlanYears.length!==0){
          this.selectYear=this.developmentPlanYears[0]
          this.developmentPlan=this.detailInfo.developmentPlannings[0]
        }

      }).catch(err=>{
        this.$message.error("获取失败")
      })
    },

    //搜索
    searchFun(){
      this.infoCopy=JSON.parse(JSON.stringify(this.tableData))
      let stu=JSON.stringify(this.searchInfo)
      request.post('/Stu/findStudentsByName',stu).then(res=>{
        this.tableData=res.data
      }).catch(err=>{
        this.$message.error("搜索失败")
      })
    },
    deleteSearch(){
      this.tableData=JSON.parse(JSON.stringify(this.infoCopy))
    },


    getData(){
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

    exportExcel() {
      // 设置当前日期
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let name = year + "" + month + "" + day;
      // console.log(name)
      /* generate workbook object from table */
      //  .table要导出的是哪一个表格
      var wb = XLSX.utils.table_to_book(document.querySelector(".stuinfo"));
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