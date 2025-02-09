// 수정 할 듯

// 1. 타입들 전부 types로 모아서 정리하기
// 2. 로그인 필요없는 게시판 기능부터 해보기
// 3. 로그인되면 캘린더 -> 게시판 -> 추천 -> 알람 순서대로

// import { api } from "@/utils/common/axiosInstance";
// import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
// import {}

// export const boardKeys = {
//   all: ["board"] as const,
//   lists: () => [...boardKeys.all, "list"] as const,
//   list: (filters: BoardListRequest) => [...boardKeys.lists(), filters] as const,
//   details: () => [...boardKeys.all, "detail"] as const,
//   detail: (id: number) => [...boardKeys.details(), id] as const,
//   comments: (postId: number) => [...boardKeys.all, "comments", postId] as const
// };

// export const boardApi = {
//   // 게시글 작성
//   createPost: (data: FormData) =>
//     api.post<ApiResponse<{ postId: number }>>("/board/post", data, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     }),

//   // 게시글 수정
//   updatePost: (postId: number, data: FormData) =>
//     api.put<ApiResponse>(`/board/post${postId}`, data, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     }),

//   // 게시글 삭제
//   deletePost: (postId: number) =>
//     api.delete<ApiResponse>(`/board/post/${postId}`),

//   // 메인 게시글 조회
//   getMainPosts: () =>
//     api.get<ApiResponse<{ hot: Post[]; latest: Post[] }>>("/board/main"),

//   // 게시글 목록 조회
//   getBoardList: (params: BoardListRequest) =>
//     api.post<ApiResponse<BoardListResponse>>("/board", params),

//   // 게시글 상세 조회
//   getPostDetail: (postId: number) =>
//     api.get<ApiResponse<PostDetail>>(`/board/post/${postId}`),

//   // 좋아요 관련
//   likePost: (postId: number) =>
//     api.get<ApiResponse>(`/board/post/${postId}/like`),

//   unlikePost: (postId: number) =>
//     api.delete<ApiResponse>(`/board/post/${postId}/like`),

//   // 댓글 관련
//   getComments: (postId: number) =>
//     api.get<ApiResponse<{ totalCount: number; comments: Comment[] }>>(
//       `/comments/${postId}`
//     ),

//   createComment: (data: {
//     postId?: number;
//     commentId?: number;
//     content: string;
//   }) => api.post<ApiResponse>("/comments", data),

//   updateComment: (commentId: number, content: string) =>
//     api.put<ApiResponse>(`/comments/${commentId}`, { content }),

//   deleteComment: (commentId: number) =>
//     api.delete<ApiResponse>(`/comments/${commentId}`)
// };

// // hooks/useBoard.ts
// export const useBoard = () => {
//   // 메인 게시글 조회 훅
//   const useMainPosts = () => {
//     return useQuery({
//       queryKey: [...boardKeys.all, "main"],
//       queryFn: () => boardApi.getMainPosts()
//     });
//   };

//   // 게시글 목록 무한 스크롤 훅
//   const useBoardList = (initialParams: BoardListRequest) => {
//     return useInfiniteQuery({
//       queryKey: boardKeys.list(initialParams),
//       queryFn: ({ pageParam = initialParams }) =>
//         boardApi.getBoardList(pageParam),
//       getNextPageParam: (lastPage) => {
//         if (!lastPage.data?.hasNext) return undefined;
//         return {
//           ...initialParams,
//           lastId: lastPage.data.lastId,
//           lastLikeCount: lastPage.data.lastLikeCount
//         };
//       }
//     });
//   };

//   // 게시글 작성 훅
//   const useCreatePost = () => {
//     return useMutation({
//       mutationFn: boardApi.createPost,
//       onSuccess: () => {
//         // 게시글 목록 캐시 무효화
//         queryClient.invalidateQueries(boardKeys.lists());
//       }
//     });
//   };

//   // 게시글 상세 조회 훅
//   const usePostDetail = (postId: number) => {
//     return useQuery({
//       queryKey: boardKeys.detail(postId),
//       queryFn: () => boardApi.getPostDetail(postId)
//     });
//   };

//   // 댓글 조회 훅
//   const useComments = (postId: number) => {
//     return useQuery({
//       queryKey: boardKeys.comments(postId),
//       queryFn: () => boardApi.getComments(postId)
//     });
//   };

//   // 댓글 작성 훅
//   const useCreateComment = () => {
//     return useMutation({
//       mutationFn: boardApi.createComment,
//       onSuccess: (_, variables) => {
//         // 해당 게시글의 댓글 목록 캐시 무효화
//         if (variables.postId) {
//           queryClient.invalidateQueries(boardKeys.comments(variables.postId));
//         }
//       }
//     });
//   };

//   return {
//     useMainPosts,
//     useBoardList,
//     useCreatePost,
//     usePostDetail,
//     useComments,
//     useCreateComment
//   };
// };
