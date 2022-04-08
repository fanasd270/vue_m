<template>
  <el-select v-model="choosedTerm" placeholder="请选择" @change="changeTerms">
    <el-option
        v-for="(item,key,index) in otherTermsPoint"
        :key="key"
        :label="key"
        :value="key">
    </el-option>
  </el-select>

  <el-table
      :data="showPoints"
      stripe
      style="width: 100%">
    <el-table-column
        prop="comprehensive_evaluation_stu_no"
        label="学号">
    </el-table-column>
    <el-table-column
        prop="comprehensive_evaluation_name"
        label="姓名">
    </el-table-column>
    <el-table-column
        prop="comprehensive_evaluation_yearfromto"
        label="学年学期">
    </el-table-column>
    <el-table-column
        prop="comprehensive_evaluation_rankforscore"
        label="成绩排名"
        sortable>
    </el-table-column>
    <el-table-column
        prop="comprehensive_evaluation_rank"
        label="综合素质测评排名"
        sortable>
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
</template>

<script>
import request from "@/utils/request";

export default {
  name: "gCScoreGradePointView",
  data(){
    return{
      user:{},
      power:{},
      otherTermsPoint:{},
      showPoints:[],
      choosedTerm:'',
    }
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
  methods:{
    changeTerms(val){
      this.showPoints=this.otherTermsPoint[val]
    },
    getData(){
      request.post('/findCEByyear',this.user).then(res=>{
        this.otherTermsPoint=res.data
      })
    },
  },
}
</script>

<style scoped>

</style>