$(function () {
    echarts_1();
    echarts_2();
    echarts_3();
    echarts_4();
    echarts_5();
    echarts_6();
    
    function echarts_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart1'));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b} {c}次)'
            },
            series: [
                {
                    type: 'treemap',
                    data: [
                        {
                            name: '新疆维吾尔自治区',
                            value: 92
                        },
                        {
                            name: '西藏自治区',
                            value: 82
                        },
                        {
                            name: '四川省',
                            value: 65
                        },
                        {
                            name: '台湾省',
                            value: 62
                        },
                        {
                            name: '云南省',
                            value: 57
                        },
                        {
                            name: '青海省',
                            value: 27
                        },
                        {
                            name: '甘肃省',
                            value: 14
                        },
                        {
                            name: '吉林省',
                            value: 13
                        },
                        {
                            name: '内蒙古自治区',
                            value: 7
                        },
                        {
                            name: '广西壮族自治区',
                            value: 5
                        },
                        {
                            name: '湖北省',
                            value: 4
                        },
                        {
                            name: '贵州省',
                            value: 3
                        },
                        {
                            name: '河北省',
                            value: 2
                        },
                        {
                            name: '辽宁省',
                            value: 2
                        },
                        {
                            name: '重庆市',
                            value: 2
                        },
                        {
                            name: '黑龙江省',
                            value: 2
                        },
                        {
                            name: '广东省',
                            value: 1
                        },
                        {
                            name: '山西省',
                            value: 1
                        },
                        {
                            name: '福建省',
                            value: 1
                        },
                        {
                            name: '山东省',
                            value: 1
                        },
                        {
                            name: '陕西省',
                            value: 1
                        },
                        {
                            name: '宁夏回族自治区',
                            value: 1
                        }
                        ]
                    }
                    ]
                };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

    function echarts_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart2'));
        option = {
            legend: {
                show: false
            },
            toolbox: {
                show: true,
                feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}年 {c}次 ({d}%)'
            },
            series: [
                {
                    name: '2013-2020各年分发生的地震数图',
                    type: 'pie',
                    radius: [15, 80],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: [
                        { value: 730, name: '2013' },
                        { value: 650, name: '2014' },
                        { value: 583, name: '2015' },
                        { value: 516, name: '2016' },
                        { value: 465, name: '2017' },
                        { value: 560, name: '2018' },
                        { value: 571, name: '2019' },
                        { value: 559, name: '2020' }
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

    function echarts_3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart3'));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b} {c}次',
                axisPointer: {
                type: 'shadow'
                }
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
                    data: [
                    '0-10Ms',
                    '10-20Ms',
                    '20-100Ms',
                    '100-700Ms'
                    ],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    interval: 500,
                    axisLabel: {
                    // 设置 Y 轴刻度的格式，可以根据需要进行调整
                    formatter: '{value}次'
                    }
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '50%',
                    data: [2788, 1277, 475, 78]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

    function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));
        option = {
            legend: {
                data: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
                top: 'bottom',
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: '地震次数', max: 850, min: 300 },
                    { name: '平均震级', max: 4.5, min: 2 },
                    { name: '平均震源深度', max: 20, min: 10 }
                ]
            },
            series: [
                {
                    type: 'radar',
                    data: [
                        {
                            value: [730, 3.79, 14.29],
                            name: '2013'
                        },
                        {
                            value: [650, 3.66, 13.0],
                            name: '2014'
                        },
                        {
                            value: [583, 3.7, 16.23],
                            name: '2015'
                        },
                        {
                            value: [516, 3.8, 17.26],
                            name: '2016'
                        },
                        {
                            value: [465, 3.69, 16.17],
                            name: '2017'
                        },
                        {
                            value: [560, 3.78, 13.83],
                            name: '2018'
                        },
                        {
                            value: [571, 3.7, 15.0],
                            name: '2019'
                        },
                        {
                            value: [559, 3.73, 16.8],
                            name: '2020'
                        }
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

    function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c}次'
            },
            toolbox: {
                feature: {
                    dataView: { readOnly: false },
                    restore: {},
                    saveAsImage: {}
                }
            },
            legend: {
                data: ['微震', '有感地震', '中强震', '强震', '大地震']
            },
            series: [
                {
                    type: 'funnel',
                    left: '5%',
                    top: 10,
                    bottom: 0,
                    width: '90%',
                    min: 0,
                    max: 100,
                    minSize: '5%',
                    maxSize: '95%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        show: true,
                        position: 'inside'
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                        width: 1,
                        type: 'solid'
                        }
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                        fontSize: 20
                        }
                    },
                    data: [
                        { value: 407, name: '微震(1<=M<3)' },
                        { value: 3637, name: '有感地震(3<=M<4.5)' },
                        { value: 549, name: '中强震(4.5<=M<6)' },
                        { value: 39, name: '强震(6<=M<7)' },
                        { value: 2, name: '大地震(7<=M<8)' }
                    ]
                }
            ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
        
    function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart6'));
        option = {
            grid: {
                left: '10%',   // 设置图表距离左边的距离
                right: '10%',  // 设置图表距离右边的距离
                top: '10%',    // 设置图表距离顶部的距离
                bottom: '10%'  // 设置图表距离底部的距离
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}时 {c}次'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 
                    13, 14, 15, 16, 17, 18, 19, 20,21, 22, 23
                ],
                axisLabel: {
                    interval: 0
                }
            },
            yAxis: {
                type: 'value',
                min: 90, //设置最大值
                max: 270  //设置最小值
            },
            series: [
                {
                    data: [
                        206, 198, 188, 205, 210, 191, 193, 192, 212, 209, 172, 202, 
                        162, 208,147, 188, 171, 192, 186, 200, 182, 209, 227, 184
                        ],
                    type: 'line',
                    areaStyle: {}
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
})