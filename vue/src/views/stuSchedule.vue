<template>
  <div style="position: relative; margin:20px 0 0 9% ">
    <i style="background-color: blue;">
      <span style="opacity: 0">1</span>
    </i>
    <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
      课程表
    </p>
    <br>

    <div style="width: 5%;height: 90vh;display: inline-block; vertical-align: top">
      <div style="height: 7%"></div>
      <div style="height: 7%">1</div>
      <div style="height: 7%">2</div>
      <div style="height: 7%">3</div>
      <div style="height: 7%">4</div>
      <div style="height: 7%">5</div>
      <div style="height: 7%">6</div>
      <div style="height: 7%">7</div>
      <div style="height: 7%">8</div>
      <div style="height: 7%">9</div>
      <div style="height: 7%">10</div>
      <div style="height: 7%">11</div>
      <div style="height: 7%">12</div>
      <div style="height: 7%">13</div>
    </div>
    <div style="width: 95%; height: 90vh; display: inline-block; vertical-align: top">
      <div style="width: 14%; display: inline-block">周一</div>
      <div style="width: 14%; display: inline-block">周二</div>
      <div style="width: 14%; display: inline-block">周三</div>
      <div style="width: 14%; display: inline-block">周四</div>
      <div style="width: 14%; display: inline-block">周五</div>
      <div style="width: 14%; display: inline-block">周六</div>
      <div style="width: 14%; display: inline-block">周日</div>
    </div>
</div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "stuSchedule",
  data(){
    return{
      user:{},
      askForm:{
        stu_no:'',
        week:'4',
      },
    }
  },
  created() {
    this.user=JSON.parse(sessionStorage.getItem('user'));
    this.askForm.stu_no=this.user.stu_no+''
    this.askSchedule()
    let aDate=new Date()
    console.log(aDate)
  },
  methods:{
    askSchedule(){
      console.log(this.askForm)
      request.post("/findStudentCourseByStudent",this.askForm).then(res=>{
        console.log(res)
      })
    },
  },
}
</script>

<style scoped>

</style>