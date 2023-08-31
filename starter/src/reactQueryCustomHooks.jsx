import customFetch from "./utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useFetchTasks = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });
  // console.log(data);

  return { isLoading, isError, data };
};

// CREATE TASK
export const useCreateTask = (setNewItemName) => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading: createTaskLoading } = useMutation({
    mutationFn: (taskTitle) => {
      return customFetch.post("/", { title: taskTitle });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("task added");
      setNewItemName("");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.msg);
    },
  });

  return { createTask, createTaskLoading };
};

// EDIT TASK
export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { editTask };
};

// DELETE TASK
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteTask, isLoading: deleteTaskLoading } = useMutation({
    mutationFn: ({ taskId }) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("task deleted");
    },
  });

  return { deleteTask, deleteTaskLoading };
};
