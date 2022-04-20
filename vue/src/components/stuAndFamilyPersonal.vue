<template>
  <el-tabs tab-position="left" >
    <el-tab-pane label="基本信息">
      <div style="padding-left: 6%; padding-right: 6%;">
        <div style="margin-bottom: 10px; margin-top: 20px;">
          <i style="background-color: blue;">
            <span style="opacity: 0">1</span>
          </i>
          <p style="font-weight: bolder; font-size: large ;display: inline">
            基本信息
          </p>
        </div>


        <div style="border: dimgray solid">
          <div style="width: 88%; margin-top: 30px; position: relative">
            <!--            <p style="margin-left: 30px; font-weight: bold; margin-bottom: 20px;">-->
            <!--              基本信息-->
            <!--            </p>-->
            <el-form  :model="form" label-width="34%" :inline="true" :rules="rules" ref="form">
              <el-form-item label="姓名" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_name" disabled></el-input>
              </el-form-item>

              <el-form-item label="学号" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_no" disabled></el-input>
              </el-form-item>

              <el-form-item label="班级" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">
                <el-select v-model="form.stu_class" :disabled="Edit[0]">
                  <el-option
                      v-for="item in classType"
                      :key="item.class_name"
                      :label="item.class_name"
                      :value="item.class_name">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="专业" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">
                <el-select v-model="form.stu_major" :disabled="Edit[0]">
                  <el-option
                      v-for="item in majorType"
                      :key="item.major_name"
                      :label="item.major_name"
                      :value="item.major_name">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="出生日期" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-date-picker
                    v-model="form.stu_birthday"
                    type="date"
                    value-format="YYYY-MM-DD"
                    :disabled="Edit[0]">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="入学时间" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-date-picker
                    v-model="form.stu_join_time"
                    type="date"
                    value-format="YYYY-MM-DD"
                    :disabled="Edit[0]">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="性别" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-radio-group v-model="form.stu_gender" :disabled="Edit[0]">
                  <el-radio  :label=1>男</el-radio>
                  <el-radio  :label=0>女</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="民族" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_ethnic" :disabled="Edit[0]"></el-input>
              </el-form-item>

              <el-form-item label="籍贯" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_origin" :disabled="Edit[0]"></el-input>
              </el-form-item>

              <el-form-item label="政治面貌"  style="margin-right: 2%; width: 23%; margin-bottom: 40px;" >
                <el-select v-model="form.stu_politicalface" placeholder=" " :disabled="Edit[0]">
                  <el-option label="群众" value="群众"></el-option>
                  <el-option label="共青团员" value="共青团员"></el-option>
                  <el-option label="中共党员" value="中共党员"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="党团时间" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-col :span="11">
                  <el-date-picker
                      v-model="form.stu_caucus_time"
                      :disabled="Edit[0]"
                      type="date"
                      value-format="YYYY-MM-DD"
                      style="width: 220%"
                  ></el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item label="身份证号" style="margin-bottom: 40px; margin-right: 2%; width: 23%" prop="stu_id">
                <el-input v-model="form.stu_id" :disabled="Edit[0]"></el-input>
              </el-form-item>

              <el-form-item label="常驻地址" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_address" :disabled="Edit[0]"></el-input>
              </el-form-item>

              <el-form-item label="是否港澳" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-radio-group v-model="form.stu_ismacau" disabled>
                  <el-radio :label=0>否</el-radio>
                  <el-radio :label=1>是</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="电话" style="margin-bottom: 40px; margin-right: 2%; width: 23%" prop="stu_telephone">
                <el-input v-model="form.stu_telephone" :disabled="Edit[0]"></el-input>
              </el-form-item>

              <el-form-item label="QQ" style="margin-bottom: 40px; margin-right: 2%; width: 23%" prop="stu_qq">
                <el-input v-model="form.stu_qq" :disabled="Edit[0]"></el-input>
              </el-form-item>

              <el-form-item label="E-mail" style="margin-bottom: 40px; margin-right: 2%; width: 23%" prop="stu_email">
                <el-input v-model="form.stu_email" :disabled="Edit[0]"></el-input>
              </el-form-item>

              <br>
              <el-button style="position: relative; left:55%" v-if="isShow1[0]" @click="changeData" :disabled="userFamily.type==='fam'">修改</el-button>
              <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[0]">
                <el-button type="primary" @click="onSubmit" style="margin-right: 50px">确认</el-button>
                <el-button @click="Cancel">取消</el-button>
              </div>
            </el-form>
          </div>

          <div style="width: 100%;height: 10px"></div>

        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="入住信息">
      <div style="padding-left: 6%; padding-right: 6%;">
        <div style="margin-bottom: 10px; margin-top: 20px;">
          <i style="background-color: blue;">
            <span style="opacity: 0">1</span>
          </i>
          <p style="font-weight: bolder; font-size: large ;display: inline">
            入住信息
          </p>
        </div>


        <div style="border: dimgray solid">
          <div style="width: 88%; margin-top: 30px; position: relative">
            <el-form  :model="Accommodation" label-width="34%" :rules="rules" ref="Accommodation">
              <el-form-item label="楼栋" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-select v-model="stu_building[0]" :disabled="Edit[1]" style="width: 49%;" placeholder=" ">
                  <el-option
                      v-for="item in buildingName"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                  </el-option>
                </el-select>
                <el-select v-model="stu_building[1]" :disabled="Edit[1]" style="width: 49%" placeholder=" ">
                  <el-option
                      v-for="item in buildingNum"
                      :key="item.num"
                      :label="item.num"
                      :value="item.num">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="门牌号" style="margin-bottom: 40px; width: 23%; margin-right: 2%;" prop="accommodation_information_room_no">
                <el-input v-model="Accommodation.accommodation_information_room_no" :disabled="Edit[1]"></el-input>
              </el-form-item>

              <el-form-item label="床号" style="margin-bottom: 40px; width: 23%; margin-right: 2%" prop="accommodation_information_bed">
                <el-input v-model="Accommodation.accommodation_information_bed" :disabled="Edit[1]"></el-input>
              </el-form-item>

              <el-form-item label="是否室长" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-radio-group v-model="Accommodation.accommodation_information_ismain" :disabled="Edit[1]">
                  <el-radio  label="是">是</el-radio>
                  <el-radio  label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <br>
              <el-button style="position: relative; left:55%" v-if="isShow1[1]" @click="changeAccommodation" :disabled="userFamily.type==='fam'">修改</el-button>
              <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[1]">
                <el-button type="primary" @click="onSubmitAccommodation" style="margin-right: 50px">确认</el-button>
                <el-button @click="CancelAccommodation">取消</el-button>
              </div>
            </el-form>
          </div>

          <div style="width: 100%;height: 10px"></div>

        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="高考信息">
      <div style="padding-left: 6%; padding-right: 6%;">
        <div style="margin-bottom: 10px; margin-top: 20px;">
          <i style="background-color: blue;">
            <span style="opacity: 0">1</span>
          </i>
          <p style="font-weight: bolder; font-size: large ;display: inline">
            高考信息
          </p>
        </div>


        <div style="border: dimgray solid">
          <div style="width: 88%; margin-top: 30px; position: relative">
            <el-form  :model="examination" label-width="34%">
              <el-form-item label="高中名字" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="examination.college_entrance_examination_highschool_name" :disabled="Edit[2]"></el-input>
              </el-form-item>

              <el-form-item label="高考类型" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">
                <el-select v-model="examination.college_entrance_examination_type" placeholder=" " :disabled="Edit[2]">
                  <el-option label="农村应届" value="农村应届"></el-option>
                  <el-option label="城镇应届" value="城镇应届"></el-option>
                  <el-option label="农村往届" value="农村往届"></el-option>
                  <el-option label="城镇往届" value="城镇往届"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="语文" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="examination.college_entrance_examination_chinese" :disabled="Edit[2]"></el-input>
              </el-form-item>

              <el-form-item label="数学" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-input v-model="examination.college_entrance_examination_math" :disabled="Edit[2]"></el-input>
              </el-form-item>

              <el-form-item label="英语" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-input v-model="examination.college_entrance_examination_english" :disabled="Edit[2]"></el-input>
              </el-form-item>

              <el-form-item label="综合" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-input v-model="examination.college_entrance_examination_comprehensive" :disabled="Edit[2]"></el-input>
              </el-form-item>
              <br>
              <el-button style="position: relative; left:55%" v-if="isShow1[2]" @click="changeExamination" :disabled="userFamily.type==='fam'">修改</el-button>
              <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[2]">
                <el-button type="primary" @click="onSubmitExamination" style="margin-right: 50px">确认</el-button>
                <el-button @click="CancelExamination">取消</el-button>
              </div>
            </el-form>
          </div>

          <div style="width: 100%;height: 10px"></div>

        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="家庭信息">
      <div style="padding-left: 6%; padding-right: 6%;">
        <div style="margin-bottom: 10px; margin-top: 20px;">
          <i style="background-color: blue;">
            <span style="opacity: 0">1</span>
          </i>
          <p style="font-weight: bolder; font-size: large ;display: inline">
            家庭信息
          </p>
        </div>


        <div style="border: dimgray solid">
          <div style="width: 88%; margin-top: 30px; position: relative">
            <p style="margin-left: 30px; font-weight: bold; margin-bottom: 20px;">
              联系人一
            </p>
            <el-form  :model="family[0]" label-width="34%" :inline="true">
              <el-form-item label="关系" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-select v-model="family[0].family_relationship" placeholder=" " :disabled="Edit[3]">
                  <el-option label="父亲" value="父亲"></el-option>
                  <el-option label="母亲" value="母亲"></el-option>
                  <el-option label="爷爷" value="爷爷"></el-option>
                  <el-option label="奶奶" value="奶奶"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>

<!--              <el-form-item label="姓名" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">-->
<!--                <el-input v-model="family[0].family_name" :disabled="Edit[3]"></el-input>-->
<!--              </el-form-item>-->

              <!--              <el-form-item label="年龄" style="margin-bottom: 40px; width: 23%; margin-right: 2%">-->
              <!--                <el-input v-model="family[0].family_age" :disabled="Edit[3]"></el-input>-->
              <!--              </el-form-item>-->

              <el-form-item label="电话" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="family[0].family_tel" :disabled="Edit[3]"></el-input>
              </el-form-item>

              <!--              <el-form-item label="工作" style="margin-bottom: 40px; width: 23%; margin-right: 2%">-->
              <!--                <el-input v-model="family[0].family_work" :disabled="Edit[3]"></el-input>-->
              <!--              </el-form-item>-->

              <!--              <el-form-item label="职务" style="margin-bottom: 40px; width: 23%; margin-right: 2%">-->
              <!--                <el-input v-model="family[0].family_duties" :disabled="Edit[3]"></el-input>-->
              <!--              </el-form-item>-->

              <!--              <el-form-item label="工作地点" style="margin-bottom: 40px; width: 23%; margin-right: 2%">-->
              <!--                <el-input v-model="family[0].family_workplace" :disabled="Edit[3]"></el-input>-->
              <!--              </el-form-item>-->

              <el-form-item label="是否第一监护人" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-radio-group v-model="family[0].family_ismain" :disabled="Edit[3]">
                  <el-radio  label="是">是</el-radio>
                  <el-radio  label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <br>
              <el-button style="position: relative; left:55%" v-if="isShow1[3]" @click="changefamily(0)" :disabled="userFamily.type==='fam'">修改</el-button>
              <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[3]">
                <el-button type="primary" @click="onSubmitfamily(0)" style="margin-right: 50px">确认</el-button>
                <el-button @click="Cancelfamily(0)">取消</el-button>
              </div>
            </el-form>

            <p style="margin-left: 30px; font-weight: bold; margin-bottom: 20px;">
              联系人二
            </p>
            <el-form  :model="family[1]" label-width="34%" :inline="true">
              <el-form-item label="关系" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-select v-model="family[1].family_relationship" placeholder=" " :disabled="Edit[4]">
                  <el-option label="父亲" value="父亲"></el-option>
                  <el-option label="母亲" value="母亲"></el-option>
                  <el-option label="爷爷" value="爷爷"></el-option>
                  <el-option label="奶奶" value="奶奶"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>

<!--              <el-form-item label="姓名" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">-->
<!--                <el-input v-model="family[1].family_name" :disabled="Edit[4]"></el-input>-->
<!--              </el-form-item>-->

              <!--              <el-form-item label="年龄" style="margin-bottom: 40px; width: 23%; margin-right: 2%">-->
              <!--                <el-input v-model="family[1].family_age" :disabled="Edit[4]"></el-input>-->
              <!--              </el-form-item>-->

              <el-form-item label="电话" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="family[1].family_tel" :disabled="Edit[4]"></el-input>
              </el-form-item>

              <!--              <el-form-item label="工作" style="margin-bottom: 40px; width: 23%; margin-right: 2%">-->
              <!--                <el-input v-model="family[1].family_work" :disabled="Edit[4]"></el-input>-->
              <!--              </el-form-item>-->

              <!--              <el-form-item label="职务" style="margin-bottom: 40px; width: 23%; margin-right: 2%">-->
              <!--                <el-input v-model="family[1].family_duties" :disabled="Edit[4]"></el-input>-->
              <!--              </el-form-item>-->

              <!--              <el-form-item label="工作地点" style="margin-bottom: 40px; width: 23%; margin-right: 2%">-->
              <!--                <el-input v-model="family[1].family_workplace" :disabled="Edit[4]"></el-input>-->
              <!--              </el-form-item>-->

              <el-form-item label="是否第一监护人" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-radio-group v-model="family[1].family_ismain" :disabled="Edit[4]">
                  <el-radio  label="是">是</el-radio>
                  <el-radio  label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <br>
              <el-button style="position: relative; left:55%" v-if="isShow1[4]" @click="changefamily(1)" :disabled="userFamily.type==='fam'">修改</el-button>
              <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[4]">
                <el-button type="primary" @click="onSubmitfamily(1)" style="margin-right: 50px">确认</el-button>
                <el-button @click="Cancelfamily(1)">取消</el-button>
              </div>
            </el-form>
          </div>

          <div style="width: 100%;height: 10px"></div>

        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="个人规划" v-if="refreshPlan">


      <el-dialog
          v-model="newDlmplan"
          title="新建个人发展规划书"
          width="70%"
      >
        <div style="margin: 5px 0 5px 5px">
          <el-date-picker v-model="newDevelopmentPlan.year" type="year" placeholder="选择学年" value-format="YYYY" style="width: 10em">
          </el-date-picker>
          <el-select v-model="newDevelopmentPlan.year2" style="width: 6em;" placeholder=" ">
            <el-option
                v-for="item in yearTime"
                :key="item.name"
                :label="item.name"
                :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div style="width: 98%; margin-top: 30px; position: relative">
          <el-descriptions class="margin-top" :column="1" border>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item" style="width: 4em">
                  基本信息
                </div>
              </template>

              <el-form  :model="newDevelopmentPlan" label-width="34%" :inline="true">
                <el-form-item label="姓名">
                  <el-input v-model="newDevelopmentPlan.development_planning_stu_name" disabled></el-input>
                </el-form-item>
                <el-form-item label="学号">
                  <el-input v-model="newDevelopmentPlan.development_planning_stu_no" disabled></el-input>
                </el-form-item>
                <el-form-item label="班级">
                  <el-input v-model="newDevelopmentPlan.development_planning_stu_class" disabled></el-input>
                </el-form-item>
                <el-form-item label="宿舍">
                  <el-input v-model="newDevelopmentPlan.development_planning_room"></el-input>
                </el-form-item>
                <el-form-item label="GPA">
                  <el-input v-model="newDevelopmentPlan.development_planning_gpa"></el-input>
                </el-form-item>
                <el-form-item label="累计不及格学分">
                  <el-input v-model="newDevelopmentPlan.development_planning_nopass_point"></el-input>
                </el-form-item>
              </el-form>
            </el-descriptions-item>


            <el-descriptions-item>
              <template #label>
                <div class="cell-item" style="width: 4em">
                  个人愿景(十年后你想成为什么样的人)
                </div>
              </template>
              <el-input
                  v-model="newDevelopmentPlan.development_planning_wish"
                  :rows="4"
                  type="textarea"
                  placeholder="1.职业发展（职位、技术技能等）：
2.经济能力（总收入、可支配收入等）:
3.生活品质（衣食住行达到的水平等）:
4.社会地位描述：
"
              />

            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item" style="width: 4em">
                  第一职业目标
                </div>
              </template>
              <el-input
                  v-model="newDevelopmentPlan.development_planning_planone"
                  :rows="2"
                  type="textarea"
                  placeholder="对照个人景，你现在最想实现的目标"
              />

            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item" style="width: 4em">
                  第二职业目标
                </div>
              </template>
              <el-input
                  v-model="newDevelopmentPlan.development_planning_plantwo"
                  :rows="2"
                  type="textarea"
                  placeholder="第一目标无法实现情况下的备选目标"
              />

            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item" style="width: 4em">
                  个人总结
                </div>
              </template>
              <el-input
                  v-model="newDevelopmentPlan.development_planning_summary"
                  :rows="6"
                  type="textarea"
                  placeholder="1.围绕职业目标进行总结，2.自入学以来的个人情况，3.重点分析已具备的条件、存在的差距和难点，4.不少于150字"
              />

            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item" style="width: 4em">
                  实现职业目标的行动计划
                </div>
              </template>
              <el-form  :model="newDevelopmentPlan" label-width="4em" label-position="left">
                <el-form-item :label="newDevelopmentPlan.year+'年计划和目标'">
                  <el-input type="textarea" :rows="4" v-model="newDevelopmentPlan.development_planning_howtonextyear"></el-input>
                </el-form-item>
                <el-form-item :label="newDevelopmentPlan.year-0+1+'年计划和目标'">
                  <el-input type="textarea" :rows="4" v-model="newDevelopmentPlan.development_planning_howtonext2year"></el-input>
                </el-form-item>
              </el-form>

            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item" style="width: 4em">
                  {{newDevelopmentPlan.year}}年{{newDevelopmentPlan.year2}}季学期的目标与规划
                </div>
              </template>
              <el-form  :model="newDevelopmentPlan" label-width="4em" label-position="left">
                <el-form-item label="目标">
                  <el-input type="textarea" :rows="4" v-model="newDevelopmentPlan.development_planning_thisyearplan"
                            placeholder="对照职业目标和年度目标，2.具体明确，如：GPA上升0.3"
                  ></el-input>
                </el-form-item>
                <el-form-item label="过往的成功经验">
                  <el-input type="textarea" :rows="4" v-model="newDevelopmentPlan.development_planning_successful_experience"
                            placeholder="可迁移到现有目标，2.帮助执行现有目标"
                  ></el-input>
                </el-form-item>
                <el-form-item label="详细规划">
                  <el-input type="textarea" :rows="4" v-model="newDevelopmentPlan.development_planning_details"
                            placeholder="1.详尽，2.可执行，3.定期回顾调整"
                  ></el-input>
                </el-form-item>
              </el-form>

            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <div class="cell-item" style="width: 4em">
                  家长意见
                </div>
              </template>
              <el-input type="textarea" :rows="4" v-model="newDevelopmentPlan.development_planning_familymean" disabled
                        placeholder="针对学生的职业发展，家长可提供的助力、存在的困难、希望学院给予的支持等等"
              ></el-input>

            </el-descriptions-item>
          </el-descriptions>



          <br>
          <div style="position: relative; left:50%; display: inline-flex">
            <el-button type="primary" @click="onSubmitNewDevelopmentPlan" style="margin-right: 50px">确认</el-button>
            <el-button @click="CancelNewDevelopmentPlan">取消</el-button>
          </div>

        </div>


      </el-dialog>


      <div style="padding-left: 6%; padding-right: 6%;">
        <div style="margin-bottom: 10px; margin-top: 20px;">
          <i style="background-color: blue;">
            <span style="opacity: 0">1</span>
          </i>
          <p style="font-weight: bolder; font-size: large ;display: inline">
            个人发展规划书
          </p>
        </div>


        <div style="border: dimgray solid">
          <div style="margin: 5px 0 5px 5px">
            <el-select v-model="selectYear" placeholder="请选择学期" style="width: 20%" @change="selectYearChanged">
              <el-option
                  v-for="item in years"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>

            <el-button @click="setANewPlan" :disabled="userFamily.type==='fam'">新建</el-button>
          </div>
          <div style="width: 88%; margin-top: 30px; position: relative">
            <el-descriptions class="margin-top" :column="1" border>

              <el-descriptions-item>
                <template #label>
                  <div class="cell-item" style="width: 4em">
                    基本信息
                  </div>
                </template>

                <el-form  :model="developmentPlan" label-width="34%" :inline="true">
                  <el-form-item label="姓名">
                    <el-input v-model="developmentPlan.development_planning_stu_name" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="学号">
                    <el-input v-model="developmentPlan.development_planning_stu_no" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="班级">
                    <el-input v-model="developmentPlan.development_planning_stu_class" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="宿舍">
                    <el-input v-model="developmentPlan.development_planning_room" :disabled="Edit[5]"></el-input>
                  </el-form-item>
                  <el-form-item label="GPA">
                    <el-input v-model="developmentPlan.development_planning_gpa" :disabled="Edit[5]"></el-input>
                  </el-form-item>
                  <el-form-item label="累计不及格学分">
                    <el-input v-model="developmentPlan.development_planning_nopass_point" :disabled="Edit[5]"></el-input>
                  </el-form-item>
                </el-form>
              </el-descriptions-item>


              <el-descriptions-item>
                <template #label>
                  <div class="cell-item" style="width: 4em">
                    个人愿景(十年后你想成为什么样的人)
                  </div>
                </template>
                <el-input
                    :disabled="Edit[5]"
                    v-model="developmentPlan.development_planning_wish"
                    :rows="4"
                    type="textarea"
                    placeholder="1.职业发展（职位、技术技能等）：
2.经济能力（总收入、可支配收入等）:
3.生活品质（衣食住行达到的水平等）:
4.社会地位描述：
"
                />

              </el-descriptions-item>

              <el-descriptions-item>
                <template #label>
                  <div class="cell-item" style="width: 4em">
                    第一职业目标
                  </div>
                </template>
                <el-input
                    :disabled="Edit[5]"
                    v-model="developmentPlan.development_planning_planone"
                    :rows="2"
                    type="textarea"
                    placeholder="对照个人景，你现在最想实现的目标"
                />

              </el-descriptions-item>

              <el-descriptions-item>
                <template #label>
                  <div class="cell-item" style="width: 4em">
                    第二职业目标
                  </div>
                </template>
                <el-input
                    :disabled="Edit[5]"
                    v-model="developmentPlan.development_planning_plantwo"
                    :rows="2"
                    type="textarea"
                    placeholder="第一目标无法实现情况下的备选目标"
                />

              </el-descriptions-item>

              <el-descriptions-item>
                <template #label>
                  <div class="cell-item" style="width: 4em">
                    个人总结
                  </div>
                </template>
                <el-input
                    :disabled="Edit[5]"
                    v-model="developmentPlan.development_planning_summary"
                    :rows="6"
                    type="textarea"
                    placeholder="1.围绕职业目标进行总结，2.自入学以来的个人情况，3.重点分析已具备的条件、存在的差距和难点，4.不少于150字"
                />

              </el-descriptions-item>

              <el-descriptions-item>
                <template #label>
                  <div class="cell-item" style="width: 4em">
                    实现职业目标的行动计划
                  </div>
                </template>
                <el-form  :model="developmentPlan" label-width="4em" label-position="left">
                  <el-form-item :label="developmentPlan.year+'年计划和目标'">
                    <el-input type="textarea" :rows="4" v-model="developmentPlan.development_planning_howtonextyear" :disabled="Edit[5]"></el-input>
                  </el-form-item>
                  <el-form-item :label="developmentPlan.year-0+1+'年计划和目标'">
                    <el-input type="textarea" :rows="4" v-model="developmentPlan.development_planning_howtonext2year" :disabled="Edit[5]"></el-input>
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
                    <el-input type="textarea" :rows="4" v-model="developmentPlan.development_planning_thisyearplan" :disabled="Edit[5]"
                              placeholder="对照职业目标和年度目标，2.具体明确，如：GPA上升0.3"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="过往的成功经验">
                    <el-input type="textarea" :rows="4" v-model="developmentPlan.development_planning_successful_experience" :disabled="Edit[5]"
                              placeholder="可迁移到现有目标，2.帮助执行现有目标"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="详细规划">
                    <el-input type="textarea" :rows="4" v-model="developmentPlan.development_planning_details" :disabled="Edit[5]"
                              placeholder="1.详尽，2.可执行，3.定期回顾调整"
                    ></el-input>
                  </el-form-item>
                </el-form>

              </el-descriptions-item>

              <el-descriptions-item>
                <template #label>
                  <div class="cell-item" style="width: 4em">
                    家长意见
                  </div>
                </template>
                <el-input type="textarea" :rows="4" v-model="developmentPlan.development_planning_familymean" :disabled="userFamily.type==='stu'||familymean"
                          placeholder="针对学生的职业发展，家长可提供的助力、存在的困难、希望学院给予的支持等等"
                ></el-input>

              </el-descriptions-item>
            </el-descriptions>



            <br>
            <el-button style="position: relative; left:55%" v-if="isShow1[5]&&this.years.length!==0" @click="changeDevelopmentPlan">修改</el-button>
            <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[5]">
              <el-button type="primary" @click="onSubmitDevelopmentPlan" style="margin-right: 50px">确认</el-button>
              <el-button @click="CancelDevelopmentPlan">取消</el-button>
            </div>

          </div>

          <div style="width: 100%;height: 10px"></div>

        </div>
      </div>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
import {Avatar} from "@element-plus/icons-vue";
import request from "@/utils/request";
export default {
  name: "stuAndFamilyPersonal",
  components: {
    Avatar,
  },

  data(){
    let isMobileNumber= (rule, value, callback) => {
      if (!value) {
        //return new Error("请输入电话号码");
        callback();
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        const isPhone = reg.test(value);
        value = Number(value); //转换为数字
        if (typeof value === "number") {//判断是否为数字
          value = value.toString(); //转换成字符串
          if (value.length < 0 || value.length > 12 || !isPhone) { //判断是否为11位手机号
            callback(new Error("手机号码格式如:138xxxx8754"));
          } else {
            callback();
          }
        } else {
          callback(new Error("请输入电话号码"));
        }
      }
    };

    let isEmail = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        const email = reg.test(value);
        if (!email) {
          callback(new Error("邮箱格式如:admin@163.com"));
        } else {
          callback();
        }
      }
    };

    let isCardId = (rule, value, callback) => {
      if (!value) {
        return new Error("请输入身份证号");
      } else {
        const reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$/;
        const card = reg.test(value);
        if (!card) {

          callback(new Error("身份证格式如:423024xxxx0216xxxx"));
        } else {
          callback();
        }
      }
    };

    let isRoomNo=(rule, value, callback)=>{
      if(!value){
        return new error("请输入门牌号")
      } else {
        const reg=/^\d{3}/
        const card=reg.test(value)
        if(!card||value.length!==3){
          callback(new Error("门牌号格式错误"));
        } else {
          callback();
        }
      }
    };

    let isBedNo=(rule, value, callback)=>{
      if(!value){
        return new error("请输入床号")
      } else {
        const reg=/^\d/
        const card=reg.test(value)
        if(!card||value.length!==1){
          callback(new Error("床号格式错误"));
        } else {
          callback();
        }
      }
    };
    return{
      refreshPlan:true,
      Edit:[true, true,true, true, true, true],
      isShow1:[true, true,true, true, true, true],
      isShow2:[false,false,false,false, false, false],
      familymean:true,
      classType:[],
      majorType:[
        {major_name:'软件工程'},
        {major_name:'大数据'},
        {major_name:'人工智能'},
      ],
      user:{},
      userFamily:{},
      form:{
        stu_address: "重庆大学",
        stu_birthday: "1995-12-26",
        stu_join_time:'',
        stu_caucus_time: "2021",
        stu_class: "1",
        stu_major:'0',
        stu_email: "ch@163",
        stu_ethnic: "汉族",
        stu_gender: 0,
        stu_id: "522321",
        stu_ismacau: 1,
        stu_name: "李四",
        stu_no: 1231234,
        stu_origin: "四川成都",
        stu_password: "123456",
        stu_photourl: "",
        stu_politicalface: "党员",
        stu_qq: "122706559",
        stu_telephone: "135959002",
      },

      Accommodation:{
        accommodation_information_no:null,
        accommodation_information_stu_no:"",
        accommodation_information_room_no:"",
        accommodation_information_bed:"",
        accommodation_information_building:"",
        accommodation_information_ismain:"否",
      },
      buildingName:[
        {name:'梅园'},
        {name:'兰园'},
        {name:'竹园'},
        {name:'菊园'},
        {name:'松园'},
      ],
      buildingNum:[
        {num:"一栋"},
        {num:"二栋"},
        {num:"三栋"},
        {num:"四栋"},
        {num:"五栋"},
        {num:"六栋"},
        {num:"七栋"},
        {num:"八栋"},
      ],
      yearTime:[
        {name:'春'},
        {name:'秋'},
      ],
      stu_building:[],
      AccommodationCopy:{},

      examination:{
        college_entrance_examination_no:null,
        college_entrance_examination_highschool_name:"",
        college_entrance_examination_type:"",
        college_entrance_examination_chinese:"",
        college_entrance_examination_math:"",
        college_entrance_examination_english:"",
        college_entrance_examination_comprehensive:"",
        college_entrance_examination_stu_no:"",
      },
      examinationCopy:{},

      family:[
        {
          family_no:'',
          family_stu_no:"",
          family_relationship:"",
          family_name:"",
          family_age:"",
          family_tel:"",
          family_work:"",
          family_duties:"",
          family_workplace:"",
          family_ismain:"",
        },
        {
          family_no:'',
          family_stu_no:"",
          family_relationship:"",
          family_name:"",
          family_age:"",
          family_tel:"",
          family_work:"",
          family_duties:"",
          family_workplace:"",
          family_ismain:"",
        },
      ],
      familyCopy:{},
      familyCopy1:{},

      developmentPlan:{
        development_planning_no:'',
        development_planning_stu_no:'',
        development_planning_stu_name:'',
        development_planning_stu_class:'',
        development_planning_room:'',
        development_planning_gpa:'',
        development_planning_nopass_point:'',
        development_planning_wish:'',
        development_planning_planone:'',
        development_planning_plantwo:'',
        development_planning_summary:'',
        development_planning_howtonextyear:'',
        development_planning_howtonext2year:'',
        development_planning_thisyearplan:'',
        development_planning_successful_experience:'',
        development_planning_details:'',
        development_planning_familymean:'',
        development_planning_status:'0',
        development_planning_family_status:'0',
        year:'',
        year2:'',
      },
      newDevelopmentPlan:{},
      dlmPlans:[],
      years:[],
      selectYear:'',
      developmentPlanCopy:{},

      newDlmplan:false,


      rules: {
        stu_telephone: [
          { required: false, message: "请输入手机号码", trigger: "blur" },
          { validator: isMobileNumber, trigger: "blur" }
        ],
        stu_email: [
          { required: false, message: "请输入邮箱", trigger: "blur" },
          { validator: isEmail, trigger: "blur" }
        ],
        stu_id: [
          { required: false, message: "请输入身份证号", trigger: "blur" },
          { validator: isCardId, trigger: "blur" }
        ],
        accommodation_information_room_no:[
            {required: true, message:"请输入门牌号", trigger: "blur"},
            {validator:isRoomNo, trigger: "blur"}
        ],
        accommodation_information_bed:[
          {required: true, message:"请输入床号", trigger: "blur"},
          {validator:isBedNo, trigger: "blur"}
        ],
      },
    }
  },

  created() {
    this.showOriginalData();
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.userFamily=JSON.parse(sessionStorage.getItem("family"))
    this.getData();
  },

  methods:{

    //刷新组件
    refreshComponent(){
      this.fresh=false
      this.getPlanData()
      this.$nextTick(()=>{
        this.fresh=true
      })
    },

    setANewPlan(){
      this.newDlmplan=true
      this.newDevelopmentPlan={}
      this.newDevelopmentPlan.development_planning_stu_no=this.user.stu_no+''
      this.newDevelopmentPlan.development_planning_stu_name=this.user.stu_name
      this.newDevelopmentPlan.development_planning_stu_class=this.user.stu_class
      this.newDevelopmentPlan.development_planning_status='0'
      this.newDevelopmentPlan.development_planning_family_status='0'
    },
    selectYearChanged(val){
      for(let i=0;i<this.years.length;i++){
        if(val===this.years[i]){
          this.developmentPlan=this.dlmPlans[i]
          break
        }
      }
    },

    showOriginalData(){
      // let userjava=JSON.parse(sessionStorage.getItem('user'))
      this.form=JSON.parse(sessionStorage.getItem('user'))
    },

    getData(){
      this.form.stu_no=this.form.stu_no-0;
      this.form.stu_ismacau=this.form.stu_ismacau-0;
      this.form.stu_gender=this.form.stu_gender-0;
      let formstring=JSON.stringify(this.form);
      request.post('/Stu/findDormitoryInfo', formstring).then(res=>{
        if(res.data!=null){
          this.Accommodation=res.data
          this.stu_building[0]=this.Accommodation.accommodation_information_building.substring(0,2)
          this.stu_building[1]=this.Accommodation.accommodation_information_building.substring(2,4)
        }
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"宿舍信息请求失败"
        })
      })

      request.post('/Stu/findEntranceInfo', formstring).then(res=>{
        if(res.data!=null){
          this.examination=res.data
        }
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"高考信息请求失败"
        })
      })

      request.post('/Stu/findFamilyInfo', formstring).then(res=>{

        if(res.code===0){
          return
        }

        if(res.code===1){
          this.family[0]=res.data[0]
        }

        if(res.code===2){
          this.family[0]=res.data[0]
          this.family[1]=res.data[1]
        }
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"家庭信息请求失败"
        })
      })
      request.post('/findallclasslist').then(res=>{
        this.classType=res.data
      })

      this.getPlanData()
    },

    getPlanData(){
      let formstring=JSON.stringify(this.form);
      request.post('/findDevelopments', formstring).then(res=>{
        if(res.data!=null){
          this.dlmPlans=res.data
          //this.developmentPlan=res.data
          let year
          this.years=[]
          this.developmentPlan={}
          for(let i=0;i<this.dlmPlans.length;i++){
            year=this.dlmPlans[i].year+this.dlmPlans[i].year2
            this.years.push(JSON.parse(JSON.stringify(year)))
          }
          if(this.dlmPlans.length!==0){
            this.selectYear=this.years[0]
            this.developmentPlan=this.dlmPlans[0]
          }
        }
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"个人规划书请求失败"
        })
      })
    },

    changeData(){
      this.Edit[0]= false;
      this.isShow1[0]=false;
      this.isShow2[0]=true;
      this.form=JSON.parse(sessionStorage.getItem('user'))
    },
    changeAccommodation(){
      this.Edit[1]= false;
      this.isShow1[1]=false;
      this.isShow2[1]=true;
      this.AccommodationCopy=JSON.parse(JSON.stringify(this.Accommodation))
    },
    changeExamination(){
      this.Edit[2]= false;
      this.isShow1[2]=false;
      this.isShow2[2]=true;
      this.examinationCopy=JSON.parse(JSON.stringify(this.examination))
    },
    changefamily(index){
      this.Edit[index+3]= false;
      this.isShow1[index+3]=false;
      this.isShow2[index+3]=true;
      if(index===0){
        this.familyCopy=JSON.parse(JSON.stringify(this.family[index]))
      }else{
        this.familyCopy1=JSON.parse(JSON.stringify(this.family[index]))
      }
    },
    changeDevelopmentPlan(){
      if(this.userFamily.type==='stu'){
        this.Edit[5]= false;
      }else{
        this.familymean=false
      }
      this.isShow1[5]=false;
      this.isShow2[5]=true;
      this.developmentPlanCopy=JSON.parse(JSON.stringify(this.developmentPlan))
    },

    Cancel(){
      this.$refs['form'].clearValidate()
      this.Edit[0]= true;
      this.isShow1[0]=true;
      this.isShow2[0]=false;
      //根据本地数据恢复
      this.form=JSON.parse(sessionStorage.getItem('user'))
    },

    CancelAccommodation(){
      this.$refs['Accommodation'].clearValidate()
      this.Edit[1]=true;
      this.isShow1[1]=true;
      this.isShow2[1]=false;
      this.Accommodation=JSON.parse(JSON.stringify(this.AccommodationCopy))
      this.stu_building[0]=this.Accommodation.accommodation_information_building.substring(0,2)
      this.stu_building[1]=this.Accommodation.accommodation_information_building.substring(2,4)
    },
    CancelExamination(){
      this.Edit[2]=true;
      this.isShow1[2]=true;
      this.isShow2[2]=false;
      this.examination=JSON.parse(JSON.stringify(this.examinationCopy))
    },
    Cancelfamily(index){
      this.Edit[index+3]=true;
      this.isShow1[index+3]=true;
      this.isShow2[index+3]=false;
      if(index===0){
        this.family[index]=JSON.parse(JSON.stringify(this.familyCopy))
      }else{
        this.family[index]=JSON.parse(JSON.stringify(this.familyCopy1))
      }

    },
    CancelDevelopmentPlan(){
      this.Edit[5]=true;
      this.familymean=true;
      this.isShow1[5]=true;
      this.isShow2[5]=false;
      this.developmentPlan=JSON.parse(JSON.stringify(this.developmentPlanCopy))
    },
    CancelNewDevelopmentPlan(){
      this.newDlmplan=false
      this.newDevelopmentPlan={}
      this.newDevelopmentPlan.development_planning_status='0'
      this.newDevelopmentPlan.development_planning_family_status='0'
    },

    onSubmit(){
      this.form.stu_no=this.form.stu_no-0;
      this.form.stu_ismacau=this.form.stu_ismacau-0;
      this.form.stu_gender=this.form.stu_gender-0;
      let formstring=JSON.stringify(this.form);
      request.post('/Stu/upDateStudent',formstring).then(res=>{
        if(res.data===null){
          this.$message({
            type:"error",
            message:res.msg//后端给出的错误信息
          })

        } else {
          this.$message({
            type:"success",
            message:"修改成功"
          })
          this.Edit[0]= true;
          this.isShow1[0]=true;
          this.isShow2[0]=false;
          sessionStorage.setItem('user',JSON.stringify(res.data));
          this.form=res.data;
        }

      });
    },

    onSubmitAccommodation(){
      let user=JSON.parse(sessionStorage.getItem('user'))
      this.Accommodation.accommodation_information_stu_no=user.stu_no.toString()
      this.Accommodation.accommodation_information_building=this.stu_building[0]+this.stu_building[1]
      // this.Accommodation.accommodation_information_ismain=this.Accommodation.accommodation_information_ismain.toString()
      let form=JSON.stringify(this.Accommodation)
      request.post('/Stu/updateDormitoryInfo',form).then(res=>{
        this.$message({
          type:"success",
          message:"修改成功"
        })
        this.Edit[1]= true;
        this.isShow1[1]=true;
        this.isShow2[1]=false;
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"修改失败"
        })
      });
    },

    onSubmitExamination(){
      let user=JSON.parse(sessionStorage.getItem('user'))
      this.examination.college_entrance_examination_stu_no=user.stu_no.toString()
      let form=JSON.stringify(this.examination)
      request.post('/Stu/updateEntranceInfo',form).then(res=>{
        this.$message({
          type:"success",
          message:"修改成功"
        })
        this.Edit[2]= true;
        this.isShow1[2]=true;
        this.isShow2[2]=false;
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"修改失败"
        })
      });
    },


    onSubmitfamily(index){
      let user=JSON.parse(sessionStorage.getItem('user'))
      this.family[index].family_stu_no=user.stu_no.toString()
      let form=JSON.stringify(this.family[index])

      if(this.family[index].family_ismain===''||this.family[index].family_tel===''){
        this.$message.warning('请完整填写资料')
      }

      if(this.family[0].family_ismain===this.family[1].family_ismain){
        this.$message({
          type:"error",
          message:"不能有多个或没有第一监护人!"
        })
        return
      }

      if(this.family[0].family_relationship===this.family[1].family_relationship){
        this.$message({
          type:"error",
          message:"不能两个联系人相同!"
        })
        return
      }

      request.post('/Stu/uploadFamilyInfo',form).then(res=>{
        this.$message({
          type:"success",
          message:"修改成功"
        })
        this.family[index].family_no=res.data
        this.Edit[index+3]= true;
        this.isShow1[index+3]=true;
        this.isShow2[index+3]=false;
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"修改失败"
        })
      });
    },

    onSubmitDevelopmentPlan(){
      let user=JSON.parse(sessionStorage.getItem('user'))
      this.developmentPlan.development_planning_stu_no=user.stu_no.toString()
      let form=JSON.stringify(this.developmentPlan)
      request.post('/Stu/uploadPlan',form).then(res=>{
        this.$message({
          type:"success",
          message:"修改成功"
        })
        this.Edit[5]= true;
        this.familymean=true;
        this.isShow1[5]=true;
        this.isShow2[5]=false;
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"修改失败"
        })
      });
    },

    onSubmitNewDevelopmentPlan(){
      if(this.newDevelopmentPlan.year===null||this.newDevelopmentPlan.year2===null||!this.newDevelopmentPlan.year||!this.newDevelopmentPlan.year2){
        this.$message.error("请选择学期")
        return
      }
      for(let i=0;i<this.years.length;i++){
        if(this.years[i]===this.newDevelopmentPlan.year+this.newDevelopmentPlan.year2){
          this.$message.error("所选学期已存在，请勿重复上传！")
          return
        }
      }

      request.post('/Stu/uploadPlan',this.newDevelopmentPlan).then(res=>{
        this.$message.success("上传成功")
        this.refreshComponent()
        this.CancelNewDevelopmentPlan()
      }).catch(err=>{
        this.$message.error("上传失败")
      })
    },

  }
}
</script>

<style scoped>

</style>