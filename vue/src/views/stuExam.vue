<template>
  <div style="position: relative; margin:20px 0 0 5% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      {{questionBank.question_bank_name}}
    </p>
    <br>
    <div>
      <el-button type="text" @click="getBack">返回题库</el-button>
      <el-button v-if="!showChoose" @click="showChoose=true; isSubmitCS=false" type="text">重新获取</el-button>
    </div>

    <div v-if="showChoose">
      <h3 style="margin-bottom: 5px">自定题目数量</h3>
      <div style="margin-bottom: 5px">
        <span>选择题({{questionsNum.countForC}}):</span>
        <el-input-number
            v-model="askExamForm.count.countForC"
            :min="0"
            :max="questionsNum.countForC"
            controls-position="right"
            size="small"
        />
      </div>
      <div style="margin-bottom: 5px">
        <span>填空题({{questionsNum.countForF}}):</span>
        <el-input-number
            v-model="askExamForm.count.countForF"
            :min="0"
            :max="questionsNum.countForF"
            controls-position="right"
            size="small"
        />
      </div>
      <div style="margin-bottom: 5px">
        <span>简答题({{questionsNum.countForAS}}):</span>
        <el-input-number
            v-model="askExamForm.count.countForAS"
            :min="0"
            :max="questionsNum.countForAS"
            controls-position="right"
            size="small"
        />
      </div>
      <el-button type="primary" @click="askExam">确定</el-button>
    </div>

    <div v-if="!showChoose">
      <div>
        <el-button @click="submitTestCS">提交</el-button>
      </div>
      <div style="display: inline-block; width: 30%; vertical-align: top">
        <el-pagination
            small
            @size-change="handleSizeChangeCS"
            @current-change="handleCurrentChangeCS"
            :current-page="paginationCS.currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="paginationCS.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationCS.totalNum">
        </el-pagination>
        <el-scrollbar height="500px">
          <div v-for="(item, index) in questions.questionCS">
            <el-card v-if="(index>=(paginationCS.currentPage-1)*paginationCS.pageSize)&&(index<paginationCS.currentPage*paginationCS.pageSize)">
              <template #header>
                <div class="card-header">
                  <span>{{index+1}}.</span>
                  <span v-if="item.question_c_type==='sc'">(单)</span>
                  <span v-if="item.question_c_type==='mc'">(多)</span>
                  <span>{{item.question_c_describe}}</span>
                </div>
              </template>

              <el-checkbox-group v-if="item.question_c_type==='mc'" v-model="answers.CS[index]">
                <el-checkbox v-if="item.question_c_a!==null" label="A">A.{{item.question_c_a}}</el-checkbox>
                <el-checkbox v-if="item.question_c_b!==null" label="B">B.{{item.question_c_b}}</el-checkbox>
                <el-checkbox v-if="item.question_c_c!==null" label="C">C.{{item.question_c_c}}</el-checkbox>
                <el-checkbox v-if="item.question_c_d!==null" label="D">D.{{item.question_c_d}}</el-checkbox>
                <el-checkbox v-if="item.question_c_e!==null" label="E">E.{{item.question_c_e}}</el-checkbox>
                <el-checkbox v-if="item.question_c_f!==null" label="F">F.{{item.question_c_f}}</el-checkbox>
                <el-checkbox v-if="item.question_c_g!==null" label="G">G.{{item.question_c_g}}</el-checkbox>
              </el-checkbox-group>
              <el-radio-group v-if="item.question_c_type==='sc'" v-model="answers.CS[index][0]">
                <el-radio v-if="item.question_c_a!==null" label="A">A.{{item.question_c_a}}</el-radio>
                <el-radio v-if="item.question_c_b!==null" label="B">B.{{item.question_c_b}}</el-radio>
                <el-radio v-if="item.question_c_c!==null" label="C">C.{{item.question_c_c}}</el-radio>
                <el-radio v-if="item.question_c_d!==null" label="D">D.{{item.question_c_d}}</el-radio>
                <el-radio v-if="item.question_c_e!==null" label="E">E.{{item.question_c_e}}</el-radio>
                <el-radio v-if="item.question_c_f!==null" label="F">F.{{item.question_c_f}}</el-radio>
                <el-radio v-if="item.question_c_g!==null" label="G">G.{{item.question_c_g}}</el-radio>
              </el-radio-group>

              <div>
                <el-tag v-if="this.isSubmitCS&&judgeAnsCS(item,index)" type="success">正确</el-tag>
                <el-tag v-if="this.isSubmitCS&&!judgeAnsCS(item,index)" type="danger">错误</el-tag>
                <span v-if="this.isSubmitCS&&!judgeAnsCS(item,index)">
                正确答案:
                <span v-for="(item2) in item.question_c_rlist">{{item2}}</span>
              </span>
              </div>
            </el-card>
          </div>
        </el-scrollbar>
      </div>

      <div style="display: inline-block; width: 30%; margin-left: 20px; vertical-align: top">
        <el-pagination
            small
            @size-change="handleSizeChangeFS"
            @current-change="handleCurrentChangeFS"
            :current-page="paginationFS.currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="paginationFS.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationFS.totalNum">
        </el-pagination>
        <el-scrollbar height="500px">
          <div v-for="(item, index) in questions.questionFS">
            <el-card v-if="(index>=(paginationFS.currentPage-1)*paginationFS.pageSize)&&(index<paginationFS.currentPage*paginationFS.pageSize)">
              <template #header>
                <div class="card-header">
                  <span>{{index+1}}.</span>
                  <span>{{item.question_f_describe}}</span>
                </div>
              </template>
              <el-input v-model="answers.FS[index]" placeholder="输入答案" />
              <div v-if="isSubmitCS">
              <span>
                正确答案:{{item.question_f_r}}
              </span>
              </div>
            </el-card>
          </div>
        </el-scrollbar>
      </div>

      <div style="display: inline-block; width: 30%; margin-left: 20px; vertical-align: top">
        <el-pagination
            small
            @size-change="handleSizeChangeSAS"
            @current-change="handleCurrentChangeSAS"
            :current-page="paginationSAS.currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="paginationSAS.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationSAS.totalNum">
        </el-pagination>
        <el-scrollbar height="500px">
          <div v-for="(item, index) in questions.questionSAS">
            <el-card v-if="(index>=(paginationSAS.currentPage-1)*paginationSAS.pageSize)&&(index<paginationSAS.currentPage*paginationSAS.pageSize)">
              <template #header>
                <div class="card-header">
                  <span>{{index+1}}.</span>
                  <span>{{item.question_sa_describe}}</span>
                </div>
              </template>
              <el-input
                  v-model="answers.SAS[index]"
                  :rows="2"
                  type="textarea"
                  placeholder="请输入答案"
              />
              <div v-if="isSubmitCS">
                <span>正确答案:</span>
                <br>
                <span>{{item.question_sa_r}}</span>
              </div>
            </el-card>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "stuExam",
  data(){
    return{
      showChoose:true,
      questionsNum:{},
      askExamForm:{
        question_bank_no: "0",
        count: {
          countForC: 1,
          countForF: 1,
          countForAS:1,
        }
      },

      user:{},
      questionBank:{},
      questions:{},
      isSubmitCS:false,
      // isSubmitFS:false,
      // isSubmitSAS:false,
      answers:{
        CS:[],
        FS:[],
        SAS:[],
      },
      // uploadForm:{
      //   stu_no: '',
      //   question_bank_no: "",
      //   progressC: 0,
      //   progressF: 0,
      //   progressSA: 0
      // },
      paginationCS:{
        totalNum:0,
        pageSize:2,
        currentPage:1,
      },
      paginationFS:{
        totalNum:0,
        pageSize:2,
        currentPage:1,
      },
      paginationSAS:{
        totalNum:0,
        pageSize:2,
        currentPage:1,
      },
    }
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.questionBank=this.$route.params
    // this.uploadForm.stu_no=this.user.stu_no
    if(JSON.stringify(this.questionBank)==='{}'){
      this.questionBank=JSON.parse(localStorage.getItem("questionBank"))
    }
    // this.uploadForm.question_bank_no=this.questionBank.question_bank_no
    this.askExamForm.question_bank_no=this.questionBank.question_bank_no
    // this.initialPage()
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem("questionBank",JSON.stringify(this.questionBank))
    })


    this.getData()

  },
  methods:{
    askExam(){
      request.post('/questionForExamination',this.askExamForm).then(res=>{
        console.log(res)
        this.showChoose=false

        this.questions=res.data
        this.answers.CS=[]
        this.answers.FS=[]
        this.answers.SAS=[]
        this.paginationCS.currentPage=1
        this.paginationFS.currentPage=1
        this.paginationSAS.currentPage=1
        for(let i=0; i<res.data.questionCS.length;i++){
          this.answers.CS.push(new Array(0).fill(-1))
        }
        for(let i=0; i<res.data.questionFS.length;i++){
          this.answers.FS.push('')
        }
        for(let i=0; i<res.data.questionSAS.length;i++){
          this.answers.CS.push('')
        }
        this.paginationCS.totalNum=res.data.questionCS.length
        this.paginationFS.totalNum=res.data.questionFS.length
        this.paginationSAS.totalNum=res.data.questionSAS.length
      }).catch(err=>{
        this.$message.error('请求错误')
      })
    },

    getData(){
      request.post('/findQuestionCountByQB',{queryString:this.questionBank.question_bank_no}).then(res=>{
        console.log('ttt')
        console.log(res)
        this.questionsNum=res.data
      })
    },

    // clearTest(){
    //   request.post('resetProgress',this.uploadForm).then(res=>{
    //     this.$message.success('清除成功')
    //     console.log(this)
    //     this.initialPage()
    //   })
    // },
    handleSizeChangeCS(num){
      // this.isSubmitCS=false
      this.paginationCS.pageSize=num
    },
    handleSizeChangeFS(num){
      // this.isSubmitFS=false
      this.paginationFS.pageSize=num
    },
    handleSizeChangeSAS(num){
      // this.isSubmitSAS=false
      this.paginationSAS.pageSize=num
    },

    handleCurrentChangeCS(num){
      // this.isSubmitCS=false
      this.paginationCS.currentPage=num
    },
    handleCurrentChangeFS(num){
      // this.isSubmitFS=false
      this.paginationFS.currentPage=num
    },
    handleCurrentChangeSAS(num){
      // this.isSubmitSAS=false
      this.paginationSAS.currentPage=num
    },
    judgeAnsCS(item, index){
      if(item.question_c_type==='sc'){
        return item.question_c_rlist[0]===this.answers.CS[index][0]
      }else{
        for(let i in item.question_c_rlist){
          if(this.answers.CS[index].indexOf(item.question_c_rlist[i])===-1){
            return false
          }
        }
        for(let i in this.answers.CS[index]){
          if(item.question_c_rlist.indexOf(this.answers.CS[index][i])===-1){
            return false
          }
        }
        return true
      }
    },
    submitTestCS(){
      this.isSubmitCS=true
      // this.uploadForm.progressC=this.paginationCS.currentPage*this.paginationCS.pageSize
      // this.uploadForm.progressF=(this.paginationFS.currentPage-1)*this.paginationFS.pageSize
      // this.uploadForm.progressSA=(this.paginationSAS.currentPage-1)*this.paginationSAS.pageSize
      // console.log(this.uploadForm)
      // request.post('uploadProgress',this.uploadForm).then(res=>{
      //
      // })
    },
    getBack(){
      this.$router.push('/stuLayout/stuQuestions')
    },
  },
}
</script>

<style scoped>

</style>