import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#1a237e] to-[#0d123b] text-white p-8">
      {/* 로고 및 헤더 */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-10">
        <Image src="/tensw-logo.jpg" alt="TENSW Logo" width={100} height={24} />
        <span className="text-sm">주식회사 텐소프트웍스</span>
      </header>

      {/* 메인 타이틀 */}
      <h1 className="text-5xl font-bold text-center mb-6 text-balance">
        통합 AI 도서관 솔루션
        <br />
        비블로
      </h1>

      {/* 중앙 아이콘 */}
      <div className="my-8">
        <div className="w-64 h-32 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
          <span className="text-2xl font-bold text-white/80">Biblo AI</span>
        </div>
      </div>

      {/* 태그라인 */}
      <p className="text-3xl font-semibold mb-12 text-balance">
        AI로 도서관 경험을 재설계하다!
      </p>

      {/* 기능 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <FeatureCard
          href="/assistant"
          title="AI 연구 어시스턴트"
          description="학술 검색부터 논문 영상화까지, 연구자의 모든 과정을 AI로 지원하는 통합 솔루션"
          number="1"
        />

        <FeatureCard
          href="/chatbot"
          title="통합 AI 챗봇"
          description="좌석 예약부터 도서 추천까지, 하나의 챗봇으로 모든 도서관 서비스를 이용"
          number="2"
        />

        <FeatureCard
          href="/search"
          title="AI 시맨틱 검색"
          description="검색어가 아니라 도서의 의미로 찾는 차세대 검색 엔진"
          number="3"
        />
      </div>

      {/* 프레젠테이션 안내 */}
      <div className="mt-12 text-center text-sm text-white/70">
        <p>각 카드를 클릭하여 기능별 상세 설명을 확인하세요</p>
        <p className="mt-1">
          프레젠테이션 모드에서 화살표 키로 이동 가능합니다
        </p>
      </div>
    </main>
  );
}

function FeatureCard({
  href,
  title,
  description,
  number,
}: {
  href: string;
  title: string;
  description: string;
  number: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-white text-gray-900 rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm">
            {number}
          </span>
          <h2 className="text-2xl font-bold text-indigo-800">{title}</h2>
        </div>
        <p className="text-gray-700 mb-4 min-h-24 leading-relaxed">
          {description}
        </p>

        <div className="w-full h-40 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg flex items-center justify-center border border-indigo-100">
          <span className="text-indigo-400 font-medium">기능 {number}</span>
        </div>
      </div>
    </Link>
  );
}
