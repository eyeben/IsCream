interface RelationButtonsProps{
    selectedRelation: string;
    onChange: (relation: string) => void;
}

const RelationButtons = ({ selectedRelation, onChange }: RelationButtonsProps) => {
    return (
        <div className="w-[95%] flex gap-2">
            {['엄마', '아빠', '기타'].map((relation) => (
                <button 
                    key={relation}
                    className={`w-1/3 p-3 rounded flex justify-center items-center
                        ${selectedRelation === relation 
                            ? 'bg-[#009E28] text-white border-[#009E28]' 
                            : 'bg-white border border-gray-300'}`}
                    onClick={() => onChange(relation)}
                >
                    {relation}
                </button>
            ))}
        </div>
    );
};

export default RelationButtons;