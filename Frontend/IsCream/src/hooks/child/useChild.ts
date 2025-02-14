import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { childApi } from "../../api/child";
import { setChildren, selectChild } from "../../store/slices/childSlice";
import axios from "axios"; // axios import 추가

export const useChild = (onChildSelect: (childName: string) => void) => {
  const dispatch = useDispatch();
  const { children, selectedChild } = useSelector(
    (state: RootState) => state.child
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        // 토큰 확인 추가
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          setLoading(false);
          return;
        }

        const data = await childApi.getChildren();

        // 데이터 유효성 검사 추가
        if (Array.isArray(data) && data.length > 0) {
          dispatch(setChildren(data));

          // 첫 번째 아이가 자동으로 선택됨
          if (onChildSelect) {
            onChildSelect(data[0].nickname);
          }
        } else {
          dispatch(setChildren([]));
        }
      } catch (error) {
        // Axios 에러인 경우 더 자세한 정보 로깅
        if (axios.isAxiosError(error)) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "자녀 목록 조회에 실패했습니다.";

          console.error("자녀 목록 조회 실패:", {
            message: errorMessage,
            status: error.response?.status,
            data: error.response?.data
          });

          setError(errorMessage);
          dispatch(setChildren([]));
        } else {
          console.error("예상치 못한 에러:", error);
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [dispatch, onChildSelect]);

  const handleChildSelect = (child) => {
    dispatch(selectChild(child));
    onChildSelect(child.nickname);
  };

  return {
    children,
    selectedChild,
    loading,
    error, // error 상태 추가
    handleChildSelect
  };
};
