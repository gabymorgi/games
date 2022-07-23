import { data as rawData } from "../data";

import { doc, Timestamp, writeBatch } from "firebase/firestore";
import { db } from "./firebase";
import { isAfter, isBefore, parseISO } from "date-fns";
import { FiltersI, GameI, GameWithoutId, SorterI, stateOrder } from "./dataQuery";

export interface GameCollectionItem {
  name: string;
  start: Timestamp;
  tags: Array<string>;
  state: string;
  end: Timestamp | null;
  hours: number | null;
  achievements: [number, number] | null;
  score: {
    content: number | null;
    lore: number | null;
    mechanics: number | null;
    bosses: number | null;
    controls: number | null;
    music: number | null;
    graphics: number | null;
    extra: Array<{ bias: number; info: string }> | null;
    finalMark: number;
  } | null;
}

export function filter(data: GameI[], filters: FiltersI): GameI[] {
  const { name, start, end, state, tags } = filters;
  return data.filter((game) => {
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

export function sort(data: GameI[], sorter: SorterI): GameI[] {
  const { by, direction } = sorter;
  return data.sort((a, b) => {
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
          return stateOrder[a.state] - stateOrder[b.state];
        return stateOrder[b.state] - stateOrder[a.state];
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

export function gameToFirebaseItem(game: GameWithoutId): GameCollectionItem {
  return {
    name: game.name,
    start: Timestamp.fromDate(game.start),
    tags: game.tags,
    state: game.state,
    end: game.end ? Timestamp.fromDate(game.end) : null,
    hours: game.hours || null,
    achievements: game.achievements || null,
    score: game.score ? {
      content: game.score.content || null,
      lore: game.score.lore || null,
      mechanics: game.score.mechanics || null,
      bosses: game.score.bosses || null,
      controls: game.score.controls || null,
      music: game.score.music || null,
      graphics: game.score.graphics || null,
      extra: game.score.extra ? game.score.extra.map((extra) => ({
        bias: extra.bias,
        info: extra.info,
      })) : null,
      finalMark: game.score.finalMark,
    } : null,
  }
}

export function autoId(): string {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let autoId = '';
  for (let i = 0; i < 20; i++) {
    autoId += CHARS.charAt(
      Math.floor(Math.random() * CHARS.length)
    )
  }
  return autoId;
}

export const makeInitialCommit = async () => {
  console.log("makeInitialCommit");
  const batch = writeBatch(db);
  rawData.forEach(game => {
    batch.set(doc(db, "games", autoId()), {
      name: game.name,
      start: Timestamp.fromDate(parseISO(game.start)),
      tags: game.tags,
      state: game.state,
      end: game.end ? Timestamp.fromDate(parseISO(game.end)) : null,
      hours: game.hours || null,
      achievements: game.achievements || null,
      score: game.score ? {
        content: game.score.content || null,
        lore: game.score.lore || null,
        mechanics: game.score.mechanics || null,
        bosses: game.score.bosses || null,
        controls: game.score.controls || null,
        music: game.score.music || null,
        graphics: game.score.graphics || null,
        extra: game.score.extra ? game.score.extra.map((extra) => ({
          bias: extra.bias || null,
          info: extra.info || null,
        })) : null,
        finalMark: game.score.finalMark || null,
      } : null,
    });
  });
  await batch.commit();
  console.log("makeInitialCommit done");
}