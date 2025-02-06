import TestSelector from "../../components/pdf/TestSelector";
import DateSelector from "../../components/pdf/DateSelector";
import TestList from "../../components/pdf/TestList";
import { DateRange, TestType, TestResult } from "../../components/pdf/types";
import { useState } from "react";

const PDFDownload = () => {
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: '2025-01-20',
        endDate: '2025-01-25'
    });

    const [selectedTests, setSelectedTests] = useState<TestType[]>([
        {id:'HTP', name:'AI 그림검사', isSelected:false},
        {id:'PAT', name:'부모양육태도 검사', isSelected:false},
        {id:'BFI', name:'성격 5요인 검사', isSelected:false}
    ]);

    // const [testResults, setTestResults] = useState<TestResult[]>([]);

    const handleDateChange = (newRange: DateRange) => {
        setDateRange(newRange);
    }

    const handleTestSelector = (testId: string) => {
        const updatedTests = selectedTests.map(test =>
            test.id === testId ? { ...test, isSelected: !test.isSelected } :test
        );
        setSelectedTests(updatedTests);
    }

    // 테스트용 데이터
    const [testResults] = useState<TestResult[]>([
        {
            id: '1',
            testType: 'AI 그림검사(HTP)',
            date: '2025-01-20',
            status: '가나다'
        },
        {
            id: '2',
            testType: '부모양육태도 검사(PAT)',
            date: '2025-01-20',
            status: '보성'
        },
        {
            id: '3',
            testType: '성격 5요인 검사(BFI)',
            date: '2025-01-20',
            status: '가나다'
        },
        {
            id: '4',
            testType: 'AI 그림검사(HTP)',
            date: '2024-12-25',
            status: '보성'
        }
    ]);

    const handleResultSelect = (resultId: string) => {
        console.log('Selected result:', resultId);
        // 여기에 상세 페이지로 이동하는 로직 추가
    };

    return(
        <div className="w-full flex justify-center">
            <div className="w-[95%] max-w-[706px]">
                <div>
                    <DateSelector 
                        dateRange={dateRange}
                        onDateChange={handleDateChange}
                    />
                </div>
                <div>
                    <TestSelector 
                        selectedTests={selectedTests}
                        onTestSelector={handleTestSelector}
                    />
                </div>
                <div>
                    <TestList 
                        testResults={testResults}
                        onResultSelect={handleResultSelect}
                    />
                </div>
            </div>
        </div>
    );
};

export default PDFDownload;