import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCabinApi } from "../../services/apiCabins";
import useUser from "../authentication/useUser";

export const useEditeCabin = () => {
  const queryClient = useQueryClient();
  const { token } = useUser();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ data, id }) => createCabinApi(token, data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing };
};
