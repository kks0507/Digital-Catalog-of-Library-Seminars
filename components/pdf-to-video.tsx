"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
  FileText,
  Play,
  Download,
  RotateCcw,
  Loader2,
  CheckCircle,
  Video,
  FileImage,
  Table,
  Info,
} from "lucide-react";

type AppStep =
  | "UPLOAD"
  | "PARSING"
  | "PARSED"
  | "SCRIPTING"
  | "GENERATING"
  | "DONE";

interface ParsedContent {
  abstract: string;
  introduction: string;
  methodology: string;
  results: string;
  conclusion: string;
  tables: Array<{
    id: string;
    caption: string;
    headers: string[];
    rows: any[][];
  }>;
  images: Array<{
    id: string;
    caption: string;
    description: string;
  }>;
}

export default function PdfToVideo() {
  const [step, setStep] = useState<AppStep>("UPLOAD");
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock parsed content
  const mockParsedContent: ParsedContent = {
    abstract:
      "본 연구는 AI 기반 학술 검색 시스템의 성능 향상을 위한 새로운 접근법을 제시합니다. 기존 키워드 기반 검색의 한계를 극복하고 의미 기반 검색을 통해 사용자 만족도를 크게 향상시켰습니다.",
    introduction:
      "디지털 도서관 환경에서 효과적인 정보 검색은 연구자들에게 핵심적인 과제입니다. 기존의 키워드 기반 검색 시스템은 사용자의 의도를 정확히 파악하지 못하는 한계가 있습니다.",
    methodology:
      "본 연구에서는 자연어 처리 기술과 벡터 검색 알고리즘을 결합한 하이브리드 검색 시스템을 개발했습니다. 총 1,000명의 사용자를 대상으로 6개월간의 실험을 진행했습니다.",
    results:
      "실험 결과, 기존 시스템 대비 검색 정확도가 35% 향상되었으며, 사용자 만족도는 4.2/5.0을 기록했습니다. 특히 복잡한 질의에 대한 응답 품질이 크게 개선되었습니다.",
    conclusion:
      "제안된 AI 기반 검색 시스템은 학술 연구 환경에서 효과적인 정보 검색을 지원할 것으로 기대됩니다. 향후 더 많은 도서관에서 도입될 것으로 예상됩니다.",
    tables: [
      {
        id: "T1",
        caption: "실험 결과 비교",
        headers: ["시스템", "정확도", "사용자 만족도"],
        rows: [
          ["기존 시스템", "65%", "3.2/5.0"],
          ["제안 시스템", "88%", "4.2/5.0"],
        ],
      },
    ],
    images: [
      {
        id: "F1",
        caption: "시스템 아키텍처",
        description: "AI 기반 검색 시스템의 전체 구조를 보여주는 다이어그램",
      },
    ],
  };

  const mockVideoScript = `# AI 기반 학술 검색 시스템 연구

## 1. 연구 배경
디지털 도서관에서 효과적인 정보 검색은 연구자들에게 핵심적인 과제입니다. 기존 키워드 기반 검색의 한계를 극복하기 위해 AI 기술을 활용한 새로운 접근법을 제안합니다.

## 2. 연구 목적
자연어 처리와 벡터 검색을 결합한 하이브리드 시스템을 통해 사용자 의도를 정확히 파악하고 관련성 높은 결과를 제공하는 것이 목표입니다.

## 3. 연구 방법
1,000명의 사용자를 대상으로 6개월간의 실험을 진행했습니다. 기존 시스템과 제안 시스템의 성능을 정확도와 사용자 만족도로 비교 평가했습니다.

## 4. 주요 결과
- 검색 정확도: 65% → 88% (35% 향상)
- 사용자 만족도: 3.2/5.0 → 4.2/5.0
- 복잡한 질의에 대한 응답 품질 대폭 개선

## 5. 결론
AI 기반 검색 시스템은 학술 연구 환경에서 효과적인 정보 검색을 지원하며, 향후 더 많은 도서관에서 도입될 것으로 기대됩니다.`;

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

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    setStep("PARSING");
    setProgress(0);

    // Simulate parsing progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep("PARSED");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleGenerateScript = () => {
    setStep("SCRIPTING");
    setTimeout(() => {
      setStep("GENERATING");
      setProgress(0);

      // Simulate video generation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep("DONE");
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }, 2000);
  };

  const handleStartOver = () => {
    setStep("UPLOAD");
    setFileName(null);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            PDF to Video 변환기
          </CardTitle>
          <CardDescription>
            PDF 논문을 업로드하면 AI가 핵심 내용을 분석하고 영상 콘텐츠로
            변환합니다
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Sample Data Modal */}
      <Dialog open={showSampleModal} onOpenChange={setShowSampleModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <DialogTitle className="text-xl">샘플 데이터 안내</DialogTitle>
            </div>
            <DialogDescription className="text-base text-gray-700 pt-2">
              현재 이 기능은 샘플 데이터를 사용한 데모 버전입니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                실제 PDF 파일을 업로드하더라도 샘플 데이터로 시연됩니다. 본
                시스템은 현재 프로토타입 단계이며, 실제 PDF 파싱 및 영상 생성
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

      {/* Step 1: Upload */}
      {step === "UPLOAD" && (
        <Card>
          <CardContent className="pt-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">PDF 파일 업로드</h3>
              <p className="text-gray-600 mb-4">
                논문 PDF 파일을 드래그하거나 클릭하여 업로드하세요
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  e.target.files?.[0] && handleFileUpload(e.target.files[0])
                }
                className="hidden"
                id="pdf-upload"
              />
              <Button onClick={handleFileSelectClick}>파일 선택</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Parsing */}
      {step === "PARSING" && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
              <div>
                <h3 className="text-lg font-semibold text-indigo-800">
                  PDF 파싱 중...
                </h3>
                <p className="text-gray-600">
                  {fileName} 파일의 텍스트, 테이블, 이미지를 분석합니다
                </p>
              </div>
              <div className="w-full">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">{progress}% 완료</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Parsed Content */}
      {step === "PARSED" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              파싱된 내용
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">📄 추출된 섹션</h4>
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
                    📊 테이블 ({mockParsedContent.tables.length}개)
                  </h4>
                  <div className="text-sm text-gray-600">
                    {mockParsedContent.tables.map((table, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Table className="h-4 w-4" />
                        <span>{table.caption}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    🖼️ 이미지 ({mockParsedContent.images.length}개)
                  </h4>
                  <div className="text-sm text-gray-600">
                    {mockParsedContent.images.map((image, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FileImage className="h-4 w-4" />
                        <span>{image.caption}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📝 Abstract 미리보기</h4>
                <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                  {mockParsedContent.abstract}
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

      {/* Step 4: Script Generation */}
      {step === "SCRIPTING" && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
              <div>
                <h3 className="text-lg font-semibold text-indigo-800">
                  스크립트 생성 중...
                </h3>
                <p className="text-gray-600">
                  AI가 논문 내용을 90초 영상용 스크립트로 변환하고 있습니다
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Video Generation */}
      {step === "GENERATING" && (
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
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-2">{progress}% 완료</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 6: Generated Script Preview */}
      {step === "SCRIPTING" && (
        <Card>
          <CardHeader>
            <CardTitle>생성된 영상 스크립트</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                {mockVideoScript}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 7: Final Video */}
      {step === "DONE" && (
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
                <Button variant="outline" onClick={handleStartOver}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  새로 시작
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
