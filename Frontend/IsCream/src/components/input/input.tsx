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
    type?: 'email' | 'tel' | 'text';
    required?: boolean;
    className?: string;
    withButton?: boolean,
    buttonText?: string;
    onButtonClick?: () => void;
}

const Input = ({
    placeholder = '',
    type = 'email',
    required = false,
    className='',
    withButton = false,
    buttonText = '중복 확인',
    onButtonClick
}: InputProps) => {
    
    return (
        <>
            <div className="w-11/12 relative">
                <div className="w-full p-3 bg-white border border-gray-300 rounded flex items-center">
                    <input
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        className={`flex-1 outline-none ${className}`}
                    />
                    {withButton && (
                        <button
                            onClick={onButtonClick}
                            className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
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
