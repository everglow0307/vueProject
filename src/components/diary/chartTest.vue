<template>
    <div>
       <!-- 1번 라인차트 -->
        <highcharts :options = "chartOptions" /><br><br>
        <highcharts :options = "chartOptions4" /><br><br>

       <!-- 2번 컬럼차트 -->
        <highcharts :options = "chartOptions2" /><br><br>
       <!-- 3번 파이차트 -->
       <highcharts :options = "chartOptions3" /><br><br>
    </div>
</template>

<script>

function getData(n) {
    var arr = [],
        i,
        x,
        a,
        b,
        c,
        spike;
    for (
        i = 0, x = Date.UTC(new Date().getUTCFullYear(), 0, 1) - n * 36e5;
        i < n;
        i = i + 1, x = x + 36e5
    ) {
        if (i % 100 === 0) {
            a = 2 * Math.random();
        }
        if (i % 1000 === 0) {
            b = 2 * Math.random();
        }
        if (i % 10000 === 0) {
            c = 2 * Math.random();
        }
        if (i % 50000 === 0) {
            spike = 10;
        } else {
            spike = 0;
        }
        arr.push([
            x,
            2 * Math.sin(i / 100) + a + b + c + spike + Math.random()
        ]);
    }
    return arr;
}
var n = 510,
    data = getData(n);


export default ({
     data() {
    return {
        chartOptions: {
            title : {
                text: '와치텍 직급별 연봉 인상율(2012-2016)' 
            },
            subtitle : {
                text: '차트 연습용' 
            },
            xAxis: {
                tickInteval: 2,
                type: 'logarithmic',
                accessibility: {
                    rangeDescription: 'Range: 2012 to 2016'
                }
            },
            yAxis: {
                title: {
                    text: 'salary'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: {point.y}',
                valueSuffix: '만원',
                shared: true
            },
            plotOptions: {
                series: {
                    label: {
                        // connectorAllowed: false
                    },
                    pointStart: 2012
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: [{
                name: '사원',
                data: [2000, 2001, 2020, 2030, 2200],
            }, {
                name: '대리',
                data: [2500, 2502, 2610, 2610, 2630]
            }, {
                name: '과장',
                data: [2800, 2840, 3210, 3648, 4556]
            }, {
                name: '차장',
                data: [3000, 6000, 7000, 7012, 9123]
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        },
        chartOptions2: {
            chart: {
                type: 'column'
            },
            title : {
                text: '와치텍 직급별 연봉 인상율(2012-2016)' 
            },
            subtitle : {
                text: '차트 연습용' 
            },
            xAxis: {
                categories: [
                    '2012년',
                    '2013년',
                    '2014년',
                    '2015년'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: '연봉(단위: 10,000원)'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y} 만원</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            series: [{
                name: '사원',
                data: [2000, 2001, 2020, 2030, 2200]
            }, {
                name: '대리',
                data: [2500, 2502, 2610, 2610, 2630]
            }, {
                name: '과장',
                data: [2800, 2840, 3210, 3648, 4556]
            }, {
                name: '차장',
                data: [3000, 6000, 7000, 7012, 9123]
            }],
        },
        chartOptions3: {
            chart: {
                plotBackgroundColor: 'gold',
                plotBorderColor: 'red',
                plotBorderWidth: 5,
                plotShadow: true,
                type: 'pie'
            },
            title: {
                text: '브라우저 선호도, 2021'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Chrome',
                    y: 61.41,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Internet Explorer',
                    y: 11.84
                }, {
                    name: 'Firefox',
                    y: 10.85
                }, {
                    name: 'Edge',
                    y: 4.67
                }, {
                    name: 'Safari',
                    y: 4.18
                }, {
                    name: 'Sogou Explorer',
                    y: 1.64
                }, {
                    name: 'Opera',
                    y: 1.6
                }, {
                    name: 'QQ',
                    y: 1.2
                }, {
                    name: 'Other',
                    y: 2.61
                }]
            }]
        },
        chartOptions4: {
            chart: {
                zoomType: 'x'
            }, 
            tooltip: {
                valueDecimals: 5
            },
            series: [{
                data: data,
                lineWidth: 0.5,
                name: 'Hourly data points'
            }]

        },
        }
     }
});
</script>
<style scoped>
.highcharts-figure, .highcharts-data-table table {
    min-width: 360px; 
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}

</style>