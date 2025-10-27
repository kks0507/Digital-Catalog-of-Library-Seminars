"use client";

import Link from "next/link";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="flex bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex justify-center w-full px-6 py-4">
          <div className="flex justify-between w-full mr-12">
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <h1 className="text-2xl font-bold text-gray-900 whitespace-nowrap">
                Digital Catalog of Library Seminars
              </h1>
            </Link>
            <nav className="flex items-center gap-4 flex-shrink-0">
              <Link
                href="/assistant"
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                AI 연구 어시스턴트
              </Link>
              <Link
                href="/chatbot"
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                통합 AI 챗봇
              </Link>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white whitespace-nowrap">
                AI 시멘틱 검색
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-indigo-900">
          3. AI 시맨틱 검색엔진과 데이터 관리
        </h1>

        {/* 3.1 탐색형 AI 검색 엔진 */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-800">
            3.1 탐색형 AI 검색 엔진 (차세대)
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            단순 키워드 검색이 아닌, 문맥과 의미를 이해하는 시맨틱 검색 기술로
            사용자가 원하는 정확한 정보와 연관 자료를 탐색형 UI로 제공합니다.
          </p>

          {/* iframe으로 SKKU 도서관 AI 검색 임베드 */}
          <div className="border-2 rounded-lg shadow-lg overflow-hidden bg-white">
            <iframe
              src="https://lib2.skku.edu/search"
              width="100%"
              height="900px"
              className="border-0"
              title="SKKU 도서관 AI 검색 엔진"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>

          {/* 시맨틱 검색 특징 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-2">
                🎯 의미 기반 검색
              </h4>
              <p className="text-sm text-gray-700">
                키워드가 아닌 문맥과 의미를 이해하여 정확한 결과 제공
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h4 className="font-semibold text-green-900 mb-2">
                🔗 연관 자료 탐색
              </h4>
              <p className="text-sm text-gray-700">
                관련된 도서, 논문, 자료를 자동으로 연결하여 제시
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <h4 className="font-semibold text-purple-900 mb-2">
                📊 시각화 UI
              </h4>
              <p className="text-sm text-gray-700">
                검색 결과를 직관적인 그래프와 차트로 시각화
              </p>
            </div>
          </div>
        </section>

        {/* 3.2 데이터 관리 대시보드 */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-800">
            3.2 데이터 관리를 위한 대시보드
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            도서관 데이터 현황, 이용자 통계, 검색 트렌드 등을 한눈에 파악할 수
            있는 관리자용 대시보드를 제공하여 효율적인 데이터 관리를 지원합니다.
          </p>

          {/* iframe으로 서지 정보 관리 대시보드 임베드 */}
          <div className="border-2 rounded-lg shadow-lg overflow-hidden bg-white">
            <iframe
              src="https://library-data-dashboard.vercel.app/"
              width="100%"
              height="1200px"
              className="border-0"
              title="서지 정보 관리 대시보드"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </div>

          {/* 대시보드 기능 */}
          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-3">
              📈 대시보드 주요 기능
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span className="text-gray-700">실시간 도서관 이용 현황</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span className="text-gray-700">
                  인기 검색어 및 트렌드 분석
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span className="text-gray-700">대출/반납 통계 및 예측</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span className="text-gray-700">사용자 행동 패턴 분석</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span className="text-gray-700">장서 관리 및 추천</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span className="text-gray-700">시스템 성능 모니터링</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
