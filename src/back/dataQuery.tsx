import { parseISO } from 'date-fns'
import { useMemo, useState } from 'react'
import { data as rawData, GameState, GameTag, ScoreI } from '../data'

interface variablesI {
  tags_in?: Number[]
}

export interface ParsedDataI {
  name: string;
  start: Date;
  tags: Array<GameTag>;
  state: GameState;
  end?: Date;
  hours?: number;
  achievements?: [number, number];
  recomended?: "positive" | "negative" | "neutral";
  score?: ScoreI;
}

export function useQuery() {
  const [variables, setVariables] = useState<variablesI>() 
  const parsedData: ParsedDataI[] = useMemo(() => {
    return rawData.map((game) => ({
      name: game.name,
      start: parseISO(game.start),
      tags: game.tags,
      state: game.state,
      end: game.end ? parseISO(game.end) : undefined,
      hours: game.hours,
      achievements: game.achievements,
      recomended: game.recomended,
      score: game.score,
    }))
  }, [])
  const data = useMemo(() => {
    console.log('aqui', variables)
    let filteredData = parsedData
    if (variables?.tags_in?.length) {
      filteredData = filteredData.filter((game) => {
        console.log(variables.tags_in?.some((tag) => game.tags.includes(tag as GameTag)))
        return variables.tags_in?.some((tag) => game.tags.includes(tag as GameTag))
      })
    }
    return filteredData
  }, [parsedData, variables])
  console.log(data.length)
  return { rawData: parsedData, data, refetch: setVariables }
}
