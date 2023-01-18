import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";
import React, {useMemo} from "react";
import styled from "styled-components";

type ITableOptions = {
  id: number,
  store: string,
  price: number,
  count: number,
}
type ITableHead = {
  id: number,
  text: string
}
const COLOR = [
  '#ff0000','#fbb034','#ffdd00','#c1d82f','#00a4e4','#8a7967','#6a737b'
]
const PieChartComponent:React.FC<{
  data: {
    header: ITableHead[],
    body: ITableOptions[]
  }
}> = (props) => {
  const data =  [
    {id:1, store: '1호기', price:23, count: 1, },
    {id:2, store: '2호기', price:27, count: 5, },
    {id:3, store: '3호기', price:49, count: 11, },
    {id:4, store: '6호기', price:11, count: 20, },
    {id:5, store: '튀김기', price:6, count: 1, },
  ]
  // const data = [
  //   { name: 'Group A', value: 400 },
  //   { name: 'Group B', value: 300 },
  //   { name: 'Group C', value: 300 },
  //   { name: 'Group D', value: 200 },
  // ];
  // return <ResponsiveContainer width={'70%'} height={'50%'}>
  const customLabel = (labelProps:PieLabelRenderProps | any ) => {
    const {innerRadius, outerRadius, cx, midAngle, cy, value} = labelProps
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) - 7;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) + 10;

    return <text
      x={x}
      y={y}
      fill={'#fff'}
    >
      {`${labelProps.value}(원)`}
    </text>
  }
  return <CustomChartWrapper height={350}>
    <PieChart  >
      <Pie
        data={props.data.body}
        dataKey={'price'}
        innerRadius={80}
        label={customLabel}
        labelLine={false}
      >
        {
          props.data.body.map((item, index) => (
            <Cell key={`chart_${index}`} fill={COLOR[index]} />
          ))
        }
      </Pie>
      <Legend
        layout={'vertical'}
        align={'right'}
        verticalAlign={'middle'}
        payload={
          props.data.body.map((item, index) =>(
            {value:item.store, type: 'rect', color:COLOR[index] }
          ))
        }
        formatter={(value, entry) => (<span style={{color: '#000'}}>{value}</span>)}
      />
    </PieChart>
  </CustomChartWrapper>
  // </ResponsiveContainer>
}

export default PieChartComponent

const CustomChartWrapper = styled(ResponsiveContainer)`
  height: 350px;
`