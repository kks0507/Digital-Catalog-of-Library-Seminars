import Image from "next/image";
import Link from "next/link";
import { PresentationNav } from "@/components/presentation-nav";

export default function ChatbotPage() {
  return (
    <>
      <PresentationNav currentPage="chatbot" />

      <main className="container mx-auto p-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-indigo-900">
          2. 에이전트 챗봇
        </h1>

        {/* 통합 챗봇 개요 */}
        <section className="mb-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
            🤖 통합 AI 도서관 비서
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            대화형 AI 비서를 통해 도서관의 모든 서비스를 자연어로 이용할 수
            있습니다. 좌석 예약부터 도서 추천까지, 하나의 챗봇으로 모든 것을
            해결하세요.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <h3 className="font-semibold text-indigo-800 mb-2">
                좌석 예약 시스템
              </h3>
              <p className="text-sm text-gray-600">
                실시간 좌석 현황 조회 및 예약
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <h3 className="font-semibold text-indigo-800 mb-2">
                도서 추천 시스템
              </h3>
              <p className="text-sm text-gray-600">AI 기반 맞춤형 도서 추천</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 2.1 좌석 예약 서비스 */}
          <section>
            <h2 className="text-3xl font-semibold mb-4 text-indigo-800">
              2.1 좌석 예약 서비스
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              챗봇과의 대화를 통해 실시간으로 열람실 좌석을 확인하고 원하는
              자리를 간편하게 예약하거나 연장할 수 있습니다.
            </p>

            {/* 좌석 예약 기능 상세 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">
                  🔍 실시간 조회
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 현재 이용 가능한 좌석</li>
                  <li>• 각 좌석별 이용 시간</li>
                  <li>• 선호도 기반 추천</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">
                  📅 예약 관리
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 자연어 기반 예약</li>
                  <li>• 예약 연장 및 취소</li>
                  <li>• 알림 및 리마인더</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
              <Image
                src="/---------------------.jpg"
                alt="좌석 예약 서비스 UI"
                width={800}
                height={600}
                className="w-full"
              />
            </div>
          </section>

          {/* 2.2 도서 추천 서비스 */}
          <section>
            <h2 className="text-3xl font-semibold mb-4 text-indigo-800">
              2.2 도서 추천 서비스
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              사용자의 관심사나 현재 읽고 있는 책을 기반으로 AI가 맞춤형 도서를
              추천해 줍니다. "이 책이랑 비슷한 주제 뭐 있어?"와 같은 자연어
              질문에도 응답합니다.
            </p>

            {/* 도서 추천 기능 상세 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">
                  🎯 맞춤 추천
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 개인 독서 이력 분석</li>
                  <li>• 관심사 기반 추천</li>
                  <li>• 유사 도서 검색</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">
                  💬 대화형 탐색
                </h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 자연어 질의 응답</li>
                  <li>• 도서 정보 상세 조회</li>
                  <li>• 독서 그룹 추천</li>
                </ul>
              </div>
            </div>

            <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
              <Image
                src="/ai---------------.jpg"
                alt="도서 추천 서비스 UI"
                width={800}
                height={600}
                className="w-full"
              />
            </div>
          </section>
        </div>

        {/* 통합 챗봇 인터페이스 */}
        <section className="mt-12">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-800">
            💬 통합 챗봇 인터페이스
          </h2>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-indigo-800 mb-3">
                  좌석 예약 대화 예시
                </h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">사용자:</p>
                    <p className="text-gray-800">
                      "내일 오후 2시에 3층 열람실 창가 자리 예약해줘"
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">AI:</p>
                    <p className="text-gray-800">
                      "3층 열람실에 창가 자리 2개가 이용 가능합니다. 2시간
                      예약으로 진행할까요?"
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-indigo-800 mb-3">
                  도서 추천 대화 예시
                </h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">사용자:</p>
                    <p className="text-gray-800">
                      "최근에 읽은 '사피엔스'랑 비슷한 책 추천해줘"
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">AI:</p>
                    <p className="text-gray-800">
                      "인류학과 역사에 관심이 있으시군요! '총, 균, 쇠'나
                      '21세기를 위한 21가지 제언'을 추천드려요."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 주요 기능 요약 */}
        <section className="mt-12 bg-indigo-50 rounded-lg p-6 border border-indigo-100">
          <h3 className="text-xl font-semibold mb-3 text-indigo-900">
            💡 주요 기능
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>실시간 좌석 현황 조회 및 예약</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>자연어 기반 좌석 관리</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>음성 명령 지원</span>
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>AI 기반 맞춤형 도서 추천</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>독서 이력 분석 및 추천</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>대화형 도서 탐색</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
