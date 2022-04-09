<template>
  <div style="margin: 5px 9% 0 9%">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>项目介绍</span>
        </div>
      </template>
      <div>
        <span>本系统的开发目的是方便辅导员及班主任对学生的信息进行管理、更好的了解所管理班级的动态，减轻频繁收集信息和处理信息的负担。</span>
        <br>
        <span>学生需在第一次使用时上传自己的各类信息，并在后续的工作学习中利用本系统进行完善，让老师能够及时获取到每名同学所取得的成果，作为后续各类评比的重要依据。</span>
        <br>
        <span>辅导员及班主任需及时审核学生提交的表单、上传教务处信息。方便学生查询成绩、绩点排名等情况。</span>

      </div>
    </el-card>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>为了更有效的开发，本项目使用技术如下</span>
        </div>
      </template>
      <div>
        <el-row>
          <el-card :body-style="{ padding: '0px' }" style="width: 30%;margin-right: 3%; margin-bottom: 5px">
            <img
                style="width: 100%;"
                src="../assets/springboot.png"
                class="image"
            />
            <div>
              <span style="display: block; text-align: center;">简化新Spring应用的初始搭建以及开发过程</span>
            </div>
          </el-card>

          <el-card :body-style="{ padding: '0px' }" style="width: 30%;margin-right: 3%; margin-bottom: 5px">
            <img
                style="width: 100%;"
                src="../assets/vuejs.png"
                class="image"
            />
            <div>
              <span style="display: block; text-align: center;">构建用户界面的渐进式JavaScript框架</span>
            </div>
          </el-card>

          <el-card :body-style="{ padding: '0px' }" style="width: 30%;margin-right: 3%; margin-bottom: 5px">
            <img
                style="width: 100%;"
                src="../assets/mysql.png"
                class="image"
            />
            <div>
              <span style="display: block; text-align: center;">最好的 RDBMS 应用软件之一</span>
            </div>
          </el-card>

          <el-card :body-style="{ padding: '0px' }" style="width: 30%;margin-right: 3%">
            <img
                style="width: 100%;"
                src="../assets/mybatis.png"
                class="image"
            />
            <div>
              <span style="display: block; text-align: center;">基于Java的持久层框架</span>
            </div>
          </el-card>

          <el-card :body-style="{ padding: '0px' }" style="width: 30%;margin-right: 3%">
            <img
                style="width: 100%;"
                src="../assets/redis.png"
                class="image"
            />
            <div>
              <span style="display: block; text-align: center;">高性能的 key-value 数据库</span>
            </div>
          </el-card>

          <el-card :body-style="{ padding: '0px' }" style="width: 30%;margin-right: 3%">
            <img
                style="width: 100%;"
                src="../assets/nginx.png"
                class="image"
            />
            <div>
              <span style="display: block; text-align: center;">高性能的HTTP和反向代理web服务器</span>
            </div>
          </el-card>
        </el-row>
      </div>
    </el-card>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>联系我们</span>
        </div>
      </template>
      <div>
        <span>为了更好的给学生和老师提供服务，我们真诚希望您在使用的过程中，能够将遇到的问题和建议反馈给我们。</span>
        <br>
        <span>联系方式：</span>
        <br>
        <span>昌瑶：18357980493（微信钉钉同号）</span>
        <br>
        <span>张强：18183019908（微信钉钉同号）</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "aboutUs"
}
</script>

<style scoped>

</style>