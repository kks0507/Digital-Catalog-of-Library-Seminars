"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PresentationNavProps {
  currentPage: "assistant" | "chatbot" | "search"
}

const pageOrder = ["assistant", "chatbot", "search"] as const
const pageInfo = {
  assistant: { title: "AI 연구 어시스턴트", number: 1 },
  chatbot: { title: "에이전트 챗봇", number: 2 },
  search: { title: "AI 시맨틱 검색", number: 3 },
}

export function PresentationNav({ currentPage }: PresentationNavProps) {
  const router = useRouter()
  const currentIndex = pageOrder.indexOf(currentPage)
  const prevPage = currentIndex > 0 ? pageOrder[currentIndex - 1] : null
  const nextPage = currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null

  // 키보드 단축키 지원
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && prevPage) {
        router.push(`/${prevPage}`)
      } else if (e.key === "ArrowRight" && nextPage) {
        router.push(`/${nextPage}`)
      } else if (e.key === "Home" || (e.key === "h" && e.ctrlKey)) {
        e.preventDefault()
        router.push("/")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevPage, nextPage, router])

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 왼쪽: 홈 버튼 */}
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">홈으로</span>
            </Button>
          </Link>

          {/* 중앙: 현재 페이지 정보 */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">
              {pageInfo[currentPage].number} / {pageOrder.length}
            </span>
            <span className="hidden md:inline text-lg font-semibold text-gray-900">{pageInfo[currentPage].title}</span>
          </div>

          {/* 오른쪽: 이전/다음 버튼 */}
          <div className="flex items-center gap-2">
            {prevPage ? (
              <Link href={`/${prevPage}`}>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">이전</span>
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="sm" disabled className="gap-2 bg-transparent">
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">이전</span>
              </Button>
            )}

            {nextPage ? (
              <Link href={`/${nextPage}`}>
                <Button variant="default" size="sm" className="gap-2">
                  <span className="hidden sm:inline">다음</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Button variant="default" size="sm" disabled className="gap-2">
                <span className="hidden sm:inline">다음</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* 키보드 단축키 힌트 */}
        <div className="mt-2 text-xs text-gray-500 text-center hidden lg:block">
          단축키: ← 이전 | → 다음 | Ctrl+H 홈으로
        </div>
      </div>
    </nav>
  )
}
