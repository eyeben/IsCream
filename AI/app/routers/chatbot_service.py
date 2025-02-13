from app.schemas.question import QuestionRequest
from fastapi import APIRouter, HTTPException
from langchain_openai import ChatOpenAI  # OpenAI LLM
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
router = APIRouter()

llm = ChatOpenAI(model="gpt-4-turbo", max_tokens=150)  # 응답 길이 조정

### **3️⃣ OpenAI 임베딩 적용**
embedding_function = OpenAIEmbeddings(model="text-embedding-ada-002")

# ChromaDB에서 문서 검색
vectorstore = Chroma(persist_directory="./chroma_db", embedding_function=embedding_function)
retriever = vectorstore.as_retriever(search_kwargs={"k": 10})  # 검색 범위 확장

### **4️⃣ 프롬프트 수정 (150~250자 제한 추가)**
prompt = PromptTemplate.from_template("""
당신은 **아동 심리 상담 전문가**입니다.  
항상 **온화하고 공감적인 태도**로 보호자와 아이의 이야기를 경청하며,  
아동의 감정과 행동을 이해할 수 있도록 돕습니다.  

### 참고 문서
{context}

### 질문
{question}

**심리 상담사의 온화한 말투로 대답해 주세요.**  
답변은 **150자에서 250자** 사이로 작성해 주세요.
""")

### **5️⃣ LCEL 체인 구성**
chain = (
    {"context": retriever | RunnablePassthrough(), "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()  # 최종 출력을 문자열로 변환
)

@router.post("/question")
async def question(request: QuestionRequest):
    try:
        response = chain.invoke(request.question)  # LangChain 실행
        return {"response": response}  # 텍스트 응답 반환
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))