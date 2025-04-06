<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>
 
<script>
import myHeader from "@/components/myHeader.vue"
import asideNav from "@/components/asideNav.vue"
export default {
  name: "App",
  components: {
    myHeader,
    asideNav,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

/* .header{
  background-color: #d1dfec;
}

.el-header, .el-footer {
    background-color: #608bc7;
    color: #333;
    text-align: center;
    line-height: 60px;
    height:100%
  }

// 设置高度占满全屏  html,body,#app,.el-container,.el-aside都要设置height:100%;
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
 } */


/* .el-aside {
     background-color: #D3DCE6; 
    color: #333;
    text-align: center;
    line-height: 100vh;
} */

/* .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
} */

/* body > .el-container {
    margin-bottom: 40px;
} */

/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
} */

/* .el-container:nth-child(7) .el-aside {
    line-height: 100%;
} */

</style>
