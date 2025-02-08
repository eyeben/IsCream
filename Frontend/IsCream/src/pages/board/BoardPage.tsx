import SearchBar from "../../components/Search/SearchBar";
import BoardMain from "../../components/board/BoardMain";
import PostCreatButton from "../../components/board/PostCreateButton";

const BoardPage = () => {
  // 검색어를 처리할 함수 정의
  const handleSearch = (query: string) => {
    // 여기서 검색어(query)를 사용하여 원하는 작업을 수행
    console.log("검색어:", query);
  };

  return (
    <>
      <div className="w-full max-w-[706px] mx-auto">
        <SearchBar
          onSearch={handleSearch}
          placeholder="찾으시는 것을 검색해주세요"
        />
      </div>
      <div>
        <BoardMain />
      </div>
      <div>
        <PostCreatButton />
      </div>
    </>
    //
  );
};

export default BoardPage;
