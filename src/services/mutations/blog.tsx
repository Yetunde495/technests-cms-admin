import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteBlogPost, updatePost } from "../blogServices";

export const useDeletePost = () => {
    const queryClient = useQueryClient();
  
    return useMutation((id: string) => deleteBlogPost(id), {
      onSuccess: () => {
        // Reload all the posts data
        queryClient.invalidateQueries(["ALL POSTS"]);
  
        // Notify on success
        toast.success("The post has been successfully deleted");
      },
      onError: (err: any) => {
        // Notify on error
        toast.error(err.message || "Something went wrong");
      },
    });
  };


  export const useUpdateBlogpost = () => {
    const queryClient = useQueryClient();
  
    return useMutation(({ id, payload }: any) => updatePost(id, payload), {
      onSuccess: () => {
        //Reload all the resources table data
        queryClient.invalidateQueries(["ALL POSTS"]);
  
        //notify on success
        toast.success(" The Blog post has been successfully updated");
      },
      onError: (err: any) => {
        // notify on error
        toast.error(err.message || "Something went wrong");
      },
    });
  };