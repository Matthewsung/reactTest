import {Grid} from "@mui/material";
import EchartsComponent from './echarts'
import RechartsComponent from './recharts'
const ChartPage = () => {
  return (
    <Grid container  spacing={2}>
      <Grid item>
        <RechartsComponent />
      </Grid>
      <Grid item>
        <EchartsComponent />
      </Grid>
    </Grid>
  )
}

export default ChartPage