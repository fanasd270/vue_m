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

  <el-scrollbar height="90vh">
    <div style="border: #008c8c solid;">
      <el-table ref="tableRef" row-key="stu_no" :data="tableData" style="width: 100%" max-height="600">
        <el-table-column prop="stu_name" label="姓名" width="100" fixed/>
        <el-table-column
            prop="stu_no"
            label="学号"
            width="100"
            sortable
            column-key="stu_no"
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
  </el-scrollbar>
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
        {text: '男', value: 1},
        {text: '女', value: 0},
      ],
      filterFace:[
        {text: '群众', value: '群众'},
        {text: '共青团员', value: '共青团员'},
        {text: '党员', value: '党员'},
      ],
      filterEthnic:[
        {text: '汉', value: '汉'},
        {text: '少数民族', value: '少数民族'},
      ],
      filterMacau:[
        {text: '否', value: 0},
        {text: '是', value: 1},
      ],
      showAll: true,
      isShow:[
          true, true, true, true, true,true,true,true,true,true,true,true,true
      ],
      tableData:[
        {
          stu_address: "重庆大学",//
          stu_birthday: "1995-12-26",//
          stu_caucus_time: "2021-10-10",//
          stu_class: "大数据1班",//
          stu_email: "",
          stu_ethnic: "汉",//
          stu_gender: 1,//
          stu_id: "522321222222222222",//
          stu_ismacau: 0,//
          stu_name: "李四光",//
          stu_no: 20204146,//
          stu_origin: "四川成都",//
          // stu_password: "1111"
          // stu_photourl: "WU"
          stu_politicalface: "共青团员",//
          stu_qq: "122706559",
          stu_telephone: "18357980493",
        },
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
          stu_ethnic: "藏族",
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
        {
          stu_address: "重庆大学",
          stu_birthday: "1995-12-26",
          stu_caucus_time: "2021",
          stu_class: "2班",
          stu_email: "",
          stu_ethnic: "维吾尔族",
          stu_gender: 0,
          stu_id: "522321",
          stu_ismacau: 1,
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
      if(value==='汉'){
        return row[property] === value
      } else {
        return  row[property] !== '汉'
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
  },
}
</script>

<style scoped>

</style>