import RadarChart from "../chart/RadarChart";
import Report from "../../components/report/Report"

const Personality5 = () => (
    <div className='w-full flex justify-center'>
        <div className='w-full max-w-[706px] p-3 my-3 bg-white border border-gray-300 rounded items-center'>
            <div>
                <div className="m-3 text-xl">
                    부모 양육 태도 검사(PAT)
                </div>
                <div>
                    <RadarChart />
                </div>
                <div>
                    <Report 
                        text="일단은 텍스트로 박아두고, 나중에 마크다운으로 바꿀수도 있음"
                    />
                </div>
            </div>
        </div>
    </div>
);

export default Personality5;