<template>
<div style="position: relative; margin:20px 0 0 9% ">
  <i style="background-color: blue;">
    <span style="opacity: 0">1</span>
  </i>
  <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px">
    公告
    <el-button @click="downloadfile">

    </el-button>
  </p>
  <el-input placeholder="请输入内容" v-model="inputSearch" clearable :prefix-icon="Search"
            style="width: 20%; position: absolute; right: 12%;">
  </el-input>

  <div style="width: 88%; height: 80vh; margin-top: 30px; position: relative; border: dimgray solid">


    <div>
      <!-- 导出按钮 -->
      <div>
        <el-button  @click="exportExcel" type="primary" class="button" style="width:70px; height: 30px;">导出</el-button>
      </div>
      <el-table
          class="table"
          :data="tableData"
          border
          style="width: 100%">
        <el-table-column
            prop="date"
            label="日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            v-if="false"
            prop="address"
            label="地址">
        </el-table-column>
      </el-table>
    </div>


  </div>
</div>
</template>

<script>
import {Search} from "@element-plus/icons";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";

export default {
  name: "stuAM",
  data(){
    return{
      Search,
      inputSearch: "",

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        time: '123'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        time: '123'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        time: '123'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        time: '123'
      }],

    }
  },
  methods:{
    downloadfile(){
      window.location.href='http://localhost:8080/11.xlsx'
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
      var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
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