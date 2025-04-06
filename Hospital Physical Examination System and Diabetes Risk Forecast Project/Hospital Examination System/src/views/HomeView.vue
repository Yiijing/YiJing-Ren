<template>
  <!-- 头部 -->
  <myHeader></myHeader>

<el-container>
  <!-- 侧边栏 -->
  <div class="aside">
    <el-aside width="178px">
      <asideNav></asideNav>
    </el-aside>
  </div>

  <el-container>
    <el-header class="header">
     
    </el-header>

      <!-- 主页面 -->
      <el-main>
        <router-view></router-view>  
      </el-main>

  </el-container>
</el-container>
</template>

<script>

import myHeader from "@/components/myHeader.vue"
import asideNav from "@/components/asideNav.vue"
export default {
  name: "HomeView",
  components: {
    myHeader,
    asideNav,
  }
}
</script>


<style>

.header{
  background-color: #d1dfec;
}

.el-header, .el-footer {
    background-color: #608bc7;
    color: #333;
    text-align: center;
    line-height: 60px;
    height:100%
  }

/* // 设置高度占满全屏  html,body,#app,.el-container,.el-aside都要设置height:100%; */
html,body,#app,
.el-container {
  height: 100%;
}


.aside {
    width: 160px;
    background-color: #608bc7;
    overflow: hidden;
 }
.el-aside {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
 }
 </style>