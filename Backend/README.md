# 컨벤션

## Naming

1. 누구나 알 수 있는 쉬운 단어
2. 변수 CamelCase 사용
    - ex) userEmail, userPhone
3. 패키지명은 무조건 소문자
    - app, auth, board…
4. ENUM 및 상수는 대문자
    - CHILD_STATE
5. 함수명은 동사로 네이밍하고 소문자로 시작
    - checkChildState()
6. 클래스명은 명사로 작성하고 UpperCamelCase 사용
    - UserEmail, BoardLike
7. 객체 이름을 함수에 넣지 않는다.
    - line.getLength() (O) / line.getLineLength() (X)
8. Collection은 복수형을 쓰거나, 자료구조를 명시
    - List items, Map nameMap
9. 계층 함수 네이밍 규칙
    1. Controller와 Service Naming은 동일하게, Repository만 다르게
    - Controller : getUser, getUserList, updateUser
    - Service : getUser, getUserList, updateUser
    - Repository : findUserByUserId, updateUser, deleteById
10. 데이터베이스는 snake case로
    - user_id

## Structure

1. 패키지는 목적별로 묶기
    - user(User 관련 패키지), coupon(쿠폰 관련 패키지)
2. Controller에서는 최대한 어떤 Service를 호출할지 결정하는 역할과 Exception처리만을 담당
    - Controller 단에서 로직을 구현하는 것을 지양
3. 하나의 메소드와 클래스는 하나의 목적을 두게 만든다.
    - 하나의 메소드 안에서 한 가지 일만 해야 한다.
    - 하나의 클래스 안에서는 같은 목적을 둔 코드들의 집합이어야 한다.
4. 메소드와 클래스는 최대한 작게 만든다.

## Programming

1. 반복되는 코드를 작성하지 않는다.
    - 단, 테스트코드는 예외로 한다.
2. 변수는 최대한 사용하는 위치에 가깝게 사용한다.
3. 파라미터 변수와 내부 변수를 구별할 땐 언더바가 아닌 this로 구별한다.
    - this.name = name (O) / name = _name (X)
    - 추가적으로 언더바를 prefix로 사용하는 것을 지양하자.
4. 모든 예외는 무시 하지 말고 처리한다. 만약 예외를 처리하지 않을거라면 그 이유에 대해서 명확하게 주석을 남긴다.
5. 예외를 던질 때는 최대한 세부적인 Exception(= Custom Exception)을 던진다.
    - 오류 메세지에 전후 상황의 정보를 담아 예외와 함께 던진다.
6. 예외 케이스가 발생할 확률이 있는 경우, 가능한 빨리 리턴 또는 예외를 던지도록 작성한다.
7. 조건문에 부정 조건을 넣는 것을 피한다.
    - if(status.isNormal()) (O) / if(!status.isAbnormal()) (X)
8. 객체 속성은 Wrapper Class를 지향한다.