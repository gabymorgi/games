enum GameTag { Platformer, Roguelike, Presition, Puzzles }
enum GameState { Banned, Abandoned, Playing, Won, Completed, Achievements }

export const data: Array<{
    name: string
    start: string
    end?: string
    hours?: number
    achievements?: number
    tags?: Array<GameTag>
    state?: GameState
    score?: {}
}> = [
    {
        name: "Neon abyss",
        start: "2021-12-11",
        hours: 1.8,
        achievements: 5/35,
        state: GameState.Playing,
        tags: [GameTag.Roguelike, GameTag.Platformer],
    }, {
        name: "Gravitas",
        start: "2021-12-11",
        hours: 0.5,
        achievements: 7/20,
        state: GameState.Playing,
        tags: [GameTag.Puzzles]
    }, {
        name: "Dead Dungeon",
        start: "2021-12-10",
        end: "2021-12-11",
        hours: 1.5,
        achievements: 20/20,
        tags: [GameTag.Platformer, GameTag.Presition],
        state: GameState.Achievements,
        score: {

        }
    }, {
        name: "SteamWorld dig",
        start: "2021-12-10",
        hours: 1,

    }, {
        name: "SteamWorld dig 2",
        start: "2021-12-08",
        end: "2021-12-10",
        hours: 12.4,
    }, {
        name: "Grapple Force Rena",
        start: "2021-11-30",
        hours: 1,
    }, {
        name: "Magicat",
        start: "2021-11-30",
        end: "2021-12-08",
        hours: 14.6,
    }, {
        name: "It takes two",
        start: "2021-12-04",
        hours: 2.9,
    }, {
        name: "Quickly Quackley",
        start: "2021-11-29",
        end: "2021-11-30",
        hours: 0.9,
    }, {
        name: "Unbound: Worlds Apart",
        start: "2021-11-27",
        end: "2021-11-28",
        hours: 6.8,
    }, {
        name: "Blue Fire",
        start: "2021-11-27",
        hours: 1},
    {
        name: "Astalon: tears of the earth",
        start: "2021-11-21",
        end: "2021-11-27",
        hours: 26.8,
    }, {
        name: "Luciform",
        start: "2021-11-21",
        hours: 1.3,
    }, {
        name: "Dadish 2",
        start: "2021-11-21",
        end: "2021-11-27",
        hours: 1.8},
    {
        name: "A hole new world",
        start: "2021-11-16",
        hours: 0.1,
    }, {
        name: "Kaze and the wild masks",
        start: "2021-11-07",
        end: "2021-11-15",
        hours: 9.5,
    }, {
        name: "Cat quest II",
        start: "2021-10-30",
        end: "2021-11-16",
        hours: 9.7,
    }, {
        name: "Cat quest",
        start: "2021-10-29",
        end: "2021-10-30",
        hours: 7.6,
    }, {
        name: "Toodee and topdee",
        start: "2021-10-27",
        hours: 1.8,
    }, {
        name: "Axiom verge 2",
        start: "2021-10-20",
        end: "2021-11-07",
        hours: 10.4,
    }, {
        name: "Super Magbot",
        start: "2021-10-08",
        end: "2021-11-21",
        hours: 9.2,
    }, {
        name: "SunBlaze",
        start: "2021-10-02",
        end: "2021-10-11",
        hours: 7.4,
    }, {
        name: "Sir Lovelot",
        start: "2021-09-29",
        end: "2021-09-30",
        hours: 4.3,
    }, {
        name: "ScourgeBringer",
        start: "2021-09-23",
        hours: 2.8,
    }, {
        name: "Greak memories of azur",
        start: "2021-09-23",
        hours: 0.6,
    }, {
        name: "Evergate",
        start: "2021-09-18",
        end: "2021-09-26",
        hours: 6.3,
    }, {
        name: "Deltarune",
        start: "2021-09-17",
        end: "2021-10-08",
    }, {
        name: "Hades",
        start: "2021-08-08",
        end: "2021-09-22",
        hours: 88.9,
    }, {
        name: "Tetris effect",
        start: "2021-08-19",
        end: "2021-08-20",
        hours: 1.8,
    }, {
        name: "Aviary attorney",
        start: "2021-07-28",
        end: "2021-08-07",
        hours: 15.8,
    }, {
        name: "Sojourn",
        start: "2021-07-19",
        end: "2021-07-30",
        hours: 0.8,
    }, {
        name: "Never give up",
        start: "2021-07-14",
        end: "2021-07-26",
        hours: 13.3,
    }, {
        name: "Migthy gunvolt burst",
        start: "2021-07-14",
        hours: 0.6,
    }, {
        name: "Skul the hero slayer",
        start: "2021-07-13",
        hours: 1.5,
    }, {
        name: "Rite",
        start: "2021-07-11",
        end: "2021-07-13",
        hours: 3.4,
    }, {
        name: "Portal reload",
        start: "2021-07-11",
        end: "2021-07-12",
        hours: 2.3,
    }, {
        name: "Inmost",
        start: "2021-07-10",
        hours: 0.7,
    }, {
        name: "A hat in a time",
        start: "2021-07-03",
    }, {
        name: "Bug fables",
        start: "2021-06-24",
        end: "2021-07-10",
        hours: 46.2,
    }, {
        name: "Superliminal",
        start: "2021-06-25",
        end: "2021-06-27",
        hours: 3.9,
    }, {
        name: "Paradise killer",
        start: "2021-06-24",
        hours: 1.2,
    }, {
        name: "DYE",
        start: "2021-06-05",
        end: "2021-06-23",
        hours: 18.8,
    }, {
        name: "Levelhead",
        start: "2021-05-30",
        end: "2021-06-19",
        hours: 20.8,
    }, {
        name: "Crash Bandicoot 4",
        start: "2021-03-27",
        end: "2021-04-01",
    }, {
        name: "Guacamelee 2",
        start: "2021-12-31",
        end: "2021-01-01",
        hours: 3.6,
    }, {
        name: "Guacamelee",
        start: "2020-12-23",
        end: "2020-12-29",
        hours: 7.5,
    }, {
        name: "Super meat boy forever",
        start: "2020-12-25",
        end: "2021-08-07",
        hours: 107.3,
    }, {
        name: "Suzy cube",
        start: "2020-12-06",
        end: "2020-12-20",
        hours: 3,
    }, {
        name: "Splasher",
        start: "2020-12-08",
        end: "2020-12-12",
        hours: 4.7,
    }, {
        name: "N++",
        start: "2020-12-08",
        hours: 0.5,
    }, {
        name: "Katana zero",
        start: "2020-12-06",
        end: "2020-12-07",
        hours: 4,
    }, {
        name: "Psychonauts",
        start: "2020-11-28",
        end: "2020-12-06",
        hours: 3.5,
    }, {
        name: "Dustforce",
        start: "2020-11-15",
        hours: 2,
    }, {
        name: "Deleveled",
        start: "2020-10-30",
        end: "2020-11-22",
        hours: 1.8},
    {
        name: "Dandara",
        start: "2020-10-30",
        end: "2020-11-02",
        hours: 7.8,
    }, {
        name: "Ori and the will of the wisps",
        start: "2020-10-24",
        end: "2020-10-29",
        hours: 14.3,
    }, {
        name: "Dungreed",
        start: "2020-10-28",
        hours: 0.3,
    }, {
        name: "Escape from tethys",
        start: "2020-09-30",
        end: "2020-10-09",
        hours: 5,
    }, {
        name: "Rayman legends",
        start: "2020-09-18",
        end: "2020-09-21",
        hours: 17.7,
    }, {
        name: "Rayman origins",
        start: "2020-09-14",
        end: "2020-09-18",
        hours: 16.6,
    }, {
        name: "Inside",
        start: "2020-07-12",
        end: "2020-07-15",
        hours: 3.6,
    }, {
        name: "A robot named fight",
        start: "2020-07-12",
        hours: 0.4,
    }, {
        name: "Gris",
        start: "2020-07-03",
        end: "2020-07-04",
        hours: 3.1,
    }, {
        name: "Shovel knight",
        start: "2020-03-20",
        end: "2020-06-18",
        hours: 32.2,
    }, {
        name: "Trails in the sky",
        start: "2020-05-13",
        end: "2020-05-29",
        hours: 12.1,
    }, {
        name: "One finger death punch 2",
        start: "2020-05-10",
        end: "2020-12-19",
        hours: 5.6,
    }, {
        name: "The nonary games",
        start: "2020-05-08",
        end: "2020-06-03",
        hours: 34.7,
    }, {
        name: "One finger death punch",
        start: "2020-05-05",
        end: "2020-05-10",
        hours: 7.3,
    }, {
        name: "Momodora",
        start: "2020-03-30",
        hours: 4.7,
    }, {
        name: "Doki doki",
        start: "2020-03-01",
        hours: 13,
    }, {
        name: "Crash Bandicoot N. Sane Trilogy",
        start: "2020-01-26",
        end: "2020-07-11",
        hours: 18,
    }, {
        name: "Spyro Reignited Trilogy",
        start: "2020-01-19",
        end: "2020-07-10",
        hours: 39.8,
    }, {
        name: "Gemcraft Frostborn Wrath",
        start: "2020-01-10",
        end: "2020-04-04",
        hours: 188.4,
    }, {
        name: "Oneshot",
        start: "2019-12-27",
        end: "2020-01-03",
        hours: 11,
    }, {
        name: "Baba is you",
        start: "2019-12-21",
        end: "2020-04-04",
        hours: 5.3,
    }, {
        name: "Ace attorney trilogy",
        start: "2019-12-01",
        end: "2020-03-24",
        hours: 45.8,
    }, {
        name: "The messenger",
        start: "2019-11-28",
        end: "2019-12-01",
        hours: 21,
    }, {
        name: "Hollow knight",
        start: "2019-11-17",
        end: "2020-11-22",
        hours: 41.1,
    }, {
        name: "Just shapes and beats",
        start: "2019-11-02",
        end: "2019-11-03",
        hours: 3.5,
    }, {
        name: "Cypher",
        start: "2019-09-18",
        hours: 1.5,
    }, {
        name: "Iron crypticle",
        start: "2019-08-18",
        end: "2019-08-29",
        hours: 7.5,
    }, {
        name: "Lode runner",
        start: "2019-07-23",
        end: "2019-08-18",
        hours: 33,
    }, {
        name: "Lovers in a dangerous spacetime",
        start: "2019-07-07",
        end: "2020-01-16",
        hours: 11.2,
    }, {
        name: "Battleblock theater",
        start: "2019-07-06",
        hours: 6.1,
    }, {
        name: "Overcooked",
        start: "2019-05-13",
        end: "2019-11-21",
        hours: 8.1,
    }, {
        name: "Keep talking",
        start: "2019-04-25",
        end: "2019-10-15",
        hours: 16,
    }, {
        name: "Dead cells",
        start: "2019-01-19",
        end: "2020-08-07",
        hours: 3,
    }, {
        name: "Owlboy",
        start: "2019-01-04",
    }, {
        name: "Circa infinity",
        start: "2018-12-29",
        end: "2019-02-09",
    }, {
        name: "Ys the oath in felghana",
        start: "2018-12-29",
        end: "2019-06-23",
        hours: 10.6,
    }, {
        name: "TimeSpinner",
        start: "2018-12-24",
    }, {
        name: "Ys origin",
        start: "2018-12-12",
        end: "2019-11-15",
        hours: 5.5,
    }, {
        name: "Luminocity",
        start: "2018-11-23",
    }, {
        name: "Hue",
        start: "2018-11-02",
        end: "2018-11-07",
        hours: 3.6,
    }, {
        name: "Undertale",
        start: "2018-08-27",
    }, {
        name: "7 billion humans",
        start: "2018-08-23",
        end: "2018-08-25",
        hours: 6.9,
    }, {
        name: "Wizard of legend",
        start: "2018-07-22",
        end: "2020-12-05",
        hours: 4.5,
    }, {
        name: "Iconoclasts",
        start: "2018-07-01",
        end: "2020-12-13",
        hours: 18.6,
    }, {
        name: "Q.U.B.E. 2",
        start: "2018-06-30",
        end: "2018-07-15",
        hours: 6.1,
    }, {
        name: "Celeste",
        start: "2018-06-24",
        end: "2020-10-26",
        hours: 41.3,
    }, {
        name: "The dream machine",
        start: "2018-06-16",
    }, {
        name: "Crypt of the necrodancer",
        start: "2018-06-01",
        end: "2018-10-30",
        hours: 21.4,
    }, {
        name: "Realm grinder",
        start: "2018-05-27",
        end: "2019-09-24",
        hours: 651.3,
    }, {
        name: "Human resource machine",
        start: "2018-03-06",
        end: "2018-04-01",
        hours: 11.7,
    }, {
        name: "Axiom verge",
        start: "2018-02-04",
        end: "2018-02-15",
        hours: 11.4,
    }, {
        name: "Ori and the blind forest",
        start: "2017-12-31",
        end: "2018-02-04",
        hours: 6.8,
    }, {
        name: "The end is nigh",
        start: "2017-12-25",
        end: "2018-11-16",
        hours: 4.2,
    }, {
        name: "Enter the gungeon",
        start: "2017-12-21",
        end: "2020-01-18",
        hours: 84.5,
    }, {
        name: "Sonic forces",
        start: "2017-11-16",
        end: "2017-11-20",
        hours: 3.5,
    }, {
        name: "Cuphead",
        start: "2017-10-15",
        end: "2018-11-14",
        hours: 16.6,
    }, {
        name: "Bit trip runner 2",
        start: "2017-10-14",
        end: "2018-06-23",
        hours: 24.1,
    }, {
        name: "Sonic mania",
        start: "2017-08-29",
        end: "2017-09-06",
        hours: 30,
    }, {
        name: "Freedom planet",
        start: "2017-05-07",
        end: "2017-07-11",
        hours: 16.6,
    }, {
        name: "Sanctum 2",
        start: "2016-12-01",
        end: "2016-12-16",
        hours: 1,
    }, {
        name: "Security hole",
        start: "2016-12-01",
        end: "2016-12-16",
        hours: 2.1,
    }, {
        name: "Nihilumbra",
        start: "2016-11-28",
        end: "2016-12-05",
        hours: 9.4,
    }, {
        name: "The witness",
        start: "2016-10-30",
        end: "2016-11-19",
        hours: 30.5,
    }, {
        name: "Hacknet",
        start: "2016-09-22",
        end: "2017-08-18",
        hours: 8.2,
    }, {
        name: "Spellweaver",
        start: "2016-08-04",
        end: "2017-02-19",
        hours: 69.5,
    }, {
        name: "Limbo",
        start: "2016-07-01",
        end: "2016-07-02",
        hours: 2.6,
    }, {
        name: "Toki tori 2",
        start: "2016-04-23",
        end: "2016-05-02",
        hours: 9.7,
    }, {
        name: "Toki tori",
        start: "2016-04-21",
        end: "2017-09-26",
        hours: 13,
    }, {
        name: "Walk the Light",
        start: "2016-02-29",
        hours: 0.7,
    }, {
        name: "Magnetic cage closed",
        start: "2016-02-06",
        end: "2016-02-24",
        hours: 11,
    }, {
        name: "Attractio",
        start: "2016-02-07",
        end: "2016-02-21",
        hours: 2,
    }, {
        name: "Castle of illusion",
        start: "2016-01-01",
    }, {
        name: "IronCast",
        start: "2015-09-14",
        end: "2015-12-27",
        hours: 19.3,
    }, {
        name: "Portal 2",
        start: "2015-11-27",
        end: "2015-12-03",
        hours: 6.8,
    }, {
        name: "Life is Strange",
        start: "2015-10-24",
        end: "2015-11-08",
        hours: 6.4,
    }, {
        name: "Quantum conundrum",
        start: "2015-07-16",
        end: "2015-09-12",
        hours: 9.3,
    }, {
        name: "Parallax",
        start: "2015-07-12",
        end: "2015-12-27",
        hours: 3,
    }, {
        name: "Gemcraft chasing shadows",
        start: "2015-05-01",
        end: "2020-03-11",
        hours: 282,
    }, {
        name: "ace attorney",
        start: "2014-01-01",
    }, {
        name: "vessel",
        start: "2014-01-01",
        hours: 7.9,
    }, {
        name: "downwell",
        start: "2014-01-01",
        hours: 3.2,
    }, {
        name: "dungeon defenders",
        start: "2013-01-01",
        end: "2020-08-08",
        hours: 332.3,
    }, {
        name: "eversion",
        start: "2013-01-01",
        hours: 2.4,
    }, {
        name: "the swapper",
        start: "2013-01-01",
        hours: 3.9,
    }, {
        name: "cave story",
        start: "2013-01-01",
        hours: 11.6,
    }, {
        name: "QUBE",
        start: "2013-01-01",
    }, {
        name: "tomas was alone",
        start: "2013-01-01",
        hours: 4.3,
    }, {
        name: "Anitchamber",
        start: "2013-01-01",
    }, {
        name: "Portal",
        start: "2012-01-01",
        hours: 6.4,
    }, {
        name: "castle crashers",
        start: "2012-01-01",
        hours: 7.5,
    }, {
        name: "blocks that matter",
        start: "2012-01-01",
    }, {
        name: "tetrobot and co",
        start: "2012-01-01",
        hours: 8.9,
    }, {
        name: "trasure adventure game",
        start: "2012-01-01",
        hours: 21.2,
    }, {
        name: "fez",
        start: "2012-01-01",
        hours: 3.6,
    }, {
        name: "the binding of isaac",
        start: "2012-01-01",
    }, {
        name: "VVVVVV",
        start: "2012-01-01",
        hours: 2.2,
    }, {
        name: "bit trip runner",
        start: "2012-01-01"
    }, {
        name: "super meat boy",
        start: "2012-01-01",
        end: "2017-10-22",
        hours: 34.8
    }, {
        name: "Braid",
        start: "2012-01-01"
    },
]
