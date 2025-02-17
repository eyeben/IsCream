import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBigFiveTest } from "../../hooks/bigfive/useBigFiveTest";

// Big5 성격검사 문항 인터페이스
// interface BigFiveQuestion {
//   id?: number;
//   question: string;
//   questionType: string;
// }

const BigFiveExamPage: React.FC = () => {
  const navigate = useNavigate();
  const { questions, loading, error, fetchQuestions } = useBigFiveTest();

  // 상태 관리
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});

  // 컴포넌트 마운트 시 질문 목록 불러오기
  useEffect(() => {
    fetchQuestions();
  }, []);

  // 답변 선택 핸들러
  const handleAnswer = (score: number) => {
    // 현재 질문에 대한 답변 저장
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].question]: score
    }));

    // 다음 문항으로 이동
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // 모든 문항 완료 시 결과 페이지로 이동
      handleSubmitExam();
    }
  };

  // 검사 제출 핸들러
  const handleSubmitExam = () => {
    // 결과 계산 로직
    const calculateResults = () => {
      const results = {
        Openness: 0,
        Conscientiousness: 0,
        Extraversion: 0,
        Agreeableness: 0,
        Neuroticism: 0
      };

      Object.entries(answers).forEach(([question, score]) => {
        // 질문 타입에 따라 카테고리 매핑
        const categoryMapping: { [key: string]: keyof typeof results } = {
          // 실제 API에서 받은 questionType에 맞게 조정
          OPENNESS: "Openness",
          CONSCIENTIOUSNESS: "Conscientiousness",
          EXTRAVERSION: "Extraversion",
          AGREEABLENESS: "Agreeableness",
          NEUROTICISM: "Neuroticism"
        };

        const currentQuestion = questions.find((q) => q.question === question);
        if (currentQuestion && currentQuestion.questionType) {
          const category =
            categoryMapping[currentQuestion.questionType.toUpperCase()];
          if (category) {
            results[category] += score;
          }
        }
      });

      return results;
    };

    const examResults = calculateResults();

    // 결과 페이지로 네비게이션
    navigate("/big-five/result", {
      state: { results: examResults }
    });
  };

  // 로딩 상태
  if (loading) {
    return <div>질문을 불러오는 중...</div>;
  }

  // 에러 상태
  if (error) {
    return <div>에러: {error}</div>;
  }

  // 질문이 없는 경우
  if (questions.length === 0) {
    return <div>불러올 질문이 없습니다.</div>;
  }

  // 현재 문항
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Big5 성격검사</h1>

        {/* 진행 상황 표시 */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {currentQuestionIndex + 1} / {questions.length}
          </p>
        </div>

        {/* 문항 */}
        <div className="mb-6">
          <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>

          {/* 답변 옵션 */}
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                onClick={() => handleAnswer(score)}
                className="bg-gray-100 hover:bg-blue-100 p-2 rounded-lg"
              >
                {score === 1 && "전혀 그렇지 않다"}
                {score === 2 && "그렇지 않다"}
                {score === 3 && "보통이다"}
                {score === 4 && "그렇다"}
                {score === 5 && "매우 그렇다"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigFiveExamPage;
