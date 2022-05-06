<template>
  <div style="margin:20px 0 0 9% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      成绩查询
    </p>
    <br>

    <div style="margin:20px 0 20px 0">
      <!--  综测-->
      <div  style="width: 40%;display: inline-block">
        <el-card class="box-card" style="height: 280px">
          <div slot="header" class="clearfix">
            <span>综测成绩</span>
            <br>
            <el-select v-model="choosedTermForGrade" placeholder="请选择学期" @change="changeTermsForGrade" style="margin-top: 10px">
              <el-option
                  v-for="(item,key,index) in otherTermsPointForGrade"
                  :key="key"
                  :label="key"
                  :value="key">
              </el-option>
            </el-select>

            <el-table
                :data="showPointsForGrade"
                stripe
                style="width: 100%">
              <el-table-column
                  prop="comprehensive_evaluation_yearfromto"
                  label="学年学期">
              </el-table-column>
              <el-table-column
                  prop="comprehensive_evaluation_rankforscore"
                  label="成绩排名"
              >
              </el-table-column>
              <el-table-column
                  prop="comprehensive_evaluation_rank"
                  label="综合素质测评排名"
              >
              </el-table-column>
              <el-table-column
                  prop="comprehensive_evaluation_totalnumforscore"
                  label="成绩排名总人数">
              </el-table-column>
              <el-table-column
                  prop="comprehensive_evaluation_totalnumforcom_eva"
                  label="综合素质排名总人数">
              </el-table-column>
            </el-table>
          </div>

        </el-card>
      </div>



      <!--绩点-->
      <div style="display: inline-block; width: 40%; margin-left: 5%">
        <el-card class="box-card" style="height: 280px">
          <span>GPA</span>
          <br>
          <el-select v-model="choosedTermForGrand" placeholder="请选择" @change="changeTermsForGrand">
            <el-option
                v-for="(item,key,index) in otherTermsPointForGrand"
                :key="key"
                :label="key"
                :value="key">
            </el-option>
          </el-select>

          <el-button type="text" @click="downloadPDF">下载成绩PDF</el-button>

          <el-descriptions v-if="showPointsForGrand.length!==0" class="margin-top" :column="5" size="small" border direction="vertical">
            <el-descriptions-item>
              <template #label>
                平均绩点
              </template>
              {{showPointsForGrand[0].grade_point_gpa}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                年级排名
              </template>
              {{showPointsForGrand[0].grade_point_rankforclass}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                专业排名
              </template>
              {{showPointsForGrand[0].grade_point_rankformajor}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                专业百分比
              </template>
              {{showPointsForGrand[0].grade_point_mrjorpercentage}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                专业人数
              </template>
              {{showPointsForGrand[0].grade_point_major_num}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                国家英语
              </template>
              {{showPointsForGrand[0].grade_point_national_english}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                英语学分
              </template>
              {{showPointsForGrand[0].grade_point_english_score}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                体育总学分
              </template>
              {{showPointsForGrand[0].grade_point_sportsscore}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                健康知识
              </template>
              {{showPointsForGrand[0].grade_point_healthknowledge}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                长跑
              </template>
              {{showPointsForGrand[0].grade_point_long_distance_run}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                全校通识
              </template>
              {{showPointsForGrand[0].grade_point_general_knowledge}}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>
    </div>



    <el-select v-model="choosedTermForCourse" placeholder="请选择学期" @change="changeTermsForCourse">
      <el-option
          v-for="(item,key,index) in otherTermsPointForCourse"
          :key="key"
          :label="key"
          :value="key">
      </el-option>
    </el-select>
    <el-input
        v-model="searchInfo"
        placeholder="搜索课程"
        :prefix-icon="Search"
        style="width: 20%; margin-bottom: 5px"
        @keyup.enter="searchFun"
        clearable
        @clear="showPointsForCourse=showPointsForCourseCopy"
    />
    <el-button :icon="Search" circle size="small" @click="searchFun" style="margin-left: 5px"></el-button>
    <el-table
        :data="showPointsForCourse"
        stripe
        style="width: 100%">
      <el-table-column
          prop="final_Information_year"
          label="学年学期">
      </el-table-column>

      <el-table-column
          prop="final_Information_no_coursename"
          label="课程名称">
      </el-table-column>
      <el-table-column
          prop="final_Information_coursecode"
          label="课程代码"
      >
      </el-table-column>
      <el-table-column
          prop="credits"
          label="课程学分"
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
          prop="final_Information_character"
          label="修读性质"
      >
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
  </div>
</template>

<script>
import {Search} from "@element-plus/icons";
import request from "@/utils/request";
import fileApi from "@/components/Store";
export default {
  name: "stuAndFamilyScoreView",
  setup(){
    return{
      Search,
    }
  },
  components:{
    Search,
  },
  data(){
    return{
      user:{},

      Fapi:'',
      otherTermsPointForCourse:{},
      showPointsForCourse:[],
      choosedTermForCourse:'',

      searchInfo:'',
      showPointsForCourseCopy:[],

      otherTermsPointForGrand:{},
      showPointsForGrand:[],
      choosedTermForGrand:'',

      otherTermsPointForGrade:{},
      showPointsForGrade:[],
      choosedTermForGrade:'',
    }
  },
  created() {
    this.Fapi=fileApi.fileApi
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.getData()
  },
  methods:{
    downloadPDF(){
      request.post('/findStudentScorePDF',this.user).then(res=>{
        window.open(this.Fapi+"/excel/UploadPDF/"+res.data[0].score_pdf_url)
      }).catch(err=>{
        this.$message.error("下载失败")
      })
    },
    searchFun(){
      let fuzzy=this.searchInfo
      if(fuzzy){
        this.showPointsForCourse=this.showPointsForCourseCopy.filter((value)=>{
          return value.final_Information_no_coursename.includes(fuzzy)
        })
      }else{
        this.showPointsForCourse=this.showPointsForCourseCopy
      }
    },
    changeTermsForCourse(val){
      this.showPointsForCourse=this.otherTermsPointForCourse[val]
      this.showPointsForCourseCopy=this.otherTermsPointForCourse[val]
    },
    changeTermsForGrand(val){
      this.showPointsForGrand=this.otherTermsPointForGrand[val]
    },
    changeTermsForGrade(val){
      this.showPointsForGrade=this.otherTermsPointForGrade[val]
    },

    getData(){
      request.post('/finStuExamnation',this.user).then(res=>{
        this.otherTermsPointForCourse=res.data
      })

      request.post('/findStuGradepoint',this.user).then(res=>{
        this.otherTermsPointForGrand=res.data
        if(this.otherTermsPointForGrand["总绩点"]){
          this.choosedTermForGrand="总绩点"
          this.showPointsForGrand=this.otherTermsPointForGrand[this.choosedTermForGrand]
        }
      })

      request.post('/findStuCE',this.user).then(res=>{
        this.otherTermsPointForGrade=res.data
      })

    },
  },
}
</script>

<style scoped>

</style>