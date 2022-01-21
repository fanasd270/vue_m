<template>
<div>
  <el-button @click="clearFilter">reset all filters</el-button>
  <el-table ref="tableRef" row-key="stu_no" :data="tableData" style="width: 100%">
    <el-table-column prop="stu_name" label="姓名" width="180"/>
    <el-table-column
        prop="stu_no"
        label="学号"
        width="180"
        sortable
        column-key="stu_no"
    />
    <el-table-column
        prop="stu_class"
        label="班级"
        width="180"
        :filters="this.filterClass"
        :filter-method="filterClassHandler"
    />
    <el-table-column
        prop="stu_gender"
        label="性别"
        width="180"
        :filters="this.filterGender"
        :filter-method="filterGenderHandler"
        :formatter="genderFormatter"
    />
    <el-table-column
        prop="stu_politicalface"
        label="政治面貌"
        width="180"
        :filters="this.filterFace"
        :filter-method="filterFaceHandler"
    />
    <el-table-column
        prop="stu_ethnic"
        label="民族"
        width="180"
        :filters="this.filterEthnic"
        :filter-method="filterEthnicHandler"
    />
  </el-table>
</div>
</template>

<script>
export default {
  name: "gCStuInfo",

  data(){
    return{
      filterClass:[
        {text: '大数据1班', value: '大数据1班'},
        {text: '1班', value: '1班'},
        {text: '2班', value: '2班'},
        {text: '3班', value: '3班'},
        {text: '4班', value: '4班'},
      ],
      filterGender:[
        {text: '男', value: '1'},
        {text: '女', value: '0'},
      ],
      filterFace:[
        {text: '群众', value: '群众'},
        {text: '共青团员', value: '共青团员'},
        {text: '党员', value: '党员'},
      ],
      filterEthnic:[
        {}
      ],
      tableData:[
        {
          stu_address: "重庆大学",
          stu_birthday: "1995-12-26",
          stu_caucus_time: "2021",
          stu_class: "大数据1班",
          stu_email: "",
          stu_ethnic: "汉",
          stu_gender: 1,
          stu_id: "522321",
          stu_ismacau: 0,
          stu_name: "李四光",
          stu_no: 20204146,
          stu_origin: "四川成都",
          // stu_password: "1111"
          // stu_photourl: "WU"
          stu_politicalface: "共青团员",
          stu_qq: "122706559",
          stu_telephone: "18357980493",
        },
        {
          stu_address: "重庆大学",
          stu_birthday: "1995-12-26",
          stu_caucus_time: "2021",
          stu_class: "2班",
          stu_email: "",
          stu_ethnic: "汉",
          stu_gender: 0,
          stu_id: "522321",
          stu_ismacau: 0,
          stu_name: "李四光",
          stu_no: 20204146,
          stu_origin: "四川成都",
          // stu_password: "1111"
          // stu_photourl: "WU"
          stu_politicalface: "共青团员",
          stu_qq: "122706559",
          stu_telephone: "18357980493",
        },
      ]
    }
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
  },
}
</script>

<style scoped>

</style>