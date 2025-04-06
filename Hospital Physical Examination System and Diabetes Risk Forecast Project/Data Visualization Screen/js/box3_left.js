/*大屏*/
var dom = document.getElementById("box3_left");
var myChart = echarts.init(dom,'westeros');
var app = {};
option = null;
app.title = '饼状图';

option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}占比: {c}%',
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: '患者分布',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 0.5, name: '青少年儿童0-18岁' },
                { value: 23.11, name: '青年18-35岁' },
                { value: 39.76, name: '中青年35-50岁' },
                { value: 29.05, name: '中老年50-65岁' },
                { value: 8.03, name: '老年65岁以上' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}