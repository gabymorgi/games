import 'antd/dist/antd.css';
import { Col, Divider, Row, Table } from 'antd';
//import './index.css'
import { data, GameState, GameTag } from './data'
import { Line, Pie } from 'react-chartjs-2';
import { useMemo, useState } from 'react'
import { Tags, tagToString } from './components/Tags';
import { State, stateInfo } from './components/State';
import { Achievements } from './components/Achievements'
import { areIntervalsOverlapping, endOfMonth, endOfYear, eachMonthOfInterval, format, getYear, startOfYear, isWithinInterval, differenceInDays, eachYearOfInterval } from 'date-fns';
import { Score, ScoreHeader } from './components/Score'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const ChartCol = styled(Col)`
  align-items: center;
  justify-content: center;
  display: flex;
`

function App() {
  const [interval, setInterval] = useState(new Date())
  const [seeHistory, setSeeHistory] = useState(false)

  const dataCharts = useMemo(() => {
    if (!data) return {}
    let intervals
    let filterInterval = seeHistory
      ? { start: new Date("2012-01-01"), end: new Date() }
      : { start: startOfYear(interval), end: endOfYear(interval) }
    if (seeHistory) {
      intervals = eachYearOfInterval(filterInterval).map((m) => ({ start: m, end: endOfYear(m), label: format(m, "yyyy") }))
    } else {
      intervals = eachMonthOfInterval(filterInterval).map((m) => ({ start: m, end: endOfMonth(m), label: format(m, "MMM") }))
    }
    let tagsData: { [key in GameTag]?: number } = {}
    let stateData: { [key in GameState]?: number } = {}
    data.filter((g) => {
      return g.end
        ? areIntervalsOverlapping( filterInterval, { start: new Date(g.start), end: new Date(g.end) }, { inclusive: true })
        : isWithinInterval(new Date(g.start), filterInterval)
    }).forEach((g) => {
      if (g.state !== GameState.Abandoned && g.state !== GameState.Banned) {
        g.tags.forEach((t) => {
          tagsData[t] = (tagsData[t] || 0) + 1
        })
      }
      stateData[g.state] = (stateData[g.state] || 0) + 1
    })

    const dataIntervals = intervals.map((i) => {
      const daysInInterval = differenceInDays(i.end, i.start)
      const gamesInInterval = data.filter((g) => g.end ? areIntervalsOverlapping(
        i, { start: new Date(g.start), end: new Date(g.end) }, { inclusive: true }
      ) : isWithinInterval(new Date(g.start), i))
      const hours = gamesInInterval.reduce((acum, g) => {
        const days = g.end ? differenceInDays(new Date(g.end), new Date(g.start)) : 1
        const percentage = days > daysInInterval ? daysInInterval / days : 1
        return acum + (g.hours || 0) * percentage
      }, 0)
      return {
        label: i.label,
        hours,
      }
    })

    return {
      gamesCount: data.filter((g) => g.end ? areIntervalsOverlapping(
        filterInterval, { start: new Date(g.start), end: new Date(g.end) }, { inclusive: true }
      ) : isWithinInterval(new Date(g.start), filterInterval)).length,
      hourChart: {
        labels: dataIntervals.map((di) => di.label),
        values: dataIntervals.map((di) => Math.round(di.hours)),
      },
      tagChart: {
        labels: Object.keys(tagsData).map((k: string) => GameTag[Number(k)]),
        values: Object.values(tagsData),
        hue: Object.keys(tagsData).map((k) => tagToString[k as unknown as GameTag].color)
      },
      stateChart: {
        labels: Object.keys(stateData).map((k: string) => GameState[Number(k)]),
        values: Object.values(stateData),
        hue: Object.keys(stateData).map((k) => stateInfo[k as unknown as GameState].color)
      }
    }
  }, [data])

  console.log(dataCharts)

  const dataSource = useMemo(() => {
    if (!data) return []
    return data.map((g) => {
      const start = new Date(g.start)
      const end = g.end ? new Date(g.end) : undefined
      return {
        name: g.name,
        rowClassName: getYear(start) % 2 === 0 ? 'even-row' : 'odd-row',
        start: format(start, "dd/MM/yyyy"),
        end: end ? format(end, "dd/MM/yyyy") : undefined,
        state: <State state={g.state} />,
        hours: g.hours,
        achievements: g.achievements ? <Achievements obtained={g.achievements[0]} total={g.achievements[1]} /> : undefined,
        tags: <Tags tags={g.tags} />,
        score: <Score score={g.score} />
      }
    })
  }, [data])

  return (
    <div className="App">
      <Row>
        <ChartCol span={8}>
          {dataCharts.hourChart ? <Line
            datasetIdKey='id'
            data={{
              labels: dataCharts.hourChart.labels,
              datasets: [
                {
                  label: "Hours Played",
                  data: dataCharts.hourChart.values,
                  fill: true,
                  backgroundColor: "#74277420",
                  borderColor: "hsla(102, 100%, 30%, 1)"
                }
              ]
            }}
          /> : undefined }
        </ChartCol>
        <ChartCol span={8}>
          {dataCharts.stateChart ? <Pie data={{
            labels: dataCharts.stateChart?.labels,
            datasets: [
              {
                data: dataCharts.stateChart.values,
                backgroundColor: dataCharts.stateChart.hue.map((h) => `${h}50`),
                borderColor: dataCharts.stateChart.hue,
                borderWidth: 3,
              },
            ],
          }} /> : undefined}
        </ChartCol>
        <ChartCol span={8}>
          {dataCharts.tagChart ? <Pie data={{
            labels: dataCharts.tagChart?.labels,
            datasets: [
              {
                data: dataCharts.tagChart.values,
                backgroundColor: dataCharts.tagChart.hue.map((h) => `hsla(${h}, 100%, 70%, 0.2)`),
                borderColor: dataCharts.tagChart.hue.map((h) => `hsla(${h}, 100%, 70%, 1)`),
                borderWidth: 3,
              },
            ],
          }} /> : undefined}
        </ChartCol>
      </Row>
      <Divider />
      <Table
        dataSource={dataSource}
        rowKey="name"
        size="small"
        pagination={{
          defaultPageSize: 50,
        }}
        rowClassName={(record) => record.rowClassName}
      >
        <Table.Column title="Name" dataIndex="name" />
        <Table.Column title="Start" dataIndex="start" />
        <Table.Column title="End" dataIndex="end" />
        <Table.Column title="State" dataIndex="state" />
        <Table.Column title="Hours" dataIndex="hours" />
        <Table.Column title="Achievements" dataIndex="achievements" />
        <Table.Column title="Tags" dataIndex="tags" />
        <Table.Column title={<ScoreHeader />} dataIndex="score" />
      </Table>
    </div>
  )
}

export default App
