<template>
    <div class="aside">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#608bc7"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            @open="handleOpen"
            @close="handleClose"
            :router="true"
            style="height: 100%; width: 100%;"
        >
            <el-sub-menu index="首页">
                <template #title>
                    <span>首页</span>
                </template>
                <el-menu-item index="result">体检数据</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="信息管理">
                <template #title>
                    <!-- <el-icon><location /></el-icon> -->
                    <span>信息管理</span>
                </template>
                <el-menu-item index="users">用户信息</el-menu-item>
                <el-menu-item index="patientinfo">患者信息</el-menu-item>
                <el-menu-item index="doctorinfo">医生信息</el-menu-item>
                <el-menu-item index="appointments">预约信息</el-menu-item>
                <el-menu-item index="bloodroutine">血常规检测结果</el-menu-item>
                <el-menu-item index="liver">肝功能检测结果</el-menu-item>
                <el-menu-item index="renin">肾功能检测结果</el-menu-item>
                <el-menu-item index="diagnosis">体检结果</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/forecast">
                <!-- <el-icon><icon-menu /></el-icon> -->
                <span>风险预测</span>
            </el-menu-item>
            <el-menu-item index="/1">
                <!-- <el-icon><icon-menu /></el-icon> -->
                <span>个人中心</span>
            </el-menu-item>
            <el-menu-item index="/pagesTwo" >
                <!-- <el-icon><document /></el-icon> -->
                <span>使用说明</span>
            </el-menu-item>
            <el-menu-item index="4">
                <!-- <el-icon><setting /></el-icon> -->
                <span>设置</span>
            </el-menu-item>
            
        </el-menu>
    </div>
</template>

<script lang="js" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)

}
</script>

<style scoped>
.aside{
    height: 100vh;
}
</style>