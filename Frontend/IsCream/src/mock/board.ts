// 프로필 이미지용 랜덤 이미지 URL 생성
const getRandomProfileImage = (index: number) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${index}`;

// 게시글 이미지용 랜덤 이미지 URL 생성
const getRandomPostImage = (index: number) =>
  `https://picsum.photos/seed/${index}/400/400`;

// 랜덤 날짜 생성 (최근 30일 이내)
const getRandomDate = () => {
  const start = new Date(2024, 0, 1); // 2024년 1월 1일
  const end = new Date();
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toISOString().split("T")[0];
};

const generatePosts = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    postId: index + 1,
    title: `${index + 1}번째 게시글 - ${
      [
        "아이와 함께한 그림 테스트 결과 공유해요",
        "HTP 검사 결과 궁금해요",
        "PAT 검사 후기입니다",
        "우리 아이 심리 상태가 걱정되네요",
        "아이와 대화하는 방법 공유해요"
      ][index % 5]
    }`,
    content: [
      "오늘 아이와 함께 그림 테스트를 해보았어요. 아이가 그린 그림을 보고 많은 것을 알 수 있었네요...",
      "HTP 검사를 해보니 아이의 내면을 조금은 이해할 수 있었어요. 다른 부모님들은 어떠셨나요?",
      "PAT 검사 결과가 나왔는데, 전문가와 상담이 필요할까요?",
      "요즘 아이가 많이 예민해진 것 같아서 걱정이에요. 비슷한 경험이 있으신 분들 조언 부탁드려요.",
      "아이와 대화하는 시간을 늘리고 있어요. 좋은 방법이 있다면 공유해주세요."
    ][index % 5],
    likes: Math.floor(Math.random() * 50),
    userLiked: Math.random() > 0.5,
    viewCount: Math.floor(Math.random() * 100) + 50,
    images:
      index % 3 === 0
        ? [getRandomPostImage(index * 2), getRandomPostImage(index * 2 + 1)]
        : [],
    createAt: getRandomDate(),
    author: {
      id: index + 1, // 🔹 id 필드 추가
      nickname: [
        "행복한엄마",
        "초보아빠",
        "꿈나무맘",
        "희망가득",
        "사랑이엄마",
        "믿음이아빠",
        "좋은부모",
        "성장하는맘",
        "배움이아빠",
        "지혜로운맘"
      ][index % 10],
      imageUrl: getRandomProfileImage(index)
    },
    comments: Array.from(
      { length: Math.floor(Math.random() * 5) + 1 },
      (_, commentIndex) => ({
        commentId: index * 100 + commentIndex,
        content: [
          "저도 비슷한 경험이 있어요!",
          "아이와 함께 이야기를 나눠보는 건 어떨까요?",
          "전문가와 상담해보시는 것을 추천드려요.",
          "시간을 두고 지켜보시는 것도 좋을 것 같아요.",
          "응원합니다! 좋은 방법을 찾으실 거예요."
        ][commentIndex % 5],
        createdAt: getRandomDate(),
        author: {
          id: commentIndex + 1, // 🔹 id 필드 추가
          nickname: [
            "공감하는맘",
            "이해하는맘",
            "함께가는길",
            "늘푸른마음",
            "따뜻한맘"
          ][commentIndex % 5],
          imageUrl: getRandomProfileImage(index * 10 + commentIndex)
        },
        replies:
          Math.random() > 0.7
            ? [
                {
                  commentId: index * 100 + commentIndex * 10,
                  parentId: index * 100 + commentIndex,
                  content: "도움되는 의견 감사합니다.",
                  createdAt: getRandomDate(),
                  author: {
                    id: 100 + commentIndex, // 🔹 id 필드 추가
                    nickname: "감사한마음",
                    imageUrl: getRandomProfileImage(index * 100 + commentIndex)
                  }
                }
              ]
            : []
      })
    )
  }));
};

export const boardData = {
  posts: generatePosts(30),
  currentPost: {
    postId: 1,
    title: "검사가 꽤나 신빙성 있네요~ 이제 어떻게 하면 좋을까요?",
    content:
      "여러분 안녕하세요 제가 HTP와 PAT를 해보았는데요~ 저도 정말 비슷했어요 그걸 보고나서 아이의 마음을 조금은 읽을 수 있었는데, 이제는 무엇을 할지 모르겠어서요 어떤 것을 하면 좋을까요?",
    likes: 5,
    userLiked: false,
    viewCount: 100,
    images: [
      getRandomPostImage(1),
      getRandomPostImage(2),
      getRandomPostImage(3),
      getRandomPostImage(4),
      getRandomPostImage(5)
    ],
    createAt: "2024-02-06",
    author: {
      id: 1, // 🔹 id 필드 추가
      nickname: "김유정",
      imageUrl: getRandomProfileImage(999)
    },
    comments: [
      {
        commentId: 1,
        content:
          "저도 비슷한 경험이 있어요! 전문가와 상담을 해보시는 건 어떨까요?",
        createdAt: "2024-02-07",
        author: {
          id: 2, // 🔹 id 필드 추가
          nickname: "서건호",
          imageUrl: getRandomProfileImage(998)
        }
      },
      {
        commentId: 2,
        parentId: 1,
        content: "좋은 제안 감사합니다. 상담을 고려해볼게요!",
        createdAt: "2024-02-07",
        author: {
          id: 1, // 🔹 id 필드 추가
          nickname: "김유정",
          imageUrl: getRandomProfileImage(999)
        }
      },
      {
        commentId: 3,
        parentId: 1,
        content: "저도 같이 가고 싶어요!",
        createdAt: "2024-02-07",
        author: {
          id: 3, // 🔹 id 필드 추가
          nickname: "박동민",
          imageUrl: getRandomProfileImage(997)
        }
      },
      {
        commentId: 4,
        content: "아이와 함께 이야기를 나눠보는 건 어떨까요?",
        createdAt: "2024-02-07",
        author: {
          id: 4, // 🔹 id 필드 추가
          nickname: "이재홍",
          imageUrl: getRandomProfileImage(996)
        }
      },
      {
        commentId: 5,
        content: "1등 내공냠냠",
        createdAt: "2024-02-06",
        author: {
          id: 5, // 🔹 id 필드 추가
          nickname: "권민채",
          imageUrl: getRandomProfileImage(995)
        }
      }
    ]
  }
};
