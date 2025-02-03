import { useLocation } from "react-router-dom";
import HeaderMain from "./Header_MainPage"; // 메인 페이지 & 마이페이지에서 사용
import HeaderNormal from "./Header_Normal"; // 나머지 페이지(게시판 제외)에서 사용

const HeaderController = () => {
  const location = useLocation(); // 현재 경로 확인

  // 메인 페이지와 마이페이지에서 HeaderMain 사용
  if (location.pathname === "/" || location.pathname === "/mypage") {
    return <HeaderMain />;
  }

  // 게시판 페이지를 제외한 모든 페이지에서 HeaderNormal 사용
  if (location.pathname !== "/board") {
    return <HeaderNormal />;
  }

  // 게시판(`/board`)에서는 헤더 없음
  return null;
};

export default HeaderController;
