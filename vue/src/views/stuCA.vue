<template>
  <div style="position: absolute;width: 100%;height: 50px;padding-left: 150px">
    <el-button @click="download(1)">下载个人综测表</el-button>
    <el-button @click="download(2)">下载年级综测表</el-button>
  </div>
  <div style="margin-top: 50px; width: 100%;border-top: solid 1px #57d3ef">
    <el-tabs tab-position="left" >
      <el-tab-pane label="德育素质测评">
        <stu-a-c-de/>
      </el-tab-pane>
      <el-tab-pane label="智育素质测评">
        <stu-a-c-zhi/>
      </el-tab-pane>
      <el-tab-pane label="体育素质测评">
        <stu-a-c-ti/>
      </el-tab-pane>
      <el-tab-pane label="美育素质测评">
        <stu-a-c-mei/>
      </el-tab-pane>
      <el-tab-pane label="劳育素质测评">
        <stu-a-c-lao/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import fileApi from "@/components/Store";
import stuACZhi from "@/components/stuACZhi";
import stuACDe from "@/components/stuACDe";
import stuACTi from "@/components/stuACTi";
import stuACMei from "@/components/stuACMei";
import stuACLao from "@/components/stuACLao";
import request from "@/utils/request";

export default {
  name: "stuCA",
  components:{
    stuACZhi,
    stuACDe,
    stuACTi,
    stuACMei,
    stuACLao,
  },
  data(){
    return{
      user:{},
      Fapi:fileApi.fileApi,
    }
  },
  created() {
    this.setStore()
    this.user=JSON.parse(sessionStorage.getItem('user'))
  },
  methods:{
    setStore(){
      let user=JSON.parse(sessionStorage.getItem('user'))
      this.$store.commit('setCode', 0)
      this.$store.commit('setInfo', user)
    },
    download(val){
      if(val===1){
        request.post('/downloadZongcePaper',this.user).then(res=>{
          window.open(this.Fapi+"/Word/"+res.data)
        })
      }else{
        request.post('/downloadAllZongceS',this.user).then(res=>{
          window.open(this.Fapi+"/excel/"+res.data)
        })
      }
    },
  },
}
</script>

<style scoped>

</style>