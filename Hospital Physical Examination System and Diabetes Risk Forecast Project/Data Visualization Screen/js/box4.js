var dom = document.getElementById("box4");
var myChart = echarts.init(dom,'westeros');
var app = {};
option = null;

option = {
    legend: {
        data: ['平均肝脏水平分析','平均脂质代谢水平分析']
    },
    radar: [
        {
            indicator: [
                { text: '天门冬氨酸氨基转换酶' },
                { text: '丙氨酸氨基转换酶' },
                { text: '碱性磷酸酶' },
                { text: 'r-谷氨酰基转换酶' },
                { text: '总蛋白' },
                { text: '白蛋白' },
                { text: '球蛋白' },
                { text: '白球比例' },
            ],
            center: ['25%', '50%'],
            radius: 120,
            startAngle: 90,
            splitNumber: 4,
            shape: 'circle',
            name: {
                formatter:'{value}',
            },
        },
        {
            indicator: [
                { text: '低密度脂蛋白胆固醇'},
                { text: '总胆固醇'},
                { text: '高密度脂蛋白胆固醇 '},
                { text: '甘油三酯' }
            ],
            center: ['75%', '50%'],
            radius: 120
        }
    ],
    series: [
        {
            name: '平均肝脏水平分析',
            type: 'radar',
            itemStyle: {
                emphasis: {
                    lineStyle: {
                        width: 6
                    }
                }
            },
            data: [
                {
                    value: [26.81, 27.65, 87.48, 38.82, 76.77, 45.82, 30.95, 1.50],
                    name: '平均肝脏水平分析',
                    symbol: 'rect',
                    symbolSize: 5,
                    label: {
                        normal: {
                            show: true,
                            formatter:function(params) {
                                return params.value;
                            }
                        }
                    }
                }
            ]
        },
        {
            name: '平均脂质代谢水平分析',
            type: 'radar',
            radarIndex: 1,
            data: [
                {
                    value: [3.36, 5.23, 1.39, 1.85],
                    name: '平均脂质代谢水平分析',
                    label: {
                        normal: {
                            show: true,
                            formatter:function(params) {
                                return params.value;
                            }
                        }
                    }
                }
            ]
        }
    ]
};
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}