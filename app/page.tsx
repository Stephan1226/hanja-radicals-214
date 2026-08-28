'use client';

import { useEffect, useMemo, useState } from 'react';

type Character = {
  glyph: string;
  reading: string;
  strokes: number;
  story: string;
  related: string[];
  image?: string;
  source?: string;
  variant?: string;
  kind?: string;
};

type Chapter = {
  no: string;
  nav: string;
  title: string;
  focus: string;
  count: string;
  objective: string;
  range: string;
  cue: string;
  activity: string;
  characters: Character[];
};

const chapters: Chapter[] = [
  {
    no: '01', nav: '부수의 원리', title: '그림이 글자가 되는 순간', focus: '상형 · 부수 · 의미의 뿌리', count: '18',
    objective: '부수는 단순한 조각이 아니라, 한자의 뜻을 분류하고 기억하게 하는 단서임을 이해합니다.',
    range: '一 丨 丶 丿 乙 亅 二 亠 人 儿 入 八 冂 冖 冫 几 凵 刀',
    cue: '“사물의 어떤 특징만 남기면 그림이 글자가 될까요?”',
    activity: '옛글자와 지금 글자를 선으로 이어 보고, 남은 특징을 한 문장으로 설명합니다.',
    characters: [
      { glyph: '日', reading: '날 일', strokes: 4, image: '/oracle/sun.svg', source: 'https://commons.wikimedia.org/wiki/File:日-oracle.svg', kind: '상형', story: '해의 둥근 윤곽과 가운데 빛을 표시한 모습에서 출발했습니다. 쓰기 편하도록 네모꼴로 정리되며 日이 되었습니다.', related: ['明 밝을 명', '時 때 시', '晴 갤 청'] },
      { glyph: '月', reading: '달 월', strokes: 4, image: '/oracle/moon.svg', source: 'https://commons.wikimedia.org/wiki/File:月-oracle.svg', kind: '상형', story: '초승달처럼 굽은 달의 윤곽을 세워 그린 모양입니다. 날과 달을 나타내는 글자에서 시간의 뜻도 넓어졌습니다.', related: ['明 밝을 명', '朝 아침 조', '期 기약할 기'] },
      { glyph: '山', reading: '메 산', strokes: 3, image: '/oracle/mountain.svg', source: 'https://commons.wikimedia.org/wiki/File:山-oracle.svg', kind: '상형', story: '높낮이가 다른 봉우리들을 나란히 세운 모습입니다. 가운데 봉우리가 높게 남아 산의 윤곽을 보여 줍니다.', related: ['岩 바위 암', '峠 고개 상', '峰 봉우리 봉'] },
      { glyph: '水', reading: '물 수', strokes: 4, image: '/oracle/water.svg', source: 'https://commons.wikimedia.org/wiki/File:水-oracle.svg', kind: '상형', story: '가운데 흐르는 물줄기와 양옆으로 흩어지는 물결을 나타냈습니다. 글자 왼쪽에서는 흔히 氵로 줄어듭니다.', related: ['河 물 하', '海 바다 해', '洗 씻을 세'] },
      { glyph: '木', reading: '나무 목', strokes: 4, image: '/oracle/tree.svg', source: 'https://commons.wikimedia.org/wiki/File:木-oracle.svg', kind: '상형', story: '줄기를 중심으로 위에는 가지, 아래에는 뿌리를 펼친 모습입니다. 나무의 수를 늘리면 뜻도 함께 커집니다.', related: ['林 수풀 림', '森 빽빽할 삼', '休 쉴 휴'] },
    ],
  },
  {
    no: '02', nav: '사람과 몸', title: '몸은 가장 가까운 사전', focus: '사람 · 감각 · 마음', count: '22',
    objective: '몸의 모양에서 시작한 부수를 알아보고, 인물의 상태와 감각·감정에 관한 뜻을 추론합니다.',
    range: '人 女 子 口 目 耳 手 足 心 首 面 毛 肉 身 骨 牙 舌 血 爪 臼 尸 鬼',
    cue: '“글자에서 몸의 어느 부분이 뜻을 맡고 있나요?”',
    activity: '休·信·好·聞·想을 사람/감각/마음 세 구역에 배치하고 이유를 말합니다.',
    characters: [
      { glyph: '人', reading: '사람 인', strokes: 2, kind: '상형', variant: '亻', story: '사람이 서서 걷는 옆모습을 간결한 두 획으로 나타냈습니다. 왼쪽에 붙으면 亻로 서서 사람의 행동·관계를 암시합니다.', related: ['休 쉴 휴', '住 살 주', '信 믿을 신'] },
      { glyph: '女', reading: '계집 녀', strokes: 3, kind: '상형', story: '사람이 무릎을 모으고 앉은 모습을 본뜬 글자입니다. 현대 수업에서는 역사적 자형과 오늘날의 성 역할을 구분해 설명합니다.', related: ['好 좋을 호', '姉 손윗누이 자', '姓 성 성'] },
      { glyph: '口', reading: '입 구', strokes: 3, kind: '상형', story: '벌린 입의 윤곽을 단순하게 그렸습니다. 말하기·먹기·소리와 관련된 글자에서 의미를 맡습니다.', related: ['味 맛 미', '唱 부를 창', '問 물을 문'] },
      { glyph: '目', reading: '눈 목', strokes: 5, kind: '상형', story: '눈의 윤곽과 눈동자를 세워 놓은 모양입니다. 보기·살피기·눈의 상태와 관련된 뜻을 만듭니다.', related: ['眼 눈 안', '看 볼 간', '眠 잘 면'] },
      { glyph: '手', reading: '손 수', strokes: 4, kind: '상형', variant: '扌', story: '손바닥에서 여러 손가락이 뻗은 모습을 나타냈습니다. 왼쪽에 붙을 때 扌가 되어 손으로 하는 동작을 암시합니다.', related: ['打 칠 타', '持 가질 지', '拾 주울 습'] },
      { glyph: '心', reading: '마음 심', strokes: 4, kind: '상형', variant: '忄·⺗', story: '심장의 윤곽을 본떠 감정과 생각을 나타내게 된 글자입니다. 자리마다 心·忄·⺗로 모습이 달라집니다.', related: ['情 뜻 정', '想 생각 상', '忘 잊을 망'] },
    ],
  },
  {
    no: '03', nav: '자연 ①', title: '하늘과 땅을 읽는 글자', focus: '빛 · 지형 · 물질', count: '22',
    objective: '자연물의 핵심 윤곽이 한자의 형태로 정리되는 과정을 보고, 의미 계열을 찾아냅니다.',
    range: '日 月 山 川 水 火 木 土 石 田 穴 谷 夕 气 井 泉 玉 生 赤 白 黑 青 里',
    cue: '“정확한 뜻을 몰라도 자연의 어느 영역인지 말할 수 있을까요?”',
    activity: '河·炎·森·岩을 보고 물/불/나무/돌 중 어떤 가족인지 먼저 추론합니다.',
    characters: [
      { glyph: '川', reading: '내 천', strokes: 3, kind: '상형', story: '나란히 흐르는 물길을 세 줄로 나타냈습니다. 굽이치는 물의 흐름이 곧 강과 내의 뜻이 되었습니다.', related: ['州 고을 주', '順 순할 순', '巡 돌 순'] },
      { glyph: '火', reading: '불 화', strokes: 4, kind: '상형', variant: '灬', story: '불꽃이 위로 타오르고 양옆으로 불똥이 튀는 모습입니다. 아래에 놓이면 灬로 납작해지는 경우가 많습니다.', related: ['炎 불꽃 염', '焼 구울 소', '熱 더울 열'] },
      { glyph: '土', reading: '흙 토', strokes: 3, kind: '상형', story: '땅 위로 흙덩이가 솟은 모습을 나타냈다고 봅니다. 땅·장소·쌓인 흙과 관련된 뜻에서 단서가 됩니다.', related: ['地 땅 지', '城 성 성', '場 마당 장'] },
      { glyph: '石', reading: '돌 석', strokes: 5, kind: '상형', story: '바위 절벽 아래에 떨어져 있는 돌덩이를 그린 모습입니다. 광물·단단함·돌로 만든 물건을 나타냅니다.', related: ['岩 바위 암', '砂 모래 사', '破 깨뜨릴 파'] },
      { glyph: '田', reading: '밭 전', strokes: 5, kind: '상형', story: '경작지를 네 구획으로 나눈 모양입니다. 농지와 경계, 밭에서 이루어지는 일을 떠올리게 합니다.', related: ['男 사내 남', '畑 밭 전', '界 지경 계'] },
    ],
  },
  {
    no: '04', nav: '자연 ② · 동식물', title: '살아 있는 자연의 분류표', focus: '날씨 · 식물 · 동물', count: '22',
    objective: '식물과 동물의 특징을 포착한 부수를 분류하고, 생물 이름을 모르는 상황에서도 뜻의 범위를 좁힙니다.',
    range: '雨 風 禾 竹 艸 犬 牛 羊 馬 魚 鳥 虫 羽 角 皮 革 米 麥 麻 豕 鹿',
    cue: '“이 글자는 식물인가, 동물인가, 날씨인가? 근거는 어디에 있나요?”',
    activity: '처음 보는 글자를 세 바구니에 넣는 ‘부수 생태 분류’ 게임을 진행합니다.',
    characters: [
      { glyph: '雨', reading: '비 우', strokes: 8, kind: '상형', story: '하늘을 나타내는 선 아래로 빗방울이 떨어지는 모습을 그렸습니다. 날씨와 대기 현상의 뜻을 묶습니다.', related: ['雪 눈 설', '雲 구름 운', '雷 우레 뢰'] },
      { glyph: '禾', reading: '벼 화', strokes: 5, kind: '상형', story: '이삭이 고개를 숙인 곡식 한 포기의 모습입니다. 곡식과 수확, 곡물의 상태를 나타냅니다.', related: ['秋 가을 추', '種 씨 종', '稻 벼 도'] },
      { glyph: '竹', reading: '대 죽', strokes: 6, kind: '상형', variant: '⺮', story: '잎이 달린 대나무 두 줄기를 나란히 그렸습니다. 위에 놓이면 ⺮가 되어 대나무 도구와 기록물을 암시합니다.', related: ['筆 붓 필', '箱 상자 상', '笑 웃을 소'] },
      { glyph: '牛', reading: '소 우', strokes: 4, kind: '상형', variant: '牜', story: '소의 얼굴과 위로 솟은 두 뿔을 중심으로 나타냈습니다. 왼쪽에서는 牜로 줄어듭니다.', related: ['物 물건 물', '牧 칠 목', '特 특별할 특'] },
      { glyph: '馬', reading: '말 마', strokes: 10, kind: '상형', story: '긴 얼굴과 갈기, 네 다리, 꼬리를 지닌 말을 옆에서 본 모습입니다. 이동과 말의 종류를 나타냅니다.', related: ['駐 머무를 주', '駅 역 역', '騎 말 탈 기'] },
      { glyph: '鳥', reading: '새 조', strokes: 11, kind: '상형', story: '부리와 눈, 날개, 꼬리를 갖춘 새의 옆모습을 본떴습니다. 새의 이름과 날개 있는 생물을 분류합니다.', related: ['鳴 울 명', '鶴 학 학', '島 섬 도'] },
    ],
  },
  {
    no: '05', nav: '생활과 도구', title: '사람이 만든 것들의 흔적', focus: '집 · 이동 · 옷 · 기술', count: '22',
    objective: '생활 도구가 한자 속에서 어떤 모습으로 남았는지 보고, 물건의 쓰임과 글자의 뜻을 연결합니다.',
    range: '門 戶 車 舟 衣 食 金 糸 刀 弓 矢 斤 瓦 缶 皿 网 豆 鼎 鼓 鬲 匕 匚',
    cue: '“도구의 생김새와 쓰임 중 무엇이 글자에 더 강하게 남았나요?”',
    activity: '도구 카드와 관련 한자 카드를 짝지은 뒤, 쓰임을 몸짓으로 설명합니다.',
    characters: [
      { glyph: '門', reading: '문 문', strokes: 8, kind: '상형', story: '좌우로 열리는 두 짝 대문의 모습을 정면에서 그렸습니다. 출입·안과 밖·문 사이의 상황을 나타냅니다.', related: ['間 사이 간', '開 열 개', '閉 닫을 폐'] },
      { glyph: '車', reading: '수레 거', strokes: 7, kind: '상형', story: '바퀴와 축, 수레의 몸체를 위에서 내려다본 모습을 정리한 글자입니다. 탈것과 이동을 나타냅니다.', related: ['軍 군사 군', '転 구를 전', '輪 바퀴 륜'] },
      { glyph: '舟', reading: '배 주', strokes: 6, kind: '상형', story: '길쭉한 배의 몸통과 안쪽의 칸을 위에서 본 모습입니다. 배·물길·운송의 뜻을 품습니다.', related: ['船 배 선', '航 배 항', '般 일반 반'] },
      { glyph: '衣', reading: '옷 의', strokes: 6, kind: '상형', variant: '衤', story: '옷깃이 포개지고 소매가 양옆으로 펼쳐진 모습을 본뜬 글자입니다. 왼쪽에서는 衤로 변합니다.', related: ['初 처음 초', '被 입을 피', '補 기울 보'] },
      { glyph: '金', reading: '쇠 금', strokes: 8, kind: '회의·상형', variant: '釒', story: '땅속에 박힌 광물 덩어리와 그것을 덮은 모양이 결합한 것으로 설명합니다. 금속·돈·광물을 묶습니다.', related: ['銀 은 은', '鉄 쇠 철', '針 바늘 침'] },
      { glyph: '刀', reading: '칼 도', strokes: 2, kind: '상형', variant: '刂', story: '한쪽에 날이 선 칼의 옆모습을 간단히 그렸습니다. 오른쪽에 서면 흔히 刂가 되어 자르기와 나누기를 암시합니다.', related: ['切 끊을 절', '分 나눌 분', '利 이로울 리'] },
    ],
  },
  {
    no: '06', nav: '행동과 사회', title: '움직임과 관계를 읽다', focus: '말 · 보기 · 이동 · 힘', count: '22',
    objective: '행동을 나타내는 부수가 문장 속에서 뜻의 방향을 어떻게 결정하는지 확인합니다.',
    range: '言 見 行 走 辵 力 攴 攵 立 止 曰 欠 攵 彳 夂 夊 廴 廾 弋 弓 斗 文',
    cue: '“이 글자의 주인공은 말하고 있나요, 보고 있나요, 움직이고 있나요?”',
    activity: '言·見·辵·力 네 부수만 보고 낯선 글자의 ‘행동 범주’를 먼저 맞힙니다.',
    characters: [
      { glyph: '言', reading: '말씀 언', strokes: 7, kind: '지사·상형', variant: '訁', story: '입에서 말이 여러 겹으로 나오는 모습을 나타낸 것으로 풀이합니다. 말·기록·의사소통을 나타냅니다.', related: ['語 말씀 어', '記 기록할 기', '談 말씀 담'] },
      { glyph: '見', reading: '볼 견', strokes: 7, kind: '회의', story: '큰 눈을 가진 사람이 서 있는 모습으로, 사람이 눈으로 본다는 뜻을 합쳐 만들었습니다.', related: ['視 볼 시', '観 볼 관', '現 나타날 현'] },
      { glyph: '走', reading: '달릴 주', strokes: 7, kind: '상형·회의', story: '사람이 팔을 흔들며 달리는 모습과 발을 나타내는 요소가 합쳐진 글자입니다.', related: ['起 일어날 기', '超 넘을 초', '越 넘을 월'] },
      { glyph: '辵', reading: '쉬엄쉬엄 갈 착', strokes: 7, kind: '회의', variant: '辶', story: '길을 뜻하는 요소와 발걸음을 합쳐 길을 따라 간다는 뜻을 나타냅니다. 글자에서는 주로 辶로 보입니다.', related: ['近 가까울 근', '道 길 도', '進 나아갈 진'] },
      { glyph: '力', reading: '힘 력', strokes: 2, kind: '상형', story: '힘을 주어 사용하는 농기구의 굽은 모습에서 힘의 뜻이 나왔다고 설명합니다.', related: ['功 공 공', '動 움직일 동', '助 도울 조'] },
      { glyph: '立', reading: '설 립', strokes: 5, kind: '지사·상형', story: '사람이 땅 위에 두 발을 딛고 선 모습을 단순화했습니다. 서기·세우기·자리 잡기의 뜻을 품습니다.', related: ['位 자리 위', '章 글 장', '音 소리 음'] },
    ],
  },
  {
    no: '07', nav: '형태가 변하는 부수', title: '자리 따라 옷을 갈아입다', focus: '변형 부수 · 위치 · 압축', count: '22',
    objective: '같은 부수가 한자의 왼쪽·아래·위에서 다른 모습으로 변한다는 규칙을 익힙니다.',
    range: '人→亻 水→氵 心→忄·⺗ 手→扌 火→灬 艸→艹 犬→犭 衣→衤 言→訁 金→釒 糸→糹 食→飠 刀→刂 阜→阝 邑→阝 肉→月',
    cue: '“모양은 달라졌지만 같은 부수라는 증거를 어디서 찾을 수 있나요?”',
    activity: '기본형 카드를 변형형 카드에 짝짓고, 실제 한자에서 어느 자리에 있는지 표시합니다.',
    characters: [
      { glyph: '人', reading: '사람 인', strokes: 2, variant: '亻', kind: '변형', story: '왼쪽 좁은 자리에 들어가면 오른쪽 획을 세워 亻가 됩니다. 글자 전체의 균형을 위한 압축입니다.', related: ['休', '住', '作'] },
      { glyph: '水', reading: '물 수', strokes: 4, variant: '氵', kind: '변형', story: '왼쪽에서는 흐르는 물의 세 점만 남겨 氵가 됩니다. 모양이 줄어도 물의 의미는 그대로 유지됩니다.', related: ['河', '海', '洗'] },
      { glyph: '心', reading: '마음 심', strokes: 4, variant: '忄·⺗', kind: '변형', story: '왼쪽에서는 세로로 긴 忄, 아래에서는 납작한 ⺗ 또는 心으로 자리의 모양에 맞춥니다.', related: ['情', '想', '慕'] },
      { glyph: '手', reading: '손 수', strokes: 4, variant: '扌', kind: '변형', story: '왼쪽에서 세 획의 扌로 줄어 손의 동작을 나타냅니다. 손이 직접 보이지 않아도 의미는 남습니다.', related: ['打', '投', '指'] },
      { glyph: '火', reading: '불 화', strokes: 4, variant: '灬', kind: '변형', story: '글자 아래에서는 네 점으로 퍼진 灬가 됩니다. 불꽃이나 열의 흔적을 아래쪽에 납작하게 배치합니다.', related: ['熱', '照', '無'] },
      { glyph: '艸', reading: '풀 초', strokes: 6, variant: '艹', kind: '변형', story: '글자 위에서는 두 묶음의 새싹을 간결한 艹로 줄입니다. 식물·풀·약재와 관련된 뜻을 엽니다.', related: ['花', '草', '薬'] },
    ],
  },
  {
    no: '08', nav: '낯선 부수', title: '작지만 중요한 분류 표지', focus: '저빈도 · 형태 구별 · 사전 찾기', count: '25',
    objective: '자주 보이지 않는 부수를 억지로 암기하기보다, 생김새를 구별하고 사전에서 찾는 법을 익힙니다.',
    range: '匕 匚 匸 冂 冖 凵 夂 夊 宀 尸 屮 廾 彐 弋 彡 廴 尢 屮 巛 幺 广 廾 廿 爻 爿',
    cue: '“뜻을 외우지 못해도 서로 다른 모양으로 구별할 수 있나요?”',
    activity: '닮은꼴 부수 匚·匸, 冂·凵, 夂·夊를 확대 비교하고 획의 열린 방향을 말합니다.',
    characters: [
      { glyph: '匕', reading: '비수 비', strokes: 2, kind: '상형', story: '짧은 칼이나 숟가락처럼 굽은 도구의 모양으로 설명됩니다. 자형이 비슷한 七과 구별합니다.', related: ['化 될 화', '北 북녘 북', '匙 숟가락 시'] },
      { glyph: '匚', reading: '상자 방', strokes: 2, kind: '상형', story: '물건을 담는 상자를 옆이 열린 네모꼴로 나타냈습니다. 오른쪽이 열린 모양을 먼저 기억합니다.', related: ['匠 장인 장', '匣 갑 갑', '匪 아닐 비'] },
      { glyph: '冂', reading: '멀 경', strokes: 2, kind: '상형', story: '멀리 둘러싼 경계나 바깥 테두리를 나타내는 부수입니다. 아래가 열려 있는 모양을 관찰합니다.', related: ['同 한가지 동', '円 둥글 원', '冊 책 책'] },
      { glyph: '冖', reading: '덮을 멱', strokes: 2, kind: '상형', story: '천이나 덮개가 위에서 내려와 가리는 모습을 나타냈습니다. 宀보다 한 획 적고 가운데 점이 없습니다.', related: ['冠 갓 관', '冥 어두울 명', '写 베낄 사'] },
      { glyph: '宀', reading: '집 면', strokes: 3, kind: '상형', story: '지붕과 처마가 있는 집의 윗부분을 본뜬 글자입니다. 집 안의 사람·물건·상태를 나타냅니다.', related: ['家 집 가', '室 집 실', '安 편안 안'] },
      { glyph: '尸', reading: '주검 시', strokes: 3, kind: '상형', story: '사람이 몸을 굽히거나 앉은 옆모습에서 비롯된 자형입니다. 현재 훈음만으로 모든 관련 글자의 뜻을 단정하지 않습니다.', related: ['居 살 거', '屋 집 옥', '展 펼 전'] },
    ],
  },
  {
    no: '09', nav: '나머지 부수 · 구조', title: '부수와 소리 단서를 나누다', focus: '형성자 · 의미부 · 음부', count: '29',
    objective: '남은 저빈도 부수를 정리하고, 한 글자 안에서 뜻을 맡는 부분과 소리를 빌려주는 부분을 구별합니다.',
    range: '酉 靑 韋 頁 飛 首 香 馬 骨 高 鬥 鬯 鬲 鬼 魚 鳥 鹵 鹿 麥 麻 黃 黍 黑 黹 黽 鼎 鼓 鼠 龍',
    cue: '“河에서 물의 뜻은 氵, 소리의 힌트는 可입니다. 다른 글자도 나눠 볼까요?”',
    activity: '清·晴·請을 나란히 놓고 공통 음부 靑과 바뀌는 의미부를 색으로 표시합니다.',
    characters: [
      { glyph: '酉', reading: '닭 유', strokes: 7, kind: '상형', story: '술을 담아 발효시키는 항아리의 모습을 본뜬 글자로 설명됩니다. 부수로는 술·발효와 관련된 뜻이 많습니다.', related: ['酒 술 주', '酢 초 초', '酔 취할 취'] },
      { glyph: '靑', reading: '푸를 청', strokes: 8, kind: '의미·소리', story: '푸른빛을 나타내는 글자이면서, 형성자에서는 청에 가까운 소리를 전하는 음부로도 자주 쓰입니다.', related: ['清 맑을 청', '晴 갤 청', '請 청할 청'] },
      { glyph: '頁', reading: '머리 혈', strokes: 9, kind: '상형', story: '사람의 큰 머리와 몸을 함께 그린 모습에서 머리·얼굴과 관련된 부수가 되었습니다.', related: ['頭 머리 두', '顔 얼굴 안', '題 제목 제'] },
      { glyph: '飛', reading: '날 비', strokes: 9, kind: '상형', story: '새가 두 날개를 펼치고 공중을 나는 모습을 역동적으로 나타낸 글자입니다.', related: ['飛行 비행', '飛翔 비상', '飛躍 비약'] },
      { glyph: '鹿', reading: '사슴 록', strokes: 11, kind: '상형', story: '뿔과 긴 목, 네 다리를 지닌 사슴의 옆모습을 본뜬 글자입니다. 사슴 종류와 관련된 글자에서 보입니다.', related: ['麓 산기슭 록', '麗 고울 려', '麟 기린 린'] },
      { glyph: '魚', reading: '물고기 어', strokes: 11, kind: '상형', story: '머리·몸통·지느러미·꼬리가 보이는 물고기의 옆모습입니다. 물고기 이름과 수산 생물을 분류합니다.', related: ['鮮 고울 선', '鯨 고래 경', '漁 고기잡을 어'] },
    ],
  },
  {
    no: '10', nav: '종합 복습', title: '214부수, 하나의 지도로', focus: '찾기 · 분류 · 추론 · 설명', count: '0',
    objective: '214부수를 모두 같은 강도로 외우지 않고, 핵심 부수를 이용해 낯선 한자의 의미 영역을 추론합니다.',
    range: '핵심 60~80자는 즉시 뜻 떠올리기 · 나머지는 모양 구별과 사전 찾기 · 변형 부수는 기본형으로 되돌리기',
    cue: '“정답을 몰라도, 어떤 단서로 어디까지 추론할 수 있나요?”',
    activity: '화면의 낯선 글자를 보고 ①부수 찾기 ②의미 계열 고르기 ③추론의 근거 말하기 순서로 답합니다.',
    characters: [
      { glyph: '河', reading: '물 하', strokes: 8, kind: '추론', story: '氵가 물의 의미를 맡고 可가 소리의 단서가 됩니다. 정확한 뜻을 몰라도 ‘물과 관련된 글자’까지는 좁힐 수 있습니다.', related: ['氵 의미부', '可 음부', '海·湖 비교'] },
      { glyph: '休', reading: '쉴 휴', strokes: 6, kind: '회의', story: '사람 亻이 나무 木에 기대어 있는 모습으로 풀이합니다. 두 의미 요소의 장면을 말로 재구성해 봅니다.', related: ['亻 사람', '木 나무', '体·林 비교'] },
      { glyph: '明', reading: '밝을 명', strokes: 8, kind: '회의', story: '日과 月, 두 밝은 대상을 함께 놓아 밝음을 나타낸다고 가르치기 좋은 글자입니다.', related: ['日 해', '月 달', '照·暗 비교'] },
      { glyph: '想', reading: '생각 상', strokes: 13, kind: '형성·회의', story: '아래의 心이 생각과 마음의 의미를 받치고, 위의 相이 소리와 의미의 단서를 함께 제공합니다.', related: ['心 의미부', '相 음부', '情·忘 비교'] },
      { glyph: '清', reading: '맑을 청', strokes: 11, kind: '형성', story: '氵가 물의 의미를, 靑이 청에 가까운 소리를 제공합니다. 같은 음부를 가진 晴·請과 비교합니다.', related: ['氵 의미부', '靑 음부', '晴·請 비교'] },
    ],
  },
];

const timeline = [
  ['0–7', '이전 시간 복습'], ['7–30', '새 부수 탐구'], ['30–40', '실제 한자 적용'], ['40–47', '게임 · 퀴즈'], ['47–50', '핵심 5자 정리'],
];

export default function Home() {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [mode, setMode] = useState<'explore' | 'plan' | 'quiz'>('explore');
  const [revealed, setRevealed] = useState(false);
  const chapter = chapters[chapterIndex];
  const selected = chapter.characters[characterIndex];
  const quizItem = chapter.characters[characterIndex % chapter.characters.length];
  const progress = useMemo(() => `${chapterIndex + 1}`.padStart(2, '0'), [chapterIndex]);

  const selectChapter = (index: number) => {
    setChapterIndex(index);
    setCharacterIndex(0);
    setRevealed(false);
    setMode('explore');
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setCharacterIndex((i) => (i + 1) % chapter.characters.length);
      if (event.key === 'ArrowLeft') setCharacterIndex((i) => (i - 1 + chapter.characters.length) % chapter.characters.length);
      if (event.key === ' ') { event.preventDefault(); setRevealed((value) => !value); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [chapter.characters.length]);

  return (
    <main className="course-shell">
      <aside className="chapter-rail">
        <div className="brand-row"><div className="brand-mark">漢</div><button className="menu-hint" aria-label="전체 화면 사용 안내">◫</button></div>
        <p className="eyebrow">214 RADICALS · 10 CLASSES</p>
        <h1>한자의 뿌리,<br />부수 특강</h1>
        <nav aria-label="챕터 목록">
          {chapters.map((item, index) => (
            <button key={item.no} onClick={() => selectChapter(index)} className={`chapter-link ${index === chapterIndex ? 'active' : ''}`}>
              <span>{item.no}</span>{item.nav}
            </button>
          ))}
        </nav>
        <div className="rail-footer">교수용 웹 수업자료 · DRAFT 01</div>
      </aside>

      <section className="lesson-stage">
        <header className="topbar">
          <div className="mode-tabs" aria-label="화면 모드">
            <button onClick={() => setMode('explore')} className={mode === 'explore' ? 'active' : ''}>글자 탐구</button>
            <button onClick={() => setMode('plan')} className={mode === 'plan' ? 'active' : ''}>수업 설계</button>
            <button onClick={() => { setMode('quiz'); setRevealed(false); }} className={mode === 'quiz' ? 'active' : ''}>퀴즈</button>
          </div>
          <div className="shortcuts"><kbd>←</kbd><kbd>→</kbd> 글자 이동 <kbd>Space</kbd> 정답</div>
        </header>

        <header className="stage-header">
          <div>
            <p className="eyebrow">CHAPTER {chapter.no} · 50 MIN · {chapter.focus}</p>
            <h2>{chapter.title}</h2>
          </div>
          <div className="time-badge"><strong>{chapter.count}</strong><span>{chapter.count === '0' ? '종합 활동' : '새 부수'}</span></div>
        </header>

        {mode === 'explore' && (
          <>
            <section className="hero-panel">
              <div className="oracle-frame">
                <span className="frame-label">ANCIENT FORM</span>
                {selected.image ? (
                  <img src={selected.image} alt={`${selected.glyph}의 갑골문 형태`} />
                ) : (
                  <div className="pending-oracle"><strong>{selected.glyph}</strong><span>옛글자 도판<br />검증 · 보강 예정</span></div>
                )}
                {selected.source ? <a className="source-link" href={selected.source} target="_blank" rel="noreferrer">도판 출처 ↗</a> : <span className="source-link muted">현대 자형 자리표시</span>}
              </div>
              <div className="glyph-story">
                <span className="lesson-tag">{selected.kind || '부수'} · RADICAL</span>
                <div className="glyph-line">
                  <span className="main-glyph">{selected.glyph}</span>
                  <div><strong>{selected.reading}</strong><small>총 {selected.strokes}획</small>{selected.variant && <em>변형 {selected.variant}</em>}</div>
                </div>
                <p>{selected.story}</p>
                <div className="related-row"><span>관련 글자</span>{selected.related.map((item) => <b key={item}>{item}</b>)}</div>
                <div className="teaching-cue"><span>교사 질문</span>{chapter.cue}</div>
              </div>
            </section>

            <section className="character-strip" aria-label="글자 선택">
              {chapter.characters.map((item, index) => (
                <button key={`${item.glyph}-${index}`} onClick={() => setCharacterIndex(index)} className={index === characterIndex ? 'selected' : ''}>
                  <strong>{item.glyph}</strong><span>{item.reading}</span>
                </button>
              ))}
            </section>
          </>
        )}

        {mode === 'plan' && (
          <section className="plan-board">
            <article className="objective-card">
              <span className="lesson-tag">LEARNING GOAL</span>
              <h3>오늘의 수업 목표</h3>
              <p>{chapter.objective}</p>
              <div className="range-box"><small>이번 시간 부수 범위</small><strong>{chapter.range}</strong></div>
            </article>
            <article className="timeline-card">
              <span className="lesson-tag">50 MINUTE FLOW</span>
              <h3>수업 흐름</h3>
              <ol>{timeline.map(([time, label], index) => <li key={time}><span>{time}분</span><b>{label}</b><i style={{ width: `${[14, 46, 20, 14, 6][index]}%` }} /></li>)}</ol>
            </article>
            <article className="activity-card">
              <span className="lesson-tag">CLASS ACTIVITY</span>
              <h3>적용 활동</h3>
              <p>{chapter.activity}</p>
              <div className="teacher-note"><b>교사 메모</b> 설명보다 학생의 관찰 문장을 먼저 받고, 부수 이름은 마지막에 확인합니다.</div>
            </article>
          </section>
        )}

        {mode === 'quiz' && (
          <section className={`quiz-board ${revealed ? 'revealed' : ''}`}>
            <div className="quiz-number">Q{characterIndex + 1}</div>
            <p>이 글자의 부수와 의미 계열을 추론해 보세요.</p>
            <div className="quiz-glyph">{quizItem.glyph}</div>
            <div className="answer-panel">
              {revealed ? <><strong>{quizItem.reading} · {quizItem.strokes}획</strong><p>{quizItem.story}</p><div>{quizItem.related.join(' · ')}</div></> : <button onClick={() => setRevealed(true)}>정답 보기</button>}
            </div>
            <div className="quiz-controls">
              <button onClick={() => { setCharacterIndex((i) => (i - 1 + chapter.characters.length) % chapter.characters.length); setRevealed(false); }}>← 이전</button>
              <button onClick={() => setRevealed((value) => !value)}>{revealed ? '정답 가리기' : '힌트 없이 생각하기'}</button>
              <button onClick={() => { setCharacterIndex((i) => (i + 1) % chapter.characters.length); setRevealed(false); }}>다음 →</button>
            </div>
          </section>
        )}

        <footer className="stage-footer">
          <p><strong>오늘의 범위</strong>{chapter.range}</p>
          <span>{progress} / 10</span>
        </footer>
      </section>
    </main>
  );
}
