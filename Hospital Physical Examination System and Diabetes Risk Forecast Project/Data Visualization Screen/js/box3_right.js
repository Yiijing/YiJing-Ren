/*大屏*/
var dom = document.getElementById("box3_right");
var myChart = echarts.init(dom,'westeros');
var app = {};

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data: ['男', '女']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['青少年儿童', '青年', '中青年', '中老年', '老年']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '男',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
            focus: 'series'
        },
        data: [100, 51, 50, 46, 48]
        },
        {
            name: '女',
            type: 'line',
            stack: 'Total',
            label: {
            show: true,
            position: 'top'
            },
            areaStyle: {},
            emphasis: {
            focus: 'series'
            },
            data: [0, 49, 50, 54, 52]
        }
    ]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}