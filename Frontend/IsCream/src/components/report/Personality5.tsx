import RadarChart from "../chart/RadarChart";
import Report from "../../components/report/Report";
import { bigFiveApi } from '../../api/bigFive';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface BigFiveData {
    date: string;
    conscientiousness: number;
    agreeableness: number;
    emotionalStability: number;
    extraversion: number;
    openness: number;
    analysis: string;
}

const Personality5 = () => {
    const [bigFiveData, setBigFiveData] = useState<BigFiveData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { selectedChild } = useSelector((state: RootState) => state.child);

    useEffect(() => {
        const fetchBigFiveData = async () => {
            if (!selectedChild) {
                setError("선택된 자녀가 없습니다.");
                setIsLoading(false);
                return;
            }
            try {
                setIsLoading(true);
                console.log("빅파이브검사 api 불러오기 전단계", selectedChild.childId);
                
                const response = await bigFiveApi.getRecentResult(selectedChild.childId);
                console.log("성격 5요인 검사결과 데이터", response);
                setBigFiveData(response.data);
                console.log(bigFiveData);
                
            } catch (err) {
                setError('성격 5요인 결과를 불러오는데 실패했습니다.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBigFiveData();
    }, [selectedChild]); // selectedChild를 의존성 배열에 추가

    return (
        <div className='w-full flex justify-center'>
            <div className='w-full max-w-[706px] p-3 my-2 bg-white border border-gray-300 rounded items-center'>
                <div>
                    <div className="m-3 text-xl">
                        성격 5요인 검사(BFI)
                    </div>
                    <div>
                        <RadarChart
                            data={bigFiveData ? [
                                bigFiveData.conscientiousness,
                                bigFiveData.agreeableness,
                                bigFiveData.emotionalStability,
                                bigFiveData.extraversion,
                                bigFiveData.openness
                            ] : [-5,-5,-5,-5,-5]}
                            title={bigFiveData?.testDate || '날짜 없음'}
                        />
                    </div>
                    <div>
                        <Report
                            text={bigFiveData?.analysis || "보고서가 없습니다."}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Personality5;