import {useEffect, useRef, useState} from "react";
import * as echarts from "echarts";

// eslint-disable-next-line react/prop-types
const PieChart = ({data, title}) => {
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null)


    const [option, setOption] = useState({
        title: {
            text: title,
            // subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            show: false,
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                // data: [
                //     { value: 1048, name: 'Search Engine' },
                //     { value: 735, name: 'Direct' },
                //     { value: 580, name: 'Email' },
                //     { value: 484, name: 'Union Ads' },
                //     { value: 300, name: 'Video Ads' }
                // ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    })

    // 更新数据
    useEffect(() => {
        setOption({
            ...option,
            series: [
                {
                    ...option.series[0],
                    data
                }
            ]
        })
    }, [data])

    // 渲染图表
    useEffect(() => {
        if (chartInstance === null) setChartInstance(() => {
            const _chartInstance = echarts.init(chartRef.current)
            _chartInstance.setOption(option)
            return _chartInstance
        });
        else chartInstance.setOption(option)
    }, [option])


    return <div ref={chartRef} style={{position: "relative", width:500, height:300}} />
}

export default PieChart
