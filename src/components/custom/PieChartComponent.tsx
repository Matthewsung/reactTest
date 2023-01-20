import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  PieLabelRenderProps, Tooltip, TooltipProps,
} from "recharts";
import React, {useMemo, useState} from "react";
import styled, {css} from "styled-components";
import {
  NameType,
  ValueType
} from "recharts/src/component/DefaultTooltipContent";
import {Button, IconButton} from "@mui/material";
import {OpenWith} from '@mui/icons-material';
import {bool} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
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
  const handleEnlargeChart = () => {
    setEnlarge(!enlarge)

  }
  const [enlarge, setEnlarge] = useState(false);
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
  const CustomTooltip = (tooltipProps:TooltipProps<ValueType, NameType>) => {
    const {active, payload} = tooltipProps
    if (active && payload && payload.length) {
      return <TooltipWrapper>
        {
          props.data.body.map(item => (
            <div className={'label'} key={`label_${item.id}`}>{`${item.store} : ${item.price}`}</div>
          ))
        }
        <span>위의 데이터는 정확하지 않습니다.</span>
      </TooltipWrapper>
    }
    return null
  }

  return <CustomChartWrapper value={enlarge}>
    <IconButton className={'enlarge_icon'} onClick={handleEnlargeChart}>
      <OpenWith />
    </IconButton>
    <ResponsiveContainer aspect={1.5}>
      <PieChart >
        <Tooltip
          content={<CustomTooltip />}
          // payload={[{name:'123', value:123}]}
        />
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

        <Pie
          data={props.data.body}
          dataKey={'price'}
          innerRadius={enlarge?180: 80}
          // outerRadius={enlarge?100: 100}
          label={customLabel}
          labelLine={false}
          nameKey={'store'}
        >
          {
            props.data.body.map((item, index) => (
              <Cell key={`chart_${index}`} fill={COLOR[index]} />
            ))
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </CustomChartWrapper>
}

export default PieChartComponent

const CustomChartWrapper = styled.div<{value: boolean}>`
  width: 95%;
  aspect-ratio: 1.5;
  display: flex;
  flex-direction: column;
  position: relative;
  
  .enlarge_icon {
    align-self: end;
  };
  ${props => props.value && css`
    width: 90%;
    background: #fff;
    border: 1px solid #ddd;
    position: fixed;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    
  `}
  
`
const TooltipWrapper = styled.div`
  padding: 8px 12px;
  background: #fff;
  border: 1px solid #ddd;
  
  span {
    color: red;
  }
`