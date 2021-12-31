export enum GameTag {
    Action,
    Board,
    Collectathon,
    Cooperative,
    Exploration,
    Idle,
    Horror,
    Metroidvania,
    MuchoTexto,
    Platformer,
    Precision,
    Programing,
    PointAndClick,
    Puzzles,
    Roguelike,
    RPG,
    Rythm,
    TowerDefense,
    TurnBased,
}
export enum GameState { Banned, Abandoned, Playing, Won, Completed, Achievements }

export interface ScoreI {
    content?: number
    lore?: number
    mechanics?: number
    bosses?: number
    controls?: number
    music?: number
    graphics?: number
    extra?: Array<{ bias: number; info: string }>
}

/*
    extra:
        precision:
            dark world
        metroidvania
            map marker
*/

export const data: Array<{
    name: string
    start: string
    tags: Array<GameTag>
    state: GameState
    end?: string
    hours?: number
    achievements?: [number, number]
    recomended?: 'positive' | 'negative' | 'neutral'
    score?: ScoreI
}> = [
    {
        name: "Haiki",
        start: "2021-12-30",
        state: GameState.Playing,
        tags: [GameTag.Precision, GameTag.Platformer],
    }, {
        name: "Fenix Rage",
        start: "2021-12-29",
        state: GameState.Playing,
        tags: [GameTag.Precision, GameTag.Platformer],
    }, {
        name: "Dojoran",
        start: "2021-12-29",
        state: GameState.Playing,
        tags: [GameTag.Precision, GameTag.Platformer],
    }, {
        name: "Disc room",
        start: "2021-12-27",
        end: "2021-12-27",
        state: GameState.Won,
        tags: [GameTag.Precision],
    }, {
        name: "Sockventure",
        start: "2021-12-24",
        state: GameState.Playing,
        tags: [GameTag.Precision, GameTag.Platformer],
        score: {
            content: 9,
            lore: 4,
            mechanics: 8,
            controls: 10,
            music: 6,
            graphics: 7,
        }
    }, {
        name: "Mini Ghost",
        start: "2021-12-23",
        state: GameState.Banned,
        tags: [GameTag.Metroidvania],
        score: {
            mechanics: 2,
            controls: 2,
            music: 1,
            graphics: 2,
        }
    }, {
        name: "Blitz Breaker",
        start: "2021-12-22",
        state: GameState.Completed,
        tags: [GameTag.Precision],
        recomended: "positive",
        score: {
            content: 6,
            lore: 2,
            mechanics: 5,
            bosses: 5,
            controls: 8,
            music: 5,
            graphics: 4,
        }
    }, {
        name: "Gato Roboto",
        start: "2021-12-22",
        end: "2021-12-23",
        hours: 2.8,
        achievements: [7, 12],
        state: GameState.Won,
        tags: [GameTag.Metroidvania],
        score: {
            content: 4,
            lore: 3,
            mechanics: 4,
            controls: 8,
            music: 4,
            graphics: 3,
        }
    }, {
        name: "Press any button",
        start: "2021-12-17",
        end: "2021-12-17",
        hours: 1.3,
        achievements: [5, 5],
        state: GameState.Achievements,
        tags: [GameTag.MuchoTexto],
    }, {
        name: "Milli & Greg",
        start: "2021-12-16",
        end: "2021-12-21",
        hours: 2.7,
        achievements: [13, 13],
        state: GameState.Achievements,
        tags: [GameTag.Precision, GameTag.Platformer],
        score: {
            content: 6,
            lore: 3,
            mechanics: 4,
            controls: 9,
            music: 7,
            graphics: 5,
        }
    }, {
        name: "Neon abyss",
        start: "2021-12-11",
        hours: 3.8,
        achievements: [5, 35],
        state: GameState.Abandoned,
        tags: [GameTag.Roguelike, GameTag.Platformer],
    }, {
        name: "Gravitas",
        start: "2021-12-11",
        hours: 0.5,
        achievements: [7, 20],
        state: GameState.Abandoned,
        tags: [GameTag.Puzzles]
    }, {
        name: "Dead Dungeon",
        start: "2021-12-10",
        end: "2021-12-11",
        hours: 1.5,
        achievements: [20, 20],
        tags: [GameTag.Platformer, GameTag.Precision],
        state: GameState.Achievements,
        score: {
            content: 1,
            lore: 1,
            mechanics: 1,
            bosses: 3,
            controls: 4,
            music: 5,
            graphics: 4,
        }
    }, {
        name: "SteamWorld dig",
        start: "2021-12-10",
        hours: 1,
        achievements: [2, 24],
        state: GameState.Abandoned,
        tags: [GameTag.Metroidvania],
    }, {
        name: "SteamWorld dig 2",
        start: "2021-12-08",
        end: "2021-12-10",
        hours: 12.4,
        achievements: [26, 34],
        state: GameState.Won,
        tags: [GameTag.Metroidvania],
        score: {
            content: 8,
            lore: 6,
            mechanics: 8,
            bosses: 4,
            controls: 8,
            music: 6,
            graphics: 8,
        }
    }, {
        name: "Grapple Force Rena",
        start: "2021-11-30",
        hours: 1,
        achievements: [1, 41],
        state: GameState.Abandoned,
        tags: [GameTag.Platformer],
    }, {
        name: "Magicat",
        start: "2021-11-30",
        end: "2021-12-08",
        hours: 14.6,
        achievements: [24, 24],
        state: GameState.Achievements,
        tags: [GameTag.Platformer],
        score: {
            content: 8,
            lore: 4,
            mechanics: 5,
            bosses: 5,
            controls: 7,
            music: 5,
            graphics: 5,
        }
    }, {
        name: "It takes two",
        start: "2021-12-04",
        hours: 2.9,
        achievements: [2, 20],
        state: GameState.Playing,
        tags: [GameTag.Platformer, GameTag.Cooperative, GameTag.Puzzles],
    }, {
        name: "Quickly Quackley",
        start: "2021-11-29",
        end: "2021-11-30",
        hours: 0.9,
        state: GameState.Won,
        tags: [GameTag.Platformer, GameTag.Precision],
        score: {
            content: 4,
            lore: 4,
            mechanics: 4,
            controls: 6,
            music: 4,
            graphics: 4,
        }
    }, {
        name: "Unbound: Worlds Apart",
        start: "2021-11-27",
        end: "2021-11-28",
        hours: 6.8,
        achievements: [36, 36],
        state: GameState.Achievements,
        tags: [GameTag.Platformer, GameTag.Puzzles],
        score: {
            content: 8,
            lore: 6,
            mechanics: 8,
            bosses: 8,
            controls: 8,
            music: 6,
            graphics: 10,
        }
    }, {
        name: "Blue Fire",
        start: "2021-11-27",
        hours: 1,
        state: GameState.Banned,
        tags: [GameTag.Platformer],
    }, {
        name: "Astalon: tears of the earth",
        start: "2021-11-21",
        end: "2021-11-27",
        hours: 26.8,
        achievements: [30, 30],
        state: GameState.Achievements,
        tags: [GameTag.Metroidvania, GameTag.Platformer],
        score: {
            content: 10,
            lore: 6,
            mechanics: 8,
            bosses: 6,
            controls: 8,
            music: 10,
            graphics: 8,
            extra: [
                { bias: 1, info: "good map" },
                { bias: -0.5, info: "broken abilities, or useless" },
                { bias: -0.5, info: "boring characters" }
            ]
        }
    }, {
        name: "Luciform",
        start: "2021-11-21",
        hours: 1.3,
        achievements: [4, 14],
        state: GameState.Abandoned,
        tags: [GameTag.Precision],
    }, {
        name: "Dadish 2",
        start: "2021-11-21",
        end: "2021-11-27",
        hours: 1.8,
        achievements: [9, 9],
        state: GameState.Achievements,
        tags: [GameTag.Platformer],
    }, {
        name: "A hole new world",
        start: "2021-11-16",
        hours: 0.1,
        achievements: [4, 38],
        state: GameState.Banned,
        tags: [GameTag.Action, GameTag.Platformer],
    }, {
        name: "Kaze and the wild masks",
        start: "2021-11-07",
        end: "2021-11-15",
        hours: 9.5,
        achievements: [25, 25],
        state: GameState.Achievements,
        tags: [GameTag.Platformer, GameTag.Collectathon],
        score: {
            content: 8,
            lore: 6,
            mechanics: 10,
            bosses: 8,
            controls: 10,
            music: 8,
            graphics: 10,
        }
    }, {
        name: "Cat quest II",
        start: "2021-10-30",
        end: "2021-11-16",
        hours: 9.7,
        achievements: [6, 9],
        state: GameState.Completed,
        tags: [GameTag.RPG, GameTag.Action],
    }, {
        name: "Cat quest",
        start: "2021-10-29",
        end: "2021-10-30",
        hours: 7.6,
        achievements: [5, 12],
        state: GameState.Completed,
        tags: [GameTag.RPG, GameTag.Action],
    }, {
        name: "Toodee and topdee",
        start: "2021-10-27",
        hours: 1.8,
        achievements: [3, 20],
        state: GameState.Abandoned,
        tags: [GameTag.Puzzles]
    }, {
        name: "Axiom verge 2",
        start: "2021-10-20",
        end: "2021-11-07",
        hours: 10.4,
        state: GameState.Won,
        tags: [GameTag.Exploration],
        score: {
            content: 6,
            lore: 6,
            mechanics: 4,
            bosses: 1,
            controls: 6,
            music: 8,
            graphics: 6,
            extra: [
                { bias: -1, info: "Bosses are optional" },
                { bias: -1, info: "There's no way to lose on bosses" },
                { bias: -1, info: "Weapons are not great" },
                { bias: -1, info: "You don't even play with main character becase it's awfull and nerfed" },
                { bias: -1, info: "Abilities break mechanics, or have ocassional use" },
            ]
        }
    }, {
        name: "Super Magbot",
        start: "2021-10-08",
        end: "2021-11-21",
        hours: 9.2,
        achievements: [15, 32],
        state: GameState.Completed,
        tags: [GameTag.Precision, GameTag.Platformer],
        score: {
            content: 10,
            lore: 6,
            mechanics: 10,
            bosses: 10,
            controls: 8,
            music: 6,
            graphics: 6,
        }
    }, {
        name: "SunBlaze",
        start: "2021-10-02",
        end: "2021-10-11",
        hours: 7.4,
        achievements: [21, 33],
        state: GameState.Completed,
        tags: [GameTag.Precision, GameTag.Platformer],
        score: {
            content: 10,
            lore: 5,
            mechanics: 8,
            controls: 10,
            music: 6,
            graphics: 6,
        }
    }, {
        name: "Sir Lovelot",
        start: "2021-09-29",
        end: "2021-09-30",
        hours: 4.3,
        achievements: [20, 20],
        state: GameState.Achievements,
        tags: [GameTag.Platformer, GameTag.Collectathon],
        score: {
            content: 4,
            lore: 2,
            mechanics: 4,
            bosses: 4,
            controls: 8,
            music: 4,
            graphics: 6,
        }
    }, {
        name: "ScourgeBringer",
        start: "2021-09-23",
        hours: 2.8,
        achievements: [13, 42],
        state: GameState.Abandoned,
        tags: [GameTag.Roguelike],
    }, {
        name: "Greak memories of azur",
        start: "2021-09-23",
        hours: 0.6,
        achievements: [1, 24],
        state: GameState.Abandoned,
        tags: [GameTag.Platformer, GameTag.Action],
    }, {
        name: "Evergate",
        start: "2021-09-18",
        end: "2021-09-26",
        hours: 6.3,
        achievements: [14, 50],
        state: GameState.Completed,
        tags: [GameTag.Platformer, GameTag.Puzzles],
        score: {
            content: 6,
            lore: 6,
            mechanics: 8,
            controls: 8,
            graphics: 8,
            extra: [
                { bias: -2, info: "Power-ups breaks completely the game, Even the ones that you get at the very beginning" }
            ]
        }
    }, {
        name: "Deltarune",
        start: "2021-09-17",
        end: "2021-10-08",
        state: GameState.Won,
        tags: [GameTag.RPG],
    }, {
        name: "Hades",
        start: "2021-08-08",
        end: "2021-09-22",
        hours: 88.9,
        achievements: [49, 49],
        state: GameState.Achievements,
        tags: [GameTag.Roguelike, GameTag.Action],
    }, {
        name: "Tetris effect",
        start: "2021-08-19",
        end: "2021-08-20",
        hours: 1.8,
        achievements: [14, 43],
        state: GameState.Won,
        tags: [GameTag.Puzzles],
    }, {
        name: "Aviary attorney",
        start: "2021-07-28",
        end: "2021-08-07",
        hours: 15.8,
        state: GameState.Completed,
        tags: [GameTag.MuchoTexto]
    }, {
        name: "Sojourn",
        start: "2021-07-19",
        end: "2021-07-30",
        hours: 0.8,
        achievements: [3, 16],
        state: GameState.Abandoned,
        tags: [GameTag.Puzzles],
    }, {
        name: "Never give up",
        start: "2021-07-14",
        end: "2021-07-26",
        hours: 13.3,
        achievements: [39, 49],
        state: GameState.Completed,
        tags: [GameTag.Precision, GameTag.Platformer],
        score: {
            content: 8,
            lore: 4,
            mechanics: 6,
            bosses: 8,
            controls: 4,
            music: 6,
            graphics: 6,
            extra: [{ bias: -1, info: "Colliders"}]
        }
    }, {
        name: "Migthy gunvolt burst",
        start: "2021-07-14",
        hours: 0.6,
        achievements: [2, 31],
        state: GameState.Abandoned,
        tags: [GameTag.Action, GameTag.Platformer],
    }, {
        name: "Skul the hero slayer",
        start: "2021-07-13",
        hours: 1.5,
        achievements: [2, 60],
        state: GameState.Abandoned,
        tags: [GameTag.Roguelike],
    }, {
        name: "Rite",
        start: "2021-07-11",
        end: "2021-07-13",
        hours: 3.4,
        achievements: [5, 7],
        state: GameState.Won,
        tags: [GameTag.Precision],
        score: {
            content: 2,
            lore: 2,
            mechanics: 4,
            bosses: 2,
            controls: 10,
            music: 6,
            graphics: 10,
        }
    }, {
        name: "Portal reload",
        start: "2021-07-11",
        end: "2021-07-12",
        hours: 2.3,
        state: GameState.Abandoned,
        tags: [GameTag.Puzzles],
    }, {
        name: "Inmost",
        start: "2021-07-10",
        hours: 0.7,
        achievements: [5, 29],
        state: GameState.Banned,
        tags: [GameTag.Exploration, GameTag.Horror],
    }, {
        name: "A hat in a time",
        start: "2021-07-03",
        achievements: [3, 46],
        state: GameState.Abandoned,
        tags: [GameTag.Platformer, GameTag.Collectathon],
    }, {
        name: "Bug fables",
        start: "2021-06-24",
        end: "2021-07-10",
        hours: 46.2,
        achievements: [24, 30],
        state: GameState.Completed,
        tags: [GameTag.RPG, GameTag.TurnBased]
    }, {
        name: "Superliminal",
        start: "2021-06-25",
        end: "2021-06-27",
        hours: 3.9,
        achievements: [6, 27],
        state: GameState.Won,
        tags: [GameTag.Puzzles]
    }, {
        name: "Paradise killer",
        start: "2021-06-24",
        hours: 1.2,
        state: GameState.Abandoned,
        tags: [GameTag.MuchoTexto]
    }, {
        name: "DYE",
        start: "2021-06-05",
        end: "2021-06-23",
        hours: 18.8,
        achievements: [41, 41],
        state: GameState.Achievements,
        tags: [GameTag.Precision, GameTag.Platformer],
        score: {
            content: 8,
            lore: 4,
            mechanics: 4,
            bosses: 8,
            controls: 8,
            music: 8,
            graphics: 6,
        }
    }, {
        name: "Levelhead",
        start: "2021-05-30",
        end: "2021-06-19",
        hours: 20.8,
        achievements: [12, 44],
        state: GameState.Completed,
        tags: [GameTag.Platformer],
        score: {
            content: 10,
            lore: 1,
            mechanics: 10,
            controls: 10,
            music: 6,
            graphics: 8,
        }
    }, {
        name: "Crash Bandicoot 4",
        start: "2021-03-27",
        end: "2021-04-01",
        state: GameState.Abandoned,
        tags: [GameTag.Collectathon, GameTag.Platformer],
        score: {
            content: 8,
            lore: 6,
            mechanics: 6,
            bosses: 8,
            controls: 8,
            graphics: 10,
        }
    }, {
        name: "Guacamelee 2",
        start: "2020-12-31",
        end: "2021-01-01",
        hours: 3.6,
        achievements: [7, 49],
        state: GameState.Abandoned,
        tags: [GameTag.Metroidvania, GameTag.Platformer],
        score: {
            content: 8,
            lore: 6,
            mechanics: 6,
            bosses: 6,
            controls: 10,
            graphics: 6,
            extra: [{ bias: -1, info: "It's the same than the first one" }]
        }
    }, {
        name: "Guacamelee",
        start: "2020-12-23",
        end: "2020-12-29",
        hours: 7.5,
        achievements: [17, 30],
        state: GameState.Won,
        tags: [GameTag.Metroidvania, GameTag.Platformer],
        score: {
            content: 8,
            lore: 8,
            mechanics: 6,
            bosses: 6,
            controls: 10,
            graphics: 6,
        }
    }, {
        name: "Super meat boy forever",
        start: "2020-12-25",
        end: "2021-08-07",
        hours: 107.3,
        state: GameState.Completed,
        tags: [GameTag.Precision, GameTag.Platformer],
        score: {
            content: 10,
            lore: 6,
            mechanics: 10,
            bosses: 8,
            controls: 10,
            music: 8,
            graphics: 10,
            extra: [{ bias: -1, info: "Autorun makes hard to understand and solve some levels"}]
        }
    }, {
        name: "Suzy cube",
        start: "2020-12-06",
        end: "2020-12-20",
        hours: 3,
        achievements: [9, 17],
        state: GameState.Abandoned,
        tags: [GameTag.Platformer],
        score: {
            content: 4,
            lore: 2,
            mechanics: 2,
            bosses: 6,
            controls: 10,
            graphics: 6,
        }
    }, {
        name: "Splasher",
        start: "2020-12-08",
        end: "2020-12-12",
        hours: 4.7,
        achievements: [25, 47],
        state: GameState.Completed,
        tags: [GameTag.Precision, GameTag.Platformer],
        score: {
            content: 8,
            lore: 2,
            mechanics: 8,
            bosses: 4,
            controls: 8,
            music: 6,
            graphics: 10,
        }
    }, {
        name: "N++",
        start: "2020-12-08",
        hours: 0.5,
        achievements: [2, 33],
        state: GameState.Banned,
        tags: [GameTag.Precision],
        score: {
            content: 6,
            lore: 1,
            mechanics: 4,
            controls: 5,
            music: 1,
            graphics: 1,
        }
    }, {
        name: "Katana zero",
        start: "2020-12-06",
        end: "2020-12-07",
        hours: 4,
        achievements: [3, 22],
        state: GameState.Won,
        tags: [GameTag.Action]
    }, {
        name: "Psychonauts",
        start: "2020-11-28",
        end: "2020-12-06",
        hours: 3.5,
        achievements: [2, 37],
        state: GameState.Abandoned,
        tags: [GameTag.Collectathon, GameTag.Platformer],
    }, {
        name: "Dustforce",
        start: "2020-11-15",
        hours: 2,
        achievements: [0, 1],
        state: GameState.Won,
        tags: [GameTag.Precision, GameTag.Platformer],
        score: {
            content: 5,
            lore: 1,
            mechanics: 4,
            controls: 8,
            graphics: 5,
        }
    }, {
        name: "Deleveled",
        start: "2020-10-30",
        end: "2020-11-22",
        hours: 1.8,
        achievements: [3, 32],
        state: GameState.Abandoned,
        tags: [GameTag.Puzzles]
    }, {
        name: "Dandara",
        start: "2020-10-30",
        end: "2020-11-02",
        hours: 7.8,
        achievements: [12, 23],
        state: GameState.Won,
        tags: [GameTag.Metroidvania],
        score: {
            content: 6,
            lore: 8,
            mechanics: 8,
            bosses: 8,
            controls: 8,
            graphics: 8,
        }
    }, {
        name: "Ori and the will of the wisps",
        start: "2020-10-24",
        end: "2020-10-29",
        hours: 14.3,
        achievements: [18, 37],
        state: GameState.Won,
        tags: [GameTag.Metroidvania, GameTag.Platformer],
        score: {
            content: 8,
            lore: 6,
            mechanics: 6,
            bosses: 6,
            controls: 10,
            music: 8,
            graphics: 10,
            extra: [
                { bias: -0.5, info: "Bosses are annoingly awfull" },
                { bias: -0.5, info: "Bosses have checkpoint" },
                { bias: -0.5, info: "You can change equipment during bosses" }
            ]
        }
    }, {
        name: "Dungreed",
        start: "2020-10-28",
        hours: 0.3,
        achievements: [0, 16],
        state: GameState.Banned,
        tags: [GameTag.Roguelike]
    }, {
        name: "Escape from tethys",
        start: "2020-09-30",
        end: "2020-10-09",
        hours: 5,
        achievements: [10, 15],
        state: GameState.Won,
        tags: [GameTag.Metroidvania, GameTag.Platformer],
        score: {
            content: 6,
            lore: 6,
            mechanics: 6,
            bosses: 6,
            controls: 8,
            graphics: 6,
        }
    }, {
        name: "Rayman legends",
        start: "2020-09-18",
        end: "2020-09-21",
        hours: 17.7,
        state: GameState.Completed,
        tags: [GameTag.Platformer, GameTag.Collectathon],
        score: {
            content: 8,
            lore: 1,
            mechanics: 6,
            bosses: 1,
            controls: 10,
            graphics: 10,
        }
    }, {
        name: "Rayman origins",
        start: "2020-09-14",
        end: "2020-09-18",
        hours: 16.6,
        state: GameState.Completed,
        tags: [GameTag.Collectathon, GameTag.Platformer],
        score: {
            content: 8,
            lore: 4,
            mechanics: 6,
            bosses: 1,
            controls: 10,
            graphics: 10,
        }
    }, {
        name: "Rayman 3",
        start: "2020-08-21",
        end: "2020-09-17",
        state: GameState.Won,
        tags: [GameTag.Platformer],
        score: {
            content: 5,
            lore: 5,
            mechanics: 5,
            bosses: 4,
            controls: 5,
            graphics: 6,
        }
    }, {
        name: "Rayman 2",
        start: "2020-08-01",
        end: "2020-08-20",
        state: GameState.Completed,
        tags: [GameTag.Collectathon, GameTag.Platformer],
        score: {
            content: 6,
            lore: 8,
            mechanics: 6,
            bosses: 8,
            controls: 8,
            music: 6,
            graphics: 8,
        }
    }, {
        name: "Rayman",
        start: "2020-07-15",
        end: "2020-07-30",
        state: GameState.Completed,
        tags: [GameTag.Collectathon, GameTag.Platformer],
        score: {
            content: 6,
            lore: 4,
            mechanics: 6,
            bosses: 8,
            controls: 4,
            graphics: 5,
        }
    }, {
        name: "Inside",
        start: "2020-07-12",
        end: "2020-07-15",
        hours: 3.6,
        achievements: [2, 14],
        state: GameState.Won,
        tags: [GameTag.Puzzles, GameTag.Horror]
    }, {
        name: "A robot named fight",
        start: "2020-07-12",
        hours: 0.4,
        achievements: [4, 84],
        state: GameState.Banned,
        tags: [GameTag.Metroidvania, GameTag.Roguelike]
    }, {
        name: "Gris",
        start: "2020-07-03",
        end: "2020-07-04",
        hours: 3.1,
        achievements: [4, 17],
        state: GameState.Abandoned,
        tags: [GameTag.Puzzles]
    }, {
        name: "Shovel knight",
        start: "2020-03-20",
        end: "2020-06-18",
        hours: 32.2,
        achievements: [32, 138],
        state: GameState.Won,
        tags: [GameTag.Platformer],
        score: {
            content: 10,
            lore: 7,
            mechanics: 7,
            bosses: 8,
            controls: 10,
            music: 8,
            graphics: 8,
        }
    }, {
        name: "Trails in the sky",
        start: "2020-05-13",
        end: "2020-05-29",
        hours: 12.1,
        achievements: [1, 27],
        state: GameState.Abandoned,
        tags: [GameTag.RPG, GameTag.MuchoTexto]
    }, {
        name: "One finger death punch 2",
        start: "2020-05-10",
        end: "2020-12-19",
        hours: 5.6,
        achievements: [35, 63],
        state: GameState.Abandoned,
        tags: [GameTag.Action]
    }, {
        name: "The nonary games",
        start: "2020-05-08",
        end: "2020-06-03",
        hours: 34.7,
        achievements: [11, 38],
        state: GameState.Abandoned,
        tags: [GameTag.MuchoTexto, GameTag.Puzzles]
    }, {
        name: "One finger death punch",
        start: "2020-05-05",
        end: "2020-05-10",
        hours: 7.3,
        achievements: [85, 152],
        state: GameState.Won,
        tags: [GameTag.Action]
    }, {
        name: "Momodora",
        start: "2020-03-30",
        hours: 4.7,
        achievements: [0, 9],
        state: GameState.Abandoned,
        tags: [GameTag.Metroidvania]
    }, {
        name: "Doki doki Literature Club",
        start: "2020-03-01",
        hours: 13,
        state: GameState.Won,
        tags: [GameTag.MuchoTexto]
    }, {
        name: "Crash Bandicoot N. Sane Trilogy",
        start: "2020-01-26",
        end: "2020-07-11",
        hours: 18,
        achievements: [47, 74],
        state: GameState.Won,
        tags: [GameTag.Collectathon, GameTag.Platformer],
        score: {
            content: 10,
            lore: 5,
            mechanics: 6,
            bosses: 8,
            controls: 10,
            music: 8,
            graphics: 10,
        }
    }, {
        name: "Spyro Reignited Trilogy",
        start: "2020-01-19",
        end: "2020-07-10",
        hours: 39.8,
        achievements: [80, 105],
        state: GameState.Completed,
        tags: [GameTag.Collectathon, GameTag.Platformer],
        score: {
            content: 8,
            lore: 5,
            mechanics: 6,
            bosses: 8,
            controls: 10,
            music: 8,
            graphics: 10,
        }
    }, {
        name: "Gemcraft Frostborn Wrath",
        start: "2020-01-10",
        end: "2020-04-04",
        hours: 188.4,
        achievements: [619, 636],
        state: GameState.Won,
        tags: [GameTag.TowerDefense]
    }, {
        name: "Oneshot",
        start: "2019-12-27",
        end: "2020-01-03",
        hours: 11,
        achievements: [9, 11],
        state: GameState.Won,
        tags: [GameTag.Puzzles, GameTag.MuchoTexto]
    }, {
        name: "Baba is you",
        start: "2019-12-21",
        end: "2020-04-04",
        hours: 5.3,
        achievements: [1, 18],
        state: GameState.Abandoned,
        tags: [GameTag.Puzzles]
    }, {
        name: "Phoenix Wright: Ace attorney trilogy",
        start: "2019-12-01",
        end: "2020-03-24",
        hours: 45.8,
        achievements: [13, 30],
        state: GameState.Abandoned,
        tags: [GameTag.MuchoTexto]
    }, {
        name: "The messenger",
        start: "2019-11-28",
        end: "2019-12-01",
        hours: 21,
        achievements: [42, 48],
        state: GameState.Completed,
        tags: [GameTag.Metroidvania, GameTag.Platformer],
        score: {
            content: 8,
            lore: 8,
            mechanics: 6,
            bosses: 8,
            controls: 10,
            music: 10,
            graphics: 10,
            extra: [{ bias: 1, info: "Humor" }]
        }
    }, {
        name: "Hollow knight",
        start: "2019-11-17",
        end: "2020-11-22",
        hours: 41.1,
        achievements: [45, 63],
        state: GameState.Won,
        tags: [GameTag.Metroidvania, GameTag.Platformer],
        score: {
            content: 10,
            lore: 4,
            mechanics: 8,
            bosses: 10,
            controls: 10,
            music: 6,
            graphics: 10,
        }
    }, {
        name: "Just shapes and beats",
        start: "2019-11-02",
        end: "2019-11-03",
        hours: 3.5,
        achievements: [8, 26],
        state: GameState.Won,
        tags: [GameTag.Rythm, GameTag.Precision]
    }, {
        name: "Cypher",
        start: "2019-09-18",
        hours: 1.5,
        achievements: [0, 7],
        state: GameState.Banned,
        tags: [GameTag.Puzzles],
    }, {
        name: "Iron crypticle",
        start: "2019-08-18",
        end: "2019-08-29",
        hours: 7.5,
        achievements: [33, 38],
        state: GameState.Abandoned,
        tags: [GameTag.Roguelike]
    }, {
        name: "Lode runner legacy",
        start: "2019-07-23",
        end: "2019-08-18",
        hours: 33,
        achievements: [28, 35],
        state: GameState.Completed,
        tags: [GameTag.Puzzles]
    }, {
        name: "Lovers in a dangerous spacetime",
        start: "2019-07-07",
        end: "2020-01-16",
        hours: 11.2,
        achievements: [17, 28],
        state: GameState.Won,
        tags: [GameTag.Action, GameTag.Cooperative]
    }, {
        name: "Battleblock theater",
        start: "2019-07-06",
        end: "2021-12-19",
        hours: 15.8,
        achievements: [15, 30],
        state: GameState.Completed,
        tags: [GameTag.Collectathon, GameTag.Platformer],
        score: {
            content: 7,
            lore: 4,
            mechanics: 4,
            bosses: 3,
            controls: 7,
            music: 5,
            graphics: 5,
        }
    }, {
        name: "Overcooked",
        start: "2019-05-13",
        end: "2019-11-21",
        hours: 8.1,
        achievements: [7, 12],
        state: GameState.Abandoned,
        tags: [GameTag.Cooperative]
    }, {
        name: "Keep talking",
        start: "2019-04-25",
        end: "2019-10-15",
        hours: 16,
        achievements: [10, 10],
        state: GameState.Achievements,
        tags: [GameTag.Cooperative, GameTag.Puzzles]
    }, {
        name: "Dead cells",
        start: "2019-01-19",
        end: "2020-08-07",
        hours: 3,
        achievements: [14, 87],
        state: GameState.Abandoned,
        tags: [GameTag.Metroidvania]
    }, {
        name: "Owlboy",
        start: "2019-01-04",
        achievements: [1, 12],
        state: GameState.Abandoned,
        tags: [GameTag.Platformer],
    }, {
        name: "Circa infinity",
        start: "2018-12-29",
        end: "2019-02-09",
        achievements: [22, 75],
        state: GameState.Won,
        tags: [GameTag.Precision]
    }, {
        name: "Ys the oath in felghana",
        start: "2018-12-29",
        end: "2019-06-23",
        hours: 10.6,
        achievements: [6, 33],
        state: GameState.Won,
        tags: [GameTag.RPG, GameTag.Action]
    }, {
        name: "TimeSpinner",
        start: "2018-12-24",
        achievements: [15, 37],
        state: GameState.Won,
        tags: [GameTag.Metroidvania],
        score: {
            content: 5,
            lore: 5,
            mechanics: 5,
            bosses: 8,
            controls: 7,
            graphics: 5,
        }
    }, {
        name: "Ys origin",
        start: "2018-12-12",
        end: "2019-11-15",
        hours: 5.5,
        achievements: [20, 46],
        state: GameState.Won,
        tags: [GameTag.RPG, GameTag.Action]
    }, {
        name: "Luminocity",
        start: "2018-11-23",
        state: GameState.Won,
        tags: [GameTag.PointAndClick]
    }, {
        name: "Hue",
        start: "2018-11-02",
        end: "2018-11-07",
        hours: 3.6,
        achievements: [12, 13],
        state: GameState.Won,
        tags: [GameTag.Puzzles, GameTag.Platformer]
    }, {
        name: "Undertale",
        start: "2018-08-27",
        state: GameState.Completed,
        tags: [GameTag.RPG, GameTag.MuchoTexto]
    }, {
        name: "7 billion humans",
        start: "2018-08-23",
        end: "2018-08-25",
        hours: 6.9,
        achievements: [12, 19],
        state: GameState.Abandoned,
        tags: [GameTag.Programing]
    }, {
        name: "Wizard of legend",
        start: "2018-07-22",
        end: "2020-12-05",
        hours: 4.5,
        achievements: [6, 19],
        state: GameState.Abandoned,
        tags: [GameTag.Roguelike]
    }, {
        name: "Iconoclasts",
        start: "2018-07-01",
        end: "2020-12-13",
        hours: 18.6,
        achievements: [10, 11],
        state: GameState.Completed,
        tags: [GameTag.Metroidvania, GameTag.Platformer],
        score: {
            content: 10,
            lore: 10,
            mechanics: 8,
            bosses: 10,
            controls: 10,
            music: 8,
            graphics: 10,
        }
    }, {
        name: "Q.U.B.E. 2",
        start: "2018-06-30",
        end: "2018-07-15",
        hours: 6.1,
        achievements: [15, 29],
        state: GameState.Won,
        tags: [GameTag.Puzzles]
    }, {
        name: "Celeste",
        start: "2018-06-24",
        end: "2020-10-26",
        hours: 41.3,
        achievements: [32, 32],
        state: GameState.Achievements,
        tags: [GameTag.Precision, GameTag.Platformer],
        score: {
            content: 10,
            lore: 10,
            mechanics: 10,
            controls: 10,
            music: 7,
            graphics: 10,
        }
    }, {
        name: "The dream machine",
        start: "2018-06-16",
        achievements: [0, 46],
        state: GameState.Abandoned,
        tags: [GameTag.PointAndClick]
    }, {
        name: "Crypt of the necrodancer",
        start: "2018-06-01",
        end: "2018-10-30",
        hours: 21.4,
        achievements: [8, 44],
        state: GameState.Won,
        tags: [GameTag.Roguelike, GameTag.Rythm]
    }, {
        name: "Realm grinder",
        start: "2018-05-27",
        end: "2019-09-24",
        hours: 651.3,
        achievements: [14, 14],
        state: GameState.Won,
        tags: [GameTag.Idle]
    }, {
        name: "Human resource machine",
        start: "2018-03-06",
        end: "2018-04-01",
        hours: 11.7,
        achievements: [16, 16],
        state: GameState.Achievements,
        tags: [GameTag.Programing, GameTag.Puzzles]
    }, {
        name: "Axiom verge",
        start: "2018-02-04",
        end: "2018-02-15",
        hours: 11.4,
        achievements: [16, 29],
        state: GameState.Won,
        tags: [GameTag.Metroidvania],
        score: {
            content: 10,
            lore: 8,
            mechanics: 10,
            bosses: 7,
            controls: 8,
            graphics: 8,
            extra: [{ bias: 1, info: "Unique hidden rooms on each save file"}]
        }
    }, {
        name: "Ori and the blind forest",
        start: "2017-12-31",
        end: "2018-02-04",
        hours: 6.8,
        achievements: [29, 57],
        state: GameState.Won,
        tags: [GameTag.Metroidvania, GameTag.Platformer],
        score: {
            content: 10,
            lore: 6,
            mechanics: 6,
            bosses: 4,
            controls: 10,
            music: 7,
            graphics: 10,
        }
    }, {
        name: "The end is nigh",
        start: "2017-12-25",
        end: "2018-11-16",
        hours: 4.2,
        achievements: [19, 106],
        state: GameState.Won,
        tags: [GameTag.Precision, GameTag.Platformer],
        score: {
            content: 10,
            lore: 4,
            mechanics: 6,
            bosses: 4,
            controls: 10,
            music: 5,
            graphics: 5,
        }
    }, {
        name: "Enter the gungeon",
        start: "2017-12-21",
        end: "2020-01-18",
        hours: 84.5,
        achievements: [18, 54],
        state: GameState.Abandoned,
        tags: [GameTag.Roguelike],
    }, {
        name: "Sonic forces",
        start: "2017-11-16",
        end: "2017-11-20",
        hours: 3.5,
        state: GameState.Won,
        tags: [GameTag.Platformer],
        score: {
            content: 4,
            lore: 5,
            mechanics: 5,
            bosses: 5,
            controls: 4,
            music: 4,
            graphics: 8,
        }
    }, {
        name: "Cuphead",
        start: "2017-10-15",
        end: "2018-11-14",
        hours: 16.6,
        achievements: [21, 28],
        state: GameState.Won,
        tags: [GameTag.Precision, GameTag.Action]
    }, {
        name: "Bit trip runner 2",
        start: "2017-10-14",
        end: "2018-06-23",
        hours: 24.1,
        achievements: [26, 26],
        state: GameState.Achievements,
        tags: [GameTag.Rythm],
        score: {
            content: 6,
            lore: 1,
            mechanics: 4,
            bosses: 6,
            controls: 8,
            music: 1,
            graphics: 6,
            extra: [{ bias: -1, info: "Beating it on hard doesn't unlock EZ and normal achievements"}]
        }
    }, {
        name: "Sonic mania",
        start: "2017-08-29",
        end: "2017-09-06",
        hours: 30,
        achievements: [14, 18],
        state: GameState.Won,
        tags: [GameTag.Platformer],
        score: {
            content: 8,
            lore: 4,
            mechanics: 8,
            bosses: 8,
            controls: 10,
            music: 10,
            graphics: 10,
        }
    }, {
        name: "Freedom planet",
        start: "2017-05-07",
        end: "2017-07-11",
        hours: 16.6,
        achievements: [12, 56],
        state: GameState.Won,
        tags: [GameTag.Platformer],
        score: {
            content: 5,
            lore: 5,
            mechanics: 5,
            bosses: 5,
            controls: 8,
            graphics: 5,
        }
    }, {
        name: "Sanctum 2",
        start: "2016-12-01",
        end: "2016-12-16",
        hours: 1,
        achievements: [4, 50],
        state: GameState.Abandoned,
        tags: [GameTag.TowerDefense]
    }, {
        name: "Security hole",
        start: "2016-12-01",
        end: "2016-12-16",
        hours: 2.1,
        achievements: [28, 88],
        state: GameState.Abandoned,
        tags: [GameTag.Puzzles]
    }, {
        name: "Nihilumbra",
        start: "2016-11-28",
        end: "2016-12-05",
        hours: 9.4,
        achievements: [19, 24],
        state: GameState.Completed,
        tags: [GameTag.Puzzles, GameTag.Platformer],
        score: {
            content: 6,
            lore: 6,
            mechanics: 8,
            controls: 7,
            graphics: 5,
        }
    }, {
        name: "The witness",
        start: "2016-10-30",
        end: "2016-11-19",
        hours: 30.5,
        achievements: [1, 2],
        state: GameState.Won,
        tags: [GameTag.Puzzles]
    }, {
        name: "Hacknet",
        start: "2016-09-22",
        end: "2017-08-18",
        hours: 8.2,
        achievements: [5, 11],
        state: GameState.Abandoned,
        tags: [GameTag.Programing]
    }, {
        name: "Spellweaver",
        start: "2016-08-04",
        end: "2017-02-19",
        hours: 69.5,
        achievements: [12, 20],
        state: GameState.Abandoned,
        tags: [GameTag.Board]
    }, {
        name: "Limbo",
        start: "2016-07-01",
        end: "2016-07-02",
        hours: 2.6,
        achievements: [4, 13],
        state: GameState.Won,
        tags: [GameTag.Horror, GameTag.Puzzles, GameTag.Platformer],
        score: {
            content: 6,
            lore: 6,
            mechanics: 4,
            controls: 10,
            graphics: 5,
        }
    }, {
        name: "Toki tori 2",
        start: "2016-04-23",
        end: "2016-05-02",
        hours: 9.7,
        achievements: [15, 38],
        state: GameState.Won,
        tags: [GameTag.Puzzles, GameTag.Platformer],
        score: {
            content: 7,
            lore: 4,
            mechanics: 5,
            controls: 10,
            graphics: 10,
        }
    }, {
        name: "Toki tori",
        start: "2016-04-21",
        end: "2017-09-26",
        hours: 13,
        achievements: [22, 38],
        state: GameState.Won,
        tags: [GameTag.Puzzles],
        score: {
            content: 8,
            lore: 1,
            mechanics: 7,
            controls: 10,
            graphics: 7,
        }
    }, {
        name: "Walk the Light",
        start: "2016-02-29",
        hours: 0.7,
        achievements: [0, 6],
        state: GameState.Banned,
        tags: [GameTag.Puzzles]
    }, {
        name: "Magnetic cage closed",
        start: "2016-02-06",
        end: "2016-02-24",
        hours: 11,
        achievements: [17, 29],
        state: GameState.Won,
        tags: [GameTag.Puzzles]
    }, {
        name: "Attractio",
        start: "2016-02-07",
        end: "2016-02-21",
        hours: 2,
        achievements: [2, 18],
        state: GameState.Abandoned,
        tags: [GameTag.Puzzles]
    }, {
        name: "Castle of illusion",
        start: "2016-01-01",
        achievements: [4, 12],
        state: GameState.Won,
        tags: [GameTag.Platformer]
    }, {
        name: "IronCast",
        start: "2015-09-14",
        end: "2015-12-27",
        hours: 19.3,
        achievements: [22, 30],
        state: GameState.Won,
        tags: [GameTag.Board, GameTag.Roguelike]
    }, {
        name: "Portal 2",
        start: "2015-11-27",
        end: "2015-12-03",
        hours: 6.8,
        achievements: [19, 51],
        state: GameState.Won,
        tags: [GameTag.Puzzles]
    }, {
        name: "Life is Strange",
        start: "2015-10-24",
        end: "2015-11-08",
        hours: 6.4,
        achievements: [5, 60],
        state: GameState.Won,
        tags: [GameTag.MuchoTexto]
    }, {
        name: "Quantum conundrum",
        start: "2015-07-16",
        end: "2015-09-12",
        hours: 9.3,
        achievements: [8, 25],
        state: GameState.Won,
        tags: [GameTag.Puzzles, GameTag.Platformer]
    }, {
        name: "Parallax",
        start: "2015-07-12",
        end: "2015-12-27",
        hours: 3,
        achievements: [12, 13],
        state: GameState.Won,
        tags: [GameTag.Puzzles]
    }, {
        name: "Gemcraft chasing shadows",
        start: "2015-05-01",
        end: "2020-03-11",
        hours: 282,
        achievements: [419, 419],
        state: GameState.Achievements,
        tags: [GameTag.TowerDefense]
    }, {
        name: "Ace attorney Saga (NDS)",
        start: "2014-01-01",
        state: GameState.Won,
        tags: [GameTag.MuchoTexto]
    }, {
        name: "Vessel",
        start: "2014-01-01",
        hours: 7.9,
        achievements: [12, 20],
        state: GameState.Won,
        tags: [GameTag.Puzzles]
    }, {
        name: "Downwell",
        start: "2014-01-01",
        hours: 3.2,
        achievements: [14, 20],
        state: GameState.Won,
        tags: [GameTag.Roguelike]
    }, {
        name: "Dungeon defenders",
        start: "2013-01-01",
        end: "2020-08-08",
        hours: 332.3,
        achievements: [55, 118],
        state: GameState.Won,
        tags: [GameTag.RPG, GameTag.TowerDefense]
    }, {
        name: "Eversion",
        start: "2013-01-01",
        hours: 2.4,
        achievements: [14, 14],
        state: GameState.Achievements,
        tags: [GameTag.Horror, GameTag.Platformer],
        score: {
            content: 5,
            lore: 2,
            mechanics: 3,
            controls: 8,
            music: 5,
            graphics: 4,
        }
    }, {
        name: "The swapper",
        start: "2013-01-01",
        hours: 3.9,
        achievements: [0, 10],
        state: GameState.Won,
        tags: [GameTag.Puzzles]
    }, {
        name: "Cave story",
        start: "2013-01-01",
        hours: 11.6,
        achievements: [43, 76],
        state: GameState.Completed,
        tags: [GameTag.Metroidvania, GameTag.Platformer],
        score: {
            content: 8,
            lore: 10,
            mechanics: 6,
            bosses: 10,
            controls: 10,
            music: 10,
            graphics: 10,
        }
    }, {
        name: "QUBE",
        start: "2013-01-01",
        achievements: [0, 52],
        state: GameState.Won,
        tags: [GameTag.Puzzles]
    }, {
        name: "Thomas was alone",
        start: "2013-01-01",
        hours: 4.3,
        achievements: [26, 35],
        state: GameState.Won,
        tags: [GameTag.Puzzles, GameTag.Platformer]
    }, {
        name: "Anitchamber",
        start: "2013-01-01",
        state: GameState.Won,
        tags: [GameTag.Puzzles]
    }, {
        name: "Portal",
        start: "2012-01-01",
        hours: 6.4,
        achievements: [8, 15],
        state: GameState.Completed,
        tags: [GameTag.Puzzles]
    }, {
        name: "Castle crashers",
        start: "2012-01-01",
        hours: 7.5,
        achievements: [3, 12],
        state: GameState.Won,
        tags: [GameTag.Action]
    }, {
        name: "Blocks that matter",
        start: "2012-01-01",
        state: GameState.Won,
        tags: [GameTag.Puzzles, GameTag.Platformer]
    }, {
        name: "Tetrobot and co",
        start: "2012-01-01",
        hours: 8.9,
        achievements: [21, 30],
        state: GameState.Completed,
        tags: [GameTag.Puzzles]
    }, {
        name: "Trasure adventure game",
        start: "2012-01-01",
        hours: 21.2,
        state: GameState.Completed,
        tags: [GameTag.Metroidvania, GameTag.Platformer]
    }, {
        name: "Fez",
        start: "2012-01-01",
        hours: 3.6,
        achievements: [7, 12],
        state: GameState.Won,
        tags: [GameTag.Puzzles, GameTag.Platformer]
    }, {
        name: "The binding of isaac",
        start: "2012-01-01",
        state: GameState.Abandoned,
        tags: [GameTag.Roguelike]
    }, {
        name: "VVVVVV",
        start: "2012-01-01",
        hours: 2.2,
        achievements: [3, 19],
        state: GameState.Won,
        tags: [GameTag.Platformer]
    }, {
        name: "Bit trip runner",
        start: "2012-01-01",
        state: GameState.Won,
        tags: [GameTag.Rythm]
    }, {
        name: "Super meat boy",
        start: "2012-01-01",
        end: "2017-10-22",
        hours: 34.8,
        achievements: [28, 48],
        state: GameState.Completed,
        tags: [GameTag.Precision, GameTag.Platformer],
        score: {
            content: 10,
            lore: 5,
            mechanics: 10,
            bosses: 8,
            controls: 10,
            music: 10,
            graphics: 7,
        }
    }, {
        name: "Braid",
        start: "2012-01-01",
        state: GameState.Won,
        tags: [GameTag.Puzzles, GameTag.Platformer]
    },
]
