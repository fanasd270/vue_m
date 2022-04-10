<template>
  <div style="margin: 5px 9% 0 9%; min-height: 500px">
    <div>
      <el-select v-model="singleInfo.foreign_languages_type" class="m-2" placeholder="语种">
        <el-option
            v-for="item in languageType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-input  :disabled="singleInfo.foreign_languages_type===''" v-if="singleInfo.foreign_languages_type!=='英语'" v-model="singleInfo.foreign_languages_name" style="width: 15%; margin-left: 5px; vertical-align: top" placeholder="考试名称"></el-input>
      <el-select v-if="singleInfo.foreign_languages_type==='英语'" v-model="singleInfo.foreign_languages_name" class="m-2" placeholder="考试名称" style="width: 15%; margin-left: 5px; vertical-align: top">
        <el-option
            v-for="item in EnglishType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-input v-model="singleInfo.foreign_languages_score" style="width: 15%; margin-left: 5px; vertical-align: top" placeholder="分数" @input="NumberCheck"></el-input>
      <el-button type="text" @click="insertInfo">新建</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="foreign_languages_type" label="语种" width="150"/>
      <el-table-column prop="foreign_languages_name" label="考试名称" width="120" />
      <el-table-column prop="foreign_languages_score" label="分数" width="120" />
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="text" size="small" @click="deleteInfo(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "stuForeign",
  data(){
    return{
      user:{},
      singleInfo:{
        foreign_languages_no: "",
        foreign_languages_type: "",
        foreign_languages_name: "",
        foreign_languages_score: "",
        foreign_languages_stu_no: ""
      },
      tableData:[],
      languageType:[
        {value:'英语',label:'英语'},
        {value:'俄语',label:'俄语'},
        {value:'日语',label:'日语'},
        {value:'德语',label:'德语'},
        {value:'法语',label:'法语'},
        {value:'其他',label:'其他'},
      ],
      EnglishType:[
        {value:'四级',label:'四级'},
        {value:'六级',label:'六级'},
        {value:'雅思',label:'雅思'},
        {value:'托福',label:'托福'},
      ],
    }
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'));
    this.singleInfo.foreign_languages_stu_no=this.user.stu_no+''
    this.getData()
  },
  methods:{

    deleteInfo(row){
      request.post('/deleteForeignLanguages',row).then(res=>{
        this.getData()
      })
    },

    insertInfo(){

      if(this.singleInfo.foreign_languages_type===''||this.singleInfo.foreign_languages_name===''||this.singleInfo.foreign_languages_score===''){
        this.$message.warning('请完整填写信息')
        return
      }
      request.post('/uploadForeignLanguages',this.singleInfo).then(res=>{
        this.getData()
        this.singleInfo.foreign_languages_type=''
        this.singleInfo.foreign_languages_name=''
        this.singleInfo.foreign_languages_score=''
      })
    },
    getData(){
      request.post('/findForeignLanguages',this.user).then(res=>{
        this.tableData=res.data
      }).catch(err=>{
        this.$message.error('连接失败')
      })
    },
    NumberCheck(num) {
      let str = this.singleInfo.foreign_languages_score;
      //限制只能输入一个小数点
      if (str.indexOf(".") !== -1) {
        var str_ = str.substr(str.indexOf(".") + 1);
        if (str_.indexOf(".") !== -1) {
          str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
        }
      }
      //正则替换，保留数字和小数点
      str = str.replace(/[^\d^\.]+/g,'')
      this.singleInfo.foreign_languages_score=str
    },
  },
}
</script>

<style scoped>

</style>