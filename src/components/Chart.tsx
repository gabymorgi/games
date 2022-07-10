import { Chart, Line, Pie } from 'react-chartjs-2';
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
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { GameState, GameTag } from '../data';
import {
  addYears,
  areIntervalsOverlapping, 
  differenceInDays, 
  eachMonthOfInterval, 
  eachYearOfInterval, 
  endOfDay,
  endOfMonth, 
  endOfYear, 
  format, 
  getOverlappingDaysInIntervals, 
  getYear, 
  isWithinInterval, 
  parseISO, 
  startOfYear, 
  subYears } from 'date-fns';
import { stateInfo } from './State';
import { tagToString } from './Tags';
import Button from '../ui/Button';
import Switch from '../ui/Switch';
import * as styles from '../styles/ChartStyles';
import { FlexSection } from '../ui/Layout';
import { ParsedDataI } from '../back/dataQuery';
import Card from '../ui/Card';

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

const HoursPlayedOptions = {
  maintainAspectRatio: false,
  color: "#FFF",
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Hours Played",
      color: "#EEE",
      font: {
        size: 24,
      },
    }
  },
  scales: {
    y: {
      ticks: {
        color: "#EEE",
        font: {
          size: 14,
        },
      },
      grid: {
        color: "#444",
      },
    },
    x: {
      ticks: {
        color: "#EEE",
        font: {
          size: 14,
        },
      },
      grid: {
        color: "#444",
      },
    }
  }
}

const GameStateOptions = {
  maintainAspectRatio: false,
  color: "#FFF",
  plugins: {
    title: {
      display: true,
      text: "Game State",
      color: "#EEE",
      font: {
        size: 24,
      },
    },
    legend: {
      labels: {
        font: {
          size: 14,
        },
      },
    },
  },
}

const GameTagsOptions = {
  maintainAspectRatio: false,
  color: "#FFF",
  plugins: {
    title: {
      display: true,
      text: "Most Played Tags",
      color: "#EEE",
      font: {
        size: 24,
      },
    },
    legend: {
      labels: {
        font: {
          size: 14,
        },
      },
    },
  },
}

interface ChartProps {
  data: ParsedDataI[]
}

const MAX_YEAR = getYear(new Date())
const MIN_YEAR = 2012

export const ChartComponent: React.FC<ChartProps> = (props) => {
  const [interval, setInterval] = useState(new Date())
  const [seeHistory, setSeeHistory] = useState(false)

  const dataCharts = useMemo(() => {
    if (!props.data) return {}
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
    props.data.filter((g) => {
      return g.end
        ? areIntervalsOverlapping( filterInterval, { start: g.start, end: g.end }, { inclusive: true })
        : isWithinInterval(g.start, filterInterval)
    }).forEach((g) => {
      if (g.state !== GameState.Dropped && g.state !== GameState.Banned) {
        g.tags.forEach((t) => {
          const gameInterval = {
            start: g.start,
            end: g.end ? g.end : endOfDay(g.start),
          }
          const days = g.end ? differenceInDays(gameInterval.end, gameInterval.start) || 1 : 1
          const overlappingDays = getOverlappingDaysInIntervals(gameInterval, { start: filterInterval.start, end: filterInterval.end }) || 1
          const percentage = overlappingDays / days
          //return acum + (g.hours || 0) * percentage
          tagsData[t] = (tagsData[t] || 0) + (g.hours || 0) * percentage
        })
      }
      stateData[g.state] = (stateData[g.state] || 0) + 1
    })

    const dataIntervals = intervals.map((i) => {
      const gamesInInterval = props.data.filter((g) => g.end ? areIntervalsOverlapping(
        i, { start: g.start, end: g.end }, { inclusive: true }
      ) : isWithinInterval(g.start, i))
      const hours = gamesInInterval.reduce((acum, g) => {
        const gameInterval = {
          start: g.start,
          end: g.end ? g.end : endOfDay(g.start),
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
      gamesCount: props.data.filter((g) => g.end ? areIntervalsOverlapping(
        filterInterval, { start: g.start, end: g.end }, { inclusive: true }
      ) : isWithinInterval(g.start, filterInterval)).length,
      hoursCount: props.data.filter((g) => g.end ? areIntervalsOverlapping(
        filterInterval, { start: g.start, end: g.end }, { inclusive: true }
      ) : isWithinInterval(g.start, filterInterval)).reduce((acum, g) => acum + (g.hours || 0), 0),
      hourChart: {
        labels: dataIntervals.map((di) => di.label),
        values: dataIntervals.map((di) => Math.round(di.hours)),
      },
      tagChart: {
        labels: tagsFilteredData.map(([key]) => GameTag[Number(key)]),
        values: tagsFilteredData.map(([_, value]) => value),
        color: tagsFilteredData.map(([key]) => tagToString[key as unknown as GameTag].color)
      },
      stateChart: {
        labels: Object.keys(stateData).map((k: string) => GameState[Number(k)]),
        values: Object.values(stateData),
        color: Object.keys(stateData).map((k) => stateInfo[k as unknown as GameState].color)
      }
    }
  }, [props.data, seeHistory, interval])

  return (
    <FlexSection direction='column'>
      <styles.Filters>
        <div className="filters">
          <div className="range-container">
            <Button disabled={seeHistory || getYear(interval) <= MIN_YEAR} icon={<LeftCircleOutlined />} onClick={() => setInterval(subYears(interval, 1))} />
            <span className="value">{seeHistory ? "-" : format(interval, "yyyy")}</span>
            <Button disabled={seeHistory || getYear(interval) >= MAX_YEAR} icon={<RightCircleOutlined />} onClick={() => setInterval(addYears(interval, 1))} />
          </div>
          <div className="history">
            <span>See complete history</span>&nbsp;<Switch onChange={(checked) => setSeeHistory(checked)} />
          </div>
        </div>
        <div className="totals">
          <div>Total Hours Played: <span className="value">{Math.round(dataCharts.hoursCount || 0)}</span></div>
          <div>Total Games Played: <span className="value">{dataCharts.gamesCount || 0}</span></div>
        </div>
      </styles.Filters>
      <styles.PieCharts>
        <Card>
          {dataCharts.stateChart ? (
            <div>
              <Pie
                data={{
                  labels: dataCharts.stateChart?.labels,
                  datasets: [
                    {
                      data: dataCharts.stateChart.values,
                      backgroundColor: dataCharts.stateChart.color.map((h) => `${h}50`),
                      borderColor: dataCharts.stateChart.color,
                      borderWidth: 3,
                    },
                  ],
                }}
                options={GameStateOptions}
              />
            </div>
          ) : undefined}
        </Card>
        <Card>
          {dataCharts.tagChart ? (
            <div>
              <Pie
                data={{
                  labels: dataCharts.tagChart?.labels,
                  datasets: [
                    {
                      data: dataCharts.tagChart.values,
                      backgroundColor: dataCharts.tagChart.color.map((c) => `${c}50`),
                      borderColor: dataCharts.tagChart.color,
                      borderWidth: 3,
                    },
                  ],
                }}
                options={GameTagsOptions}
              />
            </div>
          ) : undefined}
        </Card>
      </styles.PieCharts>
      <styles.LineChart>
        <Card>
          {dataCharts.hourChart ? <Line
              datasetIdKey='id'
              data={{
                labels: dataCharts.hourChart.labels,
                datasets: [
                  {
                    
                    data: dataCharts.hourChart.values,
                    fill: true,
                    borderColor: "#8F8",
                    cubicInterpolationMode: "monotone",
                  }
                ]
              }}
              //change grid color to blue
              options={HoursPlayedOptions}
            /> : undefined }
          </Card>
      </styles.LineChart>
    </FlexSection>
  )
}
