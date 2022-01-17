import { isBefore, parseISO } from 'date-fns'
import { useMemo, useState } from 'react'
import { data as rawData, GameState, GameTag, ScoreI } from '../data'

interface variablesI {
  tags_in?: Number[]
  skip?: number
  first?: number
  orderBy?: string
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

export function useQuery(initialVariables?: variablesI) {
  const [variables, setVariables] = useState<variablesI | undefined>(initialVariables)

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
  
  const [data, dataLength] = useMemo(() => {
    let filteredData = parsedData
    if (variables?.tags_in?.length) {
      filteredData = filteredData.filter((game) => variables.tags_in?.some((tag) => game.tags.includes(tag as GameTag)))
    }
    if (variables?.orderBy) {
      switch (variables.orderBy) {
        case 'start_asc':
          filteredData = filteredData.sort((a, b) => isBefore(b.start, a.start) ? 1 : -1)
          break
        case 'start_desc':
          filteredData = filteredData.sort((a, b) => isBefore(a.start, b.start) ? 1 : -1)
          break
        case 'end_asc':
          filteredData = filteredData.sort((a, b) => isBefore(b.end || b.start, a.end || a.start) ? 1 : -1)
          break
        case 'end_desc':
          filteredData = filteredData.sort((a, b) => isBefore(a.end || a.start, b.end || b.start) ? 1 : -1)
          break
      }
    }
    filteredData = filteredData.slice(variables?.skip || 0, variables?.first ? (variables.skip || 0) + variables.first : filteredData.length)

    return [filteredData, filteredData.length]
  }, [parsedData, variables])

  return { rawData: parsedData, data, dataLength, refetch: setVariables }
}
