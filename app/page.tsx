'use client';

import HanziWriter from 'hanzi-writer';
import { useEffect, useRef, useState } from 'react';

type Character = {
  glyph: string;
  reading: string;
  strokes: number;
  story: string;
  related: string[];
  image?: string;
  source?: string;
  variant?: string;
  variantName?: string;
  kind?: string;
  ancientNote?: string;
  ancientLabel?: string;
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
  intro?: boolean;
};

const chapters: Chapter[] = [
  {
    no: '00', nav: '수업 들어가기', title: '부수와 필순의 지도', focus: '위치 · 명칭 · 필순 · 자형 변화', count: '0', intro: true,
    objective: '부수가 글자 안에서 놓이는 위치의 이름을 알고, 기본 필순과 갑골문에서 해서까지의 자형 변화를 한눈에 이해합니다.',
    range: '변 · 방 · 머리 · 발 · 엄/몸 · 받침 · 제부수 / 기본 필순 8원칙 / 갑골문 → 금문 → 소전 → 예서 → 해서',
    cue: '“같은 부수도 자리가 달라지면 왜 모양과 이름이 달라질까요?”',
    activity: '글자의 부수 위치를 말하고, 다음 획을 손가락으로 예측한 뒤 자형 변화에서 남은 특징을 찾아봅니다.',
    characters: [
      { glyph: '部', reading: '떼 부', strokes: 11, kind: '기초 개념', story: '부수 수업에 들어가기 전에 위치 이름, 필순, 자형 변화의 큰 지도를 먼저 확인합니다.', related: ['部首 부수', '位置 위치', '筆順 필순'] },
    ],
  },
  {
    no: '01', nav: '부수의 원리', title: '그림이 글자가 되는 순간', focus: '상형 · 부수 · 의미의 뿌리', count: '18',
    objective: '가장 단순한 1·2획 부수부터 살펴보며, 부수가 뜻을 직접 나타내기도 하고 글자의 모양을 분류하는 표지가 되기도 함을 이해합니다.',
    range: '一 丨 丶 丿 乙 亅 二 亠 人 儿 入 八 冂 冖 冫 几 凵 刀',
    cue: '“이 부수는 뜻의 단서일까요, 모양을 분류하는 표지일까요?”',
    activity: '18자를 획의 방향·열린 방향·뜻의 유무에 따라 분류하고, 닮은 부수끼리 차이를 설명합니다.',
    characters: [
      { glyph: '一', reading: '한 일', strokes: 1, image: '/oracle/一.svg', source: 'https://commons.wikimedia.org/wiki/File:一-oracle.svg', kind: '지사', ancientNote: '갑골문에서도 가로 한 줄로 수 하나를 표시했습니다.', story: '가로선 하나로 수 1을 가리킨 지사자입니다. 위·아래를 나누는 기준선이나 하나로 이어진 상태도 나타냅니다.', related: ['三 석 삼', '上 위 상', '下 아래 하'] },
      { glyph: '丨', reading: '뚫을 곤', strokes: 1, image: '/oracle/丨.svg', source: 'https://commons.wikimedia.org/wiki/File:丨-bigseal.svg', ancientLabel: '대전(大篆)', kind: '형태 부수', ancientNote: '독립 갑골문은 확인되지 않아 후대의 대전 자형을 제시합니다.', story: '위에서 아래로 곧게 내려오는 세로획입니다. 관련 글자에서 언제나 ‘뚫다’라는 뜻을 주는 것은 아니므로 형태 분류용 부수임을 강조합니다.', related: ['中 가운데 중', '申 펼 신', '串 꿸 관'] },
      { glyph: '丶', reading: '점 주', strokes: 1, image: '/oracle/丶.svg', source: 'https://commons.wikimedia.org/wiki/File:丶-bronze.svg', ancientLabel: '금문(金文)', kind: '형태 부수', ancientNote: '독립 갑골문 대신 청동기에 남은 금문 자형을 제시합니다.', story: '짧게 찍는 점 한 획입니다. 글자 속 작은 표시를 모아 찾기 위한 부수이며, 실제 의미는 글자마다 다릅니다.', related: ['主 주인 주', '丹 붉을 단', '丸 둥글 환'] },
      { glyph: '丿', reading: '삐침 별', strokes: 1, image: '/oracle/丿.svg', source: 'https://commons.wikimedia.org/wiki/File:丿-bigseal.svg', ancientLabel: '대전(大篆)', kind: '형태 부수', ancientNote: '독립 갑골문은 확인되지 않아 대전에서 삐침 모양을 확인합니다.', story: '오른쪽 위에서 왼쪽 아래로 흘려 내리는 삐침 획입니다. 독립된 뜻보다는 자형을 분류하는 기준으로 사용됩니다.', related: ['乏 모자랄 핍', '乎 어조사 호', '乘 탈 승'] },
      { glyph: '乙', reading: '새 을', strokes: 1, image: '/oracle/乙.svg', source: 'https://commons.wikimedia.org/wiki/File:乙-oracle.svg', kind: '상형·가차', ancientNote: '굽고 꺾인 선으로 나타난 여러 갑골문 자형이 전합니다.', story: '굽어 자라는 싹이나 휘어진 모습을 본뜬 것으로 풀이하지만, 일찍부터 천간의 둘째 이름으로 빌려 썼습니다.', related: ['九 아홉 구', '乞 빌 걸', '乳 젖 유'] },
      { glyph: '亅', reading: '갈고리 궐', strokes: 1, image: '/oracle/亅.svg', source: 'https://commons.wikimedia.org/wiki/File:亅-seal.svg', ancientLabel: '소전(小篆)', kind: '형태 부수', ancientNote: '독립 갑골문·금문은 확인되지 않아 설문계 소전 자형을 제시합니다.', story: '세로획 끝을 위로 살짝 들어 올린 갈고리 모양입니다. 부수 이름과 실제 글자의 뜻이 직접 연결되지 않는 경우가 많습니다.', related: ['了 마칠 료', '事 일 사', '予 나 여'] },
      { glyph: '二', reading: '두 이', strokes: 2, image: '/oracle/二.svg', source: 'https://commons.wikimedia.org/wiki/File:二-oracle.svg', kind: '지사', ancientNote: '갑골문에서도 가로선을 두 번 그어 수 2를 표시했습니다.', story: '가로선 두 개로 둘을 가리킨 지사자입니다. 一에서 선을 하나 늘렸다는 생성 원리를 쉽게 비교할 수 있습니다.', related: ['三 석 삼', '五 다섯 오', '云 이를 운'] },
      { glyph: '亠', reading: '돼지해머리 두', strokes: 2, image: '/oracle/亠.svg', source: 'https://commons.wikimedia.org/wiki/File:亠-seal.svg', ancientLabel: '소전(小篆)', kind: '형태 부수', ancientNote: '독립 갑골문은 확인되지 않아 소전 자형을 제시합니다.', story: '점 아래에 가로선이 놓인 머리 모양의 부수입니다. 독립 글자로 외우기보다 亡·交·京의 공통 윗부분으로 찾습니다.', related: ['亡 망할 망', '交 사귈 교', '京 서울 경'] },
      { glyph: '人', reading: '사람 인', strokes: 2, image: '/oracle/人.svg', source: 'https://commons.wikimedia.org/wiki/File:人-oracle.svg', kind: '상형', variant: '亻', variantName: '亻 · 사람인변', ancientNote: '사람이 허리를 약간 굽히고 서 있는 옆모습을 그렸습니다.', story: '머리와 몸통을 한 획으로, 다리를 다른 한 획으로 나타낸 사람의 옆모습입니다. 왼쪽에서는 亻로 변합니다.', related: ['休 쉴 휴', '住 살 주', '信 믿을 신'] },
      { glyph: '儿', reading: '어진 사람 인', strokes: 2, image: '/oracle/儿.svg', source: 'https://commons.wikimedia.org/wiki/File:儿-oracle.svg', kind: '상형·변형', ancientNote: '사람의 두 다리를 중심으로 남긴 옛 자형입니다.', story: '사람의 아랫부분, 특히 두 다리가 벌어진 모습을 나타냅니다. 글자 아래에서 사람이 서 있는 모양을 찾게 합니다.', related: ['元 으뜸 원', '兄 형 형', '先 먼저 선'] },
      { glyph: '入', reading: '들 입', strokes: 2, image: '/oracle/入.svg', source: 'https://commons.wikimedia.org/wiki/File:入-oracle.svg', kind: '지사·상형', ancientNote: '두 선이 안쪽 한 지점으로 모이는 모습을 나타냈습니다.', story: '바깥에서 안으로 들어가듯 두 획이 서로 모입니다. 人은 아래가 벌어지고 入은 위가 맞닿는 차이를 비교합니다.', related: ['內 안 내', '全 온전 전', '兩 두 량'] },
      { glyph: '八', reading: '여덟 팔', strokes: 2, image: '/oracle/八.svg', source: 'https://commons.wikimedia.org/wiki/File:八-oracle.svg', kind: '지사·가차', ancientNote: '두 선이 좌우로 갈라지는 모습이 옛 자형에도 나타납니다.', story: '가운데에서 양쪽으로 나뉘는 모습으로 ‘나누다’의 뜻을 나타냈고, 수 8을 적는 글자로 빌려 쓰게 되었습니다.', related: ['分 나눌 분', '公 공평할 공', '共 함께 공'] },
      { glyph: '冂', reading: '멀 경', strokes: 2, image: '/oracle/冂.svg', source: 'https://commons.wikimedia.org/wiki/File:冂-bronze.svg', ancientLabel: '금문(金文)', kind: '상형·형태', ancientNote: '독립 갑골문 대신 금문에서 바깥 테두리의 옛 모양을 확인합니다.', story: '아래쪽이 열린 큰 테두리입니다. 冖·凵과 어느 방향이 열렸는지 비교하면 형태를 쉽게 구별할 수 있습니다.', related: ['同 한가지 동', '冊 책 책', '再 두 재'] },
      { glyph: '冖', reading: '덮을 멱', strokes: 2, image: '/oracle/冖.svg', source: 'https://commons.wikimedia.org/wiki/File:冖-oracle.svg', kind: '상형', ancientNote: '천이나 덮개가 위에서 내려와 가리는 모습을 그렸습니다.', story: '위에서 물건을 덮는 천이나 지붕을 나타냅니다. 宀보다 한 획 적고 가운데 점이 없다는 점을 관찰합니다.', related: ['冠 갓 관', '冥 어두울 명', '軍 군사 군'] },
      { glyph: '冫', reading: '얼음 빙', strokes: 2, image: '/oracle/冫.svg', source: 'https://commons.wikimedia.org/wiki/File:冫-oracle.svg', kind: '상형·변형', ancientNote: '얼음의 갈라진 결이나 얼음 조각을 점으로 표시한 형태입니다.', story: '물 水가 얼어붙은 상태를 두 점으로 간결하게 나타낸 부수입니다. 차가움·얼음과 관련된 글자를 묶습니다.', related: ['冬 겨울 동', '冷 찰 랭', '凍 얼 동'] },
      { glyph: '几', reading: '안석 궤', strokes: 2, image: '/oracle/几.svg', source: 'https://commons.wikimedia.org/wiki/File:几-bigseal.svg', ancientLabel: '대전(大篆)', kind: '상형', ancientNote: '독립 갑골문 대신 대전에서 낮은 안석의 옛 윤곽을 확인합니다.', story: '다리가 짧은 낮은 탁자 또는 팔걸이의 모습을 본뜬 글자입니다. 几와 凵의 끝부분 방향을 비교합니다.', related: ['凡 무릇 범', '凰 봉황새 황', '凱 개선할 개'] },
      { glyph: '凵', reading: '입 벌릴 감', strokes: 2, image: '/oracle/凵.svg', source: 'https://commons.wikimedia.org/wiki/File:凵-oracle.svg', kind: '상형·형태', ancientNote: '위쪽이 열린 그릇이나 움푹 팬 곳의 윤곽을 나타냈습니다.', story: '위가 열린 네모꼴입니다. 물건을 담거나 안에서 밖으로 나오는 장면을 가진 글자에서 찾을 수 있습니다.', related: ['凶 흉할 흉', '出 날 출', '函 함 함'] },
      { glyph: '刀', reading: '칼 도', strokes: 2, image: '/oracle/刀.svg', source: 'https://commons.wikimedia.org/wiki/File:刀-oracle.svg', kind: '상형', variant: '刂', variantName: '刂 · 선칼도방', ancientNote: '한쪽에 날이 선 칼의 옆모습이 옛 자형에 뚜렷합니다.', story: '손잡이와 굽은 칼날을 본뜬 글자입니다. 글자 오른쪽에서는 刂로 서서 자르기·나누기의 뜻을 암시합니다.', related: ['切 끊을 절', '分 나눌 분', '別 다를 별'] },
    ],
  },
  {
    no: '02', nav: '사람과 몸', title: '몸은 가장 가까운 사전', focus: '사람 · 감각 · 마음', count: '22',
    objective: '몸의 모양에서 시작한 부수를 알아보고, 인물의 상태와 감각·감정에 관한 뜻을 추론합니다.',
    range: '人 女 子 口 目 耳 手 足 心 首 面 毛 肉 身 骨 牙 舌 血 爪 臼 尸 鬼',
    cue: '“글자에서 몸의 어느 부분이 뜻을 맡고 있나요?”',
    activity: '休·信·好·聞·想을 사람/감각/마음 세 구역에 배치하고 이유를 말합니다.',
    characters: [
      { glyph: '人', reading: '사람 인', strokes: 2, image: '/oracle/人.svg', source: 'https://commons.wikimedia.org/wiki/File:人-oracle.svg', kind: '상형', variant: '亻', variantName: '亻 · 사람인변', ancientNote: '사람이 허리를 약간 굽히고 서 있는 옆모습입니다.', story: '사람의 몸통과 두 다리를 간결한 두 획으로 나타냈습니다. 왼쪽에 붙으면 亻가 되어 사람의 행동·관계를 암시합니다.', related: ['休 쉴 휴', '住 살 주', '信 믿을 신'] },
      { glyph: '女', reading: '계집 녀', strokes: 3, image: '/oracle/女.svg', source: 'https://commons.wikimedia.org/wiki/File:女-oracle.svg', kind: '상형', ancientNote: '무릎을 꿇고 두 손을 모은 사람의 모습을 그렸습니다.', story: '사람이 무릎을 모으고 앉은 모습을 본뜬 글자입니다. 역사적 자형의 설명과 오늘날의 성 역할은 구분해서 다룹니다.', related: ['好 좋을 호', '姓 성 성', '妹 누이 매'] },
      { glyph: '子', reading: '아들 자', strokes: 3, image: '/oracle/子.svg', source: 'https://commons.wikimedia.org/wiki/File:子-oracle.svg', kind: '상형', ancientNote: '머리가 크고 두 팔을 벌린 어린아이의 모습을 나타냈습니다.', story: '포대기에 싸이거나 두 팔을 벌린 어린아이를 정면에서 본 모습입니다. 아이·자식·배움의 뜻으로 확장됩니다.', related: ['字 글자 자', '孫 손자 손', '學 배울 학'] },
      { glyph: '口', reading: '입 구', strokes: 3, image: '/oracle/口.svg', source: 'https://commons.wikimedia.org/wiki/File:口-oracle.svg', kind: '상형', ancientNote: '벌린 입의 윤곽을 네모에 가까운 모양으로 표시했습니다.', story: '입의 윤곽을 단순하게 그렸습니다. 말하기·먹기·소리와 관련된 글자에서 뜻을 맡고, 囗과 크기를 비교합니다.', related: ['味 맛 미', '唱 부를 창', '問 물을 문'] },
      { glyph: '目', reading: '눈 목', strokes: 5, image: '/oracle/目.svg', source: 'https://commons.wikimedia.org/wiki/File:目-oracle.svg', kind: '상형', ancientNote: '가로로 놓인 눈과 눈동자를 그린 자형이 세로꼴로 정리되었습니다.', story: '눈의 윤곽과 눈동자를 세워 놓은 모양입니다. 보기·살피기·눈의 상태와 관련된 뜻을 만듭니다.', related: ['眼 눈 안', '看 볼 간', '眠 잘 면'] },
      { glyph: '耳', reading: '귀 이', strokes: 6, image: '/oracle/耳.svg', source: 'https://commons.wikimedia.org/wiki/File:耳-oracle.svg', kind: '상형', ancientNote: '귓바퀴의 굴곡을 옆에서 본 모습이 갑골문에 자세히 나타납니다.', story: '귓바퀴와 안쪽의 굴곡을 본뜬 글자입니다. 듣기·소리·귀의 상태와 관련된 한자를 분류합니다.', related: ['聞 들을 문', '聽 들을 청', '聲 소리 성'] },
      { glyph: '手', reading: '손 수', strokes: 4, image: '/oracle/手.svg', source: 'https://commons.wikimedia.org/wiki/File:手-bronze.svg', ancientLabel: '금문(金文)', kind: '상형', variant: '扌', variantName: '扌 · 재방변', ancientNote: '네이버 한자로드와 공개 도판에서 확인되는 금문 자형입니다. 독립된 手 갑골문 도판은 확인되지 않았습니다.', story: '손바닥과 손가락을 나타냈습니다. 왼쪽에 붙으면 扌가 되어 잡기·치기·들기 같은 손동작을 암시합니다.', related: ['打 칠 타', '持 가질 지', '拾 주울 습'] },
      { glyph: '足', reading: '발 족', strokes: 7, image: '/oracle/足.svg', source: 'https://commons.wikimedia.org/wiki/File:足-oracle.svg', kind: '상형', variant: '⻊', variantName: '⻊ · 발족변', ancientNote: '무릎 아래로 이어지는 종아리와 발의 모양을 나타냈습니다.', story: '다리 아래의 발을 본뜬 글자입니다. 왼쪽에서는 ⻊로 줄어 걷기·뛰기·길과 관련된 뜻을 만듭니다.', related: ['路 길 로', '跳 뛸 도', '踏 밟을 답'] },
      { glyph: '心', reading: '마음 심', strokes: 4, image: '/oracle/心.svg', source: 'https://commons.wikimedia.org/wiki/File:心-oracle.svg', kind: '상형', variant: '忄·⺗', variantName: '忄 · 심방변 / ⺗ · 마음심발', ancientNote: '심방과 심실처럼 갈라진 심장의 윤곽을 본뜬 자형입니다.', story: '심장의 윤곽에서 출발해 감정과 생각을 나타내게 된 글자입니다. 자리마다 心·忄·⺗로 모습이 달라집니다.', related: ['情 뜻 정', '想 생각 상', '忘 잊을 망'] },
      { glyph: '首', reading: '머리 수', strokes: 9, image: '/oracle/首.svg', source: 'https://commons.wikimedia.org/wiki/File:首-oracle.svg', kind: '상형', ancientNote: '머리카락과 눈이 강조된 사람의 머리를 갑골문에서 정면으로 그렸습니다.', story: '머리카락이 있는 머리의 모습을 본뜬 글자입니다. 신체의 맨 위라는 뜻에서 ‘첫째·우두머리’로도 확장됩니다.', related: ['首都 수도', '首位 수위', '道 길 도'] },
      { glyph: '面', reading: '낯 면', strokes: 9, image: '/oracle/面.svg', source: 'https://commons.wikimedia.org/wiki/File:面-oracle.svg', kind: '상형', ancientNote: '머리의 윤곽 안에 눈을 크게 넣어 얼굴 전체를 나타낸 갑골문입니다.', story: '사람의 얼굴 윤곽과 눈을 함께 그린 모습입니다. 얼굴에서 물체의 겉면·방향·마주함의 뜻으로 넓어졌습니다.', related: ['正面 정면', '表面 표면', '顔 얼굴 안'] },
      { glyph: '毛', reading: '터럭 모', strokes: 4, image: '/oracle/毛.svg', source: 'https://commons.wikimedia.org/wiki/File:毛-bronze.svg', ancientLabel: '금문(金文)', kind: '상형', ancientNote: '독립 갑골문 도판은 확인되지 않아 금문 자형을 제시합니다.', story: '피부 위에 난 털의 굽은 모양을 본뜬 글자입니다. 털·모직·매우 작은 양을 나타내는 말에 쓰입니다.', related: ['毛髮 모발', '羽毛 우모', '毯 담요 담'] },
      { glyph: '肉', reading: '고기 육', strokes: 6, image: '/oracle/肉.webp', source: 'https://commons.wikimedia.org/wiki/File:肉-oracle.svg', kind: '상형', variant: '月', variantName: '月 · 육달월', ancientNote: '살코기 덩어리 안쪽의 결을 두 줄로 표시한 갑골문입니다.', story: '잘라 놓은 고깃덩어리와 살의 결을 나타냈습니다. 글자 안에서는 月 모양으로 바뀌어 몸·장기·살의 뜻을 맡습니다.', related: ['胃 밥통 위', '肺 허파 폐', '腸 창자 장'] },
      { glyph: '身', reading: '몸 신', strokes: 7, image: '/oracle/身.png', source: 'https://commons.wikimedia.org/wiki/File:身-oracle.svg', kind: '상형', ancientNote: '배가 불룩한 사람의 옆모습으로 몸 전체를 나타낸 갑골문입니다.', story: '머리부터 몸통까지 사람의 몸 전체를 옆에서 본 모습입니다. 몸소·자기 자신이라는 뜻으로도 쓰입니다.', related: ['躬 몸 궁', '軀 몸 구', '射 쏠 사'] },
      { glyph: '骨', reading: '뼈 골', strokes: 10, image: '/oracle/骨.png', source: 'https://commons.wikimedia.org/wiki/File:冎-oracle.svg', kind: '상형·회의', ancientNote: '骨-oracle 파일은 옛 구성 요소 冎의 갑골 자형으로 연결됩니다. 아래의 肉과 결합해 骨이 되었습니다.', story: '뼈를 나타내는 冎와 살을 나타내는 肉이 결합한 것으로 풀이합니다. 뼈·골격·몸의 중심을 나타내는 글자에서 의미를 맡습니다.', related: ['體 몸 체', '骸 뼈 해', '髓 골수 수'] },
      { glyph: '牙', reading: '어금니 아', strokes: 4, image: '/oracle/牙.png', source: 'https://commons.wikimedia.org/wiki/File:牙-bronze.svg', ancientLabel: '금문(金文)', kind: '상형', ancientNote: '네이버 한자로드에서도 금문·소전·해서를 제시하며 독립 갑골문은 확인되지 않습니다.', story: '짐승이나 사람의 큰 어금니가 맞물린 모습을 본뜬 글자입니다. 이·송곳니와 관련된 뜻을 나타냅니다.', related: ['牙齒 아치', '象牙 상아', '芽 싹 아'] },
      { glyph: '舌', reading: '혀 설', strokes: 6, image: '/oracle/舌.png', source: 'https://commons.wikimedia.org/wiki/File:舌-oracle.svg', kind: '상형', ancientNote: '입에서 길게 나온 혀의 끝을 강조한 갑골문입니다.', story: '입 口 밖으로 혀가 나온 모습을 나타냈습니다. 혀·맛·말하기와 관련된 뜻을 떠올리게 합니다.', related: ['舐 핥을 지', '舌端 설단', '話 말씀 화'] },
      { glyph: '血', reading: '피 혈', strokes: 6, image: '/oracle/血.png', source: 'https://commons.wikimedia.org/wiki/File:血-oracle.svg', kind: '상형·회의', ancientNote: '그릇 안에 담긴 핏방울을 표시한 갑골문 제사 장면입니다.', story: '그릇 皿 안에 피가 담긴 모습을 나타낸 것으로 풀이합니다. 피·혈통·희생 제의의 뜻과 연결됩니다.', related: ['血管 혈관', '血族 혈족', '衆 무리 중'] },
      { glyph: '爪', reading: '손톱 조', strokes: 4, image: '/oracle/爪.png', source: 'https://commons.wikimedia.org/wiki/File:爪-oracle.svg', kind: '상형', variant: '爫', variantName: '爫 · 손톱조머리', ancientNote: '손가락을 아래로 뻗어 물건을 움켜잡는 손을 그린 갑골문입니다.', story: '위에서 아래로 뻗어 잡는 손과 손톱의 모습입니다. 글자 위에서는 爫로 변해 잡기·고르기의 뜻을 보탭니다.', related: ['采 캘 채', '受 받을 수', '爭 다툴 쟁'] },
      { glyph: '臼', reading: '절구 구', strokes: 6, image: '/oracle/臼.png', source: 'https://commons.wikimedia.org/wiki/File:Shuowen_Seal_Radical_134.svg', ancientLabel: '소전(小篆)', kind: '상형', ancientNote: '네이버 한자로드에서 금문·소전·해서가 확인됩니다. 공개 갑골문 도판은 확인되지 않아 설문 소전을 제시합니다.', story: '가운데가 움푹 파인 절구를 위에서 본 모습입니다. 이후 여러 글자의 양옆 구성 요소로도 쓰입니다.', related: ['舂 찧을 용', '興 일 흥', '舉 들 거'] },
      { glyph: '尸', reading: '주검 시', strokes: 3, image: '/oracle/尸.png', source: 'https://commons.wikimedia.org/wiki/File:尸-oracle.svg', kind: '상형', ancientNote: '사람이 몸을 굽히거나 옆으로 누운 자세를 나타낸 갑골문입니다.', story: '몸을 굽힌 사람의 옆모습에서 비롯되었습니다. 오늘의 훈음만으로 관련 글자의 의미를 모두 ‘주검’에 연결하지 않도록 주의합니다.', related: ['居 살 거', '屋 집 옥', '展 펼 전'] },
      { glyph: '鬼', reading: '귀신 귀', strokes: 10, image: '/oracle/鬼.png', source: 'https://commons.wikimedia.org/wiki/File:鬼-oracle.svg', kind: '상형', ancientNote: '커다란 머리가면을 쓰고 무릎을 꿇은 사람처럼 표현한 갑골문입니다.', story: '큰 머리나 가면을 쓴 사람의 모습을 본뜬 글자입니다. 귀신·혼·보이지 않는 존재와 관련된 뜻을 만듭니다.', related: ['魂 넋 혼', '魄 넋 백', '魔 마귀 마'] },
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

const standaloneExamples: Record<string, string[]> = {
  一: ['一日 일일·하루', '第一 제일·첫째'], 乙: ['甲乙 갑을', '乙種 을종'], 二: ['二月 이월', '第二 제이'],
  人: ['人口 인구', '人間 인간'], 入: ['入學 입학', '入口 입구'], 八: ['八月 팔월', '八方 팔방'], 刀: ['刀劍 도검', '短刀 단도'],
  女: ['女子 여자', '男女 남녀'], 子: ['子女 자녀', '王子 왕자'], 口: ['口語 구어', '人口 인구'], 目: ['目的 목적', '科目 과목'],
  耳: ['耳目 이목', '耳鼻科 이비과'], 手: ['手足 수족', '拍手 박수'], 足: ['足跡 족적', '不足 부족'], 心: ['心身 심신', '中心 중심'],
  首: ['首都 수도', '首席 수석'], 面: ['正面 정면', '場面 장면'], 毛: ['毛髮 모발', '羊毛 양모'], 肉: ['肉體 육체', '筋肉 근육'],
  身: ['身體 신체', '出身 출신'], 骨: ['骨格 골격', '筋骨 근골'], 牙: ['象牙 상아', '牙城 아성'], 舌: ['舌戰 설전', '毒舌 독설'],
  血: ['血液 혈액', '出血 출혈'], 爪: ['爪痕 조흔', '爪甲 조갑'], 臼: ['臼齒 구치', '石臼 석구'], 鬼: ['鬼神 귀신', '鬼門 귀문'],
};

const teacherNotes: Record<string, string> = {
  '01:丨': '‘뚫을 곤’이라는 훈음은 부수명입니다. 中·申 속의 세로획이 언제나 ‘뚫다’라는 뜻을 담당하는 것은 아닙니다.',
  '01:丶': '點의 뜻을 가진 이름이지만, 실제 글자에서는 작은 표시를 분류하는 역할이 큽니다. 의미부로 단정하지 않습니다.',
  '01:丿': '독립 단어로 거의 쓰지 않는 획 부수입니다. ‘삐침의 방향’을 알아보는 데 수업 목표를 둡니다.',
  '01:乙': '굽은 싹의 상형이라는 설명과 굽은 선 자체라는 설명이 함께 있습니다. 천간의 둘째 뜻은 가차된 용법입니다.',
  '01:亅': '갈고리획의 모양을 분류하는 부수입니다. 了·事의 전체 뜻을 亅 하나로 풀이하지 않습니다.',
  '01:亠': '현대에 독립 글자로 쓰기보다 윗부분을 분류하는 부수입니다. ‘돼지해머리’는 모양을 부르는 관용 명칭입니다.',
  '01:人': '왼쪽에 들어가면 亻이 되며 이름은 ‘사람인변’입니다. 入과 획이 벌어지는 방향을 비교하면 좋습니다.',
  '01:儿': '‘어진 사람 인’이라는 훈음보다 사람의 두 다리를 남긴 아랫부분이라는 자형 설명이 수업에 더 유용합니다.',
  '01:八': '본래 ‘나뉘다’의 자형으로 풀이하고, 수 8의 뜻은 빌려 쓴 것으로 설명합니다.',
  '01:冂': '뜻보다 열린 방향을 보는 형태 부수입니다. 아래가 열리며, 위가 열린 凵과 비교합니다.',
  '01:冖': '덮개 모양입니다. 宀은 점이 있는 지붕, 冖은 두 획의 덮개라는 차이를 강조합니다.',
  '01:冫': '水의 단순 변형이라기보다 얼음의 갈라진 결을 나타낸 별도 부수로 분류합니다.',
  '01:几': '현대 중국 간체 几와 모양이 같지만 여기서는 ‘안석 궤’ 부수입니다. 문맥과 자형 체계를 구별합니다.',
  '01:凵': '위가 열린 모양을 먼저 관찰합니다. 독립된 훈음 암기보다 出·函에서 테두리를 찾는 활동이 적절합니다.',
  '01:刀': '오른쪽에 서면 刂 ‘선칼도방’으로 변합니다. 자르기·나누기의 의미가 비교적 잘 남는 부수입니다.',
  '02:女': '옛 자형은 무릎을 꿇은 자세를 나타냅니다. 이를 현대 여성의 태도나 성 역할 규범으로 일반화하지 않습니다.',
  '02:子': '‘아들’뿐 아니라 아이·자식 전체를 가리키는 범위가 있습니다. 字·學에서 배움과의 연결도 보여 줍니다.',
  '02:口': '작은 口는 입, 큰 테두리 囗는 에워싼 범위를 나타냅니다. 크기와 글자 속 위치를 함께 비교합니다.',
  '02:手': '확인되는 대표 도판은 금문입니다. 부수로는 扌 ‘재방변’이 되어 손으로 하는 동작을 나타냅니다.',
  '02:足': '발만이 아니라 무릎 아래 다리까지 포함한 옛 자형으로 봅니다. 왼쪽에서는 ⻊ ‘발족변’입니다.',
  '02:心': '왼쪽 忄은 ‘심방변’, 아래 ⺗는 ‘마음심발’입니다. 月과 닮은 글자에서는 위치까지 확인합니다.',
  '02:首': '머리에서 ‘첫째·우두머리’로 뜻이 확장되었습니다. 首都는 도시의 머리라는 비유적 용법입니다.',
  '02:面': '얼굴에서 겉면·방향으로 뜻이 넓어졌습니다. 場面의 面은 구체적인 얼굴이 아닌 ‘국면’의 뜻입니다.',
  '02:肉': '부수로 들어간 月은 달 월이 아니라 ‘육달월’인 경우가 많습니다. 胃·肺·腸에서 몸의 의미를 확인합니다.',
  '02:骨': '갑골 도판은 윗부분 冎의 옛 자형으로 연결됩니다. 骨은 冎와 肉이 결합한 구조로 설명하는 편이 안전합니다.',
  '02:牙': '대표 옛 도판은 금문입니다. 芽에서는 牙가 뜻보다 소리를 돕는 부분이라는 점을 구별합니다.',
  '02:血': '그릇에 피를 담은 제의 장면이라는 풀이입니다. 오늘날의 ‘혈액’ 의미만으로 자형을 설명하면 그릇 皿이 남는 이유가 보이지 않습니다.',
  '02:爪': '위에 놓이면 爫 ‘손톱조머리’가 됩니다. 아래로 뻗은 손이라는 방향성을 采·受에서 확인합니다.',
  '02:臼': '대표 공개 도판은 소전입니다. 興·舉에서는 절구 뜻이 직접 남지 않고 구성 요소처럼 보일 수 있습니다.',
  '02:尸': '훈음이 ‘주검 시’여도 居·屋을 시체와 연결하면 안 됩니다. 굽히거나 앉은 사람의 옆모습이라는 자형을 먼저 설명합니다.',
  '02:鬼': '가면을 쓴 사람 또는 큰 머리의 존재라는 해석이 있습니다. 고대의 제의·영혼 관념과 현대의 귀신 이미지를 구분합니다.',
};

const positionTypes = [
  { name: '변(邊)', place: '왼쪽', glyphs: '亻 氵 扌 忄 衤', examples: '사람인변 · 삼수변 · 재방변 · 심방변 · 옷의변' },
  { name: '방(旁)', place: '오른쪽', glyphs: '刂 阝 攵 頁', examples: '선칼도방 · 고을읍방 · 칠복방 · 머리혈방' },
  { name: '머리', place: '위쪽', glyphs: '艹 宀 ⺮ 雨', examples: '초두머리 · 갓머리 · 대죽머리 · 비우머리' },
  { name: '발', place: '아래쪽', glyphs: '灬 心 皿 儿', examples: '연화발 · 마음심발 · 그릇명발 · 어진사람인발' },
  { name: '엄·몸', place: '바깥', glyphs: '广 尸 門 囗', examples: '민엄호 · 주검시엄 · 문문몸 · 큰입구몸' },
  { name: '받침', place: '왼쪽 아래', glyphs: '辶 廴 走', examples: '책받침 · 민책받침 · 달아날주받침' },
  { name: '제부수', place: '글자 전체', glyphs: '木 日 山', examples: '글자 자체가 곧 부수인 경우' },
];

const strokeRules = [
  ['1', '위에서 아래로', '三 · 言'], ['2', '왼쪽에서 오른쪽으로', '川 · 林'], ['3', '가로획 뒤에 세로획', '十 · 王'], ['4', '삐침 뒤에 파임', '人 · 文'],
  ['5', '바깥을 먼저, 안을 나중', '同 · 月'], ['6', '둘러싼 글자는 마지막에 닫기', '國 · 回'], ['7', '가운데 뒤에 양옆', '小 · 水'], ['8', '꿰뚫는 획·받침은 뒤에', '中 · 道'],
];

const evolutionSteps = [
  { name: '갑골문', period: '상 후기', image: '/oracle/人.svg', note: '뼈에 새겨 직선적' },
  { name: '금문', period: '상·주', image: '/oracle/evolution-person-bronze.png', note: '청동기에 주조' },
  { name: '소전', period: '진', image: '/oracle/evolution-person-seal.png', note: '곡선을 고르게 통일' },
  { name: '예서', period: '진·한', image: '/oracle/evolution-person-clerical.png', note: '붓쓰기용으로 납작해짐' },
  { name: '해서', period: '후한 이후', glyph: '人', note: '획이 정돈되어 표준화' },
];

function FoundationBoard({ showTeacherNotes }: { showTeacherNotes: boolean }) {
  return (
    <section className="foundation-board">
      <article className="foundation-section position-section">
        <div className="section-heading"><span className="lesson-tag">RADICAL POSITION</span><h3>부수의 위치와 명칭</h3></div>
        <div className="position-grid">
          {positionTypes.map((item) => <div className="position-item" key={item.name}><span>{item.place}</span><strong>{item.name}</strong><b>{item.glyphs}</b><small>{item.examples}</small></div>)}
        </div>
      </article>
      <article className="foundation-section stroke-section">
        <div className="section-heading"><span className="lesson-tag">STROKE ORDER</span><h3>필순의 기본 원칙</h3></div>
        <ol className="stroke-rules">{strokeRules.map(([no, rule, examples]) => <li key={no}><span>{no}</span><b>{rule}</b><em>{examples}</em></li>)}</ol>
        <p className="rule-caveat">원칙은 출발점입니다. 개별 글자의 표준 필순과 예외는 획순 애니메이션으로 다시 확인합니다.</p>
      </article>
      <article className="foundation-section evolution-section">
        <div className="section-heading"><span className="lesson-tag">SCRIPT EVOLUTION</span><h3>人으로 보는 자형의 변화</h3></div>
        <div className="evolution-line">
          {evolutionSteps.map((step, index) => <div className="evolution-step" key={step.name}>{index > 0 && <i>→</i>}<div className="evolution-glyph">{step.image ? <img src={step.image} alt={`人의 ${step.name} 자형`} /> : step.glyph}</div><strong>{step.name}</strong><span>{step.period}</span><small>{step.note}</small></div>)}
        </div>
      </article>
      {showTeacherNotes && <aside className="foundation-note"><b>교사 노트</b> 부수 위치의 관용 명칭은 사전·교재에 따라 조금씩 다를 수 있습니다. 학생에게는 ‘왼쪽/오른쪽/위/아래/감쌈’의 공간 개념을 먼저 익히게 하고, 세부 명칭은 실제 글자와 함께 확인하세요. 자형 변화는 한 단계가 일시에 다른 단계로 교체된 것이 아니라 오랜 기간 여러 서체가 겹쳐 쓰였다는 점도 덧붙입니다.</aside>}
    </section>
  );
}

function StrokeAnimator({ glyph }: { glyph: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<ReturnType<typeof HanziWriter.create> | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    let active = true;
    let dataReady = false;
    target.innerHTML = '';
    setStatus('loading');
    const size = Math.min(280, Math.max(190, target.clientWidth || 250));
    const writer = HanziWriter.create(target, glyph, {
      width: size,
      height: size,
      padding: 18,
      showOutline: true,
      showCharacter: false,
      strokeColor: '#c34f35',
      outlineColor: '#d4cec0',
      strokeAnimationSpeed: 1.15,
      delayBetweenStrokes: 360,
      charDataLoader: (character) => fetch(`/strokes/${encodeURIComponent(character)}.json`).then((response) => {
        if (!response.ok) throw new Error('획순 데이터를 불러오지 못했습니다.');
        return response.json();
      }),
      onLoadCharDataSuccess: () => {
        if (!active) return;
        dataReady = true;
        setStatus('ready');
        void writer.animateCharacter();
      },
      onLoadCharDataError: () => active && setStatus('error'),
    });
    writerRef.current = writer;
    return () => {
      active = false;
      if (dataReady) {
        try { void writer.pauseAnimation().catch(() => undefined); } catch { /* 데이터 로드 전 정리 오류 무시 */ }
      }
      target.innerHTML = '';
    };
  }, [glyph]);

  const replay = () => {
    const writer = writerRef.current;
    if (!writer) return;
    void writer.hideCharacter({ duration: 80 }).then(() => writer.animateCharacter());
  };

  return (
    <div className="stroke-player">
      <div className="stroke-grid" ref={targetRef} aria-label={`${glyph} 획순 애니메이션`} />
      {status === 'loading' && <span className="stroke-status">획순 불러오는 중…</span>}
      {status === 'error' && <span className="stroke-status error">이 글자의 획순 데이터를 찾지 못했습니다.</span>}
      <button onClick={replay} disabled={status !== 'ready'}><span>▶</span> 획순 다시 보기</button>
      <small>붉은 선을 따라 한 획씩 관찰하세요.</small>
    </div>
  );
}

export default function Home() {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [mode, setMode] = useState<'explore' | 'plan' | 'quiz'>('explore');
  const [visualMode, setVisualMode] = useState<'ancient' | 'strokes'>('ancient');
  const [revealed, setRevealed] = useState(false);
  const [showTeacherNotes, setShowTeacherNotes] = useState(false);
  const chapter = chapters[chapterIndex];
  const selected = chapter.characters[characterIndex] || chapter.characters[0];
  const quizItem = chapter.characters[characterIndex % chapter.characters.length] || chapter.characters[0];
  const progress = chapter.no;
  const selectedTeacherNote = teacherNotes[`${chapter.no}:${selected.glyph}`];
  const wordExamples = standaloneExamples[selected.glyph] || [];

  const selectChapter = (index: number) => {
    setChapterIndex(index);
    setCharacterIndex(0);
    setRevealed(false);
    setMode('explore');
    setVisualMode('ancient');
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
            {chapter.intro ? <button className="active">기초 지도</button> : <>
              <button onClick={() => setMode('explore')} className={mode === 'explore' ? 'active' : ''}>글자 탐구</button>
              <button onClick={() => setMode('plan')} className={mode === 'plan' ? 'active' : ''}>수업 설계</button>
              <button onClick={() => { setMode('quiz'); setRevealed(false); }} className={mode === 'quiz' ? 'active' : ''}>퀴즈</button>
            </>}
          </div>
          <div className="topbar-actions">
            <button className={`teacher-toggle ${showTeacherNotes ? 'active' : ''}`} onClick={() => setShowTeacherNotes((value) => !value)}><span>교사 노트</span>{showTeacherNotes ? 'ON' : 'OFF'}</button>
            {!chapter.intro && <div className="shortcuts"><kbd>←</kbd><kbd>→</kbd> 글자 이동 <kbd>Space</kbd> 정답</div>}
          </div>
        </header>

        <header className="stage-header">
          <div>
            <p className="eyebrow">CHAPTER {chapter.no} · 50 MIN · {chapter.focus}</p>
            <h2>{chapter.title}</h2>
          </div>
          <div className="time-badge"><strong>{chapter.intro ? '入' : chapter.count}</strong><span>{chapter.intro ? '기초 개념' : chapter.count === '0' ? '종합 활동' : '새 부수'}</span></div>
        </header>

        {mode === 'explore' && chapter.intro && <FoundationBoard showTeacherNotes={showTeacherNotes} />}

        {mode === 'explore' && !chapter.intro && (
          <>
            <section className="hero-panel">
              <div className="visual-panel">
                <div className="visual-tabs" aria-label="글자 보기 방식">
                  <button onClick={() => setVisualMode('ancient')} className={visualMode === 'ancient' ? 'active' : ''}>옛글자</button>
                  <button onClick={() => setVisualMode('strokes')} className={visualMode === 'strokes' ? 'active' : ''}>획순 애니메이션</button>
                </div>
                {visualMode === 'ancient' ? (
                  <div className="oracle-frame">
                    <span className="frame-label">{selected.ancientLabel || '갑골문(甲骨文)'}</span>
                    {selected.image ? (
                      <img src={selected.image} alt={`${selected.glyph}의 갑골문 형태`} />
                    ) : (
                      <div className="pending-oracle"><strong>{selected.glyph}</strong><span>확인된 도판은 없지만<br />자형 설명은 수록했습니다.</span></div>
                    )}
                    {selected.ancientNote && <p className="ancient-note">{selected.ancientNote}</p>}
                    {selected.source ? <a className="source-link" href={selected.source} target="_blank" rel="noreferrer">도판·시대 출처 확인 ↗</a> : <span className="source-link muted">추정 도판 대신 설명만 제공</span>}
                  </div>
                ) : (
                  <div className="stroke-frame"><StrokeAnimator glyph={selected.glyph} /></div>
                )}
              </div>
              <div className="glyph-story">
                <span className="lesson-tag">{selected.kind || '부수'} · RADICAL</span>
                <div className="glyph-line">
                  <span className="main-glyph">{selected.glyph}</span>
                  <div><strong>{selected.reading}</strong><small>총 {selected.strokes}획</small>{selected.variant && <em>부수 변형 {selected.variantName || selected.variant}</em>}</div>
                </div>
                <p>{selected.story}</p>
                <div className="example-groups">
                  <div className="related-row"><span>관련 글자</span>{selected.related.map((item) => <b key={item}>{item}</b>)}</div>
                  {wordExamples.length > 0 && <div className="word-example-row"><span>단어 예시</span>{wordExamples.map((item) => <b key={item}>{item}</b>)}</div>}
                </div>
                {showTeacherNotes && selectedTeacherNote && <aside className="character-teacher-note"><b>교사 노트</b><p>{selectedTeacherNote}</p></aside>}
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
