// Entirely new expansion design for 조선생의 낚시여행. Not original-game research.
// Grade arrays: 0 large, 1 medium, 2 small. Region economy follows the proposed expansion model.
// Duration target is a design goal; these data alone do not prove 350 hours of play.
export const EXTRA_REGIONS = [
  {
    "id": 10,
    "name": "갈대빛 수로",
    "display": "갈대빛 수로",
    "region": "갈대빛 수로",
    "bossId": 67,
    "boss_id": 67,
    "boss_name": "갈대왕수염",
    "level": 50,
    "value": 18000,
    "bait": 1800,
    "expense_on_sale": 2700,
    "minimum_catches": 150,
    "fight": 88.0,
    "boss_fight": 220,
    "boss_reward": 720000,
    "equipment": 1026000,
    "unlock": 675000,
    "budget": 1701000,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 20,
    "biome": "reeds, warm freshwater"
  },
  {
    "id": 11,
    "name": "비취 폭포",
    "display": "비취 폭포",
    "region": "비취 폭포",
    "bossId": 76,
    "boss_id": 76,
    "boss_name": "폭포비늘룡",
    "level": 52,
    "value": 20880,
    "bait": 2088,
    "expense_on_sale": 3132,
    "minimum_catches": 175,
    "fight": 89.8,
    "boss_fight": 224,
    "boss_reward": 835200,
    "equipment": 1388520,
    "unlock": 913500,
    "budget": 2302020,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 22,
    "biome": "jade cascade, white spray"
  },
  {
    "id": 12,
    "name": "노을 소금늪",
    "display": "노을 소금늪",
    "region": "노을 소금늪",
    "bossId": 85,
    "boss_id": 85,
    "boss_name": "늪지붉은턱",
    "level": 54,
    "value": 24221,
    "bait": 2422,
    "expense_on_sale": 3633,
    "minimum_catches": 200,
    "fight": 91.6,
    "boss_fight": 228,
    "boss_reward": 968840,
    "equipment": 1840796,
    "unlock": 1211050,
    "budget": 3051846,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 24,
    "biome": "pink salt marsh"
  },
  {
    "id": 13,
    "name": "유리 산호만",
    "display": "유리 산호만",
    "region": "유리 산호만",
    "bossId": 94,
    "boss_id": 94,
    "boss_name": "산호왕갑주",
    "level": 57,
    "value": 28096,
    "bait": 2810,
    "expense_on_sale": 4214,
    "minimum_catches": 225,
    "fight": 93.4,
    "boss_fight": 232,
    "boss_reward": 1123840,
    "equipment": 2402208,
    "unlock": 1580400,
    "budget": 3982608,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 26,
    "biome": "transparent coral lagoon"
  },
  {
    "id": 14,
    "name": "청동 난파항",
    "display": "청동 난파항",
    "region": "청동 난파항",
    "bossId": 103,
    "boss_id": 103,
    "boss_name": "난파선집게왕",
    "level": 59,
    "value": 32592,
    "bait": 3259,
    "expense_on_sale": 4889,
    "minimum_catches": 250,
    "fight": 95.2,
    "boss_fight": 236,
    "boss_reward": 1303680,
    "equipment": 3096240,
    "unlock": 2037000,
    "budget": 5133240,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 28,
    "biome": "bronze shipwreck harbour"
  },
  {
    "id": 15,
    "name": "설화 빙하호",
    "display": "설화 빙하호",
    "region": "설화 빙하호",
    "bossId": 112,
    "boss_id": 112,
    "boss_name": "빙관호수왕",
    "level": 61,
    "value": 37806,
    "bait": 3781,
    "expense_on_sale": 5671,
    "minimum_catches": 275,
    "fight": 97.0,
    "boss_fight": 240,
    "boss_reward": 1512240,
    "equipment": 3950727,
    "unlock": 2599162,
    "budget": 6549889,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 30,
    "biome": "snowflake glacier lake"
  },
  {
    "id": 16,
    "name": "보랏빛 해구",
    "display": "보랏빛 해구",
    "region": "보랏빛 해구",
    "bossId": 121,
    "boss_id": 121,
    "boss_name": "해구자색군주",
    "level": 64,
    "value": 43855,
    "bait": 4386,
    "expense_on_sale": 6578,
    "minimum_catches": 300,
    "fight": 98.8,
    "boss_fight": 244,
    "boss_reward": 1754200,
    "equipment": 4999470,
    "unlock": 3289125,
    "budget": 8288595,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 32,
    "biome": "violet deep trench"
  },
  {
    "id": 17,
    "name": "번개 구름바다",
    "display": "번개 구름바다",
    "region": "번개 구름바다",
    "bossId": 130,
    "boss_id": 130,
    "boss_name": "뇌운뿔고래",
    "level": 66,
    "value": 50872,
    "bait": 5087,
    "expense_on_sale": 7631,
    "minimum_catches": 325,
    "fight": 100.6,
    "boss_fight": 248,
    "boss_reward": 2034880,
    "equipment": 6282692,
    "unlock": 4133350,
    "budget": 10416042,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 34,
    "biome": "storm cloud sea"
  },
  {
    "id": 18,
    "name": "화산 유황섬",
    "display": "화산 유황섬",
    "region": "화산 유황섬",
    "bossId": 139,
    "boss_id": 139,
    "boss_name": "용암갑옷상어",
    "level": 68,
    "value": 59011,
    "bait": 5901,
    "expense_on_sale": 8852,
    "minimum_catches": 350,
    "fight": 102.4,
    "boss_fight": 252,
    "boss_reward": 2360440,
    "equipment": 7848463,
    "unlock": 5163462,
    "budget": 13011925,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 36,
    "biome": "volcanic sulphur coast"
  },
  {
    "id": 19,
    "name": "달거울 호수",
    "display": "달거울 호수",
    "region": "달거울 호수",
    "bossId": 148,
    "boss_id": 148,
    "boss_name": "달그림자용어",
    "level": 71,
    "value": 68453,
    "bait": 6845,
    "expense_on_sale": 10268,
    "minimum_catches": 375,
    "fight": 104.2,
    "boss_fight": 256,
    "boss_reward": 2738120,
    "equipment": 9754552,
    "unlock": 6417469,
    "budget": 16172021,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 38,
    "biome": "moon reflection lake"
  },
  {
    "id": 20,
    "name": "고래노래 군도",
    "display": "고래노래 군도",
    "region": "고래노래 군도",
    "bossId": 157,
    "boss_id": 157,
    "boss_name": "노래바다거인",
    "level": 73,
    "value": 79406,
    "bait": 7941,
    "expense_on_sale": 11911,
    "minimum_catches": 400,
    "fight": 106.0,
    "boss_fight": 260,
    "boss_reward": 3176240,
    "equipment": 12069712,
    "unlock": 7940600,
    "budget": 20010312,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 40,
    "biome": "whale song islands"
  },
  {
    "id": 21,
    "name": "태양꽃 암초",
    "display": "태양꽃 암초",
    "region": "태양꽃 암초",
    "bossId": 166,
    "boss_id": 166,
    "boss_name": "일광방패가오리",
    "level": 76,
    "value": 92111,
    "bait": 9211,
    "expense_on_sale": 13817,
    "minimum_catches": 425,
    "fight": 107.8,
    "boss_fight": 264,
    "boss_reward": 3684440,
    "equipment": 14875926,
    "unlock": 9786794,
    "budget": 24662720,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 42,
    "biome": "sunflower reef"
  },
  {
    "id": 22,
    "name": "검은 진주해",
    "display": "검은 진주해",
    "region": "검은 진주해",
    "bossId": 175,
    "boss_id": 175,
    "boss_name": "흑해갑주고래",
    "level": 78,
    "value": 106848,
    "bait": 10685,
    "expense_on_sale": 16027,
    "minimum_catches": 450,
    "fight": 109.6,
    "boss_fight": 268,
    "boss_reward": 4273920,
    "equipment": 18271008,
    "unlock": 12020400,
    "budget": 30291408,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 44,
    "biome": "black pearl sea"
  },
  {
    "id": 23,
    "name": "시간의 모래톱",
    "display": "시간의 모래톱",
    "region": "시간의 모래톱",
    "bossId": 184,
    "boss_id": 184,
    "boss_name": "모래폭풍거북어",
    "level": 80,
    "value": 123944,
    "bait": 12394,
    "expense_on_sale": 18592,
    "minimum_catches": 475,
    "fight": 111.4,
    "boss_fight": 272,
    "boss_reward": 4957760,
    "equipment": 22371892,
    "unlock": 14718350,
    "budget": 37090242,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 46,
    "biome": "hourglass sandbank"
  },
  {
    "id": 24,
    "name": "운해 연꽃지",
    "display": "운해 연꽃지",
    "region": "운해 연꽃지",
    "bossId": 193,
    "boss_id": 193,
    "boss_name": "운해백수염룡",
    "level": 83,
    "value": 143775,
    "bait": 14378,
    "expense_on_sale": 21566,
    "minimum_catches": 500,
    "fight": 113.2,
    "boss_fight": 276,
    "boss_reward": 5751000,
    "equipment": 27317250,
    "unlock": 17971875,
    "budget": 45289125,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 48,
    "biome": "cloud lotus pond"
  },
  {
    "id": 25,
    "name": "별비 산호정원",
    "display": "별비 산호정원",
    "region": "별비 산호정원",
    "bossId": 202,
    "boss_id": 202,
    "boss_name": "유성뿔해마왕",
    "level": 85,
    "value": 166779,
    "bait": 16678,
    "expense_on_sale": 25017,
    "minimum_catches": 525,
    "fight": 115.0,
    "boss_fight": 280,
    "boss_reward": 6671160,
    "equipment": 33272410,
    "unlock": 21889744,
    "budget": 55162154,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 50,
    "biome": "meteor shower coral garden"
  },
  {
    "id": 26,
    "name": "붉은 혜성해",
    "display": "붉은 혜성해",
    "region": "붉은 혜성해",
    "bossId": 211,
    "boss_id": 211,
    "boss_name": "혜성갑주상어",
    "level": 87,
    "value": 193464,
    "bait": 19346,
    "expense_on_sale": 29020,
    "minimum_catches": 550,
    "fight": 116.8,
    "boss_fight": 284,
    "boss_reward": 7738560,
    "equipment": 40433976,
    "unlock": 26601300,
    "budget": 67035276,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 52,
    "biome": "red comet sea"
  },
  {
    "id": 27,
    "name": "푸른 용궁문",
    "display": "푸른 용궁문",
    "region": "푸른 용궁문",
    "bossId": 220,
    "boss_id": 220,
    "boss_name": "용궁문지기",
    "level": 90,
    "value": 224418,
    "bait": 22442,
    "expense_on_sale": 33663,
    "minimum_catches": 575,
    "fight": 118.6,
    "boss_fight": 288,
    "boss_reward": 8976720,
    "equipment": 49035333,
    "unlock": 32260088,
    "budget": 81295421,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 54,
    "biome": "azure dragon palace gate"
  },
  {
    "id": 28,
    "name": "천상의 은하수",
    "display": "천상의 은하수",
    "region": "천상의 은하수",
    "bossId": 229,
    "boss_id": 229,
    "boss_name": "은하별뿔고래",
    "level": 92,
    "value": 260325,
    "bait": 26032,
    "expense_on_sale": 39049,
    "minimum_catches": 600,
    "fight": 120.4,
    "boss_fight": 292,
    "boss_reward": 10413000,
    "equipment": 59354100,
    "unlock": 39048750,
    "budget": 98402850,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 56,
    "biome": "celestial milky way"
  },
  {
    "id": 29,
    "name": "태초의 천해",
    "display": "태초의 천해",
    "region": "태초의 천해",
    "bossId": 239,
    "boss_id": 239,
    "boss_name": "천해룡 아스트라",
    "level": 95,
    "value": 301977,
    "bait": 30198,
    "expense_on_sale": 45297,
    "minimum_catches": 625,
    "fight": 122.2,
    "boss_fight": 296,
    "boss_reward": 12079080,
    "equipment": 71719538,
    "unlock": 47183906,
    "budget": 118903444,
    "setup": 23,
    "overhead": 10,
    "quest_minutes": 58,
    "biome": "primordial sky ocean"
  }
];

export const EXTRA_FISH = [
  {
    "id": 59,
    "name": "갈잎송사리",
    "regions": [
      10
    ],
    "bait": "공용",
    "note": "갈대빛 수로의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 0,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1440,
      1200,
      960
    ],
    "prices": [
      21420,
      15300,
      10710
    ],
    "priceContexts": {
      "12_13": [
        21420,
        15300,
        10710
      ],
      "14": [
        23562,
        16830,
        11781
      ],
      "15": [
        25704,
        18360,
        12852
      ]
    },
    "atk": [
      24,
      21,
      19
    ],
    "motionPattern": "steady",
    "biome": "reeds, warm freshwater",
    "legendary": false
  },
  {
    "id": 60,
    "name": "버들누치",
    "regions": [
      10
    ],
    "bait": "공용",
    "note": "갈대빛 수로의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 1,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1490,
      1242,
      994
    ],
    "prices": [
      23940,
      17100,
      11970
    ],
    "priceContexts": {
      "12_13": [
        23940,
        17100,
        11970
      ],
      "14": [
        26334,
        18810,
        13167
      ],
      "15": [
        28728,
        20520,
        14364
      ]
    },
    "atk": [
      25,
      22,
      20
    ],
    "motionPattern": "dart",
    "biome": "reeds, warm freshwater",
    "legendary": false
  },
  {
    "id": 61,
    "name": "모래동자",
    "regions": [
      10
    ],
    "bait": "공용",
    "note": "갈대빛 수로의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 2,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1541,
      1284,
      1027
    ],
    "prices": [
      25200,
      18000,
      12600
    ],
    "priceContexts": {
      "12_13": [
        25200,
        18000,
        12600
      ],
      "14": [
        27720,
        19800,
        13860
      ],
      "15": [
        30240,
        21600,
        15120
      ]
    },
    "atk": [
      25,
      22,
      20
    ],
    "motionPattern": "zigzag",
    "biome": "reeds, warm freshwater",
    "legendary": false
  },
  {
    "id": 62,
    "name": "황토납자루",
    "regions": [
      10
    ],
    "bait": "공용",
    "note": "갈대빛 수로의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 3,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1591,
      1326,
      1061
    ],
    "prices": [
      26460,
      18900,
      13230
    ],
    "priceContexts": {
      "12_13": [
        26460,
        18900,
        13230
      ],
      "14": [
        29106,
        20790,
        14553
      ],
      "15": [
        31752,
        22680,
        15876
      ]
    },
    "atk": [
      25,
      22,
      20
    ],
    "motionPattern": "pulse",
    "biome": "reeds, warm freshwater",
    "legendary": false
  },
  {
    "id": 63,
    "name": "물결잉어",
    "regions": [
      10
    ],
    "bait": "공용",
    "note": "갈대빛 수로의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 4,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1642,
      1368,
      1094
    ],
    "prices": [
      22680,
      16200,
      11340
    ],
    "priceContexts": {
      "12_13": [
        22680,
        16200,
        11340
      ],
      "14": [
        24948,
        17820,
        12474
      ],
      "15": [
        27216,
        19440,
        13608
      ]
    },
    "atk": [
      26,
      23,
      21
    ],
    "motionPattern": "dive",
    "biome": "reeds, warm freshwater",
    "legendary": false
  },
  {
    "id": 64,
    "name": "청등동사리",
    "regions": [
      10
    ],
    "bait": "공용",
    "note": "갈대빛 수로의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 5,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1692,
      1410,
      1128
    ],
    "prices": [
      28980,
      20700,
      14490
    ],
    "priceContexts": {
      "12_13": [
        28980,
        20700,
        14490
      ],
      "14": [
        31878,
        22770,
        15939
      ],
      "15": [
        34776,
        24840,
        17388
      ]
    },
    "atk": [
      27,
      24,
      22
    ],
    "motionPattern": "surge",
    "biome": "reeds, warm freshwater",
    "legendary": false
  },
  {
    "id": 65,
    "name": "수초장어",
    "regions": [
      10
    ],
    "bait": "공용",
    "note": "갈대빛 수로의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 6,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1742,
      1452,
      1162
    ],
    "prices": [
      27720,
      19800,
      13860
    ],
    "priceContexts": {
      "12_13": [
        27720,
        19800,
        13860
      ],
      "14": [
        30492,
        21780,
        15246
      ],
      "15": [
        33264,
        23760,
        16632
      ]
    },
    "atk": [
      27,
      24,
      22
    ],
    "motionPattern": "sway",
    "biome": "reeds, warm freshwater",
    "legendary": false
  },
  {
    "id": 66,
    "name": "유리나비어",
    "regions": [
      10
    ],
    "bait": "공용",
    "note": "갈대빛 수로의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 7,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1793,
      1494,
      1195
    ],
    "prices": [
      40320,
      28800,
      20160
    ],
    "priceContexts": {
      "12_13": [
        40320,
        28800,
        20160
      ],
      "14": [
        44352,
        31680,
        22176
      ],
      "15": [
        48384,
        34560,
        24192
      ]
    },
    "atk": [
      27,
      24,
      22
    ],
    "motionPattern": "spiral",
    "biome": "reeds, warm freshwater",
    "legendary": false
  },
  {
    "id": 67,
    "name": "갈대왕수염",
    "regions": [
      10
    ],
    "bait": "공용",
    "note": "갈대빛 수로의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 8,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2489,
      2074,
      1659
    ],
    "prices": [
      63000,
      45000,
      31500
    ],
    "priceContexts": {
      "12_13": [
        63000,
        45000,
        31500
      ],
      "14": [
        69300,
        49500,
        34650
      ],
      "15": [
        75600,
        54000,
        37800
      ]
    },
    "atk": [
      28,
      25,
      23
    ],
    "motionPattern": "boss",
    "biome": "reeds, warm freshwater",
    "legendary": false
  },
  {
    "id": 68,
    "name": "비취은어",
    "regions": [
      11
    ],
    "bait": "공용",
    "note": "비취 폭포의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 9,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1500,
      1250,
      1000
    ],
    "prices": [
      24847,
      17748,
      12424
    ],
    "priceContexts": {
      "12_13": [
        24847,
        17748,
        12424
      ],
      "14": [
        27332,
        19523,
        13666
      ],
      "15": [
        29816,
        21298,
        14909
      ]
    },
    "atk": [
      25,
      22,
      20
    ],
    "motionPattern": "steady",
    "biome": "jade cascade, white spray",
    "legendary": false
  },
  {
    "id": 69,
    "name": "폭포준치",
    "regions": [
      11
    ],
    "bait": "공용",
    "note": "비취 폭포의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 10,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1553,
      1294,
      1035
    ],
    "prices": [
      27770,
      19836,
      13885
    ],
    "priceContexts": {
      "12_13": [
        27770,
        19836,
        13885
      ],
      "14": [
        30547,
        21820,
        15274
      ],
      "15": [
        33324,
        23803,
        16662
      ]
    },
    "atk": [
      25,
      22,
      20
    ],
    "motionPattern": "dart",
    "biome": "jade cascade, white spray",
    "legendary": false
  },
  {
    "id": 70,
    "name": "물안개송어",
    "regions": [
      11
    ],
    "bait": "공용",
    "note": "비취 폭포의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 11,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1606,
      1338,
      1070
    ],
    "prices": [
      29232,
      20880,
      14616
    ],
    "priceContexts": {
      "12_13": [
        29232,
        20880,
        14616
      ],
      "14": [
        32155,
        22968,
        16078
      ],
      "15": [
        35078,
        25056,
        17539
      ]
    },
    "atk": [
      26,
      23,
      21
    ],
    "motionPattern": "zigzag",
    "biome": "jade cascade, white spray",
    "legendary": false
  },
  {
    "id": 71,
    "name": "돌틈망둑",
    "regions": [
      11
    ],
    "bait": "공용",
    "note": "비취 폭포의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 12,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1657,
      1381,
      1105
    ],
    "prices": [
      30694,
      21924,
      15347
    ],
    "priceContexts": {
      "12_13": [
        30694,
        21924,
        15347
      ],
      "14": [
        33763,
        24116,
        16882
      ],
      "15": [
        36833,
        26309,
        18416
      ]
    },
    "atk": [
      26,
      23,
      21
    ],
    "motionPattern": "pulse",
    "biome": "jade cascade, white spray",
    "legendary": false
  },
  {
    "id": 72,
    "name": "청옥열목어",
    "regions": [
      11
    ],
    "bait": "공용",
    "note": "비취 폭포의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 13,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1710,
      1425,
      1140
    ],
    "prices": [
      26309,
      18792,
      13154
    ],
    "priceContexts": {
      "12_13": [
        26309,
        18792,
        13154
      ],
      "14": [
        28940,
        20671,
        14469
      ],
      "15": [
        31571,
        22550,
        15785
      ]
    },
    "atk": [
      27,
      24,
      22
    ],
    "motionPattern": "dive",
    "biome": "jade cascade, white spray",
    "legendary": false
  },
  {
    "id": 73,
    "name": "여울칠성어",
    "regions": [
      11
    ],
    "bait": "공용",
    "note": "비취 폭포의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 14,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1763,
      1469,
      1175
    ],
    "prices": [
      33617,
      24012,
      16808
    ],
    "priceContexts": {
      "12_13": [
        33617,
        24012,
        16808
      ],
      "14": [
        36979,
        26413,
        18489
      ],
      "15": [
        40340,
        28814,
        20170
      ]
    },
    "atk": [
      27,
      24,
      22
    ],
    "motionPattern": "surge",
    "biome": "jade cascade, white spray",
    "legendary": false
  },
  {
    "id": 74,
    "name": "백포연준모치",
    "regions": [
      11
    ],
    "bait": "공용",
    "note": "비취 폭포의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 15,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1814,
      1512,
      1210
    ],
    "prices": [
      32155,
      22968,
      16078
    ],
    "priceContexts": {
      "12_13": [
        32155,
        22968,
        16078
      ],
      "14": [
        35370,
        25265,
        17686
      ],
      "15": [
        38586,
        27562,
        19294
      ]
    },
    "atk": [
      28,
      25,
      23
    ],
    "motionPattern": "sway",
    "biome": "jade cascade, white spray",
    "legendary": false
  },
  {
    "id": 75,
    "name": "수정날개어",
    "regions": [
      11
    ],
    "bait": "공용",
    "note": "비취 폭포의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 16,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1867,
      1556,
      1245
    ],
    "prices": [
      46771,
      33408,
      23386
    ],
    "priceContexts": {
      "12_13": [
        46771,
        33408,
        23386
      ],
      "14": [
        51448,
        36749,
        25725
      ],
      "15": [
        56125,
        40090,
        28063
      ]
    },
    "atk": [
      28,
      25,
      23
    ],
    "motionPattern": "spiral",
    "biome": "jade cascade, white spray",
    "legendary": false
  },
  {
    "id": 76,
    "name": "폭포비늘룡",
    "regions": [
      11
    ],
    "bait": "공용",
    "note": "비취 폭포의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 17,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2592,
      2160,
      1728
    ],
    "prices": [
      73080,
      52200,
      36540
    ],
    "priceContexts": {
      "12_13": [
        73080,
        52200,
        36540
      ],
      "14": [
        80388,
        57420,
        40194
      ],
      "15": [
        87696,
        62640,
        43848
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "boss",
    "biome": "jade cascade, white spray",
    "legendary": false
  },
  {
    "id": 77,
    "name": "소금망둥",
    "regions": [
      12
    ],
    "bait": "공용",
    "note": "노을 소금늪의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 18,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1560,
      1300,
      1040
    ],
    "prices": [
      28823,
      20588,
      14412
    ],
    "priceContexts": {
      "12_13": [
        28823,
        20588,
        14412
      ],
      "14": [
        31705,
        22647,
        15853
      ],
      "15": [
        34588,
        24706,
        17294
      ]
    },
    "atk": [
      25,
      22,
      20
    ],
    "motionPattern": "steady",
    "biome": "pink salt marsh",
    "legendary": false
  },
  {
    "id": 78,
    "name": "노을숭어",
    "regions": [
      12
    ],
    "bait": "공용",
    "note": "노을 소금늪의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 19,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1615,
      1346,
      1077
    ],
    "prices": [
      32214,
      23010,
      16107
    ],
    "priceContexts": {
      "12_13": [
        32214,
        23010,
        16107
      ],
      "14": [
        35435,
        25311,
        17718
      ],
      "15": [
        38657,
        27612,
        19328
      ]
    },
    "atk": [
      26,
      23,
      21
    ],
    "motionPattern": "dart",
    "biome": "pink salt marsh",
    "legendary": false
  },
  {
    "id": 79,
    "name": "분홍복어",
    "regions": [
      12
    ],
    "bait": "공용",
    "note": "노을 소금늪의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 20,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1669,
      1391,
      1113
    ],
    "prices": [
      33909,
      24221,
      16955
    ],
    "priceContexts": {
      "12_13": [
        33909,
        24221,
        16955
      ],
      "14": [
        37300,
        26643,
        18650
      ],
      "15": [
        40691,
        29065,
        20346
      ]
    },
    "atk": [
      26,
      23,
      21
    ],
    "motionPattern": "zigzag",
    "biome": "pink salt marsh",
    "legendary": false
  },
  {
    "id": 80,
    "name": "갈색갯장어",
    "regions": [
      12
    ],
    "bait": "공용",
    "note": "노을 소금늪의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 21,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1723,
      1436,
      1149
    ],
    "prices": [
      35605,
      25432,
      17802
    ],
    "priceContexts": {
      "12_13": [
        35605,
        25432,
        17802
      ],
      "14": [
        39166,
        27975,
        19582
      ],
      "15": [
        42726,
        30518,
        21362
      ]
    },
    "atk": [
      27,
      24,
      22
    ],
    "motionPattern": "pulse",
    "biome": "pink salt marsh",
    "legendary": false
  },
  {
    "id": 81,
    "name": "홍염전갱이",
    "regions": [
      12
    ],
    "bait": "공용",
    "note": "노을 소금늪의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 22,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1778,
      1482,
      1186
    ],
    "prices": [
      30519,
      21799,
      15259
    ],
    "priceContexts": {
      "12_13": [
        30519,
        21799,
        15259
      ],
      "14": [
        33571,
        23979,
        16785
      ],
      "15": [
        36623,
        26159,
        18311
      ]
    },
    "atk": [
      27,
      24,
      22
    ],
    "motionPattern": "dive",
    "biome": "pink salt marsh",
    "legendary": false
  },
  {
    "id": 82,
    "name": "염꽃쥐노래미",
    "regions": [
      12
    ],
    "bait": "공용",
    "note": "노을 소금늪의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 23,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1834,
      1528,
      1222
    ],
    "prices": [
      38996,
      27854,
      19498
    ],
    "priceContexts": {
      "12_13": [
        38996,
        27854,
        19498
      ],
      "14": [
        42896,
        30639,
        21448
      ],
      "15": [
        46795,
        33425,
        23398
      ]
    },
    "atk": [
      28,
      25,
      23
    ],
    "motionPattern": "surge",
    "biome": "pink salt marsh",
    "legendary": false
  },
  {
    "id": 83,
    "name": "진주농게",
    "regions": [
      12
    ],
    "bait": "공용",
    "note": "노을 소금늪의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 24,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1888,
      1573,
      1258
    ],
    "prices": [
      37300,
      26643,
      18650
    ],
    "priceContexts": {
      "12_13": [
        37300,
        26643,
        18650
      ],
      "14": [
        41030,
        29307,
        20515
      ],
      "15": [
        44760,
        31972,
        22380
      ]
    },
    "atk": [
      28,
      25,
      23
    ],
    "motionPattern": "sway",
    "biome": "pink salt marsh",
    "legendary": false
  },
  {
    "id": 84,
    "name": "석양부채어",
    "regions": [
      12
    ],
    "bait": "공용",
    "note": "노을 소금늪의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 25,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1943,
      1619,
      1295
    ],
    "prices": [
      54256,
      38754,
      27128
    ],
    "priceContexts": {
      "12_13": [
        54256,
        38754,
        27128
      ],
      "14": [
        59682,
        42629,
        29841
      ],
      "15": [
        65107,
        46505,
        32554
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "spiral",
    "biome": "pink salt marsh",
    "legendary": false
  },
  {
    "id": 85,
    "name": "늪지붉은턱",
    "regions": [
      12
    ],
    "bait": "공용",
    "note": "노을 소금늪의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 26,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2695,
      2246,
      1797
    ],
    "prices": [
      84773,
      60552,
      42386
    ],
    "priceContexts": {
      "12_13": [
        84773,
        60552,
        42386
      ],
      "14": [
        93250,
        66607,
        46625
      ],
      "15": [
        101728,
        72662,
        50863
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "boss",
    "biome": "pink salt marsh",
    "legendary": false
  },
  {
    "id": 86,
    "name": "산호돔",
    "regions": [
      13
    ],
    "bait": "공용",
    "note": "유리 산호만의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 27,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1620,
      1350,
      1080
    ],
    "prices": [
      33435,
      23882,
      16717
    ],
    "priceContexts": {
      "12_13": [
        33435,
        23882,
        16717
      ],
      "14": [
        36778,
        26270,
        18389
      ],
      "15": [
        40122,
        28658,
        20060
      ]
    },
    "atk": [
      26,
      23,
      21
    ],
    "motionPattern": "steady",
    "biome": "transparent coral lagoon",
    "legendary": false
  },
  {
    "id": 87,
    "name": "유리복치",
    "regions": [
      13
    ],
    "bait": "공용",
    "note": "유리 산호만의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 28,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1676,
      1397,
      1118
    ],
    "prices": [
      37367,
      26691,
      18684
    ],
    "priceContexts": {
      "12_13": [
        37367,
        26691,
        18684
      ],
      "14": [
        41104,
        29360,
        20552
      ],
      "15": [
        44840,
        32029,
        22421
      ]
    },
    "atk": [
      27,
      24,
      22
    ],
    "motionPattern": "dart",
    "biome": "transparent coral lagoon",
    "legendary": false
  },
  {
    "id": 88,
    "name": "푸른리본장어",
    "regions": [
      13
    ],
    "bait": "공용",
    "note": "유리 산호만의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 29,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1733,
      1444,
      1155
    ],
    "prices": [
      39334,
      28096,
      19667
    ],
    "priceContexts": {
      "12_13": [
        39334,
        28096,
        19667
      ],
      "14": [
        43267,
        30906,
        21634
      ],
      "15": [
        47201,
        33715,
        23600
      ]
    },
    "atk": [
      27,
      24,
      22
    ],
    "motionPattern": "zigzag",
    "biome": "transparent coral lagoon",
    "legendary": false
  },
  {
    "id": 89,
    "name": "진주쥐돔",
    "regions": [
      13
    ],
    "bait": "공용",
    "note": "유리 산호만의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 30,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1790,
      1492,
      1194
    ],
    "prices": [
      41301,
      29501,
      20651
    ],
    "priceContexts": {
      "12_13": [
        41301,
        29501,
        20651
      ],
      "14": [
        45431,
        32451,
        22716
      ],
      "15": [
        49561,
        35401,
        24781
      ]
    },
    "atk": [
      28,
      25,
      23
    ],
    "motionPattern": "pulse",
    "biome": "transparent coral lagoon",
    "legendary": false
  },
  {
    "id": 90,
    "name": "반점나비돔",
    "regions": [
      13
    ],
    "bait": "공용",
    "note": "유리 산호만의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 31,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1847,
      1539,
      1231
    ],
    "prices": [
      35400,
      25286,
      17700
    ],
    "priceContexts": {
      "12_13": [
        35400,
        25286,
        17700
      ],
      "14": [
        38940,
        27815,
        19470
      ],
      "15": [
        42480,
        30343,
        21240
      ]
    },
    "atk": [
      28,
      25,
      23
    ],
    "motionPattern": "dive",
    "biome": "transparent coral lagoon",
    "legendary": false
  },
  {
    "id": 91,
    "name": "연분홍쏠배감펭",
    "regions": [
      13
    ],
    "bait": "공용",
    "note": "유리 산호만의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 32,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1903,
      1586,
      1269
    ],
    "prices": [
      45234,
      32310,
      22617
    ],
    "priceContexts": {
      "12_13": [
        45234,
        32310,
        22617
      ],
      "14": [
        49757,
        35541,
        24879
      ],
      "15": [
        54281,
        38772,
        27140
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "surge",
    "biome": "transparent coral lagoon",
    "legendary": false
  },
  {
    "id": 92,
    "name": "청록갑오징어",
    "regions": [
      13
    ],
    "bait": "공용",
    "note": "유리 산호만의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 33,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1961,
      1634,
      1307
    ],
    "prices": [
      43268,
      30906,
      21634
    ],
    "priceContexts": {
      "12_13": [
        43268,
        30906,
        21634
      ],
      "14": [
        47595,
        33997,
        23797
      ],
      "15": [
        51922,
        37087,
        25961
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "sway",
    "biome": "transparent coral lagoon",
    "legendary": false
  },
  {
    "id": 93,
    "name": "오팔꽃잎어",
    "regions": [
      13
    ],
    "bait": "공용",
    "note": "유리 산호만의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 34,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2017,
      1681,
      1345
    ],
    "prices": [
      62936,
      44954,
      31468
    ],
    "priceContexts": {
      "12_13": [
        62936,
        44954,
        31468
      ],
      "14": [
        69230,
        49449,
        34615
      ],
      "15": [
        75523,
        53945,
        37762
      ]
    },
    "atk": [
      30,
      27,
      25
    ],
    "motionPattern": "spiral",
    "biome": "transparent coral lagoon",
    "legendary": false
  },
  {
    "id": 94,
    "name": "산호왕갑주",
    "regions": [
      13
    ],
    "bait": "공용",
    "note": "유리 산호만의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 35,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2800,
      2333,
      1866
    ],
    "prices": [
      98336,
      70240,
      49168
    ],
    "priceContexts": {
      "12_13": [
        98336,
        70240,
        49168
      ],
      "14": [
        108170,
        77264,
        54085
      ],
      "15": [
        118003,
        84288,
        59002
      ]
    },
    "atk": [
      30,
      27,
      25
    ],
    "motionPattern": "boss",
    "biome": "transparent coral lagoon",
    "legendary": false
  },
  {
    "id": 95,
    "name": "녹청볼락",
    "regions": [
      14
    ],
    "bait": "공용",
    "note": "청동 난파항의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 36,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1680,
      1400,
      1120
    ],
    "prices": [
      38784,
      27703,
      19392
    ],
    "priceContexts": {
      "12_13": [
        38784,
        27703,
        19392
      ],
      "14": [
        42662,
        30473,
        21331
      ],
      "15": [
        46541,
        33244,
        23270
      ]
    },
    "atk": [
      27,
      24,
      22
    ],
    "motionPattern": "steady",
    "biome": "bronze shipwreck harbour",
    "legendary": false
  },
  {
    "id": 96,
    "name": "닻꼬리대구",
    "regions": [
      14
    ],
    "bait": "공용",
    "note": "청동 난파항의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 37,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1739,
      1449,
      1159
    ],
    "prices": [
      43347,
      30962,
      21673
    ],
    "priceContexts": {
      "12_13": [
        43347,
        30962,
        21673
      ],
      "14": [
        47682,
        34058,
        23840
      ],
      "15": [
        52016,
        37154,
        26008
      ]
    },
    "atk": [
      27,
      24,
      22
    ],
    "motionPattern": "dart",
    "biome": "bronze shipwreck harbour",
    "legendary": false
  },
  {
    "id": 97,
    "name": "쇳빛우럭",
    "regions": [
      14
    ],
    "bait": "공용",
    "note": "청동 난파항의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 38,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1798,
      1498,
      1198
    ],
    "prices": [
      45629,
      32592,
      22814
    ],
    "priceContexts": {
      "12_13": [
        45629,
        32592,
        22814
      ],
      "14": [
        50192,
        35851,
        25095
      ],
      "15": [
        54755,
        39110,
        27377
      ]
    },
    "atk": [
      28,
      25,
      23
    ],
    "motionPattern": "zigzag",
    "biome": "bronze shipwreck harbour",
    "legendary": false
  },
  {
    "id": 98,
    "name": "선창꼼치",
    "regions": [
      14
    ],
    "bait": "공용",
    "note": "청동 난파항의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 39,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1856,
      1547,
      1238
    ],
    "prices": [
      47911,
      34222,
      23955
    ],
    "priceContexts": {
      "12_13": [
        47911,
        34222,
        23955
      ],
      "14": [
        52702,
        37644,
        26351
      ],
      "15": [
        57493,
        41066,
        28746
      ]
    },
    "atk": [
      28,
      25,
      23
    ],
    "motionPattern": "pulse",
    "biome": "bronze shipwreck harbour",
    "legendary": false
  },
  {
    "id": 99,
    "name": "동전도미",
    "regions": [
      14
    ],
    "bait": "공용",
    "note": "청동 난파항의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 40,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1915,
      1596,
      1277
    ],
    "prices": [
      41066,
      29333,
      20533
    ],
    "priceContexts": {
      "12_13": [
        41066,
        29333,
        20533
      ],
      "14": [
        45173,
        32266,
        22586
      ],
      "15": [
        49279,
        35200,
        24640
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "dive",
    "biome": "bronze shipwreck harbour",
    "legendary": false
  },
  {
    "id": 100,
    "name": "밧줄곰치",
    "regions": [
      14
    ],
    "bait": "공용",
    "note": "청동 난파항의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 41,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1974,
      1645,
      1316
    ],
    "prices": [
      52473,
      37481,
      26237
    ],
    "priceContexts": {
      "12_13": [
        52473,
        37481,
        26237
      ],
      "14": [
        57720,
        41229,
        28861
      ],
      "15": [
        62968,
        44977,
        31484
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "surge",
    "biome": "bronze shipwreck harbour",
    "legendary": false
  },
  {
    "id": 101,
    "name": "은못청어",
    "regions": [
      14
    ],
    "bait": "공용",
    "note": "청동 난파항의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 42,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2033,
      1694,
      1355
    ],
    "prices": [
      50191,
      35851,
      25096
    ],
    "priceContexts": {
      "12_13": [
        50191,
        35851,
        25096
      ],
      "14": [
        55210,
        39436,
        27606
      ],
      "15": [
        60229,
        43021,
        30115
      ]
    },
    "atk": [
      30,
      27,
      25
    ],
    "motionPattern": "sway",
    "biome": "bronze shipwreck harbour",
    "legendary": false
  },
  {
    "id": 102,
    "name": "황금유령어",
    "regions": [
      14
    ],
    "bait": "공용",
    "note": "청동 난파항의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 43,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2092,
      1743,
      1394
    ],
    "prices": [
      73006,
      52147,
      36503
    ],
    "priceContexts": {
      "12_13": [
        73006,
        52147,
        36503
      ],
      "14": [
        80307,
        57362,
        40153
      ],
      "15": [
        87607,
        62576,
        43804
      ]
    },
    "atk": [
      30,
      27,
      25
    ],
    "motionPattern": "spiral",
    "biome": "bronze shipwreck harbour",
    "legendary": false
  },
  {
    "id": 103,
    "name": "난파선집게왕",
    "regions": [
      14
    ],
    "bait": "공용",
    "note": "청동 난파항의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 44,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2903,
      2419,
      1935
    ],
    "prices": [
      114072,
      81480,
      57036
    ],
    "priceContexts": {
      "12_13": [
        114072,
        81480,
        57036
      ],
      "14": [
        125479,
        89628,
        62740
      ],
      "15": [
        136886,
        97776,
        68443
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "boss",
    "biome": "bronze shipwreck harbour",
    "legendary": false
  },
  {
    "id": 104,
    "name": "눈꽃송어",
    "regions": [
      15
    ],
    "bait": "공용",
    "note": "설화 빙하호의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 45,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1740,
      1450,
      1160
    ],
    "prices": [
      44989,
      32135,
      22494
    ],
    "priceContexts": {
      "12_13": [
        44989,
        32135,
        22494
      ],
      "14": [
        49488,
        35348,
        24743
      ],
      "15": [
        53987,
        38562,
        26993
      ]
    },
    "atk": [
      27,
      24,
      22
    ],
    "motionPattern": "steady",
    "biome": "snowflake glacier lake",
    "legendary": false
  },
  {
    "id": 105,
    "name": "빙하빙어",
    "regions": [
      15
    ],
    "bait": "공용",
    "note": "설화 빙하호의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 46,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1801,
      1501,
      1201
    ],
    "prices": [
      50282,
      35916,
      25141
    ],
    "priceContexts": {
      "12_13": [
        50282,
        35916,
        25141
      ],
      "14": [
        55310,
        39508,
        27655
      ],
      "15": [
        60338,
        43099,
        30169
      ]
    },
    "atk": [
      28,
      25,
      23
    ],
    "motionPattern": "dart",
    "biome": "snowflake glacier lake",
    "legendary": false
  },
  {
    "id": 106,
    "name": "서리백어",
    "regions": [
      15
    ],
    "bait": "공용",
    "note": "설화 빙하호의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 47,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1862,
      1552,
      1242
    ],
    "prices": [
      52928,
      37806,
      26464
    ],
    "priceContexts": {
      "12_13": [
        52928,
        37806,
        26464
      ],
      "14": [
        58221,
        41587,
        29110
      ],
      "15": [
        63514,
        45367,
        31757
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "zigzag",
    "biome": "snowflake glacier lake",
    "legendary": false
  },
  {
    "id": 107,
    "name": "얼음도룡어",
    "regions": [
      15
    ],
    "bait": "공용",
    "note": "설화 빙하호의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 48,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1922,
      1602,
      1282
    ],
    "prices": [
      55574,
      39696,
      27787
    ],
    "priceContexts": {
      "12_13": [
        55574,
        39696,
        27787
      ],
      "14": [
        61131,
        43666,
        30566
      ],
      "15": [
        66689,
        47635,
        33344
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "pulse",
    "biome": "snowflake glacier lake",
    "legendary": false
  },
  {
    "id": 108,
    "name": "설원곤들매기",
    "regions": [
      15
    ],
    "bait": "공용",
    "note": "설화 빙하호의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 49,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1984,
      1653,
      1322
    ],
    "prices": [
      47635,
      34025,
      23818
    ],
    "priceContexts": {
      "12_13": [
        47635,
        34025,
        23818
      ],
      "14": [
        52399,
        37428,
        26200
      ],
      "15": [
        57162,
        40830,
        28582
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "dive",
    "biome": "snowflake glacier lake",
    "legendary": false
  },
  {
    "id": 109,
    "name": "백야강준치",
    "regions": [
      15
    ],
    "bait": "공용",
    "note": "설화 빙하호의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 50,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2045,
      1704,
      1363
    ],
    "prices": [
      60868,
      43477,
      30434
    ],
    "priceContexts": {
      "12_13": [
        60868,
        43477,
        30434
      ],
      "14": [
        66955,
        47825,
        33477
      ],
      "15": [
        73042,
        52172,
        36521
      ]
    },
    "atk": [
      30,
      27,
      25
    ],
    "motionPattern": "surge",
    "biome": "snowflake glacier lake",
    "legendary": false
  },
  {
    "id": 110,
    "name": "눈송이철갑어",
    "regions": [
      15
    ],
    "bait": "공용",
    "note": "설화 빙하호의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 51,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2105,
      1754,
      1403
    ],
    "prices": [
      58222,
      41587,
      29111
    ],
    "priceContexts": {
      "12_13": [
        58222,
        41587,
        29111
      ],
      "14": [
        64044,
        45746,
        32022
      ],
      "15": [
        69866,
        49904,
        34933
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "sway",
    "biome": "snowflake glacier lake",
    "legendary": false
  },
  {
    "id": 111,
    "name": "극광유리어",
    "regions": [
      15
    ],
    "bait": "공용",
    "note": "설화 빙하호의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 52,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2166,
      1805,
      1444
    ],
    "prices": [
      84686,
      60490,
      42343
    ],
    "priceContexts": {
      "12_13": [
        84686,
        60490,
        42343
      ],
      "14": [
        93155,
        66539,
        46577
      ],
      "15": [
        101623,
        72588,
        50812
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "spiral",
    "biome": "snowflake glacier lake",
    "legendary": false
  },
  {
    "id": 112,
    "name": "빙관호수왕",
    "regions": [
      15
    ],
    "bait": "공용",
    "note": "설화 빙하호의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 53,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      3007,
      2506,
      2005
    ],
    "prices": [
      132321,
      94515,
      66160
    ],
    "priceContexts": {
      "12_13": [
        132321,
        94515,
        66160
      ],
      "14": [
        145553,
        103967,
        72776
      ],
      "15": [
        158785,
        113418,
        79392
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "boss",
    "biome": "snowflake glacier lake",
    "legendary": false
  },
  {
    "id": 113,
    "name": "보라촉수어",
    "regions": [
      16
    ],
    "bait": "공용",
    "note": "보랏빛 해구의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 54,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1800,
      1500,
      1200
    ],
    "prices": [
      52188,
      37277,
      26094
    ],
    "priceContexts": {
      "12_13": [
        52188,
        37277,
        26094
      ],
      "14": [
        57407,
        41005,
        28703
      ],
      "15": [
        62626,
        44732,
        31313
      ]
    },
    "atk": [
      28,
      25,
      23
    ],
    "motionPattern": "steady",
    "biome": "violet deep trench",
    "legendary": false
  },
  {
    "id": 114,
    "name": "심해긴턱어",
    "regions": [
      16
    ],
    "bait": "공용",
    "note": "보랏빛 해구의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 55,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1862,
      1552,
      1242
    ],
    "prices": [
      58327,
      41662,
      29163
    ],
    "priceContexts": {
      "12_13": [
        58327,
        41662,
        29163
      ],
      "14": [
        64160,
        45828,
        32079
      ],
      "15": [
        69992,
        49994,
        34996
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "dart",
    "biome": "violet deep trench",
    "legendary": false
  },
  {
    "id": 115,
    "name": "자수정꼼치",
    "regions": [
      16
    ],
    "bait": "공용",
    "note": "보랏빛 해구의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 56,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1926,
      1605,
      1284
    ],
    "prices": [
      61397,
      43855,
      30698
    ],
    "priceContexts": {
      "12_13": [
        61397,
        43855,
        30698
      ],
      "14": [
        67537,
        48241,
        33768
      ],
      "15": [
        73676,
        52626,
        36838
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "zigzag",
    "biome": "violet deep trench",
    "legendary": false
  },
  {
    "id": 116,
    "name": "먹빛등롱어",
    "regions": [
      16
    ],
    "bait": "공용",
    "note": "보랏빛 해구의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 57,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1990,
      1658,
      1326
    ],
    "prices": [
      64467,
      46048,
      32234
    ],
    "priceContexts": {
      "12_13": [
        64467,
        46048,
        32234
      ],
      "14": [
        70914,
        50653,
        35457
      ],
      "15": [
        77360,
        55258,
        38681
      ]
    },
    "atk": [
      30,
      27,
      25
    ],
    "motionPattern": "pulse",
    "biome": "violet deep trench",
    "legendary": false
  },
  {
    "id": 117,
    "name": "자주비늘돔",
    "regions": [
      16
    ],
    "bait": "공용",
    "note": "보랏빛 해구의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 58,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2052,
      1710,
      1368
    ],
    "prices": [
      55258,
      39470,
      27629
    ],
    "priceContexts": {
      "12_13": [
        55258,
        39470,
        27629
      ],
      "14": [
        60784,
        43417,
        30392
      ],
      "15": [
        66310,
        47364,
        33155
      ]
    },
    "atk": [
      30,
      27,
      25
    ],
    "motionPattern": "dive",
    "biome": "violet deep trench",
    "legendary": false
  },
  {
    "id": 118,
    "name": "긴꼬리꼴뚜기",
    "regions": [
      16
    ],
    "bait": "공용",
    "note": "보랏빛 해구의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 59,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2114,
      1762,
      1410
    ],
    "prices": [
      70606,
      50433,
      35303
    ],
    "priceContexts": {
      "12_13": [
        70606,
        50433,
        35303
      ],
      "14": [
        77667,
        55476,
        38833
      ],
      "15": [
        84727,
        60520,
        42364
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "surge",
    "biome": "violet deep trench",
    "legendary": false
  },
  {
    "id": 119,
    "name": "암석투구어",
    "regions": [
      16
    ],
    "bait": "공용",
    "note": "보랏빛 해구의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 60,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2178,
      1815,
      1452
    ],
    "prices": [
      67537,
      48241,
      33769
    ],
    "priceContexts": {
      "12_13": [
        67537,
        48241,
        33769
      ],
      "14": [
        74291,
        53065,
        37146
      ],
      "15": [
        81044,
        57889,
        40523
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "sway",
    "biome": "violet deep trench",
    "legendary": false
  },
  {
    "id": 120,
    "name": "별빛수정어",
    "regions": [
      16
    ],
    "bait": "공용",
    "note": "보랏빛 해구의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 61,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      2242,
      1868,
      1494
    ],
    "prices": [
      98235,
      70168,
      49118
    ],
    "priceContexts": {
      "12_13": [
        98235,
        70168,
        49118
      ],
      "14": [
        108059,
        77185,
        54030
      ],
      "15": [
        117882,
        84202,
        58942
      ]
    },
    "atk": [
      32,
      29,
      27
    ],
    "motionPattern": "spiral",
    "biome": "violet deep trench",
    "legendary": false
  },
  {
    "id": 121,
    "name": "해구자색군주",
    "regions": [
      16
    ],
    "bait": "공용",
    "note": "보랏빛 해구의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 62,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      3110,
      2592,
      2074
    ],
    "prices": [
      153493,
      109638,
      76747
    ],
    "priceContexts": {
      "12_13": [
        153493,
        109638,
        76747
      ],
      "14": [
        168842,
        120602,
        84422
      ],
      "15": [
        184192,
        131566,
        92096
      ]
    },
    "atk": [
      32,
      29,
      27
    ],
    "motionPattern": "boss",
    "biome": "violet deep trench",
    "legendary": false
  },
  {
    "id": 122,
    "name": "번개날치",
    "regions": [
      17
    ],
    "bait": "공용",
    "note": "번개 구름바다의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 63,
    "spriteSheet": "fish-extra-1.png",
    "hp": [
      1860,
      1550,
      1240
    ],
    "prices": [
      60537,
      43241,
      30269
    ],
    "priceContexts": {
      "12_13": [
        60537,
        43241,
        30269
      ],
      "14": [
        66591,
        47565,
        33296
      ],
      "15": [
        72644,
        51889,
        36323
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "steady",
    "biome": "storm cloud sea",
    "legendary": false
  },
  {
    "id": 123,
    "name": "구름방패어",
    "regions": [
      17
    ],
    "bait": "공용",
    "note": "번개 구름바다의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 0,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      1925,
      1604,
      1283
    ],
    "prices": [
      67659,
      48328,
      33830
    ],
    "priceContexts": {
      "12_13": [
        67659,
        48328,
        33830
      ],
      "14": [
        74425,
        53161,
        37213
      ],
      "15": [
        81191,
        57994,
        40596
      ]
    },
    "atk": [
      29,
      26,
      24
    ],
    "motionPattern": "dart",
    "biome": "storm cloud sea",
    "legendary": false
  },
  {
    "id": 124,
    "name": "천둥금눈돔",
    "regions": [
      17
    ],
    "bait": "공용",
    "note": "번개 구름바다의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 1,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      1990,
      1658,
      1326
    ],
    "prices": [
      71221,
      50872,
      35610
    ],
    "priceContexts": {
      "12_13": [
        71221,
        50872,
        35610
      ],
      "14": [
        78343,
        55959,
        39171
      ],
      "15": [
        85465,
        61046,
        42732
      ]
    },
    "atk": [
      30,
      27,
      25
    ],
    "motionPattern": "zigzag",
    "biome": "storm cloud sea",
    "legendary": false
  },
  {
    "id": 125,
    "name": "비구름복어",
    "regions": [
      17
    ],
    "bait": "공용",
    "note": "번개 구름바다의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 2,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2056,
      1713,
      1370
    ],
    "prices": [
      74782,
      53416,
      37391
    ],
    "priceContexts": {
      "12_13": [
        74782,
        53416,
        37391
      ],
      "14": [
        82260,
        58758,
        41130
      ],
      "15": [
        89738,
        64099,
        44869
      ]
    },
    "atk": [
      30,
      27,
      25
    ],
    "motionPattern": "pulse",
    "biome": "storm cloud sea",
    "legendary": false
  },
  {
    "id": 126,
    "name": "전류꼬리어",
    "regions": [
      17
    ],
    "bait": "공용",
    "note": "번개 구름바다의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 3,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2120,
      1767,
      1414
    ],
    "prices": [
      64099,
      45785,
      32049
    ],
    "priceContexts": {
      "12_13": [
        64099,
        45785,
        32049
      ],
      "14": [
        70509,
        50364,
        35254
      ],
      "15": [
        76919,
        54942,
        38459
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "dive",
    "biome": "storm cloud sea",
    "legendary": false
  },
  {
    "id": 127,
    "name": "뇌광창꼬치",
    "regions": [
      17
    ],
    "bait": "공용",
    "note": "번개 구름바다의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 4,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2185,
      1821,
      1457
    ],
    "prices": [
      81904,
      58503,
      40952
    ],
    "priceContexts": {
      "12_13": [
        81904,
        58503,
        40952
      ],
      "14": [
        90094,
        64353,
        45047
      ],
      "15": [
        98285,
        70204,
        49142
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "surge",
    "biome": "storm cloud sea",
    "legendary": false
  },
  {
    "id": 128,
    "name": "폭풍회유어",
    "regions": [
      17
    ],
    "bait": "공용",
    "note": "번개 구름바다의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 5,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2251,
      1876,
      1501
    ],
    "prices": [
      78343,
      55959,
      39171
    ],
    "priceContexts": {
      "12_13": [
        78343,
        55959,
        39171
      ],
      "14": [
        86177,
        61555,
        43088
      ],
      "15": [
        94012,
        67151,
        47005
      ]
    },
    "atk": [
      32,
      29,
      27
    ],
    "motionPattern": "sway",
    "biome": "storm cloud sea",
    "legendary": false
  },
  {
    "id": 129,
    "name": "무지개번개어",
    "regions": [
      17
    ],
    "bait": "공용",
    "note": "번개 구름바다의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 6,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2316,
      1930,
      1544
    ],
    "prices": [
      113953,
      81395,
      56976
    ],
    "priceContexts": {
      "12_13": [
        113953,
        81395,
        56976
      ],
      "14": [
        125348,
        89534,
        62674
      ],
      "15": [
        136744,
        97674,
        68371
      ]
    },
    "atk": [
      32,
      29,
      27
    ],
    "motionPattern": "spiral",
    "biome": "storm cloud sea",
    "legendary": false
  },
  {
    "id": 130,
    "name": "뇌운뿔고래",
    "regions": [
      17
    ],
    "bait": "공용",
    "note": "번개 구름바다의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 7,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      3214,
      2678,
      2142
    ],
    "prices": [
      178052,
      127180,
      89026
    ],
    "priceContexts": {
      "12_13": [
        178052,
        127180,
        89026
      ],
      "14": [
        195857,
        139898,
        97929
      ],
      "15": [
        213662,
        152616,
        106831
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "boss",
    "biome": "storm cloud sea",
    "legendary": false
  },
  {
    "id": 131,
    "name": "유황홍어",
    "regions": [
      18
    ],
    "bait": "공용",
    "note": "화산 유황섬의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 8,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      1920,
      1600,
      1280
    ],
    "prices": [
      70223,
      50159,
      35111
    ],
    "priceContexts": {
      "12_13": [
        70223,
        50159,
        35111
      ],
      "14": [
        77245,
        55175,
        38622
      ],
      "15": [
        84268,
        60191,
        42133
      ]
    },
    "atk": [
      30,
      27,
      25
    ],
    "motionPattern": "steady",
    "biome": "volcanic sulphur coast",
    "legendary": false
  },
  {
    "id": 132,
    "name": "용암지느러미",
    "regions": [
      18
    ],
    "bait": "공용",
    "note": "화산 유황섬의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 9,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      1987,
      1656,
      1325
    ],
    "prices": [
      78484,
      56060,
      39242
    ],
    "priceContexts": {
      "12_13": [
        78484,
        56060,
        39242
      ],
      "14": [
        86332,
        61666,
        43166
      ],
      "15": [
        94181,
        67272,
        47090
      ]
    },
    "atk": [
      30,
      27,
      25
    ],
    "motionPattern": "dart",
    "biome": "volcanic sulphur coast",
    "legendary": false
  },
  {
    "id": 133,
    "name": "불씨쥐치",
    "regions": [
      18
    ],
    "bait": "공용",
    "note": "화산 유황섬의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 10,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2054,
      1712,
      1370
    ],
    "prices": [
      82615,
      59011,
      41308
    ],
    "priceContexts": {
      "12_13": [
        82615,
        59011,
        41308
      ],
      "14": [
        90877,
        64912,
        45439
      ],
      "15": [
        99138,
        70813,
        49570
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "zigzag",
    "biome": "volcanic sulphur coast",
    "legendary": false
  },
  {
    "id": 134,
    "name": "적열곰치",
    "regions": [
      18
    ],
    "bait": "공용",
    "note": "화산 유황섬의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 11,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2122,
      1768,
      1414
    ],
    "prices": [
      86747,
      61962,
      43373
    ],
    "priceContexts": {
      "12_13": [
        86747,
        61962,
        43373
      ],
      "14": [
        95422,
        68158,
        47710
      ],
      "15": [
        104096,
        74354,
        52048
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "pulse",
    "biome": "volcanic sulphur coast",
    "legendary": false
  },
  {
    "id": 135,
    "name": "흑요석돔",
    "regions": [
      18
    ],
    "bait": "공용",
    "note": "화산 유황섬의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 12,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2189,
      1824,
      1459
    ],
    "prices": [
      74354,
      53110,
      37177
    ],
    "priceContexts": {
      "12_13": [
        74354,
        53110,
        37177
      ],
      "14": [
        81789,
        58421,
        40895
      ],
      "15": [
        89225,
        63732,
        44612
      ]
    },
    "atk": [
      32,
      29,
      27
    ],
    "motionPattern": "dive",
    "biome": "volcanic sulphur coast",
    "legendary": false
  },
  {
    "id": 136,
    "name": "화산큰입어",
    "regions": [
      18
    ],
    "bait": "공용",
    "note": "화산 유황섬의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 13,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2256,
      1880,
      1504
    ],
    "prices": [
      95008,
      67863,
      47504
    ],
    "priceContexts": {
      "12_13": [
        95008,
        67863,
        47504
      ],
      "14": [
        104509,
        74649,
        52254
      ],
      "15": [
        114010,
        81436,
        57005
      ]
    },
    "atk": [
      32,
      29,
      27
    ],
    "motionPattern": "surge",
    "biome": "volcanic sulphur coast",
    "legendary": false
  },
  {
    "id": 137,
    "name": "잿빛쌍꼬리",
    "regions": [
      18
    ],
    "bait": "공용",
    "note": "화산 유황섬의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 14,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2323,
      1936,
      1549
    ],
    "prices": [
      90877,
      64912,
      45438
    ],
    "priceContexts": {
      "12_13": [
        90877,
        64912,
        45438
      ],
      "14": [
        99965,
        71403,
        49982
      ],
      "15": [
        109052,
        77894,
        54526
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "sway",
    "biome": "volcanic sulphur coast",
    "legendary": false
  },
  {
    "id": 138,
    "name": "홍옥불꽃어",
    "regions": [
      18
    ],
    "bait": "공용",
    "note": "화산 유황섬의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 15,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2390,
      1992,
      1594
    ],
    "prices": [
      132185,
      94418,
      66093
    ],
    "priceContexts": {
      "12_13": [
        132185,
        94418,
        66093
      ],
      "14": [
        145404,
        103860,
        72702
      ],
      "15": [
        158622,
        113302,
        79312
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "spiral",
    "biome": "volcanic sulphur coast",
    "legendary": false
  },
  {
    "id": 139,
    "name": "용암갑옷상어",
    "regions": [
      18
    ],
    "bait": "공용",
    "note": "화산 유황섬의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 16,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      3318,
      2765,
      2212
    ],
    "prices": [
      206539,
      147528,
      103270
    ],
    "priceContexts": {
      "12_13": [
        206539,
        147528,
        103270
      ],
      "14": [
        227193,
        162281,
        113597
      ],
      "15": [
        247847,
        177034,
        123924
      ]
    },
    "atk": [
      34,
      31,
      29
    ],
    "motionPattern": "boss",
    "biome": "volcanic sulphur coast",
    "legendary": false
  },
  {
    "id": 140,
    "name": "달빛잉어",
    "regions": [
      19
    ],
    "bait": "공용",
    "note": "달거울 호수의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 17,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      1980,
      1650,
      1320
    ],
    "prices": [
      81459,
      58185,
      40730
    ],
    "priceContexts": {
      "12_13": [
        81459,
        58185,
        40730
      ],
      "14": [
        89605,
        64004,
        44803
      ],
      "15": [
        97751,
        69822,
        48876
      ]
    },
    "atk": [
      30,
      27,
      25
    ],
    "motionPattern": "steady",
    "biome": "moon reflection lake",
    "legendary": false
  },
  {
    "id": 141,
    "name": "은거울붕어",
    "regions": [
      19
    ],
    "bait": "공용",
    "note": "달거울 호수의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 18,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2050,
      1708,
      1366
    ],
    "prices": [
      91042,
      65030,
      45521
    ],
    "priceContexts": {
      "12_13": [
        91042,
        65030,
        45521
      ],
      "14": [
        100146,
        71533,
        50073
      ],
      "15": [
        109250,
        78036,
        54625
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "dart",
    "biome": "moon reflection lake",
    "legendary": false
  },
  {
    "id": 142,
    "name": "별무늬송어",
    "regions": [
      19
    ],
    "bait": "공용",
    "note": "달거울 호수의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 19,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2119,
      1766,
      1413
    ],
    "prices": [
      95834,
      68453,
      47917
    ],
    "priceContexts": {
      "12_13": [
        95834,
        68453,
        47917
      ],
      "14": [
        105417,
        75298,
        52709
      ],
      "15": [
        115001,
        82144,
        57500
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "zigzag",
    "biome": "moon reflection lake",
    "legendary": false
  },
  {
    "id": 143,
    "name": "반달황어",
    "regions": [
      19
    ],
    "bait": "공용",
    "note": "달거울 호수의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 20,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2188,
      1823,
      1458
    ],
    "prices": [
      100626,
      71876,
      50313
    ],
    "priceContexts": {
      "12_13": [
        100626,
        71876,
        50313
      ],
      "14": [
        110689,
        79064,
        55344
      ],
      "15": [
        120751,
        86251,
        60376
      ]
    },
    "atk": [
      32,
      29,
      27
    ],
    "motionPattern": "pulse",
    "biome": "moon reflection lake",
    "legendary": false
  },
  {
    "id": 144,
    "name": "밤이슬메기",
    "regions": [
      19
    ],
    "bait": "공용",
    "note": "달거울 호수의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 21,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2257,
      1881,
      1505
    ],
    "prices": [
      86251,
      61608,
      43126
    ],
    "priceContexts": {
      "12_13": [
        86251,
        61608,
        43126
      ],
      "14": [
        94876,
        67769,
        47439
      ],
      "15": [
        103501,
        73930,
        51751
      ]
    },
    "atk": [
      32,
      29,
      27
    ],
    "motionPattern": "dive",
    "biome": "moon reflection lake",
    "legendary": false
  },
  {
    "id": 145,
    "name": "은수정누치",
    "regions": [
      19
    ],
    "bait": "공용",
    "note": "달거울 호수의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 22,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2327,
      1939,
      1551
    ],
    "prices": [
      110209,
      78721,
      55105
    ],
    "priceContexts": {
      "12_13": [
        110209,
        78721,
        55105
      ],
      "14": [
        121230,
        86593,
        60616
      ],
      "15": [
        132251,
        94465,
        66126
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "surge",
    "biome": "moon reflection lake",
    "legendary": false
  },
  {
    "id": 146,
    "name": "초승비늘어",
    "regions": [
      19
    ],
    "bait": "공용",
    "note": "달거울 호수의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 23,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2395,
      1996,
      1597
    ],
    "prices": [
      105417,
      75298,
      52709
    ],
    "priceContexts": {
      "12_13": [
        105417,
        75298,
        52709
      ],
      "14": [
        115959,
        82828,
        57980
      ],
      "15": [
        126500,
        90358,
        63251
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "sway",
    "biome": "moon reflection lake",
    "legendary": false
  },
  {
    "id": 147,
    "name": "월광비단어",
    "regions": [
      19
    ],
    "bait": "공용",
    "note": "달거울 호수의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 24,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2465,
      2054,
      1643
    ],
    "prices": [
      153335,
      109525,
      76668
    ],
    "priceContexts": {
      "12_13": [
        153335,
        109525,
        76668
      ],
      "14": [
        168668,
        120478,
        84335
      ],
      "15": [
        184002,
        131430,
        92002
      ]
    },
    "atk": [
      34,
      31,
      29
    ],
    "motionPattern": "spiral",
    "biome": "moon reflection lake",
    "legendary": false
  },
  {
    "id": 148,
    "name": "달그림자용어",
    "regions": [
      19
    ],
    "bait": "공용",
    "note": "달거울 호수의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 25,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      3421,
      2851,
      2281
    ],
    "prices": [
      239585,
      171132,
      119792
    ],
    "priceContexts": {
      "12_13": [
        239585,
        171132,
        119792
      ],
      "14": [
        263544,
        188245,
        131771
      ],
      "15": [
        287502,
        205358,
        143750
      ]
    },
    "atk": [
      34,
      31,
      29
    ],
    "motionPattern": "boss",
    "biome": "moon reflection lake",
    "legendary": false
  },
  {
    "id": 149,
    "name": "노래전갱이",
    "regions": [
      20
    ],
    "bait": "공용",
    "note": "고래노래 군도의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 26,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2040,
      1700,
      1360
    ],
    "prices": [
      94493,
      67495,
      47246
    ],
    "priceContexts": {
      "12_13": [
        94493,
        67495,
        47246
      ],
      "14": [
        103942,
        74244,
        51971
      ],
      "15": [
        113392,
        80994,
        56695
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "steady",
    "biome": "whale song islands",
    "legendary": false
  },
  {
    "id": 150,
    "name": "푸른음표돔",
    "regions": [
      20
    ],
    "bait": "공용",
    "note": "고래노래 군도의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 27,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2111,
      1759,
      1407
    ],
    "prices": [
      105610,
      75436,
      52805
    ],
    "priceContexts": {
      "12_13": [
        105610,
        75436,
        52805
      ],
      "14": [
        116171,
        82980,
        58086
      ],
      "15": [
        126732,
        90523,
        63366
      ]
    },
    "atk": [
      31,
      28,
      26
    ],
    "motionPattern": "dart",
    "biome": "whale song islands",
    "legendary": false
  },
  {
    "id": 151,
    "name": "파도리본어",
    "regions": [
      20
    ],
    "bait": "공용",
    "note": "고래노래 군도의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 28,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2183,
      1819,
      1455
    ],
    "prices": [
      111168,
      79406,
      55584
    ],
    "priceContexts": {
      "12_13": [
        111168,
        79406,
        55584
      ],
      "14": [
        122285,
        87347,
        61142
      ],
      "15": [
        133402,
        95287,
        66701
      ]
    },
    "atk": [
      32,
      29,
      27
    ],
    "motionPattern": "zigzag",
    "biome": "whale song islands",
    "legendary": false
  },
  {
    "id": 152,
    "name": "흰점청어",
    "regions": [
      20
    ],
    "bait": "공용",
    "note": "고래노래 군도의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 29,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2254,
      1878,
      1502
    ],
    "prices": [
      116726,
      83376,
      58363
    ],
    "priceContexts": {
      "12_13": [
        116726,
        83376,
        58363
      ],
      "14": [
        128399,
        91714,
        64199
      ],
      "15": [
        140071,
        100051,
        70036
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "pulse",
    "biome": "whale song islands",
    "legendary": false
  },
  {
    "id": 153,
    "name": "항해줄돔",
    "regions": [
      20
    ],
    "bait": "공용",
    "note": "고래노래 군도의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 30,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2326,
      1938,
      1550
    ],
    "prices": [
      100051,
      71465,
      50026
    ],
    "priceContexts": {
      "12_13": [
        100051,
        71465,
        50026
      ],
      "14": [
        110056,
        78612,
        55029
      ],
      "15": [
        120061,
        85758,
        60031
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "dive",
    "biome": "whale song islands",
    "legendary": false
  },
  {
    "id": 154,
    "name": "섬그늘농어",
    "regions": [
      20
    ],
    "bait": "공용",
    "note": "고래노래 군도의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 31,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2398,
      1998,
      1598
    ],
    "prices": [
      127844,
      91317,
      63922
    ],
    "priceContexts": {
      "12_13": [
        127844,
        91317,
        63922
      ],
      "14": [
        140628,
        100449,
        70314
      ],
      "15": [
        153413,
        109580,
        76706
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "surge",
    "biome": "whale song islands",
    "legendary": false
  },
  {
    "id": 155,
    "name": "바람돛새치",
    "regions": [
      20
    ],
    "bait": "공용",
    "note": "고래노래 군도의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 32,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2468,
      2057,
      1646
    ],
    "prices": [
      122286,
      87347,
      61143
    ],
    "priceContexts": {
      "12_13": [
        122286,
        87347,
        61143
      ],
      "14": [
        134515,
        96082,
        67257
      ],
      "15": [
        146743,
        104816,
        73372
      ]
    },
    "atk": [
      34,
      31,
      29
    ],
    "motionPattern": "sway",
    "biome": "whale song islands",
    "legendary": false
  },
  {
    "id": 156,
    "name": "오선무늬어",
    "regions": [
      20
    ],
    "bait": "공용",
    "note": "고래노래 군도의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 33,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2539,
      2116,
      1693
    ],
    "prices": [
      177870,
      127050,
      88935
    ],
    "priceContexts": {
      "12_13": [
        177870,
        127050,
        88935
      ],
      "14": [
        195657,
        139755,
        97829
      ],
      "15": [
        213444,
        152460,
        106722
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "spiral",
    "biome": "whale song islands",
    "legendary": false
  },
  {
    "id": 157,
    "name": "노래바다거인",
    "regions": [
      20
    ],
    "bait": "공용",
    "note": "고래노래 군도의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 34,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      3526,
      2938,
      2350
    ],
    "prices": [
      277921,
      198515,
      138960
    ],
    "priceContexts": {
      "12_13": [
        277921,
        198515,
        138960
      ],
      "14": [
        305713,
        218367,
        152856
      ],
      "15": [
        333505,
        238218,
        166752
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "boss",
    "biome": "whale song islands",
    "legendary": false
  },
  {
    "id": 158,
    "name": "햇살금돔",
    "regions": [
      21
    ],
    "bait": "공용",
    "note": "태양꽃 암초의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 35,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2100,
      1750,
      1400
    ],
    "prices": [
      109612,
      78294,
      54806
    ],
    "priceContexts": {
      "12_13": [
        109612,
        78294,
        54806
      ],
      "14": [
        120573,
        86123,
        60287
      ],
      "15": [
        131534,
        93953,
        65767
      ]
    },
    "atk": [
      32,
      29,
      27
    ],
    "motionPattern": "steady",
    "biome": "sunflower reef",
    "legendary": false
  },
  {
    "id": 159,
    "name": "주황산호어",
    "regions": [
      21
    ],
    "bait": "공용",
    "note": "태양꽃 암초의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 36,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2173,
      1811,
      1449
    ],
    "prices": [
      122507,
      87505,
      61253
    ],
    "priceContexts": {
      "12_13": [
        122507,
        87505,
        61253
      ],
      "14": [
        134758,
        96256,
        67378
      ],
      "15": [
        147008,
        105006,
        73504
      ]
    },
    "atk": [
      32,
      29,
      27
    ],
    "motionPattern": "dart",
    "biome": "sunflower reef",
    "legendary": false
  },
  {
    "id": 160,
    "name": "해바라기복어",
    "regions": [
      21
    ],
    "bait": "공용",
    "note": "태양꽃 암초의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 37,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2246,
      1872,
      1498
    ],
    "prices": [
      128955,
      92111,
      64478
    ],
    "priceContexts": {
      "12_13": [
        128955,
        92111,
        64478
      ],
      "14": [
        141850,
        101322,
        70926
      ],
      "15": [
        154746,
        110533,
        77374
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "zigzag",
    "biome": "sunflower reef",
    "legendary": false
  },
  {
    "id": 161,
    "name": "금빛바늘어",
    "regions": [
      21
    ],
    "bait": "공용",
    "note": "태양꽃 암초의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 38,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2321,
      1934,
      1547
    ],
    "prices": [
      135404,
      96717,
      67702
    ],
    "priceContexts": {
      "12_13": [
        135404,
        96717,
        67702
      ],
      "14": [
        148944,
        106389,
        74472
      ],
      "15": [
        162485,
        116060,
        81242
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "pulse",
    "biome": "sunflower reef",
    "legendary": false
  },
  {
    "id": 162,
    "name": "꽃무늬쥐치",
    "regions": [
      21
    ],
    "bait": "공용",
    "note": "태양꽃 암초의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 39,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2394,
      1995,
      1596
    ],
    "prices": [
      116060,
      82900,
      58030
    ],
    "priceContexts": {
      "12_13": [
        116060,
        82900,
        58030
      ],
      "14": [
        127666,
        91190,
        63833
      ],
      "15": [
        139272,
        99480,
        69636
      ]
    },
    "atk": [
      34,
      31,
      29
    ],
    "motionPattern": "dive",
    "biome": "sunflower reef",
    "legendary": false
  },
  {
    "id": 163,
    "name": "여름긴지느러미",
    "regions": [
      21
    ],
    "bait": "공용",
    "note": "태양꽃 암초의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 40,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2467,
      2056,
      1645
    ],
    "prices": [
      148299,
      105928,
      74150
    ],
    "priceContexts": {
      "12_13": [
        148299,
        105928,
        74150
      ],
      "14": [
        163129,
        116521,
        81565
      ],
      "15": [
        177959,
        127114,
        88980
      ]
    },
    "atk": [
      34,
      31,
      29
    ],
    "motionPattern": "surge",
    "biome": "sunflower reef",
    "legendary": false
  },
  {
    "id": 164,
    "name": "노랑별돔",
    "regions": [
      21
    ],
    "bait": "공용",
    "note": "태양꽃 암초의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 41,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2542,
      2118,
      1694
    ],
    "prices": [
      141851,
      101322,
      70925
    ],
    "priceContexts": {
      "12_13": [
        141851,
        101322,
        70925
      ],
      "14": [
        156036,
        111454,
        78018
      ],
      "15": [
        170221,
        121586,
        85110
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "sway",
    "biome": "sunflower reef",
    "legendary": false
  },
  {
    "id": 165,
    "name": "태양왕관어",
    "regions": [
      21
    ],
    "bait": "공용",
    "note": "태양꽃 암초의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 42,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2615,
      2179,
      1743
    ],
    "prices": [
      206329,
      147378,
      103165
    ],
    "priceContexts": {
      "12_13": [
        206329,
        147378,
        103165
      ],
      "14": [
        226962,
        162116,
        113482
      ],
      "15": [
        247595,
        176854,
        123798
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "spiral",
    "biome": "sunflower reef",
    "legendary": false
  },
  {
    "id": 166,
    "name": "일광방패가오리",
    "regions": [
      21
    ],
    "bait": "공용",
    "note": "태양꽃 암초의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 43,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      3629,
      3024,
      2419
    ],
    "prices": [
      322389,
      230278,
      161195
    ],
    "priceContexts": {
      "12_13": [
        322389,
        230278,
        161195
      ],
      "14": [
        354628,
        253306,
        177314
      ],
      "15": [
        386867,
        276334,
        193434
      ]
    },
    "atk": [
      36,
      33,
      31
    ],
    "motionPattern": "boss",
    "biome": "sunflower reef",
    "legendary": false
  },
  {
    "id": 167,
    "name": "검은진주돔",
    "regions": [
      22
    ],
    "bait": "공용",
    "note": "검은 진주해의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 44,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2160,
      1800,
      1440
    ],
    "prices": [
      127149,
      90821,
      63575
    ],
    "priceContexts": {
      "12_13": [
        127149,
        90821,
        63575
      ],
      "14": [
        139864,
        99903,
        69932
      ],
      "15": [
        152579,
        108985,
        76290
      ]
    },
    "atk": [
      32,
      29,
      27
    ],
    "motionPattern": "steady",
    "biome": "black pearl sea",
    "legendary": false
  },
  {
    "id": 168,
    "name": "흑비늘농어",
    "regions": [
      22
    ],
    "bait": "공용",
    "note": "검은 진주해의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 45,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2236,
      1863,
      1490
    ],
    "prices": [
      142108,
      101506,
      71054
    ],
    "priceContexts": {
      "12_13": [
        142108,
        101506,
        71054
      ],
      "14": [
        156319,
        111657,
        78159
      ],
      "15": [
        170530,
        121807,
        85265
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "dart",
    "biome": "black pearl sea",
    "legendary": false
  },
  {
    "id": 169,
    "name": "밤유리갈치",
    "regions": [
      22
    ],
    "bait": "공용",
    "note": "검은 진주해의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 46,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2311,
      1926,
      1541
    ],
    "prices": [
      149587,
      106848,
      74794
    ],
    "priceContexts": {
      "12_13": [
        149587,
        106848,
        74794
      ],
      "14": [
        164546,
        117533,
        82273
      ],
      "15": [
        179504,
        128218,
        89753
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "zigzag",
    "biome": "black pearl sea",
    "legendary": false
  },
  {
    "id": 170,
    "name": "먹구름쥐가오리",
    "regions": [
      22
    ],
    "bait": "공용",
    "note": "검은 진주해의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 47,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2387,
      1989,
      1591
    ],
    "prices": [
      157066,
      112190,
      78533
    ],
    "priceContexts": {
      "12_13": [
        157066,
        112190,
        78533
      ],
      "14": [
        172773,
        123409,
        86386
      ],
      "15": [
        188479,
        134628,
        94240
      ]
    },
    "atk": [
      34,
      31,
      29
    ],
    "motionPattern": "pulse",
    "biome": "black pearl sea",
    "legendary": false
  },
  {
    "id": 171,
    "name": "흑요수염어",
    "regions": [
      22
    ],
    "bait": "공용",
    "note": "검은 진주해의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 48,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2462,
      2052,
      1642
    ],
    "prices": [
      134628,
      96163,
      67314
    ],
    "priceContexts": {
      "12_13": [
        134628,
        96163,
        67314
      ],
      "14": [
        148091,
        105779,
        74045
      ],
      "15": [
        161554,
        115396,
        80777
      ]
    },
    "atk": [
      34,
      31,
      29
    ],
    "motionPattern": "dive",
    "biome": "black pearl sea",
    "legendary": false
  },
  {
    "id": 172,
    "name": "보랏빛꼬리어",
    "regions": [
      22
    ],
    "bait": "공용",
    "note": "검은 진주해의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 49,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2538,
      2115,
      1692
    ],
    "prices": [
      172025,
      122875,
      86012
    ],
    "priceContexts": {
      "12_13": [
        172025,
        122875,
        86012
      ],
      "14": [
        189228,
        135162,
        94613
      ],
      "15": [
        206430,
        147450,
        103214
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "surge",
    "biome": "black pearl sea",
    "legendary": false
  },
  {
    "id": 173,
    "name": "심야망토어",
    "regions": [
      22
    ],
    "bait": "공용",
    "note": "검은 진주해의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 50,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2614,
      2178,
      1742
    ],
    "prices": [
      164546,
      117533,
      82273
    ],
    "priceContexts": {
      "12_13": [
        164546,
        117533,
        82273
      ],
      "14": [
        181001,
        129286,
        90500
      ],
      "15": [
        197455,
        141040,
        98728
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "sway",
    "biome": "black pearl sea",
    "legendary": false
  },
  {
    "id": 174,
    "name": "흑진주공작어",
    "regions": [
      22
    ],
    "bait": "공용",
    "note": "검은 진주해의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 51,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2689,
      2241,
      1793
    ],
    "prices": [
      239340,
      170957,
      119670
    ],
    "priceContexts": {
      "12_13": [
        239340,
        170957,
        119670
      ],
      "14": [
        263274,
        188053,
        131637
      ],
      "15": [
        287208,
        205148,
        143604
      ]
    },
    "atk": [
      36,
      33,
      31
    ],
    "motionPattern": "spiral",
    "biome": "black pearl sea",
    "legendary": false
  },
  {
    "id": 175,
    "name": "흑해갑주고래",
    "regions": [
      22
    ],
    "bait": "공용",
    "note": "검은 진주해의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 52,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      3732,
      3110,
      2488
    ],
    "prices": [
      373968,
      267120,
      186984
    ],
    "priceContexts": {
      "12_13": [
        373968,
        267120,
        186984
      ],
      "14": [
        411365,
        293832,
        205682
      ],
      "15": [
        448762,
        320544,
        224381
      ]
    },
    "atk": [
      36,
      33,
      31
    ],
    "motionPattern": "boss",
    "biome": "black pearl sea",
    "legendary": false
  },
  {
    "id": 176,
    "name": "모래시계어",
    "regions": [
      23
    ],
    "bait": "공용",
    "note": "시간의 모래톱의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 53,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2220,
      1850,
      1480
    ],
    "prices": [
      147493,
      105352,
      73746
    ],
    "priceContexts": {
      "12_13": [
        147493,
        105352,
        73746
      ],
      "14": [
        162242,
        115887,
        81121
      ],
      "15": [
        176992,
        126422,
        88495
      ]
    },
    "atk": [
      33,
      30,
      28
    ],
    "motionPattern": "steady",
    "biome": "hourglass sandbank",
    "legendary": false
  },
  {
    "id": 177,
    "name": "호박빛준치",
    "regions": [
      23
    ],
    "bait": "공용",
    "note": "시간의 모래톱의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 54,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2298,
      1915,
      1532
    ],
    "prices": [
      164846,
      117747,
      82423
    ],
    "priceContexts": {
      "12_13": [
        164846,
        117747,
        82423
      ],
      "14": [
        181331,
        129522,
        90665
      ],
      "15": [
        197815,
        141296,
        98908
      ]
    },
    "atk": [
      34,
      31,
      29
    ],
    "motionPattern": "dart",
    "biome": "hourglass sandbank",
    "legendary": false
  },
  {
    "id": 178,
    "name": "금사꼬리돔",
    "regions": [
      23
    ],
    "bait": "공용",
    "note": "시간의 모래톱의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 55,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2376,
      1980,
      1584
    ],
    "prices": [
      173522,
      123944,
      86761
    ],
    "priceContexts": {
      "12_13": [
        173522,
        123944,
        86761
      ],
      "14": [
        190874,
        136338,
        95437
      ],
      "15": [
        208226,
        148733,
        104113
      ]
    },
    "atk": [
      34,
      31,
      29
    ],
    "motionPattern": "zigzag",
    "biome": "hourglass sandbank",
    "legendary": false
  },
  {
    "id": 179,
    "name": "물결나침어",
    "regions": [
      23
    ],
    "bait": "공용",
    "note": "시간의 모래톱의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 56,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2453,
      2044,
      1635
    ],
    "prices": [
      182197,
      130141,
      91099
    ],
    "priceContexts": {
      "12_13": [
        182197,
        130141,
        91099
      ],
      "14": [
        200417,
        143155,
        100209
      ],
      "15": [
        218636,
        156169,
        109319
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "pulse",
    "biome": "hourglass sandbank",
    "legendary": false
  },
  {
    "id": 180,
    "name": "청동긴주둥이",
    "regions": [
      23
    ],
    "bait": "공용",
    "note": "시간의 모래톱의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 57,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2531,
      2109,
      1687
    ],
    "prices": [
      156170,
      111550,
      78085
    ],
    "priceContexts": {
      "12_13": [
        156170,
        111550,
        78085
      ],
      "14": [
        171787,
        122705,
        85894
      ],
      "15": [
        187404,
        133860,
        93702
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "dive",
    "biome": "hourglass sandbank",
    "legendary": false
  },
  {
    "id": 181,
    "name": "유리알복어",
    "regions": [
      23
    ],
    "bait": "공용",
    "note": "시간의 모래톱의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 58,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2609,
      2174,
      1739
    ],
    "prices": [
      199550,
      142536,
      99775
    ],
    "priceContexts": {
      "12_13": [
        199550,
        142536,
        99775
      ],
      "14": [
        219505,
        156790,
        109753
      ],
      "15": [
        239460,
        171043,
        119730
      ]
    },
    "atk": [
      36,
      33,
      31
    ],
    "motionPattern": "surge",
    "biome": "hourglass sandbank",
    "legendary": false
  },
  {
    "id": 182,
    "name": "나선무늬고등어",
    "regions": [
      23
    ],
    "bait": "공용",
    "note": "시간의 모래톱의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 59,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2686,
      2238,
      1790
    ],
    "prices": [
      190873,
      136338,
      95437
    ],
    "priceContexts": {
      "12_13": [
        190873,
        136338,
        95437
      ],
      "14": [
        209960,
        149972,
        104981
      ],
      "15": [
        229048,
        163606,
        114524
      ]
    },
    "atk": [
      36,
      33,
      31
    ],
    "motionPattern": "sway",
    "biome": "hourglass sandbank",
    "legendary": false
  },
  {
    "id": 183,
    "name": "영원의리본어",
    "regions": [
      23
    ],
    "bait": "공용",
    "note": "시간의 모래톱의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 60,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2764,
      2303,
      1842
    ],
    "prices": [
      277634,
      198310,
      138817
    ],
    "priceContexts": {
      "12_13": [
        277634,
        198310,
        138817
      ],
      "14": [
        305397,
        218141,
        152699
      ],
      "15": [
        333161,
        237972,
        166580
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "spiral",
    "biome": "hourglass sandbank",
    "legendary": false
  },
  {
    "id": 184,
    "name": "모래폭풍거북어",
    "regions": [
      23
    ],
    "bait": "공용",
    "note": "시간의 모래톱의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 61,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      3836,
      3197,
      2558
    ],
    "prices": [
      433804,
      309860,
      216902
    ],
    "priceContexts": {
      "12_13": [
        433804,
        309860,
        216902
      ],
      "14": [
        477184,
        340846,
        238592
      ],
      "15": [
        520565,
        371832,
        260282
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "boss",
    "biome": "hourglass sandbank",
    "legendary": false
  },
  {
    "id": 185,
    "name": "연잎잉어",
    "regions": [
      24
    ],
    "bait": "공용",
    "note": "운해 연꽃지의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 62,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2280,
      1900,
      1520
    ],
    "prices": [
      171093,
      122209,
      85546
    ],
    "priceContexts": {
      "12_13": [
        171093,
        122209,
        85546
      ],
      "14": [
        188202,
        134430,
        94101
      ],
      "15": [
        205312,
        146651,
        102655
      ]
    },
    "atk": [
      34,
      31,
      29
    ],
    "motionPattern": "steady",
    "biome": "cloud lotus pond",
    "legendary": false
  },
  {
    "id": 186,
    "name": "백련송사리",
    "regions": [
      24
    ],
    "bait": "공용",
    "note": "운해 연꽃지의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 63,
    "spriteSheet": "fish-extra-2.png",
    "hp": [
      2359,
      1966,
      1573
    ],
    "prices": [
      191220,
      136586,
      95610
    ],
    "priceContexts": {
      "12_13": [
        191220,
        136586,
        95610
      ],
      "14": [
        210342,
        150245,
        105171
      ],
      "15": [
        229464,
        163903,
        114732
      ]
    },
    "atk": [
      34,
      31,
      29
    ],
    "motionPattern": "dart",
    "biome": "cloud lotus pond",
    "legendary": false
  },
  {
    "id": 187,
    "name": "구름수염메기",
    "regions": [
      24
    ],
    "bait": "공용",
    "note": "운해 연꽃지의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 0,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2440,
      2033,
      1626
    ],
    "prices": [
      201285,
      143775,
      100642
    ],
    "priceContexts": {
      "12_13": [
        201285,
        143775,
        100642
      ],
      "14": [
        221414,
        158152,
        110706
      ],
      "15": [
        241542,
        172530,
        120770
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "zigzag",
    "biome": "cloud lotus pond",
    "legendary": false
  },
  {
    "id": 188,
    "name": "꽃술미꾸리",
    "regions": [
      24
    ],
    "bait": "공용",
    "note": "운해 연꽃지의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 1,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2520,
      2100,
      1680
    ],
    "prices": [
      211350,
      150964,
      105675
    ],
    "priceContexts": {
      "12_13": [
        211350,
        150964,
        105675
      ],
      "14": [
        232485,
        166060,
        116243
      ],
      "15": [
        253620,
        181157,
        126810
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "pulse",
    "biome": "cloud lotus pond",
    "legendary": false
  },
  {
    "id": 189,
    "name": "하늘비늘황어",
    "regions": [
      24
    ],
    "bait": "공용",
    "note": "운해 연꽃지의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 2,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2599,
      2166,
      1733
    ],
    "prices": [
      181157,
      129398,
      90579
    ],
    "priceContexts": {
      "12_13": [
        181157,
        129398,
        90579
      ],
      "14": [
        199273,
        142338,
        99637
      ],
      "15": [
        217388,
        155278,
        108695
      ]
    },
    "atk": [
      36,
      33,
      31
    ],
    "motionPattern": "dive",
    "biome": "cloud lotus pond",
    "legendary": false
  },
  {
    "id": 190,
    "name": "옥빛긴꼬리",
    "regions": [
      24
    ],
    "bait": "공용",
    "note": "운해 연꽃지의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 3,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2678,
      2232,
      1786
    ],
    "prices": [
      231477,
      165341,
      115739
    ],
    "priceContexts": {
      "12_13": [
        231477,
        165341,
        115739
      ],
      "14": [
        254625,
        181875,
        127313
      ],
      "15": [
        277772,
        198409,
        138887
      ]
    },
    "atk": [
      36,
      33,
      31
    ],
    "motionPattern": "surge",
    "biome": "cloud lotus pond",
    "legendary": false
  },
  {
    "id": 191,
    "name": "안개물방개어",
    "regions": [
      24
    ],
    "bait": "공용",
    "note": "운해 연꽃지의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 4,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2759,
      2299,
      1839
    ],
    "prices": [
      221413,
      158152,
      110706
    ],
    "priceContexts": {
      "12_13": [
        221413,
        158152,
        110706
      ],
      "14": [
        243554,
        173967,
        121777
      ],
      "15": [
        265696,
        189782,
        132847
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "sway",
    "biome": "cloud lotus pond",
    "legendary": false
  },
  {
    "id": 192,
    "name": "연꽃비단룡어",
    "regions": [
      24
    ],
    "bait": "공용",
    "note": "운해 연꽃지의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 5,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2839,
      2366,
      1893
    ],
    "prices": [
      322056,
      230040,
      161028
    ],
    "priceContexts": {
      "12_13": [
        322056,
        230040,
        161028
      ],
      "14": [
        354262,
        253044,
        177131
      ],
      "15": [
        386467,
        276048,
        193234
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "spiral",
    "biome": "cloud lotus pond",
    "legendary": false
  },
  {
    "id": 193,
    "name": "운해백수염룡",
    "regions": [
      24
    ],
    "bait": "공용",
    "note": "운해 연꽃지의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 6,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      3940,
      3283,
      2626
    ],
    "prices": [
      503213,
      359438,
      251607
    ],
    "priceContexts": {
      "12_13": [
        503213,
        359438,
        251607
      ],
      "14": [
        553534,
        395382,
        276768
      ],
      "15": [
        603856,
        431326,
        301928
      ]
    },
    "atk": [
      38,
      35,
      33
    ],
    "motionPattern": "boss",
    "biome": "cloud lotus pond",
    "legendary": false
  },
  {
    "id": 194,
    "name": "별비나비돔",
    "regions": [
      25
    ],
    "bait": "공용",
    "note": "별비 산호정원의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 7,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2340,
      1950,
      1560
    ],
    "prices": [
      198467,
      141762,
      99233
    ],
    "priceContexts": {
      "12_13": [
        198467,
        141762,
        99233
      ],
      "14": [
        218314,
        155938,
        109156
      ],
      "15": [
        238160,
        170114,
        119080
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "steady",
    "biome": "meteor shower coral garden",
    "legendary": false
  },
  {
    "id": 195,
    "name": "유성긴꼬리",
    "regions": [
      25
    ],
    "bait": "공용",
    "note": "별비 산호정원의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 8,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2422,
      2018,
      1614
    ],
    "prices": [
      221816,
      158440,
      110908
    ],
    "priceContexts": {
      "12_13": [
        221816,
        158440,
        110908
      ],
      "14": [
        243998,
        174284,
        121999
      ],
      "15": [
        266179,
        190128,
        133090
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "dart",
    "biome": "meteor shower coral garden",
    "legendary": false
  },
  {
    "id": 196,
    "name": "은하산호어",
    "regions": [
      25
    ],
    "bait": "공용",
    "note": "별비 산호정원의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 9,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2503,
      2086,
      1669
    ],
    "prices": [
      233491,
      166779,
      116745
    ],
    "priceContexts": {
      "12_13": [
        233491,
        166779,
        116745
      ],
      "14": [
        256840,
        183457,
        128420
      ],
      "15": [
        280189,
        200135,
        140094
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "zigzag",
    "biome": "meteor shower coral garden",
    "legendary": false
  },
  {
    "id": 197,
    "name": "혜성창꼬치",
    "regions": [
      25
    ],
    "bait": "공용",
    "note": "별비 산호정원의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 10,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2586,
      2155,
      1724
    ],
    "prices": [
      245165,
      175118,
      122583
    ],
    "priceContexts": {
      "12_13": [
        245165,
        175118,
        122583
      ],
      "14": [
        269682,
        192630,
        134841
      ],
      "15": [
        294198,
        210142,
        147100
      ]
    },
    "atk": [
      36,
      33,
      31
    ],
    "motionPattern": "pulse",
    "biome": "meteor shower coral garden",
    "legendary": false
  },
  {
    "id": 198,
    "name": "별가루복치",
    "regions": [
      25
    ],
    "bait": "공용",
    "note": "별비 산호정원의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 11,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2668,
      2223,
      1778
    ],
    "prices": [
      210141,
      150101,
      105071
    ],
    "priceContexts": {
      "12_13": [
        210141,
        150101,
        105071
      ],
      "14": [
        231155,
        165111,
        115578
      ],
      "15": [
        252169,
        180121,
        126085
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "dive",
    "biome": "meteor shower coral garden",
    "legendary": false
  },
  {
    "id": 199,
    "name": "달꽃부채어",
    "regions": [
      25
    ],
    "bait": "공용",
    "note": "별비 산호정원의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 12,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2749,
      2291,
      1833
    ],
    "prices": [
      268514,
      191796,
      134257
    ],
    "priceContexts": {
      "12_13": [
        268514,
        191796,
        134257
      ],
      "14": [
        295365,
        210976,
        147683
      ],
      "15": [
        322217,
        230155,
        161108
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "surge",
    "biome": "meteor shower coral garden",
    "legendary": false
  },
  {
    "id": 200,
    "name": "오로라쌍지느러미",
    "regions": [
      25
    ],
    "bait": "공용",
    "note": "별비 산호정원의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 13,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2832,
      2360,
      1888
    ],
    "prices": [
      256840,
      183457,
      128420
    ],
    "priceContexts": {
      "12_13": [
        256840,
        183457,
        128420
      ],
      "14": [
        282524,
        201803,
        141262
      ],
      "15": [
        308208,
        220148,
        154104
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "sway",
    "biome": "meteor shower coral garden",
    "legendary": false
  },
  {
    "id": 201,
    "name": "성운왕관어",
    "regions": [
      25
    ],
    "bait": "공용",
    "note": "별비 산호정원의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 14,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2914,
      2428,
      1942
    ],
    "prices": [
      373584,
      266846,
      186792
    ],
    "priceContexts": {
      "12_13": [
        373584,
        266846,
        186792
      ],
      "14": [
        410942,
        293531,
        205471
      ],
      "15": [
        448301,
        320215,
        224150
      ]
    },
    "atk": [
      38,
      35,
      33
    ],
    "motionPattern": "spiral",
    "biome": "meteor shower coral garden",
    "legendary": false
  },
  {
    "id": 202,
    "name": "유성뿔해마왕",
    "regions": [
      25
    ],
    "bait": "공용",
    "note": "별비 산호정원의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 15,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      4044,
      3370,
      2696
    ],
    "prices": [
      583727,
      416948,
      291864
    ],
    "priceContexts": {
      "12_13": [
        583727,
        416948,
        291864
      ],
      "14": [
        642100,
        458643,
        321050
      ],
      "15": [
        700472,
        500338,
        350237
      ]
    },
    "atk": [
      39,
      36,
      34
    ],
    "motionPattern": "boss",
    "biome": "meteor shower coral garden",
    "legendary": false
  },
  {
    "id": 203,
    "name": "혜성홍돔",
    "regions": [
      26
    ],
    "bait": "공용",
    "note": "붉은 혜성해의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 16,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2400,
      2000,
      1600
    ],
    "prices": [
      230222,
      164444,
      115111
    ],
    "priceContexts": {
      "12_13": [
        230222,
        164444,
        115111
      ],
      "14": [
        253244,
        180888,
        126622
      ],
      "15": [
        276266,
        197333,
        138133
      ]
    },
    "atk": [
      35,
      32,
      30
    ],
    "motionPattern": "steady",
    "biome": "red comet sea",
    "legendary": false
  },
  {
    "id": 204,
    "name": "적광날치",
    "regions": [
      26
    ],
    "bait": "공용",
    "note": "붉은 혜성해의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 17,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2484,
      2070,
      1656
    ],
    "prices": [
      257307,
      183791,
      128654
    ],
    "priceContexts": {
      "12_13": [
        257307,
        183791,
        128654
      ],
      "14": [
        283038,
        202170,
        141519
      ],
      "15": [
        308768,
        220549,
        154385
      ]
    },
    "atk": [
      36,
      33,
      31
    ],
    "motionPattern": "dart",
    "biome": "red comet sea",
    "legendary": false
  },
  {
    "id": 205,
    "name": "붉은궤도어",
    "regions": [
      26
    ],
    "bait": "공용",
    "note": "붉은 혜성해의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 18,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2568,
      2140,
      1712
    ],
    "prices": [
      270850,
      193464,
      135425
    ],
    "priceContexts": {
      "12_13": [
        270850,
        193464,
        135425
      ],
      "14": [
        297935,
        212810,
        148968
      ],
      "15": [
        325020,
        232157,
        162510
      ]
    },
    "atk": [
      36,
      33,
      31
    ],
    "motionPattern": "zigzag",
    "biome": "red comet sea",
    "legendary": false
  },
  {
    "id": 206,
    "name": "화염꼬리갈치",
    "regions": [
      26
    ],
    "bait": "공용",
    "note": "붉은 혜성해의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 19,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2652,
      2210,
      1768
    ],
    "prices": [
      284392,
      203137,
      142196
    ],
    "priceContexts": {
      "12_13": [
        284392,
        203137,
        142196
      ],
      "14": [
        312831,
        223451,
        156416
      ],
      "15": [
        341270,
        243764,
        170635
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "pulse",
    "biome": "red comet sea",
    "legendary": false
  },
  {
    "id": 207,
    "name": "진홍장창어",
    "regions": [
      26
    ],
    "bait": "공용",
    "note": "붉은 혜성해의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 20,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2736,
      2280,
      1824
    ],
    "prices": [
      243765,
      174118,
      121883
    ],
    "priceContexts": {
      "12_13": [
        243765,
        174118,
        121883
      ],
      "14": [
        268142,
        191530,
        134071
      ],
      "15": [
        292518,
        208942,
        146260
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "dive",
    "biome": "red comet sea",
    "legendary": false
  },
  {
    "id": 208,
    "name": "불꽃방패어",
    "regions": [
      26
    ],
    "bait": "공용",
    "note": "붉은 혜성해의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 21,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2820,
      2350,
      1880
    ],
    "prices": [
      311478,
      222484,
      155739
    ],
    "priceContexts": {
      "12_13": [
        311478,
        222484,
        155739
      ],
      "14": [
        342626,
        244732,
        171313
      ],
      "15": [
        373774,
        266981,
        186887
      ]
    },
    "atk": [
      38,
      35,
      33
    ],
    "motionPattern": "surge",
    "biome": "red comet sea",
    "legendary": false
  },
  {
    "id": 209,
    "name": "홍운칠성어",
    "regions": [
      26
    ],
    "bait": "공용",
    "note": "붉은 혜성해의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 22,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2904,
      2420,
      1936
    ],
    "prices": [
      297934,
      212810,
      148967
    ],
    "priceContexts": {
      "12_13": [
        297934,
        212810,
        148967
      ],
      "14": [
        327727,
        234091,
        163864
      ],
      "15": [
        357521,
        255372,
        178760
      ]
    },
    "atk": [
      38,
      35,
      33
    ],
    "motionPattern": "sway",
    "biome": "red comet sea",
    "legendary": false
  },
  {
    "id": 210,
    "name": "적성비단어",
    "regions": [
      26
    ],
    "bait": "공용",
    "note": "붉은 혜성해의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 23,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2988,
      2490,
      1992
    ],
    "prices": [
      433359,
      309542,
      216679
    ],
    "priceContexts": {
      "12_13": [
        433359,
        309542,
        216679
      ],
      "14": [
        476695,
        340496,
        238347
      ],
      "15": [
        520031,
        371450,
        260015
      ]
    },
    "atk": [
      39,
      36,
      34
    ],
    "motionPattern": "spiral",
    "biome": "red comet sea",
    "legendary": false
  },
  {
    "id": 211,
    "name": "혜성갑주상어",
    "regions": [
      26
    ],
    "bait": "공용",
    "note": "붉은 혜성해의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 24,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      4147,
      3456,
      2765
    ],
    "prices": [
      677124,
      483660,
      338562
    ],
    "priceContexts": {
      "12_13": [
        677124,
        483660,
        338562
      ],
      "14": [
        744836,
        532026,
        372418
      ],
      "15": [
        812549,
        580392,
        406274
      ]
    },
    "atk": [
      39,
      36,
      34
    ],
    "motionPattern": "boss",
    "biome": "red comet sea",
    "legendary": false
  },
  {
    "id": 212,
    "name": "청룡비늘어",
    "regions": [
      27
    ],
    "bait": "공용",
    "note": "푸른 용궁문의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 25,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2460,
      2050,
      1640
    ],
    "prices": [
      267057,
      190755,
      133528
    ],
    "priceContexts": {
      "12_13": [
        267057,
        190755,
        133528
      ],
      "14": [
        293763,
        209831,
        146881
      ],
      "15": [
        320468,
        228906,
        160234
      ]
    },
    "atk": [
      36,
      33,
      31
    ],
    "motionPattern": "steady",
    "biome": "azure dragon palace gate",
    "legendary": false
  },
  {
    "id": 213,
    "name": "궁문철갑어",
    "regions": [
      27
    ],
    "bait": "공용",
    "note": "푸른 용궁문의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 26,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2546,
      2122,
      1698
    ],
    "prices": [
      298476,
      213197,
      149238
    ],
    "priceContexts": {
      "12_13": [
        298476,
        213197,
        149238
      ],
      "14": [
        328324,
        234517,
        164162
      ],
      "15": [
        358171,
        255836,
        179086
      ]
    },
    "atk": [
      36,
      33,
      31
    ],
    "motionPattern": "dart",
    "biome": "azure dragon palace gate",
    "legendary": false
  },
  {
    "id": 214,
    "name": "푸른옥돔",
    "regions": [
      27
    ],
    "bait": "공용",
    "note": "푸른 용궁문의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 27,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2633,
      2194,
      1755
    ],
    "prices": [
      314185,
      224418,
      157093
    ],
    "priceContexts": {
      "12_13": [
        314185,
        224418,
        157093
      ],
      "14": [
        345604,
        246860,
        172802
      ],
      "15": [
        377022,
        269302,
        188512
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "zigzag",
    "biome": "azure dragon palace gate",
    "legendary": false
  },
  {
    "id": 215,
    "name": "비늘부채어",
    "regions": [
      27
    ],
    "bait": "공용",
    "note": "푸른 용궁문의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 28,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2718,
      2265,
      1812
    ],
    "prices": [
      329895,
      235639,
      164947
    ],
    "priceContexts": {
      "12_13": [
        329895,
        235639,
        164947
      ],
      "14": [
        362885,
        259203,
        181442
      ],
      "15": [
        395874,
        282767,
        197936
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "pulse",
    "biome": "azure dragon palace gate",
    "legendary": false
  },
  {
    "id": 216,
    "name": "벽옥쌍뿔어",
    "regions": [
      27
    ],
    "bait": "공용",
    "note": "푸른 용궁문의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 29,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2804,
      2337,
      1870
    ],
    "prices": [
      282766,
      201976,
      141383
    ],
    "priceContexts": {
      "12_13": [
        282766,
        201976,
        141383
      ],
      "14": [
        311043,
        222174,
        155521
      ],
      "15": [
        339319,
        242371,
        169660
      ]
    },
    "atk": [
      38,
      35,
      33
    ],
    "motionPattern": "dive",
    "biome": "azure dragon palace gate",
    "legendary": false
  },
  {
    "id": 217,
    "name": "용수염곰치",
    "regions": [
      27
    ],
    "bait": "공용",
    "note": "푸른 용궁문의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 30,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2891,
      2409,
      1927
    ],
    "prices": [
      361313,
      258081,
      180657
    ],
    "priceContexts": {
      "12_13": [
        361313,
        258081,
        180657
      ],
      "14": [
        397444,
        283889,
        198723
      ],
      "15": [
        433576,
        309697,
        216788
      ]
    },
    "atk": [
      38,
      35,
      33
    ],
    "motionPattern": "surge",
    "biome": "azure dragon palace gate",
    "legendary": false
  },
  {
    "id": 218,
    "name": "청운왕관돔",
    "regions": [
      27
    ],
    "bait": "공용",
    "note": "푸른 용궁문의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 31,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2976,
      2480,
      1984
    ],
    "prices": [
      345604,
      246860,
      172802
    ],
    "priceContexts": {
      "12_13": [
        345604,
        246860,
        172802
      ],
      "14": [
        380164,
        271546,
        190082
      ],
      "15": [
        414725,
        296232,
        207362
      ]
    },
    "atk": [
      39,
      36,
      34
    ],
    "motionPattern": "sway",
    "biome": "azure dragon palace gate",
    "legendary": false
  },
  {
    "id": 219,
    "name": "용궁비단어",
    "regions": [
      27
    ],
    "bait": "공용",
    "note": "푸른 용궁문의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 32,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      3062,
      2552,
      2042
    ],
    "prices": [
      502697,
      359069,
      251348
    ],
    "priceContexts": {
      "12_13": [
        502697,
        359069,
        251348
      ],
      "14": [
        552967,
        394976,
        276483
      ],
      "15": [
        603236,
        430883,
        301618
      ]
    },
    "atk": [
      39,
      36,
      34
    ],
    "motionPattern": "spiral",
    "biome": "azure dragon palace gate",
    "legendary": false
  },
  {
    "id": 220,
    "name": "용궁문지기",
    "regions": [
      27
    ],
    "bait": "공용",
    "note": "푸른 용궁문의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 33,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      4250,
      3542,
      2834
    ],
    "prices": [
      785463,
      561045,
      392732
    ],
    "priceContexts": {
      "12_13": [
        785463,
        561045,
        392732
      ],
      "14": [
        864009,
        617150,
        432005
      ],
      "15": [
        942556,
        673254,
        471278
      ]
    },
    "atk": [
      40,
      37,
      35
    ],
    "motionPattern": "boss",
    "biome": "azure dragon palace gate",
    "legendary": false
  },
  {
    "id": 221,
    "name": "은하송어",
    "regions": [
      28
    ],
    "bait": "공용",
    "note": "천상의 은하수의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 34,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2520,
      2100,
      1680
    ],
    "prices": [
      309786,
      221276,
      154893
    ],
    "priceContexts": {
      "12_13": [
        309786,
        221276,
        154893
      ],
      "14": [
        340765,
        243404,
        170382
      ],
      "15": [
        371743,
        265531,
        185872
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "steady",
    "biome": "celestial milky way",
    "legendary": false
  },
  {
    "id": 222,
    "name": "별자리금어",
    "regions": [
      28
    ],
    "bait": "공용",
    "note": "천상의 은하수의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 35,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2609,
      2174,
      1739
    ],
    "prices": [
      346233,
      247309,
      173116
    ],
    "priceContexts": {
      "12_13": [
        346233,
        247309,
        173116
      ],
      "14": [
        380856,
        272040,
        190428
      ],
      "15": [
        415480,
        296771,
        207739
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "dart",
    "biome": "celestial milky way",
    "legendary": false
  },
  {
    "id": 223,
    "name": "천상리본어",
    "regions": [
      28
    ],
    "bait": "공용",
    "note": "천상의 은하수의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 36,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2696,
      2247,
      1798
    ],
    "prices": [
      364455,
      260325,
      182228
    ],
    "priceContexts": {
      "12_13": [
        364455,
        260325,
        182228
      ],
      "14": [
        400901,
        286358,
        200451
      ],
      "15": [
        437346,
        312390,
        218674
      ]
    },
    "atk": [
      38,
      35,
      33
    ],
    "motionPattern": "zigzag",
    "biome": "celestial milky way",
    "legendary": false
  },
  {
    "id": 224,
    "name": "남십자창어",
    "regions": [
      28
    ],
    "bait": "공용",
    "note": "천상의 은하수의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 37,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2784,
      2320,
      1856
    ],
    "prices": [
      382677,
      273341,
      191339
    ],
    "priceContexts": {
      "12_13": [
        382677,
        273341,
        191339
      ],
      "14": [
        420945,
        300675,
        210473
      ],
      "15": [
        459212,
        328009,
        229607
      ]
    },
    "atk": [
      38,
      35,
      33
    ],
    "motionPattern": "pulse",
    "biome": "celestial milky way",
    "legendary": false
  },
  {
    "id": 225,
    "name": "은빛유성돔",
    "regions": [
      28
    ],
    "bait": "공용",
    "note": "천상의 은하수의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 38,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2873,
      2394,
      1915
    ],
    "prices": [
      328009,
      234292,
      164004
    ],
    "priceContexts": {
      "12_13": [
        328009,
        234292,
        164004
      ],
      "14": [
        360810,
        257721,
        180404
      ],
      "15": [
        393611,
        281150,
        196805
      ]
    },
    "atk": [
      39,
      36,
      34
    ],
    "motionPattern": "dive",
    "biome": "celestial milky way",
    "legendary": false
  },
  {
    "id": 226,
    "name": "북극성꼬리어",
    "regions": [
      28
    ],
    "bait": "공용",
    "note": "천상의 은하수의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 39,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2962,
      2468,
      1974
    ],
    "prices": [
      419124,
      299374,
      209562
    ],
    "priceContexts": {
      "12_13": [
        419124,
        299374,
        209562
      ],
      "14": [
        461036,
        329311,
        230518
      ],
      "15": [
        502949,
        359249,
        251474
      ]
    },
    "atk": [
      39,
      36,
      34
    ],
    "motionPattern": "surge",
    "biome": "celestial milky way",
    "legendary": false
  },
  {
    "id": 227,
    "name": "성운긴지느러미",
    "regions": [
      28
    ],
    "bait": "공용",
    "note": "천상의 은하수의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 40,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      3049,
      2541,
      2033
    ],
    "prices": [
      400901,
      286358,
      200451
    ],
    "priceContexts": {
      "12_13": [
        400901,
        286358,
        200451
      ],
      "14": [
        440991,
        314994,
        220496
      ],
      "15": [
        481081,
        343630,
        240541
      ]
    },
    "atk": [
      40,
      37,
      35
    ],
    "motionPattern": "sway",
    "biome": "celestial milky way",
    "legendary": false
  },
  {
    "id": 228,
    "name": "칠색천녀어",
    "regions": [
      28
    ],
    "bait": "공용",
    "note": "천상의 은하수의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 41,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      3137,
      2614,
      2091
    ],
    "prices": [
      583128,
      416520,
      291564
    ],
    "priceContexts": {
      "12_13": [
        583128,
        416520,
        291564
      ],
      "14": [
        641441,
        458172,
        320720
      ],
      "15": [
        699754,
        499824,
        349877
      ]
    },
    "atk": [
      40,
      37,
      35
    ],
    "motionPattern": "spiral",
    "biome": "celestial milky way",
    "legendary": false
  },
  {
    "id": 229,
    "name": "은하별뿔고래",
    "regions": [
      28
    ],
    "bait": "공용",
    "note": "천상의 은하수의 보스어종. 낮과 밤 모두 출현한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 42,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      4355,
      3629,
      2903
    ],
    "prices": [
      911137,
      650812,
      455568
    ],
    "priceContexts": {
      "12_13": [
        911137,
        650812,
        455568
      ],
      "14": [
        1002251,
        715893,
        501125
      ],
      "15": [
        1093364,
        780974,
        546682
      ]
    },
    "atk": [
      41,
      38,
      36
    ],
    "motionPattern": "boss",
    "biome": "celestial milky way",
    "legendary": false
  },
  {
    "id": 230,
    "name": "태초금비늘",
    "regions": [
      29
    ],
    "bait": "공용",
    "note": "태초의 천해의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 43,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2580,
      2150,
      1720
    ],
    "prices": [
      359352,
      256680,
      179676
    ],
    "priceContexts": {
      "12_13": [
        359352,
        256680,
        179676
      ],
      "14": [
        395287,
        282348,
        197644
      ],
      "15": [
        431222,
        308016,
        215611
      ]
    },
    "atk": [
      37,
      34,
      32
    ],
    "motionPattern": "steady",
    "biome": "primordial sky ocean",
    "legendary": false
  },
  {
    "id": 231,
    "name": "천해은날치",
    "regions": [
      29
    ],
    "bait": "공용",
    "note": "태초의 천해의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 44,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2670,
      2225,
      1780
    ],
    "prices": [
      401629,
      286878,
      200815
    ],
    "priceContexts": {
      "12_13": [
        401629,
        286878,
        200815
      ],
      "14": [
        441792,
        315566,
        220897
      ],
      "15": [
        481955,
        344254,
        240978
      ]
    },
    "atk": [
      38,
      35,
      33
    ],
    "motionPattern": "dart",
    "biome": "primordial sky ocean",
    "legendary": false
  },
  {
    "id": 232,
    "name": "창공장수어",
    "regions": [
      29
    ],
    "bait": "공용",
    "note": "태초의 천해의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 45,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2760,
      2300,
      1840
    ],
    "prices": [
      422768,
      301977,
      211384
    ],
    "priceContexts": {
      "12_13": [
        422768,
        301977,
        211384
      ],
      "14": [
        465045,
        332175,
        232522
      ],
      "15": [
        507322,
        362372,
        253661
      ]
    },
    "atk": [
      38,
      35,
      33
    ],
    "motionPattern": "zigzag",
    "biome": "primordial sky ocean",
    "legendary": false
  },
  {
    "id": 233,
    "name": "새벽별갑주어",
    "regions": [
      29
    ],
    "bait": "공용",
    "note": "태초의 천해의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 46,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2851,
      2376,
      1901
    ],
    "prices": [
      443906,
      317076,
      221953
    ],
    "priceContexts": {
      "12_13": [
        443906,
        317076,
        221953
      ],
      "14": [
        488297,
        348784,
        244148
      ],
      "15": [
        532687,
        380491,
        266344
      ]
    },
    "atk": [
      39,
      36,
      34
    ],
    "motionPattern": "pulse",
    "biome": "primordial sky ocean",
    "legendary": false
  },
  {
    "id": 234,
    "name": "영원푸른돔",
    "regions": [
      29
    ],
    "bait": "공용",
    "note": "태초의 천해의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 47,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      2941,
      2451,
      1961
    ],
    "prices": [
      380491,
      271779,
      190245
    ],
    "priceContexts": {
      "12_13": [
        380491,
        271779,
        190245
      ],
      "14": [
        418540,
        298957,
        209270
      ],
      "15": [
        456589,
        326135,
        228294
      ]
    },
    "atk": [
      39,
      36,
      34
    ],
    "motionPattern": "dive",
    "biome": "primordial sky ocean",
    "legendary": false
  },
  {
    "id": 235,
    "name": "천공쌍꼬리",
    "regions": [
      29
    ],
    "bait": "공용",
    "note": "태초의 천해의 어종. 낮에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 48,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      3031,
      2526,
      2021
    ],
    "prices": [
      486184,
      347274,
      243092
    ],
    "priceContexts": {
      "12_13": [
        486184,
        347274,
        243092
      ],
      "14": [
        534802,
        382001,
        267401
      ],
      "15": [
        583421,
        416729,
        291710
      ]
    },
    "atk": [
      40,
      37,
      35
    ],
    "motionPattern": "surge",
    "biome": "primordial sky ocean",
    "legendary": false
  },
  {
    "id": 236,
    "name": "광휘수염어",
    "regions": [
      29
    ],
    "bait": "공용",
    "note": "태초의 천해의 어종. 밤에 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 49,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      3122,
      2602,
      2082
    ],
    "prices": [
      465045,
      332175,
      232522
    ],
    "priceContexts": {
      "12_13": [
        465045,
        332175,
        232522
      ],
      "14": [
        511550,
        365393,
        255774
      ],
      "15": [
        558054,
        398610,
        279026
      ]
    },
    "atk": [
      40,
      37,
      35
    ],
    "motionPattern": "sway",
    "biome": "primordial sky ocean",
    "legendary": false
  },
  {
    "id": 237,
    "name": "태초무지개어",
    "regions": [
      29
    ],
    "bait": "공용",
    "note": "태초의 천해의 관상어. 밤에 출현한다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 50,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      3212,
      2677,
      2142
    ],
    "prices": [
      676428,
      483163,
      338214
    ],
    "priceContexts": {
      "12_13": [
        676428,
        483163,
        338214
      ],
      "14": [
        744071,
        531479,
        372035
      ],
      "15": [
        811714,
        579796,
        405857
      ]
    },
    "atk": [
      41,
      38,
      36
    ],
    "motionPattern": "spiral",
    "biome": "primordial sky ocean",
    "legendary": false
  },
  {
    "id": 238,
    "name": "천해왕지느러미",
    "regions": [
      29
    ],
    "bait": "공용",
    "note": "태초의 천해의 어종. 낮과 밤 모두 출현한다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 51,
    "spriteSheet": "fish-extra-3.png",
    "hp": [
      3302,
      2752,
      2202
    ],
    "prices": [
      1056919,
      754942,
      528459
    ],
    "priceContexts": {
      "12_13": [
        1056919,
        754942,
        528459
      ],
      "14": [
        1162611,
        830436,
        581305
      ],
      "15": [
        1268303,
        905930,
        634151
      ]
    },
    "atk": [
      41,
      38,
      36
    ],
    "motionPattern": "surge",
    "biome": "primordial sky ocean",
    "legendary": false
  },
  {
    "id": 239,
    "name": "천해룡 아스트라",
    "regions": [
      29
    ],
    "bait": "공용",
    "note": "태초의 천해에 나타나는 최종 전설. 레벨 100에서 도전한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 0,
    "spriteSheet": "legend.png",
    "hp": [
      2800,
      2500,
      2200
    ],
    "prices": [
      3623724,
      3019770,
      2415816
    ],
    "priceContexts": {
      "12_13": [
        3623724,
        3019770,
        2415816
      ],
      "14": [
        3623724,
        3019770,
        2415816
      ],
      "15": [
        3623724,
        3019770,
        2415816
      ]
    },
    "atk": [
      45,
      42,
      39
    ],
    "motionPattern": "celestial",
    "biome": "primordial sky ocean",
    "legendary": true,
    "atlasSheet": "fish-extra-3.png",
    "atlasIndex": 52,
    "requiredLevel": 100
  }
];
