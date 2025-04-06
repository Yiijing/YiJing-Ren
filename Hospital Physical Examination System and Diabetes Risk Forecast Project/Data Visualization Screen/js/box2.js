/*大屏*/
var dom = document.getElementById("box2");
var myChart = echarts.init(dom,'westeros');
var app = {};

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'shadow'
        }
    },
    grid: {
        left: '0%',
        right: '0%',
        bottom: '20%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: [
                '3-4',
                '4-5',
                '5-6',
                '6-7',
                '7-8',
                '8-9',
                '9-10',
                '10-15',
                '15-20'
            ],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [21, 1687, 2906, 573, 176, 86, 54, 112, 23]
        }
    ]
};

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}