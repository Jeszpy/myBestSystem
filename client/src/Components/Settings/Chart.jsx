import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const data = [
  { name: 'Page A', uv: 100, pv: 0, amt: 2400 },
  { name: 'Page B', uv: 100, pv: 0, amt: 2400 },
]

export const Chart = () => {
  let [cpuLoad, setCpuLoad] = useState(0)
  let [ramLoad, setRamLoad] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      axios.get('/api/settings/hardwareStatus').then((res) => {
        setCpuLoad(res.data[0])
        setRamLoad(res.data[1])
      })
    }, 3000)
    return () => clearTimeout(timer)
  })

  let data = [
    { name: 'Загрузка ЦП', percent: cpuLoad },
    { name: 'Загрузка ОЗУ', percent: ramLoad },
  ]

  return (
    <BarChart width={400} height={500} data={data}>
      <XAxis dataKey="name" stroke="#8884d8" />
      <YAxis />
      <Tooltip wrapperStyle={{ width: 150, backgroundColor: '#ccc' }} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="percent" fill="#8884d8" barSize={50} />
    </BarChart>
  )
}
