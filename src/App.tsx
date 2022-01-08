import 'antd/dist/antd.css';
import { Button, Col, Divider, Row, Switch, Table } from 'antd';
//import './index.css'
import { data, GameState, GameTag } from './data'
import { Line, Pie } from 'react-chartjs-2';
import { useMemo, useState } from 'react'
import { Tags, tagToString } from './components/Tags';
import { State, stateInfo } from './components/State';
import { Achievements } from './components/Achievements'
import { areIntervalsOverlapping, endOfMonth, endOfYear, eachMonthOfInterval, format, getYear, startOfYear, isWithinInterval, differenceInDays, eachYearOfInterval, addYears, subYears, parseISO, getOverlappingDaysInIntervals } from 'date-fns';
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
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { endOfDay } from 'date-fns/esm';

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
  flex-direction: column;
`

const Filters = styled.div`
  margin-bottom: 10px;
`

function App() {
  const [interval, setInterval] = useState(new Date())
  const [seeHistory, setSeeHistory] = useState(false)

  const dataCharts = useMemo(() => {
    if (!data) return {}
    let intervals
    let filterInterval = seeHistory
      ? { start: parseISO("2012-01-01"), end: new Date() }
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
        ? areIntervalsOverlapping( filterInterval, { start: parseISO(g.start), end: parseISO(g.end) }, { inclusive: true })
        : isWithinInterval(parseISO(g.start), filterInterval)
    }).forEach((g) => {
      if (g.state !== GameState.Dropped && g.state !== GameState.Banned) {
        g.tags.forEach((t) => {
          tagsData[t] = (tagsData[t] || 0) + (g.hours || 1)
        })
      }
      stateData[g.state] = (stateData[g.state] || 0) + 1
    })

    const dataIntervals = intervals.map((i) => {
      const gamesInInterval = data.filter((g) => g.end ? areIntervalsOverlapping(
        i, { start: parseISO(g.start), end: parseISO(g.end) }, { inclusive: true }
      ) : isWithinInterval(parseISO(g.start), i))
      const hours = gamesInInterval.reduce((acum, g) => {
        const gameInterval = {
          start: parseISO(g.start),
          end: g.end ? parseISO(g.end) : endOfDay(parseISO(g.start)),
        }
        const days = g.end ? differenceInDays(gameInterval.end, gameInterval.start) || 1 : 1
        const overlappingDays = getOverlappingDaysInIntervals(gameInterval, { start: i.start, end: i.end }) || 1
        const percentage = overlappingDays / days
        return acum + (g.hours || 0) * percentage
      }, 0)
      return {
        label: i.label,
        hours,
      }
    })

    const tagsFilteredData = Object.entries(tagsData).sort(([key1, value1], [key2, value2]) => value2 - value1).slice(0, 6)

    return {
      gamesCount: data.filter((g) => g.end ? areIntervalsOverlapping(
        filterInterval, { start: parseISO(g.start), end: parseISO(g.end) }, { inclusive: true }
      ) : isWithinInterval(parseISO(g.start), filterInterval)).length,
      hoursCount: data.filter((g) => g.end ? areIntervalsOverlapping(
        filterInterval, { start: parseISO(g.start), end: parseISO(g.end) }, { inclusive: true }
      ) : isWithinInterval(parseISO(g.start), filterInterval)).reduce((acum, g) => acum + (g.hours || 0), 0),
      hourChart: {
        labels: dataIntervals.map((di) => di.label),
        values: dataIntervals.map((di) => Math.round(di.hours)),
      },
      tagChart: {
        labels: tagsFilteredData.map(([key]) => GameTag[Number(key)]),
        values: tagsFilteredData.map(([_, value]) => value),
        hue: tagsFilteredData.map(([key]) => tagToString[key as unknown as GameTag].color)
      },
      stateChart: {
        labels: Object.keys(stateData).map((k: string) => GameState[Number(k)]),
        values: Object.values(stateData),
        hue: Object.keys(stateData).map((k) => stateInfo[k as unknown as GameState].color)
      }
    }
  }, [data, seeHistory, interval])

  const dataSource = useMemo(() => {
    if (!data) return []
    return data.map((g) => {
      const start = parseISO(g.start)
      const end = g.end ? parseISO(g.end) : undefined
      return {
        name: g.name,
        rowClassName: getYear(start) % 2 === 0 ? 'even-row' : 'odd-row',
        start: format(start, "dd/MM/yyyy"),
        end: end ? format(end, "dd/MM/yyyy") : undefined,
        state: <State state={g.state} />,
        hours: g.hours,
        achievements: g.achievements ? <Achievements obtained={g.achievements[0]} total={g.achievements[1]} /> : undefined,
        tags: <Tags tags={g.tags} />,
        score: <Score score={g.score} />,
        rawTags: g.tags,
      }
    })
  }, [data])

  const gameTags = useMemo(() => {
    return Object.keys(GameTag).filter(key => !isNaN(Number(key))).map(key => ({ text: GameTag[Number(key)], value: key }))
  }, [])

  return (
    <div className="App">
      <Row gutter={[8, 32]}>
        <ChartCol span={24}>
          <Filters>
            <div className="range-container">
              <Button disabled={seeHistory} icon={<LeftCircleOutlined />} onClick={() => setInterval(subYears(interval, 1))} />
              {seeHistory ? "-" : format(interval, "yyyy")}
              <Button disabled={seeHistory} icon={<RightCircleOutlined />} onClick={() => setInterval(addYears(interval, 1))} />
            </div>
          </Filters>
          See complete history <Switch onChange={(checked) => setSeeHistory(checked)} />
          <br />
          <div>Total Hours Played: {dataCharts.hoursCount?.toFixed(2)}</div>
          <div>Total Games Played: {dataCharts.gamesCount}</div>
        </ChartCol>
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
        pagination={false}
        rowClassName={(record) => record.rowClassName}
      >
        <Table.Column title="Name" dataIndex="name" />
        <Table.Column title="Start" dataIndex="start" />
        <Table.Column title="End" dataIndex="end" />
        <Table.Column title="State" dataIndex="state" />
        <Table.Column title="Hours" dataIndex="hours" />
        <Table.Column title="Achievements" dataIndex="achievements" />
        <Table.Column
          title="Tags"
          dataIndex="tags"
          filters={gameTags}
          onFilter={(filter, record: { rawTags: GameTag[] }) =>
            record.rawTags.includes(Number(filter))}
        />
        <Table.Column title={<ScoreHeader />} dataIndex="score" />
      </Table>
    </div>
  )
}

export default App
