import warnings
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate

# 경고 무시
warnings.filterwarnings("ignore", category=DeprecationWarning)

# 환경 변수 로드
load_dotenv()

# OpenAI 모델 설정
llm = ChatOpenAI(model="gpt-4-turbo")

# OpenAI 임베딩 모델 설정
embedding_function = OpenAIEmbeddings(model="text-embedding-ada-002")

# ChromaDB 벡터 저장소 로드
vectorstore = Chroma(persist_directory="app/core/chroma_db", embedding_function=embedding_function)

# Retriever 생성
retriever = vectorstore.as_retriever(search_kwargs={"k": 10})

print("📁 저장된 문서 개수:", vectorstore._collection.count())

# 프롬프트 설정 (RetrievalQA는 {context} 변수를 사용해야 함)
prompt = PromptTemplate(
    template="""
    당신은 전문적인 HTP(집-나무-사람) 검사 해석을 수행하는 상담사입니다.
    주어진 검사 결과를 바탕으로 각 요소의 심리적 의미를 분석하여 상세히 설명해주세요.

    ### **HTP 검사 결과**
    {context}

    ### **해석 지침**
    1. **집 검사 해석**  
       - 문과 창문의 위치 및 크기  
       - 지붕, 벽의 구조와 형태  
    2. **나무 검사 해석**  
       - 뿌리, 가지, 기둥의 의미  
    3. **사람 검사 해석**  
       - 얼굴, 손, 발의 크기와 위치  

    ### **출력 예시**
    🔹 **집 검사 해석**  
    - 문이 작고 오른쪽에 위치 → 내향적인 성향  
    - 창문이 작음 → 외부와의 소통 제한 가능성  

    🔹 **나무 검사 해석**  
    - 뿌리가 없음 → 정체성 부족 가능성  

    🔹 **사람 검사 해석**  
    - 얼굴이 작음 → 사회적 위축 가능성  
    """,
    input_variables=["context"],  # ✅ 반드시 `context` 변수 사용
)

# RetrievalQA 체인 생성
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=retriever,
    chain_type="stuff",  # 문서 결합 방식 (stuff, map_reduce 등 가능)
    return_source_documents=True
)


# 🔍 **HTP 검사 결과 분석 실행**
def process_predictions(query):
    # 문서 검색 수행
    docs = retriever.get_relevant_documents(query)

    if not docs:
        print("❌ 검색된 문서가 없습니다. 벡터 DB를 다시 저장하세요.")
        return "검색된 문서가 없습니다."

    # 모델 응답 반환
    response = qa_chain.invoke(query)

    return response["result"]  # `result` 필드에서 응답 가져오기


