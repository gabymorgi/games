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
import Table, { getPaginationProps, paginationToQuery, sorterToQuery, TableFiltersType, TablePaginationType, TableSorterType } from './ui/Table';
import { useQuery } from './back/dataQuery';
import { filterDropdownFactoryCheckbox, filterDropdownFactoryStr } from './ui/TableFIlters';

function App() {
  const { data, dataLength, rawData, refetch } = useQuery({ first: 50, orderBy: "end_desc" })

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

  const handleTableChange = (pagination: TablePaginationType, filters: TableFiltersType, sorter: TableSorterType) => {
    console.log(pagination, filters, sorter)
    refetch({
      tags_in: filters.tags?.map((tag) => Number(tag)),
      ...paginationToQuery(pagination),
      orderBy: sorterToQuery(sorter),
    })
  }

  const mockedData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <>
      <GlobalStyles />
      <ChartComponent data={rawData} />
      <Divider />
      <Table
        dataSource={mockedData}
        //rowKey="name"
        //onChange={handleTableChange}
        //pagination={getPaginationProps(dataLength)}
        pagination={false}
      >
        <Table.Column filterDropdown={filterDropdownFactoryStr()} title="Name" dataIndex="name" />
        <Table.Column sorter title="Age" dataIndex="age" />
        {/*<Table.Column sorter title="Start" dataIndex="start" />
        <Table.Column sorter defaultSortOrder="descend" title="End" dataIndex="end" />
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
        */}
      </Table>
      </>
  )
}

export default App
