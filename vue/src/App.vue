<template>
  <div>
<!--  router-view作为全局的根节点访问，既可以是登录界面、注册界面、也可以是后台主体，会根据它的路由进行访问。  -->
<!--    当它访问到后台主体的时候要进行嵌套路由-->
    <router-view/>
  </div>

</template>

<style>

</style>
<script>

export default {
  name:"App",
}
</script>