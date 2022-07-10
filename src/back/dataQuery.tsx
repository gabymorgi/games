import { isAfter, isBefore, parseISO } from "date-fns";
import { useMemo, useState } from "react";
import { data as rawData, GameState, GameTag, ScoreI } from "../data";

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

export interface ParsedDataI {
  name: string;
  start: Date;
  tags: Array<GameTag>;
  state: GameState;
  end: Date;
  hours?: number;
  achievements?: [number, number];
  recomended?: "positive" | "negative" | "neutral";
  score?: ScoreI;
}

export function useQuery(initialVariables?: variablesI) {
  const [variables, setVariables] = useState<variablesI | undefined>(
    initialVariables
  );

  const parsedData: ParsedDataI[] = useMemo(() => {
    return rawData.map((game) => ({
      name: game.name,
      start: parseISO(game.start),
      tags: game.tags,
      state: game.state,
      end: game.end ? parseISO(game.end) : parseISO(game.start),
      hours: game.hours,
      achievements: game.achievements,
      score: game.score,
    }));
  }, []);

  const [data, dataLength] = useMemo(() => {
    let filteredData = parsedData;
    if (variables) {
      if (variables.filters) {
        const { name, start, end, state, tags } = variables.filters;
        filteredData = filteredData.filter((game) => {
          if (name && !game.name.toLowerCase().includes(name.toLowerCase()))
            return false;
          if (start && end) {
            //if game range is outside filter range, return false
            if ((isAfter(game.start, end) || isBefore(game.end, start)))
              return false;
          } else if (start) {
            //if game ends before filter start, return false
            if (isBefore(game.end, start)) return false;
          } else if (end) {
            //if game starts after filter end, return false
            if (isAfter(game.start, end)) return false;
          }
          if (state?.length && !state.includes(game.state)) return false;
          if (tags?.length && !tags.some((tag) => game.tags.includes(tag)))
            return false;
          return true;
        });
      }
      console.log(variables.sorter)
      if (variables.sorter) {
        const { by, direction } = variables.sorter;
        filteredData = filteredData.sort((a, b) => {
          switch (by) {
            case "name":
              if (direction === "asc") return a.name.localeCompare(b.name);
              return b.name.localeCompare(a.name);
            case "start":
              if (direction === "asc")
                return a.start.getTime() - b.start.getTime();
              return b.start.getTime() - a.start.getTime();
            case "end":
              if (direction === "asc")
                return (
                  (a.end || a.start).getTime() - (b.end || b.start).getTime()
                );
              return (
                (b.end || b.start).getTime() - (a.end || a.start).getTime()
              );
            case "state":
              if (direction === "asc")
                return a.state - b.state;
              return b.state - a.state;
            case "hours":
              if (direction === "asc") return (a.hours || 0) - (b.hours || 0);
              return (b.hours || 0) - (a.hours || 0);
            case "achievements":
              if (direction === "asc")
                return (a.achievements ? a.achievements[0] / a.achievements[1] : 0) - (b.achievements ? b.achievements[0] / b.achievements[1] : 0);
              return (b.achievements ? b.achievements[0] / b.achievements[1] : 0) - (a.achievements ? a.achievements[0] / a.achievements[1] : 0);
            case "score":
              if (direction === "asc")
                return (a.score?.finalMark || 0) - (b.score?.finalMark || 0);
              return (b.score?.finalMark || 0) - (a.score?.finalMark || 0);
          }
          return 0;
        });
      }
    }
    const length = filteredData.length;
    filteredData = filteredData.slice(
      variables?.skip || 0,
      variables?.first
        ? (variables.skip || 0) + variables.first
        : filteredData.length
    );

    return [filteredData, length];
  }, [parsedData, variables]);

  return { rawData: parsedData, data, dataLength, refetch: setVariables };
}
