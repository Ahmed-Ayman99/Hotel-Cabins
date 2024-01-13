import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createCabinApi } from "../../services/apiCabins";
import useUser from "../authentication/useUser";

const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { token } = useUser();

  const { isLoading: isCreateCabin, mutate: createCabin } = useMutation({
    mutationFn: (newCabin) => createCabinApi(token, newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreateCabin, createCabin };
};

export default useCreateCabin;
