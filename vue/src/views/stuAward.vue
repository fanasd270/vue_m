<template>
  <div style="padding-left: 6%; padding-right: 6%;">
    <div style="margin-top: 30px">
      <i style="background-color: blue;">
        <span style="opacity: 0">1</span>
      </i>
      <p style="font-weight: bolder; font-size: large ;display: inline">
        获奖信息维护
      </p>
    </div>
    <div style="border: dimgray solid; margin-top: 20px; height: 100%">

      <el-form ref="form" :model="form" style="margin:30px 0 0 60px; font-weight: bold">
        <el-form-item label="请先选择填写获奖信息类别：">
          <el-select v-model="form.region" placeholder="论文">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成果获得时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="成果描述：">
          <el-input type="textarea" v-model="form.desc" style="width: 50%;" :rows="6"></el-input>
        </el-form-item>

        <el-form-item label="成果证明材料" style="margin-bottom: 70px;">
          <el-upload
              class="upload-demo"
              drag
              action="http://10.236.11.12:8080/Stu/upLoadPicture"
              multiple
              list-type="jpg"
              :on-success="fileUpdateS"
          >

            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item style="position: absolute; left:45%">
          <el-button type="primary" @click="onSubmit" style="margin-right: 40px">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      <div style="height: 100px"></div>
    </div>
  </div>
</template>

<script>
import uploadFilled from "@element-plus/icons/lib/UploadFilled";

export default {
  name: "stuAward",
  components:{
    uploadFilled,
  },
  data(){
    return{
      form:{},

    }
  },
  methods:{
    fileUpdateS(res){
      console.log(res);
    },
  },
}
</script>

<style scoped>

</style>