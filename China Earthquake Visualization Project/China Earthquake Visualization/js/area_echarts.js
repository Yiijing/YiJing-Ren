/*   */
$(function () {
    map();
    function map() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map_1'));
var data = [
    { name:'东海海域', value: 150},
    { name:'新疆于田', value: 150},
    { name:'四川九寨沟', value: 150},
    { name:'四川芦山', value: 150},
    { name:'云南景谷', value: 150},
    { name:'西藏米林', value: 150},
    { name:'台湾花莲', value: 150},
    { name:'新疆阿克陶', value: 150},
    { name:'台湾花莲县附近海域', value: 150},
    { name:'甘肃岷县', value: 150},
    { name:'台湾南投', value: 150},
    { name:'台湾高雄', value: 150},
    { name:'台湾花莲海域', value: 150},
    { name:'云南鲁甸', value: 150},
    { name:'西藏尼玛', value: 150}
];
var geoCoordMap = {
    东海海域: [128.75, 31.05],
    新疆于田: [82.51, 36.14],
    四川九寨沟: [103.82, 33.20],
    四川芦山: [102.99, 30.30],
    云南景谷: [100.55, 23.40],
    西藏米林: [95.00, 29.75],
    台湾花莲: [121.44, 23.51],
    新疆阿克陶: [74.10, 39.20],
    台湾花莲县附近海域: [121.65, 24.10],
    甘肃岷县: [104.21, 34.54],
    台湾南投: [120.99, 23.87],
    台湾高雄: [120.54, 22.94],
    台湾花莲县海域: [121.60, 24.08],
    云南鲁甸: [103.33, 27.11],
    西藏尼玛: [86.81, 33.19]
};
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

option = {
   // backgroundColor: '#404a59',
    tooltip : {
        trigger: 'item',
		formatter: function (params) {
            if(typeof(params.value)[2] == "undefined"){
                return params.name + ' : ' + params.value;
            }else{
                return params.name + ' : ' + params.value[2];
            }
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: false,//禁止其放大缩小
        itemStyle: {
            normal: {
                areaColor: '#4c60ff',
                borderColor: '#002097'
            },
            emphasis: {
                areaColor: '#293fff'
            }
        }
    },
    series : [
        {
            name: '消费金额',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 15;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'red'
                }
            }
        }
    ]
};
		myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
})