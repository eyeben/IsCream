import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { childApi } from "../../api/child";
import { setChildren, selectChild } from "../../store/slices/childSlice";

export const useChild = (onChildSelect: (childName: string) => void) => {
  const dispatch = useDispatch();
  const { children, selectedChild } = useSelector(
    (state: RootState) => state.child
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const data = await childApi.getChildren();
        dispatch(setChildren(data));

        // 첫 번째 아이가 자동으로 선택됨
        if (data.length > 0 && onChildSelect) {
          onChildSelect(data[0].nickname);
        }
      } catch (error) {
        console.error("자녀 목록 조회 실패:", error);
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
    handleChildSelect
  };
};
