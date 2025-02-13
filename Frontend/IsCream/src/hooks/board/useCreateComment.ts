import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardApi, boardKeys } from "../../api/board";
import { CommentRequest } from "../../types/board";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CommentRequest) => boardApi.createComment(data),
    onSuccess: (_, variables) => {
      // commentId가 있으면 postId를 알 수 없으므로 전체 댓글 캐시 무효화
      if (variables.commentId) {
        queryClient.invalidateQueries({
          queryKey: boardKeys.all
        });
      } else {
        // 일반 댓글의 경우 postId로 댓글 목록 다시 불러오기
        queryClient.invalidateQueries({
          queryKey: boardKeys.comments(variables.postId!)
        });
      }
    }
  });
};
