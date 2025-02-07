import { api } from '@/utils/common/axiosInstance';

interface UserInfoResponse {
    code: 'S0000' | 'E4001';
    message: string;
    data: {
        email: string;
        username: string;
        nickname: string;
        phone: string;
        birthDate: string;
        relation: string;
        imageUrl: string;
    }
}

// 사용자 정보 확인(이메일, 이름, 전화번호 확인)
export const getUserInfoAPI = async () : Promise<UserInfoResponse> => {
    const response = await api.get('/users/info');
    return response.data;
}
