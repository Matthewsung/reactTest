import ReactECharts from 'echarts-for-react'
const EchartsComponent = () => {
  const data = {
    title:"매장별 조리 추세",
    data:[
      [
        {name:"00001",type:"line",data:[27,27,31,41,37,35,0]},
        {name:"00002",type:"line",data:[27,29,45,29,41,32,0]},
        {name:"00003",type:"line",data:[0,0,0,0,0,0,0]},
        {name:"00004",type:"line",data:[25,26,33,30,34,42,0]},
        {name:"00005",type:"line",data:[27,25,36,26,44,23,0]},
        {name:"00006",type:"line",data:[38,37,58,44,50,34,0]},
      ],
      ["2022-12-14","2022-12-15","2022-12-16","2022-12-17","2022-12-18","2022-12-19","2022-12-20"]
    ]
  }
  let options = {
    title: {
      show:false,
      text: data.title,
      subtext: 'subText',
      subtextStyle: {
        // align: 'center'
      },
      textAlign: 'center',
      left: '50%',
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type:'category',
      data: data.data[1]
    },
    yAxis:
      [{
        type:'value',
        minInterval: 15
      }],
    series: data.data[0]
  }

  return  <>
    <h1>echarts</h1>
    <ReactECharts option={options} opts={{width: 800, height: 400}} />
  </>
}

export default EchartsComponent