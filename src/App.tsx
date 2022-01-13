import 'antd/dist/antd.css';
import { Divider } from 'antd';
import { data, GameTag } from './data'
import { useMemo } from 'react'
import { Tags } from './components/Tags';
import { State } from './components/State';
import { Achievements } from './components/Achievements'
import { format, getYear, parseISO } from 'date-fns';
import { Score, ScoreHeader } from './components/Score'
import GlobalStyles from './styles/GlobalStyles';
import { ChartComponent } from './components/Chart';
import Table from './ui/Table';

function App() {
  const dataSource = useMemo(() => {
    if (!data) return []
    return data.map((g) => {
      const start = parseISO(g.start)
      const end = g.end ? parseISO(g.end) : undefined
      return {
        name: g.name,
        rowClassName: getYear(start) % 2 === 0 ? 'even-row' : 'odd-row',
        start: format(start, "dd MMM yyyy"),
        end: end ? format(end, "dd MMM yyyy") : undefined,
        state: <State state={g.state} />,
        hours: g.hours,
        achievements: g.achievements ? <Achievements obtained={g.achievements[0]} total={g.achievements[1]} /> : undefined,
        tags: <Tags tags={g.tags} />,
        score: <Score score={g.score} />,
        rawTags: g.tags,
      }
    })
  }, [])

  const gameTags = useMemo(() => {
    return Object.keys(GameTag).filter(key => !isNaN(Number(key))).map(key => ({ text: GameTag[Number(key)], value: key }))
  }, [])

  return (
    <>
      <GlobalStyles />
      <ChartComponent data={data} />
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
        <Table.Column width={50} title="Hours" dataIndex="hours" />
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
      </>
  )
}

export default App
