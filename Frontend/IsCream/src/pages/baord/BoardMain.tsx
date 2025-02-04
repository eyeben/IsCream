import SearchBar from "../../components/SearchBar";

const BoardMain = () => {
  // 검색어를 처리할 함수 정의
  const handleSearch = (query: string) => {
    // 여기서 검색어(query)를 사용하여 원하는 작업을 수행
    console.log("검색어:", query);
  };

  return (
    <div className="w-full mt-15">
      <SearchBar
        onSearch={handleSearch}
        placeholder="찾으시는 것을 검색해주세요"
      />
    </div>
  );
};

export default BoardMain;
