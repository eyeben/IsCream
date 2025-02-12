import { api } from '../utils/common/axiosInstance';
import axios from 'axios';

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
    try{
        console.log('API 요청 시작');
        const token = localStorage.getItem('accessToken');
        console.log('현재 토큰:', token);

        const response = await api.get('/users/info');
        console.log('API 응답:', response);
        return response.data;
    } catch (error) {
        console.error('getUserInfoAPI 에러:', error); // 에러 확인용
        if (axios.isAxiosError(error)) {
            console.log('실패한 요청의 상세정보:', error.config);
        }
        throw error;
    } 
}
