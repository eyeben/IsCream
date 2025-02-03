
interface ChildRegisterProps{
    childNickName:string;
    childSex: string;
    childBirth: string;
}

const ChildRegister: React.FC<ChildRegisterProps> = ({ childNickName, childSex, childBirth }) => {
    // w-full p-3 bg-white border border-gray-300 rounded flex items-center
    return(
        <>
            <div className="w-[10%] border border-gray-300">
                glgl
            </div>
        </>
    )
}

export default ChildRegister;