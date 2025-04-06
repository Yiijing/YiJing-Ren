/*大屏*/
var dom = document.getElementById("box1");
var myChart = echarts.init(dom,'westeros');
var app = {};

option = {
    dataset: {
        source: [
            ['score', 'amount', 'product'],
            [85, 6.59, '白细胞计数'],
            [100, 4.96, '红细胞计数'],
            [90, 147.98, '血红蛋白'],
            [95, 89.05, '红细胞平均体积'],
            [90, 253.09, '血小板计数'],
            [100, 10.65, '血小板平均体积']
        ]
    },
    grid: { containLabel: false},
    xAxis: { name: '均值' },
    yAxis: { type: 'category' },
    visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 10,
        max: 100,
        text: ['High Score', 'Low Score'],
        // Map the score column to color
        dimension: 0,
        inRange: {
            color: ['#a5e7f0','#cbb0e3']
        }
    },
    series: [
        {
            type: 'bar',
            encode: {
            // Map the "amount" column to X axis.
            x: 'amount',
            // Map the "product" column to Y axis
            y: 'product'
            }
        }
    ]
};
;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}