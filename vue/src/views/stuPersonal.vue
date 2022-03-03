<template>

  <el-tabs tab-position="left" style="height: 80vh;">
    <el-tab-pane label="基本信息">
      <div style="padding-left: 6%; padding-right: 6%;">
        <div style="margin-bottom: 10px; margin-top: 20px;">
          <i style="background-color: blue;">
            <span style="opacity: 0">1</span>
          </i>
          <p style="font-weight: bolder; font-size: large ;display: inline">
            基本信息
          </p>
        </div>


        <div style="border: dimgray solid">
          <div style="width: 88%; margin-top: 30px; position: relative">
<!--            <p style="margin-left: 30px; font-weight: bold; margin-bottom: 20px;">-->
<!--              基本信息-->
<!--            </p>-->
            <el-form  :model="form" label-width="34%" :inline="true">
              <el-form-item label="姓名" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_name" disabled></el-input>
              </el-form-item>

              <el-form-item label="性别" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-radio-group v-model="form.stu_gender" disabled>
                  <el-radio  :label=1>男</el-radio>
                  <el-radio  :label=0>女</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="班级" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">
                <el-input v-model="form.stu_class" disabled></el-input>
              </el-form-item>

              <el-form-item label="出生日期" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="form.stu_birthday" disabled></el-input>
              </el-form-item>

              <el-form-item label="学号" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_no" disabled></el-input>
              </el-form-item>

              <el-form-item label="民族" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_ethnic" disabled></el-input>
              </el-form-item>

              <el-form-item label="籍贯" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_origin" :disabled="Edit[0]"></el-input>
              </el-form-item>

              <el-form-item label="政治面貌"  style="margin-right: 2%; width: 23%; margin-bottom: 40px;" >
                <el-select v-model="form.stu_politicalface" placeholder=" " :disabled="Edit[0]">
                  <el-option label="群众" value="群众"></el-option>
                  <el-option label="共青团员" value="共青团员"></el-option>
                  <el-option label="中共党员" value="中共党员"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="党团时间" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-col :span="11">
                  <el-date-picker
                      v-model="form.stu_caucus_time"
                      :disabled="Edit[0]"
                      type="date"
                      style="width: 220%"
                  ></el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item label="身份证号" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_id" disabled></el-input>
              </el-form-item>

              <el-form-item label="常驻地址" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_address" :disabled="Edit[0]"></el-input>
              </el-form-item>

              <el-form-item label="是否港澳" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-radio-group v-model="form.stu_ismacau" disabled>
                  <el-radio :label=0>否</el-radio>
                  <el-radio :label=1>是</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="电话" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_telephone" :disabled="Edit[0]"></el-input>
              </el-form-item>

              <el-form-item label="QQ" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_qq" :disabled="Edit[0]"></el-input>
              </el-form-item>

              <el-form-item label="E-mail" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="form.stu_email" :disabled="Edit[0]"></el-input>
              </el-form-item>

              <br>
              <el-button style="position: relative; left:55%" v-if="isShow1[0]" @click="changeData">修改</el-button>
              <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[0]">
                <el-button type="primary" @click="onSubmit" style="margin-right: 50px">确认</el-button>
                <el-button @click="Cancel">取消</el-button>
              </div>
            </el-form>
          </div>

          <div style="width: 100%;height: 10px"></div>

        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="入住信息">
      <div style="padding-left: 6%; padding-right: 6%;">
        <div style="margin-bottom: 10px; margin-top: 20px;">
          <i style="background-color: blue;">
            <span style="opacity: 0">1</span>
          </i>
          <p style="font-weight: bolder; font-size: large ;display: inline">
            入住信息
          </p>
        </div>


        <div style="border: dimgray solid">
          <div style="width: 88%; margin-top: 30px; position: relative">
            <el-form  :model="Accommodation" label-width="34%">
              <el-form-item label="楼栋" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="Accommodation.accommodation_information_building" :disabled="Edit[1]"></el-input>
              </el-form-item>

              <el-form-item label="门牌号" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">
                <el-input v-model="Accommodation.accommodation_information_room_no" :disabled="Edit[1]"></el-input>
              </el-form-item>

              <el-form-item label="床号" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="Accommodation.accommodation_information_bed" :disabled="Edit[1]"></el-input>
              </el-form-item>

              <el-form-item label="是否室长" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-radio-group v-model="Accommodation.accommodation_information_ismain" :disabled="Edit[1]">
                  <el-radio  label="是">是</el-radio>
                  <el-radio  label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <br>
              <el-button style="position: relative; left:55%" v-if="isShow1[1]" @click="changeAccommodation">修改</el-button>
              <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[1]">
                <el-button type="primary" @click="onSubmitAccommodation" style="margin-right: 50px">确认</el-button>
                <el-button @click="CancelAccommodation">取消</el-button>
              </div>
            </el-form>
          </div>

          <div style="width: 100%;height: 10px"></div>

        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="高考信息">
      <div style="padding-left: 6%; padding-right: 6%;">
        <div style="margin-bottom: 10px; margin-top: 20px;">
          <i style="background-color: blue;">
            <span style="opacity: 0">1</span>
          </i>
          <p style="font-weight: bolder; font-size: large ;display: inline">
            高考信息
          </p>
        </div>


        <div style="border: dimgray solid">
          <div style="width: 88%; margin-top: 30px; position: relative">
            <el-form  :model="examination" label-width="34%">
              <el-form-item label="高中名字" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-input v-model="examination.college_entrance_examination_highschool_name" :disabled="Edit[2]"></el-input>
              </el-form-item>

              <el-form-item label="高考类型" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">
                <el-select v-model="examination.college_entrance_examination_type" placeholder=" " :disabled="Edit[2]">
                  <el-option label="农村应届" value="农村应届"></el-option>
                  <el-option label="城镇应届" value="城镇应届"></el-option>
                  <el-option label="农村往届" value="农村往届"></el-option>
                  <el-option label="城镇往届" value="城镇往届"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="语文" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="examination.college_entrance_examination_chinese" :disabled="Edit[2]"></el-input>
              </el-form-item>

              <el-form-item label="数学" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-input v-model="examination.college_entrance_examination_math" :disabled="Edit[2]"></el-input>
              </el-form-item>

              <el-form-item label="英语" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-input v-model="examination.college_entrance_examination_english" :disabled="Edit[2]"></el-input>
              </el-form-item>

              <el-form-item label="综合" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-input v-model="examination.college_entrance_examination_comprehensive" :disabled="Edit[2]"></el-input>
              </el-form-item>
              <br>
              <el-button style="position: relative; left:55%" v-if="isShow1[2]" @click="changeExamination">修改</el-button>
              <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[2]">
                <el-button type="primary" @click="onSubmitExamination" style="margin-right: 50px">确认</el-button>
                <el-button @click="CancelExamination">取消</el-button>
              </div>
            </el-form>
          </div>

          <div style="width: 100%;height: 10px"></div>

        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="家庭信息">
      <div style="padding-left: 6%; padding-right: 6%;">
        <div style="margin-bottom: 10px; margin-top: 20px;">
          <i style="background-color: blue;">
            <span style="opacity: 0">1</span>
          </i>
          <p style="font-weight: bolder; font-size: large ;display: inline">
            家庭信息
          </p>
        </div>


        <div style="border: dimgray solid">
          <div style="width: 88%; margin-top: 30px; position: relative">
            <p style="margin-left: 30px; font-weight: bold; margin-bottom: 20px;">
              父亲
            </p>
            <el-form  :model="family[0]" label-width="34%" :inline="true">
              <el-form-item label="关系" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-select v-model="family[0].family_relationship" placeholder=" " :disabled="Edit[3]">
                  <el-option label="父亲" value="父亲"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="姓名" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">
                <el-input v-model="family[0].family_name" :disabled="Edit[3]"></el-input>
              </el-form-item>

              <el-form-item label="年龄" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="family[0].family_age" :disabled="Edit[3]"></el-input>
              </el-form-item>

              <el-form-item label="电话" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="family[0].family_tel" :disabled="Edit[3]"></el-input>
              </el-form-item>

              <el-form-item label="工作" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="family[0].family_work" :disabled="Edit[3]"></el-input>
              </el-form-item>

              <el-form-item label="职务" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="family[0].family_duties" :disabled="Edit[3]"></el-input>
              </el-form-item>

              <el-form-item label="工作地点" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="family[0].family_workplace" :disabled="Edit[3]"></el-input>
              </el-form-item>

              <el-form-item label="是否第一监护人" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-radio-group v-model="family[0].family_ismain" :disabled="Edit[3]">
                  <el-radio  label="是">是</el-radio>
                  <el-radio  label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <br>
              <el-button style="position: relative; left:55%" v-if="isShow1[3]" @click="changefamily(0)">修改</el-button>
              <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[3]">
                <el-button type="primary" @click="onSubmitfamily(0)" style="margin-right: 50px">确认</el-button>
                <el-button @click="Cancelfamily(0)">取消</el-button>
              </div>
            </el-form>

            <p style="margin-left: 30px; font-weight: bold; margin-bottom: 20px;">
              母亲
            </p>
            <el-form  :model="family[1]" label-width="34%" :inline="true">
              <el-form-item label="关系" style="margin-bottom: 40px; margin-right: 2%; width: 23%">
                <el-select v-model="family[1].family_relationship" placeholder=" " :disabled="Edit[4]">
                  <el-option label="母亲" value="母亲"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="姓名" style="margin-bottom: 40px; width: 23%; margin-right: 2%;">
                <el-input v-model="family[1].family_name" :disabled="Edit[4]"></el-input>
              </el-form-item>

              <el-form-item label="年龄" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="family[1].family_age" :disabled="Edit[4]"></el-input>
              </el-form-item>

              <el-form-item label="电话" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="family[1].family_tel" :disabled="Edit[4]"></el-input>
              </el-form-item>

              <el-form-item label="工作" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="family[1].family_work" :disabled="Edit[4]"></el-input>
              </el-form-item>

              <el-form-item label="职务" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="family[1].family_duties" :disabled="Edit[4]"></el-input>
              </el-form-item>

              <el-form-item label="工作地点" style="margin-bottom: 40px; width: 23%; margin-right: 2%">
                <el-input v-model="family[1].family_workplace" :disabled="Edit[4]"></el-input>
              </el-form-item>

              <el-form-item label="是否第一监护人" style="width: 23%; margin-bottom: 40px; margin-right: 2%;">
                <el-radio-group v-model="family[1].family_ismain" :disabled="Edit[4]">
                  <el-radio  label="是">是</el-radio>
                  <el-radio  label="否">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <br>
              <el-button style="position: relative; left:55%" v-if="isShow1[4]" @click="changefamily(1)">修改</el-button>
              <div style="position: relative; left:50%; display: inline-flex" v-if="isShow2[4]">
                <el-button type="primary" @click="onSubmitfamily(1)" style="margin-right: 50px">确认</el-button>
                <el-button @click="Cancelfamily(1)">取消</el-button>
              </div>
            </el-form>
          </div>

          <div style="width: 100%;height: 10px"></div>

        </div>
      </div>
    </el-tab-pane>
  </el-tabs>

</template>

<script>


import request from "@/utils/request";
import {Avatar} from "@element-plus/icons-vue";

export default {
  name: 'Home',
  components: {
    Avatar,
  },

  data(){
    return{
      Edit:[true, true,true, true, true],
      isShow1:[true, true,true, true, true],
      isShow2:[false,false,false,false, false],
      form:{
          stu_address: "重庆大学",
          stu_birthday: "1995-12-26",
          stu_caucus_time: "2021",
          stu_class: "1",
          stu_email: "ch@163",
          stu_ethnic: "汉族",
          stu_gender: 0,
          stu_id: "522321",
          stu_ismacau: 1,
          stu_name: "李四",
          stu_no: 1231234,
          stu_origin: "四川成都",
          stu_password: "123456",
          stu_photourl: "",
          stu_politicalface: "党员",
          stu_qq: "122706559",
          stu_telephone: "135959002",
      },

      Accommodation:{
        accommodation_information_no:null,
        accommodation_information_stu_no:"",
        accommodation_information_room_no:"",
        accommodation_information_bed:"",
        accommodation_information_building:"",
        accommodation_information_ismain:"否",
      },
      AccommodationCopy:{},

      examination:{
        college_entrance_examination_no:null,
        college_entrance_examination_highschool_name:"",
        college_entrance_examination_type:"",
        college_entrance_examination_chinese:"",
        college_entrance_examination_math:"",
        college_entrance_examination_english:"",
        college_entrance_examination_comprehensive:"",
        college_entrance_examination_stu_no:"",
      },
      examinationCopy:{},

      family:[
        {
          family_stu_no:"",
          family_relationship:"",
          family_name:"",
          family_age:"",
          family_tel:"",
          family_work:"",
          family_duties:"",
          family_workplace:"",
          family_ismain:"",
        },
        {
          family_stu_no:"",
          family_relationship:"",
          family_name:"",
          family_age:"",
          family_tel:"",
          family_work:"",
          family_duties:"",
          family_workplace:"",
          family_ismain:"",
        },
      ],
      familyCopy:{},
    }
  },

  created() {
    this.showOriginalData();
    this.getData();
  },

  methods:{

    showOriginalData(){
      // let userjava=JSON.parse(sessionStorage.getItem('user'))
      this.form=JSON.parse(sessionStorage.getItem('user'))
    },

    getData(){
      this.form.stu_no=this.form.stu_no-0;
      this.form.stu_ismacau=this.form.stu_ismacau-0;
      this.form.stu_gender=this.form.stu_gender-0;
      let formstring=JSON.stringify(this.form);
      request.post('/Stu/findDormitoryInfo', formstring).then(res=>{
        if(res.data!=null){
          this.Accommodation=res.data
        }
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"宿舍信息请求失败"
        })
      })

      request.post('/Stu/findEntranceInfo', formstring).then(res=>{
        if(res.data!=null){
          this.examination=res.data
        }
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"高考信息请求失败"
        })
      })

      request.post('/Stu/findFamilyInfo', formstring).then(res=>{
        if(res.data[0]===null){

        } else {
          this.family[0]=res.data[0]
        }

        if(res.data[1]===null){

        } else {
          this.family[1]=res.data[1]
        }
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"家庭信息请求失败"
        })
      })

    },

    changeData(){
      this.Edit[0]= false;
      this.isShow1[0]=false;
      this.isShow2[0]=true;
      this.form=JSON.parse(sessionStorage.getItem('user'))
    },
    changeAccommodation(){
      this.Edit[1]= false;
      this.isShow1[1]=false;
      this.isShow2[1]=true;
      this.AccommodationCopy=JSON.parse(JSON.stringify(this.Accommodation))
    },
    changeExamination(){
      this.Edit[2]= false;
      this.isShow1[2]=false;
      this.isShow2[2]=true;
      this.examinationCopy=JSON.parse(JSON.stringify(this.examination))
    },
    changefamily(index){
      this.Edit[index+3]= false;
      this.isShow1[index+3]=false;
      this.isShow2[index+3]=true;
      this.familyCopy=JSON.parse(JSON.stringify(this.family[index]))
    },

    Cancel(){
      this.Edit[0]= true;
      this.isShow1[0]=true;
      this.isShow2[0]=false;
      //根据本地数据恢复
      this.form=JSON.parse(sessionStorage.getItem('user'))
    },

    CancelAccommodation(){
      this.Edit[1]=true;
      this.isShow1[1]=true;
      this.isShow2[1]=false;
      this.Accommodation=JSON.parse(JSON.stringify(this.AccommodationCopy))
    },
    CancelExamination(){
      this.Edit[2]=true;
      this.isShow1[2]=true;
      this.isShow2[2]=false;
      this.examination=JSON.parse(JSON.stringify(this.examinationCopy))
    },
    Cancelfamily(index){
      this.Edit[index+3]=true;
      this.isShow1[index+3]=true;
      this.isShow2[index+3]=false;
      this.family[index]=JSON.parse(JSON.stringify(this.familyCopy))
    },

    onSubmit(){
      this.form.stu_no=this.form.stu_no-0;
      this.form.stu_ismacau=this.form.stu_ismacau-0;
      this.form.stu_gender=this.form.stu_gender-0;
      let formstring=JSON.stringify(this.form);
      console.log("提交")
      console.log(formstring)
      request.post('/Stu/upDateStudent',formstring).then(res=>{
        console.log("结果")
        console.log(res);
        if(res.data===null){
          this.$message({
            type:"error",
            message:res.msg//后端给出的错误信息
          })

        } else {
          this.$message({
            type:"success",
            message:"修改成功"
          })
          this.Edit[0]= true;
          this.isShow1[0]=true;
          this.isShow2[0]=false;
          sessionStorage.setItem('user',JSON.stringify(res.data));
          this.form=res.data;
        }

      });
    },

    onSubmitAccommodation(){
      let user=JSON.parse(sessionStorage.getItem('user'))
      this.Accommodation.accommodation_information_stu_no=user.stu_no.toString()
      // this.Accommodation.accommodation_information_ismain=this.Accommodation.accommodation_information_ismain.toString()
      let form=JSON.stringify(this.Accommodation)
      console.log("提交信息：")
      console.log(form)
      request.post('/Stu/updateDormitoryInfo',form).then(res=>{
          this.$message({
            type:"success",
            message:"修改成功"
          })
          this.Edit[1]= true;
          this.isShow1[1]=true;
          this.isShow2[1]=false;
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"修改失败"
        })
      });
    },

    onSubmitExamination(){
      let user=JSON.parse(sessionStorage.getItem('user'))
      this.examination.college_entrance_examination_stu_no=user.stu_no.toString()
      let form=JSON.stringify(this.examination)
      console.log("提交信息：")
      console.log(form)
      request.post('/Stu/updateEntranceInfo',form).then(res=>{
        this.$message({
          type:"success",
          message:"修改成功"
        })
        this.Edit[2]= true;
        this.isShow1[2]=true;
        this.isShow2[2]=false;
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"修改失败"
        })
      });
    },

    onSubmitfamily(index){
      let user=JSON.parse(sessionStorage.getItem('user'))
      this.family[index].family_stu_no=user.stu_no.toString()
      let form=JSON.stringify(this.family[index])

      request.post('/Stu/updateFamilyInfo',form).then(res=>{
        this.$message({
          type:"success",
          message:"修改成功"
        })
        this.Edit[index+3]= true;
        this.isShow1[index+3]=true;
        this.isShow2[index+3]=false;
      }).catch(err=>{
        this.$message({
          type:"error",
          message:"修改失败"
        })
      });
    },

  }

}




</script>
