import React, {
  ChangeEvent,
  MouseEventHandler,
  useState,
  WheelEvent
} from "react";
import styled from "styled-components";
import {
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import {
  element
} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
type ITableOptions = {
  id: number,
  store: string,
  date:string,
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
const LineChartComponent:React.FC<{
  data: {
    header: ITableHead[],
    body: ITableOptions[]
  }
}> = (props) => {
  const test = [
    {
      name:'2021.01.17. 16:00',
      ['1호기']:1000,
      ['2호기']:890,
    },
    {
      name:'2021.01.17. 17:00',
      ['1호기']:800,
      ['2호기']:950,
    },
    {
      name:'2021.01.17. 18:00',
      ['1호기']:1200,
      ['2호기']:1080,
    },
    {
      name:'2021.01.17. 19:00',
      ['1호기']:1500,
      ['2호기']:1200,
    },
    {
      name:'2021.01.17. 20:00',
      ['1호기']:1000,
      ['2호기']:500,
    },
    {
      name:'2021.01.17. 21:00',
      ['1호기']:900,
      ['2호기']:600,
    },
    {
      name:'2021.01.17. 22:00',
      ['1호기']:500,
      ['2호기']:900,
    },
    {
      name:'2021.01.17. 23:00',
      ['1호기']:200,
      ['2호기']:500,
    },
  ]
  const keys = Object.keys(test[0])
  const [wheelIndex, setWheelIndex] = useState({
    start: 0,
    end: test.length - 1,
    gap: 2
  });
  const handleMouseWheel = (e:WheelEvent ) => {
    let wheelStart = wheelIndex.start
    let wheelEnd = wheelIndex.end
    if(e.deltaY > 0) {
      if(wheelStart == -wheelIndex.gap) {
        return
      }
      wheelStart -= 1
      wheelEnd -= 1

    }else {
      if(wheelEnd == test.length - 1) {
        return
      }
      wheelStart += 1
      wheelEnd += 1
    }
    setWheelIndex({start: wheelStart, end: wheelEnd, gap: wheelIndex.gap})
  }
  const handleMouseEnter = () => {
    const body = document.querySelector('body')
    if(body) {
      body.style.overflow = 'hidden'
    }
  }
  const handleMouseLeave = () => {
    const body = document.querySelector('body')
    if(body) {
      body.style.overflow = 'auto'
    }
  }
  return <LineChartWrapper onWheel={handleMouseWheel}>
    <ResponsiveContainer>
      <LineChart data={test} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {
          keys.map((items,index) => {
            if(!index) return ;
            return <Line dataKey={items} type={'natural'} key={`line_${items}`} stroke={COLOR[index]}/>
          })
        }
        <Brush
          height={24}
          startIndex={wheelIndex.start + wheelIndex.gap}
          endIndex={wheelIndex.end }
          dataKey={'name'}
          // stroke={'#ff00ff'}
          // fill={'#ff0000'}
        />
        <XAxis dataKey={'name'} allowDataOverflow  />
        <YAxis dataKey={'1호기'} />
        <CartesianGrid />
      </LineChart>
    </ResponsiveContainer>
  </LineChartWrapper>
}

export default LineChartComponent

const LineChartWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3;
`