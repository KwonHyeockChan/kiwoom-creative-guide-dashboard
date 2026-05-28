import type { MediaChannel } from './types';

export const CHANNELS: MediaChannel[] = [
  {
    id: 'google',
    name: 'Google 디멘드젠',
    platform: 'Google',
    color: 'bg-blue-600/80 text-white',
    formats: [
      {
        id: 'demand_gen',
        name: '디멘드젠 (이미지/영상 공통)',
        imageSpecs: [
          { label: '가로 이미지 (필수)', size: '1200×628px', ratio: '1.91:1', formats: ['PNG', 'JPG', 'JPEG'], maxSizeMB: 5 },
          { label: '정사각형 이미지 (필수)', size: '1200×1200px', ratio: '1:1', formats: ['PNG', 'JPG', 'JPEG'], maxSizeMB: 5 },
          { label: '세로 이미지 (선택)', size: '960×1200px (4:5) 또는 1080×1920px (9:16)', formats: ['PNG', 'JPG', 'JPEG'], maxSizeMB: 5 },
          { label: '영상', size: '16:9 (1920×1080px) 또는 1:1 (1080×1080px)', formats: ['MPG', 'MPEG-2', 'MPEG-4'], maxSizeMB: 256, notes: 'HD 권장' },
        ],
        textFields: [
          { id: 'title_1', label: '광고 제목 1', maxLength: 40, unit: 'byte', description: '제목당 최대 40byte (한글 1자=2byte)', required: true },
          { id: 'title_2', label: '광고 제목 2', maxLength: 40, unit: 'byte', required: true },
          { id: 'title_3', label: '광고 제목 3', maxLength: 40, unit: 'byte', required: true },
          { id: 'title_4', label: '광고 제목 4', maxLength: 40, unit: 'byte' },
          { id: 'title_5', label: '광고 제목 5', maxLength: 40, unit: 'byte' },
          { id: 'desc_1', label: '설명 1', maxLength: 90, unit: 'byte', description: '설명당 최대 90byte', required: true },
          { id: 'desc_2', label: '설명 2', maxLength: 90, unit: 'byte', required: true },
          { id: 'desc_3', label: '설명 3', maxLength: 90, unit: 'byte' },
          { id: 'desc_4', label: '설명 4', maxLength: 90, unit: 'byte' },
          { id: 'desc_5', label: '설명 5', maxLength: 90, unit: 'byte' },
        ],
        notes: ['문장 부호 사용 가급적 자제', '최소 제목 3개 + 설명 2개 필수, 5개씩 권장', '캠페인 최적화를 위해 이미지 최대 20개 투입 권장'],
      },
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram (Meta)',
    platform: 'Meta',
    color: 'bg-pink-600/80 text-white',
    formats: [
      {
        id: 'feed',
        name: '피드 & 스토리/탐색',
        imageSpecs: [
          { label: '피드 이미지', size: '1080×1080px', ratio: '1:1', formats: ['PNG', 'JPG'], maxSizeMB: 30, notes: '최소 500px, 비율 허용범위 ±0.01' },
          { label: '스토리/탐색 이미지', size: '1080×1920px', ratio: '9:16', formats: ['PNG', 'JPG'], maxSizeMB: 30, notes: '상단 14%, 하단 20% 여백 확보 권장' },
          { label: '피드 영상', size: '1440×1440px 이상', ratio: '1:1', formats: ['MP4', 'MOV', 'GIF'], maxSizeMB: 4096 },
        ],
        textFields: [
          { id: 'body', label: '기본문구 (피드·스토리 공통)', maxLength: 125, unit: 'char', description: '스토리 지면은 기본문구만 적용', required: true },
          { id: 'headline', label: '제목', maxLength: 40, unit: 'char' },
        ],
        notes: ['스토리 지면은 기본문구만 적용 (제목 없음)'],
      },
    ],
  },
  {
    id: 'naver-gfa',
    name: '네이버 GFA',
    platform: 'Naver',
    color: 'bg-green-600/80 text-white',
    formats: [
      {
        id: 'image_da',
        name: '모바일 DA (이미지)',
        imageSpecs: [
          { label: '이미지 배너', size: '1250×560px', formats: ['PNG', 'JPG', 'JPEG'], maxSizeKB: 250 },
        ],
        textFields: [
          { id: 'alt_text', label: '광고 안내 문구 (대체 텍스트)', maxLength: 100, unit: 'char', description: '시각 장애인에게 음성으로 제공되는 안내 문구', required: true },
        ],
        notes: [
          '텍스트 위치: 상단·하단 35px / 좌·우 205px 여백 준수',
          '텍스트 컬러: 기본 컬러 포함 최대 3가지 사용 가능 (로고 제외)',
          '배경: 투명 배경 불가, 화이트(#FFFFFF) 전체면적 50% 이하만 허용',
          'AD Mute 버튼: 우측 상단 영역 여백 필수',
        ],
      },
    ],
  },
  {
    id: 'naver-ad',
    name: '네이버 커뮤니케이션 AD',
    platform: 'Naver',
    color: 'bg-emerald-600/80 text-white',
    formats: [
      {
        id: 'comm_ad',
        name: '커뮤니케이션 AD',
        imageSpecs: [
          { label: '프로필 이미지', size: '112×112px', formats: ['PNG', 'JPG', 'JPEG'], maxSizeKB: 250, notes: '텍스트·로고 포함 영역 20% 이하, 테두리·여백 금지' },
        ],
        textFields: [
          { id: 'copy_1', label: '광고 문구 1', maxLength: 40, unit: 'char', description: '안정적 노출 권장: 33자 이내 (최대 40자)', required: true },
          { id: 'copy_2', label: '광고 문구 2', maxLength: 50, unit: 'char', required: true },
          { id: 'legal', label: '법적 고지문 (심의필)', maxLength: 45, unit: 'char', description: '최대 45자 (심의필 포함)', required: true },
        ],
        notes: ['프로필명은 최대 14자 (에이전시에서 설정)', '따옴표·쌍따옴표 사용 불가'],
      },
    ],
  },
  {
    id: 'toss-list',
    name: '토스 리스트배너',
    platform: 'Toss',
    color: 'bg-sky-600/80 text-white',
    formats: [
      {
        id: 'list_banner',
        name: '혜택탭 리스트배너',
        imageSpecs: [],
        textFields: [
          { id: 'main_copy', label: '상단 메인 문구', maxLength: 18, unit: 'char', description: '수치·액션 포함하며 큰 혜택이 드러나는 문구 권장', required: true },
          { id: 'sub_copy', label: '하단 보조 문구', maxLength: 18, unit: 'char', description: '메인 문구를 보조하는 카피', required: true },
        ],
        notes: [
          '주요 문구와 보조 문구 중 한 곳에는 반드시 혜택 사항 기재',
          '평어체(반말) 사용 불가',
          '심의필 필요 업종: 안내 문구 기재 필수 (에이전시에 별도 전달)',
        ],
      },
    ],
  },
  {
    id: 'toss-benefit',
    name: '토스 혜택탭 배너',
    platform: 'Toss',
    color: 'bg-sky-600/80 text-white',
    formats: [
      {
        id: 'benefit_tab',
        name: '혜택탭 배너',
        imageSpecs: [
          { label: '로고 이미지 (배경색 있음)', size: '800×800px', formats: ['PNG'], maxSizeKB: 200, notes: '브랜드 로고 이미지' },
          { label: '기타 이미지 (배경색 없음)', size: '200×200px', formats: ['PNG'], maxSizeKB: 200, notes: '문구에 브랜드명 있을 때 사용 가능' },
        ],
        textFields: [
          { id: 'main_copy', label: '메인카피', maxLength: 18, unit: 'char', description: '수치·액션 포함하며 큰 혜택이 드러나는 문구 권장', required: true },
          { id: 'sub_copy', label: '서브카피', maxLength: 18, unit: 'char', description: '메인 문구를 보조하는 카피', required: true },
        ],
        notes: ['심의필 기재 불가 (혜택탭 배너 특성)'],
      },
    ],
  },
  {
    id: 'kakao-bizboard',
    name: '카카오모먼트 비즈보드',
    platform: 'Kakao',
    color: 'bg-yellow-500/80 text-black',
    formats: [
      {
        id: 'bizboard',
        name: '비즈보드',
        imageSpecs: [
          { label: '이미지 (오브젝트형)', size: '315×258px', formats: ['PNG'], maxSizeKB: 150, notes: '투명 배경, 오브젝트 최소 가로 219px' },
          { label: '이미지 (썸네일 박스형)', size: '315×258px', formats: ['JPG', 'PNG'], maxSizeMB: 10, notes: '투명 배경 불가, 텍스트 이미지 면적 50% 이하' },
        ],
        textFields: [
          { id: 'main_copy', label: '메인카피', maxLength: 30, unit: 'char', description: '권장 15자 이내 (최대 30자, 초과 시 이미지에 가려 검수 미통과 가능)', required: true },
          { id: 'sub_copy', label: '서브카피', maxLength: 30, unit: 'char', description: '권장 20자 이내 (최대 30자)', required: true },
          { id: 'legal', label: '심의필 문구', maxLength: 50, unit: 'char', required: true },
        ],
        notes: ['랜딩 URL 에이전시에 별도 전달 필요'],
      },
    ],
  },
  {
    id: 'kakao-pay',
    name: '카카오페이 핏배너',
    platform: 'Kakao',
    color: 'bg-yellow-500/80 text-black',
    formats: [
      {
        id: 'fit_banner',
        name: '핏배너',
        imageSpecs: [
          { label: '이미지', size: '400×400px', formats: ['PNG'], maxSizeMB: 1, notes: '투명 배경' },
        ],
        textFields: [
          { id: 'main_copy', label: '주요문구 (메인카피)', maxLength: 14, unit: 'char', description: '수치·액션 포함 혜택 문구 권장', required: true },
          { id: 'sub_copy', label: '보조문구 (서브카피)', maxLength: 15, unit: 'char', required: true },
          { id: 'legal', label: '심의필 문구', maxLength: 60, unit: 'char', required: true },
        ],
        notes: ['랜딩 URL 에이전시에 별도 전달 필요'],
      },
    ],
  },
  {
    id: 'blind',
    name: '블라인드',
    platform: 'Blind',
    color: 'bg-slate-500/80 text-white',
    formats: [
      {
        id: 'exit_ad',
        name: '종료광고',
        imageSpecs: [
          { label: '종료광고 이미지', size: '1080×1920px 또는 1080×2220px', formats: ['PNG', 'JPG'], maxSizeKB: 300, notes: '하단 크롭 가능, 메인 오브젝트 영역 내 배치 필수, 테두리 금지' },
        ],
        textFields: [],
        notes: [
          '이미지 내 심의필 번호 및 주의사항: 하단 120px 상단에 명시 (텍스트 최소 42px)',
          '텍스트 최소 사이즈 42px / 고딕계열 폰트 사용',
          'CTA 버튼 삽입 권장',
        ],
      },
      {
        id: 'feed_ad',
        name: '피드광고 (이미지형)',
        imageSpecs: [
          { label: '로고 이미지', size: '96×96px', formats: ['PNG', 'JPG'], maxSizeKB: 50, notes: '투명 배경 불가, 원형 크롭' },
          { label: '메인 이미지', size: '1200×628px', formats: ['PNG', 'JPG'], maxSizeKB: 100 },
        ],
        textFields: [
          { id: 'title', label: '타이틀', maxLength: 38, unit: 'char', required: true },
          { id: 'body_1', label: '본문 1', maxLength: 25, unit: 'char', required: true },
          { id: 'body_2', label: '본문 2', maxLength: 25, unit: 'char' },
          { id: 'button', label: '버튼 문구', maxLength: 15, unit: 'char', required: true },
        ],
        notes: ['메인 이미지 내 텍스트 최소 사이즈 48px', 'CTA 버튼 이미지 삽입 불가'],
      },
    ],
  },
  {
    id: 'remember',
    name: '리멤버 메인배너',
    platform: 'Remember',
    color: 'bg-orange-500/80 text-white',
    formats: [
      {
        id: 'main_banner',
        name: '메인배너',
        imageSpecs: [
          { label: '메인배너 이미지', size: '968×258px', formats: ['PNG'], maxSizeKB: 400, notes: 'PSD 샘플 활용 필수, 폰트 변경 불가 (프리텐다드)' },
        ],
        textFields: [
          { id: 'main_copy', label: '메인 카피', maxLength: 14, unit: 'char', description: '최소 4자 ~ 최대 14자', required: true },
          { id: 'sub_copy', label: '서브 카피', maxLength: 17, unit: 'char', description: '최소 4자 ~ 최대 17자', required: true },
          { id: 'button', label: '버튼 문구', maxLength: 15, unit: 'char', description: '최소 4자 ~ 최대 15자', required: true },
        ],
        notes: [
          '배경색 #000000 고정',
          '폰트: 프리텐다드 고정, 크기·굵기 변경 불가',
          '배경색 금지: #FF5414(리멤버 오렌지), #FFFFFF(라이트 모드 배경), #1A1A1A(다크 모드 배경)',
        ],
      },
    ],
  },
  {
    id: 'addison',
    name: '애디슨오퍼월',
    platform: 'Addison',
    color: 'bg-purple-600/80 text-white',
    formats: [
      {
        id: 'a_type',
        name: '이벤트 목록 배너 A타입',
        imageSpecs: [
          { label: 'A타입 이미지', size: '720×360px', formats: ['PNG', 'JPG'], maxSizeKB: 200, notes: '배경 흰색·회색·검정 금지, 텍스트 좌측 구성 권장' },
        ],
        textFields: [
          { id: 'title', label: '타이틀 카피', maxLength: 15, unit: 'char', description: '브랜드명 또는 서비스명 기입', required: true },
          { id: 'sub_copy', label: '서브 카피', maxLength: 19, unit: 'char', description: '"~하면" 형태로 이벤트 조건 명확하게 기재 필수', required: true },
        ],
        notes: [
          '앱 설치·실행 텍스트 금지 (AOS: "앱 내려받기/접속하기", iOS: "앱 접속하기"로 대체)',
          '"페이백" 문구 사용 불가',
        ],
      },
      {
        id: 'b_type',
        name: '이벤트 목록 배너 B타입',
        imageSpecs: [
          { label: 'B타입 썸네일 이미지', size: '144×144px', formats: ['PNG', 'JPG'], maxSizeKB: 100, notes: 'BI 이미지 104×104px 영역 내 삽입, 상하 센터 정렬' },
        ],
        textFields: [
          { id: 'title', label: '타이틀 카피', maxLength: 15, unit: 'char', description: '브랜드명 또는 서비스명 기입', required: true },
          { id: 'sub_copy', label: '서브 카피', maxLength: 19, unit: 'char', description: '"~하면" 형태로 이벤트 조건 명확하게 기재 필수', required: true },
        ],
        notes: [
          '앱 설치·실행 텍스트 금지',
          '로고나 광고 모델, 상품 이미지만 사용 가능',
        ],
      },
    ],
  },
  {
    id: 'taboola',
    name: '타불라',
    platform: 'Taboola',
    color: 'bg-indigo-600/80 text-white',
    formats: [
      {
        id: 'native',
        name: '네이티브 광고',
        imageSpecs: [
          { label: '네이티브 이미지', size: '1200×628px (권장)', ratio: '1.91:1', formats: ['JPG', 'PNG'] },
        ],
        textFields: [
          { id: 'headline', label: '헤드라인', maxLength: 100, unit: 'char', description: '클릭을 유도하는 기사형 제목', required: true },
        ],
        notes: ['최소 3개 소재 권장'],
      },
    ],
  },
];

export function getChannel(id: string): MediaChannel | undefined {
  return CHANNELS.find((c) => c.id === id);
}
