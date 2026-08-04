// 수상 & 연구비 — 전체 데이터 (수상 23건 · 연구비 7건, 연도 내림차순)
// star: true → 국제 수상 골드 ★ 강조 (3~5건만)
// lang: 언어별 표기 오버라이드. 영문 원제 수상은 모든 언어에서 원문 유지(오버라이드 불필요).
// TODO: 수상·연구비의 공식 영문 명칭을 교수님/기관에 확인 후 교체 (src/i18n/glossary.md 참고)

export const AWARDS = [
  {
    year: "2021",
    title: "상전유통학술상 최우수학술상",
    org: "롯데그룹 & 유통학회",
    star: false,
    lang: {
      en: { title: "Sangjeon Distribution Research Award, Grand Prize", org: "Lotte Group & Korea Distribution Association" },
      zh: { title: "Sangjeon 流通学术奖 最优秀学术奖", org: "Lotte Group & Korea Distribution Association" },
      ja: { title: "Sangjeon 流通学術賞 最優秀学術賞", org: "Lotte Group & Korea Distribution Association" },
    },
  },
  {
    year: "2021",
    title: "우수교수상",
    org: "연세대학교 경영대학",
    star: false,
    lang: {
      en: { title: "Outstanding Faculty Award", org: "Yonsei School of Business" },
      zh: { title: "优秀教授奖", org: "Yonsei School of Business" },
      ja: { title: "優秀教授賞", org: "Yonsei School of Business" },
    },
  },
  {
    year: "2021",
    title: "우수강의교수상",
    org: "연세대학교",
    star: false,
    lang: {
      en: { title: "Excellence in Teaching Award", org: "Yonsei University" },
      zh: { title: "优秀教学教授奖", org: "Yonsei University" },
      ja: { title: "優秀講義教授賞", org: "Yonsei University" },
    },
  },
  {
    year: "2020",
    title: "우수업적교수상 (연구부문)",
    org: "연세대학교",
    star: false,
    lang: {
      en: { title: "Outstanding Achievement Award (Research)", org: "Yonsei University" },
      zh: { title: "优秀业绩教授奖（研究部门）", org: "Yonsei University" },
      ja: { title: "優秀業績教授賞（研究部門）", org: "Yonsei University" },
    },
  },
  {
    year: "2019",
    title: "우수강의상",
    org: "연세대학교 경영대학",
    star: false,
    lang: {
      en: { title: "Excellence in Teaching Award", org: "Yonsei School of Business" },
      zh: { title: "优秀教学奖", org: "Yonsei School of Business" },
      ja: { title: "優秀講義賞", org: "Yonsei School of Business" },
    },
  },
  {
    year: "2019",
    title: "유통연구 우수논문상",
    org: "유통학회",
    star: false,
    lang: {
      en: { title: "Best Paper Award, Journal of Distribution Research", org: "Korea Distribution Association" },
      zh: { title: "《流通研究》优秀论文奖", org: "Korea Distribution Association" },
      ja: { title: "『流通研究』優秀論文賞", org: "Korea Distribution Association" },
    },
  },
  {
    year: "2018",
    title: "Winner, Best Conference Paper Award",
    org: "Korean Scholars of Marketing Science International Conference",
    star: false,
  },
  {
    year: "2017",
    title: "Winner, Best Conference Paper Award",
    org: "Global Fashion Management Conference",
    star: false,
  },
  {
    year: "2017",
    title: "석사과정 발표논문 우수상",
    org: "한국마케팅학회 춘계학술대회",
    star: false,
    lang: {
      en: { title: "Best Master's Student Paper Award", org: "Korean Marketing Association Spring Conference" },
      zh: { title: "硕士研究生发表论文优秀奖", org: "Korean Marketing Association 春季学术大会" },
      ja: { title: "修士課程発表論文優秀賞", org: "Korean Marketing Association 春季学術大会" },
    },
  },
  {
    year: "2016",
    title: "Winner, Best Conference Paper Award",
    org: "Korean Scholars of Marketing Science International Conference",
    star: false,
  },
  {
    year: "2015",
    title: "2015 MSI (Marketing Science Institute) Young Scholar",
    org: "Marketing Science Institute",
    star: true,
  },
  {
    year: "2014",
    title: "SPC 신진경영학자상",
    org: "경영학회",
    star: false,
    lang: {
      en: { title: "SPC Young Business Scholar Award", org: "Korean Academy of Business" },
      zh: { title: "SPC 新锐经营学者奖", org: "Korean Academy of Business" },
      ja: { title: "SPC 新進経営学者賞", org: "Korean Academy of Business" },
    },
  },
  {
    year: "2013",
    title: "연세대학교 128주년 창립기념일 연세학술상 (사회과학분야)",
    org: "연세대학교",
    star: false,
    lang: {
      en: { title: "Yonsei Academic Award (Social Sciences), 128th Anniversary", org: "Yonsei University" },
      zh: { title: "延世大学建校 128 周年延世学术奖（社会科学领域）", org: "Yonsei University" },
      ja: { title: "延世大学創立 128 周年 延世学術賞（社会科学分野）", org: "Yonsei University" },
    },
  },
  {
    year: "2013",
    title: "Winner, 2013 Robert D. Buzzell MSI Best Paper Award",
    org: "Marketing Science Institute",
    star: true,
  },
  {
    year: "2012",
    title: "MBA 우수강의교수상",
    org: "연세대학교 경영대학",
    star: false,
    lang: {
      en: { title: "MBA Excellence in Teaching Award", org: "Yonsei School of Business" },
      zh: { title: "MBA 优秀教学教授奖", org: "Yonsei School of Business" },
      ja: { title: "MBA 優秀講義教授賞", org: "Yonsei School of Business" },
    },
  },
  {
    year: "2011",
    title: "초헌학술상 (우수연구상)",
    org: "연세대학교 상경대학 동창회",
    star: false,
    lang: {
      en: { title: "Choheon Academic Award (Research Excellence)", org: "Yonsei College of Commerce & Economics Alumni Association" },
      zh: { title: "草轩学术奖（优秀研究奖）", org: "Yonsei College of Commerce & Economics 校友会" },
      ja: { title: "草軒学術賞（優秀研究賞）", org: "Yonsei College of Commerce & Economics 同窓会" },
    },
  },
  {
    year: "2011",
    title: "Winner, 2010 AMA TechSIG Best Article of the Year Competition",
    org: "AMA TechSIG",
    star: true,
  },
  {
    year: "2010",
    title: "Runner-up, Fisher IMS & AMA SERVSIG Dissertation Proposal Competition",
    org: "Fisher IMS & AMA SERVSIG",
    star: false,
  },
  {
    year: "2009",
    title: "Winner, Best Empirical Paper",
    org: "UTD-Frontiers of Research in Marketing Conference",
    star: false,
  },
  {
    year: "2009",
    title: "Winner, Best Retail Proposal Award",
    org: "SMA Doctoral Dissertation Competition",
    star: false,
  },
  {
    year: "2009",
    title: "Winner, AMA TechSIG Most Promising Dissertation Proposal Competition",
    org: "AMA TechSIG",
    star: false,
  },
  {
    year: "2009",
    title: "Mack Center Award",
    org: "Emerging Technologies Management Research Program",
    star: false,
  },
  {
    year: "2007, 2008, 2009",
    title: "Ackoff Doctoral Student Award for Research on Human Decision Processes",
    org: null,
    star: true,
  },
];

export const GRANTS = [
  {
    period: "2025",
    title: "중견연구자지원",
    org: "한국연구재단",
    lang: {
      en: { title: "Mid-career Researcher Program", org: "National Research Foundation of Korea" },
      zh: { title: "中坚研究者支持项目", org: "National Research Foundation of Korea" },
      ja: { title: "中堅研究者支援事業", org: "National Research Foundation of Korea" },
    },
  },
  {
    period: "2021 – 현재",
    title: "연세 시그너처 연구클러스터",
    org: "연세대학교",
    lang: {
      en: { period: "2021 – Present", title: "Yonsei Signature Research Cluster", org: "Yonsei University" },
      zh: { period: "2021 – 至今", title: "延世 Signature 研究集群", org: "Yonsei University" },
      ja: { period: "2021 – 現在", title: "延世シグネチャー研究クラスター", org: "Yonsei University" },
    },
  },
  {
    period: "2020 – 현재",
    title: "BK21 Four",
    org: "한국연구재단",
    lang: {
      en: { period: "2020 – Present", org: "National Research Foundation of Korea" },
      zh: { period: "2020 – 至今", org: "National Research Foundation of Korea" },
      ja: { period: "2020 – 現在", org: "National Research Foundation of Korea" },
    },
  },
  {
    period: "2011–2014, 2017–2020, 2020–2023, 2023–2027",
    title: "SSK (Social Science Korea)",
    org: "한국연구재단",
    lang: {
      en: { org: "National Research Foundation of Korea" },
      zh: { org: "National Research Foundation of Korea" },
      ja: { org: "National Research Foundation of Korea" },
    },
  },
  {
    period: "2016 – 2020",
    title: "BK21plus (Brain Korea)",
    org: "한국연구재단",
    lang: {
      en: { org: "National Research Foundation of Korea" },
      zh: { org: "National Research Foundation of Korea" },
      ja: { org: "National Research Foundation of Korea" },
    },
  },
  {
    period: "2012–2013, 2014, 2015, 2016, 2019",
    title: "신진연구자지원",
    org: "한국연구재단",
    lang: {
      en: { title: "Young Researcher Program", org: "National Research Foundation of Korea" },
      zh: { title: "新锐研究者支持项目", org: "National Research Foundation of Korea" },
      ja: { title: "新進研究者支援事業", org: "National Research Foundation of Korea" },
    },
  },
  {
    period: "2013, 2014",
    title: "연세대학교 상남경영원 연구펠로우십",
    org: "연세대학교",
    lang: {
      en: { title: "Yonsei Sangnam Institute of Management Research Fellowship", org: "Yonsei University" },
      zh: { title: "延世大学上南经营院研究奖学金", org: "Yonsei University" },
      ja: { title: "延世大学 上南経営院 研究フェローシップ", org: "Yonsei University" },
    },
  },
];
