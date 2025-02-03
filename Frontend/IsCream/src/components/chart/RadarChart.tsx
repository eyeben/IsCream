import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

// ✅ 차트에서 사용할 요소들을 Chart.js에 등록
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// ✅ RadarChart 컴포넌트에 전달할 props 타입 정의
interface RadarChartProps {
  data?: number[];  // 데이터 값 (기본값: 1~5점 사이의 숫자 배열)
  labels?: string[]; // 차트의 축 라벨 (기본값: 심리 분석 관련 항목)
  title?: string;    // 차트 제목 (기본값: "심리 분석 결과")
  className?: string; // 추가적인 스타일을 위한 className
}

// ✅ 차트 색상 관련 스타일 정의
const COLOR_PROPS = {
  backgroundColor: "rgba(137, 215, 133, 0.2)", // ✅ 배경색 (연한 초록색, 20% 투명도)
  borderColor: "#89D785", // ✅ 테두리 색상 (진한 초록색)
  pointBackgroundColor: "#89D785", // ✅ 데이터 점 색상
  pointBorderColor: "#fff", // ✅ 점의 외곽선 색상 (흰색)
  pointHoverBackgroundColor: "#fff", // ✅ 마우스 오버 시 점의 배경 색상 (흰색)
  pointHoverBorderColor: "#89D785" // ✅ 마우스 오버 시 점의 외곽선 색상
};

// ✅ 기본값으로 사용할 데이터 및 라벨 (심리 분석 관련)
const DEFAULT_LABELS = ["감정표현", "사회성", "자아존중감", "불안", "공격성"];
const DEFAULT_DATA = [4.5, 3.2, 4.0, 2.8, 3.5]; // ✅ 1~5점 사이의 기본 데이터

// ✅ RadarChart 컴포넌트 정의
const RadarChart: React.FC<RadarChartProps> = ({
  data = DEFAULT_DATA, // ✅ 데이터가 전달되지 않으면 기본값 사용
  labels = DEFAULT_LABELS, // ✅ 라벨이 전달되지 않으면 기본값 사용
  title = "심리 분석 결과", // ✅ 제목이 전달되지 않으면 기본값 사용
  className = "" // ✅ 추가적인 Tailwind CSS 스타일을 적용할 수 있도록 지원
}) => {
  
  // ✅ 차트 데이터 설정
  const chartData = {
    labels: labels, // ✅ 차트의 축 라벨
    datasets: [
      {
        label: title, // ✅ 차트 제목
        data: data, // ✅ 차트에 표시될 값
        backgroundColor: COLOR_PROPS.backgroundColor,
        borderColor: COLOR_PROPS.borderColor,
        borderWidth: 2, // ✅ 테두리 두께
        pointBackgroundColor: COLOR_PROPS.pointBackgroundColor,
        pointBorderColor: COLOR_PROPS.pointBorderColor,
        pointHoverBackgroundColor: COLOR_PROPS.pointHoverBackgroundColor,
        pointHoverBorderColor: COLOR_PROPS.pointHoverBorderColor
      }
    ]
  };

  // ✅ 차트 옵션 설정
  const options = {
    responsive: true, // ✅ 반응형 차트 활성화
    maintainAspectRatio: false, // ✅ 고정된 비율 유지 비활성화
    scales: {
      r: { // ✅ Radial(방사형) 스케일 설정
        angleLines: {
          display: true // ✅ 축의 각도 선 표시 여부
        },
        suggestedMin: 1, // ✅ 최소값 1점
        suggestedMax: 5, // ✅ 최대값 5점
        ticks: {
          stepSize: 1 // ✅ 눈금 간격을 1로 설정 (1, 2, 3, 4, 5)
        }
      }
    },
    plugins: {
      title: {
        display: true, // ✅ 차트 제목 표시 여부
        text: title // ✅ 차트 제목 설정
      },
      legend: {
        display: false // ✅ 범례(legend) 숨기기
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)" // ✅ 툴팁 배경 색상 (어두운 회색)
      }
    }
  };

  // ✅ 차트 렌더링
  return (
    <div className={`w-9/11 h-80 p-4 bg-white rounded-lg shadow-sm ${className}`}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

export default RadarChart;
