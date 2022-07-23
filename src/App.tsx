import "antd/dist/antd.css";
import { useMemo, useState } from "react";
import { Tags } from "./components/Tags";
import { State } from "./components/State";
import { Achievements } from "./components/Achievements";
import { format } from "date-fns";
import { Score, ScoreHeader } from "./components/Score";
import GlobalStyles from "./styles/GlobalStyles";
import { ChartComponent } from "./components/Chart";
import Table from "./ui/Table";
import { useQuery, FiltersI, SorterI, GameI, GameWithoutId } from "./back/dataQuery";
import { Filters } from "./components/Filters";
import { FlexSection } from "./ui/Layout";
import Button from "./ui/Button";
import { DeleteFilled, EditFilled, PlusCircleFilled } from "@ant-design/icons";
import PopConfirm from "./ui/PopConfirm";
import { GameFormModal } from "./components/GameFormModal";
import { message } from "antd";
import { makeInitialCommit } from "./back/helpers";
import dotenv from 'dotenv'
dotenv.config()

const App: React.FC = () => {
  const { data, loading, refetch, createGame, deleteGame, updateGame } =
    useQuery({
      sorter: {
        by: "end",
        direction: "desc",
      },
    });

  const [selectedGame, setSelectedGame] = useState<GameI | undefined>();
  const [modalType, setModalType] = useState<"create" | "update" | undefined>();

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
        actions: (
          <FlexSection gutter={8}>
            <Button
              onClick={() => {
                setSelectedGame(g);
                setModalType("update");
              }}
              icon={<EditFilled />}
            />
            <PopConfirm
              title="Are you sure you want to delete this game?"
              onConfirm={() => deleteGame(g.id)}
              icon={<DeleteFilled />}
            >
              <Button icon={<DeleteFilled />} />
            </PopConfirm>
          </FlexSection>
        ),
      };
    });
  }, [data]);

  const tableColumns = useMemo(() => {
    return [
      { title: "Name", dataIndex: "name" },
      { title: "Start", dataIndex: "start" },
      { title: "End", dataIndex: "end" },
      { title: "State", dataIndex: "state" },
      { title: "Hours", dataIndex: "hours" },
      { title: "Achievements", dataIndex: "achievements" },
      { title: "Tags", dataIndex: "tags" },
      { title: <ScoreHeader />, dataIndex: "score" },
      {
        title: (
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => {
              setModalType("create");
            }}
            icon={<PlusCircleFilled />}
          />
          </div>
        ),
        dataIndex: "actions",
      },
    ];
  }, []);

  const handleFiltersChange = (filters?: FiltersI, sorter?: SorterI) => {
    refetch({
      filters: filters,
      sorter: sorter,
    });
  };

  const handleFinishForm = async (game: GameWithoutId) => {
    switch (modalType) {
      case "create":
        await createGame(game);
        break;
      case "update":
        if (!selectedGame) {
          message.error("No game selected");
          return
        }
        await updateGame(selectedGame.id, game);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <GlobalStyles />
      <FlexSection direction="column">
        {/* <Button onClick={() => makeInitialCommit()}>Initial commit</Button> */}
        <ChartComponent data={data} />
        <Filters onFiltersChance={handleFiltersChange} />
        <Table
          loading={loading}
          dataSource={dataSource}
          rowKey="name"
          columns={tableColumns}
        />
      </FlexSection>
      <GameFormModal
        type={modalType}
        game={selectedGame}
        onClose={() => {
          setSelectedGame(undefined);
          setModalType(undefined);
        }}
        onFinish={handleFinishForm}
      />
    </>
  );
}

export default App;
