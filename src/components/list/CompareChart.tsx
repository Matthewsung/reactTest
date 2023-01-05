import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { reduxBranchesType } from '@/store/listSlice'

const CompareChartComponents:React.FC<{
  chartData: reduxBranchesType[]
}> = (props) => {

  return <BarChart data={props.chartData} width={800} height={400} >
    <Bar dataKey={'value'} fill={'#67d06f'} barSize={35} />
    <XAxis dataKey={'store'}/>
    <YAxis dataKey={'value'}/>
    <Tooltip cursor={{fill: '#000', opacity:0.2}} />
  </BarChart>
}

export default CompareChartComponents