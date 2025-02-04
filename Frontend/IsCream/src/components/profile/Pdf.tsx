

const Pdf = () => (
    <div className='w-full flex justify-center'>
        <div className='w-full max-w-[706px] p-3 my-3 bg-white border border-gray-300 rounded items-center'>
            <div className="flex justify-between">
                <div className="m-3 text-xl">
                    검사결과(PDF) 다운
                </div>
                <div className="m-3 text-xl">
                        <button                         >
                            &gt;
                        </button>
                </div>
            </div>
        </div>
    </div>
);

export default Pdf;

{/* <div className="w-full flex justify-center">
        <div className="w-full max-w-[706px] p-3 my-3 bg-white border border-gray-300 rounded items-center">
            <div className="flex justify-between">
                <div className="m-3 text-xl">
                    자녀 정보
                </div>
                <div className="m-3 text-xl">
                    {children.length < 2 && (
                        <button 
                            onClick={onAddChild}
                        >
                            +
                        </button>
                    )}
                </div>
            </div>
            <div className="flex">
                {children.map((child, index) => (
                    <div className="m-3 key={index}">
                        <ChildInfo
                            key={index}
                            childNickName={child.childNickname}
                            childSex={child.childSex}
                            childBirth={child.childBirth}
                            onEdit={() => onEditChild(index)}
                            onDelete={() => onDeleteChild(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    </div> */}