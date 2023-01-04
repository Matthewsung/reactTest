import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Text,
  Label,
  LabelList
} from "recharts";

const RechartsComponent = () => {
  const newData = [
    {name: '2022-12-14', '00001': 27, '00002':27, '00003': 0, '00004':25, '00005': 27, '00006':38},
    {name: '2022-12-15', '00001': 27, '00002':29, '00003': 0, '00004':26, '00005': 25, '00006':37},
    {name: '2022-12-16', '00001': 31, '00002':45, '00003': 0, '00004':33, '00005': 36, '00006':58},
    {name: '2022-12-17', '00001': 41, '00002':29, '00003': 0, '00004':30, '00005': 26, '00006':44},
    {name: '2022-12-18', '00001': 37, '00002':41, '00003': 0, '00004':34, '00005': 44, '00006':50},
    {name: '2022-12-19', '00001': 35, '00002':32, '00003': 0, '00004':42, '00005': 23, '00006':34},
    {name: '2022-12-20', '00001': 10, '00002':20, '00003': 0, '00004':30, '00005': 40, '00006':50},
  ]

  const pieData = [
    {
      name: '00001',
      value: 27,
      color: '#ff00ff'
    },
    {
      name: '00002',
      value: 36,
      color: '#789453'
    },
    {
      name: '00003',
      value: 0,
      color: '#123456'
    },
    {
      name: '00004',
      value: 2,
      color: '#00ff00'
    },
    {
      name: '00005',
      value: 45,
      color: '#ff0000'
    },
    {
      name: '00006',
      value: 50,
      color: '#00ffff'
    },
  ]

  return <>
    <h1>rechart</h1>
    <LineChart width={800} height={400} data={newData} margin={{top:20, right: 30, bottom: 20, left: 10}}>
      <Line type='linear' dataKey='00001' stroke='#264653' strokeWidth={2}></Line>
      <Line type='linear' dataKey='00002' stroke='#2a9d8f' strokeWidth={2}></Line>
      <Line type='linear' dataKey='00003' stroke='#e9c46a' strokeWidth={2}></Line>
      <Line type='linear' dataKey='00004' stroke='#f4a261' strokeWidth={2}></Line>
      <Line type='linear' dataKey='00005' stroke='#e76f51' strokeWidth={2}></Line>
      <Line type='linear' dataKey='00006' stroke='#cdb4db' strokeWidth={2}></Line>
      <Tooltip />
      <CartesianGrid stroke='#ddd'/>
      <XAxis dataKey='name' angle={-20} tickMargin={20} />
      <YAxis />
    </LineChart>

    {/*<PieChart width={800} height={400} >*/}
    {/*  <Pie data={pieData} dataKey='value' nameKey='name' cx='50%' cy='50%' innerRadius={90} fill='color' label>*/}
    {/*    {*/}
    {/*      pieData.map(data => {*/}
    {/*        return <Cell fill={data.color} key={data.name} />*/}
    {/*      })*/}
    {/*    }*/}
    {/*  </Pie>*/}
    {/*  <Tooltip />*/}
    {/*</PieChart>*/}
  </>
}

export default RechartsComponent