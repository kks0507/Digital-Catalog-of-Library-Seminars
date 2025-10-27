"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Send, Armchair, Loader2 } from "lucide-react";
import Link from "next/link";

// 메시지 타입 정의
interface Message {
  id: string;
  type: "user" | "bot" | "loading";
  content: string;
  timestamp: Date;
  serviceType?: "seat" | "book";
  // 좌석 예약 관련
  recommendedSeats?: Seat[];
  selectedSeat?: Seat;
  // 도서 추천 관련
  recommendedBooks?: Book[];
  selectedBook?: Book;
  // 확인 버튼
  showConfirmButtons?: boolean;
  confirmAction?: string; // "seat" | "book"
}

interface Seat {
  id: string;
  name: string;
  location: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  publication: string;
}

// 샘플 데이터
const sampleSeats: Seat[] = [
  { id: "S233", name: "좌석 233", location: "제1열람실-3" },
  { id: "S234", name: "좌석 234", location: "제1열람실-3" },
  { id: "S101", name: "좌석 101", location: "제2열람실-1" },
  { id: "S102", name: "좌석 102", location: "제2열람실-1" },
];

const sampleBooks: Book[] = [
  {
    id: "B1",
    title: "혼자 공부하는 파이썬",
    author: "윤인성",
    coverImage: "/images/book-python.jpg",
    description: "프로그래밍이 처음인 입문자를 위한 파이썬 책입니다.",
    publication: "한빛미디어, 2022",
  },
  {
    id: "B2",
    title: "Do it! 점프 투 파이썬",
    author: "박응용",
    coverImage: "/images/book-jump-to-python.jpg",
    description: "파이썬의 기초부터 실용적인 내용까지 폭넓게 다룹니다.",
    publication: "이지스퍼블리싱, 2023",
  },
  {
    id: "B3",
    title: "Clean Code",
    author: "로버트 C. 마틴",
    coverImage: "/images/book-clean-code.jpg",
    description: "더 나은 코드 작성을 위한 원칙과 기법들을 소개합니다.",
    publication: "인사이트, 2013",
  },
];

// 자동완성 메시지
const quickMessages = [
  "열람실 좌석을 예약하고 싶어요",
  "프로그래밍 관련 책을 추천해주세요",
  "파이썬 공부할 수 있는 책 있나요?",
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 메시지가 추가될 때마다 스크롤을 맨 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuickMessage = (message: string) => {
    // 입력창에 메시지를 설정하고 바로 전송
    setInputValue(message);

    // 메시지 전송
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue(""); // 입력창 비우기

    // 로딩 메시지 추가
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "loading",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, loadingMessage]);

    // 메시지 타입 감지
    setTimeout(() => {
      // 로딩 메시지 제거
      setMessages((prev) => prev.filter((msg) => msg.type !== "loading"));

      let botResponse: Message;

      if (
        message.includes("좌석") ||
        message.includes("예약") ||
        message.includes("열람실")
      ) {
        // 좌석 예약 서비스
        botResponse = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          content: `이용 가능한 좌석 목록입니다. 원하시는 좌석을 선택해주세요.`,
          timestamp: new Date(),
          serviceType: "seat",
          recommendedSeats: sampleSeats,
        };
      } else if (
        message.includes("책") ||
        message.includes("도서") ||
        message.includes("추천") ||
        message.includes("파이썬") ||
        message.includes("프로그래밍")
      ) {
        // 도서 추천 서비스
        botResponse = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          content: `요청에 적합한 도서 목록입니다. 관심 있는 책을 선택하여 대출 가능한 자료를 확인해보세요.`,
          timestamp: new Date(),
          serviceType: "book",
          recommendedBooks: sampleBooks,
        };
      } else {
        // 기본 응답
        botResponse = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          content:
            "좌석 예약이나 도서 추천 관련 질문을 해주시면 도와드리겠습니다.\n\n예시:\n• '좌석 예약하고 싶어'\n• '코딩 공부하는 책 추천해줘'",
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // 로딩 메시지 추가
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "loading",
      content: "",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, loadingMessage]);

    // 메시지 타입 감지
    setTimeout(() => {
      // 로딩 메시지 제거
      setMessages((prev) => prev.filter((msg) => msg.type !== "loading"));

      let botResponse: Message;

      if (
        inputValue.includes("좌석") ||
        inputValue.includes("예약") ||
        inputValue.includes("열람실")
      ) {
        // 좌석 예약 서비스
        botResponse = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          content: `이용자님의 선호 좌석 ${sampleSeats.length}개 중 현재 이용 가능한 좌석은 ${sampleSeats.length}개입니다.\n원하시는 좌석을 선택해주세요.`,
          timestamp: new Date(),
          serviceType: "seat",
          recommendedSeats: sampleSeats,
        };
      } else if (
        inputValue.includes("책") ||
        inputValue.includes("도서") ||
        inputValue.includes("추천") ||
        inputValue.includes("코딩") ||
        inputValue.includes("프로그래밍")
      ) {
        // 도서 추천 서비스
        botResponse = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          content: `요청에 적합한 도서 목록입니다. 관심 있는 책을 선택하여 대출 가능한 자료를 확인해보세요.`,
          timestamp: new Date(),
          serviceType: "book",
          recommendedBooks: sampleBooks,
        };
      } else {
        // 기본 응답
        botResponse = {
          id: (Date.now() + 2).toString(),
          type: "bot",
          content:
            "좌석 예약이나 도서 추천 관련 질문을 해주시면 도와드리겠습니다.\n\n예시:\n• '좌석 예약하고 싶어'\n• '코딩 공부하는 책 추천해줘'",
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 1500);

    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSeatSelect = (seat: Seat) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `${seat.location}의 ${seat.name} 선택`,
      timestamp: new Date(),
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: `선택하신 **${seat.location}의 ${seat.name}**을(를) 예약하시겠습니까?`,
      timestamp: new Date(),
      selectedSeat: seat,
      showConfirmButtons: true,
      confirmAction: "seat",
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const handleBookSelect = (book: Book) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: `'${book.title}' 선택`,
      timestamp: new Date(),
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: `**'${book.title}'**에 대한 상세 정보입니다.\n\n• **저자:** ${book.author}\n• **출판:** ${book.publication}\n• **설명:** ${book.description}\n\n북 사이렌오더를 신청하시겠습니까?`,
      timestamp: new Date(),
      selectedBook: book,
      showConfirmButtons: true,
      confirmAction: "book",
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  const handleConfirm = (
    messageId: string,
    action: string,
    confirmed: boolean
  ) => {
    // 확인 버튼을 숨기기 위해 메시지 업데이트
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, showConfirmButtons: false } : msg
      )
    );

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: confirmed ? "예" : "아니오",
      timestamp: new Date(),
    };

    let botMessage: Message;

    if (confirmed) {
      if (action === "seat") {
        const seat = messages.find((m) => m.id === messageId)?.selectedSeat;
        botMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: `좌석이 예약되었습니다.\n\n• **예약 ID:** ${
            Math.floor(Math.random() * 9000000) + 1000000
          }\n• **좌석 위치:** ${seat?.location}, ${
            seat?.name
          }\n• **시작 시간:** ${new Date().toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}\n• **종료 시간:** ${new Date(
            Date.now() + 3 * 60 * 60 * 1000
          ).toLocaleString("ko-KR", { hour: "2-digit", minute: "2-digit" })}`,
          timestamp: new Date(),
        };
      } else {
        const book = messages.find((m) => m.id === messageId)?.selectedBook;
        botMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: `북 사이렌오더가 신청되었습니다.\n\n**'${book?.title}'**을(를) 북 사이렌오더로 신청하셨습니다. 도서가 준비되면 알림을 보내드리겠습니다.`,
          timestamp: new Date(),
        };
      }
    } else {
      botMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: "취소되었습니다. 다른 도움이 필요하시면 말씀해주세요!",
        timestamp: new Date(),
      };
    }

    setMessages((prev) => [...prev, userMessage, botMessage]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
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
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white whitespace-nowrap">
                통합 AI 챗봇
              </button>
              <Link
                href="/search"
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                AI 시멘틱 검색
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 챗봇 인터페이스 */}
      <div className="flex h-[calc(100vh-73px)] flex-col">
        {/* 챗봇 헤더 */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="mx-auto flex max-w-4xl items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                통합 AI 챗봇 (Ragso)
              </h2>
              <p className="text-sm text-muted-foreground">
                좌석 예약 & 도서 추천 서비스
              </p>
            </div>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="mx-auto max-w-4xl space-y-6">
            {messages.length === 0 && (
              <div className="mb-8 text-center">
                <p className="text-base text-muted-foreground">
                  안녕하세요, 궁금한 내용이 있으신가요?
                  <br />
                  챗봇(Ragso)가 필요한 정보를 찾아 드릴게요!
                </p>
              </div>
            )}

            {messages.map((message) => {
              if (message.type === "loading") {
                return (
                  <div key={message.id} className="flex items-start gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      AI
                    </div>
                    <div className="max-w-xl rounded-lg border bg-card px-4 py-3">
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    </div>
                  </div>
                );
              }

              const isUser = message.type === "user";

              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-4 ${
                    isUser ? "justify-end" : ""
                  }`}
                >
                  {!isUser && (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                      AI
                    </div>
                  )}
                  <div
                    className={`max-w-xl rounded-lg px-4 py-3 ${
                      isUser
                        ? "bg-blue-600 text-white"
                        : "border bg-card text-card-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">
                      {message.content.split("**").map((part, index) =>
                        index % 2 === 1 ? (
                          <strong key={index} className="font-semibold">
                            {part}
                          </strong>
                        ) : (
                          <span key={index}>{part}</span>
                        )
                      )}
                    </p>

                    {/* 확인 버튼 (예/아니오) */}
                    {message.showConfirmButtons && message.confirmAction && (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() =>
                            handleConfirm(
                              message.id,
                              message.confirmAction!,
                              true
                            )
                          }
                          className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
                        >
                          예
                        </button>
                        <button
                          onClick={() =>
                            handleConfirm(
                              message.id,
                              message.confirmAction!,
                              false
                            )
                          }
                          className="flex-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors font-medium"
                        >
                          아니오
                        </button>
                      </div>
                    )}

                    {/* 좌석 추천 */}
                    {message.recommendedSeats && (
                      <div className="mt-4 space-y-3">
                        {message.recommendedSeats.map((seat) => (
                          <div
                            key={seat.id}
                            onClick={() => handleSeatSelect(seat)}
                            className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all hover:border-blue-600 hover:shadow-md"
                          >
                            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                              <Armchair className="h-8 w-8" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-blue-600">
                                이용 가능
                              </span>
                              <h3 className="mt-1 text-lg font-bold text-foreground">
                                {seat.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {seat.location}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 도서 추천 */}
                    {message.recommendedBooks && (
                      <div className="mt-4 space-y-3">
                        {message.recommendedBooks.map((book) => (
                          <div
                            key={book.id}
                            onClick={() => handleBookSelect(book)}
                            className="flex cursor-pointer gap-4 rounded-lg border p-4 transition-all hover:border-blue-600 hover:shadow-md"
                          >
                            <img
                              src={book.coverImage || "/placeholder.svg"}
                              alt={book.title}
                              className="h-32 w-24 rounded-md object-cover"
                            />
                            <div className="flex flex-col">
                              <h3 className="text-lg font-bold text-foreground">
                                {book.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {book.author}
                              </p>
                              <p className="mt-auto text-xs text-muted-foreground">
                                {book.publication}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {/* 스크롤 타겟 */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 입력 영역 */}
        <div className="border-t border-border bg-card px-6 py-4">
          <div className="mx-auto max-w-4xl">
            {/* 자동완성 메시지 버튼 - 항상 표시 */}
            <div className="flex flex-wrap gap-2 mb-3">
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(msg)}
                  className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-sm border border-blue-200 cursor-pointer"
                >
                  {msg}
                </button>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex items-end gap-3">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="메시지를 입력하세요..."
                className="min-h-[56px] max-h-[200px] resize-none rounded-xl border-input bg-background px-4 py-3.5 text-[15px] leading-relaxed focus-visible:ring-blue-600"
                rows={1}
              />
              <Button
                type="submit"
                size="icon"
                className="h-[56px] w-[56px] shrink-0 rounded-xl bg-blue-600 hover:bg-blue-700"
                disabled={!inputValue.trim()}
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">전송</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
