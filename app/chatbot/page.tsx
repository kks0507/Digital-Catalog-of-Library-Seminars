import Image from "next/image"
import { PresentationNav } from "@/components/presentation-nav"

export default function ChatbotPage() {
  return (
    <>
      <PresentationNav currentPage="chatbot" />

      <main className="container mx-auto p-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-indigo-900">2. 에이전트 챗봇</h1>
        <p className="text-xl text-gray-700 mb-10 leading-relaxed">
          대화형 AI 비서를 통해 도서관의 다양한 서비스를 간편하게 이용할 수 있습니다. 음성 및 텍스트 입력을 모두
          지원합니다.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 2.1 좌석 예약 서비스 */}
          <section>
            <h2 className="text-3xl font-semibold mb-4 text-indigo-800">2.1 좌석 예약 서비스</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              챗봇과의 대화를 통해 실시간으로 열람실 좌석을 확인하고 원하는 자리를 간편하게 예약하거나 연장할 수
              있습니다.
            </p>
            <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
              <Image
                src="/---------------------.jpg"
                alt="좌석 예약 서비스 UI"
                width={800}
                height={600}
                className="w-full"
              />
            </div>

            {/* 기능 상세 */}
            <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-blue-900 mb-2">주요 기능</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• 실시간 좌석 현황 조회</li>
                <li>• 자연어 기반 좌석 예약</li>
                <li>• 예약 연장 및 취소</li>
                <li>• 음성 명령 지원</li>
              </ul>
            </div>
          </section>

          {/* 2.2 도서 추천 서비스 */}
          <section>
            <h2 className="text-3xl font-semibold mb-4 text-indigo-800">2.2 도서 추천 서비스</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              사용자의 관심사나 현재 읽고 있는 책을 기반으로 AI가 맞춤형 도서를 추천해 줍니다. "이 책이랑 비슷한 주제 뭐
              있어?"와 같은 자연어 질문에도 응답합니다.
            </p>
            <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
              <Image
                src="/ai---------------.jpg"
                alt="도서 추천 서비스 UI"
                width={800}
                height={600}
                className="w-full"
              />
            </div>

            {/* 기능 상세 */}
            <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-100">
              <h4 className="font-semibold text-green-900 mb-2">주요 기능</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• 개인 맞춤형 도서 추천</li>
                <li>• 유사 도서 검색</li>
                <li>• 독서 이력 기반 추천</li>
                <li>• 대화형 도서 탐색</li>
              </ul>
            </div>
          </section>
        </div>

        {/* 챗봇 활용 예시 */}
        <section className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
          <h3 className="text-xl font-semibold mb-4 text-indigo-900">💬 챗봇 활용 예시</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">사용자:</p>
              <p className="text-gray-800">"내일 오후 2시에 3층 열람실 창가 자리 예약해줘"</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600 mb-1">사용자:</p>
              <p className="text-gray-800">"최근에 읽은 '사피엔스'랑 비슷한 책 추천해줘"</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
