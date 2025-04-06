<template>
    <div class="myheader">
        <el-row style="height: 45px;">
            <el-col :span="8"><div class='name'>医院体检系统</div></el-col>
            <el-col :span="8"><div></div></el-col>
            <el-col :span="8">
                <div class="right">
                    <el-row ><el-link href="/login">退出</el-link></el-row>
                    <el-row class="time">
                        <div> <span>{{dateFormat(newDate)}}</span></div>
                    </el-row>
                </div>
                
            </el-col>
        </el-row>
    </div>
    
</template>

<script>

export default ({
    data() {
        return{
            // 当前时间
            newDate: new Date()
        }
    },
    // 挂载时间
    mounted () {
        let that = this
        this.timer = setInterval(function () {
        that.newDate = new Date().toLocaleString()
        })
    },
    // 销毁时清除计时器
    beforeDestroy: function () {
        if (this.timer) {
        clearInterval(this.timer)
        }
    },
    methods: {
	// 时间格式化
    dateFormat () {
    	var date = new Date()
        var year = date.getFullYear()
        /* 
         * 在日期格式中，月份是从0开始的
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        let week = date.getDay() // 星期
        let weekArr = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]
        // 拼接 时间格式处理
        return year + '年' + month + '月' + day + '日 ' + hours + ':' + minutes + ':' + seconds + ' ' + weekArr[week]
    }
}


})
</script>


<style scoped>
.myheader{
    background-color: #202c65;
}
.name{
    text-align: left;
    font-size: 25px;
    color: #ffffff;
    margin: 0;
    padding: 0;
}
.time{
    color: #ffffff;
    display: block;
    text-align: right;
}

.right .el-row{
    display: block;
    text-align: right;
}
a{
  text-decoration: none;
  color: white;
}
</style>