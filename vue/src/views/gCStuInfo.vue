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
  />
  <el-button :icon="Search" circle size="small" @click="searchFun" style="margin-left: 5px"></el-button>
  <el-button :icon="Delete" circle size="small" @click="deleteSearch" style="margin-left: 5px"></el-button>
  <el-scrollbar height="90vh">
    <div style="border: #008c8c solid; height: 70vh">
      <el-table
          :data="tableData"
          style="width: 100%"
          max-height="600"
          @row-click="stuInfoDetail">
<!--      <el-table ref="tableRef" :data="tableData"  style="width: 100%" max-height="600" @rwo-click="stuInfoDetail">-->
        <el-table-column prop="stu_name" label="姓名" width="100" fixed/>
        <el-table-column
            prop="stu_no"
            label="学号"
            width="100"
            sortable
        />
        <el-table-column
            prop="stu_class"
            label="班级"
            v-if="isShow[0]"
            width="100"
            :filters="this.filterClass"
            :filter-method="filterClassHandler"
        />
        <el-table-column
            prop="stu_gender"
            label="性别"
            v-if="isShow[1]"
            width="100"
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
        <el-table-column prop="stu_email" label="邮箱" v-if="isShow[12]" width="120"/>
      </el-table>
    </div>

    <el-button @click="exportExcel">
      导出
    </el-button>
  </el-scrollbar>

  <el-dialog
      v-model="infoDialog"
      title="Tips"
      width="50%"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="infoDialog = false">Cancel</el-button>
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
      tableData:[
        // {
        //   stu_address: "重庆大学",
        //   stu_birthday: "1995-12-26",
        //   stu_caucus_time: "2021",
        //   stu_class: "2班",
        //   stu_email: "",
        //   stu_ethnic: "维吾尔族",
        //   stu_gender: 0,
        //   stu_id: "522321",
        //   stu_ismacau: 1,
        //   stu_name: "李四光",
        //   stu_no: 20204146,
        //   stu_origin: "四川成都",
        //   // stu_password: "1111"
        //   // stu_photourl: "WU"
        //   stu_politicalface: "共青团员",
        //   stu_qq: "122706559",
        //   stu_telephone: "18357980493",
        // },
      ],
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
    }
  },
  created() {
    this.getData()
  },

  methods:{
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
      this.infoDialog=true
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
      let user=JSON.parse(sessionStorage.getItem('user'))
      request.post('/Stu/stuList', user).then(res=>{
        this.tableData=res
      }).catch(err=>{
        this.$message.error("学生信息请求错误")
      })

      request.post('/classList', user).then(res=>{
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