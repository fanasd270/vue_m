<template>
<div>
  <el-tabs v-model="activeName" style="margin:0 1% 0 1%;">
    <el-tab-pane name="first">
      <template #label>松园({{countPlace[0]}})</template>
      <el-tabs v-model="activeNameS" style="margin:0 1% 0 1%;" tab-position="left">
        <el-tab-pane v-for="(item,key,index) in buildingSong" :name="item.key">
          <template #label>{{item.key}}</template>
          <el-card v-for="(room,key1,index1) in item.value" style="display: inline-block; width: 23%; height: 300px ;margin-right: 2%;vertical-align: top">
            <template #header>
              <div class="card-header">
                <span>{{key1}}</span>
              </div>
            </template>
            <el-table :data="room" stripe style="width: 100%" @row-click="stuInfoDetail">
              <el-table-column prop="accommodation_information_no" label="姓名" width="70"/>
              <el-table-column prop="accommodation_information_stu_no" label="学号" width="90" />
              <el-table-column prop="accommodation_information_bed" label="床号" width="55"/>
              <el-table-column prop="accommodation_information_ismain" label="室长" width="55"></el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane name="second">
      <template #label>竹园({{countPlace[1]}})</template>
      <el-tabs v-model="activeNameZ" style="margin:0 1% 0 1%;" tab-position="left">
        <el-tab-pane v-for="(item,key,index) in buildingZhu" :name="item.key">
          <template #label>{{item.key}}</template>
          <el-card v-for="(room,key1,index1) in item.value" style="display: inline-block; width: 24%;height: 300px ;margin-right: 1%;vertical-align: top">
            <template #header>
              <div class="card-header">
                <span>{{key1}}</span>
              </div>
            </template>
            <el-table :data="room" stripe style="width: 100%" @row-click="stuInfoDetail">
              <el-table-column prop="accommodation_information_no" label="姓名" width="70"/>
              <el-table-column prop="accommodation_information_stu_no" label="学号" width="90" />
              <el-table-column prop="accommodation_information_bed" label="床号" width="55"/>
              <el-table-column prop="accommodation_information_ismain" label="室长" width="55"></el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane name="third">
      <template #label>梅园({{countPlace[2]}})</template>
      <el-tabs v-model="activeNameM" style="margin:0 1% 0 1%;" tab-position="left">
        <el-tab-pane v-for="(item,key,index) in buildingMei" :name="item.key">
          <template #label>{{item.key}}</template>
          <el-card v-for="(room,key1,index1) in item.value" style="display: inline-block; width: 24%; height: 300px ;margin-right: 1%;vertical-align: top">
            <template #header>
              <div class="card-header">
                <span>{{key1}}</span>
              </div>
            </template>
            <el-table :data="room" stripe style="width: 100%" @row-click="stuInfoDetail">
              <el-table-column prop="accommodation_information_no" label="姓名" width="70"/>
              <el-table-column prop="accommodation_information_stu_no" label="学号" width="90" />
              <el-table-column prop="accommodation_information_bed" label="床号" width="55"/>
              <el-table-column prop="accommodation_information_ismain" label="室长" width="55"></el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane name="fourth">
      <template #label>兰园({{countPlace[3]}})</template>
      <el-tabs v-model="activeNameL" style="margin:0 1% 0 1%;" tab-position="left">
        <el-tab-pane v-for="(item,key,index) in buildingLan" :name="item.key">
          <template #label>{{item.key}}</template>
          <el-card v-for="(room,key1,index1) in item.value" style="display: inline-block; width: 24%; height: 300px ;margin-right: 1%;vertical-align: top">
            <template #header>
              <div class="card-header">
                <span>{{key1}}</span>
              </div>
            </template>
            <el-table :data="room" stripe style="width: 100%" @row-click="stuInfoDetail">
              <el-table-column prop="accommodation_information_no" label="姓名" width="70"/>
              <el-table-column prop="accommodation_information_stu_no" label="学号" width="90" />
              <el-table-column prop="accommodation_information_bed" label="床号" width="55"/>
              <el-table-column prop="accommodation_information_ismain" label="室长" width="55"></el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane name="fifth">
      <template #label>菊园({{countPlace[4]}})</template>
      <el-tabs v-model="activeNameJ" style="margin:0 1% 0 1%;" tab-position="left">
        <el-tab-pane v-for="(item,key,index) in buildingJu" :name="item.key">
          <template #label>{{item.key}}</template>
          <el-card v-for="(room,key1,index1) in item.value" style="display: inline-block; width: 24%; height: 300px ;margin-right: 1%;vertical-align: top">
            <template #header>
              <div class="card-header">
                <span>{{key1}}</span>
              </div>
            </template>
            <el-table :data="room" stripe style="width: 100%" @row-click="stuInfoDetail">
              <el-table-column prop="accommodation_information_no" label="姓名" width="70"/>
              <el-table-column prop="accommodation_information_stu_no" label="学号" width="90" />
              <el-table-column prop="accommodation_information_bed" label="床号" width="55"/>
              <el-table-column prop="accommodation_information_ismain" label="室长" width="55"></el-table-column>
            </el-table>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>

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
          <el-collapse-item title="成绩" name="6">
            <div class="echarts" style="display: inline-block">
              <div>绩点统计</div>
              <div id="chartScore" :style="{ width: '500px', height: '200px' }"></div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="综合能力" name="7">
            <el-collapse v-model="activeName3" style="margin-left: 3%">
              <el-collapse-item title="计划/进行中" name="1">
                <el-descriptions v-if="detailInfo.is_doing!=null" border :column="5">
                  <el-descriptions-item label="类别">{{detailInfo.is_doing.is_doing_category}}</el-descriptions-item>
                  <el-descriptions-item label="项目名称">{{detailInfo.is_doing.is_doing_name}}</el-descriptions-item>
                  <el-descriptions-item label="完成期限">{{detailInfo.is_doing.is_doing_end}}</el-descriptions-item>
                  <el-descriptions-item label="指导老师">{{detailInfo.is_doing.is_doing_guide_teacher}}</el-descriptions-item>
                  <el-descriptions-item label="项目成员" v-for="index in detailInfo.is_doing.is_doing_member">{{detailInfo.is_doing.is_doing_member[index]}}</el-descriptions-item>
                </el-descriptions>

              </el-collapse-item>
            </el-collapse>
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



import request from "@/utils/request";
import fileApi from "@/components/Store";
import * as echarts from "echarts";

export default {
  name: "gCDorm",


  data() {
    return {
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

      scoreChart:null,
      optionScore:{
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
          name:'GPA',
          type:'value',
          min:0,
          max:4,
          splitNumber:8,
        },
        series: []
      },

      detailInfo:{},
      headUrl:'',
      Fapi:'',
      infoDialog: false,
      activeName1:'0',
      activeName2:'0',
      activeName3:'0',
      activeName:'first',
      activeNameS:'',
      activeNameZ:'',
      activeNameM:'',
      activeNameL:'',
      activeNameJ:'',
      countPlace:[0,0,0,0,0],
      user:{},
      power:{},
      bedRoomList:{},
      buildingSong:[],
      buildingZhu:[],
      buildingMei:[],
      buildingLan:[],
      buildingJu:[],
    };
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
  methods: {
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
    initScore(){
      this.scoreChart = echarts.init(document.getElementById("chartScore"));
      this.scoreChart.setOption(this.optionScore);
    },
    stuInfoDetail(row){
      console.log(row)
      let stu={stu_no:row.accommodation_information_stu_no,stu_name:row.accommodation_information_stu_name}

      request.post('/Stu/findallinfoforone',stu).then(res=>{
        console.log(111111111111111111111111111111111)
        console.log(res)
        this.detailInfo=res.data
        this.headUrl=fileApi.fileApi+'/Pictures/'+res.data.stu_photourl
        this.infoDialog=true
        //折线图
        this.optionScore.series=[]
        this.optionScore.xAxis.data=[]
        let tempScore={name:row.stu_name,data:[],type:'line',itemStyle:{normal:{label:{show:true}}}}
        for(let year in this.detailInfo.gradePointMap){
          this.optionScore.xAxis.data.push(year)
          tempScore.data.push(parseFloat(this.detailInfo.gradePointMap[year][0].grade_point_gpa).toFixed(3))

        }
        this.optionScore.series.push(tempScore)
        console.log("option")
        console.log(this.optionScore)
        this.$nextTick(()=>{
          this.initScore()
        })
        this.activeName1='0'
        this.activeName2='0'
        this.activeName3='0'

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

    getData(){
      request.post("/bedRoomList",this.user).then(res=>{
        console.log(res.data)
        this.bedRoomList=res.data
        let temp={key:'',value:[]}
        let tempCopy={key:'',value:[]}
        for(let item in this.bedRoomList){
          temp.key=item
          temp.value=this.bedRoomList[item]
          if(item.includes("松园")){
            this.buildingSong.push(JSON.parse(JSON.stringify(temp)))
            for(let m in temp.value){
              this.countPlace[0]+=temp.value[m].length
            }
          } else if(item.includes("竹园")){
            this.buildingZhu.push(JSON.parse(JSON.stringify(temp)))
            for(let m in temp.value){
              this.countPlace[1]+=temp.value[m].length
            }
          } else if(item.includes("梅园")){
            this.buildingMei.push(JSON.parse(JSON.stringify(temp)))
            for(let m in temp.value){
              this.countPlace[2]+=temp.value[m].length
            }
          } else if(item.includes("兰园")){
            this.buildingLan.push(JSON.parse(JSON.stringify(temp)))
            for(let m in temp.value){
              this.countPlace[3]+=temp.value[m].length
            }
          } else if(item.includes("菊园")){
            this.buildingJu.push(JSON.parse(JSON.stringify(temp)))
            for(let m in temp.value){
              this.countPlace[4]+=temp.value[m].length
            }
          }
        }
        this.activeNameS=this.buildingSong[0].key
        this.activeNameZ=this.buildingZhu[0].key
        this.activeNameM=this.buildingMei[0].key
        this.activeNameL=this.buildingLan[0].key
        this.activeNameJ=this.buildingJu[0].key
      })
    },

  },
}
</script>

<style scoped>

</style>