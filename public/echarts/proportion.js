//文档就绪后调用getAppInfoAndShow()方法
$(function () {
    getAppInfoAndShow1();

    //异步获取数据
    function getAppInfoAndShow1() {

        var content = {};
        $.ajax({
            type: "get",
            url: "http://localhost:8080/api/data/sex",
            async: false,
            dataType: "JSON",
            success: function (data) {
                content = data.data;

            }
        });
        var echartData = new Array();
        // for (var i = 0; i < content.length; i++) {
        //     var obj = new Object();
        //     obj.name = content[i].labelName;
        //     obj.value = content[i].appCount;
        //     obj.itemStyle = wordCloudColor();
        //     echartData[i] = obj;
        // }
        for (i in content) {
            let item = {};
            item.name = i;
            item.value = content[i];
            echartData.push(item);
        }
        console.log(echartData)
        showWordCloud(echartData);
    }

    //设置文字样式
    function wordCloudColor() {
        return {
            normal: {
                color: '#C23531'
            }
        };
    }

    //页面展示
    function showWordCloud(echartData) {

        option = {

            title: {
                text: '男女比例',
                left: 'left',
                top: 20,
                textStyle: {
                    color: '#ccc'
                }
            },

            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show: false,
                min: 0,
                max: 20,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series: [{
                name: '性别比例',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: echartData.sort(function (a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(0, 0, 0, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(0, 0, 0, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.2)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }]
        };


        // myChart.on(echarts.config.EVENT.CLICK, getIntoAppPage);
        mychart2.setOption(option);
    }
    setInterval(function () {
        getAppInfoAndShow()
    }, 5000);

    function getIntoAppPage(param) {
        location.href = "/appPage?labelName=" + param.data.name;
    }








});
