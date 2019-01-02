function getData() {
    now = new Date(+now + oneDay);
    value = Math.random() * 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    }
}

var data = [];
var now = +new Date(2018, 11, 20);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 10;
for (var i = 0; i < 5; i++) {
    data.push(getData());
}

option1 = {
    title: {
        text: '聊天记录条数'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function(params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'time',
        data: data,
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],

        splitLine: {
            show: false
        }
    },
    series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
    }]
};

setInterval(function() {

    for (var i = 0; i < 1; i++) {
        data.shift();
        data.push(getData());
    }

    mychart1.setOption({
        series: [{
            data: data
        }]
    });
}, 5000);
