import { addDoc, collection, deleteDoc, doc, getDocs, UpdateData, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "./firebase";
import { filter, GameCollectionItem, gameToFirebaseItem, sort } from "./helpers";

export enum GameTag {
  Action = 'Action',
  Board = 'Board',
  Collectathon = 'Collectathon',
  Cooperative = 'Cooperative',
  Exploration = 'Exploration',
  Idle = 'Idle',
  Horror = 'Horror',
  Metroidvania = 'Metroidvania',
  MuchoTexto = 'MuchoTexto',
  Platformer = 'Platformer',
  Precision = 'Precision',
  Programing = 'Programing',
  PointAndClick = 'PointAndClick',
  Puzzles = 'Puzzles',
  Roguelike = 'Roguelike',
  RPG = 'RPG',
  Rythm = 'Rythm',
  TowerDefense = 'TowerDefense',
  TurnBased = 'TurnBased',
}

export enum GameState {
  Banned = 'Banned',
  Dropped = 'Dropped',
  Playing = 'Playing',
  Won = 'Won',
  Completed = 'Completed',
  Achievements = 'Achievements',
}

export const stateOrder: {
  [key in GameState]: number
} = {
  [GameState.Banned]: 0,
  [GameState.Dropped]: 1,
  [GameState.Playing]: 2,
  [GameState.Won]: 3,
  [GameState.Completed]: 4,
  [GameState.Achievements]: 5
}

export interface ScoreI {
  content?: number;
  lore?: number;
  mechanics?: number;
  bosses?: number;
  controls?: number;
  music?: number;
  graphics?: number;
  extra?: Array<{ bias: number; info: string }>;
  finalMark: number;
}

export interface FiltersI {
  name?: string;
  start?: Date;
  end?: Date;
  state?: GameState[];
  tags?: GameTag[];
}

export interface SorterI {
  by: "name" | "start" | "end" | "state" | "hours" | "achievements" | "score";
  direction: "asc" | "desc";
}

export interface variablesI {
  filters?: FiltersI;
  skip?: number;
  first?: number;
  sorter?: SorterI;
}

export interface GameWithoutId {
  name: string;
  start: Date;
  tags: Array<GameTag>;
  state: GameState;
  end: Date;
  hours?: number;
  achievements?: [number, number];
  score?: ScoreI;
}

export interface GameI extends GameWithoutId {
  id: string;
}

export function useQuery(initialVariables?: variablesI) {
  const [variables, setVariables] = useState<variablesI | undefined>(
    initialVariables
  );
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState<GameI[]>();
  const getGames = useCallback(async () => {
      setLoading(true);
      const data = await getDocs(collection(db, "games"));
      setParsedData(data.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          name: data.name,
          start: data.start.toDate(),
          tags: data.tags,
          state: data.state,
          end: data.end ? data.end.toDate() : data.start.toDate(),
          hours: data.hours,
          achievements: data.achievements,
          score: data.score,
        }
      }));
      setLoading(false);
  }, []);

  useEffect(() => {
    getGames();
  }, []);

  const createGame = async (game: GameWithoutId) => {
    const doc = await addDoc(collection(db, "games"), gameToFirebaseItem(game));
    setParsedData([...(parsedData || []), { ...game, id: doc.id }]);
    return doc.id;
  }

  const updateGame = async (gameId: string, game: GameWithoutId) => {
    const gameDoc = doc(db, "games", gameId)
    await updateDoc(gameDoc, gameToFirebaseItem(game) as UpdateData<GameCollectionItem>);
    setParsedData([...(parsedData || []).filter((g) => g.id !== gameId), { ...game, id: gameId }]);
  }

  const deleteGame = async (gameId: string) => {
    const gameDoc = doc(db, "games", gameId)
    await deleteDoc(gameDoc);
    setParsedData([...(parsedData || []).filter((g) => g.id !== gameId)]);
  }

  const [data, dataLength] = useMemo(() => {
    if (!parsedData) return [undefined, 0];
    let data = parsedData
    if (variables) {
      if (variables.filters) {
        data = filter(data, variables.filters);
      }
      if (variables.sorter) {
        data = sort(data, variables.sorter);
      }
    }
    const length = data?.length;
    data = data?.slice(
      variables?.skip || 0,
      variables?.first
        ? (variables.skip || 0) + variables.first
        : data.length
    );

    return [data, length];
  }, [parsedData, variables]);

  return {
    data,
    dataLength,
    loading,
    refetch: setVariables,
    createGame,
    updateGame,
    deleteGame,
  };
}
