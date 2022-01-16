<template>
  <div>
    <!--    功能区域-->
    <div style="margin: 10px 5px">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>
    <!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="输入关键字" clearable style="width: 20%"/>
      <el-button type="primary" style="margin: 0 5px" @click="load">查询</el-button>
    </div>
    <!--      stripe表示斑马纹-->
    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"  stripe style="width: 100%">
      <!--        sortable表示按当前column里的值排序-->
      <el-table-column prop="stu_no" label="学号" sortable />
      <el-table-column prop="stu_name" label="姓名" />
      <el-table-column prop="stu_gender" label="性别" />
      <el-table-column prop="stu_class" label="班级" />
      <el-table-column prop="stu_birthday" label="出生日期" />
      <el-table-column prop="stu_ethnic" label="民族" />
      <el-table-column prop="stu_origin" label="籍贯" />
      <el-table-column prop="stu_id" label="身份证号" />
      <el-table-column prop="stu_politicalface" label="政治面貌" />
      <el-table-column prop="stu_caucus_time" label="党团时间" />
      <el-table-column prop="stu_isMacau" label="是否港澳" />
      <el-table-column prop="stu_telephone" label="电话" />
      <el-table-column prop="stu_qq" label="QQ" />
      <el-table-column prop="stu_email" label="email" />
      <el-table-column prop="stu_address" label="常驻地址" />

      <!--      元组末操作-->
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <!--删除二次确定按钮-->
          <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-popconfirm>


        </template>
      </el-table-column>

    </el-table>

    <div style="margin: 10px 0">
      <!--   page-size表示每页有多少条数据       -->
      <!--    total表示总共最多有多少数据  -->
      <el-pagination
          v-model:currentPage="currentPage"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      >
      </el-pagination>

      <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <el-form :model="form" label-width="120px">
          <el-form-item label="学号">
            <el-input v-model="form.stu_no"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.stu_name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.stu_gender" label="男" size="large">男</el-radio>
            <el-radio v-model="form.stu_gender" label="女" size="large">女</el-radio>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="form.stu_class"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-input v-model="form.stu_birthday"></el-input>
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="form.stu_ethnic"></el-input>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-input type="textarea" v-model="form.stu_origin"></el-input>
          </el-form-item>
          <el-form-item label="Activity name">
            <el-input v-model="form.stu_id"></el-input>
          </el-form-item>
          <el-form-item label="Activity name">
            <el-input v-model="form.stu_politicalface"></el-input>
          </el-form-item>
          <el-form-item label="Activity name">
            <el-input v-model="form.stu_caucus_time"></el-input>
          </el-form-item>
          <el-form-item label="Activity name">
            <el-input v-model="form.stu_isMacau"></el-input>
          </el-form-item>
          <el-form-item label="Activity name">
            <el-input v-model="form.stu_telephone"></el-input>
          </el-form-item>
          <el-form-item label="Activity name">
            <el-input v-model="form.stu_qq"></el-input>
          </el-form-item>
          <el-form-item label="Activity name">
            <el-input v-model="form.stu_email"></el-input>
          </el-form-item>
          <el-form-item label="Activity name">
            <el-input v-model="form.stu_address"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="save">Confirm</el-button>
          </span>
        </template>
      </el-dialog>

    </div>
    <button @click="changepage">stu</button>

  </div>
</template>

<script>


import request from "@/utils/request";

export default {
  name: 'StudentHome',
  components: {

  },
  data(){
    return{
      form:{},
      dialogVisible:false,
      search:'',
      currentPage: 1,
      pageSize:5,
      total:0,
      tableData:[]
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      request.post('/STUDENTLIST',  {
        params:{
          pageNum:this.currentPage,
          pageSize:this.pageSize,
          search:this.search
        }
      }).then(res=>{
        // this.tableData=res.data.records
        this.tableData=res
        this.total=res.length
      })
    },
    add(){
      this.dialogVisible=true//弹窗可见
      this.form={}//将form类清空，即保证每次弹窗出现时里面没有内容
    },
    save(){
      if(this.form.Stu_id){
        //  更新,code==='0'（后端返回的一个变量判断）
        request.put( url , this.form).then(res => {
          if(res.code==='0'){
            this.$message({
              type:"success",
              message:"更新成功"
            })
            this.load()//刷新表格
            this.dialogVisible=false//关闭弹窗
          }
          else{
            this.$message({
              type:"error",
              message:res.msg//后端给出的错误信息
            })
          }
        })
      }
      else {
        //  新增
        request.post( url , this.form).then(res => {
          if(res.code==='0'){
            this.$message({
              type:"success",
              message:"新增成功"
            })
            this.load()//刷新表格
            this.dialogVisible=false//关闭弹窗
          }
          else{
            this.$message({
              type:"error",
              message:res.msg//后端给出的错误信息
            })
          }
        })

      }
    },
    handleEdit(row){
      this.form= JSON.parse(JSON.stringify(row))//对form进行深拷贝
      this.dialogVisible=true
    },
    handleDelete(row){

      console.log(row.stu_no)
    },
    handleSizeChange(pageSize){//改变每页数量触发
      this.pageSize=pageSize
      this.load()
    },
    handleCurrentChange(currentPage){//改变页码触发
      this.currentPage=currentPage
      this.load()
    },
    changepage(id){
      this.$router.push({name:"Home",params:{id:'1111222'}});
    },
  }
}
</script>
