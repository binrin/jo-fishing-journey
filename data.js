import {EXTRA_REGIONS,EXTRA_FISH} from './expansion-data.js';
// Static resource data for 조선생의 낚시여행.
// Sources: analysis/original-fish-data.json, native/fish-prices-hp.json,
// native/items-static.json and balance-model.json. No runtime APK execution.
// FISH numerical arrays retain original grade order 0,1,2; -1 means unavailable.
// prices uses original contexts 12/13; alternate contexts are preserved separately.
// Sprite positions use the original 59-species order in an 8 x 8 atlas.
// REGIONS economy values are PROPOSED_BALANCE_NOT_ORIGINAL_RUNTIME.
// time/day/night describe explicit original-note requirements, not inferred spawns.

export const FISH = [
  {
    "id": 0,
    "name": "피라미",
    "regions": [
      0
    ],
    "bait": "민물형/공용",
    "note": "숙련치 상승범위가 30까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 0,
    "hp": [
      200,
      150,
      100
    ],
    "prices": [
      200,
      100,
      70
    ],
    "priceContexts": {
      "12_13": [
        200,
        100,
        70
      ],
      "14": [
        200,
        120,
        50
      ],
      "15": [
        250,
        100,
        50
      ]
    },
    "atk": [
      10,
      8,
      6
    ]
  },
  {
    "id": 1,
    "name": "미꾸라지",
    "regions": [
      0
    ],
    "bait": "민물형/공용",
    "note": "밤에 출몰하며 가물치용 미끼로 사용된다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 1,
    "hp": [
      -1,
      -1,
      150
    ],
    "prices": [
      -1,
      -1,
      150
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        150
      ],
      "14": [
        -1,
        -1,
        120
      ],
      "15": [
        -1,
        -1,
        120
      ]
    },
    "atk": [
      -1,
      -1,
      8
    ]
  },
  {
    "id": 2,
    "name": "쏘가리",
    "regions": [
      0,
      1
    ],
    "bait": "민물형/공용",
    "note": "숙련치 상승범위가 30까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 2,
    "hp": [
      250,
      200,
      150
    ],
    "prices": [
      300,
      200,
      130
    ],
    "priceContexts": {
      "12_13": [
        300,
        200,
        130
      ],
      "14": [
        300,
        240,
        100
      ],
      "15": [
        400,
        200,
        100
      ]
    },
    "atk": [
      10,
      8,
      6
    ]
  },
  {
    "id": 3,
    "name": "메기",
    "regions": [
      0,
      1
    ],
    "bait": "민물형/공용",
    "note": "숙련치 상승범위가 30까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 3,
    "hp": [
      250,
      200,
      150
    ],
    "prices": [
      250,
      150,
      100
    ],
    "priceContexts": {
      "12_13": [
        250,
        150,
        100
      ],
      "14": [
        250,
        190,
        80
      ],
      "15": [
        350,
        150,
        80
      ]
    },
    "atk": [
      10,
      8,
      6
    ]
  },
  {
    "id": 4,
    "name": "꺽지",
    "regions": [
      0,
      1
    ],
    "bait": "민물형/공용",
    "note": "숙련치 상승범위가 30까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 4,
    "hp": [
      250,
      200,
      150
    ],
    "prices": [
      280,
      180,
      140
    ],
    "priceContexts": {
      "12_13": [
        280,
        180,
        140
      ],
      "14": [
        280,
        220,
        120
      ],
      "15": [
        380,
        180,
        120
      ]
    },
    "atk": [
      10,
      8,
      6
    ]
  },
  {
    "id": 5,
    "name": "쉬리",
    "regions": [
      0
    ],
    "bait": "황금지렁이",
    "note": "낮에 출몰하며 행운도 (40~60)을 가진다.",
    "boss": false,
    "ornamental": true,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 5,
    "hp": [
      -1,
      -1,
      150
    ],
    "prices": [
      -1,
      -1,
      2500
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        2500
      ],
      "14": [
        -1,
        -1,
        5000
      ],
      "15": [
        -1,
        -1,
        2500
      ]
    },
    "atk": [
      -1,
      -1,
      10
    ]
  },
  {
    "id": 6,
    "name": "산천어",
    "regions": [
      1
    ],
    "bait": "민물형/공용",
    "note": "밤에 출몰한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 6,
    "hp": [
      250,
      200,
      150
    ],
    "prices": [
      350,
      300,
      270
    ],
    "priceContexts": {
      "12_13": [
        350,
        300,
        270
      ],
      "14": [
        350,
        320,
        250
      ],
      "15": [
        440,
        300,
        250
      ]
    },
    "atk": [
      10,
      8,
      6
    ]
  },
  {
    "id": 7,
    "name": "배스",
    "regions": [
      1,
      2
    ],
    "bait": "민물형/공용",
    "note": "숙련치 상승범위가 60까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 7,
    "hp": [
      300,
      250,
      200
    ],
    "prices": [
      450,
      350,
      250
    ],
    "priceContexts": {
      "12_13": [
        450,
        350,
        250
      ],
      "14": [
        450,
        380,
        200
      ],
      "15": [
        580,
        350,
        200
      ]
    },
    "atk": [
      12,
      10,
      8
    ]
  },
  {
    "id": 8,
    "name": "연어",
    "regions": [
      1,
      2
    ],
    "bait": "민물형/공용",
    "note": "숙련치 상승범위가 60까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 8,
    "hp": [
      300,
      250,
      200
    ],
    "prices": [
      700,
      400,
      350
    ],
    "priceContexts": {
      "12_13": [
        700,
        400,
        350
      ],
      "14": [
        700,
        500,
        300
      ],
      "15": [
        800,
        400,
        300
      ]
    },
    "atk": [
      12,
      10,
      8
    ]
  },
  {
    "id": 9,
    "name": "가물치",
    "regions": [
      1
    ],
    "bait": "민물형/공용/미꾸라지",
    "note": "미꾸라지를 미끼로 사용해야 대형을 잡을 수 있다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 9,
    "hp": [
      300,
      250,
      200
    ],
    "prices": [
      600,
      450,
      380
    ],
    "priceContexts": {
      "12_13": [
        600,
        450,
        380
      ],
      "14": [
        600,
        520,
        350
      ],
      "15": [
        700,
        450,
        350
      ]
    },
    "atk": [
      12,
      10,
      8
    ]
  },
  {
    "id": 10,
    "name": "금붕어",
    "regions": [
      1
    ],
    "bait": "황금지렁이",
    "note": "밤에 출몰하며 행운도 (50~60)을 가진다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 10,
    "hp": [
      -1,
      -1,
      200
    ],
    "prices": [
      -1,
      -1,
      3000
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        3000
      ],
      "14": [
        -1,
        -1,
        6000
      ],
      "15": [
        -1,
        -1,
        3000
      ]
    },
    "atk": [
      -1,
      -1,
      12
    ]
  },
  {
    "id": 11,
    "name": "피라루크",
    "regions": [
      1
    ],
    "bait": "절인고기",
    "note": "낮에 출몰하는 연꽃 물굽이의 보스어종이다.",
    "boss": true,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 11,
    "hp": [
      500,
      -1,
      -1
    ],
    "prices": [
      10000,
      -1,
      -1
    ],
    "priceContexts": {
      "12_13": [
        10000,
        -1,
        -1
      ],
      "14": [
        10000,
        -1,
        -1
      ],
      "15": [
        11000,
        -1,
        -1
      ]
    },
    "atk": [
      15,
      -1,
      -1
    ]
  },
  {
    "id": 12,
    "name": "놀래기",
    "regions": [
      2
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 80까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 12,
    "hp": [
      300,
      250,
      200
    ],
    "prices": [
      600,
      450,
      350
    ],
    "priceContexts": {
      "12_13": [
        600,
        450,
        350
      ],
      "14": [
        600,
        560,
        300
      ],
      "15": [
        700,
        450,
        300
      ]
    },
    "atk": [
      12,
      10,
      8
    ]
  },
  {
    "id": 13,
    "name": "쥐치",
    "regions": [
      2,
      3
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 80까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 13,
    "hp": [
      300,
      250,
      200
    ],
    "prices": [
      700,
      500,
      300
    ],
    "priceContexts": {
      "12_13": [
        700,
        500,
        300
      ],
      "14": [
        700,
        580,
        250
      ],
      "15": [
        800,
        500,
        250
      ]
    },
    "atk": [
      12,
      10,
      8
    ]
  },
  {
    "id": 14,
    "name": "멸치",
    "regions": [
      2
    ],
    "bait": "바다형/공용",
    "note": "광어/삼치용 미끼로 사용된다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 14,
    "hp": [
      -1,
      -1,
      250
    ],
    "prices": [
      -1,
      -1,
      450
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        450
      ],
      "14": [
        -1,
        -1,
        400
      ],
      "15": [
        -1,
        -1,
        400
      ]
    },
    "atk": [
      -1,
      -1,
      10
    ]
  },
  {
    "id": 15,
    "name": "꽃게",
    "regions": [
      2,
      3
    ],
    "bait": "잡식형",
    "note": "밤에 출몰하며 바다/민물형 미끼 모두 사용 가능하다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 15,
    "hp": [
      300,
      250,
      200
    ],
    "prices": [
      900,
      700,
      600
    ],
    "priceContexts": {
      "12_13": [
        900,
        700,
        600
      ],
      "14": [
        900,
        800,
        500
      ],
      "15": [
        1200,
        700,
        500
      ]
    },
    "atk": [
      12,
      10,
      8
    ]
  },
  {
    "id": 16,
    "name": "아네모네",
    "regions": [
      2
    ],
    "bait": "황금지렁이",
    "note": "밤에 출몰하며 행운도 (50~80)을 가진다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 16,
    "hp": [
      -1,
      -1,
      200
    ],
    "prices": [
      -1,
      -1,
      3500
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        3500
      ],
      "14": [
        -1,
        -1,
        6000
      ],
      "15": [
        -1,
        -1,
        3500
      ]
    },
    "atk": [
      -1,
      -1,
      12
    ]
  },
  {
    "id": 17,
    "name": "꽁치",
    "regions": [
      3
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 100까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 17,
    "hp": [
      350,
      300,
      250
    ],
    "prices": [
      800,
      550,
      350
    ],
    "priceContexts": {
      "12_13": [
        800,
        550,
        350
      ],
      "14": [
        800,
        600,
        300
      ],
      "15": [
        900,
        550,
        300
      ]
    },
    "atk": [
      15,
      12,
      10
    ]
  },
  {
    "id": 18,
    "name": "고등어",
    "regions": [
      3
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 100까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 18,
    "hp": [
      350,
      300,
      250
    ],
    "prices": [
      850,
      700,
      550
    ],
    "priceContexts": {
      "12_13": [
        850,
        700,
        550
      ],
      "14": [
        850,
        780,
        500
      ],
      "15": [
        960,
        700,
        500
      ]
    },
    "atk": [
      15,
      12,
      10
    ]
  },
  {
    "id": 19,
    "name": "우럭",
    "regions": [
      3,
      4
    ],
    "bait": "잡식형",
    "note": "바다/민물형 미끼 모두 사용 가능하다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 19,
    "hp": [
      350,
      300,
      250
    ],
    "prices": [
      1100,
      800,
      500
    ],
    "priceContexts": {
      "12_13": [
        1100,
        800,
        500
      ],
      "14": [
        1100,
        900,
        400
      ],
      "15": [
        1250,
        800,
        400
      ]
    },
    "atk": [
      15,
      12,
      10
    ]
  },
  {
    "id": 20,
    "name": "문어",
    "regions": [
      3,
      4
    ],
    "bait": "잡식형",
    "note": "바다/민물형 미끼 모두 사용 가능하다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 20,
    "hp": [
      350,
      300,
      250
    ],
    "prices": [
      1200,
      900,
      600
    ],
    "priceContexts": {
      "12_13": [
        1200,
        900,
        600
      ],
      "14": [
        1200,
        990,
        500
      ],
      "15": [
        1400,
        900,
        500
      ]
    },
    "atk": [
      15,
      12,
      10
    ]
  },
  {
    "id": 21,
    "name": "앵무조개",
    "regions": [
      3
    ],
    "bait": "황금지렁이",
    "note": "낮에 출몰하며 행운도 (60~80)을 가진다.",
    "boss": false,
    "ornamental": true,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 21,
    "hp": [
      -1,
      -1,
      250
    ],
    "prices": [
      -1,
      -1,
      3500
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        3500
      ],
      "14": [
        -1,
        -1,
        7000
      ],
      "15": [
        -1,
        -1,
        3500
      ]
    },
    "atk": [
      -1,
      -1,
      15
    ]
  },
  {
    "id": 22,
    "name": "실라캔스",
    "regions": [
      3
    ],
    "bait": "절인고기",
    "note": "밤에 출물하는 안개잠긴 협곡의 보스어종이다.",
    "boss": true,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 22,
    "hp": [
      600,
      -1,
      -1
    ],
    "prices": [
      12000,
      -1,
      -1
    ],
    "priceContexts": {
      "12_13": [
        12000,
        -1,
        -1
      ],
      "14": [
        12000,
        -1,
        -1
      ],
      "15": [
        13000,
        -1,
        -1
      ]
    },
    "atk": [
      20,
      -1,
      -1
    ]
  },
  {
    "id": 23,
    "name": "황볼락",
    "regions": [
      4
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 150까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 23,
    "hp": [
      400,
      350,
      300
    ],
    "prices": [
      1500,
      1000,
      800
    ],
    "priceContexts": {
      "12_13": [
        1500,
        1000,
        800
      ],
      "14": [
        1500,
        1150,
        700
      ],
      "15": [
        1700,
        1000,
        700
      ]
    },
    "atk": [
      18,
      15,
      12
    ]
  },
  {
    "id": 24,
    "name": "도루묵",
    "regions": [
      4
    ],
    "bait": "바다형/공용",
    "note": "밤에 출몰하며 농어/아귀용 미끼로 사용된다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 24,
    "hp": [
      -1,
      -1,
      300
    ],
    "prices": [
      -1,
      -1,
      900
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        900
      ],
      "14": [
        -1,
        -1,
        800
      ],
      "15": [
        -1,
        -1,
        800
      ]
    },
    "atk": [
      -1,
      -1,
      12
    ]
  },
  {
    "id": 25,
    "name": "까치복",
    "regions": [
      4,
      5
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 150까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 25,
    "hp": [
      400,
      350,
      300
    ],
    "prices": [
      1800,
      1200,
      900
    ],
    "priceContexts": {
      "12_13": [
        1800,
        1200,
        900
      ],
      "14": [
        1800,
        1400,
        800
      ],
      "15": [
        2000,
        1200,
        800
      ]
    },
    "atk": [
      18,
      15,
      12
    ]
  },
  {
    "id": 26,
    "name": "명태",
    "regions": [
      4
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 150까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 26,
    "hp": [
      400,
      350,
      300
    ],
    "prices": [
      2000,
      1500,
      1000
    ],
    "priceContexts": {
      "12_13": [
        2000,
        1500,
        1000
      ],
      "14": [
        2000,
        1700,
        900
      ],
      "15": [
        2200,
        1500,
        900
      ]
    },
    "atk": [
      18,
      15,
      12
    ]
  },
  {
    "id": 27,
    "name": "세일핀탕",
    "regions": [
      4
    ],
    "bait": "황금지렁이",
    "note": "밤에 출몰하며 행운도 (70~80)을 가진다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 27,
    "hp": [
      -1,
      -1,
      300
    ],
    "prices": [
      -1,
      -1,
      4000
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        4000
      ],
      "14": [
        -1,
        -1,
        8000
      ],
      "15": [
        -1,
        -1,
        4000
      ]
    },
    "atk": [
      -1,
      -1,
      18
    ]
  },
  {
    "id": 28,
    "name": "뱀장어",
    "regions": [
      5,
      6
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 200까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 28,
    "hp": [
      400,
      350,
      300
    ],
    "prices": [
      3000,
      2000,
      1200
    ],
    "priceContexts": {
      "12_13": [
        3000,
        2000,
        1200
      ],
      "14": [
        3000,
        2400,
        1000
      ],
      "15": [
        3300,
        2000,
        1000
      ]
    },
    "atk": [
      18,
      15,
      12
    ]
  },
  {
    "id": 29,
    "name": "오징어",
    "regions": [
      5
    ],
    "bait": "바다형/공용",
    "note": "밤에 출몰하며 돌고래/청새치용 미끼로 사용된다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 29,
    "hp": [
      -1,
      350,
      -1
    ],
    "prices": [
      -1,
      1800,
      -1
    ],
    "priceContexts": {
      "12_13": [
        -1,
        1800,
        -1
      ],
      "14": [
        -1,
        2100,
        -1
      ],
      "15": [
        -1,
        1800,
        -1
      ]
    },
    "atk": [
      -1,
      15,
      -1
    ]
  },
  {
    "id": 30,
    "name": "광어",
    "regions": [
      5
    ],
    "bait": "바다형/공용/멸치",
    "note": "멸치를 미끼로 사용해야 대형을 잡을 수 있다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 30,
    "hp": [
      450,
      400,
      350
    ],
    "prices": [
      4200,
      2500,
      1400
    ],
    "priceContexts": {
      "12_13": [
        4200,
        2500,
        1400
      ],
      "14": [
        4200,
        2900,
        1000
      ],
      "15": [
        4500,
        2500,
        1000
      ]
    },
    "atk": [
      20,
      18,
      15
    ]
  },
  {
    "id": 31,
    "name": "삼치",
    "regions": [
      5
    ],
    "bait": "바다형/공용/멸치",
    "note": "멸치를 미끼로 사용해야 대형을 잡을 수 있다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 31,
    "hp": [
      450,
      400,
      350
    ],
    "prices": [
      3500,
      2300,
      1500
    ],
    "priceContexts": {
      "12_13": [
        3500,
        2300,
        1500
      ],
      "14": [
        3500,
        2800,
        1200
      ],
      "15": [
        3900,
        2300,
        1200
      ]
    },
    "atk": [
      20,
      18,
      15
    ]
  },
  {
    "id": 32,
    "name": "방어",
    "regions": [
      5,
      6
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 200까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 32,
    "hp": [
      450,
      400,
      350
    ],
    "prices": [
      5000,
      2800,
      1900
    ],
    "priceContexts": {
      "12_13": [
        5000,
        2800,
        1900
      ],
      "14": [
        5000,
        3300,
        1500
      ],
      "15": [
        5500,
        2800,
        1500
      ]
    },
    "atk": [
      20,
      18,
      15
    ]
  },
  {
    "id": 33,
    "name": "트리거",
    "regions": [
      5
    ],
    "bait": "황금지렁이",
    "note": "낮에 출몰하며 행운도 (80~100)을 가진다.",
    "boss": false,
    "ornamental": true,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 33,
    "hp": [
      -1,
      -1,
      350
    ],
    "prices": [
      -1,
      -1,
      4500
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        4500
      ],
      "14": [
        -1,
        -1,
        9000
      ],
      "15": [
        -1,
        -1,
        4500
      ]
    },
    "atk": [
      -1,
      -1,
      20
    ]
  },
  {
    "id": 34,
    "name": "오어피쉬",
    "regions": [
      5
    ],
    "bait": "절인고기",
    "note": "밤에 출몰하는 노을등대 해안 보스어종이다.",
    "boss": true,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 34,
    "hp": [
      650,
      -1,
      -1
    ],
    "prices": [
      13000,
      -1,
      -1
    ],
    "priceContexts": {
      "12_13": [
        13000,
        -1,
        -1
      ],
      "14": [
        13000,
        -1,
        -1
      ],
      "15": [
        14000,
        -1,
        -1
      ]
    },
    "atk": [
      25,
      -1,
      -1
    ]
  },
  {
    "id": 35,
    "name": "갈치",
    "regions": [
      6,
      7
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 250까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 35,
    "hp": [
      500,
      450,
      400
    ],
    "prices": [
      4500,
      3000,
      2400
    ],
    "priceContexts": {
      "12_13": [
        4500,
        3000,
        2400
      ],
      "14": [
        4500,
        3400,
        2000
      ],
      "15": [
        5100,
        3000,
        2000
      ]
    },
    "atk": [
      22,
      20,
      18
    ]
  },
  {
    "id": 36,
    "name": "참돔",
    "regions": [
      6,
      7
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 250까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 36,
    "hp": [
      500,
      450,
      400
    ],
    "prices": [
      6000,
      3500,
      2900
    ],
    "priceContexts": {
      "12_13": [
        6000,
        3500,
        2900
      ],
      "14": [
        6000,
        3900,
        2500
      ],
      "15": [
        6600,
        3500,
        2500
      ]
    },
    "atk": [
      22,
      20,
      18
    ]
  },
  {
    "id": 37,
    "name": "대하",
    "regions": [
      6
    ],
    "bait": "바다형/공용",
    "note": "개복치용 미끼로 사용된다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 37,
    "hp": [
      -1,
      -1,
      450
    ],
    "prices": [
      -1,
      -1,
      3900
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        3900
      ],
      "14": [
        -1,
        -1,
        3500
      ],
      "15": [
        -1,
        -1,
        3500
      ]
    },
    "atk": [
      -1,
      -1,
      20
    ]
  },
  {
    "id": 38,
    "name": "가오리",
    "regions": [
      6
    ],
    "bait": "바다형/공용",
    "note": "밤에 출몰한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 38,
    "hp": [
      500,
      450,
      400
    ],
    "prices": [
      6500,
      3800,
      2800
    ],
    "priceContexts": {
      "12_13": [
        6500,
        3800,
        2800
      ],
      "14": [
        6500,
        4200,
        2200
      ],
      "15": [
        7200,
        3800,
        2200
      ]
    },
    "atk": [
      22,
      20,
      18
    ]
  },
  {
    "id": 39,
    "name": "해마",
    "regions": [
      6
    ],
    "bait": "황금지렁이",
    "note": "밤에 출몰하며 행운도 (90~100)을 가진다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 39,
    "hp": [
      -1,
      -1,
      400
    ],
    "prices": [
      -1,
      -1,
      5000
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        5000
      ],
      "14": [
        -1,
        -1,
        10000
      ],
      "15": [
        -1,
        -1,
        5000
      ]
    },
    "atk": [
      -1,
      -1,
      22
    ]
  },
  {
    "id": 40,
    "name": "만타가오리",
    "regions": [
      6
    ],
    "bait": "절인고기",
    "note": "낮에 출몰하는 푸른산호 만 보스어종이다.",
    "boss": true,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 40,
    "hp": [
      700,
      -1,
      -1
    ],
    "prices": [
      14000,
      -1,
      -1
    ],
    "priceContexts": {
      "12_13": [
        14000,
        -1,
        -1
      ],
      "14": [
        14000,
        -1,
        -1
      ],
      "15": [
        15000,
        -1,
        -1
      ]
    },
    "atk": [
      27,
      -1,
      -1
    ]
  },
  {
    "id": 41,
    "name": "농어",
    "regions": [
      7
    ],
    "bait": "바다형/공용/도루묵",
    "note": "도루묵을 미끼로 사용해야 대형을 잡을 수 있다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 41,
    "hp": [
      550,
      500,
      450
    ],
    "prices": [
      7000,
      4000,
      3000
    ],
    "priceContexts": {
      "12_13": [
        7000,
        4000,
        3000
      ],
      "14": [
        7000,
        4500,
        2500
      ],
      "15": [
        7800,
        4000,
        2500
      ]
    },
    "atk": [
      25,
      22,
      20
    ]
  },
  {
    "id": 42,
    "name": "아귀",
    "regions": [
      7
    ],
    "bait": "바다형/공용/도루묵",
    "note": "도루묵을 미끼로 사용해야 대형을 잡을 수 있다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 42,
    "hp": [
      550,
      500,
      450
    ],
    "prices": [
      8000,
      4400,
      2800
    ],
    "priceContexts": {
      "12_13": [
        8000,
        4400,
        2800
      ],
      "14": [
        8000,
        5000,
        2200
      ],
      "15": [
        8800,
        4400,
        2200
      ]
    },
    "atk": [
      25,
      22,
      20
    ]
  },
  {
    "id": 43,
    "name": "황다랑어",
    "regions": [
      7,
      8
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 300까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 43,
    "hp": [
      550,
      500,
      450
    ],
    "prices": [
      9000,
      4600,
      3200
    ],
    "priceContexts": {
      "12_13": [
        9000,
        4600,
        3200
      ],
      "14": [
        9000,
        5200,
        2500
      ],
      "15": [
        10000,
        4600,
        2500
      ]
    },
    "atk": [
      25,
      22,
      20
    ]
  },
  {
    "id": 44,
    "name": "별상어",
    "regions": [
      7,
      8
    ],
    "bait": "바다형/공용",
    "note": "밤에 출몰한다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 44,
    "hp": [
      550,
      500,
      450
    ],
    "prices": [
      9500,
      5500,
      3500
    ],
    "priceContexts": {
      "12_13": [
        9500,
        5500,
        3500
      ],
      "14": [
        9500,
        6000,
        3000
      ],
      "15": [
        11000,
        5500,
        3000
      ]
    },
    "atk": [
      25,
      22,
      20
    ]
  },
  {
    "id": 45,
    "name": "꼬꼬마비룡어",
    "regions": [
      7
    ],
    "bait": "황금지렁이",
    "note": "낮에 출몰하며 행운도 (90~110)을 가진다.",
    "boss": false,
    "ornamental": true,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 45,
    "hp": [
      -1,
      -1,
      450
    ],
    "prices": [
      -1,
      -1,
      5500
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        5500
      ],
      "14": [
        -1,
        -1,
        11000
      ],
      "15": [
        -1,
        -1,
        5500
      ]
    },
    "atk": [
      -1,
      -1,
      25
    ]
  },
  {
    "id": 46,
    "name": "오색비룡어",
    "regions": [
      7
    ],
    "bait": "절인고기",
    "note": "밤에 출몰하는 비취폭포 골의 보스어종이다.",
    "boss": true,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 46,
    "hp": [
      750,
      -1,
      -1
    ],
    "prices": [
      15000,
      -1,
      -1
    ],
    "priceContexts": {
      "12_13": [
        15000,
        -1,
        -1
      ],
      "14": [
        15000,
        -1,
        -1
      ],
      "15": [
        16000,
        -1,
        -1
      ]
    },
    "atk": [
      30,
      -1,
      -1
    ]
  },
  {
    "id": 47,
    "name": "돌고래",
    "regions": [
      8
    ],
    "bait": "바다형/공용/오징어",
    "note": "오징어를 미끼로 사용해야 대형을 잡을 수 있다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 47,
    "hp": [
      600,
      550,
      500
    ],
    "prices": [
      9000,
      5000,
      4000
    ],
    "priceContexts": {
      "12_13": [
        9000,
        5000,
        4000
      ],
      "14": [
        9000,
        5500,
        3500
      ],
      "15": [
        11000,
        5000,
        3500
      ]
    },
    "atk": [
      28,
      25,
      22
    ]
  },
  {
    "id": 48,
    "name": "청새치",
    "regions": [
      8
    ],
    "bait": "바다형/공용/오징어",
    "note": "오징어를 미끼로 사용해야 대형을 잡을 수 있다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 48,
    "hp": [
      550,
      500,
      450
    ],
    "prices": [
      8000,
      6000,
      4500
    ],
    "priceContexts": {
      "12_13": [
        8000,
        6000,
        4500
      ],
      "14": [
        8000,
        6600,
        4000
      ],
      "15": [
        9200,
        6000,
        4000
      ]
    },
    "atk": [
      25,
      22,
      20
    ]
  },
  {
    "id": 49,
    "name": "범고래",
    "regions": [
      8,
      9
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 350까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 49,
    "hp": [
      600,
      550,
      500
    ],
    "prices": [
      10000,
      7500,
      5000
    ],
    "priceContexts": {
      "12_13": [
        10000,
        7500,
        5000
      ],
      "14": [
        10000,
        8000,
        4500
      ],
      "15": [
        11500,
        7500,
        4500
      ]
    },
    "atk": [
      28,
      25,
      22
    ]
  },
  {
    "id": 50,
    "name": "백상아리",
    "regions": [
      8,
      9
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 350까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 50,
    "hp": [
      600,
      550,
      500
    ],
    "prices": [
      12000,
      8000,
      6000
    ],
    "priceContexts": {
      "12_13": [
        12000,
        8000,
        6000
      ],
      "14": [
        12000,
        8800,
        5000
      ],
      "15": [
        13500,
        8000,
        5000
      ]
    },
    "atk": [
      28,
      25,
      22
    ]
  },
  {
    "id": 51,
    "name": "라이언피쉬",
    "regions": [
      8
    ],
    "bait": "황금지렁이",
    "note": "밤에 출몰하며 행운도 (90~120)을 가진다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 51,
    "hp": [
      -1,
      -1,
      500
    ],
    "prices": [
      -1,
      -1,
      7000
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        7000
      ],
      "14": [
        -1,
        -1,
        14000
      ],
      "15": [
        -1,
        -1,
        7000
      ]
    },
    "atk": [
      -1,
      -1,
      28
    ]
  },
  {
    "id": 52,
    "name": "메가마우스",
    "regions": [
      8
    ],
    "bait": "절인고기",
    "note": "낮에 출몰하는 은빛파도 해의 보스어종이다.",
    "boss": true,
    "ornamental": false,
    "time": "day",
    "night": false,
    "day": true,
    "spriteIndex": 52,
    "hp": [
      800,
      -1,
      -1
    ],
    "prices": [
      16000,
      -1,
      -1
    ],
    "priceContexts": {
      "12_13": [
        16000,
        -1,
        -1
      ],
      "14": [
        16000,
        -1,
        -1
      ],
      "15": [
        17000,
        -1,
        -1
      ]
    },
    "atk": [
      32,
      -1,
      -1
    ]
  },
  {
    "id": 53,
    "name": "삼발이",
    "regions": [
      9
    ],
    "bait": "바다형/공용",
    "note": "밤에 출몰하며 3개의 발을 가진 알수 없는 미끼이다.",
    "boss": false,
    "ornamental": false,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 53,
    "hp": [
      -1,
      -1,
      550
    ],
    "prices": [
      -1,
      -1,
      7000
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        7000
      ],
      "14": [
        -1,
        -1,
        6500
      ],
      "15": [
        -1,
        -1,
        6500
      ]
    },
    "atk": [
      -1,
      -1,
      28
    ]
  },
  {
    "id": 54,
    "name": "개복치",
    "regions": [
      9
    ],
    "bait": "바다형/공용/삼발이",
    "note": "대하를 미끼로 사용해야 대형을 잡을 수 있다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 54,
    "hp": [
      650,
      600,
      550
    ],
    "prices": [
      13000,
      8000,
      6000
    ],
    "priceContexts": {
      "12_13": [
        13000,
        8000,
        6000
      ],
      "14": [
        13000,
        9000,
        5500
      ],
      "15": [
        14500,
        8000,
        5500
      ]
    },
    "atk": [
      30,
      28,
      25
    ]
  },
  {
    "id": 55,
    "name": "바이퍼피쉬",
    "regions": [
      9
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 400까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 55,
    "hp": [
      650,
      600,
      550
    ],
    "prices": [
      14000,
      8500,
      5000
    ],
    "priceContexts": {
      "12_13": [
        14000,
        8500,
        5000
      ],
      "14": [
        14000,
        9200,
        4000
      ],
      "15": [
        15500,
        8500,
        4000
      ]
    },
    "atk": [
      30,
      28,
      25
    ]
  },
  {
    "id": 56,
    "name": "블랙데빌",
    "regions": [
      9
    ],
    "bait": "바다형/공용",
    "note": "숙련치 상승범위가 400까지이다.",
    "boss": false,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 56,
    "hp": [
      650,
      600,
      550
    ],
    "prices": [
      14500,
      9000,
      5500
    ],
    "priceContexts": {
      "12_13": [
        14500,
        9000,
        5500
      ],
      "14": [
        14500,
        10000,
        4500
      ],
      "15": [
        16000,
        9000,
        4500
      ]
    },
    "atk": [
      30,
      28,
      25
    ]
  },
  {
    "id": 57,
    "name": "발광해파리",
    "regions": [
      9
    ],
    "bait": "황금지렁이",
    "note": "밤에 출몰하며 행운도 (100~120)을 가진다.",
    "boss": false,
    "ornamental": true,
    "time": "night",
    "night": true,
    "day": false,
    "spriteIndex": 57,
    "hp": [
      -1,
      -1,
      550
    ],
    "prices": [
      -1,
      -1,
      7500
    ],
    "priceContexts": {
      "12_13": [
        -1,
        -1,
        7500
      ],
      "14": [
        -1,
        -1,
        15000
      ],
      "15": [
        -1,
        -1,
        7500
      ]
    },
    "atk": [
      -1,
      -1,
      30
    ]
  },
  {
    "id": 58,
    "name": "삼족어",
    "regions": [
      9
    ],
    "bait": "3개의 발?",
    "note": "엄청난 숙련도와 비슷한 물고기를 미끼로 사용해야 한다.",
    "boss": true,
    "ornamental": false,
    "time": "any",
    "night": false,
    "day": false,
    "spriteIndex": 58,
    "hp": [
      1000,
      -1,
      -1
    ],
    "prices": [
      100000,
      -1,
      -1
    ],
    "priceContexts": {
      "12_13": [
        100000,
        -1,
        -1
      ],
      "14": [
        100000,
        -1,
        -1
      ],
      "15": [
        100000,
        -1,
        -1
      ]
    },
    "atk": [
      40,
      -1,
      -1
    ]
  }
];

export const REGIONS = [
  {
    "region": "솔바람 개울",
    "value": 200,
    "bait": 16.0,
    "expense_on_sale": 30.0,
    "budget": 5300,
    "equipment": 3200,
    "unlock": 2100,
    "fight": 22,
    "setup": 23,
    "overhead": 10,
    "boss_id": null,
    "boss_name": "지역 의뢰",
    "boss_fight": 60,
    "boss_reward": 0,
    "quest_minutes": 8,
    "minimum_catches": 15,
    "id": 0,
    "name": "솔바람 개울",
    "display": "솔바람 개울",
    "bossId": null
  },
  {
    "region": "연꽃 물굽이",
    "value": 400,
    "bait": 32.0,
    "expense_on_sale": 60.0,
    "budget": 15100,
    "equipment": 9100,
    "unlock": 6000,
    "fight": 24,
    "setup": 23,
    "overhead": 10,
    "boss_id": 11,
    "boss_name": "피라루크",
    "boss_fight": 68,
    "boss_reward": 4000,
    "quest_minutes": 10,
    "minimum_catches": 20,
    "id": 1,
    "name": "연꽃 물굽이",
    "display": "연꽃 물굽이",
    "bossId": 11
  },
  {
    "region": "조개바위 포구",
    "value": 700,
    "bait": 56.0,
    "expense_on_sale": 105.0,
    "budget": 37100,
    "equipment": 22300,
    "unlock": 14800,
    "fight": 26,
    "setup": 23,
    "overhead": 10,
    "boss_id": null,
    "boss_name": "지역 의뢰",
    "boss_fight": 76,
    "boss_reward": 0,
    "quest_minutes": 12,
    "minimum_catches": 25,
    "id": 2,
    "name": "조개바위 포구",
    "display": "조개바위 포구",
    "bossId": null
  },
  {
    "region": "안개잠긴 협곡",
    "value": 1100,
    "bait": 88.0,
    "expense_on_sale": 165.0,
    "budget": 74900,
    "equipment": 44900,
    "unlock": 30000,
    "fight": 28,
    "setup": 23,
    "overhead": 10,
    "boss_id": 22,
    "boss_name": "실라캔스",
    "boss_fight": 84,
    "boss_reward": 11000,
    "quest_minutes": 14,
    "minimum_catches": 30,
    "id": 3,
    "name": "안개잠긴 협곡",
    "display": "안개잠긴 협곡",
    "bossId": 22
  },
  {
    "region": "에메랄드 초호",
    "value": 1800,
    "bait": 144.0,
    "expense_on_sale": 270.0,
    "budget": 149900,
    "equipment": 89900,
    "unlock": 60000,
    "fight": 30,
    "setup": 23,
    "overhead": 10,
    "boss_id": null,
    "boss_name": "지역 의뢰",
    "boss_fight": 92,
    "boss_reward": 0,
    "quest_minutes": 16,
    "minimum_catches": 35,
    "id": 4,
    "name": "에메랄드 초호",
    "display": "에메랄드 초호",
    "bossId": null
  },
  {
    "region": "노을등대 해안",
    "value": 2800,
    "bait": 224.0,
    "expense_on_sale": 420.0,
    "budget": 275500,
    "equipment": 165300,
    "unlock": 110200,
    "fight": 32,
    "setup": 23,
    "overhead": 10,
    "boss_id": 34,
    "boss_name": "오어피쉬",
    "boss_fight": 100,
    "boss_reward": 28000,
    "quest_minutes": 18,
    "minimum_catches": 40,
    "id": 5,
    "name": "노을등대 해안",
    "display": "노을등대 해안",
    "bossId": 34
  },
  {
    "region": "푸른산호 만",
    "value": 4200,
    "bait": 336.0,
    "expense_on_sale": 630.0,
    "budget": 476900,
    "equipment": 286100,
    "unlock": 190800,
    "fight": 34,
    "setup": 23,
    "overhead": 10,
    "boss_id": 40,
    "boss_name": "만타가오리",
    "boss_fight": 108,
    "boss_reward": 42000,
    "quest_minutes": 20,
    "minimum_catches": 45,
    "id": 6,
    "name": "푸른산호 만",
    "display": "푸른산호 만",
    "bossId": 40
  },
  {
    "region": "비취폭포 골",
    "value": 6500,
    "bait": 520.0,
    "expense_on_sale": 975.0,
    "budget": 836500,
    "equipment": 501900,
    "unlock": 334600,
    "fight": 36,
    "setup": 23,
    "overhead": 10,
    "boss_id": 46,
    "boss_name": "오색비룡어",
    "boss_fight": 116,
    "boss_reward": 65000,
    "quest_minutes": 22,
    "minimum_catches": 50,
    "id": 7,
    "name": "비취폭포 골",
    "display": "비취폭포 골",
    "bossId": 46
  },
  {
    "region": "은빛파도 해",
    "value": 10000,
    "bait": 800.0,
    "expense_on_sale": 1500.0,
    "budget": 1438300,
    "equipment": 863000,
    "unlock": 575300,
    "fight": 38,
    "setup": 23,
    "overhead": 10,
    "boss_id": 52,
    "boss_name": "메가마우스",
    "boss_fight": 124,
    "boss_reward": 100000,
    "quest_minutes": 24,
    "minimum_catches": 55,
    "id": 8,
    "name": "은빛파도 해",
    "display": "은빛파도 해",
    "bossId": 52
  },
  {
    "region": "별잠든 심연",
    "value": 15000,
    "bait": 1200.0,
    "expense_on_sale": 2250.0,
    "budget": 2498000,
    "equipment": 1498800,
    "unlock": 999200,
    "fight": 40,
    "setup": 23,
    "overhead": 10,
    "boss_id": 58,
    "boss_name": "삼족어",
    "boss_fight": 132,
    "boss_reward": 150000,
    "quest_minutes": 26,
    "minimum_catches": 60,
    "id": 9,
    "name": "별잠든 심연",
    "display": "별잠든 심연",
    "bossId": 58
  }
];

// Historical equipment reference; these prices are not the proposed shop economy.
export const EQUIPMENT_REFERENCE = [
  {
    "id": 0,
    "category": 0,
    "subtype": 0,
    "name": "대나무 낚싯대",
    "description": "숙련+2",
    "proficiency": 2,
    "power": 0,
    "purchase_price": 4000,
    "resale_price": 500
  },
  {
    "id": 1,
    "category": 0,
    "subtype": 0,
    "name": "카본 CB-1",
    "description": "숙련+4",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 15000,
    "resale_price": 2000
  },
  {
    "id": 2,
    "category": 0,
    "subtype": 0,
    "name": "카본 CB-2",
    "description": "숙련+5/힘+1",
    "proficiency": 5,
    "power": 1,
    "purchase_price": 80000,
    "resale_price": 10000
  },
  {
    "id": 3,
    "category": 0,
    "subtype": 0,
    "name": "특수소재XV",
    "description": "숙련+8",
    "proficiency": 8,
    "power": 0,
    "purchase_price": 200000,
    "resale_price": 20000
  },
  {
    "id": 4,
    "category": 0,
    "subtype": 0,
    "name": "딱! 올려 낚싯대",
    "description": "숙련+10",
    "proficiency": 10,
    "power": 0,
    "purchase_price": 400000,
    "resale_price": 40000
  },
  {
    "id": 5,
    "category": 0,
    "subtype": 0,
    "name": "낡은 대",
    "description": "효과없음",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 1000
  },
  {
    "id": 6,
    "category": 0,
    "subtype": 0,
    "name": "유목민의 낚싯대",
    "description": "숙련+3",
    "proficiency": 3,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 4500
  },
  {
    "id": 7,
    "category": 0,
    "subtype": 0,
    "name": "달빛 낚싯대",
    "description": "힘+1",
    "proficiency": 0,
    "power": 1,
    "purchase_price": 0,
    "resale_price": 5000
  },
  {
    "id": 8,
    "category": 0,
    "subtype": 0,
    "name": "고요의 낚싯대",
    "description": "숙련+4",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 6000
  },
  {
    "id": 9,
    "category": 0,
    "subtype": 0,
    "name": "야만인의 낚싯대",
    "description": "힘+3",
    "proficiency": 0,
    "power": 3,
    "purchase_price": 0,
    "resale_price": 8000
  },
  {
    "id": 10,
    "category": 0,
    "subtype": 0,
    "name": "불타는 낚싯대",
    "description": "숙련+6",
    "proficiency": 6,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 10000
  },
  {
    "id": 11,
    "category": 0,
    "subtype": 0,
    "name": "혼돈의 낚싯대",
    "description": "숙련+8",
    "proficiency": 8,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 14000
  },
  {
    "id": 12,
    "category": 0,
    "subtype": 0,
    "name": "조화의 낚싯대",
    "description": "숙련+5/힘+3",
    "proficiency": 5,
    "power": 3,
    "purchase_price": 0,
    "resale_price": 20000
  },
  {
    "id": 13,
    "category": 0,
    "subtype": 0,
    "name": "어둠의 낚싯대",
    "description": "숙련+10/힘+3",
    "proficiency": 10,
    "power": 3,
    "purchase_price": 0,
    "resale_price": 25000
  },
  {
    "id": 14,
    "category": 0,
    "subtype": 0,
    "name": "영모의 낚싯대",
    "description": "숙련+5/힘+6",
    "proficiency": 5,
    "power": 6,
    "purchase_price": 0,
    "resale_price": 30000
  },
  {
    "id": 15,
    "category": 0,
    "subtype": 0,
    "name": "끈기의 낚싯대",
    "description": "숙련+10/힘+4",
    "proficiency": 10,
    "power": 4,
    "purchase_price": 0,
    "resale_price": 35000
  },
  {
    "id": 16,
    "category": 0,
    "subtype": 0,
    "name": "죽은자의 대",
    "description": "숙련+12/힘+5/체력+10",
    "proficiency": 12,
    "power": 5,
    "purchase_price": 0,
    "resale_price": 40000
  },
  {
    "id": 17,
    "category": 0,
    "subtype": 0,
    "name": "폭풍의 낚싯대",
    "description": "숙련+15/힘+6/체력+15",
    "proficiency": 15,
    "power": 6,
    "purchase_price": 0,
    "resale_price": 45000
  },
  {
    "id": 18,
    "category": 0,
    "subtype": 0,
    "name": "삼족어의 갈비뼈",
    "description": "숙련+15/힘+5/체력+20",
    "proficiency": 15,
    "power": 5,
    "purchase_price": 0,
    "resale_price": 50000
  },
  {
    "id": 19,
    "category": 3,
    "subtype": 1,
    "name": "플라스틱 릴",
    "description": "숙련+2",
    "proficiency": 2,
    "power": 0,
    "purchase_price": 4000,
    "resale_price": 500
  },
  {
    "id": 20,
    "category": 3,
    "subtype": 1,
    "name": "스텐 ST-1",
    "description": "숙련+4",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 15000,
    "resale_price": 2000
  },
  {
    "id": 21,
    "category": 3,
    "subtype": 1,
    "name": "전동 릴 X-1",
    "description": "숙련+5/체력+12",
    "proficiency": 5,
    "power": 0,
    "purchase_price": 80000,
    "resale_price": 10000
  },
  {
    "id": 22,
    "category": 3,
    "subtype": 1,
    "name": "장구통 SP2008",
    "description": "숙련+8",
    "proficiency": 8,
    "power": 0,
    "purchase_price": 200000,
    "resale_price": 20000
  },
  {
    "id": 23,
    "category": 3,
    "subtype": 1,
    "name": "딱! 감겨 릴",
    "description": "숙련+10",
    "proficiency": 10,
    "power": 0,
    "purchase_price": 400000,
    "resale_price": 40000
  },
  {
    "id": 24,
    "category": 3,
    "subtype": 1,
    "name": "낡은 릴",
    "description": "효과없음",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 1000
  },
  {
    "id": 25,
    "category": 3,
    "subtype": 1,
    "name": "유목민의 릴",
    "description": "숙련+3",
    "proficiency": 3,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 4500
  },
  {
    "id": 26,
    "category": 3,
    "subtype": 1,
    "name": "단단한 릴",
    "description": "체력+8",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 5000
  },
  {
    "id": 27,
    "category": 3,
    "subtype": 1,
    "name": "별빛 릴",
    "description": "숙련+4",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 6000
  },
  {
    "id": 28,
    "category": 3,
    "subtype": 1,
    "name": "야만인의 릴",
    "description": "체력+10",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 8000
  },
  {
    "id": 29,
    "category": 3,
    "subtype": 1,
    "name": "마력의 릴",
    "description": "숙련+6",
    "proficiency": 6,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 10000
  },
  {
    "id": 30,
    "category": 3,
    "subtype": 1,
    "name": "그림자의 릴",
    "description": "숙련+4/체력+10",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 14000
  },
  {
    "id": 31,
    "category": 3,
    "subtype": 1,
    "name": "조화의 릴",
    "description": "숙련+8",
    "proficiency": 8,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 20000
  },
  {
    "id": 32,
    "category": 3,
    "subtype": 1,
    "name": "지혜의 릴",
    "description": "숙련+10/체력+12",
    "proficiency": 10,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 25000
  },
  {
    "id": 33,
    "category": 3,
    "subtype": 1,
    "name": "신성한 릴",
    "description": "숙련+5/체력+20",
    "proficiency": 5,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 30000
  },
  {
    "id": 34,
    "category": 3,
    "subtype": 1,
    "name": "금샘의 릴",
    "description": "숙련+10/체력+12",
    "proficiency": 10,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 35000
  },
  {
    "id": 35,
    "category": 3,
    "subtype": 1,
    "name": "죽은자의 릴",
    "description": "숙련+12/힘+2/체력+12",
    "proficiency": 12,
    "power": 2,
    "purchase_price": 0,
    "resale_price": 40000
  },
  {
    "id": 36,
    "category": 3,
    "subtype": 1,
    "name": "추적자의 릴",
    "description": "숙련+15/힘+3/체력+15",
    "proficiency": 15,
    "power": 3,
    "purchase_price": 0,
    "resale_price": 45000
  },
  {
    "id": 37,
    "category": 3,
    "subtype": 1,
    "name": "삼족어의 척추뼈",
    "description": "숙련+15/힘+4/체력+20",
    "proficiency": 15,
    "power": 4,
    "purchase_price": 0,
    "resale_price": 50000
  },
  {
    "id": 38,
    "category": 1,
    "subtype": 2,
    "name": "파닥줄 1호",
    "description": "체력+2",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 4000,
    "resale_price": 500
  },
  {
    "id": 39,
    "category": 1,
    "subtype": 2,
    "name": "파닥줄 2호",
    "description": "숙련+4",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 15000,
    "resale_price": 2000
  },
  {
    "id": 40,
    "category": 1,
    "subtype": 2,
    "name": "GS-100",
    "description": "숙련+4/체력+2",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 80000,
    "resale_price": 10000
  },
  {
    "id": 41,
    "category": 1,
    "subtype": 2,
    "name": "GS-200",
    "description": "숙련+6",
    "proficiency": 6,
    "power": 0,
    "purchase_price": 150000,
    "resale_price": 15000
  },
  {
    "id": 42,
    "category": 1,
    "subtype": 2,
    "name": "딱질겨 줄",
    "description": "숙련+8",
    "proficiency": 8,
    "power": 0,
    "purchase_price": 200000,
    "resale_price": 20000
  },
  {
    "id": 43,
    "category": 1,
    "subtype": 2,
    "name": "낡은 줄",
    "description": "효과없음",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 800
  },
  {
    "id": 44,
    "category": 1,
    "subtype": 2,
    "name": "유목민의 줄",
    "description": "숙련+2",
    "proficiency": 2,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 3000
  },
  {
    "id": 45,
    "category": 1,
    "subtype": 2,
    "name": "달빛 실타래",
    "description": "체력+5",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 3000
  },
  {
    "id": 46,
    "category": 1,
    "subtype": 2,
    "name": "포박의 줄",
    "description": "숙련+3",
    "proficiency": 3,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 5000
  },
  {
    "id": 47,
    "category": 1,
    "subtype": 2,
    "name": "야만인의 줄",
    "description": "숙련+4",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 6000
  },
  {
    "id": 48,
    "category": 1,
    "subtype": 2,
    "name": "불타는 줄",
    "description": "숙련+5",
    "proficiency": 5,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 8000
  },
  {
    "id": 49,
    "category": 1,
    "subtype": 2,
    "name": "고래힘줄",
    "description": "숙련+5/체력+4",
    "proficiency": 5,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 12000
  },
  {
    "id": 50,
    "category": 1,
    "subtype": 2,
    "name": "조화의 줄",
    "description": "숙련+7",
    "proficiency": 7,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 15000
  },
  {
    "id": 51,
    "category": 1,
    "subtype": 2,
    "name": "정화의 줄",
    "description": "숙련+6/체력+6",
    "proficiency": 6,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 20000
  },
  {
    "id": 52,
    "category": 1,
    "subtype": 2,
    "name": "찬란한 오색줄",
    "description": "숙련+8/체력+8",
    "proficiency": 8,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 25000
  },
  {
    "id": 53,
    "category": 1,
    "subtype": 2,
    "name": "영혼의 실타래",
    "description": "숙련+7/체력+10",
    "proficiency": 7,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 26000
  },
  {
    "id": 54,
    "category": 1,
    "subtype": 2,
    "name": "죽은자의 줄",
    "description": "숙련+8/힘+2/체력+10",
    "proficiency": 8,
    "power": 2,
    "purchase_price": 0,
    "resale_price": 30000
  },
  {
    "id": 55,
    "category": 1,
    "subtype": 2,
    "name": "악마의 실타래",
    "description": "숙련+9/힘+3/체력+12",
    "proficiency": 9,
    "power": 3,
    "purchase_price": 0,
    "resale_price": 35000
  },
  {
    "id": 56,
    "category": 1,
    "subtype": 2,
    "name": "삼족어의 머리털",
    "description": "숙련+10/힘+4/체력+15",
    "proficiency": 10,
    "power": 4,
    "purchase_price": 0,
    "resale_price": 40000
  },
  {
    "id": 57,
    "category": 4,
    "subtype": 3,
    "name": "미니 바늘",
    "description": "힘+1",
    "proficiency": 0,
    "power": 1,
    "purchase_price": 4000,
    "resale_price": 500
  },
  {
    "id": 58,
    "category": 4,
    "subtype": 3,
    "name": "2중 바늘",
    "description": "숙련+4",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 15000,
    "resale_price": 2000
  },
  {
    "id": 59,
    "category": 4,
    "subtype": 3,
    "name": "천리안 바늘",
    "description": "숙련+4/힘+1",
    "proficiency": 4,
    "power": 1,
    "purchase_price": 80000,
    "resale_price": 10000
  },
  {
    "id": 60,
    "category": 4,
    "subtype": 3,
    "name": "딱! 물려 바늘",
    "description": "숙련+6",
    "proficiency": 6,
    "power": 0,
    "purchase_price": 150000,
    "resale_price": 15000
  },
  {
    "id": 61,
    "category": 4,
    "subtype": 3,
    "name": "물어물어 바늘",
    "description": "숙련+8",
    "proficiency": 8,
    "power": 0,
    "purchase_price": 200000,
    "resale_price": 20000
  },
  {
    "id": 62,
    "category": 4,
    "subtype": 3,
    "name": "부서진 바늘",
    "description": "효과없음",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 800
  },
  {
    "id": 63,
    "category": 4,
    "subtype": 3,
    "name": "유목민의 바늘",
    "description": "숙련+2",
    "proficiency": 2,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 3000
  },
  {
    "id": 64,
    "category": 4,
    "subtype": 3,
    "name": "사자의 이빨",
    "description": "힘+2",
    "proficiency": 0,
    "power": 2,
    "purchase_price": 0,
    "resale_price": 3000
  },
  {
    "id": 65,
    "category": 4,
    "subtype": 3,
    "name": "교묘한 바늘",
    "description": "숙련+3",
    "proficiency": 3,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 5000
  },
  {
    "id": 66,
    "category": 4,
    "subtype": 3,
    "name": "야만인의 바늘",
    "description": "숙련+4",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 6000
  },
  {
    "id": 67,
    "category": 4,
    "subtype": 3,
    "name": "혼돈의 바늘",
    "description": "숙련+5",
    "proficiency": 5,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 8000
  },
  {
    "id": 68,
    "category": 4,
    "subtype": 3,
    "name": "조화의 바늘",
    "description": "숙련+5/힘+1",
    "proficiency": 5,
    "power": 1,
    "purchase_price": 0,
    "resale_price": 12000
  },
  {
    "id": 69,
    "category": 4,
    "subtype": 3,
    "name": "비수의 바늘",
    "description": "숙련+7",
    "proficiency": 7,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 15000
  },
  {
    "id": 70,
    "category": 4,
    "subtype": 3,
    "name": "고통의 바늘",
    "description": "숙련+6/힘+2",
    "proficiency": 6,
    "power": 2,
    "purchase_price": 0,
    "resale_price": 20000
  },
  {
    "id": 71,
    "category": 4,
    "subtype": 3,
    "name": "신성한 바늘",
    "description": "숙련+8/힘+2",
    "proficiency": 8,
    "power": 2,
    "purchase_price": 0,
    "resale_price": 25000
  },
  {
    "id": 72,
    "category": 4,
    "subtype": 3,
    "name": "용의 손아귀",
    "description": "숙련+7/힘+3",
    "proficiency": 7,
    "power": 3,
    "purchase_price": 0,
    "resale_price": 26000
  },
  {
    "id": 73,
    "category": 4,
    "subtype": 3,
    "name": "죽은자의 바늘",
    "description": "숙련+8/힘+2/체력+10",
    "proficiency": 8,
    "power": 2,
    "purchase_price": 0,
    "resale_price": 30000
  },
  {
    "id": 74,
    "category": 4,
    "subtype": 3,
    "name": "악마의 이빨",
    "description": "숙련+9/힘+3/체력+12",
    "proficiency": 9,
    "power": 3,
    "purchase_price": 0,
    "resale_price": 35000
  },
  {
    "id": 75,
    "category": 4,
    "subtype": 3,
    "name": "삼족어의 발톱",
    "description": "숙련+10/힘+4/체력+15",
    "proficiency": 10,
    "power": 4,
    "purchase_price": 0,
    "resale_price": 40000
  },
  {
    "id": 76,
    "category": 6,
    "subtype": 4,
    "name": "갯지렁이",
    "description": "공용",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 1000,
    "resale_price": 10
  },
  {
    "id": 77,
    "category": 6,
    "subtype": 4,
    "name": "물벌레",
    "description": "민물형",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 2000,
    "resale_price": 20
  },
  {
    "id": 78,
    "category": 6,
    "subtype": 4,
    "name": "떡밥",
    "description": "민물형",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 3000,
    "resale_price": 30
  },
  {
    "id": 79,
    "category": 6,
    "subtype": 4,
    "name": "바위벌레",
    "description": "바다형",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 5000,
    "resale_price": 40
  },
  {
    "id": 80,
    "category": 6,
    "subtype": 4,
    "name": "생선조각",
    "description": "바다형",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 8000,
    "resale_price": 50
  },
  {
    "id": 81,
    "category": 6,
    "subtype": 4,
    "name": "모조벌레",
    "description": "공용(힘+5)",
    "proficiency": 0,
    "power": 5,
    "purchase_price": 15000,
    "resale_price": 1000
  },
  {
    "id": 82,
    "category": 6,
    "subtype": 4,
    "name": "미꾸라지",
    "description": "사슬미끼",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 50
  },
  {
    "id": 83,
    "category": 6,
    "subtype": 4,
    "name": "멸치",
    "description": "사슬미끼",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 80
  },
  {
    "id": 84,
    "category": 6,
    "subtype": 4,
    "name": "도루묵",
    "description": "사슬미끼",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 100
  },
  {
    "id": 85,
    "category": 6,
    "subtype": 4,
    "name": "오징어",
    "description": "사슬미끼",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 500
  },
  {
    "id": 86,
    "category": 6,
    "subtype": 4,
    "name": "대하",
    "description": "사슬미끼",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 1000
  },
  {
    "id": 87,
    "category": 6,
    "subtype": 4,
    "name": "삼발이",
    "description": "사슬미끼",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 5000
  },
  {
    "id": 88,
    "category": 2,
    "subtype": 5,
    "name": "짝퉁모자",
    "description": "체력+15",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 15000,
    "resale_price": 2000
  },
  {
    "id": 89,
    "category": 5,
    "subtype": 5,
    "name": "짝퉁조끼",
    "description": "숙련+3/체력+10",
    "proficiency": 3,
    "power": 0,
    "purchase_price": 20000,
    "resale_price": 2000
  },
  {
    "id": 90,
    "category": 7,
    "subtype": 5,
    "name": "짝퉁 슬리퍼",
    "description": "힘+2",
    "proficiency": 0,
    "power": 2,
    "purchase_price": 15000,
    "resale_price": 2000
  },
  {
    "id": 91,
    "category": 2,
    "subtype": 5,
    "name": "여행용 모자",
    "description": "체력+30",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 200000,
    "resale_price": 20000
  },
  {
    "id": 92,
    "category": 5,
    "subtype": 5,
    "name": "반딧불 조끼",
    "description": "숙련+6/체력+25",
    "proficiency": 6,
    "power": 0,
    "purchase_price": 300000,
    "resale_price": 20000
  },
  {
    "id": 93,
    "category": 7,
    "subtype": 5,
    "name": "튼튼신발",
    "description": "힘+4",
    "proficiency": 0,
    "power": 4,
    "purchase_price": 200000,
    "resale_price": 20000
  },
  {
    "id": 94,
    "category": 5,
    "subtype": 5,
    "name": "낡은 조끼",
    "description": "숙련+2/체력+8",
    "proficiency": 2,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 2000
  },
  {
    "id": 95,
    "category": 2,
    "subtype": 5,
    "name": "밀짚모자",
    "description": "체력+8",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 2000
  },
  {
    "id": 96,
    "category": 2,
    "subtype": 5,
    "name": "유목민의 모자",
    "description": "체력+12",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 3000
  },
  {
    "id": 97,
    "category": 2,
    "subtype": 5,
    "name": "야만인의 모자",
    "description": "숙련+2/체력+12",
    "proficiency": 2,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 5000
  },
  {
    "id": 98,
    "category": 2,
    "subtype": 5,
    "name": "초원의 모자",
    "description": "숙련+4/체력+15",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 10000
  },
  {
    "id": 99,
    "category": 2,
    "subtype": 5,
    "name": "할로윈 모자",
    "description": "숙련+6/체력+20",
    "proficiency": 6,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 20000
  },
  {
    "id": 100,
    "category": 2,
    "subtype": 5,
    "name": "현자의 모자",
    "description": "숙련+4/체력+25",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 25000
  },
  {
    "id": 101,
    "category": 2,
    "subtype": 5,
    "name": "삼족어의 해골",
    "description": "숙련+6/힘+2/체력+30",
    "proficiency": 6,
    "power": 2,
    "purchase_price": 0,
    "resale_price": 30000
  },
  {
    "id": 102,
    "category": 5,
    "subtype": 5,
    "name": "유목민의 조끼",
    "description": "숙련+3/체력+10",
    "proficiency": 3,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 3000
  },
  {
    "id": 103,
    "category": 5,
    "subtype": 5,
    "name": "야만인의 조끼",
    "description": "숙련+4/체력+12",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 5000
  },
  {
    "id": 104,
    "category": 5,
    "subtype": 5,
    "name": "초원의 조끼",
    "description": "숙련+5/체력+15",
    "proficiency": 5,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 10000
  },
  {
    "id": 105,
    "category": 5,
    "subtype": 5,
    "name": "호랑이 외투",
    "description": "숙련+6/체력+20",
    "proficiency": 6,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 10000
  },
  {
    "id": 106,
    "category": 5,
    "subtype": 5,
    "name": "강태공의 조끼",
    "description": "숙련+7/체력+25",
    "proficiency": 7,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 10000
  },
  {
    "id": 107,
    "category": 5,
    "subtype": 5,
    "name": "삼족어의 가죽옷",
    "description": "숙련+8/힘+2/체력+30",
    "proficiency": 8,
    "power": 2,
    "purchase_price": 0,
    "resale_price": 10000
  },
  {
    "id": 108,
    "category": 7,
    "subtype": 5,
    "name": "낡은 슬리퍼",
    "description": "힘+1",
    "proficiency": 0,
    "power": 1,
    "purchase_price": 0,
    "resale_price": 2000
  },
  {
    "id": 109,
    "category": 7,
    "subtype": 5,
    "name": "유목민의 단화",
    "description": "힘+2",
    "proficiency": 0,
    "power": 2,
    "purchase_price": 0,
    "resale_price": 3000
  },
  {
    "id": 110,
    "category": 7,
    "subtype": 5,
    "name": "야만인의 장화",
    "description": "힘+3/체력+8",
    "proficiency": 0,
    "power": 3,
    "purchase_price": 0,
    "resale_price": 5000
  },
  {
    "id": 111,
    "category": 7,
    "subtype": 5,
    "name": "초원의 신발",
    "description": "힘+3/체력+10",
    "proficiency": 0,
    "power": 3,
    "purchase_price": 0,
    "resale_price": 10000
  },
  {
    "id": 112,
    "category": 7,
    "subtype": 5,
    "name": "불꽃장화",
    "description": "힘+4/체력+12",
    "proficiency": 0,
    "power": 4,
    "purchase_price": 0,
    "resale_price": 20000
  },
  {
    "id": 113,
    "category": 7,
    "subtype": 5,
    "name": "번개신발",
    "description": "힘+5/체력+15",
    "proficiency": 0,
    "power": 5,
    "purchase_price": 0,
    "resale_price": 25000
  },
  {
    "id": 114,
    "category": 7,
    "subtype": 5,
    "name": "삼족어의 비늘신",
    "description": "숙련+4/힘+4/체력+20",
    "proficiency": 4,
    "power": 4,
    "purchase_price": 0,
    "resale_price": 30000
  },
  {
    "id": 115,
    "category": 8,
    "subtype": 6,
    "name": "어망(소)",
    "description": "크기 20",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 15000,
    "resale_price": 0
  },
  {
    "id": 116,
    "category": 8,
    "subtype": 6,
    "name": "어망(중)",
    "description": "크기 25",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 50000,
    "resale_price": 0
  },
  {
    "id": 117,
    "category": 8,
    "subtype": 6,
    "name": "어망(대)",
    "description": "크기 30",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 100000,
    "resale_price": 0
  },
  {
    "id": 118,
    "category": 9,
    "subtype": 6,
    "name": "수족관(소)",
    "description": "관상어 4/꾸미기 1",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 4000,
    "resale_price": 0
  },
  {
    "id": 119,
    "category": 9,
    "subtype": 6,
    "name": "수족관(중)",
    "description": "관상어 6/꾸미기 2",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 15000,
    "resale_price": 0
  },
  {
    "id": 120,
    "category": 9,
    "subtype": 6,
    "name": "수족관(대)",
    "description": "관상어 8/꾸미기 4",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 80000,
    "resale_price": 0
  },
  {
    "id": 121,
    "category": 9,
    "subtype": 6,
    "name": "수족관(특대)",
    "description": "관상어 10/꾸미기 6",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 200000,
    "resale_price": 0
  },
  {
    "id": 122,
    "category": 9,
    "subtype": 6,
    "name": "인공수석",
    "description": "행운+30",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 10000,
    "resale_price": 1000
  },
  {
    "id": 123,
    "category": 9,
    "subtype": 6,
    "name": "물레방아 산소기",
    "description": "행운+50",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 20000,
    "resale_price": 2000
  },
  {
    "id": 124,
    "category": 9,
    "subtype": 6,
    "name": "갈색해초",
    "description": "꾸미기/음식용",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 2000
  },
  {
    "id": 125,
    "category": 9,
    "subtype": 6,
    "name": "녹색해초",
    "description": "꾸미기/음식용",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 2000
  },
  {
    "id": 126,
    "category": 9,
    "subtype": 6,
    "name": "황금해초",
    "description": "꾸미기/음식용",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 40000
  },
  {
    "id": 127,
    "category": 10,
    "subtype": 7,
    "name": "쏘가리 매운탕",
    "description": "재료:쏘가리(대1)|n효과:스테미나 20%회복",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 500,
    "resale_price": 1000
  },
  {
    "id": 128,
    "category": 10,
    "subtype": 7,
    "name": "가물치 구이",
    "description": "재료:가물치(대1)|n효과:스테미나 30%회복",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 1000,
    "resale_price": 2000
  },
  {
    "id": 129,
    "category": 10,
    "subtype": 7,
    "name": "꽃게탕",
    "description": "재료:꽃게(대2)|n효과:스테미나 40%회복",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 2000,
    "resale_price": 2000
  },
  {
    "id": 130,
    "category": 10,
    "subtype": 7,
    "name": "고등어 찌게",
    "description": "재료:고등어(대2)|n효과:스테미나 50%회복",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 3000,
    "resale_price": 5000
  },
  {
    "id": 131,
    "category": 10,
    "subtype": 7,
    "name": "복어탕",
    "description": "재료:까치복(대2)|n효과:스테미나 60%회복",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 4000,
    "resale_price": 5000
  },
  {
    "id": 132,
    "category": 10,
    "subtype": 7,
    "name": "새우탕",
    "description": "재료:대하(소2)|n효과:스테미나 70%회복",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 6000,
    "resale_price": 5000
  },
  {
    "id": 133,
    "category": 10,
    "subtype": 7,
    "name": "농어회",
    "description": "재료:농어(대1)|n효과:스테미나 80%회복",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 8000,
    "resale_price": 10000
  },
  {
    "id": 134,
    "category": 10,
    "subtype": 7,
    "name": "상어알 스프",
    "description": "재료:백상아리(대2)|n효과:스테미나 90%회복",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 9000,
    "resale_price": 10000
  },
  {
    "id": 135,
    "category": 10,
    "subtype": 7,
    "name": "개복치 구이",
    "description": "재료:개복치(대1)|n효과:스테미나 100%회복",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 10000,
    "resale_price": 10000
  },
  {
    "id": 136,
    "category": 10,
    "subtype": 7,
    "name": "갈조신단",
    "description": "재료:갈색해초|n효과:숙련 +1(영구적)",
    "proficiency": 1,
    "power": 0,
    "purchase_price": 5000,
    "resale_price": 0
  },
  {
    "id": 137,
    "category": 10,
    "subtype": 7,
    "name": "녹조신단",
    "description": "재료:녹색해초|n효과:숙련 +1(영구적)",
    "proficiency": 1,
    "power": 0,
    "purchase_price": 5000,
    "resale_price": 0
  },
  {
    "id": 138,
    "category": 10,
    "subtype": 7,
    "name": "황금신단",
    "description": "재료:황금해초|n효과:숙련 +4(영구적)",
    "proficiency": 4,
    "power": 0,
    "purchase_price": 20000,
    "resale_price": 0
  },
  {
    "id": 139,
    "category": 11,
    "subtype": 8,
    "name": "과거의 눈물",
    "description": "보물",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 0
  },
  {
    "id": 140,
    "category": 11,
    "subtype": 8,
    "name": "현실의 눈물",
    "description": "보물",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 0
  },
  {
    "id": 141,
    "category": 11,
    "subtype": 8,
    "name": "미래의 눈물",
    "description": "보물",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 0
  },
  {
    "id": 142,
    "category": 11,
    "subtype": 8,
    "name": "빛의 눈",
    "description": "보물",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 0,
    "resale_price": 0
  },
  {
    "id": 143,
    "category": 0,
    "subtype": 9,
    "name": "전자동 낚싯대",
    "description": "숙련+15/힘+8",
    "proficiency": 15,
    "power": 8,
    "purchase_price": 700,
    "resale_price": 50000
  },
  {
    "id": 144,
    "category": 3,
    "subtype": 9,
    "name": "전자동 릴",
    "description": "숙련+15/체력+25",
    "proficiency": 15,
    "power": 0,
    "purchase_price": 700,
    "resale_price": 50000
  },
  {
    "id": 145,
    "category": 1,
    "subtype": 9,
    "name": "무적 강철줄",
    "description": "숙련+10/체력+20",
    "proficiency": 10,
    "power": 0,
    "purchase_price": 700,
    "resale_price": 50000
  },
  {
    "id": 146,
    "category": 4,
    "subtype": 9,
    "name": "황금 바늘",
    "description": "숙련+10/힘+5",
    "proficiency": 10,
    "power": 5,
    "purchase_price": 700,
    "resale_price": 50000
  },
  {
    "id": 147,
    "category": 12,
    "subtype": 9,
    "name": "파닥 패키지",
    "description": "특수소재XV/장구통SP2008/GS-200/물어물어바늘",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 1500,
    "resale_price": 0
  },
  {
    "id": 148,
    "category": 12,
    "subtype": 9,
    "name": "전자동 패키지",
    "description": "전자동(낚싯대/릴)/무적 강철줄/황금바늘",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 2500,
    "resale_price": 0
  },
  {
    "id": 149,
    "category": 6,
    "subtype": 4,
    "name": "발광루어",
    "description": "공용(숙련+20)",
    "proficiency": 20,
    "power": 0,
    "purchase_price": 30000,
    "resale_price": 2000
  },
  {
    "id": 150,
    "category": 6,
    "subtype": 10,
    "name": "절인고기",
    "description": "보스용",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 100,
    "resale_price": 5000
  },
  {
    "id": 151,
    "category": 6,
    "subtype": 10,
    "name": "황금지렁이",
    "description": "관상어용",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 100,
    "resale_price": 5000
  },
  {
    "id": 152,
    "category": 6,
    "subtype": 10,
    "name": "미끼 패키지1",
    "description": "발광루어 10개/절인고기 8개/황금지렁이 8개",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 1500,
    "resale_price": 0
  },
  {
    "id": 153,
    "category": 6,
    "subtype": 10,
    "name": "미끼 패키지2",
    "description": "발광루어 20개/절인고기 15개/황금지렁이 15개",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 3000,
    "resale_price": 0
  },
  {
    "id": 155,
    "category": 2,
    "subtype": 11,
    "name": "아다스 모자",
    "description": "숙련+8/체력+30",
    "proficiency": 8,
    "power": 0,
    "purchase_price": 600,
    "resale_price": 40000
  },
  {
    "id": 156,
    "category": 5,
    "subtype": 11,
    "name": "퍼마 조끼",
    "description": "숙련+8/체력+30",
    "proficiency": 8,
    "power": 0,
    "purchase_price": 600,
    "resale_price": 40000
  },
  {
    "id": 157,
    "category": 7,
    "subtype": 11,
    "name": "니케신발",
    "description": "힘+4/체력+25",
    "proficiency": 0,
    "power": 4,
    "purchase_price": 600,
    "resale_price": 40000
  },
  {
    "id": 158,
    "category": 9,
    "subtype": 11,
    "name": "진주조개",
    "description": "행운+100",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 600,
    "resale_price": 40000
  },
  {
    "id": 154,
    "category": 9,
    "subtype": 11,
    "name": "황금해초",
    "description": "꾸미기/음식용",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 600,
    "resale_price": 40000
  },
  {
    "id": 159,
    "category": 12,
    "subtype": 11,
    "name": "꾸미기 패키지",
    "description": "인공수석/물레방아산소기/진주조개",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 1000,
    "resale_price": 0
  },
  {
    "id": 161,
    "category": 12,
    "subtype": 11,
    "name": "해초세트",
    "description": "황금해초/녹색해초/갈색해초",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 1000,
    "resale_price": 0
  },
  {
    "id": 162,
    "category": 12,
    "subtype": 11,
    "name": "수족관 패키지",
    "description": "수족관(대))/물레방아산소기/인공수석",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 1500,
    "resale_price": 0
  },
  {
    "id": 160,
    "category": 12,
    "subtype": 11,
    "name": "명품 패키지",
    "description": "아다스모자/퍼마조끼/니케신발/진주조개",
    "proficiency": 0,
    "power": 0,
    "purchase_price": 2000,
    "resale_price": 0
  }
];

FISH.push(...EXTRA_FISH);
REGIONS.push(...EXTRA_REGIONS);
const motionMap={steady:'cruise',dart:'dart',zigzag:'eel',pulse:'float',dive:'glide',surge:'predator',sway:'glide',boss_charge:'predator',legendary:'predator'};
for(const f of EXTRA_FISH)f.motion=motionMap[f.motionPattern]||(f.boss?'predator':'cruise');

for(const f of EXTRA_FISH)if(!f.legendary)f.spriteSheet=f.spriteSheet.replace(".png","-transparent.png");
