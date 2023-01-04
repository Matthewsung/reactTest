import { Routes, Route } from 'react-router-dom'

import InitPage from './pages'
import ThreeComponent from '@/components/three'
import ChartPage from '@/components/charts'
import JWTComponent from '@/components/jwt'
import SeoulMap from '@/components/charts/seoul'
function App() {

  return (
    <Routes>
      <Route path="/" element={<InitPage />} >
        <Route path='three' element={<ThreeComponent />} />
        <Route path='chart' element={<ChartPage />} />
        <Route path='jwt' element={<JWTComponent />} />
        <Route path='seoul' element={<SeoulMap />} />
      </Route>
    </Routes>
  )
}

export default App
