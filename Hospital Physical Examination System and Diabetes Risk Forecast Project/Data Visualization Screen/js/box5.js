/*大屏*/
var dom = document.getElementById("box5");
var myChart = echarts.init(dom,'westeros');
var app = {};
option = null;

option = {
    series: [
        {
            type: 'treemap',
            data: [
                {
                    name: '血糖',
                    value: 1
                },
                {
                    name: '天门冬氨酸氨基转换酶',
                    value: 1
                },
                {
                    name: '丙氨酸氨基转换酶',
                    value: 1
                },
                {
                    name: '碱性磷酸酶',
                    value: 1
                },
                {
                    name: 'r-谷氨酰基转换酶',
                    value: 1
                },
                {
                    name: '总蛋白和白蛋白',
                    value: 1
                },
                {
                    name: '血小板指标',
                    value: 1
                },
                {
                    name: '白细胞不同类型的百分比',
                    value: 1
                }
            ]
        }
    ]
};

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}