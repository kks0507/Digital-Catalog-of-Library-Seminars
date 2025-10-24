import Image from "next/image"
import { PresentationNav } from "@/components/presentation-nav"

export default function AssistantPage() {
  return (
    <>
      <PresentationNav currentPage="assistant" />

      <main className="container mx-auto p-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-indigo-900">1. AI 연구 어시스턴트</h1>

        {/* 1.1 PDF to Video */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-800">1.1 읽는 논문 → 보는 논문</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            PDF 논문 파일을 업로드하면 AI가 핵심 내용을 분석하고 요약하여 이해하기 쉬운 영상 콘텐츠로 자동 변환합니다.
          </p>
          <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
            <Image src="/pdf---------------ui------.jpg" alt="PDF Parser UI" width={1200} height={600} className="w-full" />
          </div>
        </section>

        {/* 1.2 연구자 프로필 관리 */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-800">1.2 연구자 프로필 생성 및 관리</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            연구 실적이 정리된 PDF 파일(KRI, Scopus 이력 등)을 업로드하여 간편하게 연구자 프로필을 생성하고 관리할 수
            있습니다.
          </p>
          <div className="border rounded-lg shadow-lg overflow-hidden bg-white">
            <Image
              src="/----------------ui.jpg"
              alt="연구자 프로필 관리 UI"
              width={1200}
              height={600}
              className="w-full"
            />
          </div>
        </section>

        {/* 주요 기능 요약 */}
        <section className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
          <h3 className="text-xl font-semibold mb-3 text-indigo-900">💡 주요 기능</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>PDF 논문 자동 분석 및 요약</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>핵심 내용을 영상 콘텐츠로 변환</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>연구자 프로필 자동 생성 및 관리</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>연구 실적 통합 관리 (KRI, Scopus 등)</span>
            </li>
          </ul>
        </section>
      </main>
    </>
  )
}
