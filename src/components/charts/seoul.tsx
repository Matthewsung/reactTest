import { MouseEvent } from "react";
import {
  ScatterChart,
  XAxis,
  YAxis,
  Scatter,
  Tooltip,
  ZAxis, TooltipProps,
} from 'recharts'
import { ValueType, NameType } from 'recharts/src/component/DefaultTooltipContent';
const mapURL = '/seoul_map.svg'
// const mapURL = '/SEOUL_SIG'
type MouseEventType = MouseEvent<HTMLElement>
const SeoulMap = () => {
  const data = [
    {x:256  , y: 192 , value:10, store:'사당점'},
    {x:441, y: 152, value:15, store:'1호점'},
    {x:587, y: 224, value:20, store:'째깍섬점' },
    {x:435, y: 253, value:50, store:'성수점' },
  ]

  const CustomTooltip = ({payload, active, }: TooltipProps<ValueType, NameType> ) => {
    let store ;
    let value ;

    if(!active) {
      return
    }

    payload?.map(storeValue => {
      if(storeValue.name !== 'value') {
        return
      }
      store = storeValue.payload.store
      value = storeValue.payload.value
    })

    return <div style={{background:'#fff', padding: '4px 12px 12px'}}>
      <h3>{ store }</h3>
      <div>
        { `판매량 : ${value}` }
      </div>
    </div>
  }

  return <div style={{width: '800px', height: '500px', background: `no-repeat center/contain url(${mapURL})`, position: 'relative'}}>
    <ScatterChart width={800} height={500} >
      <XAxis type='number' dataKey='x' hide={true} domain={[0, 800]} />
      <YAxis type='number' dataKey='y' hide={true} domain={[0, 500]} />
      <ZAxis dataKey='value' range={[50, 500]}/>
      <Tooltip content={CustomTooltip} />
      <Scatter data={data} fill='#ff0000'/>
    </ScatterChart>
  </div>
}

export default  SeoulMap