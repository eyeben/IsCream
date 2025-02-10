import { useMutation, useQueryClient } from "@tanstack/react-query";
import { boardApi, boardKeys } from "@/api/board";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      postId?: number;
      commentId?: number;
      content: string;
    }) => boardApi.createComment(data),
    onSuccess: (_, variables) => {
      if (variables.postId) {
        queryClient.invalidateQueries({
          queryKey: boardKeys.comments(variables.postId)
        });
      }
    }
  });
};
