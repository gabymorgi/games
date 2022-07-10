import "antd/dist/antd.css";
import { useMemo } from "react";
import { Tags } from "./components/Tags";
import { State } from "./components/State";
import { Achievements } from "./components/Achievements";
import { format } from "date-fns";
import { Score, ScoreHeader } from "./components/Score";
import GlobalStyles from "./styles/GlobalStyles";
import { ChartComponent } from "./components/Chart";
import Table from "./ui/Table";
import { useQuery, FiltersI, SorterI } from "./back/dataQuery";
import { Filters } from "./components/Filters";
import { FlexSection } from "./ui/Layout";

function App() {
  const { data, rawData, refetch } = useQuery({
    sorter: {
      by: "end",
      direction: "desc",
    },
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
    sorter?: SorterI,
  ) => {
    console.log(filters, sorter);
    refetch({
      filters: filters,
      sorter: sorter,
    });
  };

  return (
    <>
      <GlobalStyles />
      <FlexSection direction="column">
        <ChartComponent data={rawData} />
        <Filters onFiltersChance={handleFiltersChange} />
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
      </FlexSection>
    </>
  );
}

export default App;
