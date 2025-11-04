"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Info,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

type VideoStep =
  | "UPLOAD"
  | "PARSING"
  | "PARSED"
  | "SCRIPTING"
  | "GENERATING"
  | "DONE";

// Mock data for parsed sections
const mockParsedText = {
  abstract: "This is the abstract text. It summarizes the entire paper...",
  introduction:
    "The introduction section lays out the background and the problem statement...",
  literatureReview:
    "Prior research in this field has focused on... However, gaps remain...",
  methodology:
    "We employed a quantitative approach, analyzing data from 500 participants...",
  results:
    "Our findings indicate a significant correlation (p < .05) between X and Y...",
  discussion:
    "The results suggest that... This contrasts with previous findings...",
  conclusion: "In conclusion, this study provides new insights into...",
};

// Mock data for parsed table (JSON format)
const mockParsedTableJson = {
  id: "T2",
  caption: "Reliability analysis on the survey questionnaire",
  headers: ["Construct", "Item number", "Cronbach's Alpha"],
  rows: [
    ["(1) creative thinking", "1,2,4,8,11,13,18,27", 0.96],
    ["(2) knowledge expansion", "3,6,9,10,12,14,28,29", 0.84],
  ],
  metrics: {
    cronbach_alpha_max: 0.96,
    alpha_over_0_95: true,
  },
  page: 5,
};

// Mock data for generated 90-second English script
const mockVideoScript = `# 1. Background and Necessity
(Based on Introduction) This research addresses the critical challenge of declining engagement in online learning environments. As digital education becomes mainstream, understanding the core drivers of student motivation is paramount.

# 2. Research Objective and Key Questions
(Based on Abstract/Introduction) The primary goal of this study is to investigate the impact of gamified elements on student engagement. The key question is: Does the introduction of badges and leaderboards significantly improve learning outcomes?

# 3. Key Concepts and Prior Research
(Based on Literature Review) The study builds on 'Self-Determination Theory,' which posits that autonomy and competence are key motivators. Prior research has shown mixed results, often failing to isolate specific gamified components.

# 4. Differentiation and Contribution
(Based on Discussion/Conclusion) Unlike previous work, this paper introduces a novel experimental design that separates 'badge' effects from 'leaderboard' effects. The key contribution is a clear framework for educators on which elements to apply.

# 5. Methodology and Key Findings
(Based on Methodology/Results) Using a randomized controlled trial with 500 students, the study found significant results. Notably, reliability analysis (from Table 2) showed high internal consistency (Cronbach's Alpha of 0.96), validating our survey. The key finding is that while badges increased perceived competence, leaderboards occasionally decreased motivation.`;

const videoGenerationSteps = [
  "1.3. 대본에 맞는 시각 자료 생성 중... (이미지/테이블 활용)",
  "1.4. AI 음성(TTS) 나레이션 생성 중...",
  "1.5. 배경 음악 생성 및 오디오 믹싱 중... (API 호출 시뮬레이션)",
  "1.6. 영상 최종 조립 및 편집 중...",
  "영상 제작 완료!",
];

export default function AssistantPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [profileGenerated, setProfileGenerated] = useState(false);
  const [profileProgress, setProfileProgress] = useState(0);
  const [isProfileParsing, setIsProfileParsing] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [showVideoSampleModal, setShowVideoSampleModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState({
    coreTopics: "LLM, 인지 심리, 인간-컴퓨터 상호작용(HCI)",
    methodologies: "실험 설계, 통계 분석, fMRI 데이터 분석",
    theoreticalBasis: "인지주의 심리학, 구성주의 학습이론",
    network: "김철수 (서울대), 이영희 (KAIST), John Doe (MIT)",
  });

  // PDF to Video 상태
  const [videoStep, setVideoStep] = useState<VideoStep>("UPLOAD");
  const [videoFileName, setVideoFileName] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoScript, setVideoScript] = useState(mockVideoScript);
  const [isEditingScript, setIsEditingScript] = useState(false);
  const [currentGenerationStep, setCurrentGenerationStep] = useState(0);

  // 검색 상태
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState<"internal" | "external">(
    "internal"
  );

  const handleFileSelectClick = () => {
    setShowSampleModal(true);
  };

  const handleModalConfirm = () => {
    setShowSampleModal(false);
    // 모달 닫은 후 파일 선택 다이얼로그 열기
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 100);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStartParsing = () => {
    if (uploadedFiles.length === 0) return;

    setProfileGenerated(false);
    setProfileProgress(0);
    setIsProfileParsing(true);

    // 시뮬레이션: 3초 후 프로필 생성 시작
    setTimeout(() => {
      setIsProfileParsing(false);
      setProfileProgress(10); // 1.1 컴포넌트가 바로 꺼지도록 진행률 시작

      // 프로필 생성 진행률
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
    }, 3000);
  };

  const handleReuploadFile = () => {
    setUploadedFiles([]);
    setProfileGenerated(false);
    setProfileProgress(0);
    setIsProfileParsing(false);
  };

  const handleStartOver = () => {
    setUploadedFiles([]);
    setProfileGenerated(false);
    setProfileProgress(0);
    setIsProfileParsing(false);
    setIsEditingProfile(false);
  };

  const handleEditProfile = () => {
    if (isEditingProfile) {
      // 수정 완료 시 현재 입력값들을 상태에 저장
      const textareas = document.querySelectorAll(".profile-edit-textarea");
      const newData = {
        coreTopics:
          (textareas[0] as HTMLTextAreaElement)?.value ||
          profileData.coreTopics,
        methodologies:
          (textareas[1] as HTMLTextAreaElement)?.value ||
          profileData.methodologies,
        theoreticalBasis:
          (textareas[2] as HTMLTextAreaElement)?.value ||
          profileData.theoreticalBasis,
        network:
          (textareas[3] as HTMLTextAreaElement)?.value || profileData.network,
      };
      setProfileData(newData);
    }
    setIsEditingProfile(!isEditingProfile);
  };

  // PDF to Video 핸들러들
  const handleVideoFileSelectClick = () => {
    setShowVideoSampleModal(true);
  };

  const handleVideoModalConfirm = () => {
    setShowVideoSampleModal(false);
    // 모달 닫은 후 파일 선택 다이얼로그 열기
    setTimeout(() => {
      videoFileInputRef.current?.click();
    }, 100);
  };

  const handleVideoFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoFileName(file.name);
      setVideoStep("PARSING");

      // 시뮬레이션: 3초 후 파싱 완료
      setTimeout(() => {
        setVideoStep("PARSED");
      }, 3000);
    }
  };

  const handleGenerateScript = () => {
    setVideoStep("SCRIPTING");
  };

  const handleStartGeneration = () => {
    setVideoStep("GENERATING");
    setCurrentGenerationStep(0);
  };

  const handleVideoStartOver = () => {
    setVideoFile(null);
    setVideoFileName(null);
    setVideoStep("UPLOAD");
    setVideoScript(mockVideoScript);
    setIsEditingScript(false);
    setCurrentGenerationStep(0);
  };

  // 영상 생성 진행 시뮬레이션
  useEffect(() => {
    if (
      videoStep === "GENERATING" &&
      currentGenerationStep < videoGenerationSteps.length - 1
    ) {
      const timer = setTimeout(() => {
        setCurrentGenerationStep(currentGenerationStep + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (
      videoStep === "GENERATING" &&
      currentGenerationStep === videoGenerationSteps.length - 1
    ) {
      const finalTimer = setTimeout(() => {
        setVideoStep("DONE");
      }, 2000);
      return () => clearTimeout(finalTimer);
    }
  }, [videoStep, currentGenerationStep]);

  // 검색 핸들러
  const handleSearch = (type: "internal" | "external") => {
    setSearchType(type);
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
      {/* 헤더 */}
      <header className="flex bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex justify-center w-full px-4 sm:px-6 py-4">
          <div className="flex justify-between w-full max-w-7xl">
            <Link
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <Image
                src="/biblo_black.png"
                alt="Digital Catalog of Library Seminars"
                width={200}
                height={40}
                className="h-6 sm:h-8 w-auto"
              />
            </Link>
            <nav className="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-shrink-0">
              <button className="px-2 sm:px-3 py-1.5 rounded-lg bg-blue-600 text-white whitespace-nowrap text-xs sm:text-sm">
                AI 연구 어시스턴트
              </button>
              <Link
                href="/chatbot"
                className="px-2 sm:px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap text-xs sm:text-sm"
              >
                통합 AI 챗봇
              </Link>
              <Link
                href="/search"
                className="px-2 sm:px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap text-xs sm:text-sm"
              >
                AI 시멘틱 검색
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 모바일 탭 네비게이션 */}
      <div className="sm:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {activeTab === "profile" && (
                <User className="h-4 w-4 text-blue-600" />
              )}
              {activeTab === "search" && (
                <Search className="h-4 w-4 text-blue-600" />
              )}
              {activeTab === "video" && (
                <Video className="h-4 w-4 text-blue-600" />
              )}
              <span className="text-sm font-medium text-gray-900">
                {activeTab === "profile" && "1. 연구자 프로필 관리"}
                {activeTab === "search" && "2. 연구 협업 검색"}
                {activeTab === "video" && "3. PDF to Video 영상화"}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {activeTab === "profile" && "1/3"}
              {activeTab === "search" && "2/3"}
              {activeTab === "video" && "3/3"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (activeTab === "search") setActiveTab("profile");
                if (activeTab === "video") setActiveTab("search");
              }}
              disabled={activeTab === "profile"}
              className="h-7 px-2 text-xs"
            >
              이전
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (activeTab === "profile") setActiveTab("search");
                if (activeTab === "search") setActiveTab("video");
              }}
              disabled={activeTab === "video"}
              className="h-7 px-2 text-xs"
            >
              다음
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* 데스크톱 사이드바 */}
        <div className="hidden sm:block w-80 min-w-80 h-screen sticky top-[73px] bg-white shadow-lg flex-shrink-0">
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
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {activeTab === "profile" && (
            <div className="max-w-full sm:max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                1. 연구자 프로필 생성 및 관리
              </h2>

              <div className="space-y-8">
                {/* 1.1 연구 이력 업로드 */}
                {!isProfileParsing &&
                  !profileGenerated &&
                  profileProgress === 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">
                          1.1. 연구 이력 업로드
                        </CardTitle>
                        <CardDescription>
                          연구 실적이 정리된 PDF 파일(KRI, Scopus 이력 등)을
                          업로드하세요. 여러 파일을 선택할 수 있습니다.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Sample Data Modal */}
                          <Dialog
                            open={showSampleModal}
                            onOpenChange={setShowSampleModal}
                          >
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex-shrink-0">
                                    <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                  </div>
                                  <DialogTitle className="text-lg sm:text-xl break-words">
                                    샘플 데이터 안내
                                  </DialogTitle>
                                </div>
                                <DialogDescription className="text-sm sm:text-base text-gray-700 pt-2 break-words">
                                  현재 이 기능은 샘플 데이터를 사용한 데모
                                  버전입니다.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-3 sm:py-4">
                                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-3 sm:p-4">
                                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
                                    실제 PDF 파일을 업로드하더라도 샘플 데이터로
                                    시연됩니다. 본 시스템은 현재 프로토타입
                                    단계이며, 실제 PDF 파싱 및 프로필 생성
                                    기능은 개발 중입니다.
                                  </p>
                                </div>
                              </div>
                              <DialogFooter className="gap-2 sm:gap-0">
                                <Button
                                  variant="outline"
                                  onClick={() => setShowSampleModal(false)}
                                  className="flex-1 sm:flex-none"
                                >
                                  취소
                                </Button>
                                <Button
                                  onClick={handleModalConfirm}
                                  className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-none"
                                >
                                  확인
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <input
                            ref={fileInputRef}
                            type="file"
                            id="file-upload"
                            onChange={handleFileUpload}
                            accept="application/pdf"
                            multiple
                            className="hidden"
                          />
                          <div
                            onClick={handleFileSelectClick}
                            className="block border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50"
                          >
                            <Upload className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                            <div className="text-blue-600 font-semibold text-lg mb-2">
                              클릭하여 파일 선택
                            </div>
                            <div className="text-sm text-gray-500">
                              여러 PDF 파일을 한 번에 선택할 수 있습니다
                            </div>
                          </div>

                          {/* 업로드된 파일 목록 */}
                          {uploadedFiles.length > 0 && (
                            <div className="space-y-2">
                              <h3 className="font-semibold text-sm text-gray-700">
                                업로드된 파일 ({uploadedFiles.length}개)
                              </h3>
                              {uploadedFiles.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                                >
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                      {file.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      ({(file.size / 1024).toFixed(1)} KB)
                                    </span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemoveFile(index)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    삭제
                                  </Button>
                                </div>
                              ))}
                              <Button
                                onClick={handleStartParsing}
                                className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                                disabled={uploadedFiles.length === 0}
                              >
                                프로필 생성 시작
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                {/* PDF 파싱 중 */}
                {isProfileParsing && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
                      <h2 className="text-2xl font-semibold mb-2">
                        PDF 파싱 중...
                      </h2>
                      <p className="text-gray-600">
                        {uploadedFiles.length}개의 파일을 분석하고 있습니다.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* 1.2 프로필 생성 - 프로필 생성 시작 버튼 클릭 후에만 표시 */}
                {uploadedFiles.length > 0 &&
                  !isProfileParsing &&
                  !profileGenerated &&
                  profileProgress > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl flex items-center justify-between">
                          <span>1.2. AI 프로필 생성</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleReuploadFile}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            PDF 다시 업로드
                          </Button>
                        </CardTitle>
                        <CardDescription>
                          업로드된 연구 이력을 바탕으로 AI가 자동으로 연구자
                          프로필을 생성합니다.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-50 rounded-lg p-6 mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              업로드된 파일
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">
                              {uploadedFiles.length}개 파일
                            </span>
                          </div>
                        </div>
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
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl">
                            1.3. 프로필 관리
                          </CardTitle>
                          <CardDescription>
                            생성된 프로필을 확인하고 수정할 수 있습니다.
                          </CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            onClick={handleEditProfile}
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                          >
                            {isEditingProfile ? "수정 완료" : "프로필 수정"}
                          </Button>
                          <Button
                            onClick={handleStartOver}
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            프로필 다시 만들기
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 sm:space-y-6 w-full overflow-hidden">
                        {profileGenerated ? (
                          <div className="space-y-4 sm:space-y-6 w-full">
                            {/* 1.1.1. 학문적 지향 (추출 결과) */}
                            <div className="bg-blue-50 rounded-lg p-3 sm:p-6 w-full">
                              <div className="mb-4">
                                <h3 className="text-sm sm:text-lg font-semibold text-blue-900">
                                  1.1.1. 학문적 지향 (추출 결과)
                                </h3>
                              </div>

                              <div className="space-y-3 sm:space-y-4">
                                <div>
                                  <h4 className="font-medium text-blue-800 mb-2">
                                    핵심 주제 흐름:
                                  </h4>
                                  {isEditingProfile ? (
                                    <textarea
                                      className="profile-edit-textarea w-full p-2 border border-blue-300 rounded text-blue-700 text-sm"
                                      defaultValue={profileData.coreTopics}
                                      rows={2}
                                    />
                                  ) : (
                                    <p className="text-blue-700">
                                      {profileData.coreTopics}
                                    </p>
                                  )}
                                </div>

                                <div>
                                  <h4 className="font-medium text-blue-800 mb-2">
                                    방법론적 선호도:
                                  </h4>
                                  {isEditingProfile ? (
                                    <textarea
                                      className="profile-edit-textarea w-full p-2 border border-blue-300 rounded text-blue-700 text-sm"
                                      defaultValue={profileData.methodologies}
                                      rows={2}
                                    />
                                  ) : (
                                    <p className="text-blue-700">
                                      {profileData.methodologies}
                                    </p>
                                  )}
                                </div>

                                <div>
                                  <h4 className="font-medium text-blue-800 mb-2">
                                    이론적 기반:
                                  </h4>
                                  {isEditingProfile ? (
                                    <textarea
                                      className="profile-edit-textarea w-full p-2 border border-blue-300 rounded text-blue-700 text-sm"
                                      defaultValue={
                                        profileData.theoreticalBasis
                                      }
                                      rows={2}
                                    />
                                  ) : (
                                    <p className="text-blue-700">
                                      {profileData.theoreticalBasis}
                                    </p>
                                  )}
                                </div>

                                <div>
                                  <h4 className="font-medium text-blue-800 mb-2">
                                    공동 연구 네트워크:
                                  </h4>
                                  {isEditingProfile ? (
                                    <textarea
                                      className="profile-edit-textarea w-full p-2 border border-blue-300 rounded text-blue-700 text-sm"
                                      defaultValue={profileData.network}
                                      rows={2}
                                    />
                                  ) : (
                                    <p className="text-blue-700">
                                      {profileData.network}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* 1.1.2. 연구 실적 대시보드 */}
                            <div className="bg-green-50 rounded-lg p-3 sm:p-6 w-full">
                              <h3 className="text-sm sm:text-lg font-semibold text-green-900 mb-4">
                                1.1.2. 연구 실적 대시보드
                              </h3>
                              <p className="text-xs sm:text-sm text-green-700 mb-4">
                                무엇을(리스트), 얼마나(양), 얼마나 잘(질), 어떤
                                역할로(주도성), 어떻게(연구비) 연구했는지
                                요약합니다.
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <div className="bg-white rounded-lg p-4 text-center">
                                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                                    28편
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-600">
                                    총 논문 (얼마나)
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                                    6편
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-600">
                                    Top 10% (Q1) (얼마나 잘)
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                                    75%
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-600">
                                    주저자 비율 (주도성)
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                                    5억 2천만원
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-600">
                                    총 연구비 (어떻게)
                                  </div>
                                </div>
                              </div>

                              <div className="bg-white rounded-lg p-3 sm:p-4">
                                <h4 className="font-semibold text-green-800 mb-3 text-sm sm:text-base">
                                  상세 연구 실적 (무엇을)
                                </h4>
                                <div className="overflow-x-auto w-full">
                                  <table className="w-full text-xs sm:text-sm min-w-[300px] sm:min-w-[400px]">
                                    <thead>
                                      <tr className="border-b">
                                        <th className="text-left py-2 pr-2">
                                          논문 제목
                                        </th>
                                        <th className="text-left py-2 px-2">
                                          역할
                                        </th>
                                        <th className="text-left py-2 pl-2">
                                          질(Quality)
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="border-b">
                                        <td className="py-2 pr-2 text-xs sm:text-sm">
                                          LLM의 환각 현상에 대한 인지적 분석
                                        </td>
                                        <td className="py-2 px-2 text-xs sm:text-sm">
                                          주저자
                                        </td>
                                        <td className="py-2 pl-2 text-xs sm:text-sm">
                                          Q1
                                        </td>
                                      </tr>
                                      <tr className="border-b">
                                        <td className="py-2 pr-2 text-xs sm:text-sm">
                                          인간 언어와 기계 언어의 구조적 비교
                                        </td>
                                        <td className="py-2 px-2 text-xs sm:text-sm">
                                          공동저자
                                        </td>
                                        <td className="py-2 pl-2 text-xs sm:text-sm">
                                          Q2
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="py-2 pr-2 text-xs sm:text-sm">
                                          fMRI를 통한 언어 처리 중추 연구
                                        </td>
                                        <td className="py-2 px-2 text-xs sm:text-sm">
                                          주저자
                                        </td>
                                        <td className="py-2 pl-2 text-xs sm:text-sm">
                                          Q1
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            {/* 1.1.3. 최종 메타데이터 */}
                            <div className="bg-purple-50 rounded-lg p-3 sm:p-6 w-full">
                              <h3 className="text-sm sm:text-lg font-semibold text-purple-900 mb-4">
                                1.1.3. 최종 메타데이터 (Key-Value)
                              </h3>
                              <p className="text-xs sm:text-sm text-purple-700 mb-4">
                                이 데이터는 1.2 협업 검색 시스템의 검색 인덱스로
                                활용됩니다.
                              </p>

                              <div className="bg-gray-900 rounded-lg p-2 sm:p-4 text-green-400 text-xs sm:text-sm font-mono overflow-x-auto w-full">
                                <pre className="whitespace-pre-wrap break-words">{`{
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
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
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

                      <div className="flex flex-col sm:flex-row gap-4">
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
                              <span className="hidden sm:inline">
                                교내 협력 연구자 서칭
                              </span>
                              <span className="sm:hidden">교내 검색</span>
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
                              <span className="hidden sm:inline">
                                교외 협력 연구자 서칭
                              </span>
                              <span className="sm:hidden">교외 검색</span>
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
                      <CardTitle className="text-xl">
                        검색 결과 ({searchType === "internal" ? "교내" : "교외"}
                        )
                      </CardTitle>
                      <CardDescription>
                        총 {searchType === "internal" ? "5" : "3"}명의 추천
                        연구자를 찾았습니다.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* 교내 연구자 */}
                        {searchType === "internal" && (
                          <>
                            {/* 박지현 교수 */}
                            <div className="p-4 sm:p-6 border rounded-lg bg-white">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                                <div>
                                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    박지현 교수
                                  </h3>
                                  <p className="text-sm sm:text-base text-gray-600">
                                    (한국대학교 심리학과 (교내))
                                  </p>
                                </div>
                                <a
                                  href="mailto:jhpark@korea.ac.kr"
                                  className="text-blue-600 hover:underline text-sm sm:text-base break-all"
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
                                  박지현 교수는 '인지 심리' 및 '인간-기계 비교'
                                  연구 분야의 교내 최고 전문가입니다. 특히 '인간
                                  언어의 구조'에 대한 깊은 이해를 바탕으로,
                                  LLM의 심리적 기저를 탐구하려는 연구자님의
                                  목표에 핵심적인 통찰을 제공할 수 있습니다. 박
                                  교수님의 '실험 설계' 전문성은 연구자님의
                                  방법론을 보완하여 강력한 시너지를 낼 것입니다.
                                </p>
                              </div>
                            </div>

                            {/* 김태영 교수 */}
                            <div className="p-4 sm:p-6 border rounded-lg bg-white">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                                <div>
                                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    김태영 교수
                                  </h3>
                                  <p className="text-sm sm:text-base text-gray-600">
                                    (한국대학교 컴퓨터공학과 (교내))
                                  </p>
                                </div>
                                <a
                                  href="mailto:tykim@korea.ac.kr"
                                  className="text-blue-600 hover:underline text-sm sm:text-base break-all"
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
                                  김태영 교수는 자연어처리와 언어모델 분야의
                                  교내 선도 연구자로, LLM의 기술적 메커니즘에
                                  대한 깊은 이해를 보유하고 있습니다. 연구자님의
                                  심리학적 관점과 김 교수님의 공학적 접근이
                                  결합되면, 'LLM이 언어를 정확하게 이해하는지'에
                                  대한 학제간 연구가 가능합니다.
                                </p>
                              </div>
                            </div>

                            {/* 이수진 교수 */}
                            <div className="p-4 sm:p-6 border rounded-lg bg-white">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                                <div>
                                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    이수진 교수
                                  </h3>
                                  <p className="text-sm sm:text-base text-gray-600">
                                    (한국대학교 언어학과 (교내))
                                  </p>
                                </div>
                                <a
                                  href="mailto:sjlee@korea.ac.kr"
                                  className="text-blue-600 hover:underline text-sm sm:text-base break-all"
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
                                  이수진 교수는 '인간 언어의 구조'에 대한
                                  언어학적 전문성을 갖춘 교내 연구자입니다.
                                  언어의 형식적 구조와 의미 체계에 대한 깊은
                                  이해를 바탕으로, LLM과 인간의 언어 능력을
                                  비교하는 연구에 이론적 기반을 제공할 수
                                  있습니다.
                                </p>
                              </div>
                            </div>

                            {/* 정민호 교수 */}
                            <div className="p-4 sm:p-6 border rounded-lg bg-white">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                                <div>
                                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    정민호 교수
                                  </h3>
                                  <p className="text-sm sm:text-base text-gray-600">
                                    (한국대학교 뇌과학과 (교내))
                                  </p>
                                </div>
                                <a
                                  href="mailto:mhjung@korea.ac.kr"
                                  className="text-blue-600 hover:underline text-sm sm:text-base break-all"
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
                                  정민호 교수는 fMRI를 활용한 언어 처리 연구의
                                  교내 전문가입니다. 인간의 뇌가 언어를 처리하는
                                  신경학적 메커니즘에 대한 연구 경험을 바탕으로,
                                  LLM과 인간 뇌의 언어 처리 방식을 비교하는
                                  신경과학적 관점을 제공할 수 있습니다.
                                </p>
                              </div>
                            </div>

                            {/* 최은영 교수 */}
                            <div className="p-4 sm:p-6 border rounded-lg bg-white">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                                <div>
                                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    최은영 교수
                                  </h3>
                                  <p className="text-sm sm:text-base text-gray-600">
                                    (한국대학교 철학과 (교내))
                                  </p>
                                </div>
                                <a
                                  href="mailto:eychoi@korea.ac.kr"
                                  className="text-blue-600 hover:underline text-sm sm:text-base break-all"
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
                                  연구하는 교내 철학자입니다. 'LLM이 심리를
                                  가지고 있는지'에 대한 철학적 질문에 대해 깊이
                                  있는 이론적 논의를 제공할 수 있으며, 연구의
                                  개념적 틀을 정교화하는 데 기여할 수 있습니다.
                                </p>
                              </div>
                            </div>
                          </>
                        )}

                        {/* 교외 연구자 */}
                        {searchType === "external" && (
                          <>
                            {/* John Smith 교수 */}
                            <div className="p-4 sm:p-6 border rounded-lg bg-white">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                                <div>
                                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    John Smith 교수
                                  </h3>
                                  <p className="text-sm sm:text-base text-gray-600">
                                    (MIT 컴퓨터과학과 (교외))
                                  </p>
                                </div>
                                <a
                                  href="mailto:jsmith@mit.edu"
                                  className="text-blue-600 hover:underline text-sm sm:text-base break-all"
                                >
                                  jsmith@mit.edu
                                </a>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                  대규모 언어모델
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                  트랜스포머 아키텍처
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                  자연어처리
                                </span>
                              </div>

                              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r-lg">
                                <p className="font-semibold text-purple-800 mb-2">
                                  추천 이유:
                                </p>
                                <p className="text-gray-800 text-sm">
                                  John Smith 교수는 MIT에서 대규모 언어모델
                                  연구를 선도하는 세계적 전문가입니다. GPT
                                  시리즈 개발에 참여한 경험을 바탕으로, LLM의
                                  내부 작동 메커니즘과 한계에 대한 깊은 통찰을
                                  제공할 수 있습니다. 국제 협력 연구 경험이
                                  풍부하여 글로벌 관점에서의 연구 방향을 제시할
                                  수 있습니다.
                                </p>
                              </div>
                            </div>

                            {/* Maria Garcia 교수 */}
                            <div className="p-4 sm:p-6 border rounded-lg bg-white">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                                <div>
                                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Maria Garcia 교수
                                  </h3>
                                  <p className="text-sm sm:text-base text-gray-600">
                                    (Stanford 언어학과 (교외))
                                  </p>
                                </div>
                                <a
                                  href="mailto:mgarcia@stanford.edu"
                                  className="text-blue-600 hover:underline text-sm sm:text-base break-all"
                                >
                                  mgarcia@stanford.edu
                                </a>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                                  계산언어학
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                                  의미론
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                                  언어 이해
                                </span>
                              </div>

                              <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded-r-lg">
                                <p className="font-semibold text-orange-800 mb-2">
                                  추천 이유:
                                </p>
                                <p className="text-gray-800 text-sm">
                                  Maria Garcia 교수는 계산언어학 분야의
                                  권위자로, 인간의 언어 이해 과정과 기계의 언어
                                  처리 방식을 비교 분석하는 연구를 진행하고
                                  있습니다. LLM이 실제로 '이해'하는지에 대한
                                  철학적, 언어학적 관점을 제공할 수 있으며,
                                  연구의 이론적 기반을 강화하는 데 기여할 수
                                  있습니다.
                                </p>
                              </div>
                            </div>

                            {/* Yuki Tanaka 교수 */}
                            <div className="p-4 sm:p-6 border rounded-lg bg-white">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
                                <div>
                                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Yuki Tanaka 교수
                                  </h3>
                                  <p className="text-sm sm:text-base text-gray-600">
                                    (University of Tokyo 인지과학과 (교외))
                                  </p>
                                </div>
                                <a
                                  href="mailto:ytanaka@u-tokyo.ac.jp"
                                  className="text-blue-600 hover:underline text-sm sm:text-base break-all"
                                >
                                  ytanaka@u-tokyo.ac.jp
                                </a>
                              </div>

                              <div className="flex flex-wrap gap-2 mb-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                                  인지 아키텍처
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                                  AI 인지모델
                                </span>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800">
                                  비교인지과학
                                </span>
                              </div>

                              <div className="border-l-4 border-teal-500 pl-4 py-2 bg-teal-50 rounded-r-lg">
                                <p className="font-semibold text-teal-800 mb-2">
                                  추천 이유:
                                </p>
                                <p className="text-gray-800 text-sm">
                                  Yuki Tanaka 교수는 인간과 AI의 인지 과정을
                                  비교하는 연구의 선구자입니다. 인지 아키텍처
                                  관점에서 LLM의 정보 처리 방식을 분석하고,
                                  인간의 인지 과정과의 유사점과 차이점을
                                  체계적으로 규명하는 방법론을 제시할 수
                                  있습니다. 동아시아 연구 네트워크를 통한 협력
                                  기회도 제공할 수 있습니다.
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {activeTab === "video" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                3. PDF to Video 영상화
              </h2>

              <div className="space-y-6">
                {/* 1. PDF 업로드 */}
                {videoStep === "UPLOAD" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>1. PDF 업로드</CardTitle>
                      <CardDescription>
                        홍보 영상으로 만들 논문 PDF 파일을 업로드하세요.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!videoFile ? (
                        <>
                          {/* Sample Data Modal for Video */}
                          <Dialog
                            open={showVideoSampleModal}
                            onOpenChange={setShowVideoSampleModal}
                          >
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex-shrink-0">
                                    <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                  </div>
                                  <DialogTitle className="text-lg sm:text-xl break-words">
                                    샘플 데이터 안내
                                  </DialogTitle>
                                </div>
                                <DialogDescription className="text-sm sm:text-base text-gray-700 pt-2 break-words">
                                  현재 이 기능은 샘플 데이터를 사용한 데모
                                  버전입니다.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-3 sm:py-4">
                                <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-3 sm:p-4">
                                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
                                    실제 PDF 파일을 업로드하더라도 샘플 데이터로
                                    시연됩니다. 본 시스템은 현재 프로토타입
                                    단계이며, 실제 PDF 파싱 및 영상 생성 기능은
                                    개발 중입니다.
                                  </p>
                                </div>
                              </div>
                              <DialogFooter className="gap-2 sm:gap-0">
                                <Button
                                  variant="outline"
                                  onClick={() => setShowVideoSampleModal(false)}
                                  className="flex-1 sm:flex-none"
                                >
                                  취소
                                </Button>
                                <Button
                                  onClick={handleVideoModalConfirm}
                                  className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-none"
                                >
                                  확인
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <div
                            onClick={handleVideoFileSelectClick}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50"
                          >
                            <input
                              ref={videoFileInputRef}
                              type="file"
                              id="pdf-upload"
                              onChange={handleVideoFileUpload}
                              accept="application/pdf"
                              className="hidden"
                            />
                            <div className="text-blue-600 font-medium">
                              클릭하여 파일 선택
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              (또는 드래그 앤 드롭)
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="bg-gray-100 rounded-lg p-6 text-center space-y-4">
                          <p className="text-sm">
                            <strong className="font-semibold">
                              선택된 파일:
                            </strong>{" "}
                            {videoFile.name}
                          </p>
                          <div className="flex gap-3 justify-center">
                            <Button
                              variant="outline"
                              onClick={() => {
                                setVideoFile(null);
                                setVideoStep("UPLOAD");
                              }}
                            >
                              다시 선택
                            </Button>
                            <Button
                              onClick={() =>
                                handleVideoFileUpload({
                                  target: { files: [videoFile] },
                                } as any)
                              }
                              size="lg"
                            >
                              PDF 파싱 시작 (1.1)
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* 1.1. PDF 파싱 중 */}
                {videoStep === "PARSING" && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
                      <h2 className="text-2xl font-semibold mb-2">
                        1. PDF 파싱 중...
                      </h2>
                      <p className="text-gray-600">
                        {videoFileName} 파일의 텍스트, 테이블, 이미지를
                        분석합니다.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* 1.1. 파싱 결과 확인 */}
                {videoStep === "PARSED" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>1.1. 파싱 결과 확인</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="text" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
                          <TabsTrigger
                            value="text"
                            className="text-xs sm:text-sm"
                          >
                            <span className="hidden sm:inline">
                              본문 텍스트 (1.1.1)
                            </span>
                            <span className="sm:hidden">텍스트</span>
                          </TabsTrigger>
                          <TabsTrigger
                            value="tables"
                            className="text-xs sm:text-sm"
                          >
                            <span className="hidden sm:inline">
                              테이블 (1.1.2)
                            </span>
                            <span className="sm:hidden">테이블</span>
                          </TabsTrigger>
                          <TabsTrigger
                            value="images"
                            className="text-xs sm:text-sm"
                          >
                            <span className="hidden sm:inline">
                              이미지 (1.1.3)
                            </span>
                            <span className="sm:hidden">이미지</span>
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="text" className="mt-6 space-y-4">
                          <p className="text-sm text-gray-600">
                            <strong>요청사항 반영:</strong> 본문 텍스트를 논문
                            섹션별로 세분화하여 표시합니다.
                          </p>
                          <div className="space-y-2">
                            {Object.entries(mockParsedText).map(
                              ([key, value]) => (
                                <details
                                  key={key}
                                  className="border border-gray-200 rounded-lg overflow-hidden"
                                >
                                  <summary className="px-4 py-3 font-semibold cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                  </summary>
                                  <p className="px-4 py-3 text-sm text-gray-600">
                                    {value}
                                  </p>
                                </details>
                              )
                            )}
                          </div>
                        </TabsContent>

                        <TabsContent value="tables" className="mt-6 space-y-4">
                          <p className="text-xs sm:text-sm text-gray-600">
                            <strong>요청사항 반영:</strong> 추출된 테이블
                            데이터를 JSON 형식으로 표시합니다.
                          </p>
                          <div className="bg-slate-900 text-slate-100 p-2 sm:p-4 rounded-lg overflow-x-auto text-xs sm:text-sm font-mono max-h-60 overflow-y-auto">
                            <pre className="whitespace-pre-wrap break-words">
                              {JSON.stringify(mockParsedTableJson, null, 2)}
                            </pre>
                          </div>
                        </TabsContent>

                        <TabsContent value="images" className="mt-6 space-y-4">
                          <p className="text-sm text-gray-600">
                            <strong>요청사항 반영:</strong> 추출된 이미지를
                            별도로 표시합니다.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-xs sm:text-sm text-gray-600">
                              Figure 1: Model
                            </div>
                            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-xs sm:text-sm text-gray-600">
                              Figure 2: Graph
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="flex gap-3 mt-6">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setVideoFile(null);
                            setVideoStep("UPLOAD");
                          }}
                          className="flex-1"
                        >
                          처음으로
                        </Button>
                        <Button
                          onClick={handleGenerateScript}
                          size="lg"
                          className="flex-1"
                        >
                          스크립트 생성
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 1.2. 영상 스크립트 생성 */}
                {videoStep === "SCRIPTING" && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">
                        1.2. 영상 스크립트 생성 (90초 / 영어)
                      </CardTitle>
                      <CardDescription className="text-sm">
                        파싱된 데이터를 기반으로 생성된 스크립트입니다.
                        (요청하신 5가지 구조 반영)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        value={videoScript}
                        onChange={(e) => setVideoScript(e.target.value)}
                        readOnly={!isEditingScript}
                        rows={12}
                        className="font-mono text-xs sm:text-sm resize-none"
                      />

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setVideoStep("PARSED")}
                          className="flex-1"
                        >
                          이전 단계
                        </Button>
                        <Button
                          onClick={() => setIsEditingScript(!isEditingScript)}
                          variant="secondary"
                          className="flex-1"
                        >
                          {isEditingScript ? "수정 완료" : "스크립트 수정"}
                        </Button>
                        <Button
                          onClick={handleStartGeneration}
                          size="lg"
                          className="flex-1"
                        >
                          영상 제작 시작
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 영상 제작 진행 중 */}
                {videoStep === "GENERATING" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>영상 제작 진행 중...</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 py-4">
                        {videoGenerationSteps.map((step, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-3 p-4 rounded-lg transition-all ${
                              index <= currentGenerationStep
                                ? "bg-blue-50 text-gray-900 font-medium"
                                : "text-gray-400"
                            }`}
                          >
                            <span className="text-xl">
                              {index < currentGenerationStep ? "✅" : "⏳"}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 1.7. 최종 결과물 */}
                {videoStep === "DONE" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>1.7. 최종 결과물</CardTitle>
                      <CardDescription>
                        논문 홍보 영상이 성공적으로 생성되었습니다!
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="relative w-full pb-[56.25%] bg-black rounded-lg overflow-hidden">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src="https://www.youtube.com/embed/uCm5t33rymU?start=3"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>

                      <Button
                        onClick={handleVideoStartOver}
                        size="lg"
                        className="w-full"
                      >
                        처음부터 다시하기
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
