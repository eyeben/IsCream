export interface BigFiveQuestion {
  question: string;
  questionType: string;
}

export interface BigFiveQuestionsResponse {
  code: "S0000" | "E4002";
  message: string;
  data: {
    problems: BigFiveQuestion[];
  };
}

export interface BigFiveTestResultRequest {
  childId: number;
  conscientiousness: number;
  agreeableness: number;
  emotionalStability: number;
  extraversion: number;
  openness: number;
}

export interface BigFiveTestResultResponse {
  code: "S0000" | "E4001";
  message: string;
  data: {
    testDate: string;
    conscientiousness: number;
    agreeableness: number;
    emotionalStability: number;
    extraversion: number;
    openness: number;
    analysis: string;
  };
}

export interface BigFiveRecentResultResponse {
  code: "S0000" | "E4001";
  message: string;
  data: {
    testDate: string;
    conscientiousness: number;
    agreeableness: number;
    emotionalStability: number;
    extraversion: number;
    openness: number;
    analysis: string;
  };
}
