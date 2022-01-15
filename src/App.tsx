import 'antd/dist/antd.css';
import { Divider } from 'antd';
import { GameTag } from './data'
import { useMemo } from 'react'
import { Tags } from './components/Tags';
import { State } from './components/State';
import { Achievements } from './components/Achievements'
import { format } from 'date-fns';
import { Score, ScoreHeader } from './components/Score'
import GlobalStyles from './styles/GlobalStyles';
import { ChartComponent } from './components/Chart';
import Table, { TableFiltersType, TablePaginationType } from './ui/Table';
import { useQuery } from './back/dataQuery';
import { filterDropdownFactoryCheckbox } from './ui/TableFIlters';

function App() {
  const { data, rawData, refetch } = useQuery()

  const dataSource = useMemo(() => {
    if (!data) return []
    return data.map((g) => {
      return {
        name: g.name,
        start: format(g.start, "dd MMM yyyy"),
        end: g.end ? format(g.end, "dd MMM yyyy") : undefined,
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
    return Object.keys(GameTag).filter(key => !isNaN(Number(key))).map(key => ({ label: GameTag[Number(key)], value: key }))
  }, [])

  console.log(data.length)

  const handleTableChange = (_pagination: TablePaginationType, filters: TableFiltersType) => {
    console.log(filters)
    refetch({
      tags_in: filters.tags?.map((tag) => Number(tag))
    })
  }

  return (
    <>
      <GlobalStyles />
      <ChartComponent data={rawData} />
      <Divider />
      <Table
        dataSource={dataSource}
        rowKey="name"
        size="small"
        onChange={handleTableChange}
        pagination={false}
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
          filterDropdown={filterDropdownFactoryCheckbox({
            options: gameTags,
          })}
        />
        <Table.Column title={<ScoreHeader />} dataIndex="score" />
      </Table>
      </>
  )
}

export default App
