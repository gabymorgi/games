import "antd/dist/antd.css";
import { Divider } from "antd";
import { GameTag } from "./data";
import { useMemo } from "react";
import { Tags } from "./components/Tags";
import { State } from "./components/State";
import { Achievements } from "./components/Achievements";
import { format } from "date-fns";
import { Score, ScoreHeader } from "./components/Score";
import GlobalStyles from "./styles/GlobalStyles";
import { ChartComponent } from "./components/Chart";
import Table, {
  paginationToQuery,
  sorterToQuery,
  TableFiltersType,
  TablePaginationType,
  TableSorterType,
} from "./ui/Table";
import { useQuery, FiltersI } from "./back/dataQuery";
import React from "react";
import { Filters } from "./components/Filters";

const gameTags = Object.keys(GameTag)
  .filter((key) => !isNaN(Number(key)))
  .map((key) => ({ label: GameTag[Number(key)], value: key }));
const sasdf = { type: "checkbox", options: gameTags };

function App() {
  const { data, dataLength, rawData, refetch } = useQuery({
    first: 48,
    orderBy: "end_desc",
  });

  const dataSource = useMemo(() => {
    if (!data) return [];
    return data.map((g) => {
      return {
        name: g.name,
        start: format(g.start, "dd MMM yyyy"),
        end: g.end ? format(g.end, "dd MMM yyyy") : undefined,
        state: <State state={g.state} />,
        hours: g.hours,
        achievements: g.achievements ? (
          <Achievements
            obtained={g.achievements[0]}
            total={g.achievements[1]}
          />
        ) : undefined,
        tags: <Tags tags={g.tags} />,
        score: <Score score={g.score} />,
        rawTags: g.tags,
      };
    });
  }, [data]);

  const handleFiltersChange = (
    filters?: FiltersI,
    sorter?: string,
  ) => {
    console.log(filters, sorter);
    refetch({
      filters: filters,
      orderBy: sorter,
    });
  };

  return (
    <>
      <GlobalStyles />
      <ChartComponent data={rawData} />
      <Divider style={{ borderColor: 'white' }} />
      <Filters onFiltersChance={handleFiltersChange} style={{ marginBottom: '24px' }} />
      <Table
        dataSource={dataSource}
        rowKey="name"
        columns={[
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "Start",
            dataIndex: "start",
          },
          {
            title: "End",
            dataIndex: "end",
          },
          {
            title: "State",
            dataIndex: "state",
          },
          {
            title: "Hours",
            dataIndex: "hours",
          },
          {
            title: "Achievements",
            dataIndex: "achievements",
          },
          {
            title: "Tags",
            dataIndex: "tags",
          },
          {
            title: <ScoreHeader />,
            dataIndex: "score",
          },
        ]}
      />
    </>
  );
}

export default App;
