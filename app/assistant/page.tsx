"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Upload,
  User,
  Search,
  FileText,
  Download,
  CheckCircle,
  Clock,
  Video,
  Play,
  RotateCcw,
  Loader2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

type VideoStep =
  | "UPLOAD"
  | "PARSING"
  | "PARSED"
  | "SCRIPTING"
  | "GENERATING"
  | "DONE";

export default function AssistantPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [profileGenerated, setProfileGenerated] = useState(false);
  const [profileProgress, setProfileProgress] = useState(0);

  // PDF to Video 상태
  const [videoStep, setVideoStep] = useState<VideoStep>("UPLOAD");
  const [videoFileName, setVideoFileName] = useState<string | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);

  // 검색 상태
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setProfileGenerated(false);
      setProfileProgress(0);

      // 시뮬레이션: 프로필 생성 진행률
      const progressInterval = setInterval(() => {
        setProfileProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setProfileGenerated(true);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  // PDF to Video 핸들러들
  const handleVideoFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFileName(file.name);
      setVideoStep("PARSING");
      setVideoProgress(0);

      // 시뮬레이션: 파싱 진행
      const interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setVideoStep("PARSED");
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleGenerateScript = () => {
    setVideoStep("SCRIPTING");
    setTimeout(() => {
      setVideoStep("GENERATING");
      setVideoProgress(0);

      // 시뮬레이션: 영상 생성
      const interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setVideoStep("DONE");
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }, 2000);
  };

  const handleVideoStartOver = () => {
    setVideoStep("UPLOAD");
    setVideoFileName(null);
    setVideoProgress(0);
  };

  // 검색 핸들러
  const handleSearch = (type: "internal" | "external") => {
    setIsSearching(true);
    setSearchPerformed(false);

    // 시뮬레이션: 검색 진행
    setTimeout(() => {
      setIsSearching(false);
      setSearchPerformed(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* 사이드바 */}
        <div className="w-80 bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              Researcher Platform
            </h1>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 p-4 rounded-lg text-left transition-colors ${
                  activeTab === "profile"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <User className="h-5 w-5" />
                <span className="font-medium">1. 연구자 프로필 관리</span>
              </button>

              <button
                onClick={() => setActiveTab("search")}
                className={`w-full flex items-center gap-3 p-4 rounded-lg text-left transition-colors ${
                  activeTab === "search"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Search className="h-5 w-5" />
                <span className="font-medium">2. 연구 협업 검색</span>
              </button>

              <button
                onClick={() => setActiveTab("video")}
                className={`w-full flex items-center gap-3 p-4 rounded-lg text-left transition-colors ${
                  activeTab === "video"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Video className="h-5 w-5" />
                <span className="font-medium">3. PDF to Video 영상화</span>
              </button>
            </nav>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 p-8">
          {activeTab === "profile" && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                1. 연구자 프로필 생성 및 관리
              </h2>

              <div className="space-y-8">
                {/* 1.1 연구 이력 업로드 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      1.1. 연구 이력 업로드
                    </CardTitle>
                    <CardDescription>
                      연구 실적이 정리된 PDF 파일(KRI, Scopus 이력 등)을
                      업로드하세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
                      <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        PDF 파일을 드래그하거나 클릭하여 선택
                      </p>
                      <p className="text-sm text-gray-500">
                        연구 이력이 포함된 PDF 파일을 업로드하세요
                      </p>
                      <div className="mt-4">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Button variant="outline" asChild>
                            <span>
                              <Upload className="h-4 w-4 mr-2" />
                              파일 선택
                            </span>
                          </Button>
                        </label>
                      </div>
                    </div>

                    {uploadedFile && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-800">
                            {uploadedFile.name} 업로드 완료
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 1.2 프로필 생성 - 파일 업로드 후에만 표시 */}
                {uploadedFile && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        1.2. AI 프로필 생성
                      </CardTitle>
                      <CardDescription>
                        업로드된 연구 이력을 바탕으로 AI가 자동으로 연구자
                        프로필을 생성합니다.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-gray-700">
                            프로필 생성 진행률
                          </span>
                          <span className="text-sm text-gray-500">
                            {profileProgress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${profileProgress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {profileGenerated ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-green-600">
                                프로필 생성 완료
                              </span>
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span className="text-sm text-blue-600">
                                AI가 프로필을 생성하고 있습니다...
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 1.3 프로필 관리 - 프로필 생성 완료 후에만 표시 */}
                {profileGenerated && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        1.3. 프로필 관리
                      </CardTitle>
                      <CardDescription>
                        생성된 프로필을 확인하고 수정할 수 있습니다.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {profileGenerated ? (
                          <div className="space-y-6">
                            {/* 1.1.1. 학문적 지향 (추출 결과) */}
                            <div className="bg-blue-50 rounded-lg p-6">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-blue-900">
                                  1.1.1. 학문적 지향 (추출 결과)
                                </h3>
                                <Button variant="outline" size="sm">
                                  프로필 수정
                                </Button>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-blue-800 mb-2">
                                    핵심 주제 흐름:
                                  </h4>
                                  <p className="text-blue-700">
                                    LLM, 인지 심리, 인간-컴퓨터 상호작용(HCI)
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-medium text-blue-800 mb-2">
                                    방법론적 선호도:
                                  </h4>
                                  <p className="text-blue-700">
                                    실험 설계, 통계 분석, fMRI 데이터 분석
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-medium text-blue-800 mb-2">
                                    이론적 기반:
                                  </h4>
                                  <p className="text-blue-700">
                                    인지주의 심리학, 구성주의 학습이론
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-medium text-blue-800 mb-2">
                                    공동 연구 네트워크:
                                  </h4>
                                  <p className="text-blue-700">
                                    김철수 (서울대), 이영희 (KAIST), John Doe
                                    (MIT)
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* 1.1.2. 연구 실적 대시보드 */}
                            <div className="bg-green-50 rounded-lg p-6">
                              <h3 className="text-lg font-semibold text-green-900 mb-4">
                                1.1.2. 연구 실적 대시보드
                              </h3>
                              <p className="text-sm text-green-700 mb-4">
                                무엇을(리스트), 얼마나(양), 얼마나 잘(질), 어떤
                                역할로(주도성), 어떻게(연구비) 연구했는지
                                요약합니다.
                              </p>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-white rounded-lg p-4 text-center">
                                  <div className="text-2xl font-bold text-green-600">
                                    28편
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    총 논문 (얼마나)
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                  <div className="text-2xl font-bold text-green-600">
                                    6편
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Top 10% (Q1) (얼마나 잘)
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                  <div className="text-2xl font-bold text-green-600">
                                    75%
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    주저자 비율 (주도성)
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                  <div className="text-2xl font-bold text-green-600">
                                    5억 2천만원
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    총 연구비 (어떻게)
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white rounded-lg p-4">
                                <h4 className="font-semibold text-green-800 mb-3">
                                  상세 연구 실적 (무엇을)
                                </h4>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b">
                                        <th className="text-left py-2">
                                          논문 제목
                                        </th>
                                        <th className="text-left py-2">역할</th>
                                        <th className="text-left py-2">
                                          질(Quality)
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="border-b">
                                        <td className="py-2">
                                          LLM의 환각 현상에 대한 인지적 분석
                                        </td>
                                        <td className="py-2">주저자</td>
                                        <td className="py-2">Q1</td>
                                      </tr>
                                      <tr className="border-b">
                                        <td className="py-2">
                                          인간 언어와 기계 언어의 구조적 비교
                                        </td>
                                        <td className="py-2">공동저자</td>
                                        <td className="py-2">Q2</td>
                                      </tr>
                                      <tr>
                                        <td className="py-2">
                                          fMRI를 통한 언어 처리 중추 연구
                                        </td>
                                        <td className="py-2">주저자</td>
                                        <td className="py-2">Q1</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            {/* 1.1.3. 최종 메타데이터 */}
                            <div className="bg-purple-50 rounded-lg p-6">
                              <h3 className="text-lg font-semibold text-purple-900 mb-4">
                                1.1.3. 최종 메타데이터 (Key-Value)
                              </h3>
                              <p className="text-sm text-purple-700 mb-4">
                                이 데이터는 1.2 협업 검색 시스템의 검색 인덱스로
                                활용됩니다.
                              </p>

                              <div className="bg-gray-900 rounded-lg p-4 text-green-400 text-sm font-mono">
                                <pre>{`{
  "id": "researcher-001",
  "keywords": [
    "LLM",
    "인지 심리",
    "HCI",
    "언어 구조",
    "fMRI",
    "실험 설계"
  ],
  "methodologies": [
    "experimental_design",
    "statistical_analysis",
    "neuroimaging"
  ],
  "network_ids": [
    "researcher-002",
    "researcher-005",
    "external-003"
  ],
  "collaboration_interest": [
    "human-machine_comparison",
    "LLM_psychology"
  ],
  "institution": "internal"
}`}</pre>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <User className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                            <p>아직 생성된 프로필이 없습니다.</p>
                            <p className="text-sm">
                              PDF 파일을 업로드하여 프로필을 생성하세요.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {activeTab === "search" && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                1.2. 연구 협업 검색 시스템
              </h2>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      협업 희망 연구 주제 (자연어)
                    </CardTitle>
                    <CardDescription>
                      수행하고자 하는 연구 내용을 자유롭게 기술하세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <textarea
                        className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="수행하고자 하는 연구 내용을 자유롭게 기술하세요..."
                        defaultValue="나는 언어모델 (LLM) 이 심리를 가지고 있는지, 인간 언어의 구조를 정확하게 이해하는지, 확률에 의해 제시하는지, 사람과 기계를 비교했을 때 누가 언어 능력이 더 뛰어난지 비교하는 연구를 진행하고 싶어"
                      />

                      <div className="flex gap-4">
                        <Button
                          onClick={() => handleSearch("internal")}
                          disabled={isSearching}
                          className="bg-blue-600 hover:bg-blue-700 flex-1 disabled:opacity-50"
                        >
                          {isSearching ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              검색 중...
                            </>
                          ) : (
                            <>
                              <Search className="h-4 w-4 mr-2" />
                              교내 협력 연구자 서칭
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => handleSearch("external")}
                          disabled={isSearching}
                          variant="outline"
                          className="flex-1 disabled:opacity-50"
                        >
                          {isSearching ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              검색 중...
                            </>
                          ) : (
                            <>
                              <Search className="h-4 w-4 mr-2" />
                              교외 협력 연구자 서칭
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 검색 중 로딩 섹션 */}
                {isSearching && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                        <div>
                          <h3 className="text-lg font-semibold text-blue-800">
                            연구자 검색 중...
                          </h3>
                          <p className="text-gray-600">
                            관련 연구자를 찾고 있습니다. 잠시만 기다려주세요.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 검색 결과 섹션 - 검색 후에만 표시 */}
                {searchPerformed && !isSearching && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">검색 결과</CardTitle>
                      <CardDescription>
                        총 5명의 추천 연구자를 찾았습니다.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* 박지현 교수 */}
                        <div className="p-6 border rounded-lg bg-white">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">
                                박지현 교수
                              </h3>
                              <p className="text-gray-600">
                                (한국대학교 심리학과 (교내))
                              </p>
                            </div>
                            <a
                              href="mailto:jhpark@korea.ac.kr"
                              className="text-blue-600 hover:underline"
                            >
                              jhpark@korea.ac.kr
                            </a>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              인지 심리
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              언어 발달
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              인간-기계 비교
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              실험 설계
                            </span>
                          </div>

                          <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                            <p className="font-semibold text-blue-800 mb-2">
                              추천 이유:
                            </p>
                            <p className="text-gray-800 text-sm">
                              박지현 교수는 '인지 심리' 및 '인간-기계 비교' 연구
                              분야의 교내 최고 전문가입니다. 특히 '인간 언어의
                              구조'에 대한 깊은 이해를 바탕으로, LLM의 심리적
                              기저를 탐구하려는 연구자님의 목표에 핵심적인
                              통찰을 제공할 수 있습니다. 박 교수님의 '실험 설계'
                              전문성은 연구자님의 방법론을 보완하여 강력한
                              시너지를 낼 것입니다.
                            </p>
                          </div>
                        </div>

                        {/* 김태영 교수 */}
                        <div className="p-6 border rounded-lg bg-white">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">
                                김태영 교수
                              </h3>
                              <p className="text-gray-600">
                                (한국대학교 컴퓨터공학과 (교내))
                              </p>
                            </div>
                            <a
                              href="mailto:tykim@korea.ac.kr"
                              className="text-blue-600 hover:underline"
                            >
                              tykim@korea.ac.kr
                            </a>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              자연어처리
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              딥러닝
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              언어모델
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              의미론
                            </span>
                          </div>

                          <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
                            <p className="font-semibold text-green-800 mb-2">
                              추천 이유:
                            </p>
                            <p className="text-gray-800 text-sm">
                              김태영 교수는 자연어처리와 언어모델 분야의 교내
                              선도 연구자로, LLM의 기술적 메커니즘에 대한 깊은
                              이해를 보유하고 있습니다. 연구자님의 심리학적
                              관점과 김 교수님의 공학적 접근이 결합되면, 'LLM이
                              언어를 정확하게 이해하는지'에 대한 학제간 연구가
                              가능합니다.
                            </p>
                          </div>
                        </div>

                        {/* 이수진 교수 */}
                        <div className="p-6 border rounded-lg bg-white">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">
                                이수진 교수
                              </h3>
                              <p className="text-gray-600">
                                (한국대학교 언어학과 (교내))
                              </p>
                            </div>
                            <a
                              href="mailto:sjlee@korea.ac.kr"
                              className="text-blue-600 hover:underline"
                            >
                              sjlee@korea.ac.kr
                            </a>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                              언어 구조
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                              통사론
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                              의미론
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                              언어 습득
                            </span>
                          </div>

                          <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r-lg">
                            <p className="font-semibold text-purple-800 mb-2">
                              추천 이유:
                            </p>
                            <p className="text-gray-800 text-sm">
                              이수진 교수는 '인간 언어의 구조'에 대한 언어학적
                              전문성을 갖춘 교내 연구자입니다. 언어의 형식적
                              구조와 의미 체계에 대한 깊은 이해를 바탕으로,
                              LLM과 인간의 언어 능력을 비교하는 연구에 이론적
                              기반을 제공할 수 있습니다.
                            </p>
                          </div>
                        </div>

                        {/* 정민호 교수 */}
                        <div className="p-6 border rounded-lg bg-white">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">
                                정민호 교수
                              </h3>
                              <p className="text-gray-600">
                                (한국대학교 뇌과학과 (교내))
                              </p>
                            </div>
                            <a
                              href="mailto:mhjung@korea.ac.kr"
                              className="text-blue-600 hover:underline"
                            >
                              mhjung@korea.ac.kr
                            </a>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                              신경과학
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                              fMRI
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                              언어 처리
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                              인지 신경과학
                            </span>
                          </div>

                          <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded-r-lg">
                            <p className="font-semibold text-orange-800 mb-2">
                              추천 이유:
                            </p>
                            <p className="text-gray-800 text-sm">
                              정민호 교수는 fMRI를 활용한 언어 처리 연구의 교내
                              전문가입니다. 인간의 뇌가 언어를 처리하는 신경학적
                              메커니즘에 대한 연구 경험을 바탕으로, LLM과 인간
                              뇌의 언어 처리 방식을 비교하는 신경과학적 관점을
                              제공할 수 있습니다.
                            </p>
                          </div>
                        </div>

                        {/* 최은영 교수 */}
                        <div className="p-6 border rounded-lg bg-white">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900">
                                최은영 교수
                              </h3>
                              <p className="text-gray-600">
                                (한국대학교 철학과 (교내))
                              </p>
                            </div>
                            <a
                              href="mailto:eychoi@korea.ac.kr"
                              className="text-blue-600 hover:underline"
                            >
                              eychoi@korea.ac.kr
                            </a>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                              심리철학
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                              의식
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                              인공지능 윤리
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                              마음의 철학
                            </span>
                          </div>

                          <div className="border-l-4 border-pink-500 pl-4 py-2 bg-pink-50 rounded-r-lg">
                            <p className="font-semibold text-pink-800 mb-2">
                              추천 이유:
                            </p>
                            <p className="text-gray-800 text-sm">
                              최은영 교수는 '심리철학'과 'AI 의식' 문제를
                              연구하는 교내 철학자입니다. 'LLM이 심리를 가지고
                              있는지'에 대한 철학적 질문에 대해 깊이 있는 이론적
                              논의를 제공할 수 있으며, 연구의 개념적 틀을
                              정교화하는 데 기여할 수 있습니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {activeTab === "video" && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                3. PDF to Video 영상화
              </h2>

              <div className="space-y-8">
                {/* PDF 업로드 */}
                {videoStep === "UPLOAD" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">PDF 논문 업로드</CardTitle>
                      <CardDescription>
                        논문 PDF 파일을 업로드하면 AI가 핵심 내용을 분석하고
                        영상으로 변환합니다.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors">
                        <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          PDF 파일을 드래그하거나 클릭하여 선택
                        </p>
                        <p className="text-sm text-gray-500">
                          논문 PDF 파일을 업로드하세요
                        </p>
                        <div className="mt-4">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleVideoFileUpload}
                            className="hidden"
                            id="video-file-upload"
                          />
                          <label
                            htmlFor="video-file-upload"
                            className="cursor-pointer"
                          >
                            <Button variant="outline" asChild>
                              <span>
                                <Upload className="h-4 w-4 mr-2" />
                                파일 선택
                              </span>
                            </Button>
                          </label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* PDF 파싱 중 */}
                {videoStep === "PARSING" && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
                        <div>
                          <h3 className="text-lg font-semibold text-indigo-800">
                            PDF 파싱 중...
                          </h3>
                          <p className="text-gray-600">
                            {videoFileName} 파일의 텍스트, 테이블, 이미지를
                            분석합니다
                          </p>
                        </div>
                        <div className="w-full">
                          <Progress value={videoProgress} className="h-2" />
                          <p className="text-sm text-gray-500 mt-2">
                            {videoProgress}% 완료
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 파싱 완료 */}
                {videoStep === "PARSED" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">파싱된 내용</CardTitle>
                      <CardDescription>
                        PDF에서 추출된 내용을 확인하고 영상 스크립트를
                        생성하세요.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">
                              📄 추출된 섹션
                            </h4>
                            <div className="space-y-2">
                              <Badge variant="outline">Abstract</Badge>
                              <Badge variant="outline">Introduction</Badge>
                              <Badge variant="outline">Methodology</Badge>
                              <Badge variant="outline">Results</Badge>
                              <Badge variant="outline">Conclusion</Badge>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">
                              📊 테이블 (1개)
                            </h4>
                            <div className="text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span>실험 결과 비교</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">
                              🖼️ 이미지 (1개)
                            </h4>
                            <div className="text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span>시스템 아키텍처</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">
                            📝 Abstract 미리보기
                          </h4>
                          <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                            본 연구는 AI 기반 학술 검색 시스템의 성능 향상을
                            위한 새로운 접근법을 제시합니다. 기존 키워드 기반
                            검색의 한계를 극복하고 의미 기반 검색을 통해 사용자
                            만족도를 크게 향상시켰습니다.
                          </div>
                        </div>
                      </div>
                      <Button onClick={handleGenerateScript} className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        영상 스크립트 생성하기
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* 스크립트 생성 중 */}
                {videoStep === "SCRIPTING" && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
                        <div>
                          <h3 className="text-lg font-semibold text-indigo-800">
                            스크립트 생성 중...
                          </h3>
                          <p className="text-gray-600">
                            AI가 논문 내용을 90초 영상용 스크립트로 변환하고
                            있습니다
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 영상 생성 중 */}
                {videoStep === "GENERATING" && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
                        <div>
                          <h3 className="text-lg font-semibold text-indigo-800">
                            영상 생성 중...
                          </h3>
                          <p className="text-gray-600">
                            스크립트를 바탕으로 영상 콘텐츠를 제작하고 있습니다
                          </p>
                        </div>
                        <div className="w-full">
                          <Progress value={videoProgress} className="h-2" />
                          <p className="text-sm text-gray-500 mt-2">
                            {videoProgress}% 완료
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 영상 생성 완료 */}
                {videoStep === "DONE" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        영상 생성 완료!
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gray-100 rounded-lg p-8 text-center">
                        <Video className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          논문 영상이 생성되었습니다
                        </h3>
                        <p className="text-gray-600 mb-4">
                          90초 분량의 연구 논문 소개 영상
                        </p>
                        <div className="flex gap-2 justify-center">
                          <Button>
                            <Download className="h-4 w-4 mr-2" />
                            영상 다운로드
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleVideoStartOver}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            새로 시작
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next 버튼 */}
      <div className="fixed bottom-8 right-8">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg">
          Next →
        </Button>
      </div>
    </div>
  );
}
