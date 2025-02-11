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
vectorstore = Chroma(persist_directory="/home/ubuntu/models/chroma_db", embedding_function=embedding_function)

# Retriever 생성
retriever = vectorstore.as_retriever(search_kwargs={"k": 10})

print("📁 저장된 문서 개수:", vectorstore._collection.count())

prompt = PromptTemplate(
    template="""
    당신은 전문적인 HTP(집-나무-사람) 검사 해석을 수행하는 상담사입니다.
    아래 검사 결과를 바탕으로 한글로 심리적 해석을 마크다운 언어로 작성하세요.

    ### 검사 결과
    {context}

    ### 요구사항
    - 집, 나무, 사람 각각에 대해 심리적 의미를 자세히 분석하세요.
    - 분석은 간결하고 명확하게 작성하세요.
    """,
    input_variables=["context"]
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
    print(query)
    if not docs:
        print("❌ 검색된 문서가 없습니다. 벡터 DB를 다시 저장하세요.")
        return "검색된 문서가 없습니다."

    # 모델 응답 반환
    response = qa_chain.invoke(query)

    return response["result"]  # `result` 필드에서 응답 가져오기


