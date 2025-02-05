interface ReportProps{
    text: string
}

const Report = ({text}: ReportProps) => (
    <div className="w-full flex justify-center">
        <div className="w-[80%] p-4 bg-gray-100 rounded-lg  border border-gray-300 rounded items-center">
            {text}
        </div>
    </div>

);

export default Report;
