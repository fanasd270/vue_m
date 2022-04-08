<template>
<div style="position: relative; margin:20px 9% 0 9% ">
  <i style="background-color: blue;">
    <span style="opacity: 0">1</span>
  </i>
  <p style="font-weight: bolder; font-size: large ;display: inline;margin-bottom: 10px; cursor: default">
    年鉴
  </p>

  <el-drawer
      title="学生列表"
      v-model="drawer"
      direction="rtl"
  >
    <el-button v-if="buttonType===0" @click="downloadTemplateForGrant">导出</el-button>
    <el-button v-if="buttonType===1" @click="downloadTemplateForSchoolars">导出</el-button>
    <el-button v-if="buttonType===2" @click="downloadTemplateForSchoolarsB">导出</el-button>
    <span>已选:{{multipleSelection.length}}/{{tableData.length}}</span>
    <el-table ref="tableRef" @selection-change="handleSelectionChange" row-key="stu_no" :data="tableData" style="width: 100%" max-height="600">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
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
          width="100"
          :filters="this.filterClass"
          :filter-method="filterClassHandler"
      />

    </el-table>
  </el-drawer>
  <div style="font-weight: 550; opacity: 0.9; margin-top: 20px">
    <el-col :span="16" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default;" @click="downloadAllStu" >
        <div class="ecard">
          <svg t="1647956157497" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5465" width="30" height="30"><path d="M803.3 574.4c-12.9 0-23.3-10.4-23.3-23.3v-343c0-29.9-24.4-54.3-54.3-54.3H229.3c-29.9 0-54.3 24.4-54.3 54.3v79.5c0 12.8-10.4 23.3-23.3 23.3s-23.3-10.4-23.3-23.3v-79.5c0-55.6 45.2-100.8 100.8-100.8h496.5c55.6 0 100.8 45.2 100.8 100.8v343.1c0.1 12.8-10.3 23.2-23.2 23.2zM640.4 867.5H229.3c-55.6 0-100.8-45.2-100.8-100.8V702c0-12.8 10.4-23.3 23.3-23.3s23.3 10.4 23.3 23.3v64.6c0 29.9 24.4 54.3 54.3 54.3h411.1c12.9 0 23.3 10.4 23.3 23.3s-10.6 23.3-23.4 23.3z" fill="#353637" p-id="5466"></path><path d="M475.9 506.5c-64 0-116-52-116-116s52.1-116 116-116 116 52.1 116 116-52 116-116 116z m0-185.5c-38.3 0-69.5 31.2-69.5 69.5s31.2 69.5 69.5 69.5 69.5-31.2 69.5-69.5-31.2-69.5-69.5-69.5zM207.3 391.5H90.9c-12.9 0-23.3-10.4-23.3-23.3 0-12.8 10.4-23.3 23.3-23.3h116.4c12.9 0 23.3 10.4 23.3 23.3s-10.5 23.3-23.3 23.3zM207.3 647.5H90.9c-12.9 0-23.3-10.4-23.3-23.3 0-12.8 10.4-23.3 23.3-23.3h116.4c12.9 0 23.3 10.4 23.3 23.3s-10.5 23.3-23.3 23.3zM761.1 913.1c-106.9 0-193.9-87-193.9-193.9s87-193.9 193.9-193.9S955 612.2 955 719.1s-87 194-193.9 194z m0-341.4c-81.3 0-147.4 66.1-147.4 147.4s66.1 147.4 147.4 147.4 147.4-66.1 147.4-147.4-66.1-147.4-147.4-147.4z" fill="#353637" p-id="5467"></path><path d="M613.7 699h-332l-2.1-21c-0.6-6.5-1-13.1-1-19.7 0-108.7 88.5-197.2 197.2-197.2 82.4 0 156.7 52.1 185.1 129.6l5.1 13.8-10.3 10.5c-18.1 18.4-31 41.4-37.5 66.5l-4.5 17.5z m-288.4-46.5h253.2c7.7-21.3 19-41.1 33.4-58.4-24.7-52.2-77.8-86.4-136.1-86.4-81 0-147.4 64.4-150.5 144.8zM774 651l7.9 24.4c2.9 9 11.3 15.1 20.7 15.1h25.6c13.2 0 18.6 16.8 8 24.6l-20.7 15.1c-7.6 5.6-10.8 15.4-7.9 24.4l7.9 24.4c4.1 12.5-10.3 22.9-20.9 15.2l-20.7-15.1c-7.6-5.6-18-5.6-25.6 0L727.5 794c-10.6 7.7-25-2.7-20.9-15.2l7.9-24.4c2.9-9-0.3-18.8-7.9-24.4l-20.7-15c-10.6-7.7-5.2-24.6 8-24.6h25.6c9.4 0 17.8-6.1 20.7-15.1l7.9-24.4c4.1-12.4 21.8-12.4 25.9 0.1zM151.7 568c-12.9 0-23.3-10.4-23.3-23.3v-98.3c0-12.8 10.4-23.3 23.3-23.3s23.3 10.4 23.3 23.3v98.3c0 12.9-10.5 23.3-23.3 23.3z" fill="#353637" p-id="5468">

          </path></svg>
          <span style="position: absolute; top: 35%">本科生名单--辅导员</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px; margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="downloadClassStu">
        <div class="ecard">
          <svg t="1647956054387" class="icon" viewBox="0 0 1181 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5167" width="30" height="30"><path d="M666.151 1017.698a29.302 29.302 0 0 1-29.302-28.908c0-1.024 0-2.363 0.158-3.623l21.74-176.995L534.37 678.203a28.75 28.75 0 0 1-8.034-19.85v-0.394a29.617 29.617 0 0 1 23.867-28.041l178.255-34.186 87.591-156.83a29.854 29.854 0 0 1 51.2 0.236l88.143 156.2 174.868 34.028h0.078l0.552 0.079c11.185 1.575 20.401 9.058 24.103 19.771l0.63 1.654 0.08 0.394a28.514 28.514 0 0 1-7.09 26.624l-122.486 129.497 23.08 176.837a35.289 35.289 0 0 1-1.025 13.39l-0.157 0.473-0.237 0.473a32.69 32.69 0 0 1-10.082 12.524 29.46 29.46 0 0 1-30.09 3.15L843.225 938.93l-163.92 75.619a27.412 27.412 0 0 1-13.154 3.15z m79.557-121.304c2.363 0 4.884-0.473 6.932-1.654l86.961-40.173 87.277 40.015a15.596 15.596 0 0 0 15.99-1.654 17.33 17.33 0 0 0 5.277-6.617l0.158-0.315v-0.236a18.747 18.747 0 0 0 0.787-5.12l-0.157-1.97-12.288-93.813 64.985-68.687a15.124 15.124 0 0 0 4.174-10.476c0-0.946 0-2.285-0.394-3.703v-0.157l-0.393-0.945a15.675 15.675 0 0 0-12.761-10.477h-0.315l-92.79-18.117-46.79-82.786a15.833 15.833 0 0 0-27.175-0.158l-46.473 83.26-94.523 18.116a15.754 15.754 0 0 0-12.682 14.888v0.157c0 4.018 1.575 7.72 4.253 10.555l66.009 68.923-11.58 93.972v1.89c0 4.884 2.364 9.453 6.302 12.367a15.518 15.518 0 0 0 9.216 2.915z" p-id="5168"></path><path d="M517.199 555.008c-149.977 0-271.518-113.9-272.07-254.503C245.13 159.27 367.223 45.37 517.2 45.37c150.055 0 271.517 113.9 271.517 255.134 0 140.603-121.462 254.503-271.517 254.503z m-0.788-73.65a181.248 181.248 0 0 0 181.72-180.932A181.248 181.248 0 0 0 516.963 119.02a180.697 180.697 0 0 0-181.169 181.406A180.46 180.46 0 0 0 516.49 481.359z" p-id="5169"></path><path d="M521.689 498.373c16.777 0 30.247 12.603 30.247 28.357s39.463 24.418 22.686 24.418c-216.616 0-423.7 168.645-423.7 371.791l-21.662 56.714c0 15.754-13.39 28.357-30.247 28.357-16.778 0-30.247-12.603-30.247-28.357v-56.714c-0.552-234.575 202.673-424.566 452.923-424.566z" p-id="5170"></path><path d="M113.585 930.5h376.36q39.384 0 39.384 39.386 0 39.384-39.384 39.384h-376.36q-39.384 0-39.384-39.384 0-39.385 39.384-39.385z" p-id="5171">

          </path></svg>
          <span style="position: absolute; top: 35%">本科生名单--班主任</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px; margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="chooseStu(0)">
        <div class="ecard">
          <svg t="1647955940931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4733" width="30" height="30"><path d="M473.9 108.1c-4.9-2.4-13-2.4-17.9 0L106.2 280.9c-4.9 2.4-9 8.9-9 14.4v234c0 5.5 4.5 10 10 10l715.8 2.2c5.5 0 10-4.5 10-10l-0.2-236.3c0-5.5-4-12-9-14.4L473.9 108.1z" fill="#78909C" p-id="4734"></path><path d="M709.1 434.9H332.5c-5.5 0-10-4.5-10-10V106.6c0-5.5 4.5-10 10-10h376.6c5.5 0 10 4.5 10 10v318.3c0 5.5-4.5 10-10 10z" fill="#FF5722" p-id="4735"></path><path d="M624.1 491.4H247.5c-5.5 0-10-4.5-10-10V163.1c0-5.5 4.5-10 10-10h376.6c5.5 0 10 4.5 10 10v318.3c0 5.5-4.5 10-10 10z" fill="#FFCCBC" p-id="4736"></path><path d="M107.2 761.5c-5.5 0-10-4.5-10-10V294.4c0-5.5 4.1-8.1 9.1-5.8l349.1 160.1c5 2.3 13.2 2.3 18.2 0l350-160.1c5-2.3 9.1 0.3 9.1 5.8l0.3 457.1c0 5.5-4.5 10-10 10H107.2z" fill="#CFD8DC" p-id="4737"></path><path d="M293.5 229h283.9v57H293.5z" fill="#FF5722" p-id="4738"></path><path d="M522.8 490.9c-24.3 0-45.7 12.1-57.8 31.2-12.1-19.1-33.5-31.2-57.8-31.2-38.2 0-69.4 31.2-69.4 69.4 0 68.8 127.2 138.8 127.2 138.8s127.2-69.4 127.2-138.8c0-38.2-31.2-69.4-69.4-69.4z" fill="#F44336" p-id="4739"></path><path d="M492.2 608.6h-20.5V595h20.5c3.8 0 6.8-3 6.8-6.8s-3-6.8-6.8-6.8h-14l13.3-24.4c1.7-3.1 0.7-7-2.2-8.9-2.9-1.8-6.6-0.7-8.3 2.4l-15.2 28.1c-0.5 0.9-0.7 1.9-0.8 2.9h-0.1c-0.1-1-0.3-2-0.8-2.9l-15-28c-1.7-3.1-5.4-4.1-8.2-2.4-2.9 1.8-3.9 5.8-2.2 8.9l13.1 24.4h-14c-3.8 0-6.8 3-6.8 6.8s3 6.8 6.8 6.8h20.5v13.6h-20.5c-3.8 0-6.8 3-6.8 6.8s3 6.8 6.8 6.8h20.5v14.3c0 3.4 3 6.1 6.8 6.1s6.8-2.7 6.8-6.1v-14.3h20.5c3.8 0 6.8-3 6.8-6.8-0.1-3.8-3.2-6.9-7-6.9z" fill="#FFCCBC" p-id="4740"></path><path d="M546.8 737.7c0 104.9 84.9 189.9 189.8 190s189.9-84.9 190-189.8v-0.1c0-104.9-84.9-189.9-189.8-190s-189.9 84.9-190 189.9c0-0.1 0-0.1 0 0z" fill="#F44336" p-id="4741"></path><path d="M637.8 839.1V638.9h193.7v199.9h-30.4v-7.5H668.3v7.7h-30.5z m163.3-174H668.3v140.1h132.8V665.1z m-11.9 77.1h-15.9c5.9 5.1 11.8 10.6 17.8 16.4l-11.3 10.2h14.5v24.9H674v-24.9h43.4v-26.6h-37.9v-24.9h37.9v-15.1h-41.3v-24.9h116v24.9H746v15.1h43.2v24.9z m-37.3 10.6l12.3-10.6H746v26.6h20.9c-5.7-6.4-10.6-11.7-15-16z" fill="#FFFFFF" p-id="4742">

          </path></svg>
          <span style="position: absolute; top: 35%">助学金模板</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="chooseStu(1)">
        <div class="ecard">
          <svg t="1647956009214" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4980" width="30" height="30"><path d="M520.8 149c-4.9-2.4-13-2.4-17.9 0L105.3 345.4c-4.9 2.4-9 8.9-9 14.4v267c0 5.5 4.5 10 10 10l811.3 2.5c5.5 0 10-4.5 10-10l-0.3-269.6c0-5.5-4-12-9-14.4L520.8 149z" fill="#78909C" p-id="4981"></path><path d="M789 518.6H360.9c-5.5 0-10-4.5-10-10V146.4c0-5.5 4.5-10 10-10H789c5.5 0 10 4.5 10 10v362.2c0 5.5-4.5 10-10 10z" fill="#FF5722" p-id="4982"></path><path d="M693 582.3H264.9c-5.5 0-10-4.5-10-10V210.2c0-5.5 4.5-10 10-10H693c5.5 0 10 4.5 10 10v362.2c0 5.4-4.5 9.9-10 9.9z" fill="#FFCCBC" p-id="4983"></path><path d="M106.4 887.6c-5.5 0-10-4.5-10-10v-519c0-5.5 4.1-8.1 9.1-5.8l396.8 182c5 2.3 13.2 2.3 18.2 0l397.9-182c5-2.3 9.1 0.3 9.1 5.8l0.3 519.1c0 5.5-4.5 10-10 10l-811.4-0.1z" fill="#CFD8DC" p-id="4984"></path><path d="M575.3 720.1h-48.5v-32.3h48.5c8.9 0 16.1-7.2 16.1-16.1s-7.2-16.1-16.1-16.1h-33.1l31.4-57.9c4.1-7.3 1.6-16.7-5.3-21-6.9-4.2-15.7-1.7-19.7 5.6l-36 66.6c-1.1 2.2-1.7 4.5-1.9 6.8h-0.2c-0.2-2.3-0.7-4.6-1.9-6.8L473 582.3c-4-7.3-12.7-9.8-19.5-5.6s-9.2 13.7-5.2 21l31 57.9h-33.1c-8.9 0-16.1 7.2-16.1 16.1 0 8.9 7.2 16.1 16.1 16.1h48.5v32.3h-48.5c-8.9 0-16.1 7.2-16.1 16.1 0 8.9 7.2 16.1 16.1 16.1h48.5v33.9c0 8.1 7.2 14.6 16.1 14.6s16.1-6.5 16.1-14.6v-33.9h48.5c8.9 0 16.1-7.2 16.1-16.1 0.1-8.9-7.3-16.1-16.2-16.1zM318.2 285.9H639v64.5H318.2z" fill="#FF5722" p-id="4985">

          </path></svg>
          <span style="position: absolute; top: 35%">奖学金模板</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="chooseStu(2)">
        <div class="ecard">
          <svg t="1647956009214" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4980" width="30" height="30"><path d="M520.8 149c-4.9-2.4-13-2.4-17.9 0L105.3 345.4c-4.9 2.4-9 8.9-9 14.4v267c0 5.5 4.5 10 10 10l811.3 2.5c5.5 0 10-4.5 10-10l-0.3-269.6c0-5.5-4-12-9-14.4L520.8 149z" fill="#78909C" p-id="4981"></path><path d="M789 518.6H360.9c-5.5 0-10-4.5-10-10V146.4c0-5.5 4.5-10 10-10H789c5.5 0 10 4.5 10 10v362.2c0 5.5-4.5 10-10 10z" fill="#FF5722" p-id="4982"></path><path d="M693 582.3H264.9c-5.5 0-10-4.5-10-10V210.2c0-5.5 4.5-10 10-10H693c5.5 0 10 4.5 10 10v362.2c0 5.4-4.5 9.9-10 9.9z" fill="#FFCCBC" p-id="4983"></path><path d="M106.4 887.6c-5.5 0-10-4.5-10-10v-519c0-5.5 4.1-8.1 9.1-5.8l396.8 182c5 2.3 13.2 2.3 18.2 0l397.9-182c5-2.3 9.1 0.3 9.1 5.8l0.3 519.1c0 5.5-4.5 10-10 10l-811.4-0.1z" fill="#CFD8DC" p-id="4984"></path><path d="M575.3 720.1h-48.5v-32.3h48.5c8.9 0 16.1-7.2 16.1-16.1s-7.2-16.1-16.1-16.1h-33.1l31.4-57.9c4.1-7.3 1.6-16.7-5.3-21-6.9-4.2-15.7-1.7-19.7 5.6l-36 66.6c-1.1 2.2-1.7 4.5-1.9 6.8h-0.2c-0.2-2.3-0.7-4.6-1.9-6.8L473 582.3c-4-7.3-12.7-9.8-19.5-5.6s-9.2 13.7-5.2 21l31 57.9h-33.1c-8.9 0-16.1 7.2-16.1 16.1 0 8.9 7.2 16.1 16.1 16.1h48.5v32.3h-48.5c-8.9 0-16.1 7.2-16.1 16.1 0 8.9 7.2 16.1 16.1 16.1h48.5v33.9c0 8.1 7.2 14.6 16.1 14.6s16.1-6.5 16.1-14.6v-33.9h48.5c8.9 0 16.1-7.2 16.1-16.1 0.1-8.9-7.3-16.1-16.2-16.1zM318.2 285.9H639v64.5H318.2z" fill="#FF5722" p-id="4985">

          </path></svg>
          <span style="position: absolute; top: 35%">励志奖学金模板</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="downloadDormitory">
        <div class="ecard">
          <svg t="1647953069456" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3611" width="30" height="30"><path d="M869.034667 860.330667a20.821333 20.821333 0 0 0 20.650666-20.650667V144.554667a20.821333 20.821333 0 0 0-20.650666-20.650667h-336.213334A20.992 20.992 0 0 0 512 144.554667V839.68a20.992 20.992 0 0 0 20.821333 20.650667z m-119.466667-619.52a8.021333 8.021333 0 0 1 7.509333-7.509334h69.973334c5.632-1.877333 7.509333 1.877333 7.509333 7.509334v60.416a8.192 8.192 0 0 1-7.509333 7.68h-69.973334a8.021333 8.021333 0 0 1-7.509333-7.68z m0 171.861333a8.021333 8.021333 0 0 1 7.509333-7.509333h69.973334a8.021333 8.021333 0 0 1 7.509333 7.509333v60.416a8.192 8.192 0 0 1-7.509333 7.68h-69.973334a8.021333 8.021333 0 0 1-7.509333-7.68z m-105.813333-181.248a8.021333 8.021333 0 0 1 7.509333 7.509333v60.416a8.021333 8.021333 0 0 1-7.509333 7.68h-69.973334a8.192 8.192 0 0 1-7.509333-7.68v-58.538666a8.021333 8.021333 0 0 1 7.509333-7.509334h69.973334z m-483.498667 119.466667a25.770667 25.770667 0 0 0-26.453333 26.453333 26.965333 26.965333 0 0 0 26.453333 26.453333h270.506667a25.770667 25.770667 0 0 0 26.453333-26.453333 26.965333 26.965333 0 0 0-26.453333-26.453333z m60.416 375.466666a28.842667 28.842667 0 0 1 28.330667-28.16h82.944a28.842667 28.842667 0 0 1 28.330666 28.16v134.144h56.661334A41.984 41.984 0 0 0 459.093333 819.2V469.333333a20.821333 20.821333 0 0 0-20.821333-20.650666H157.013333A20.821333 20.821333 0 0 0 136.533333 469.333333V819.2a41.984 41.984 0 0 0 41.642667 41.642667h45.226667v-134.656z" fill="#2499F6" p-id="3612">

          </path></svg>
          <span style="position: absolute; top: 35%">寝室信息</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="downloadHuXiInfo">
        <div class="ecard">
          <svg t="1647953069456" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3611" width="30" height="30"><path d="M869.034667 860.330667a20.821333 20.821333 0 0 0 20.650666-20.650667V144.554667a20.821333 20.821333 0 0 0-20.650666-20.650667h-336.213334A20.992 20.992 0 0 0 512 144.554667V839.68a20.992 20.992 0 0 0 20.821333 20.650667z m-119.466667-619.52a8.021333 8.021333 0 0 1 7.509333-7.509334h69.973334c5.632-1.877333 7.509333 1.877333 7.509333 7.509334v60.416a8.192 8.192 0 0 1-7.509333 7.68h-69.973334a8.021333 8.021333 0 0 1-7.509333-7.68z m0 171.861333a8.021333 8.021333 0 0 1 7.509333-7.509333h69.973334a8.021333 8.021333 0 0 1 7.509333 7.509333v60.416a8.192 8.192 0 0 1-7.509333 7.68h-69.973334a8.021333 8.021333 0 0 1-7.509333-7.68z m-105.813333-181.248a8.021333 8.021333 0 0 1 7.509333 7.509333v60.416a8.021333 8.021333 0 0 1-7.509333 7.68h-69.973334a8.192 8.192 0 0 1-7.509333-7.68v-58.538666a8.021333 8.021333 0 0 1 7.509333-7.509334h69.973334z m-483.498667 119.466667a25.770667 25.770667 0 0 0-26.453333 26.453333 26.965333 26.965333 0 0 0 26.453333 26.453333h270.506667a25.770667 25.770667 0 0 0 26.453333-26.453333 26.965333 26.965333 0 0 0-26.453333-26.453333z m60.416 375.466666a28.842667 28.842667 0 0 1 28.330667-28.16h82.944a28.842667 28.842667 0 0 1 28.330666 28.16v134.144h56.661334A41.984 41.984 0 0 0 459.093333 819.2V469.333333a20.821333 20.821333 0 0 0-20.821333-20.650666H157.013333A20.821333 20.821333 0 0 0 136.533333 469.333333V819.2a41.984 41.984 0 0 0 41.642667 41.642667h45.226667v-134.656z" fill="#2499F6" p-id="3612">

          </path></svg>
          <span style="position: absolute; top: 35%">虎溪管委会信息</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="downloadPaperPatentInfo(1)">
        <div class="ecard">
          <svg t="1648645441649" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2146" width="30" height="30"><path d="M330 222h170c16.3 0 29.5 13.2 29.5 29.5S516.3 281 500 281h-170c-16.3 0-29.5-13.2-29.5-29.5s13.2-29.5 29.5-29.5z" fill="" p-id="2147"></path><path d="M446 254v119c0 16.3-13.2 29.5-29.5 29.5s-29.5-13.2-29.5-29.5V254c0-16.3 13.2-29.5 29.5-29.5s29.5 13.2 29.5 29.5zM323.5 502h387c12.7 0 23 10.3 23 23s-10.3 23-23 23H323.5c-12.7 0-23-10.3-23-23s10.3-23 23-23zM526.5 380h183c12.7 0 23 10.3 23 23s-10.3 23-23 23H526.5c-12.7 0-23-10.3-23-23s10.3-23 23-23zM323.5 631h387c12.7 0 23 10.3 23 23s-10.3 23-23 23H323.5c-12.7 0-23-10.3-23-23s10.3-23 23-23zM323.5 759h276c12.7 0 23 10.3 23 23s-10.3 23-23 23H323.5c-12.7 0-23-10.3-23-23s10.3-23 23-23zM848.5 301.6H648.5c-28.7 0-52-23.3-52-52V68h46v181.6c0 3.3 2.7 6 6 6h200v46z" fill="" p-id="2148"></path><path d="M811.5 952H222.5c-29.2 0-53-23.8-53-53V105c0-29.2 23.8-53 53-53h41c12.7 0 23 10.3 23 23s-10.3 23-23 23h-41c-3.9 0-7 3.1-7 7v794c0 3.9 3.1 7 7 7h589c3.9 0 7-3.1 7-7V274.5L616.8 98H433.5c-12.7 0-23-10.3-23-23s10.3-23 23-23h192c5.6 0 11 2 15.1 5.7l216 189c5 4.4 7.9 10.7 7.9 17.3v635c0 29.2-23.8 53-53 53zM372.4 98h-39c-12.7 0-23-10.3-23-23s10.3-23 23-23h39c12.7 0 23 10.3 23 23s-10.3 23-23 23z" fill="" p-id="2149"></path></svg>
          <span style="position: absolute; top: 35%">论文统计</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="downloadPaperPatentInfo(2)">
        <div class="ecard">
          <svg t="1648645534466" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3956" width="30" height="30"><path d="M391.605 898.713l44.608-747.552 37.532 2.24-44.608 747.552zM882.6 276.6c-39-77.8-138-113.5-255.2-103.7 1.2 6.4 1.8 13 1.8 19.6 74 11.3 132.7 45.4 160.6 101 55.5 110.5-29.6 267.1-191.7 368.3L536.2 122l-37.4 4.3 88.9 775.6 37.4-4.3-23.6-206c12.7-5.3 25.4-10.9 38.1-17.3 195.2-97.9 304.1-276 243-397.7zM236 407.7l10.1-11.7-15.5-1-8-13.2-5.6 14.4-15.1 3.6 12 9.8-1.3 15.4 13-8.3 14.3 6zM343.7 277.9l-6.9 17.5-18.2 4.3 14.5 11.9-1.6 18.7 15.8-10.1 17.3 7.3-4.7-18.2 12.2-14.2-18.7-1.1zM310.2 452.8l-13.6 34.7-36.3 8.5 28.8 23.7-3.1 37.2 31.4-20.2 34.4 14.5-9.5-36.1 24.4-28.2-37.2-2.2zM179.8 583.3l-15.5-25.5-10.8 27.8-29.1 6.8 23.1 18.9-2.5 29.8 25.1-16.1 27.5 11.5-7.5-28.8 19.5-22.6zM315.5 706.1l-22.2-36.6-15.6 39.9-41.6 9.7 33.1 27.2-3.6 42.6 36-23.1 39.5 16.6-10.9-41.4 28-32.4z" fill="#999999" p-id="3957"></path></svg>
          <span style="position: absolute; top: 35%">专利统计</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="downloadPaperPatentInfo(3)">
        <div class="ecard">
          <svg t="1648645465809" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2401" width="30" height="30"><path d="M681.4 786H149.8s-53.2-1.1-53.2-86.2h637.9c0.1 85.1-53.1 86.2-53.1 86.2z" fill="#42A5F5" p-id="2402"></path><path d="M132.1 97.3h567v602.5h-567V97.3z" fill="#90CAF9" p-id="2403"></path><path d="M601.2 230H230v52.1h371.2V230z m0 104.8H230v53.5h371.2v-53.5zM494.8 442.3H230v52.2h264.8v-52.2z m0.1 105.2H230v53.4h264.9v-53.4z" fill="#FFFFFF" p-id="2404"></path><path d="M927.1 606c0-5.1-3.9-9.2-8.8-9.2H867v-1c0.1-3.2 0.1-6.4 0.1-9.5 0-9.8-0.4-20.1-1.2-31.5-0.4-4.8-4.2-8.5-8.7-8.5H581.5c-4.6 0-8.4 3.8-8.7 8.5-0.8 9.9-1.2 21.5-1.2 33.2 0 0.9 0 3.4 0.1 6l0.1 2.8h-50.4c-4.8 0-8.8 4.1-8.8 9.3-3.2 67.5 24.4 141.6 93.4 155.1 0.5 0.1 1 0.2 1.6 0.2 0.9 0 1.9-0.2 2.7-0.5l0.6-0.2 0.4 0.7c10.8 19.9 23.3 36.6 37.2 49.5 17.5 16.3 36.4 26.1 56.5 29.3l5.5 1v67.1H642c-4.8 0-8.8 4.1-8.8 9.2 0 4.9 3.7 8.9 8.3 9.2h155.1c4.8 0 8.8-4.1 8.8-9.2s-3.9-9.2-8.8-9.2h-68.5v-59.7-7.5l5.6-1c20.1-3.2 39.1-13.1 56.5-29.3 14-13 26.6-29.8 37.4-49.9l0.4-0.8 0.8 0.3c1 0.5 2.1 0.8 3.3 0.8 0.6 0 1.1-0.1 1.7-0.2 68.9-13.4 96.5-87.5 93.3-155zM599.7 740.9c-34.3-9.7-70.6-52.8-69.5-124.7v-1h42.3l0.1 0.9c3.3 45.5 12.8 87 28.2 123.4l0.8 1.9-1.9-0.5z m309.6-124.7c1.2 72.7-35.7 115.7-70.4 124.9l-2 0.5 0.8-1.9c10.3-24.1 18-50.7 22.9-78.9l0.9-5.4c1.7-10.4 3-21.2 3.9-32l0.3-3.8 0.3-4.4h43.2l0.1 1z" fill="#FFCC80" p-id="2405"></path><path d="M719.8 616.5l19.4 39.3 43.3 6.3-31.3 30.6 7.4 43.1-38.8-20.4-38.8 20.4 7.4-43.1-31.4-30.6 43.4-6.3z" fill="#F44336" p-id="2406"></path></svg>
          <span style="position: absolute; top: 35%">竞赛统计</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="downloadPaperPatentInfo(4)">
        <div class="ecard">
          <svg t="1648645502520" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3285" width="30" height="30"><path d="M348.494367 94.040816H219.428571A73.142857 73.142857 0 0 0 146.285714 167.183673v208.979592A31.346939 31.346939 0 0 0 177.632653 407.510204h668.734694a31.346939 31.346939 0 0 0 31.346939-31.346939v-93.246694a73.142857 73.142857 0 0 0-73.142857-73.142857H487.068735a10.44898 10.44898 0 0 1-7.878531-3.594449l-75.441633-86.93551A73.142857 73.142857 0 0 0 348.473469 94.040816zM219.428571 156.734694h129.065796a10.44898 10.44898 0 0 1 7.878531 3.594449l75.441633 86.93551a73.142857 73.142857 0 0 0 55.254204 25.202939H804.571429l1.880816 0.188081a10.44898 10.44898 0 0 1 8.568163 10.260898V344.816327h-606.040816V167.183673a10.44898 10.44898 0 0 1 10.448979-10.448979z" fill="#666666" p-id="3286"></path><path d="M950.857143 344.816327H73.142857a31.346939 31.346939 0 0 0-31.096163 35.359346l60.186122 465.125878A73.142857 73.142857 0 0 0 174.769633 909.061224h674.460734a73.142857 73.142857 0 0 0 72.515919-63.738775l60.186122-465.146776A31.346939 31.346939 0 0 0 950.857143 344.816327z m-842.062367 62.693877h806.389551l-55.588572 429.745633a10.44898 10.44898 0 0 1-10.365388 9.11151H174.769633l-1.713633-0.146286a10.44898 10.44898 0 0 1-8.651755-8.965224L108.794776 407.510204z" fill="#666666" p-id="3287"></path><path d="M637.387755 480.653061a31.346939 31.346939 0 0 1 3.009306 62.547592L637.387755 543.346939H386.612245a31.346939 31.346939 0 0 1-3.009306-62.547592L386.612245 480.653061h250.77551z" fill="#666666" p-id="3288"></path></svg>
          <span style="position: absolute; top: 35%">项目统计</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" style="width: 220px;margin: 0 20px 20px 0; position: relative">
      <el-card :body-style="{padding:'28px'}" style="color: dimgray; cursor: default" @click="downloadStay">
        <div class="ecard">
          <svg t="1648821677367" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1869" width="30" height="30"><path d="M847.556923 0C923.175385 0 984.615385 61.124923 984.615385 136.388923v619.559385c0 75.224615-61.44 136.388923-137.058462 136.388923H512v94.050461c0 23.512615-18.904615 37.612308-37.809231 37.612308-9.452308 0-14.178462-4.726154-23.630769-9.412923l-137.058462-126.976H176.443077c-75.618462 0-137.058462-61.124923-137.058462-136.349539V136.388923C39.384615 61.164308 100.824615 0 176.443077 0z m-284.553846 236.307692h-100.824615a5.868308 5.868308 0 0 0-2.756924 0.669539c-0.118154 0.039385-1.339077 0.630154-3.150769 1.654154-6.104615 3.229538-17.526154 9.846154-22.291692 16.738461l-0.866462 1.102769c-3.544615 2.756923-18.510769 8.743385-29.577846 13.154462-30.562462 12.288-52.775385 21.779692-59.785846 31.862154a57.501538 57.501538 0 0 0-2.796308 4.450461l-0.196923 0.315077c-15.832615 26.545231-62.306462 121.462154-64.472615 125.755077a5.907692 5.907692 0 0 0 2.717538 7.916308l90.112 45.410461v130.481231a5.907692 5.907692 0 0 0 5.356308 5.907692c0.787692 0 77.154462 8.428308 135.561846 8.428308h4.056616c58.368 0 134.813538-8.349538 135.561846-8.467692a5.907692 5.907692 0 0 0 5.356307-5.907692v-130.441847l89.993847-45.410461a5.907692 5.907692 0 0 0 2.717538-7.876923c-2.126769-4.371692-48.64-99.249231-64.433231-125.794462l-0.157538-0.315077a101.533538 101.533538 0 0 0-2.835692-4.450461c-7.010462-10.082462-29.184-19.534769-59.746462-31.862154-11.421538-4.568615-27.017846-10.830769-29.892923-13.430154-5.316923-8.940308-22.646154-17.644308-26.112-19.337846l-0.551385-0.236308-0.590769-0.196923-0.393846-0.118154z m168.172308 189.203693l3.150769 6.498461-79.202462 39.896616c-0.078769-2.756923-0.078769-6.144-0.078769-10.082462l76.091077-36.312615z m-438.272-0.039385l76.091077 36.312615-0.039385 10.043077-79.241846-39.85723 3.190154-6.498462z m385.299692-103.936c12.603077 22.921846 34.422154 66.599385 47.616 93.262769l-70.774154 33.752616c0.275692-28.750769 1.693538-70.301538 7.561846-88.457847 5.474462-16.935385 11.539692-30.286769 15.596308-38.557538z m-332.406154 0c4.056615 8.231385 10.121846 21.622154 15.596308 38.596923 5.789538 18.116923 7.246769 59.628308 7.561846 88.418462l-70.774154-33.752616c13.193846-26.663385 35.052308-70.340923 47.616-93.262769z m166.675692 23.709538c7.483077 0 13.627077 6.065231 13.627077 13.508924a13.587692 13.587692 0 0 1-27.214769 0c0-7.483077 6.104615-13.508923 13.587692-13.508924z m-52.932923-94.916923c8.664615 16.384 34.540308 65.142154 43.835077 82.471385a352.098462 352.098462 0 0 1-26.387692 8.546462 1064.96 1064.96 0 0 1-18.156308-34.343385c-16.502154-32.846769-17.329231-40.093538-17.329231-41.117539a5.907692 5.907692 0 0 1 0.59077-1.496615l0.866461-0.984615 0.669539-1.024 0.196923-0.315077c3.229538-3.623385 9.373538-8.073846 15.714461-11.697231z m104.802462 0c6.656 3.899077 13.075692 8.585846 16.187077 12.288a11.185231 11.185231 0 0 0 1.102769 1.417847 5.513846 5.513846 0 0 1 0.787692 1.851076c0 1.024-0.787692 8.270769-17.32923 41.117539-7.286154 14.572308-14.769231 28.475077-18.116924 34.343385a342.921846 342.921846 0 0 1-26.466461-8.546462l43.835077-82.432z m-12.406154-2.126769c-12.957538 24.418462-31.113846 58.683077-40.014769 75.303385l-39.975385-75.303385h79.950769z" fill="#F3C65C" p-id="1870"></path></svg>
          <span style="position: absolute; top: 35%">留校统计</span>
        </div>
      </el-card>
    </el-col>
    <div style="clear: both"></div>
  </div>
</div>
  <el-dialog
      v-model="dialogVisible"
      title="选择年份"
      width="30%"
  >
    <el-date-picker style="margin-left: 20%" v-model="downLoadTea.year" type="year" placeholder="选择年份" value-format="YYYY"></el-date-picker>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmDownloadPaperPaten">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
      v-model="dialogVisible2"
      title="选择时间"
      width="30%"
  >
    <el-date-picker v-model="year" type="year" placeholder="选择学年" value-format="YYYY" style="width: 10em">
    </el-date-picker>
    <el-select v-model="year2" style="width: 6em;" placeholder=" ">
      <el-option
          v-for="item in yearTime"
          :key="item.name"
          :label="item.name"
          :value="item.name">
      </el-option>
    </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmDownloadStay">确定</el-button>
        <el-button @click="dialogVisible2 = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import request from "@/utils/request";
import fileApi from "@/components/Store";

export default {
  name: "gCAlmanac",
  data(){
    return{
      Fapi:'',
      dialogVisible:false,
      dialogVisible2:false,
      paperPaten:0,
      downLoadTea:{
        teacher:{},
        year:"",
      },
      drawer: false,
      user:{},
      power:{},
      tableData:[],
      multipleSelection: [],
      filterClass:[],
      buttonType:0,
      teaAndStu:{
        teacherId:0,
        stuList:[],
      },
      //留校
      year:'',
      year2:'',
      yearTime:[
        {name:'暑假'},
        {name:'寒假'},
      ],
      stayUploadForm:{
        teacher:{},
        year:''
      },
    }
  },
  created() {
    this.power=JSON.parse(sessionStorage.getItem('power'))
    if(this.power.type===1){
      this.user=JSON.parse(sessionStorage.getItem('user_t'))
    }else{
      this.user=JSON.parse(sessionStorage.getItem('user'))
    }
    this.teaAndStu.teacherId=this.user.t_no
    this.downLoadTea.teacher=this.user
    this.Fapi=fileApi.fileApi
  },
  methods:{
    confirmDownloadPaperPaten(){
      let requestUrl=""
      switch (this.paperPaten) {
        case 1:
          requestUrl="/downLoadPaperByYear"
          break
        case 2:
          requestUrl="/downLoadPatentByYear"
          break
        case 3:
          requestUrl="/downloadcontestByYear"
          break
        case 4:
          requestUrl="/downloadProjectByYear"
          break
      }
      request.post(requestUrl,this.downLoadTea).then(res=>{
        window.location.href=this.Fapi+"/excel/"+res.data
        this.dialogVisible=false
      }).catch(err=>{
        this.$message.error("下载失败")
      })
    },
    downloadPaperPatentInfo(num){
      this.dialogVisible=true
      this.paperPaten=num
    },
    downloadAllStu(){
      request.post('/getStudentExcelInfoByGuidanceCounselor',this.user).then(res=>{
        this.downloadFile(res.data)
      }).catch(err=>{
        this.$message.error("下载失败")
      })
    },
    downloadClassStu(){
      request.post('/getStudentExcelInfoByHeadMaster',this.user).then(res=>{
        for(let i=0;i<res.data.length;i++){
          this.downloadFile(res.data[i])
        }
      }).catch(err=>{
        this.$message.error("下载失败")
      })
    },
    downloadTemplateForGrant(){
      let len=this.multipleSelection.length
      if(len===this.tableData.length){
        request.post('/getAllStudentInfoByTemplateForGrant',this.user).then(res=>{
          this.downloadFile(res.data)
          this.teaAndStu.stuList=[]
        }).catch(err=>{
          this.$message.error("下载失败")
        })
      } else {

        for(let i=0;i<len;i++){
          this.teaAndStu.stuList.push(this.multipleSelection[i].stu_no)
        }
        request.post('/getSomeStudentInfoByTemplateForGrant',this.teaAndStu).then(res=>{
          this.downloadFile(res.data)
          this.teaAndStu.stuList=[]
        }).catch(err=>{
          this.$message.error("下载失败")
        })
      }
    },
    downloadTemplateForSchoolars(){
      let len=this.multipleSelection.length
      if(len===this.tableData.length){
        request.post('/getAllStudentInfoByTemplateForSchoolars',this.user).then(res=>{
          this.downloadFile(res.data)
          this.teaAndStu.stuList=[]
        }).catch(err=>{
          this.$message.error("下载失败")
        })
      } else {

        for(let i=0;i<len;i++){
          this.teaAndStu.stuList.push(this.multipleSelection[i].stu_no)
        }
        request.post('/getSomeStudentInfoByTemplateForSchoolars',this.teaAndStu).then(res=>{
          this.downloadFile(res.data)
          this.teaAndStu.stuList=[]
        }).catch(err=>{
          this.$message.error("下载失败")
        })
      }
    },
    downloadTemplateForSchoolarsB(){
      let len=this.multipleSelection.length
      if(len===this.tableData.length){
        request.post('/getAllStudentInfoByTemplateForSchoolarsB',this.user).then(res=>{
          this.downloadFile(res.data)
          this.teaAndStu.stuList=[]
        }).catch(err=>{
          this.$message.error("下载失败")
        })
      } else {

        for(let i=0;i<len;i++){
          this.teaAndStu.stuList.push(this.multipleSelection[i].stu_no)
        }
        request.post('/getSomeStudentInfoByTemplateForSchoolarsB',this.teaAndStu).then(res=>{
          this.downloadFile(res.data)
          this.teaAndStu.stuList=[]
        }).catch(err=>{
          this.$message.error("下载失败")
        })
      }
    },
    downloadDormitory(){
      request.post('/getStudentBedroomInfo',this.user).then(res=>{
        this.downloadFile(res.data)
      }).catch(err=>{
        this.$message.error("下载失败")
      })
    },
    downloadHuXiInfo(){
      request.post('/getHuxiInfo',this.user).then(res=>{
        for(let i=0;i<res.data.length;i++){
          this.downloadFile(res.data[i])
        }
      }).catch(err=>{
        this.$message.error("下载失败")
      })
    },
    downloadStay(){
      this.dialogVisible2=true
    },
    confirmDownloadStay(){
      this.stayUploadForm.teacher=this.user
      this.stayUploadForm.year=this.year+this.year2
      request.post('/downLoadStaySchoolByYear',this.stayUploadForm).then(res=>{
        this.downloadFile(res.data)
      }).catch(err=>{
        this.$message.error("下载失败")
      })
    },
    downloadFile(url){
      const iframe = document.createElement("iframe");
      iframe.style.display = "none"; // 防止影响页面
      iframe.style.height = 0; // 防止影响页面
      iframe.src = fileApi.fileApi+'/excel/'+url;
      document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
      // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
      setTimeout(()=>{
        iframe.remove();
      }, 5 * 60 * 1000);
    },

    handleSelectionChange(val){
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    filterClassHandler(value, row, column){
      const property = column['property']
      return row[property] === value
    },

    chooseStu(num){
      this.buttonType=num
      this.drawer=true

      request.post('/Stu/stuList', this.user).then(res=>{
        this.tableData=res
      }).catch(err=>{
        this.$message.error("学生信息请求错误")
      })

      request.post('/classList', this.user).then(res=>{
        for(let i=0; i<res.length; i++){
          this.filterClass.push({text:res[i].class_name, value: res[i].class_name})
        }

      }).catch(err=>{
        this.$message.error("班级信息请求错误")
      })


    },

  },
}
</script>

<style scoped>

</style>