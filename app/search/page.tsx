import Image from "next/image"
import { PresentationNav } from "@/components/presentation-nav"

export default function SearchPage() {
  return (
    <>
      <PresentationNav currentPage="search" />

      <main className="container mx-auto p-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-indigo-900">3. AI 시맨틱 검색엔진과 데이터 관리</h1>

        {/* 3.1 탐색형 AI 검색 엔진 */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-800">3.1 탐색형 AI 검색 엔진 (차세대)</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            단순 키워드 검색이 아닌, 문맥과 의미를 이해하는 시맨틱 검색 기술로 사용자가 원하는 정확한 정보와 연관 자료를
            탐색형 UI로 제공합니다.
          </p>
          <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
            <Image
              src="/ai-------------------------.jpg"
              alt="탐색형 AI 검색 엔진 UI"
              width={1200}
              height={800}
              className="w-full"
            />
          </div>

          {/* 시맨틱 검색 특징 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-2">🎯 의미 기반 검색</h4>
              <p className="text-sm text-gray-700">키워드가 아닌 문맥과 의미를 이해하여 정확한 결과 제공</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <h4 className="font-semibold text-green-900 mb-2">🔗 연관 자료 탐색</h4>
              <p className="text-sm text-gray-700">관련된 도서, 논문, 자료를 자동으로 연결하여 제시</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <h4 className="font-semibold text-purple-900 mb-2">📊 시각화 UI</h4>
              <p className="text-sm text-gray-700">검색 결과를 직관적인 그래프와 차트로 시각화</p>
            </div>
          </div>
        </section>

        {/* 3.2 데이터 관리 대시보드 */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-800">3.2 데이터 관리를 위한 대시보드</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            도서관 데이터 현황, 이용자 통계, 검색 트렌드 등을 한눈에 파악할 수 있는 관리자용 대시보드를 제공하여
            효율적인 데이터 관리를 지원합니다.
          </p>
          <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
            <Image
              src="/---------------------.jpg"
              alt="데이터 관리 대시보드 UI"
              width={1200}
              height={600}
              className="w-full"
            />
          </div>

          {/* 대시보드 기능 */}
          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-3">📈 대시보드 주요 기능</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span className="text-gray-700">실시간 도서관 이용 현황</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span className="text-gray-700">인기 검색어 및 트렌드 분석</span>
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

        {/* 검색 예시 */}
        <section className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
          <h3 className="text-xl font-semibold mb-4 text-indigo-900">🔍 시맨틱 검색 예시</h3>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">기존 키워드 검색:</p>
              <p className="text-gray-800 mb-2">"인공지능" → 제목에 '인공지능'이 포함된 도서만 검색</p>
              <p className="text-sm text-green-600 font-medium">시맨틱 검색:</p>
              <p className="text-gray-800">
                "인공지능" → AI, 머신러닝, 딥러닝, 신경망 등 관련 개념의 도서까지 모두 검색
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
