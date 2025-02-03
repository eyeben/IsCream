import { useState } from "react";

interface ChildeModalProps{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (childData: {
        childNickname: string;
        childSex: string;
        childBirth: string;
    }) => void;
}

const ChildeModal: React.FC<ChildeModalProps> = ({isOpen, onClose, onSubmit}) => {
    const [childData, setChildData] = useState({
        childNickname: '',
        childSex: '',
        childBirth: ''
    });
}