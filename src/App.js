import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, MetricCard } from "./components/ui/card";
import { Calendar, Users, Bell, Database, Target, Award, Coins, DollarSign, ArrowUpCircle, BarChart3 } from "lucide-react";

const industries = {
  "기초재": {
    retention: 12,
    performance: 6,
    touchpoints: ["영업", "기술지원"],
    churnRisk: "계약만료 전",
    data: "거래/납품이력",
    intervention: "납기/품질관리",
    loyalty: "기술지원/교육",
    cac: "영업인건비 + 제안/컨설팅비용",
    ltv: { 
      formula: ["월평균 거래액 × 예상 거래기간", "CAC"],
      operator: "-"
    },
    upsell: "신규라인도입"
  },
  "식품": {
    retention: 2,
    performance: 1,
    touchpoints: ["유통", "매장"],
    churnRisk: "품질이슈 발생",
    data: "구매패턴/선호",
    intervention: "재구매예상시점",
    loyalty: "포인트/할인",
    cac: "광고비 + 프로모션비용 + 진열비",
    ltv: { 
      formula: ["객단가 × 연간구매빈도 × 고객유지기간", "CAC"],
      operator: "-"
    },
    upsell: "신제품출시"
  },
  "음료/가공식품": {
    retention: 1,
    performance: 1,
    touchpoints: ["유통", "매장", "앱"],
    churnRisk: "경쟁제품전환",
    data: "구매빈도/선호",
    intervention: "프로모션시점",
    loyalty: "멤버십/쿠폰",
    cac: "광고비 + 프로모션비용 + 진열비",
    ltv: { 
      formula: ["월평균 구매액 × 12 × 고객유지기간", "CAC"],
      operator: "-"
    },
    upsell: "신제품/시즌"
  },
  "제약/의료": {
    retention: 6,
    performance: 3,
    touchpoints: ["병원", "약국"],
    churnRisk: "처방주기종료",
    data: "처방/복용이력",
    intervention: "처방갱신시점",
    loyalty: "복약지도/교육",
    cac: "영업인건비 + 의료진교육비 + 임상비용",
    ltv: { 
      formula: ["처방액 × 연간처방빈도 × 처방유지기간", "CAC"],
      operator: "-"
    },
    upsell: "신약/치료제"
  },
  "화장품/보건용품": {
    retention: 3,
    performance: 1,
    touchpoints: ["매장", "온라인"],
    churnRisk: "신제품출시시",
    data: "구매주기/패턴",
    intervention: "제품소진예상시점",
    loyalty: "샘플/포인트",
    cac: "광고비 + 샘플비용 + 판촉비",
    ltv: { 
      formula: ["월평균 구매액 × 12 × 브랜드충성기간", "CAC"],
      operator: "-"
    },
    upsell: "라인업확장"
  },
  "패션": {
    retention: 4,
    performance: 4,
    touchpoints: ["매장", "온라인"],
    churnRisk: "시즌전환시",
    data: "구매스타일/선호",
    intervention: "시즌전환시점",
    loyalty: "VIP혜택/쿠폰",
    cac: "광고비 + VIP혜택 + 첫구매할인",
    ltv: { 
      formula: ["시즌당 구매액 × 연간시즌수 × 충성기간", "CAC"],
      operator: "-"
    },
    upsell: "시즌전환시"
  },
  "정밀기기": {
    retention: 18,
    performance: 6,
    touchpoints: ["기술영업", "AS"],
    churnRisk: "제품수명주기",
    data: "사용/성능데이터",
    intervention: "성능저하시점",
    loyalty: "기술지원/교육",
    cac: "기술영업비 + 데모장비비용 + 교육비용",
    ltv: { 
      formula: ["장비판매가 + (연간 유지보수료 × 사용기간)", "CAC"],
      operator: "-"
    },
    upsell: "기술고도화"
  },
  "가전/전자": {
    retention: 36,
    performance: 3,
    touchpoints: ["매장", "AS센터"],
    churnRisk: "AS만료시점",
    data: "구매/AS이력",
    intervention: "신제품출시시점",
    loyalty: "멤버십/케어",
    cac: "광고비 + 전시장비용 + 판매수수료",
    ltv: { 
      formula: ["제품판매가 + (연간 AS수익 × 사용기간)", "CAC"],
      operator: "-"
    },
    upsell: "신제품교체"
  },
  "금융/보험": {
    retention: 12,
    performance: 3,
    touchpoints: ["지점", "앱", "콜센터"],
    churnRisk: "상품만기시점",
    data: "거래/상품이력",
    intervention: "생애주기변화",
    loyalty: "금리/수수료혜택",
    cac: "광고비 + 상담인건비 + 초기심사비용",
    ltv: {
      formula: ["연간 수수료수익 × 거래유지기간", "CAC"],
      operator: "-"
    },
    upsell: "상품추가가입"
  },
"수송기기": {
  retention: 48,
  performance: 12,
  touchpoints: ["대리점", "서비스"],
  churnRisk: "보증만료시점",
  data: "운행/정비이력",
  intervention: "정비/교체시점",
  loyalty: "정비/보증연장",
  cac: "광고비 + 전시장비용 + 판매수수료",
  ltv: { 
    formula: ["구매가 + (연간 유지비용 × 보유기간)", "CAC"],
    operator: "-"
  },
  upsell: "모델변경시"
},
"가정용품": {
  retention: 24,
  performance: 3,
  touchpoints: ["매장", "온라인"],
  churnRisk: "제품노후화시",
  data: "구매/사용패턴",
  intervention: "라이프스타일변화",
  loyalty: "보증/할인",
  cac: "광고비 + 전시비용 + 판촉비",
  ltv: { 
    formula: ["제품구매액 × 교체주기", "CAC"],
    operator: "-"
  },
  upsell: "라인업확장"
},
"화학공업": {
  retention: 12,
  performance: 6,
  touchpoints: ["영업", "기술지원"],
  churnRisk: "계약만료시점",
  data: "공정/품질데이터",
  intervention: "공정최적화시점",
  loyalty: "기술지원/컨설팅",
  cac: "영업인건비 + 기술지원비용 + 테스트비용",
  ltv: { 
    formula: ["거래액 × 안정성지수", "CAC"],
    operator: "-"
  },
  upsell: "솔루션확장"
},
"건설/건자재": {
  retention: 24,
  performance: 12,
  touchpoints: ["영업", "현장"],
  churnRisk: "프로젝트종료",
  data: "시공/하자이력",
  intervention: "착공/준공시점",
  loyalty: "품질보증/지원",
  cac: "입찰비용 + 제안비용 + 컨설팅비용",
  ltv: { 
    formula: ["프로젝트규모 × 재계약률", "CAC"],
    operator: "-"
  },
  upsell: "추가공정수주"
},
"유통": {
  retention: 2,
  performance: 1,
  touchpoints: ["매장", "온라인", "앱"],
  churnRisk: "경쟁사전환시",
  data: "구매/방문이력",
  intervention: "프로모션시점",
  loyalty: "포인트/할인",
  cac: "광고비 + 초기할인 + 포인트적립",
  ltv: { 
    formula: ["연평균 구매액 × 고객유지기간", "CAC"],
    operator: "-"
  },
  upsell: "카테고리확장"
},
"서비스": {
  retention: 3,
  performance: 1,
  touchpoints: ["대면", "비대면"],
  churnRisk: "서비스불만시",
  data: "이용패턴/만족도",
  intervention: "이용주기시점",
  loyalty: "이용혜택/할인",
  cac: "광고비 + 초기할인 + 프로모션",
  ltv: { 
    formula: ["월평균 이용액 × 12 × 유지기간", "CAC"],
    operator: "-"
  },
  upsell: "서비스확장"
},
"관광/숙박": {
  retention: 6,
  performance: 3,
  touchpoints: ["예약", "현장", "앱"],
  churnRisk: "시즌종료시점",
  data: "예약/이용패턴",
  intervention: "성수기시점",
  loyalty: "멤버십/마일리지",
  cac: "광고비 + 예약수수료 + 초기할인",
  ltv: { 
    formula: ["객단가 × 연간방문횟수 × 유지기간", "CAC"],
    operator: "-"
  },
  upsell: "패키지상품"
},
"교육": {
  retention: 6,
  performance: 6,
  touchpoints: ["학원", "온라인"],
  churnRisk: "학습목표달성",
  data: "학습/성과이력",
  intervention: "성취도변화시점",
  loyalty: "수강할인/특전",
  cac: "광고비 + 상담인건비 + 체험강의",
  ltv: { 
    formula: ["수강료 × 수강기간", "CAC"],
    operator: "-"
  },
  upsell: "심화과정"
},
"컴퓨터/정보통신": {
  retention: 24,
  performance: 3,
  touchpoints: ["온라인", "기술지원"],
  churnRisk: "기술진화시점",
  data: "사용/업그레이드",
  intervention: "신기술출시시점",
  loyalty: "기술지원/업데이트",
  cac: "광고비 + 기술지원 + 초기설치비",
  ltv: { 
    formula: ["제품가격 + (서비스수익 × 사용기간)", "CAC"],
    operator: "-"
  },
  upsell: "사양업그레이드"
},
"출판": {
  retention: 6,
  performance: 3,
  touchpoints: ["온라인", "오프라인"],
  churnRisk: "연재/시리즈종료",
  data: "구독/열람이력",
  intervention: "신간출시시점",
  loyalty: "구독할인/특전",
  cac: "광고비 + 판촉비 + 샘플비용",
  ltv: { 
    formula: ["구독료 × 구독기간", "CAC"],
    operator: "-"
  },
  upsell: "시리즈확장"
},
"그룹/기업": {
  retention: 36,
  performance: 12,
  touchpoints: ["전담팀", "정기미팅"],
  churnRisk: "프로젝트전환",
  data: "협업/성과이력",
  intervention: "검토/평가시점",
  loyalty: "통합혜택/지원",
  cac: "영업비용 + 컨설팅 + 초기구축비",
  ltv: { 
    formula: ["거래액 × 관계성지수", "CAC"],
    operator: "-"
  },
  upsell: "사업확장"
}
};

const formatLTV = (ltv) => `${ltv.formula[0]} ${ltv.operator} ${ltv.formula[1]}`;

export default function IndustryGuideDashboard() {
  const [selectedIndustry, setSelectedIndustry] = useState("기초재");
  const data = industries[selectedIndustry];

  return (
    <div className="w-full bg-gray-50 p-6">
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="text-center mb-4">
            <CardTitle className="text-2xl">업종별 CRM 가이드</CardTitle>
          </div>
          {/* 업종 버튼 (두 행으로 표현) */}
          <div className="grid grid-cols-4 gap-4 justify-center">
            {Object.keys(industries).map((industry) => (
              <button
                key={industry}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedIndustry === industry
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedIndustry(industry)}
              >
                {industry}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 리텐션/성과측정 타임라인 */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-6 h-6 text-blue-500" />
                <h3 className="font-medium">리텐션 주기</h3>
              </div>
              <div className="relative h-12 bg-gray-100 rounded-lg">
                <div className="absolute top-1/2 w-full h-0.5 bg-gray-300" />
                <div
                  className="absolute top-1/2 h-0.5 bg-blue-500"
                  style={{ width: `${(data.retention / 48) * 100}%` }}
                />
                <div
                  className="absolute -top-4 left-full transform -translate-x-1/2 text-sm text-blue-500"
                  style={{ left: `${(data.retention / 48) * 100}%` }}
                >
                  {data.retention}개월
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="w-6 h-6 text-indigo-500" />
                <h3 className="font-medium">성과측정 주기</h3>
              </div>
              <div className="relative h-12 bg-gray-100 rounded-lg">
                <div className="absolute top-1/2 w-full h-0.5 bg-gray-300" />
                <div
                  className="absolute top-1/2 h-0.5 bg-indigo-500"
                  style={{ width: `${(data.performance / 12) * 100}%` }}
                />
                <div
                  className="absolute -top-4 left-full transform -translate-x-1/2 text-sm text-indigo-500"
                  style={{ left: `${(data.performance / 12) * 100}%` }}
                >
                  {data.performance}개월
                </div>
              </div>
            </Card>
          </div>

          {/* 주요 지표 */}
          <div className="grid grid-cols-4 gap-4">
            <MetricCard
              icon={Users}
              title="주요 접점"
              value={
                <div className="flex flex-wrap gap-1">
                  {data.touchpoints.map((point) => (
                    <span
                      key={point}
                      className="px-2 py-0.5 bg-green-100 rounded-full text-xs"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              }
              color="green"
            />
            <MetricCard
              icon={Bell}
              title="이탈 위험 시점"
              value={data.churnRisk}
              color="red"
            />
            <MetricCard
              icon={Database}
              title="핵심 데이터"
              value={data.data}
              color="purple"
            />
            <MetricCard
              icon={Target}
              title="개입 시점"
              value={data.intervention}
              color="orange"
            />
          </div>

          {/* 주요 지표 둘째 줄 */}
          <div className="grid grid-cols-4 gap-4">
            <MetricCard
              icon={Award}
              title="로열티 프로그램"
              value={data.loyalty}
              color="yellow"
            />
            <MetricCard
              icon={Coins}
              title="CAC 기준"
              value={data.cac}
              color="pink"
            />
            <MetricCard
              icon={DollarSign}
              title="LTV 산정"
              value={formatLTV(data.ltv)}
              color="green"
            />
            <MetricCard
              icon={ArrowUpCircle}
              title="업셀 기회"
              value={data.upsell}
              color="blue"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}