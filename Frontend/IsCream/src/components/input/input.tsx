// 사용방법법
// <Input
//         placeholder='hello@example.com'
//         type='email'
//         required={true}
//         />

//       <Input
//         placeholder="홍길동"
//         type="text"
//         required={true}
//         withButton={true}
//         onButtonClick={() => console.log('중복확인 클릭')}
//       />


interface InputProps {

    placeholder?: string;
    type?: 'email' | 'tel' | 'text' | 'calendar';
    required?: boolean;
    className?: string;
    withButton?: boolean,
    buttonText?: string;
    onButtonClick?: () => void;
    value?: string; // 달력 값
    onChange?: (value: string) => void; // 달력 변경
}

const Input = ({
    placeholder = '',
    type = 'email',
    required = false,
    className='',
    withButton = false,
    buttonText = '중복 확인',
    onButtonClick,
    value,
    onChange
}: InputProps) => {
    
    const inputType = type === 'calendar' ? 'date' : type;
    const handlerDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(onChange){
            onChange(e.target.value);
        }
    }
    return (
        <>
            <div className="w-[95%] ">
                <div className="w-full max-w-[706px] p-3 bg-white border border-gray-300 rounded flex items-center">
                    <input
                        type={inputType}
                        placeholder={placeholder}
                        required={required}
                        className={`flex-1 outline-none ${className} ${
                            type === 'calendar' ? 'cursor-pointer' : ''
                        }`}
                        value={value}
                        onChange={type === 'calendar' ? handlerDateChange : undefined}
                    />
                    {withButton && (
                        <button
                            onClick={onButtonClick}
                            className="px-2 py-0 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            {buttonText}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Input;
